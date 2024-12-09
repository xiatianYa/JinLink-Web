import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import Websocket from '@/utils/websocket';
import { fetchGetMapOrderListByUserId } from '@/service/api';

export const useGameStore = defineStore(SetupStoreId.Game, () => {
  // 已接收到地图订阅的服务器消息
  const autoMapReceiveList = ref<Array<any>>();
  // 是否自动挤服
  const isAutomatic = ref<boolean>(false);
  // 挤服信息
  const automaticInfo = ref<Api.Game.SteamServerVo | null>(null);
  // 检测次数
  const automaticCount = ref<number>(0);
  // 在线用户列表
  const onlineUserList = ref<Array<any>>([]);
  // 地图订阅列表
  const mapOrderList = ref<Api.GameMapOrder.gameMapOrderList>([]);

  /** Initialize WebSocket connection */
  async function initWebSocket() {
    Websocket.init();
  }

  /** 初始化地图订阅列表 */
  async function initMapOrderList() {
    const { data, error } = await fetchGetMapOrderListByUserId();
    if (!error) {
      mapOrderList.value = data;
    }
  }

  /** Close WebSocket connection */
  function closeWebSocket() {
    if (Websocket.websocket) {
      Websocket.close();
    }
  }

  return {
    initWebSocket,
    closeWebSocket,
    initMapOrderList,
    autoMapReceiveList,
    automaticInfo,
    automaticCount,
    isAutomatic,
    onlineUserList,
    mapOrderList
  };
});
