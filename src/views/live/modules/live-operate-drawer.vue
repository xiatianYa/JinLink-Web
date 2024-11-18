<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertLive } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'LiveOperateDrawer'
});

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

type Model = Pick<Api.Game.Live, 'uid'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    uid: ''
  };
}

type RuleKey = Extract<keyof Model, 'uid'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  uid: defaultRequiredRule
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
  const { error } = await fetchInsertLive({
    ...model,
    avatar: '',
    bgUrl: ''
  });
  if (!error) window.$message?.success($t('common.addSuccess'));
  closeDrawer();
  emit('submitted');

  watch(visible, () => {
    if (visible.value) {
      handleInitModel();
      restoreValidation();
    }
  });
}
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent title="主播入驻" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.game.live.uid')" path="uid">
          <NInput v-model:value="model.uid" :placeholder="$t('page.game.live.form.uid')" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
