import { request } from '@/service/request';

// 获取地图攻略列表(分页)
export function fetchGetMapStrategyList(params?: Api.Game.MapStrategySearchParams) {
  return request<Api.Game.MapStrategyList>({
    url: '/gameMapStrategy/page',
    method: 'get',
    params
  });
}
