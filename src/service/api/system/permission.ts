import { request } from '../../request';

/** List */
export function fetchPermissionAll() {
  return request({
    url: '/sysPermission/getPermissionTree',
    method: 'get'
  });
}

/** List */
export function fetchPermissionByRoleId(roleId: string | number) {
  return request({
    url: `/sysRolePermission/getPermissionByRoleId/${roleId}`,
    method: 'get'
  });
}

/** Update */
export function fetchUpdatePermissionByRoleId(params: any) {
  return request({
    url: '/sysRolePermission/updateByRoleId',
    method: 'put',
    data: params
  });
}
