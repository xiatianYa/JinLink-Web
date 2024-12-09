<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { $t } from '@/locales';
import { useRouterPush } from '@/hooks/common/router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetCode, fetchRegister } from '@/service/api/auth';
defineOptions({
  name: 'Register'
});

const { toggleLoginModule, toLogin } = useRouterPush();
const { formRef, validate } = useNaiveForm();

const codeUrl = ref<string | null>(null);

interface FormModel {
  userName: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const model: FormModel = reactive({
  userName: '',
  nickName: '',
  password: '',
  confirmPassword: '',
  code: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  const { formRules, createConfirmPwdRule } = useFormRules();

  return {
    userName: formRules.userName,
    nickName: formRules.nickName,
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password),
    code: formRules.code
  };
});

async function handleSubmit() {
  await validate();
  const { error } = await fetchRegister(model);
  if (error) {
    window.$message?.error(error?.response?.data?.msg || 'Failed to register');
  } else {
    window.$message?.success($t('page.login.common.registerSuccess'));
    toLogin();
  }
}

async function getCode() {
  const { data, error } = await fetchGetCode(model.userName);
  if (error) {
    window.$message?.error(error?.response?.data?.msg || 'Failed to get code');
  } else {
    codeUrl.value = data;
  }
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="nickName">
      <NInput v-model:value="model.nickName" :placeholder="$t('page.login.common.userNickNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
      />
    </NFormItem>
    <NFormItem path="code">
      <NInput
        v-model:value="model.code"
        type="text"
        :placeholder="$t('page.login.common.codePlaceholder')"
        class="mr-10px"
      />
      <div class="flex items-center">
        <NButton v-if="!codeUrl" type="primary" @click="getCode">
          {{ $t('page.login.common.getCodePlaceholder') }}
        </NButton>
        <NImage :src="codeUrl ? `data:image/png;base64,${codeUrl}` : ''" preview-disabled @click="getCode" />
      </div>
    </NFormItem>
    <NSpace vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
