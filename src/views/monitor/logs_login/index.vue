<script setup lang="tsx">
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchClearLoginLogAll, fetchGetLoginLogList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import LogsLoginSearch from './modules/login-search.vue';

defineOptions({
  name: 'MonitorLogsLogin'
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
  apiFn: fetchGetLoginLogList,
  apiParams: {
    current: 1,
    size: 10,
    userName: null,
    userRealName: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'userName',
      title: $t('page.monitor.logs.login.userName'),
      align: 'center',
      minWidth: 140
    },
    {
      key: 'status',
      title: $t('page.monitor.logs.login.status'),
      align: 'center',
      minWidth: 100,
      render: row => dictTag('login_status', row.status)
    },
    {
      key: 'ip',
      title: $t('page.monitor.logs.login.ip'),
      align: 'center',
      minWidth: 140
    },
    {
      key: 'ipAddr',
      title: $t('page.monitor.logs.login.ipAddr'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'userAgent',
      title: $t('page.monitor.logs.login.userAgent'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'message',
      title: $t('page.monitor.logs.login.message'),
      align: 'center',
      minWidth: 120,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.login.createTime'),
      align: 'center',
      width: 200
    }
  ]
});

const { checkedRowKeys, onDeleted } = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const result: any = await fetchClearLoginLogAll();
  if (result.data) onDeleted();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsLoginSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :delete-all="true"
        delete-all-auth="mon:monLogsLogin:delete"
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
