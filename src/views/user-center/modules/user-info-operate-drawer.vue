<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchRestartUserInfo } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'UserInfoOperateDrawer'
});

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const authStore = useAuthStore();

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules(); // inside computed to make locale reactive

type Model = Pick<Api.SystemManage.UserInfoVo, 'userName' | 'password'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    userName: '',
    password: ''
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'password'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  password: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const { error } = await fetchRestartUserInfo(model);
  closeDrawer();
  emit('submitted');
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    authStore.resetStore();
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="$t('page.userCenter.userInfo.restartUserName')" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.userCenter.userInfo.userName')" path="userName">
          <NInput v-model:value="model.userName" :placeholder="$t('page.userCenter.userInfo.form.userName')" />
        </NFormItem>
        <NFormItem :label="$t('page.userCenter.userInfo.password')" path="password">
          <NInput
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            :placeholder="$t('page.userCenter.userInfo.form.password')"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NPopconfirm @positive-click="handleSubmit">
            <template #trigger>
              <NButton type="primary">{{ $t('common.confirm') }}</NButton>
            </template>
            {{ $t('page.userCenter.userInfo.restartUserNameConfirm') }}
          </NPopconfirm>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
