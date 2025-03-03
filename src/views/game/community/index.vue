<script setup lang="tsx">
import { NButton, NCard, NImage, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { $t } from '@/locales';
import { fetchDeleteCommunityById, fetchGetCommunityList } from '@/service/api';
import CommunityOperateDrawer from './modules/community-operate-drawer.vue';

defineOptions({
  name: 'GameCommunity'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { columns, columnChecks, data, loading, getDataByPage, getData, mobilePagination } = useTable({
  apiFn: fetchGetCommunityList,
  apiParams: {
    current: 1,
    size: 10
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
      key: 'communityName',
      title: $t('page.game.community.communityName'),
      width: 64,
      align: 'center'
    },
    {
      key: 'logo',
      title: $t('page.game.community.logo'),
      width: 64,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          <NImage src={row.logo} />
        </div>
      )
    },
    {
      key: 'website',
      title: $t('page.game.community.website'),
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
          {hasAuth('game:gameCommunity:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('game:gameCommunity:delete') && (
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
  const result: any = await fetchDeleteCommunityById(id);
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
        add-auth="game:gameCommunity:save"
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
      <CommunityOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
