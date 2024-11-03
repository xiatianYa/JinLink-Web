<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetAllRoles, fetchInsertScheduler, fetchUpdateScheduler } from '@/service/api';
import { transformStatus, transformStatusBoolean } from '@/utils/common';
import { $t } from '@/locales';

defineOptions({
  name: 'SchedulerOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.MonitorManage.Scheduler | null;
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
    add: $t('page.monitor.scheduler.addScheduler'),
    edit: $t('page.monitor.scheduler.editScheduler')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.MonitorManage.Scheduler,
  'jobName' | 'jobGroup' | 'triggerName' | 'triggerGroup' | 'cron' | 'jobClassName' | 'status'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    jobName: '',
    jobGroup: '',
    triggerName: '',
    triggerGroup: '',
    cron: '',
    jobClassName: '',
    status: false
  };
}

type RuleKey = Extract<
  keyof Model,
  'jobName' | 'jobGroup' | 'triggerName' | 'triggerGroup' | 'cron' | 'jobClassName' | 'status'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  jobName: defaultRequiredRule,
  jobGroup: defaultRequiredRule,
  triggerName: defaultRequiredRule,
  triggerGroup: defaultRequiredRule,
  cron: defaultRequiredRule,
  jobClassName: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map(item => ({
      label: item.roleName,
      value: item.roleCode
    }));

    roleOptions.value = [...options];
  }
}

function handleInitModel() {
  console.log(props);

  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
  // 处理参数
  model.status = transformStatusBoolean(model.status);
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // 处理参数
  model.status = transformStatus(model.status);
  // request
  if (props.operateType === 'edit') {
    const result = await fetchUpdateScheduler(model);
    if (result) window.$message?.success($t('common.updateSuccess'));
  } else {
    const result = await fetchInsertScheduler(model);
    if (result) window.$message?.success($t('common.addSuccess'));
  }
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getRoleOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.monitor.scheduler.jobName')" path="jobName">
          <NInput v-model:value="model.jobName" :placeholder="$t('page.monitor.scheduler.form.jobName')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.jobGroup')" path="jobGroup">
          <NInput v-model:value="model.jobGroup" :placeholder="$t('page.monitor.scheduler.form.jobGroup')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.triggerName')" path="triggerName">
          <NInput v-model:value="model.triggerName" :placeholder="$t('page.monitor.scheduler.form.triggerName')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.triggerGroup')" path="triggerGroup">
          <NInput v-model:value="model.triggerGroup" :placeholder="$t('page.monitor.scheduler.form.triggerGroup')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.corn')" path="cron">
          <NInput v-model:value="model.cron" :placeholder="$t('page.monitor.scheduler.form.corn')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.jobClassName')" path="jobClassName">
          <NInput v-model:value="model.jobClassName" :placeholder="$t('page.monitor.scheduler.form.jobClassName')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.status')" path="status">
          <NSwitch v-model:value="model.status" />
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
