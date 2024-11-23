<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchInsertServer, fetchUpdateServer } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'ServerOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Game.Server | null;
  /** the community name options */
  communityOptions?: CommonType.Option[] | [];
  /** the game name options */
  gameOptions?: CommonType.Option[] | [];
  /** the mode name options */
  modeOptions?: CommonType.Option[] | [];
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
    add: $t('page.game.server.addServer'),
    edit: $t('page.game.server.editServer')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Game.Server, 'serverName' | 'communityId' | 'modeId' | 'gameId' | 'ip' | 'port' | 'sort'>;

const model: Model = reactive(createDefaultModel());

const communityOption = ref<CommonType.Option[]>([]);

const gameOption = ref<CommonType.Option[]>([]);

const modeOption = ref<CommonType.Option[]>([]);

function createDefaultModel(): Model {
  return {
    serverName: '',
    communityId: '',
    modeId: null,
    gameId: '',
    ip: '',
    port: '',
    sort: 0
  };
}

type RuleKey = Extract<keyof Model, 'serverName' | 'communityId' | 'gameId' | 'ip' | 'port' | 'sort'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  serverName: defaultRequiredRule,
  communityId: defaultRequiredRule,
  gameId: defaultRequiredRule,
  ip: defaultRequiredRule,
  port: defaultRequiredRule,
  sort: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());
  Object.assign(communityOption.value, props.communityOptions);
  Object.assign(gameOption.value, props.gameOptions);
  Object.assign(modeOption.value, props.modeOptions);
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
    const result = await fetchUpdateServer(model);
    if (result) window.$message?.success($t('common.updateSuccess'));
  } else {
    const result = await fetchInsertServer(model);
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
        <NFormItem :label="$t('page.game.server.serverName')" path="serverName">
          <NInput
            v-model:value="model.serverName"
            :options="communityOption"
            :placeholder="$t('page.game.server.form.serverName')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.server.communityId')" path="communityId">
          <NSelect
            v-model:value="model.communityId"
            :options="communityOption"
            :placeholder="$t('page.game.server.form.communityId')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.server.modeId')" path="modeId">
          <NSelect
            v-model:value="model.modeId"
            :options="modeOption"
            :placeholder="$t('page.game.server.form.modeId')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.server.gameId')" path="gameId">
          <NSelect
            v-model:value="model.gameId"
            :options="gameOption"
            :placeholder="$t('page.game.server.form.gameId')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.game.server.ip')" path="ip">
          <NInput v-model:value="model.ip" :placeholder="$t('page.game.server.form.ip')" />
        </NFormItem>
        <NFormItem :label="$t('page.game.server.port')" path="port">
          <NInput v-model:value="model.port" :placeholder="$t('page.game.server.form.port')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.dict.form.sort')" />
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
