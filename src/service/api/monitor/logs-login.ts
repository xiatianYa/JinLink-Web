import { request } from '@/service/request';

/** get login log list */
export function fetchGetLoginLogList(params?: Api.Monitor.LoginLogSearchParams) {
  return request<Api.Monitor.LoginLogList>({
    url: '/monLogsLogin/page',
    method: 'get',
    params
  });
}
