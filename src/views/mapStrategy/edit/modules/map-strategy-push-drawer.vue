<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetMapNames, fetchInsertMapStrategy, fetchUpdateMapStrategy } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'MapStrategyPushDrawer'
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

type Model = Pick<Api.Game.MapStrategyVo, 'id' | 'title' | 'content' | 'videoUrl' | 'mapId'>;

const model: Model = reactive(createDefaultModel());

const router = useRouter();

// 地图配置项
const mapOptions = ref<CommonType.Option<string>[]>([]);

function createDefaultModel(): Model {
  return {
    id: '',
    title: '',
    content: '',
    videoUrl: '',
    mapId: null
  };
}

type RuleKey = Extract<keyof Model, 'title' | 'content' | 'mapId'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  title: defaultRequiredRule,
  content: defaultRequiredRule,
  mapId: defaultRequiredRule
};

async function initMapOptions() {
  const mapNames = await fetchGetMapNames();
  if (mapNames.data) {
    mapOptions.value = mapNames.data;
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  if (model.id) {
    const { error } = await fetchUpdateMapStrategy(model);
    if (!error) window.$message?.success($t('common.updateSuccess'));
    closeDrawer();
    emit('submitted');
  } else {
    const { error } = await fetchInsertMapStrategy(model);
    if (!error) window.$message?.success($t('common.addSuccess'));
    closeDrawer();
    emit('submitted');
    // 跳转路由
    router.push({
      path: '/mapstrategy/list'
    });
  }
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
    <NDrawerContent title="地图攻略发布" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.game.mapStrategy.title')" path="title">
          <NInput v-model:value="model.title" :placeholder="$t('page.game.mapStrategy.form.title')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.mapStrategy.mapId')" path="mapId">
          <NSelect
            v-model:value="model.mapId"
            :options="mapOptions"
            :placeholder="$t('page.game.mapStrategy.form.mapId')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.mapStrategy.videoUrl')" path="videoUrl">
          <FileUpload v-model:value="model.videoUrl" :file-type="[]" :limit="1" :file-size="512" />
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
