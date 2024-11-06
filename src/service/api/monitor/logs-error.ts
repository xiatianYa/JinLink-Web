import { request } from '@/service/request';

// =============== Logs Error Begin ===============

/** get error log list */
export function fetchGetErrorLogList(params?: Api.Monitor.ErrorLogSearchParams) {
  return request<Api.Monitor.ErrorLogList>({
    url: '/monLogsError/page',
    method: 'get',
    params
  });
}

/** clear error log all */
export function fetchClearErrorLogAll() {
  return request<Boolean>({
    url: '/monLogsError/clearAll',
    method: 'delete',
  });
}

// =============== Logs Error End ===============
