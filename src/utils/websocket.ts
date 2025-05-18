import dayjs from 'dayjs';
import pako from 'pako';
import { NButton, NImage } from 'naive-ui';
import { h } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useGameStore } from '@/store/modules/game';
import { fetchUpdateMapOrder } from '@/service/api/game/map';
import { isMoreThanTwoHours } from '@/utils/time';

// 连接地址
// const wsUrl = 'wss://www.bluearchive.top/websocket/ws/server/';
const wsUrl = 'ws://127.0.0.1:8080/ws/server/';

// 定义WebSocket相关的类型
interface WebSocketType {
  websocket: WebSocket | null;
  connectURL: string;
  reconnectTimer: NodeJS.Timeout | null;
  reconnectInterval: number;
  notification: any;
  init(): void;
  sendMsgAll(data: any): void;
  sendJoinServer(data: Api.Game.SteamServerVo | null): void;
  sendMsgAllPush(data: any): void;
  sendMsgConnect(serverIp: string | null): void;
  sendTextMsg(content: string): void;
  sendEmojiMsg(content: string): void;
  sendMImgMsg(content: string): void;
  notificationMapOrder(data: Array<Api.Game.SourceServerVo>): void;
  renderChatRoom(lastMessage: any, gameStore: any): any;
  onClose(): void;
  reconnect(): void;
  close(): void;
}

// 定义WebSocket实例
const Websocket: WebSocketType = {
  websocket: null,
  connectURL: wsUrl,
  reconnectTimer: null,
  reconnectInterval: 8000,
  notification: null,

  // 建立websocket连接
  init(): void {
    const authStore = useAuthStore();
    const gameStore = useGameStore();

    if (Websocket.websocket) return;

    if (!authStore.isLogin) {
      window.$message?.error('认证不存在!');
      return;
    }

    Websocket.websocket = new WebSocket(wsUrl + authStore.token);

    // 监听服务器返回的数据
    Websocket.websocket.onmessage = (e: MessageEvent) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const arrayBuffer = event.target!.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        try {
          const jsonText = new TextDecoder('utf-8').decode(pako.ungzip(uint8Array));
          const data = JSON.parse(jsonText);

          // 定义一个处理函数的映射对象
          const handlers: { [key: string]: (data: any) => void } = {
            '200': () => {
              setTimeout(() => {
                window.$notification?.success({
                  content: '连接服务器成功',
                  duration: 20000,
                  keepAliveOnHover: true
                });
              }, 1000);
            },
            '201': () => {
              gameStore.automaticInfo!.players = data.players ?? gameStore.automaticInfo!.players;
              gameStore.automaticInfo!.maxPlayers = data.maxPlayers ?? gameStore.automaticInfo!.players;
              gameStore.automaticInfo!.ip = data.ip;
              gameStore.automaticInfo!.port = data.port;

              if (!gameStore.isAutomatic) return;

              if (!data.status) {
                gameStore.automaticCount += 1;
                setTimeout(() => {
                  Websocket.sendJoinServer(gameStore.automaticInfo);
                }, 10);
                return;
              }

              gameStore.isAutomatic = false;
              gameStore.automaticCount = 0;
              const aLink = document.createElement('a');
              aLink.href = `steam://rungame/730/76561198977557298/+connect ${gameStore.automaticInfo?.connectStr}`;
              aLink.click();

              window.$notification?.success({
                content: '连接成功',
                meta: '游戏服务连接成功',
                duration: 1000,
                keepAliveOnHover: true
              });
              Websocket.sendMsgConnect(gameStore.automaticInfo?.addr ?? null);
            },
            '202': () => {
              gameStore.autoMapReceiveList = data.data;
              Websocket.notificationMapOrder(data.data);
            },
            '203': () => {
              gameStore.onlineUserList = data.data;
            },
            '205': () => {
              if (!gameStore.isAutomatic) return;
              gameStore.automaticCount += 1;
              Websocket.sendJoinServer(gameStore.automaticInfo);
            },
            '206': () => {
              window.$notification?.create({
                title: '暧服推送',
                description: `${data.data.description}`,
                content: `${data.data.pushUserName} 邀请你在服务器:${data.data.serverName} 游玩 ${data.data.mapName}(${data.data.mapLabel})。`,
                meta: `${dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')}`,
                duration: 120000,
                keepAliveOnHover: true,
                action: () =>
                  h(
                    NButton,
                    {
                      type: 'info',
                      tertiary: true,
                      round: true,
                      onClick: () => {
                        window.open(`steam://rungame/730/76561198977557298/+connect ${data.data.connectStr}`);
                        Websocket.notification.destroyAll();
                        window.$message?.success('连接成功');
                        Websocket.sendMsgConnect(data.data.addr);
                      }
                    },
                    '连接'
                  )
              });
            },
            '207': () => {
              // 群聊消息
              gameStore.chatRoomMessageList.push(data.data);
              // 增加当前消息数量
              gameStore.chatRoomCurrentMsgCount += 1;
              // 如果不是本人发送 则发起通知
              if (data.data.fromId !== authStore.userInfo.userId) {
                window.$notification?.create({
                  title: 'Ba公共聊天室',
                  content: () => {
                    return Websocket.renderChatRoom(data.data, gameStore);
                  },
                  duration: 20000,
                  keepAliveOnHover: true
                });
              }
            }
          };

          // 根据 data.code 调用相应的处理函数
          const handler = handlers[data.code];
          if (handler) {
            handler(data);
          }
        } catch (error) {
          window.$message?.error(`消息异常:${error}`);
        }
      };

      reader.readAsArrayBuffer(e.data);
    };

    // 连接断开时触发
    Websocket.websocket.onclose = () => {
      if (!authStore.isLogin) return;

      gameStore.isAutomatic = false;
      gameStore.automaticCount = 0;

      window.$notification?.warning({
        content: '服务器连接断开',
        meta: '自动尝试重新连接中 或 刷新浏览器!',
        duration: 4000,
        keepAliveOnHover: true
      });

      Websocket.onClose();
    };

    // 连接成功
    Websocket.websocket.onopen = () => {
      clearTimeout(Websocket.reconnectTimer as NodeJS.Timeout);
      Websocket.reconnectTimer = null;

      if (gameStore.isAutomatic) {
        Websocket.sendJoinServer(gameStore.automaticInfo);
      }
    };
  },

  // 发送数据 全体消息
  sendMsgAll(data: any): void {
    if (Websocket.websocket) {
      Websocket.websocket.send(data);
    }
  },

  // 发送挤服数据
  sendJoinServer(data: Api.Game.SteamServerVo): void {
    const sendMessage = {
      type: 0,
      data
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 发送推送服务器 全体消息
  sendMsgAllPush(data: any): void {
    const sendMessage = {
      type: 1,
      data
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 发送连接服务器
  sendMsgConnect(serverIp: string): void {
    const sendMessage = {
      type: 2,
      data: serverIp
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 聊天室发送文字消息
  sendTextMsg(content: string): void {
    const sendMessage = {
      type: 3,
      data: {
        content,
        type: 1
      }
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 聊天室发送表情消息
  sendEmojiMsg(content: string): void {
    const sendMessage = {
      type: 3,
      data: {
        content,
        type: 3
      }
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 聊天室发送图片消息
  sendMImgMsg(content: string): void {
    const sendMessage = {
      type: 3,
      data: {
        content,
        type: 2
      }
    };

    if (Websocket.websocket) {
      Websocket.websocket.send(JSON.stringify(sendMessage));
    }
  },

  // 地图订阅通知
  notificationMapOrder(data: Array<Api.Game.SourceServerVo>): void {
    const gameStore = useGameStore();
    const communityIds = localStorage.getItem('communityIds');
    const modeIds = localStorage.getItem('modeIds');

    data.forEach(async (item: Api.Game.SourceServerVo) => {
      if (communityIds && !communityIds.includes(String(item.gameCommunity.id))) return;

      item.gameServerVoList.forEach(async (server: Api.Game.SteamServerVo) => {
        if (modeIds && !modeIds.includes(String(server.modeId))) return;

        const mapOrder = gameStore.mapOrderList?.find((map: Api.GameMapOrder.gameMapOrderVo) => {
          return map.gameMapVo.mapName === server.mapName;
        });

        if (mapOrder) {
          const isOrder = mapOrder.orderTimes?.find((order: Api.GameMapOrder.orderTime) => {
            return order.addr === server.addr && order.mapName === server.mapName;
          });

          if (!isOrder) {
            mapOrder.orderTimes = [...(mapOrder?.orderTimes ?? [])];
            mapOrder.orderTimes.push({
              addr: server.addr,
              mapName: server.mapName,
              orderTime: dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')
            });

            await fetchUpdateMapOrder({
              id: mapOrder.id,
              userId: mapOrder.userId,
              mapId: mapOrder.gameMapVo.id,
              orderTimes: JSON.stringify(mapOrder.orderTimes)
            });

            gameStore.initMapOrderList();

            if (window.Notification) {
              const popNotice = () => {
                const notification = new Notification('地图订阅通知', {
                  body: `您所订阅的地图 ${server.mapName}(${server.mapLabel}) 已在 ${server.serverName} 进行游戏。`,
                  icon: 'https://www.bluearchive.top/favicon.svg'
                });

                notification.onclick = () => {
                  window.open(`steam://rungame/730/76561198977557298/+connect ${server.addr}`);
                  notification.close();
                  Websocket.sendMsgConnect(server.addr);
                };
              };

              if (Notification.permission === 'granted') {
                popNotice();
              } else {
                Notification.requestPermission(() => {
                  popNotice();
                });
              }
            }

            window.$notification?.create({
              title: '通知成功',
              content: `您所订阅的地图 ${server.mapName} 已在 ${server.serverName} 进行游戏。`,
              meta: `${dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')}`,
              duration: 5000,
              keepAliveOnHover: true,
              action: () =>
                h(
                  NButton,
                  {
                    type: 'info',
                    tertiary: true,
                    round: true,
                    onClick: () => {
                      window.open(`steam://rungame/730/76561198977557298/+connect ${server.addr}`);
                      Websocket.sendMsgConnect(server.addr);
                    }
                  },
                  '连接'
                )
            });
          } else if (isMoreThanTwoHours(isOrder.orderTime)) {
            isOrder.orderTime = dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss');

            await fetchUpdateMapOrder({
              id: mapOrder.id,
              userId: mapOrder.userId,
              mapId: mapOrder.gameMapVo.id,
              orderTimes: JSON.stringify(mapOrder.orderTimes)
            });

            gameStore.initMapOrderList();

            if (window.Notification) {
              const popNotice = () => {
                const notification = new Notification('地图订阅通知', {
                  body: `您所订阅的地图 ${server.mapName}(${server.mapLabel}) 已在 ${server.serverName} 进行游戏。`,
                  icon: 'https://www.bluearchive.top/favicon.svg'
                });

                notification.onclick = () => {
                  window.open(`steam://rungame/730/76561198977557298/+connect ${server.addr}`);
                  notification.close();
                  Websocket.sendMsgConnect(server.addr);
                };
              };

              if (Notification.permission === 'granted') {
                popNotice();
              } else {
                Notification.requestPermission(() => {
                  popNotice();
                });
              }
            }

            window.$notification?.success({
              title: '通知成功',
              content: `您所订阅的地图 ${server.mapName} 已在 ${server.serverName} 进行游戏。`,
              meta: `${dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')}`,
              duration: 5000,
              keepAliveOnHover: true,
              action: () =>
                h(
                  NButton,
                  {
                    type: 'info',
                    tertiary: true,
                    round: true,
                    onClick: () => {
                      window.open(`steam://rungame/730/76561198977557298/+connect ${server.addr}`);
                      Websocket.sendMsgConnect(server.addr);
                    }
                  },
                  '连接'
                )
            });
          }
        }
      });
    });
  },

  // 聊天室消息渲染
  renderChatRoom(lastMessage: any): any {
    const senderDiv = h('div', { class: 'mr-5px' }, `${lastMessage.loginUser.nickName}说 :`);

    let messageContent;
    if (lastMessage.type === '1' || lastMessage.type === '3') {
      messageContent = h(
        'div',
        {
          class: 'msg-text max-w-100% flex-wrap',
          strong: true,
          secondary: true
        },
        lastMessage.content
      );
    } else {
      messageContent = h(NImage, {
        class: 'h-24px w-24px',
        src: lastMessage.content,
        previewDisabled: true
      });
    }

    return h('div', { class: 'bottom flex-y-center' }, [senderDiv, messageContent]);
  },

  // 处理断开连接操作
  onClose(): void {
    Websocket.websocket = null;
    if (!Websocket.reconnectTimer) {
      Websocket.reconnectTimer = setInterval(() => {
        Websocket.reconnect();
      }, Websocket.reconnectInterval);
    }
  },

  // 重新连接
  reconnect(): void {
    Websocket.init();
  },

  // 关闭Websocket连接
  close(): void {
    if (Websocket.websocket) {
      Websocket.websocket.close();
    }

    clearTimeout(Websocket.reconnectTimer as NodeJS.Timeout);
    Websocket.reconnectTimer = null;
  }
};

export default Websocket;
