<script setup lang="tsx">
import { NButton, useMessage } from 'naive-ui';
import { fetchGetMinecraftPage } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';

const appStore = useAppStore();

// 提示消息对象
const message = useMessage();

// 复制服务器地址
const copyServerAddr = (server: Api.Game.MinecraftServerVo) => {
  navigator.clipboard.writeText(`connect ${server.addr}`);
  message.success('复制成功');
};

const { columns, data, columnChecks, getData, loading, mobilePagination } = useTable({
  apiFn: fetchGetMinecraftPage,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 30,
    gameId: '6'
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'description',
      title: $t('page.game.server.serverName'),
      align: 'center',
      minWidth: 100,
      render: row => {
        return <span>{JSON.parse(row.description).text}</span>;
      }
    },
    {
      key: 'addr',
      title: $t('page.game.server.addr'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'version',
      title: $t('page.game.server.version'),
      align: 'center',
      minWidth: 100,
      render: row => {
        return <span>{row.version.name}</span>;
      }
    },
    {
      key: 'players',
      title: $t('page.game.server.players'),
      align: 'center',
      minWidth: 100,
      render: row => {
        return <span>{`${row.players.online} / ${row.players.max}`}</span>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => copyServerAddr(row)}>
            复制地址
          </NButton>
        </div>
      )
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px lt-sm:overflow-auto">
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation v-model:columns="columnChecks" :loading="loading" @refresh="getData" />
      <NDataTable
        :columns="columns"
        :data="data"
        :row-key="row => row.addr"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
