import { request } from '@/service/request';

/** get cache with redis */
export function fetchGetCacheRedisInfo() {
  return request<Api.Monitor.RedisInfo>({
    url: '/monCache/redis',
    method: 'get'
  });
}
