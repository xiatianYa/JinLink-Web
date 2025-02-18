<script setup lang="tsx">
import { NButton, NCard } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetMapStrategyList } from '@/service/api';
import MapStrategySearch from './modules/map-strategy-search.vue';

defineOptions({
  name: 'GameMapStrategy'
});

const appStore = useAppStore();

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
      width: 100,
      align: 'center'
    },
    {
      key: 'mapLabel',
      title: $t('page.game.mapStrategy.mapLabel'),
      width: 100,
      align: 'center'
    },
    {
      key: 'status',
      title: $t('page.game.mapStrategy.status'),
      width: 100,
      align: 'center'
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: () => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small">
            查看
          </NButton>
        </div>
      )
    }
  ]
});
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
