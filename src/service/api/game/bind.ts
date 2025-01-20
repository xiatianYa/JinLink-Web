import { request } from '@/service/request';

// 保存配置
export function fetchUpdateBind(params: Api.Game.GameBindParams) {
  return request({
    url: `/gameBind/update`,
    method: 'put',
    data: params
  });
}

// 获取配置
export function fetchGetBindByCommunityId(params: Api.Game.GameBindSearchParams) {
  return request<Api.Game.GameBind>({
    url: `/gameBind/getInfoByCommunityId`,
    method: 'get',
    params
  });
}
