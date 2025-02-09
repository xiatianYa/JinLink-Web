import { request } from '@/service/request';

// 获取用户所在服务器信息
export function fetchGetUserServerInfo(userId: string) {
  return request<Api.Game.UserServerInfo>({
    url: '/websocket/getUserServerInfo',
    method: 'get',
    params: {
      id: userId
    }
  });
}
