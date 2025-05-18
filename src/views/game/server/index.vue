<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { onMounted, ref } from 'vue';
import {
  fetchDeleteServerById,
  fetchGetCommunityNames,
  fetchGetGameNames,
  fetchGetModeNames,
  fetchGetServerList
} from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import ServerOperateDrawer from './modules/server-operate-drawer.vue';
import ServerSearch from './modules/server-search.vue';

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictLabel } = useDict();

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);
// 游戏配置项
const gameOptions = ref<CommonType.Option<string>[]>([]);
// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);

const { columns, data, getData, getDataByPage, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetServerList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    serverName: null,
    communityIds: null,
    gameId: null,
    modeIds: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'communityName',
      title: $t('page.game.server.communityId'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'serverName',
      title: $t('page.game.server.serverName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'gameName',
      title: $t('page.game.server.gameId'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'modeName',
      title: $t('page.game.server.modeId'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'ip',
      title: $t('page.game.server.ip'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'port',
      title: $t('page.game.server.port'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'sort',
      title: $t('page.manage.dict.sort'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'isStatistics',
      title: $t('page.game.server.isStatistics'),
      align: 'center',
      minWidth: 100,
      render: row => dictLabel('yes_no', row.isStatistics.toString())
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('game:gameServer:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('game:gameServer:delete') && (
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
  const result: any = await fetchDeleteServerById(id);
  if (result.data) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}

async function initOptions() {
  const communityNames = await fetchGetCommunityNames();
  if (communityNames.data) {
    communityOptions.value = communityNames.data;
  }
  const gameNames = await fetchGetGameNames();
  if (gameNames.data) {
    gameOptions.value = gameNames.data;
  }
  const modeNames = await fetchGetModeNames();
  if (modeNames.data) {
    modeOptions.value = modeNames.data;
  }
}

onMounted(() => {
  initOptions();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px lt-sm:overflow-auto">
    <ServerSearch
      v-model:model="searchParams"
      :community-options="communityOptions"
      :game-options="gameOptions"
      :mode-options="modeOptions"
      @reset="resetSearchParams"
      @search="getDataByPage"
    />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:checked-row-keys="checkedRowKeys"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        add-auth="game:gameServer:save"
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
      <ServerOperateDrawer
        v-model:visible="drawerVisible"
        :community-options="communityOptions"
        :game-options="gameOptions"
        :mode-options="modeOptions"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
