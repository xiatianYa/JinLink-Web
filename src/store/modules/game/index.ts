import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import Websocket from '@/utils/websocket';

export const useGameStore = defineStore(SetupStoreId.Game, () => {
  // 已接收到地图订阅的服务器消息
  const autoMapReceiveList = ref<Array<any>>();

  /** Initialize dictionary data */
  async function initWebSocket() {
    Websocket.init();
  }

  return {
    initWebSocket,
    autoMapReceiveList
  };
});
