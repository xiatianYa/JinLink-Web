<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertMap, fetchUpdateMap } from '@/service/api';
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'MapOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Game.MapVo | null;
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
    add: $t('page.game.map.addMap'),
    edit: $t('page.game.map.editMap')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.Game.MapVo,
  'mapName' | 'mapUrl' | 'mapModeUrl' | 'mapLabel' | 'modeId' | 'type' | 'tag' | 'artifact'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    mapName: '',
    mapUrl: '',
    mapModeUrl: '',
    mapLabel: '',
    modeId: '',
    type: '',
    tag: [],
    artifact: []
  };
}

type RuleKey = keyof Pick<Model, 'mapName' | 'mapLabel' | 'mapUrl' | 'modeId'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  mapName: defaultRequiredRule,
  mapLabel: defaultRequiredRule,
  mapUrl: defaultRequiredRule,
  modeId: defaultRequiredRule
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
    const { error } = await fetchUpdateMap(model);
    if (!error) window.$message?.success($t('common.updateSuccess'));
  } else {
    const { error } = await fetchInsertMap(model);
    if (!error) window.$message?.success($t('common.addSuccess'));
  }
  closeDrawer();
  emit('submitted');
}

function handleCreateButton() {
  const buttonItem: Api.SystemManage.MenuButton = {
    code: '',
    desc: ''
  };

  return buttonItem;
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
        <NFormItem :label="$t('page.game.map.mapName')" path="mapName">
          <NInput v-model:value="model.mapName" :placeholder="$t('page.game.map.form.mapName')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.map.mapLabel')" path="mapLabel">
          <NInput v-model:value="model.mapLabel" :placeholder="$t('page.game.map.form.mapLabel')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.map.mapUrl')" path="mapUrl">
          <ImgUpload
            v-model:model-value="model.mapUrl"
            :limit="1"
            :file-type="['image/png', 'image/jpeg']"
            :file-size="50"
          ></ImgUpload>
        </NFormItem>
        <NFormItem :label="$t('page.game.map.modeId')" path="modeId">
          <NSelect
            v-model:value="model.modeId"
            :options="dictOptions('game_mode')"
            :placeholder="$t('page.game.map.form.modeId')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.map.type')" path="type">
          <NSelect
            v-model:value="model.type"
            :options="dictOptions('game_type')"
            :placeholder="$t('page.game.map.form.type')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.map.tag')" path="tag">
          <NSelect
            v-model:value="model.tag"
            multiple
            :options="dictOptions('game_tag')"
            :placeholder="$t('page.game.map.form.tag')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.map.artifact')" path="artifact">
          <NDynamicInput v-model:value="model.artifact" :on-create="handleCreateButton">
            <template #default="{ value }">
              <div class="ml-8px flex-y-center flex-1 gap-12px">
                <NInput v-model:value="value.code" :placeholder="$t('page.game.map.form.artifact')" class="flex-1" />
                <NInput v-model:value="value.desc" :placeholder="$t('page.game.map.form.desc')" class="flex-1" />
              </div>
            </template>
            <template #action="{ index, create, remove }">
              <NSpace class="ml-12px">
                <NButton size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </NSpace>
            </template>
          </NDynamicInput>
        </NFormItem>
        <NFormItem :label="$t('page.game.map.mapModeUrl')" path="mapModeUrl">
          <FileUpload v-model:model-value="model.mapModeUrl" :file-type="[]" :limit="1" :file-size="512"></FileUpload>
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
