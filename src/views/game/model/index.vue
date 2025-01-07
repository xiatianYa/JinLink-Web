<script setup lang="tsx">
import { NButton, NCard, NImage, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { $t } from '@/locales';
import { fetchDeleteModelById, fetchGetModelList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import ModelOperateDrawer from './modules/model-operate-drawer.vue';
import ModelSearch from './modules/model-search.vue';

defineOptions({
  name: 'GameModel'
});

const appStore = useAppStore();

const { dictLabel } = useDict();

const { hasAuth } = useAuth();

const {
  columns,
  columnChecks,
  data,
  loading,
  getDataByPage,
  getData,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetModelList,
  apiParams: {
    current: 1,
    size: 10,
    modelName: null,
    modelType: null
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
      key: 'modelName',
      title: $t('page.game.model.modelName'),
      width: 100,
      align: 'center'
    },
    {
      key: 'modelType',
      title: $t('page.game.model.modelType'),
      width: 100,
      align: 'center',
      render: row => dictLabel('model_type', row.modelType)
    },
    {
      key: 'modelUrl',
      title: $t('page.game.model.modelUrl'),
      width: 100,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          <NImage src={row.modelUrl} />
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
          {hasAuth('game:gameMap:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('game:gameMap:delete') && (
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
  const { error } = await fetchDeleteModelById(id);
  if (!error) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <ModelSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        add-auth="game:gameMap:save"
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
      <ModelOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
