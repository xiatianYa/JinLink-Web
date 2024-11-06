<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeleteSchedulerById, fetchDeleteSchedulerByIds, fetchGetSchedulerList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useDict } from '@/hooks/business/dict';
import { useAuth } from '@/hooks/business/auth';
import MonitorSearch from './modules/scheduler-search.vue';
import SchedulerOperateDrawer from './modules/scheduler-operate-drawer.vue';

const appStore = useAppStore();

const { dictTag } = useDict();

const { hasAuth } = useAuth();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetSchedulerList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    jobName: null,
    jobGroup: null,
    triggerName: null,
    triggerGroup: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'jobName',
      title: $t('page.monitor.scheduler.jobName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'jobGroup',
      title: $t('page.monitor.scheduler.jobGroup'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'triggerName',
      title: $t('page.monitor.scheduler.triggerName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'triggerGroup',
      title: $t('page.monitor.scheduler.triggerGroup'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'cron',
      title: $t('page.monitor.scheduler.corn'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'jobClassName',
      title: $t('page.monitor.scheduler.jobClassName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'status',
      title: $t('page.monitor.scheduler.status'),
      align: 'center',
      render: row => dictTag('status', row.status)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('mon:scheduler:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('mon:scheduler:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const result: any = await fetchDeleteSchedulerByIds(checkedRowKeys.value);
  if (result.data) onBatchDeleted();
}

async function handleDelete(id: string) {
  // request
  const result: any = await fetchDeleteSchedulerById(id);
  if (result.data) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <MonitorSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.monitor.scheduler.title')" :bordered="false" size="small"
      class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation v-model:checkedRowKeys="checkedRowKeys" :addAuth="'mon:scheduler:save'"
          :deleteAuth="'mon:scheduler:delete'" :disabled-delete="checkedRowKeys.length === 0" :loading="loading"
          @add="handleAdd" @delete="handleBatchDelete" @refresh="getData" />
      </template>
      <NDataTable v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data" size="small"
        :flex-height="!appStore.isMobile" :scroll-x="962" :loading="loading" remote :row-key="row => row.id"
        :pagination="mobilePagination" class="sm:h-full" />
      <SchedulerOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData"
        @submitted="getDataByPage" />
    </NCard>
  </div>
</template>

<style scoped></style>
