<script setup lang="ts">
import { NTag } from 'naive-ui';
import { onMounted, ref, watch } from 'vue';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'ServerCard'
});

const { dictOptions } = useDict();

interface Props {
  /** 社区服务器数据 */
  gameServerVo: Api.Game.SteamServer;
}

const props = defineProps<Props>();

const gameServer = ref<Api.Game.SteamServer>({
  serverName: '',
  communityId: '',
  communityName: '',
  modeId: '',
  modeName: '',
  gameId: '',
  gameName: '',
  ip: '',
  port: '',
  sort: 0,
  serverVo: {
    mapName: '',
    mapLabel: '',
    mapUrl: '',
    type: '',
    tag: [],
    players: 0,
    maxPlayers: 0
  }
});

const tagOptions = ref<Api.SystemManage.DictOptions[]>([]);

function handleInitModel() {
  Object.assign(gameServer.value, props.gameServerVo);
}

// 注册tag颜色
const renderColor = (typeName: string) => {
  switch (typeName) {
    case '0':
      return {
        color: '#f6ffed',
        borderColor: '#b7eb8f',
        textColor: '#389e0d'
      };
    case '1':
      return {
        color: '#e6fffb',
        borderColor: '#87e8de',
        textColor: '#08979c'
      };
    case '2':
      return {
        color: '#fff0f6',
        borderColor: '#ffadd2',
        textColor: '#c41d7f'
      };
    case '3':
      return {
        color: '#fff2e8',
        borderColor: '#ffbb96',
        textColor: '#d4380d'
      };
    case '4':
      return {
        color: '#fff1f0',
        borderColor: '#ffa39e',
        textColor: '#cf1322'
      };
    default:
      return {
        color: '#f6ffed',
        borderColor: '#b7eb8f',
        textColor: '#389e0d'
      };
  }
};

// 注册Type名称
const renderTypeName = (typeName: string) => {
  switch (typeName) {
    case '0':
      return 'T1-简单';
    case '1':
      return 'T2-普通';
    case '2':
      return 'T3-困难';
    case '3':
      return 'T4-极难';
    case '4':
      return 'T5-史诗';
    default:
      return 'T0-未知';
  }
};

// 计算进度颜色
const getOnLineColor = (server: Api.Game.SteamServer) => {
  if (server.serverVo.players <= 20) {
    return `background-color: #00f91a;height: ${(server.serverVo.players / server.serverVo.maxPlayers) * 100}%;`;
  } else if (server.serverVo.players <= 40) {
    return `background-color: #5470ee;height: ${(server.serverVo.players / server.serverVo.maxPlayers) * 100}%;`;
  } else if (server.serverVo.players <= 60) {
    return `background-color: #ffa325;height: ${(server.serverVo.players / server.serverVo.maxPlayers) * 100}%;`;
  } else if (server.serverVo.players <= 80) {
    return `background-color: #ff4f00;height: ${(server.serverVo.players / server.serverVo.maxPlayers) * 100}%;`;
  }
  return `background-color: #ff0000;height: ${(server.serverVo.players / server.serverVo.maxPlayers) * 100}%;`;
};

watch(
  props,
  () => {
    handleInitModel();
  },
  {
    deep: true,
    immediate: true
  }
);

onMounted(() => {
  tagOptions.value = dictOptions('game_tag');
});
</script>

<template>
  <div class="server-card flex overflow-hidden" :style="{ backgroundImage: `url(${gameServer.serverVo.mapUrl})` }">
    <div class="server-card-mask"></div>
    <div class="server-online" :style="`${getOnLineColor(gameServer)}`"></div>
    <div class="server-card-left">
      <div class="server-card-name ml-5px mt-3px">{{ gameServer.serverName }}</div>
      <div class="server-card-onLine ml-5px mt-3px flex-y-center">
        <SvgIcon icon="ion:game-controller-outline" class="mr-6px text-20px" />
        <NEllipsis>
          {{ gameServer.serverVo.players }}/{{ gameServer.serverVo.maxPlayers }} | {{ gameServer.serverVo.mapLabel }}({{
            gameServer.serverVo.mapName
          }})
        </NEllipsis>
        <NTag :color="renderColor(gameServer.serverVo.type)" size="small" class="ml-5px mr-5px">
          {{ renderTypeName(gameServer.serverVo.type) }}
        </NTag>
      </div>
      <div class="server-card-tag ml-5px mt-3px">
        <NTag
          v-for="(tag, index) in gameServer.serverVo.tag"
          :key="index"
          size="small"
          round
          class="ml-3px"
          type="success"
        >
          {{ tagOptions.find((item: any) => item.value === tag)?.label }}
        </NTag>
      </div>
    </div>
    <div class="server-card-right">
      <div class="one-btn">
        <SvgIcon icon="iconamoon:enter" class="text-20px" />
      </div>
      <div class="two-btn">
        <SvgIcon icon="solar:copy-outline" class="text-20px" />
      </div>
      <div class="three-btn">
        <SvgIcon icon="material-symbols:alarm-smart-wake-outline" class="text-20px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-card {
  position: relative;
  min-width: 300px;
  height: 120px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;

  /* 遮罩层样式 */
  .server-card-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  .server-online {
    max-width: 5px;
    width: 100%;
    position: sticky;
  }

  .server-card-left {
    width: 90%;
    height: 100%;

    .server-card-name {
      position: sticky;
      color: #ffffff;
      z-index: 999;
      font-weight: bold;
    }

    .server-card-onLine {
      position: sticky;
      color: #ffffff;
      z-index: 999;
    }
  }

  .server-card-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: sticky;
    width: 10%;
    height: 100%;
    color: #ffffff;
    flex-direction: column;

    /* 改为列方向布局 */
    .one-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      border-radius: 12px 0 0 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .two-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 2;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;

      &:hover {
        background-color: rgba(150, 150, 150, 0.5);
      }
    }

    .three-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      border-radius: 0 0 0 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  /* 当鼠标移入盒子时，遮罩层消失 */
  &:hover .server-card-mask {
    opacity: 0;
  }

  /* 当鼠标移入盒子时，添加盒子阴影 */
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: opacity 0.1s ease;
  }
}
</style>
