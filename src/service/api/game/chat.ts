import { request } from '@/service/request';

// 保存配置
export function fetchGetChatRoomMessageList(index: number, num: number) {
  return request({
    url: `/gameChat/record`,
    method: 'get',
    params: {
      index,
      num
    }
  });
}
