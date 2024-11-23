<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';
import QC from '@/utils/js/qqAuth.js';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  userName: string;
  password: string;
}

const model: FormModel = reactive({
  userName: '',
  password: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    userName: formRules.userName,
    password: formRules.pwd
  };
});

async function handleSubmit() {
  await validate();
  await authStore.login(model.userName, model.password);
}
// QQ登录
async function qqLogin() {
  // 调用第三方登录框
  QC.Login.showPopup({
    appId: '102129326', // 填写在QQ互联上申请的AppId
    redirectURI: 'https://www.bluearchive.top/main' // 填写回调地址 登录成功后会自动跳往该地址
  });
}
// 检测第三方登录
async function checkLogin() {
  // 检测用户是否确认登录
  if (QC.Login.check()) {
    // 获取用户openId
    QC.Login.getMe(async (openId: any, accessToken: any) => {
      // 成功获取用户openId
      if (openId) {
        // 调用后台接口 把用户存入数据库 并且返回token
        await authStore.oAuthLogin({ accessToken, openId, type: 0, redirect: false });
      }
    });
  }
}

onMounted(() => {
  checkLogin();
});
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>

      <NDivider class="text-14px text-#666 !m-0">{{ $t('page.login.pwdLogin.otherAccountLogin') }}</NDivider>
      <div class="flex-center gap-12px">
        <NButton type="primary" @click="qqLogin()">
          {{ $t('page.login.pwdLogin.qq') }}
        </NButton>
      </div>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
