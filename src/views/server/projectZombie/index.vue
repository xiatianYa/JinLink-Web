<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import {
  fetchGetCommunityNames,
  fetchGetGameNames,
  fetchGetModeNames,
  fetchGetServerAllByPage,
  fetchGetServerOnlineUser
} from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';

const appStore = useAppStore();

// 提示消息对象
const message = useMessage();
// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);
// 游戏配置项
const gameOptions = ref<CommonType.Option<string>[]>([]);
// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);
// 展示的服务器数据
const serverData = ref<Api.Game.SteamServerVo>();
// 是否展示在线玩家
const showOnlineUser = ref(false);

// 复制服务器地址
const copyServerAddr = (server: Api.Game.SteamServerVo) => {
  navigator.clipboard.writeText(`connect ${server.addr}`);
  message.success('复制成功');
};

const { columns, data, columnChecks, getData, loading, mobilePagination } = useTable({
  apiFn: fetchGetServerAllByPage,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 30,
    gameId: '2'
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      type: 'expand',
      renderExpand: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => copyServerAddr(row)}>
            复制地址
          </NButton>
        </div>
      )
    },
    {
      key: 'serverName',
      title: $t('page.game.server.serverName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'addr',
      title: $t('page.game.server.addr'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'players',
      title: $t('page.game.server.players'),
      align: 'center',
      minWidth: 100,
      render: row => {
        return <span>{`${row.players} / ${row.maxPlayers}`}</span>;
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
          <NButton type="info" ghost size="small" onClick={() => getOnlineUser(row)}>
            在线玩家
          </NButton>
        </div>
      )
    }
  ]
});

// 获取在线玩家
async function getOnlineUser(server: Api.Game.SteamServerVo) {
  message.info('获取中...');
  const onlineUserResult = await fetchGetServerOnlineUser(server.addr);
  showOnlineUser.value = true;
  // 更新数据
  server.sourcePlayers = onlineUserResult.data || [];
  serverData.value = server;
}

// 初始化配置项
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
      <NDrawer v-model:show="showOnlineUser" :width="300">
        <NDrawerContent :title="serverData?.serverName">
          <NTable :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>用户名称</th>
                <th>在线时长</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in serverData?.sourcePlayers" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ Math.floor(item.duration / 60) }}分钟</td>
              </tr>
            </tbody>
          </NTable>
        </NDrawerContent>
      </NDrawer>
    </NCard>
  </div>
</template>

<style scoped></style>
