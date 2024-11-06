<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsErrorSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation v-model:columns="columnChecks" :deleteAll="true"
        :deleteAllAuth="'mon:monLogsOperation:delete'" :checked-row-keys="checkedRowKeys" :loading="loading"
        @delete="handleBatchDelete" @refresh="getData" />
      <NDataTable v-model:checked-row-keys="checkedRowKeys" :deleteAll="true" :deleteAllAuth="'mon:monLogsError:delete'"
        remote striped size="small" class="sm:h-full" :data="data" :scroll-x="962" :columns="columns"
        :flex-height="!appStore.isMobile" :loading="loading" :single-line="false" :row-key="row => row.id"
        :pagination="mobilePagination" />
      <ErrorOperateModal v-model:visible="visible" :operate-type="operateType" :row-data="editingData"
        @submitted="getDataByPage" />
    </NCard>
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetErrorLogList, fetchClearErrorLogAll } from '@/service/api';
import LogsErrorSearch from './modules/error-search.vue';
import ErrorOperateModal, { type OperateType } from './modules/error-operate-modal.vue';
import { useBoolean } from '~/packages/hooks/src';
import { Ref, ref } from 'vue';

defineOptions({
  name: 'MonitorLogsError'
});

const { bool: visible, setTrue: openModal } = useBoolean();

const appStore = useAppStore();

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
  apiFn: fetchGetErrorLogList,
  apiParams: {
    current: 1,
    size: 20,
    createUser: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'createUser',
      title: $t('page.monitor.logs.error.createUser'),
      align: 'center',
      width: 100
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.error.createTime'),
      align: 'center',
      width: 180
    },
    {
      key: 'ip',
      title: $t('page.monitor.logs.error.ip'),
      align: 'center',
      width: 100
    },
    {
      key: 'ipAddr',
      title: $t('page.monitor.logs.error.ipAddr'),
      align: 'center',
      width: 180,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestUri',
      title: $t('page.monitor.logs.error.requestUri'),
      align: 'center',
      width: 180,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestMethod',
      title: $t('page.monitor.logs.error.requestMethod'),
      align: 'center',
      width: 80
    },
    {
      key: 'contentType',
      title: $t('page.monitor.logs.operation.contentType'),
      align: 'center',
      width: 150
    },
    {
      key: 'methodName',
      title: $t('page.monitor.logs.error.methodName'),
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'operation',
      title: $t('page.monitor.logs.error.operation'),
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 120,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => handleEdit(row)}>查看请求参数</NButton>
        </div>
      )
    },
    {
      key: 'exceptionMessage',
      title: $t('page.monitor.logs.error.exceptionMessage'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'exceptionClass',
      title: $t('page.monitor.logs.error.exceptionClass'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'line',
      title: $t('page.monitor.logs.error.line'),
      align: 'center',
      width: 100
    },
    {
      key: 'useTime',
      title: $t('page.monitor.logs.error.useTime'),
      align: 'center',
      width: 100
    }
  ]
});

const { checkedRowKeys, onDeleted } = useTableOperate(data, getData);

const operateType = ref<OperateType>('add');

/** the edit menu data or the parent menu data when adding a child menu */
const editingData: Ref<Api.Monitor.OperationLog | null> = ref(null);

function handleEdit(item: Api.Monitor.OperationLog) {
  operateType.value = 'edit';
  editingData.value = { ...item };
  openModal();
}

async function handleBatchDelete() {
  // request
  const result: any = await fetchClearErrorLogAll();
  if (result.data) onDeleted();
}
</script>
