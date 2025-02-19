<script setup lang="tsx">
import { NButton, NCard, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteMapStrategy, fetchGetMapStrategyList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import { useAuthStore } from '@/store/modules/auth';
import MapStrategySearch from './modules/map-strategy-search.vue';
defineOptions({
  name: 'GameMapStrategy'
});

const appStore = useAppStore();

const userStore = useAuthStore();

const { dictTag } = useDict();

const { columns, data, loading, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetMapStrategyList,
  apiParams: {
    current: 1,
    size: 10,
    title: null,
    mapId: null,
    status: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'title',
      title: $t('page.game.mapStrategy.title'),
      align: 'center'
    },
    {
      key: 'mapLabel',
      title: $t('page.game.mapStrategy.mapLabel'),
      align: 'center'
    },
    {
      key: 'status',
      title: $t('page.game.mapStrategy.status'),
      width: 100,
      align: 'center',
      render: row => dictTag('examine_status', String(row.status))
    },
    {
      key: 'createUserName',
      title: $t('page.game.mapStrategy.userName'),
      width: 100,
      align: 'center'
    },
    {
      key: 'createTime',
      title: $t('page.game.mapStrategy.createTime'),
      width: 200,
      align: 'center'
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 250,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton ghost size="small" onClick={() => view(row.id)}>
            查看
          </NButton>
          {String(userStore.userInfo?.userId) === String(row.createUserId) && (
            <NButton type="info" ghost size="small" onClick={() => edit(row.id)}>
              编辑
            </NButton>
          )}
          {String(userStore.userInfo?.userId) === String(row.createUserId) && (
            <NPopconfirm onPositiveClick={() => push(row.id)}>
              {{
                default: () => $t('common.confirmPublish'),
                trigger: () => (
                  <NButton type="success" ghost size="small">
                    {$t('common.publish')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
          {String(userStore.userInfo?.userId) === String(row.createUserId) && (
            <NPopconfirm onPositiveClick={() => removeById(row.id)}>
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

async function removeById(id: string) {
  const { error } = await fetchDeleteMapStrategy(id);
  if (error) {
    window.$message?.error(error.message);
  } else {
    window.$message?.success('删除成功');
  }
  getDataByPage();
}

async function push(id: string) {
  // 发布文章
  console.log(id);
}

// 编辑文章
function edit(id: string) {
  console.log(id);
}

// 查看文章
function view(id: string) {
  console.log(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <MapStrategySearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <NDataTable
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

<style scoped></style>
