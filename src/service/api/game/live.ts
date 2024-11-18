import { request } from '@/service/request';

// 获取游戏直播列表(分页)
export function fetchGetLiveList(params?: Api.Game.LiveSearchParams) {
  return request<Api.Game.LiveList>({
    url: '/gameLive/page',
    method: 'get',
    params
  });
}

/** 删除游戏直播 */
export function fetchDeleteLiveById(id: string) {
  return request({
    url: `/gameLive/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏直播 */
export function fetchUpdateLive(params: Api.Game.LiveParams) {
  return request({
    url: `/gameLive/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏直播 */
export function fetchInsertLive(params: Api.Game.LiveParams) {
  return request({
    url: `/gameLive/save`,
    method: 'post',
    data: params
  });
}

// 获取全部游戏直播列表
export function fetchGetLiveListAll() {
  return request<Array<Api.Game.LiveVo>>({
    url: '/gameLive/listAll',
    method: 'get'
  });
}
