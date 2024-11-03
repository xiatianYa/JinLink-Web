import { request } from '@/service/request';

/** get scheduler log list */
export function fetchGetSchedulerLogList(params?: Api.Monitor.SchedulerLogSearchParams) {
  return request<Api.Monitor.SchedulerLogList>({
    url: '/monLogsScheduler/page',
    method: 'get',
    params
  });
}
