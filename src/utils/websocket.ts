import { createDiscreteApi } from 'naive-ui';
import { useAuthStore } from '@/store/modules/auth';
import { useGameStore } from '@/store/modules/game';
const wsUrl = 'ws://127.0.0.1:8080/ws/server/';
const Websocket: any = {
  websocket: null,
  // 连接地址
  connectURL: wsUrl,
  // 重连timer
  reconnectTimer: null,
  // 重连频率
  reconnectInterval: 8000,
  // 消息提示
  notification: null,
  // 建立websocket连接
  init: () => {
    // 全局仓库
    const authStore = useAuthStore();
    // 游戏仓库
    const gameStore = useGameStore();
    // 初始化消息对象
    const { notification } = createDiscreteApi(['notification']);
    Websocket.notification = notification;
    // 浏览器适配
    if (!('WebSocket' in window)) {
      Websocket.notification.error({
        content: '适配警告',
        meta: '浏览器不支持WebSocket',
        duration: 1500,
        keepAliveOnHover: true
      });
      return;
    }
    if (!authStore.token) {
      Websocket.notification.error({
        content: '认证失败',
        meta: 'Token不存在',
        duration: 1500,
        keepAliveOnHover: true
      });
      return;
    }
    // 建立websocket连接
    Websocket.websocket = new WebSocket(wsUrl + authStore.token);
    // 监听服务器返回的数据
    Websocket.websocket.onmessage = (e: any) => {
      // 处理服务器传递过来的参数
      const data: any = JSON.parse(e.data);
      // 处理消息
      switch (data.code) {
        // 用户登陆成功
        case '200':
          Websocket.notification.success({
            content: '连接服务器成功',
            meta: '登录器反馈群号 -> 901243791, 登录器问题反馈请加群!',
            duration: 4000,
            keepAliveOnHover: true
          });
          break;
        // 获取自动挤服消息
        case '201': {
          // 重新设置全局挤服对象人数信息
          gameStore.automaticInfo!.players = data.players ?? gameStore.automaticInfo!.players;
          gameStore.automaticInfo!.maxPlayers = data.maxPlayers ?? gameStore.automaticInfo!.players;
          // 全局isAutomatic 为 false
          if (!gameStore.isAutomatic) return;
          // 如果返回状态为 true 则继续挤服
          if (!data.status) {
            gameStore.automaticCount += 1;
            setTimeout(() => {
              Websocket.sendJoinServer(gameStore.automaticInfo);
            }, 100);
            return;
          }
          // 清空数据
          gameStore.isAutomatic = false;
          gameStore.automaticCount = 0;
          const aLink = document.createElement('a');
          aLink.href = `steam://rungame/730/76561198977557298/+connect ${gameStore.automaticInfo!.addr}`;
          aLink.click();
          // 发送消息
          Websocket.notification.success({
            content: '连接成功',
            meta: '游戏服务连接成功',
            duration: 1500,
            keepAliveOnHover: true
          });
          break;
        }
        // 获取服务器数据
        case '202':
          gameStore.autoMapReceiveList = data.data;
          break;
        // 服务器推送在线用户列表
        case '203':
          gameStore.onlineUserList = data.data;
          break;
        // 挤服失败的消息
        case '205':
          // 全局isAutomatic 为 false
          if (!gameStore.isAutomatic) return;
          gameStore.automaticCount += 1;
          Websocket.sendJoinServer(gameStore.automaticInfo);
          break;
        default:
          break;
      }
    };
    // 连接断开时触发
    Websocket.websocket.onclose = () => {
      Websocket.onClose();
    };
    // 连接成功
    Websocket.websocket.onopen = () => {
      // 连接成功 清空定时任务
      clearTimeout(Websocket.reconnectTimer);
      Websocket.reconnectTimer = null;
    };
  },
  // 发送数据 全体消息
  sendMsgAll: (data: any) => {
    Websocket.websocket.send(data);
  },
  // 发送挤服数据
  sendJoinServer: (data: Api.Game.SteamServer) => {
    Websocket.websocket.send(JSON.stringify(data));
  },
  // 处理断开连接操作
  onClose: () => {
    // 当前定时任务为null时 && websocket为null时 自动重连
    if (!Websocket.reconnectTimer) {
      // 触发重连机制
      Websocket.reconnectTimer = setInterval(() => {
        // 创建连接
        Websocket.reconnect(true);
      }, Websocket.reconnectInterval);
    }
  },
  // 重新连接
  reconnect: () => {
    Websocket.init();
  }
};
export default Websocket;
