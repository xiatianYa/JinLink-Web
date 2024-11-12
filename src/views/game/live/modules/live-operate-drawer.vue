<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertLive, fetchUpdateLive } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'LiveOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Game.Live | null;
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
    add: $t('page.game.live.addLive'),
    edit: $t('page.game.live.editLive')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Game.Live, 'uid' | 'avatar' | 'bgUrl'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    uid: '',
    avatar: '',
    bgUrl: ''
  };
}

type RuleKey = Extract<keyof Model, 'uid' | 'avatar' | 'bgUrl'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  uid: defaultRequiredRule,
  avatar: defaultRequiredRule,
  bgUrl: defaultRequiredRule
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
    const result = await fetchUpdateLive(model);
    if (result) window.$message?.success($t('common.updateSuccess'));
  } else {
    const result = await fetchInsertLive(model);
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
        <NFormItem :label="$t('page.game.live.uid')" path="uid">
          <NInput v-model:value="model.uid" :placeholder="$t('page.game.live.form.uid')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.live.avatar')" path="avatar">
          <ImgUpload
            v-model:model-value="model.avatar"
            :limit="1"
            :file-type="['image/png', 'image/jpeg']"
            :file-size="50"
          ></ImgUpload>
        </NFormItem>
        <NFormItem :label="$t('page.game.live.bgUrl')" path="bgUrl">
          <ImgUpload
            v-model:model-value="model.bgUrl"
            :limit="1"
            :file-type="['image/png', 'image/jpeg']"
            :file-size="50"
          ></ImgUpload>
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
