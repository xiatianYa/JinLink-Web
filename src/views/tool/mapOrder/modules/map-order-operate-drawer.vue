<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchGetMapNames, fetchInsertMapOrder } from '@/service/api';

defineOptions({
  name: 'MapOrderOperateDrawer'
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

type Model = Pick<Api.GameMapOrder.MapOrder, 'mapId'>;

const model: Model = reactive(createDefaultModel());

// 地图配置项
const mapOptions = ref<CommonType.Option<string>[]>([]);

function createDefaultModel(): Model {
  return {
    mapId: ''
  };
}

type RuleKey = Extract<keyof Model, 'mapId'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  mapId: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());
}

async function initMapOptions() {
  const mapNames = await fetchGetMapNames();
  if (mapNames.data) {
    mapOptions.value = mapNames.data;
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const { error } = await fetchInsertMapOrder(model);
  if (!error) window.$message?.success($t('common.addSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    initMapOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="$t('page.tool.mapOrder.add')" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.tool.mapOrder.mapName')" path="mapName">
          <NSelect
            v-model:value="model.mapId"
            filterable
            :options="mapOptions"
            :placeholder="$t('page.tool.mapOrder.form.mapName')"
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
