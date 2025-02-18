<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchGetUserServerInfo } from '@/service/api/game/websocket';
import { fetchGetUserObsOptions } from '@/service/api';

const route = useRoute();
type UserServer = {
  serverName: string;
  addr: string;
  mapName: string;
  mapLabel: string;
  mapUrl: string;
  players: number;
  maxPlayers: number;
};

type Options = {
  fontSize: number;
  fontColor: string;
  fontShadow: string;
  obsLink: string;
  fontAlign: string;
  showMap: boolean;
  customText: string[];
  fontFamily: string;
  fontShadowWidth: number;
};

const options = ref<Options>({
  fontSize: 16,
  fontColor: '#FFFFFF',
  fontShadow: 'rgba(255, 255, 255, 0.5)',
  obsLink: ``,
  fontAlign: 'left',
  showMap: true,
  customText: [],
  fontFamily: 'Microsoft YaHei',
  fontShadowWidth: 1
});

const interval = ref<NodeJS.Timeout>();

const userServer = ref<UserServer | null>(null);

const init = async () => {
  // 获取路由参数
  const userId: string = route.query.id as string;
  if (!userId) {
    return;
  }
  const { data } = await fetchGetUserServerInfo(userId);
  userServer.value = data;
};

const initOptions = async () => {
  // 获取路由参数
  const userId: string = route.query.id as string;
  if (!userId) {
    return;
  }
  const { data } = await fetchGetUserObsOptions(userId);
  if (data) {
    const optionsData = JSON.parse(data);
    options.value = JSON.parse(optionsData.options);
  }
};

onMounted(async () => {
  await init();
  await initOptions();
  interval.value = setInterval(async () => {
    await init();
    await initOptions();
  }, 10000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div
    v-if="userServer"
    class="obs-preview p-20px"
    :style="`text-align: ${options.fontAlign}; font-family: ${options.fontFamily}, sans-serif`"
  >
    <div
      class="font-bold"
      :style="`color: ${options.fontColor}; text-shadow: -${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, -${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
    >
      服务器名称：{{ userServer?.serverName }}
    </div>
    <div
      class="mt-5px font-bold"
      :style="`color: ${options.fontColor}; text-shadow: -${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, -${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
    >
      服务器人数：{{ userServer?.players }}/{{ userServer?.maxPlayers }}
    </div>
    <div
      class="mt-5px font-bold"
      :style="`color: ${options.fontColor}; text-shadow: -${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, -${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
    >
      地图名称：{{ userServer?.mapName }} ({{ userServer?.mapLabel }})
    </div>
    <div
      v-if="options.showMap"
      class="flex"
      :class="
            options.fontAlign === 'center'
              ? 'justify-center'
              : options.fontAlign === 'right'
                ? 'justify-end'
                : 'justify-start'
          "
    >
      <img v-if="userServer?.mapUrl" v-lazy="userServer?.mapUrl" class="mt-5px h-130px w-300px" />
      <div
        v-else
        class="font-bold"
        :style="`color: ${options.fontColor}; text-shadow: -${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, -${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
      >
        暂无地图图片
      </div>
    </div>
    <div v-for="(item, index) in options.customText" :key="index">
      <div
        class="mt-5px font-bold"
        :style="`color: ${options.fontColor}; text-shadow: -${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px -${options.fontShadowWidth}px 0 ${options.fontShadow}, -${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}, ${options.fontShadowWidth}px ${options.fontShadowWidth}px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.obs-preview {
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: #fff;
}
</style>
