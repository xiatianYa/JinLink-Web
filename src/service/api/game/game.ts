import { request } from '@/service/request';

// 获取游戏类型列表(分页)
export function fetchGetGameList(params?: Api.Game.GameSearchParams) {
  return request<Api.Game.GameList>({
    url: '/gameGame/page',
    method: 'get',
    params
  });
}

/** 删除游戏类型 */
export function fetchDeleteGameById(id: string) {
  return request({
    url: `/gameGame/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏类型 */
export function fetchUpdateGame(params: Api.Game.GameParams) {
  return request({
    url: `/gameGame/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏类型 */
export function fetchInsertGame(params: Api.Game.GameParams) {
  return request({
    url: `/gameGame/save`,
    method: 'post',
    data: params
  });
}
