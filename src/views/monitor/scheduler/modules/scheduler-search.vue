<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Monitor.SchedulerSearchParams>('model', { required: true });

type RuleKey = Extract<
  keyof Api.SystemManage.UserSearchParams,
  'jobName' | 'jobGroup' | 'triggerName' | 'triggerGroup'
>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { defaultRequiredRule } = useFormRules(); // inside computed to make locale reactive

  return {
    jobName: defaultRequiredRule,
    jobGroup: defaultRequiredRule,
    triggerName: defaultRequiredRule,
    triggerGroup: defaultRequiredRule
  };
});

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.monitor.scheduler.jobName')"
              path="userName"
              class="pr-24px"
            >
              <NInput v-model:value="model.jobName" :placeholder="$t('page.monitor.scheduler.form.jobName')" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.monitor.scheduler.jobGroup')"
              path="nickName"
              class="pr-24px"
            >
              <NInput v-model:value="model.jobGroup" :placeholder="$t('page.monitor.scheduler.form.jobGroup')" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.monitor.scheduler.triggerName')"
              path="nickName"
              class="pr-24px"
            >
              <NInput v-model:value="model.triggerName" :placeholder="$t('page.monitor.scheduler.form.triggerName')" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.monitor.scheduler.triggerGroup')"
              path="nickName"
              class="pr-24px"
            >
              <NInput
                v-model:value="model.triggerGroup"
                :placeholder="$t('page.monitor.scheduler.form.triggerGroup')"
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:12" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
