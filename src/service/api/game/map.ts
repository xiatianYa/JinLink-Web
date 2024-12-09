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

/** 获取全部地图名称 */
export function fetchGetMapNames() {
  return request<CommonType.Option<string>[]>({
    url: '/gameMap/allMapNames',
    method: 'get'
  });
}

/** 新增地图订阅 */
export function fetchInsertMapOrder(params: any) {
  return request({
    url: `/gameMapOrder/save`,
    method: 'post',
    data: params
  });
}

// 获取地图订阅列表根据用户ID
export function fetchGetMapOrderListByUserId() {
  return request<Api.GameMapOrder.gameMapOrderList>({
    url: '/gameMapOrder/listByUser',
    method: 'get'
  });
}

/** 删除地图订阅 */
export function fetchDeleteMapOrderById(id: string) {
  return request({
    url: `/gameMapOrder/remove/${id}`,
    method: 'delete'
  });
}

/** 修改地图订阅 */
export function fetchUpdateMapOrder(params: Api.GameMapOrder.MapOrderParams) {
  return request({
    url: `/gameMapOrder/update`,
    method: 'put',
    data: params
  });
}
