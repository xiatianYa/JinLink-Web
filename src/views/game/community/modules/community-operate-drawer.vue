<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
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

type Model = Pick<Api.Game.Community, 'communityName' | 'logo' | 'website' | 'bind'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    communityName: '',
    logo: '',
    website: '',
    bind: ''
  };
}

type RuleKey = Extract<keyof Model, 'communityName'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  communityName: defaultRequiredRule
};

// 绑键列表
const buttons = ref<Array<{ code: string; desc: string }>>([]);

function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
  if (model.bind) {
    buttons.value = JSON.parse(model.bind);
  } else {
    buttons.value = [];
  }
}

function closeDrawer() {
  visible.value = false;
}

function handleCreateButton() {
  const buttonItem: { code: string | null; desc: string | null } = {
    code: '',
    desc: ''
  };
  return buttonItem;
}

async function handleSubmit() {
  await validate();
  if (buttons.value.length > 0) {
    model.bind = JSON.stringify(buttons.value);
  }
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
  <NDrawer v-model:show="visible" display-directive="show" :width="500">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.game.community.communityName')" path="communityName">
          <NInput v-model:value="model.communityName" :placeholder="$t('page.game.community.form.communityName')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.community.website')" path="website">
          <NInput v-model:value="model.website" :placeholder="$t('page.game.community.form.website')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.community.logo')" path="logo">
          <ImgUpload
            v-model:model-value="model.logo"
            :limit="1"
            :file-type="['image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'image/svg+xml']"
            :file-size="50"
          ></ImgUpload>
        </NFormItem>
        <NFormItem :label="$t('page.game.community.bind')" path="bind">
          <NDynamicInput v-model:value="buttons" :on-create="handleCreateButton">
            <template #default="{ value }">
              <div class="ml-8px flex-y-center flex-1 gap-12px">
                <NInput v-model:value="value.code" class="mr-5px min-w-150px" placeholder="请输入按键命令" clearable />
                <NInput v-model:value="value.desc" class="mr-5px min-w-150px" placeholder="请输入按键描述" clearable />
              </div>
            </template>
            <template #action="{ index, create, remove }">
              <div class="ml-8px flex-y-center gap-12px">
                <NButton class="min-w-50px" size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton class="min-w-50px" size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </div>
            </template>
          </NDynamicInput>
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
