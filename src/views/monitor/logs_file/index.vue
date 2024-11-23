<script setup lang="tsx">
import { NCard, NImage } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';
import { fetchClearFileLogAll, fetchGetFileLogList } from '@/service/api';
import { getFileTypeByExtension } from '@/utils/common';
import LogsOperationSearch from './modules/operation-search.vue';

defineOptions({
  name: 'MonitorLogsOperation'
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
  apiFn: fetchGetFileLogList,
  apiParams: {
    current: 1,
    size: 10,
    userName: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'userId',
      title: $t('page.monitor.logs.file.userId'),
      align: 'center',
      width: 140
    },
    {
      key: 'userName',
      title: $t('page.monitor.logs.file.userName'),
      align: 'center',
      width: 140
    },
    {
      key: 'fileUrl',
      title: $t('page.monitor.logs.file.fileUrl'),
      align: 'center',
      width: 150,
      render: row => (
        <div class="flex-center justify-center gap-8px">
          {getFileTypeByExtension(row.fileUrl) === 'file' && (
            <a href={row.fileUrl} target="_blank">
              {row.fileUrl}
            </a>
          )}
          {getFileTypeByExtension(row.fileUrl) === 'image' && <NImage src={row.fileUrl}></NImage>}
          {getFileTypeByExtension(row.fileUrl) === 'video' && (
            <a href={row.fileUrl} target="_blank">
              {row.fileUrl}
            </a>
          )}
        </div>
      )
    },
    {
      key: 'fileSize',
      title: $t('page.monitor.logs.file.fileSize'),
      align: 'center',
      width: 140,
      render: row => <div class="flex-center justify-center gap-8px">{row.fileSize} MB</div>
    },
    {
      key: 'status',
      title: $t('page.monitor.logs.file.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('operation_status', row.status)
    }
  ]
});

const { checkedRowKeys, onDeleted } = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const result: any = await fetchClearFileLogAll();
  if (result.data) onDeleted();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsOperationSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :delete-all="true"
        delete-all-auth="mon:monLogsOperation:delete"
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
