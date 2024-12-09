<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { fetchGetLiveListAll } from '@/service/api';
import { useAuth } from '@/hooks/business/auth';
import LiveOperateDrawer from './modules/live-operate-drawer.vue';

// 加载状态
const loading = ref(true);
// 直播间列表
const liveList = ref<Array<Api.Game.LiveVo>>();
// 是否显示进入直播间
const showStatusId = ref<number | null>(null);
// 主播入驻框是否显示
const joinShow = ref(false);
// 主播入驻表达数据
const joinData = ref<any>({});

// 权限
const { hasAuth } = useAuth();

// 前往直播间
const goHref = (url: string) => {
  window.open(url, '_blank');
};

// 打开主播入驻
const openJoin = () => {
  joinShow.value = true;
  joinData.value = {};
};

onMounted(async () => {
  const { data, error } = await fetchGetLiveListAll();
  if (!error) {
    liveList.value = data;
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NSpin :show="loading" size="large" class="min-h-500px">
      <NCard v-if="hasAuth('game:gameLive:save')" class="mb-10px card-wrapper" :bordered="false" size="small">
        <NCollapse>
          <NButton strong secondary type="info" @click="openJoin">{{ $t('page.game.live.joinLive') }}</NButton>
        </NCollapse>
      </NCard>
      <NCard size="small">
        <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:2 l:3 xl:4 2xl:5 " responsive="screen">
          <NGridItem v-for="(live, index) in liveList" :key="index" class="live" @click="goHref(live.biliVo.liveUrl)">
            <div
              class="image-container"
              @mouseover="showStatusId = live.biliVo.roomId"
              @mouseleave="showStatusId = null"
            >
              <NImage class="h-300px" :src="live.bgUrl" :preview-disabled="true" />
              <div
                class="server-card-mask"
                :style="
                  showStatusId != live.biliVo.roomId && live.biliVo.liveStatus && live.biliVo.liveStatus !== 2
                    ? 'display: none;'
                    : ''
                "
              ></div>
              <div class="status">
                <span v-if="showStatusId === live.biliVo.roomId && live.biliVo.liveStatus === 1">
                  {{ $t('page.game.live.enterLive') }}
                </span>
                <span v-if="!live.biliVo.liveStatus || live.biliVo.liveStatus === 2">
                  {{ $t('page.game.live.notLive') }}
                </span>
              </div>
              <div class="gameType">
                <span>
                  {{ live.biliVo.areaName }}
                </span>
              </div>
            </div>
            <div class="flex-space-between flex-y-center">
              <div class="flex-2 flex-y-center">
                <NAvatar round size="medium" :src="live.avatar" />
              </div>
              <div class="ml-20px flex-1">
                <NEllipsis :line-clamp="1">
                  {{ live.biliVo.title }}
                </NEllipsis>
                <div class="d_flex d_flex_sb">
                  <NEllipsis :line-clamp="1">
                    {{ live.biliVo.uname }}
                  </NEllipsis>
                </div>
              </div>
              <div class="mr-10px flex-y-center">
                <SvgIcon icon="majesticons:eye-line" class="mr-3px text-20px" />
                {{ live.biliVo.online }}
              </div>
            </div>
          </NGridItem>
        </NGrid>
        <LiveOperateDrawer v-model:visible="joinShow" />
      </NCard>
    </NSpin>
  </div>
</template>

<style scoped>
.live {
  width: 100%;
  cursor: pointer;

  .image-container {
    width: 100%;
    height: auto;
    position: relative;

    .server-card-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    .status {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      font-weight: bold;
      color: #fff;
    }

    .gameType {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: black;
      font-weight: bold;
    }
  }
}
</style>
