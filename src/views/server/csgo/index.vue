<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue';
import { fetchGetCommunityNames, fetchGetModeNames, fetchGetServerAllBySteam, fetchGetServerList } from '@/service/api';
import { useGameStore } from '@/store/modules/game';
import { useTable } from '@/hooks/common/table';
import ServerCard from '../modules/serverCard.vue';
import ServerSearch from '../modules/server-search.vue';

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
const { searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetServerList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    communityId: null,
    modeId: null
  },
  columns: () => []
});

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
  const { error, data } = await fetchGetServerAllBySteam(searchParams);
  if (!error) {
    serverDataList.value = data;
  }
  loading.value = false;
}

onMounted(() => {
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
        server => server.gameCommunityVo.id === currentCommunity.gameCommunityVo.id
      );

      // 如果找到了匹配的社区，则更新当前社区的数据
      if (matchingSteamServer) {
        currentCommunity.gameCommunityVo = matchingSteamServer.gameCommunityVo;
        currentCommunity.onlineCount = matchingSteamServer.onlineCount;
        currentCommunity.gameServerVoList = matchingSteamServer.gameServerVoList;
      }

      // 更新当前是否在自动挤服 下来地图数据 实时更新地图数据
      if (gameStore.automaticInfo) {
        const server = currentCommunity.gameServerVoList.find(item => item.addr === gameStore.automaticInfo?.addr);
        if (server) {
          gameStore.automaticInfo.players = server.players;
          gameStore.automaticInfo.mapUrl = server.mapUrl;
          gameStore.automaticInfo.mapName = server.mapName;
          gameStore.automaticInfo.mapLabel = server.mapLabel;
          gameStore.automaticInfo.maxPlayers = server.maxPlayers;
          gameStore.automaticInfo.type = server.type;
          gameStore.automaticInfo.tag = server.tag;
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
        :community-options="communityOptions"
        :mode-options="modeOptions"
        @reset="resetSearchParams"
        @search="initServer"
      />
      <NCard v-for="community in serverDataList" :key="community.id" size="small">
        <template #header>
          <NTag>
            {{ community.gameCommunityVo.communityName }}
            <template v-if="community.gameCommunityVo.logo" #avatar>
              <NAvatar :src="community.gameCommunityVo.logo" />
            </template>
          </NTag>
        </template>
        <template #header-extra>
          <NStatistic label="在线人数" tabular-nums>
            <NNumberAnimation :from="0" :to="community.onlineCount" :duration="2000" />
          </NStatistic>
        </template>
        <NGrid :y-gap="20" :x-gap="15" responsive="screen" :item-responsive="true">
          <NGridItem v-for="(server, index) in community.gameServerVoList" :key="index" span="24 s:12 m:6">
            <ServerCard :game-server-vo="server" />
          </NGridItem>
        </NGrid>
      </NCard>
    </NSpin>
  </div>
</template>

<style scoped></style>
