<script setup lang="tsx">
import { NCard } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchClearSchedulerLogAll, fetchGetSchedulerLogList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import LogsSchedulerSearch from './modules/scheduler-search.vue';

defineOptions({
  name: 'MonitorLogsScheduler'
});

const appStore = useAppStore();

const { dictTag } = useDict();

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetSchedulerLogList,
  apiParams: {
    current: 1,
    size: 10,
    jobName: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.scheduler.createTime'),
      align: 'center',
      minWidth: 200,
      width: 200
    },
    {
      key: 'status',
      title: $t('page.monitor.logs.scheduler.status'),
      align: 'center',
      minWidth: 100,
      render: row => dictTag('scheduler_execute_staus', row.status)
    },
    {
      key: 'useTime',
      title: $t('page.monitor.logs.scheduler.useTime'),
      align: 'center',
      width: 100
    },
    {
      key: 'jobName',
      title: $t('page.monitor.logs.scheduler.jobName'),
      align: 'center',
      minWidth: 140,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'jobGroup',
      title: $t('page.monitor.logs.scheduler.jobGroup'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'exceptionMessage',
      title: $t('page.monitor.logs.scheduler.exceptionMessage'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'exceptionClass',
      title: $t('page.monitor.logs.scheduler.exceptionClass'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'line',
      title: $t('page.monitor.logs.scheduler.line'),
      align: 'center',
      width: 100
    },
    {
      key: 'stackTrace',
      title: $t('page.monitor.logs.scheduler.stackTrace'),
      align: 'center',
      width: 100
    }
  ]
});

const { checkedRowKeys, onDeleted } = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const result: any = await fetchClearSchedulerLogAll();
  if (result.data) onDeleted();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsSchedulerSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :delete-all="true"
        delete-all-auth="mon:monLogsScheduler:delete"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        @delete="handleBatchDelete"
        @refresh="getData"
      />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
  </div>
</template>
