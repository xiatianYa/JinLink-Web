<script setup lang="tsx">
import { NButton, NImage, NPopconfirm } from 'naive-ui';
import { fetchDeleteLiveById, fetchGetLiveList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import LiveOperateDrawer from './modules/live-operate-drawer.vue';
import LiveSearch from './modules/live-search.vue';

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { columns, data, getData, getDataByPage, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetLiveList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    uid: null
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
      width: 64,
      align: 'center'
    },
    {
      key: 'uid',
      title: $t('page.game.live.uid'),
      width: 100,
      align: 'center'
    },
    {
      key: 'avatar',
      title: $t('page.game.live.avatar'),
      width: 100,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          <NImage src={row.avatar} />
        </div>
      )
    },
    {
      key: 'bgUrl',
      title: $t('page.game.live.bgUrl'),
      width: 100,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          <NImage src={row.bgUrl} />
        </div>
      )
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('game:gameLive:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('game:gameLive:delete') && (
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
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleDelete(id: string) {
  // request
  const result: any = await fetchDeleteLiveById(id);
  if (result.data) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LiveSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <TableHeaderOperation
        v-model:checked-row-keys="checkedRowKeys"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        add-auth="game:gameLive:save"
        @add="handleAdd"
        @refresh="getData"
      />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <LiveOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
