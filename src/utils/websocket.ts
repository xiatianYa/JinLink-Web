import dayjs from 'dayjs';
import pako from 'pako';
import { createDiscreteApi } from 'naive-ui';
import { useAuthStore } from '@/store/modules/auth';
import { useGameStore } from '@/store/modules/game';
import { fetchUpdateMapOrder } from '@/service/api/game/map';
import { isMoreThanTwoHours } from '@/utils/time';
const wsUrl = 'wss://www.bluearchive.top/websocket/ws/server/';
// const wsUrl = 'ws://127.0.0.1:8080/ws/server/';
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
    if (!authStore.isLogin) {
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
      // 使用FileReader将Blob转换为ArrayBuffer
      const reader = new FileReader();
      reader.onload = event => {
        const arrayBuffer = event.target!.result as ArrayBuffer;

        // 将ArrayBuffer转换为Uint8Array（这一步是可选的）
        const uint8Array = new Uint8Array(arrayBuffer);
        try {
          // 如果原始数据是文本，将其转换为字符串
          const jsonText = new TextDecoder('utf-8').decode(pako.ungzip(uint8Array));

          const data = JSON.parse(jsonText);

          // 处理消息
          switch (data.code) {
            // 用户登陆成功
            case '200':
              Websocket.notification.success({
                content: '连接服务器成功',
                meta: '登录器反馈群号 -> 901243791, 登录器软件版下载,问题反馈请加群!',
                duration: 6000,
                keepAliveOnHover: true
              });
              break;
            // 获取自动挤服消息
            case '201': {
              // 重新设置全局挤服对象人数信息
              gameStore.automaticInfo!.players = data.players ?? gameStore.automaticInfo!.players;
              gameStore.automaticInfo!.maxPlayers = data.maxPlayers ?? gameStore.automaticInfo!.players;
              // 重新设置服务器信息
              gameStore.automaticInfo!.ip = data.ip;
              gameStore.automaticInfo!.port = data.port;
              // 全局isAutomatic 为 false
              if (!gameStore.isAutomatic) return;
              // 如果返回状态为 true 则继续挤服
              if (!data.status) {
                gameStore.automaticCount += 1;
                setTimeout(() => {
                  Websocket.sendJoinServer(gameStore.automaticInfo);
                }, 70);
                return;
              }
              // 清空数据
              gameStore.isAutomatic = false;
              gameStore.automaticCount = 0;
              const aLink = document.createElement('a');
              aLink.href = `steam://rungame/730/76561198977557298/+connect ${gameStore.automaticInfo?.addr}`;
              aLink.click();
              // 发送消息
              Websocket.notification.success({
                content: '连接成功',
                meta: '游戏服务连接成功',
                duration: 1000,
                keepAliveOnHover: true
              });
              break;
            }
            // 获取服务器数据
            case '202':
              gameStore.autoMapReceiveList = data.data;
              // 地图订阅通知
              Websocket.notificationMapOrder(data.data);
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
        } catch (error) {
          console.log('解压失败:', error);
        }
      };
      // 读取Blob为ArrayBuffer
      reader.readAsArrayBuffer(e.data);
    };
    // 连接断开时触发
    Websocket.websocket.onclose = () => {
      // 如果当前用户退出登录 则不进行重新连接
      if (!authStore.isLogin) return;
      // 切断自动挤服
      gameStore.isAutomatic = false;
      gameStore.automaticCount = 0;
      Websocket.notification.warning({
        content: '服务器连接断开',
        meta: '自动尝试重新连接中 或 刷新浏览器!',
        duration: 4000,
        keepAliveOnHover: true
      });
      Websocket.onClose();
    };
    // 连接成功
    Websocket.websocket.onopen = () => {
      // 连接成功 清空定时任务
      clearTimeout(Websocket.reconnectTimer);
      Websocket.reconnectTimer = null;
      // 判断是否在挤服中,如果是则断连续发
      if (gameStore.isAutomatic) {
        Websocket.sendJoinServer(gameStore.automaticInfo);
      }
    };
  },
  // 发送数据 全体消息
  sendMsgAll: (data: any) => {
    Websocket.websocket.send(data);
  },
  // 发送挤服数据
  sendJoinServer: (data: Api.Game.SteamServerVo) => {
    Websocket.websocket.send(JSON.stringify(data));
  },
  // 地图订阅通知
  notificationMapOrder: (data: Array<Api.Game.SourceServerVo>) => {
    // 游戏仓库
    const gameStore = useGameStore();
    data.forEach(async (item: Api.Game.SourceServerVo) => {
      item.gameServerVoList.forEach(async (server: Api.Game.SteamServerVo) => {
        // 查找地图订阅是否有此地图
        const mapOrder = gameStore.mapOrderList?.find((map: Api.GameMapOrder.gameMapOrderVo) => {
          return map.gameMapVo.mapName === server.mapName;
        });
        if (mapOrder) {
          // 判断当前是添加过通知
          const isOrder = mapOrder.orderTimes?.find((order: Api.GameMapOrder.orderTime) => {
            return order.addr === server.addr && order.mapName === server.mapName;
          });
          // 如果当前没有通知过 则添加通知
          if (!isOrder) {
            mapOrder.orderTimes = [...(mapOrder?.orderTimes ?? [])];
            mapOrder.orderTimes.push({
              addr: server.addr,
              mapName: server.mapName,
              orderTime: dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')
            });
            // 修改通知时间
            await fetchUpdateMapOrder({
              id: mapOrder.id,
              userId: mapOrder.userId,
              mapId: mapOrder.gameMapVo.id,
              orderTimes: JSON.stringify(mapOrder.orderTimes)
            });
            // 重置仓库
            gameStore.initMapOrderList();
            // 发送通知
            if (window.Notification) {
              const popNotice = () => {
                const notification = new Notification('地图订阅通知', {
                  body: `您所订阅的地图 ${server.mapName}(${server.mapLabel}) 已在 ${server.serverName} 进行游戏。`,
                  icon: 'https://www.bluearchive.top/favicon.svg'
                });
                // 点击通知的回调函数
                notification.onclick = () => {
                  window.open(`steam://rungame/730/76561198977557298/+connect ${gameStore.automaticInfo?.addr}`);
                  notification.close();
                };
              };
              /* 授权过通知 */
              if (Notification.permission === 'granted') {
                popNotice();
              } else {
                /* 未授权，先询问授权 */
                Notification.requestPermission(() => {
                  popNotice();
                });
              }
            }
            // 网页通知
            Websocket.notification.success({
              content: '订阅成功',
              meta: `您所订阅的地图 ${server.mapName} 已在 ${server.serverName} 进行游戏。`,
              duration: 5000,
              keepAliveOnHover: true
            });
          } else if (isMoreThanTwoHours(isOrder.orderTime)) {
            // 如果当前通知过且超过两小时 则修改通知时间
            isOrder.orderTime = dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss');
            // 修改通知时间
            await fetchUpdateMapOrder({
              id: mapOrder.id,
              userId: mapOrder.userId,
              mapId: mapOrder.gameMapVo.id,
              orderTimes: JSON.stringify(mapOrder.orderTimes)
            });
            // 重置仓库
            gameStore.initMapOrderList();
            // 发送通知
            if (window.Notification) {
              const popNotice = () => {
                const notification = new Notification('地图订阅通知', {
                  body: `您所订阅的地图 ${server.mapName}(${server.mapLabel}) 已在 ${server.serverName} 进行游戏。`,
                  icon: 'https://www.bluearchive.top/favicon.svg'
                });
                // 点击通知的回调函数
                notification.onclick = () => {
                  window.open(`steam://rungame/730/76561198977557298/+connect ${gameStore.automaticInfo?.addr}`);
                  notification.close();
                };
              };
              /* 授权过通知 */
              if (Notification.permission === 'granted') {
                popNotice();
              } else {
                /* 未授权，先询问授权 */
                Notification.requestPermission(() => {
                  popNotice();
                });
              }
            }
            // 网页通知
            Websocket.notification.success({
              content: '订阅成功',
              meta: `您所订阅的地图 ${server.mapName} 已在 ${server.serverName} 进行游戏。`,
              duration: 5000,
              keepAliveOnHover: true
            });
          }
        }
      });
    });
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
  },
  // 关闭Websocket连接
  close: () => {
    if (Websocket.websocket) {
      // 关闭websocket
      Websocket.websocket.close();
    }
    // 清除定时器任务
    clearTimeout(Websocket.reconnectTimer);
    Websocket.reconnectTimer = null;
  }
};
export default Websocket;
