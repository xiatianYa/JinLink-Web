import { request } from '@/service/request';

// 获取游戏地图列表(分页)
export function fetchGetMapList(params?: Api.Game.MapSearchParams) {
  return request<Api.Game.MapList>({
    url: '/gameMap/page',
    method: 'get',
    params
  });
}

/** 删除游戏地图 */
export function fetchDeleteMapById(id: string) {
  return request({
    url: `/gameMap/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏地图 */
export function fetchUpdateMap(params: Api.Game.MapParams) {
  return request({
    url: `/gameMap/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏地图 */
export function fetchInsertMap(params: Api.Game.MapParams) {
  return request({
    url: `/gameMap/save`,
    method: 'post',
    data: params
  });
}
