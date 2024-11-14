<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { fetchGetCommunityNames, fetchGetModeNames, fetchGetServerAllBySteam, fetchGetServerList } from '@/service/api';
import { useTable } from '@/hooks/common/table';
import ServerCard from '../modules/serverCard.vue';
import ServerSearch from '../modules/server-search.vue';

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);
// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);
// 服务器数据列表
const serverDataList = ref<Api.Game.SteamServerVoList>([]);

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

async function initServer() {
  const { error, data } = await fetchGetServerAllBySteam(searchParams);
  if (!error) {
    serverDataList.value = data;
  }
}

onMounted(() => {
  initOptions();
  initServer();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <ServerSearch
      v-model:model="searchParams"
      :community-options="communityOptions"
      :mode-options="modeOptions"
      @reset="resetSearchParams"
      @search="initServer"
    />
    <NCard v-for="community in serverDataList" :key="community.id" size="small" :loading="false">
      <template #header>
        <NTag>
          {{ community.gameCommunityVo.communityName }}
          <template #avatar>
            <NAvatar :src="community.gameCommunityVo.logo" />
          </template>
        </NTag>
      </template>
      <template #header-extra>
        <NStatistic label="在线人数" tabular-nums>
          <NNumberAnimation :from="0" :to="community.onlineCount" :duration="2000" />
        </NStatistic>
      </template>
      <NGrid :x-gap="50" :y-gap="50" responsive="screen" item-responsive>
        <NGridItem v-for="(server, index) in community.gameServerVoList" :key="index" span="24 s:12 m:6">
          <ServerCard :game-server-vo="server" />
        </NGridItem>
      </NGrid>
    </NCard>
  </div>
</template>

<style scoped></style>
