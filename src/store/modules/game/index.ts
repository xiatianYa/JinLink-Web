import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import Websocket from '@/utils/websocket';
import { fetchGetChatRoomMessageList, fetchGetMapOrderListByUserId } from '@/service/api';

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
  // 聊天室消息列表
  const chatRoomMessageList = ref<Array<any>>([]);
  // 聊天室当前消息数量
  const chatRoomCurrentMsgCount = ref<number>(0);
  // 聊天室每次加载数量
  const chatRoomLoadMsgCount = ref<number>(20);

  /** Initialize */
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

  /** 初始化聊天室消息列表 */
  async function initChatRoomMessageList() {
    const { data, error } = await fetchGetChatRoomMessageList(
      chatRoomCurrentMsgCount.value,
      chatRoomLoadMsgCount.value
    );
    // 如果数据不为空 则增加消息数量
    if (data) chatRoomCurrentMsgCount.value += data.length;
    if (!error) {
      chatRoomMessageList.value = data;
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
    initChatRoomMessageList,
    autoMapReceiveList,
    automaticInfo,
    automaticCount,
    isAutomatic,
    onlineUserList,
    mapOrderList,
    chatRoomMessageList,
    chatRoomCurrentMsgCount,
    chatRoomLoadMsgCount
  };
});
