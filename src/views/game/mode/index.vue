<script setup lang="tsx">
import { NButton, NCard, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { $t } from '@/locales';
import { fetchDeleteModeById, fetchGetModeList } from '@/service/api';
import ModeOperateDrawer from './modules/mode-operate-drawer.vue';

defineOptions({
  name: 'GameGame'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { columns, columnChecks, data, loading, getDataByPage, getData, mobilePagination } = useTable({
  apiFn: fetchGetModeList,
  apiParams: {
    current: 1,
    size: 20
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
      key: 'modeName',
      title: $t('page.game.mode.modeName'),
      width: 64,
      align: 'center'
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('game:gameMode:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('game:gameMode:delete') && (
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

const { drawerVisible, operateType, checkedRowKeys, editingData, handleAdd, handleEdit, onDeleted } = useTableOperate(
  data,
  getData
);

async function handleDelete(id: string) {
  // request
  const result: any = await fetchDeleteModeById(id);
  if (result.data) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        add-auth="game:gameGame:save"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        @add="handleAdd"
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
      <ModeOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
