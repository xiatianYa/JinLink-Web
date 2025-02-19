import { request } from '@/service/request';

// 获取地图攻略列表(分页)
export function fetchGetMapStrategyList(params?: Api.Game.MapStrategySearchParams) {
  return request<Api.Game.MapStrategyList>({
    url: '/gameMapStrategy/page',
    method: 'get',
    params
  });
}

// 新增地图攻略
export function fetchInsertMapStrategy(data: Api.Game.MapStrategyParams) {
  return request<Api.Game.MapStrategy>({
    url: '/gameMapStrategy/save',
    method: 'post',
    data
  });
}

// 更新地图攻略
export function fetchUpdateMapStrategy(data: Api.Game.MapStrategyParams) {
  return request<Api.Game.MapStrategy>({
    url: '/gameMapStrategy/update',
    method: 'put',
    data
  });
}

// 删除地图攻略
export function fetchDeleteMapStrategy(id: string) {
  return request<Api.Game.MapStrategy>({
    url: `/gameMapStrategy/remove/${id}`,
    method: 'delete'
  });
}
