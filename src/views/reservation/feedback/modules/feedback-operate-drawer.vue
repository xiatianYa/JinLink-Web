<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';
import { fetchAddFeedback, fetchUpdateFeedback } from '@/service/api';

defineOptions({
  name: 'FeedbackOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Feedback.FeedbackVo | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const { dictOptions } = useDict();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.feedback.addFeedback'),
    edit: $t('page.feedback.editFeedback')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Feedback.FeedbackVo, 'content' | 'image' | 'type' | 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    content: '',
    image: [],
    type: '',
    status: ''
  };
}

type RuleKey = Extract<keyof Model, 'content' | 'image' | 'type' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  content: defaultRequiredRule,
  image: defaultRequiredRule,
  type: defaultRequiredRule,
  status: defaultRequiredRule
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
    const { error } = await fetchUpdateFeedback(model);
    if (!error) window.$message?.success($t('common.updateSuccess'));
  } else {
    const { error } = await fetchAddFeedback(model);
    if (!error) window.$message?.success($t('common.addSuccess'));
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
  <NDrawer v-model:show="visible" display-directive="show" :width="500">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.feedback.content')" path="content">
          <NInput v-model:value="model.content" :placeholder="$t('page.feedback.form.content')" />
        </NFormItem>
        <NFormItem :label="$t('page.feedback.image')" path="image">
          <ImgUpload
            v-model:model-value="model.image"
            :limit="3"
            :file-type="['image/png', 'image/jpeg']"
            :file-size="50"
          ></ImgUpload>
        </NFormItem>
        <NFormItem :label="$t('page.feedback.type')" path="type">
          <NSelect
            v-model:value="model.type"
            :options="dictOptions('feedback_type')"
            :placeholder="$t('page.feedback.form.type')"
          />
        </NFormItem>
        <NFormItem v-if="props.operateType === 'edit'" :label="$t('page.feedback.status')" path="status">
          <NSelect
            v-model:value="model.status"
            :options="dictOptions('feedback_status')"
            :placeholder="$t('page.feedback.form.status')"
          />
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
