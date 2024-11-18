<script setup lang="tsx">
import { NButton, NCard, NImage, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { $t } from '@/locales';
import { fetchDeleteMapById, fetchGetMapList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import MapOperateDrawer from './modules/map-operate-drawer.vue';
import MapSearch from './modules/map-search.vue';

defineOptions({
  name: 'GameGame'
});

const appStore = useAppStore();

const { dictLabel, dictTag } = useDict();

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
  apiFn: fetchGetMapList,
  apiParams: {
    current: 1,
    size: 10,
    mapName: null,
    mapLabel: null,
    modeId: null,
    type: null
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
      key: 'mapName',
      title: $t('page.game.map.mapName'),
      width: 100,
      align: 'center'
    },
    {
      key: 'mapLabel',
      title: $t('page.game.map.mapLabel'),
      width: 100,
      align: 'center'
    },
    {
      key: 'mapUrl',
      title: $t('page.game.map.mapUrl'),
      width: 100,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          <NImage src={row.mapUrl} />
        </div>
      )
    },
    {
      key: 'modeId',
      title: $t('page.game.map.modeId'),
      width: 100,
      align: 'center',
      render: row => dictLabel('game_mode', row.modeId)
    },
    {
      key: 'type',
      title: $t('page.game.map.type'),
      width: 100,
      align: 'center',
      render: row => dictTag('game_type', row.type)
    },
    {
      key: 'tag',
      title: $t('page.game.map.tag'),
      width: 100,
      align: 'center',
      render: row => <div class="flex-center gap-8px">{row.tag.map(item => dictTag('game_tag', item))}</div>
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
  const result: any = await fetchDeleteMapById(id);
  if (result.data) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <MapSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
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
      <MapOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
