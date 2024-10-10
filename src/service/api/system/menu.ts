import { request } from '../../request';

/**
 * Insert
 */
export function fetchInsertMenu(params: any) {
  return request({
    url: '/sysMenu/save',
    method: 'post',
    data: params
  });
}


/**
 * Update
 */
export function fetchUpdateMenu(params: any) {
  return request({
    url: '/sysMenu/update',
    method: 'put',
    data: params
  });
}

/**
 * Delete
 */
export function fetchDeleteMenuById(id: number) {
  return request({
    url: '/sysMenu/remove/' + id,
    method: 'delete',
  });
}

/**
 * Delete
 */
export function fetchDeleteMenuByIds(params: any) {
  return request<Api.Auth.LoginToken>({
    url: '/sysMenu/removeByIds',
    method: 'delete',
    data: params
  });
}



