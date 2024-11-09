<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertCommunity, fetchUpdateCommunity } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'CommunityOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Game.Community | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.game.community.addCommunity'),
    edit: $t('page.game.community.editCommunity')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Game.Community, 'communityName'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    communityName: ''
  };
}

type RuleKey = Extract<keyof Model, 'communityName'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  communityName: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  if (props.operateType === 'edit') {
    const result = await fetchUpdateCommunity(model);
    if (result) window.$message?.success($t('common.updateSuccess'));
  } else {
    const result = await fetchInsertCommunity(model);
    if (result) window.$message?.success($t('common.addSuccess'));
  }
  closeDrawer();
  emit('submitted');
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
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.game.community.communityName')" path="communityName">
          <NInput v-model:value="model.communityName" :placeholder="$t('page.game.community.form.communityName')" />
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
