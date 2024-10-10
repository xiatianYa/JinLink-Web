import { request } from '../../request';

/**
 * Insert
 */
export function fetchInsertRole(params: any) {
  return request({
    url: '/sysRole/save',
    method: 'post',
    data: params
  });
}

/**
 * Update
 */
export function fetchUpdateRole(params: any) {
  return request({
    url: '/sysRole/update',
    method: 'put',
    data: params
  });
}

/**
 * Delete
 */
export function fetchDeleteRoleById(id: number) {
  return request({
    url: '/sysRole/remove/' + id,
    method: 'delete',
  });
}

/**
 * Delete
 */
export function fetchDeleteRoleByIds(params: any) {
  return request<Api.Auth.LoginToken>({
    url: '/sysRole/removeByIds',
    method: 'delete',
    data: params
  });
}
