import { request } from '@/service/request';

// 获取游戏类型列表(分页)
export function fetchGetModeList(params?: Api.Game.ModeSearchParams) {
  return request<Api.Game.ModeList>({
    url: '/gameMode/page',
    method: 'get',
    params
  });
}

/** 删除游戏类型 */
export function fetchDeleteModeById(id: string) {
  return request({
    url: `/gameMode/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏类型 */
export function fetchUpdateMode(params: Api.Game.ModeParams) {
  return request({
    url: `/gameMode/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏类型 */
export function fetchInsertMode(params: Api.Game.ModeParams) {
  return request({
    url: `/gameMode/save`,
    method: 'post',
    data: params
  });
}

/** 获取全部模式名称 */
export function fetchGetModeNames() {
  return request<CommonType.Option<string>[]>({
    url: '/gameMode/allModeNames',
    method: 'get'
  });
}
