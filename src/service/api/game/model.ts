import { request } from '@/service/request';

// 获取游戏模型列表(分页)
export function fetchGetModelList(params?: Api.Game.ModelSearchParams) {
  return request<Api.Game.ModelList>({
    url: '/gameModel/page',
    method: 'get',
    params
  });
}

/** 删除游戏类型 */
export function fetchDeleteModelById(id: string) {
  return request({
    url: `/gameModel/remove/${id}`,
    method: 'delete'
  });
}

/** 修改游戏类型 */
export function fetchUpdateModel(params: Api.Game.ModelParams) {
  return request({
    url: `/gameModel/update`,
    method: 'put',
    data: params
  });
}

/** 新增游戏类型 */
export function fetchInsertModel(params: Api.Game.ModelParams) {
  return request({
    url: `/gameModel/save`,
    method: 'post',
    data: params
  });
}

// 获取游戏模型列表(根据类型)
export function fetchGetModelListByType(type: string) {
  return request<Array<Api.Game.ModelVo>>({
    url: '/gameModel/listByType',
    method: 'get',
    params: {
      modelType: type
    }
  });
}
