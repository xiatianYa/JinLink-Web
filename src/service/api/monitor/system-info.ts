import { request } from '@/service/request';

/** get system info */
export function fetchGetSystemInfo() {
  return request<Api.Monitor.SystemInfo>({
    url: '/monSystem/info',
    method: 'get'
  });
}
