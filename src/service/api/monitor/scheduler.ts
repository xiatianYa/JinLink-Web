import { request } from '../../request';

/** get scheduler list */
export function fetchGetSchedulerList(params?: Api.MonitorManage.SchedulerSearchParams) {
  return request<Api.MonitorManage.SchedulerList>({
    url: '/monScheduler/page',
    method: 'get',
    params
  });
}

/** Delete */
export function fetchDeleteSchedulerById(id: string) {
  return request({
    url: `/monScheduler/remove/${id}`,
    method: 'delete'
  });
}

/** Delete */
export function fetchDeleteSchedulerByIds(params: any) {
  return request({
    url: '/monScheduler/removeByIds',
    method: 'delete',
    data: params
  });
}

/** Insert */
export function fetchInsertScheduler(params: any) {
  return request({
    url: '/monScheduler/save',
    method: 'post',
    data: params
  });
}

/** Update */
export function fetchUpdateScheduler(params: any) {
  return request({
    url: '/monScheduler/update',
    method: 'put',
    data: params
  });
}
