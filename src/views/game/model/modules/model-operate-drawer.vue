<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertModel, fetchUpdateModel } from '@/service/api';
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';
import { getServiceBaseURL } from '@/utils/service';

defineOptions({
  name: 'ModelOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Game.ModelVo | null;
}

const props = defineProps<Props>();

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

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
    add: $t('page.game.model.addModel'),
    edit: $t('page.game.model.editModel')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Game.ModelVo, 'modelName' | 'modelType' | 'modelUrl' | 'modelModeUrl'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    modelName: '',
    modelType: '',
    modelUrl: '',
    modelModeUrl: ''
  };
}

type RuleKey = keyof Pick<Model, 'modelName' | 'modelType' | 'modelUrl' | 'modelModeUrl'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  modelName: defaultRequiredRule,
  modelType: defaultRequiredRule,
  modelUrl: defaultRequiredRule,
  modelModeUrl: defaultRequiredRule
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
    const { error } = await fetchUpdateModel(model);
    if (!error) window.$message?.success($t('common.updateSuccess'));
  } else {
    const { error } = await fetchInsertModel(model);
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
        <NFormItem :label="$t('page.game.model.modelName')" path="modelName">
          <NInput v-model:value="model.modelName" :placeholder="$t('page.game.model.form.modelName')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.model.modelType')" path="modelType">
          <NSelect
            v-model:value="model.modelType"
            :options="dictOptions('model_type')"
            :placeholder="$t('page.game.model.form.modelType')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.model.modelUrl')" path="modelUrl">
          <ImgUpload
            v-model:model-value="model.modelUrl"
            :limit="1"
            :file-type="['image/png', 'image/jpeg']"
            :file-size="50"
          ></ImgUpload>
        </NFormItem>
        <NFormItem :label="$t('page.game.model.modelModeUrl')" path="modelModeUrl">
          <FileUpload v-model:model-value="model.modelModeUrl" :file-type="[]" :limit="1" :file-size="512"></FileUpload>
        </NFormItem>
        <NFormItem :label="$t('page.game.model.modelModeMaterial')" path="modelModeUrl">
          <NUpload multiple directory-dnd :action="`${baseURL}/file/model/upload`">
            <NUploadDragger>
              <div class="upload-icon">
                <SvgIcon icon="material-symbols:arrow-upload-progress" class="text-64px" />
              </div>
              <NText class="upload-text">点击或者拖动文件到该区域来上传</NText>
            </NUploadDragger>
          </NUpload>
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

<style scoped>
.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.upload-text {
  font-size: 16px;
}

.upload-desc {
  margin: 8px 0 0 0;
}
</style>
