<script setup lang="ts">
import { NTag, createDiscreteApi, useMessage } from 'naive-ui';
import { onMounted, ref, watch } from 'vue';
import { useDict } from '@/hooks/business/dict';
import { useGameStore } from '@/store/modules/game';
import websocket from '@/utils/websocket';
const { notification } = createDiscreteApi(['notification']);

defineOptions({
  name: 'ServerCard'
});

const { dictOptions } = useDict();

interface Props {
  /** 社区服务器数据 */
  gameServerVo: Api.Game.SteamServerVo;
}

// 定义props
const props = defineProps<Props>();

// 提示消息对象
const message = useMessage();

// 自动挤服 / 挂机模式 抽屉
const automaticDialog = ref(false);

// 游戏仓库
const gameStore = useGameStore();

// 定义游戏服务器数据
const gameServer = ref<Api.Game.SteamServerVo | null>();

// 定义标签数据
const tagOptions = ref<Api.SystemManage.DictOptions[]>([]);

// 初始化游戏服务器数据
function handleInitModel() {
  if (gameServer.value && props.gameServerVo) {
    Object.assign(gameServer.value, props.gameServerVo);
  } else {
    gameServer.value = { ...props.gameServerVo };
  }
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
const getOnLineColor = (server: Api.Game.SteamServerVo) => {
  if (!server) return '';
  if (server.players <= 20) {
    return `background-color: #00f91a;height: ${(server.players / server.maxPlayers) * 100}%;`;
  } else if (server.players <= 40) {
    return `background-color: #5470ee;height: ${(server.players / server.maxPlayers) * 100}%;`;
  } else if (server.players <= 60) {
    return `background-color: #ffa325;height: ${(server.players / server.maxPlayers) * 100}%;`;
  } else if (server.players <= 80) {
    return `background-color: #ff4f00;height: ${(server.players / server.maxPlayers) * 100}%;`;
  }
  return `background-color: #ff0000;height: ${(server.players / server.maxPlayers) * 100}%;`;
};

// 计算进度颜色
const getProgressColor = (progress: any) => {
  if (progress <= 20) {
    return '#00f91a';
  } else if (progress <= 40) {
    return '#5470ee';
  } else if (progress <= 60) {
    return '#ffa325';
  } else if (progress <= 80) {
    return '#ff4f00';
  }
  return '#ff0000';
};

// 加入服务器
const joinServer = (server: Api.Game.SteamServerVo) => {
  const aLink = document.createElement('a');
  aLink.href = `steam://rungame/730/76561198977557298/+connect ${server.addr}`;
  aLink.click();
  message.success('连接成功');
};

// 复制服务器地址
const copyServerAddr = (server: Api.Game.SteamServerVo) => {
  navigator.clipboard.writeText(`connect ${server.addr}`);
  message.success('复制成功');
};

// 打开自动挤服窗口
const onAutoJoinMap = (server: Api.Game.SteamServerVo) => {
  if (gameStore.isAutomatic && gameStore.automaticInfo?.addr === server.addr) {
    automaticDialog.value = true;
  } else {
    gameStore.isAutomatic = false;
    automaticDialog.value = true;
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
      maxPlayers,
      minPlayers,
      sourcePlayers
    } = server;
    gameStore.automaticInfo = {
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
      maxPlayers,
      minPlayers,
      sourcePlayers
    };
    gameStore.automaticInfo!.minPlayers = server.maxPlayers - 1;
  }
};

// 开启自动挤服
const handleAutomaticPersonnel = (value: boolean) => {
  // 关闭挤服
  if (!value) {
    // 清除挤服次数
    gameStore.automaticCount = 0;
    gameStore.isAutomatic = value;
    return;
  }
  // 未填写挤服人数
  if (!gameStore.automaticInfo?.minPlayers) {
    message.warning('请填最小玩家数!');
    return;
  }
  // 发送消息 开始主动挤服
  gameStore.isAutomatic = value;
  websocket.sendJoinServer(gameStore.automaticInfo);
};

// 抽屉关闭的回调函数
const handleDrawerClose = () => {
  notification.warning({
    content: '自动挤服框已隐藏',
    meta: '未关闭的自动挤服,将继续尝试挤服',
    duration: 4000,
    keepAliveOnHover: true
  });
};

// 监听props变化
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
  <div
    class="server-card flex overflow-hidden"
    :style="{
      backgroundImage: `url(${gameServer?.mapUrl ? gameServer?.mapUrl : 'https://www.bluearchive.top/statics/2024/11/21/noImg.jpg'})`
    }"
  >
    <div class="server-card-mask"></div>
    <div class="server-online" :style="`${getOnLineColor(gameServer!)}`"></div>
    <div class="server-card-left">
      <div class="server-card-name ml-5px mt-10px">
        <NEllipsis :line-clamp="1">
          {{ gameServer?.serverName }}
        </NEllipsis>
      </div>
      <div class="server-card-onLine flex-space-between ml-5px flex-y-center">
        <div class="flex-y-center">
          <SvgIcon icon="material-symbols:map-outline" class="mr-6px text-20px" />
          <NEllipsis :line-clamp="1">
            {{ gameServer?.players }}/{{ gameServer?.maxPlayers }} | {{ gameServer?.mapLabel }}({{
              gameServer?.mapName
            }})
          </NEllipsis>
        </div>
        <div>
          <NTag
            v-if="gameServer?.type"
            :color="renderColor(gameServer?.type ?? '-1')"
            size="small"
            strong
            class="ml-5px mr-10px"
          >
            {{ renderTypeName(gameServer?.type ?? '-1') }}
          </NTag>
        </div>
      </div>
      <div class="server-card-tag ml-5px mt-10px">
        <NTag v-for="(tag, index) in gameServer?.tag" :key="index" size="small" round class="mr-3px" type="success">
          {{ tagOptions.find((item: any) => item.value === tag)?.label }}
        </NTag>
      </div>
    </div>
    <div class="server-card-right">
      <div class="one-btn" @click="joinServer(gameServer!)">
        <SvgIcon icon="iconamoon:enter" class="text-20px" />
      </div>
      <div class="two-btn" @click="copyServerAddr(gameServer!)">
        <SvgIcon icon="solar:copy-outline" class="text-20px" />
      </div>
      <div class="three-btn" @click="onAutoJoinMap(gameServer!)">
        <SvgIcon icon="material-symbols:alarm-smart-wake-outline" class="text-20px" />
      </div>
    </div>
    <NDrawer v-model:show="automaticDialog" :width="400" placement="right" :on-after-leave="handleDrawerClose">
      <NDrawerContent closable>
        <template #header>
          <NEllipsis class="flex-y-center text-16px" :line-clamp="1">
            {{ gameStore.automaticInfo?.serverName }}
          </NEllipsis>
        </template>
        <NCard :bordered="false">
          <NSpace class="mb-10px" vertical>
            <span>地图名称 : {{ gameStore.automaticInfo?.mapName }}</span>
            <span>译名 : {{ gameStore.automaticInfo?.mapLabel }}</span>
          </NSpace>
          <NSpace class="mb-10px flex-y-center">
            <NImage
              width="170"
              :src="
                gameStore.automaticInfo?.mapUrl
                  ? gameStore.automaticInfo?.mapUrl
                  : 'https://www.bluearchive.top/statics/2024/11/21/noImg.jpg'
              "
            />
            <NProgress
              type="circle"
              :color="
                getProgressColor(
                  ((gameStore.automaticInfo?.players ?? 0) / (gameStore.automaticInfo?.maxPlayers ?? 1)) * 100
                )
              "
              :percentage="((gameStore.automaticInfo?.players ?? 0) / (gameStore.automaticInfo?.maxPlayers ?? 1)) * 100"
            >
              <span>当前在线人数:{{ gameStore.automaticInfo?.players ?? 0 }}</span>
            </NProgress>
          </NSpace>
          <NSpace class="mb-10px" vertical>
            <NInputNumber
              v-model:value="gameStore.automaticInfo!.minPlayers"
              class="mb-5"
              placeholder="(小于或等于时自动进入服务器)"
              :min="0"
              :max="(gameStore.automaticInfo?.maxPlayers ?? 1) - 1"
              :disabled="gameStore.isAutomatic"
              clearable
            >
              <template #minus-icon>
                <SvgIcon icon="ion:arrow-down-circle-outline" class="text-20px" />
              </template>
              <template #add-icon>
                <SvgIcon icon="ion:arrow-up-circle-outline" class="text-20px" />
              </template>
            </NInputNumber>
          </NSpace>
          <NSpace class="mb-10px">
            <div class="flex-y-center">
              <span class="mr-5px">自动挤服</span>
              <NSwitch v-model:value="gameStore.isAutomatic" size="large" :on-update:value="handleAutomaticPersonnel">
                <template #checked-icon>
                  <SvgIcon icon="ion:caret-back-circle-outline" class="text-20px" />
                </template>
                <template #unchecked-icon>
                  <SvgIcon icon="ion:caret-forward-circle-outline" class="text-20px" />
                </template>
              </NSwitch>
            </div>
          </NSpace>
          <NSpace>
            <span>尝试次数 : {{ gameStore.automaticCount }}</span>
          </NSpace>
        </NCard>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<style scoped lang="scss">
.server-card {
  position: relative;
  min-width: 150px;
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
    background-color: rgba(0, 0, 0, 0.5);
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
      background-color: rgba(0, 0, 0, 0.8);
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
