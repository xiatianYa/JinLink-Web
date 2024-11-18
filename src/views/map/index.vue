<script setup lang="tsx">
import { NCard, NImage } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetMapList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import MapListSearch from './modules/map-list-search.vue';

defineOptions({
  name: 'GameGame'
});

const appStore = useAppStore();

const { dictLabel, dictTag } = useDict();

const { columns, data, loading, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
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
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <MapListSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
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
