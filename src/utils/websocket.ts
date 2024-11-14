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
            meta: '推荐使用Microsoft Edge | Chrome 浏览器进行操作。',
            duration: 2000,
            keepAliveOnHover: true
          });
          break;
        // 获取自动挤服消息
        case '201':
          break;
        // 获取服务器数据
        case '202':
          gameStore.autoMapReceiveList = data.content;
          break;
        default:
          break;
      }
      console.log(data);
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
