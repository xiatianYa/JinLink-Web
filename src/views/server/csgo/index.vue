<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue';
import { fetchGetCommunityNames, fetchGetModeNames, fetchGetServerAllBySteam } from '@/service/api';
import { useGameStore } from '@/store/modules/game';
import ServerCard from './modules/server-card.vue';
import ServerSearch from './modules/server-search.vue';

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);
// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);
// 服务器数据列表
const serverDataList = ref<Api.Game.SteamServerVoList>([]);
// 游戏仓库
const gameStore = useGameStore();
// 加载状态
const loading = ref(true);
// 搜索参数
const searchParams = ref<Api.Game.ServerSearchParams>({
  current: 1,
  size: 10,
  communityId: null,
  modeId: null,
  gameId: '1'
});

// 重置搜索参数
const resetSearchParams = () => {
  searchParams.value = {
    current: 1,
    size: 10,
    communityId: null,
    modeId: null,
    gameId: '1'
  };
};

// 初始化社区和模式数据
async function initOptions() {
  const communityNames = await fetchGetCommunityNames();
  if (communityNames.data) {
    communityOptions.value = communityNames.data;
  }
  const modeNames = await fetchGetModeNames();
  if (modeNames.data) {
    modeOptions.value = modeNames.data;
  }
}

// 初始化服务器数据
async function initServer() {
  loading.value = true;
  const { error, data } = await fetchGetServerAllBySteam(searchParams.value);
  if (!error) {
    serverDataList.value = data;
  }
  loading.value = false;
}

onMounted(() => {
  searchParams.value.communityId = localStorage.getItem('communityId');
  searchParams.value.modeId = localStorage.getItem('modeId');
  initOptions();
  initServer();
});

// 监听全局服务器数据变化，实时更新社区数据
watch(
  () => gameStore.autoMapReceiveList,
  newAutoMapReceiveList => {
    // 检查新数据是否存在
    if (!newAutoMapReceiveList) {
      return; // 如果没有新数据，则直接返回，不执行后续操作
    }
    // 遍历当前服务器数据列表
    for (const currentCommunity of serverDataList.value) {
      // 在新数据中查找匹配的社区
      const matchingSteamServer = newAutoMapReceiveList.find(
        server => server.gameCommunity.id === currentCommunity.gameCommunity.id
      );

      // 如果找到了匹配的社区，则更新当前社区的数据
      if (matchingSteamServer) {
        Object.assign(currentCommunity, matchingSteamServer);
        // 过滤掉不匹配的游戏模式
        if (searchParams.value.modeId) {
          const gameServerVoListResult = currentCommunity.gameServerVoList.filter(
            server => Number(server.modeId) === Number(searchParams.value.modeId)
          );
          if (gameServerVoListResult && gameServerVoListResult.length > 0)
            currentCommunity.gameServerVoList = gameServerVoListResult;
        }
      }

      // 更新当前是否在自动挤服 下来地图数据 实时更新地图数据
      if (gameStore.automaticInfo) {
        const server = currentCommunity.gameServerVoList.find(item => item.addr === gameStore.automaticInfo?.addr);
        if (server) {
          const {
            serverName,
            addr,
            ip,
            port,
            modeId,
            gameId,
            mapName,
            mapLabel,
            mapUrl,
            type,
            tag,
            players,
            maxPlayers
          } = server;
          gameStore.automaticInfo.serverName = serverName;
          gameStore.automaticInfo.addr = addr;
          gameStore.automaticInfo.ip = ip;
          gameStore.automaticInfo.port = port;
          gameStore.automaticInfo.modeId = modeId;
          gameStore.automaticInfo.gameId = gameId;
          gameStore.automaticInfo.mapName = mapName;
          gameStore.automaticInfo.mapLabel = mapLabel;
          gameStore.automaticInfo.mapUrl = mapUrl;
          gameStore.automaticInfo.type = type;
          gameStore.automaticInfo.tag = tag;
          gameStore.automaticInfo.players = players;
          gameStore.automaticInfo.maxPlayers = maxPlayers;
        }
      }
    }
  }
);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NSpin :show="loading" size="large" class="min-h-500px">
      <ServerSearch
        v-model:model="searchParams"
        class="mb-15px"
        :community-options="communityOptions"
        :mode-options="modeOptions"
        @reset="resetSearchParams"
        @search="initServer"
      />
      <NCard v-for="community in serverDataList" :key="community.gameCommunity.id" size="small" class="mb-15px">
        <template #header>
          <NTag>
            {{ community.gameCommunity.communityName }}
            <template v-if="community.gameCommunity.logo" #avatar>
              <NAvatar :src="community.gameCommunity.logo" />
            </template>
          </NTag>
        </template>
        <template #header-extra>
          <NStatistic label="在线人数" tabular-nums>
            <NNumberAnimation :from="0" :to="community.onLineUserNumber" :duration="2000" />
          </NStatistic>
        </template>
        <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen">
          <NGridItem v-for="server in community.gameServerVoList" :key="server.addr">
            <ServerCard :game-server-vo="server" />
          </NGridItem>
        </NGrid>
      </NCard>
    </NSpin>
  </div>
</template>

<style scoped></style>
