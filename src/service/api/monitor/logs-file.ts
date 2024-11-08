import { request } from '@/service/request';

/** get login log list */
export function fetchGetFileLogList(params?: Api.Monitor.FileLogSearchParams) {
  return request<Api.Monitor.FileLogList>({
    url: '/monLogsFile/page',
    method: 'get',
    params
  });
}

/** clear error log all */
export function fetchClearFileLogAll() {
  return request<boolean>({
    url: '/monLogsFile/clearAll',
    method: 'delete'
  });
}
