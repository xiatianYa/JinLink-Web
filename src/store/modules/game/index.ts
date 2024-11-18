import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import Websocket from '@/utils/websocket';

export const useGameStore = defineStore(SetupStoreId.Game, () => {
  // 已接收到地图订阅的服务器消息
  const autoMapReceiveList = ref<Array<any>>();
  // 是否自动挤服
  const isAutomatic = ref<boolean>(false);
  // 挤服信息
  const automaticInfo = ref<Api.Game.SteamServer | null>(null);
  // 检测次数
  const automaticCount = ref<number>(0);
  // 在线用户列表
  const onlineUserList = ref<Array<any>>([]);

  /** Initialize dictionary data */
  async function initWebSocket() {
    Websocket.init();
  }

  return {
    initWebSocket,
    autoMapReceiveList,
    automaticInfo,
    automaticCount,
    isAutomatic,
    onlineUserList
  };
});
