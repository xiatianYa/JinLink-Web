import { request } from '@/service/request';

// 获取游戏服务器列表(分页)
export function fetchGetServerList(params?: Api.Game.ServerSearchParams) {
  return request<Api.Game.ServerList>({
    url: '/gameServer/page',
    method: 'get',
    params
  });
}

/** 删除游戏服务器 */
export function fetchDeleteServerById(id: string) {
  return request({
    url: `/gameServer/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏服务器 */
export function fetchUpdateServer(params: Api.Game.ServerParams) {
  return request({
    url: `/gameServer/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏服务器 */
export function fetchInsertServer(params: Api.Game.ServerParams) {
  return request({
    url: `/gameServer/save`,
    method: 'post',
    data: params
  });
}

// 查询所有服务器数据(依据SteamApi)(分页)
export function fetchGetServerAllBySteam(params?: Api.Game.ServerSearchParams) {
  return request<Api.Game.SteamServerVoList>({
    url: '/gameServer/getServerAll',
    method: 'get',
    params
  });
}
