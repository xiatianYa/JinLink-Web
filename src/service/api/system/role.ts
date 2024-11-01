import { request } from '../../request';

/** Insert */
export function fetchInsertRole(params: any) {
  return request({
    url: '/sysRole/save',
    method: 'post',
    data: params
  });
}

/** Update */
export function fetchUpdateRole(params: any) {
  return request({
    url: '/sysRole/update',
    method: 'put',
    data: params
  });
}

/** Delete */
export function fetchDeleteRoleById(id: string) {
  return request({
    url: `/sysRole/remove/${id}`,
    method: 'delete'
  });
}

/** Delete */
export function fetchDeleteRoleByIds(params: any) {
  return request<Api.Auth.LoginToken>({
    url: '/sysRole/removeByIds',
    method: 'delete',
    data: params
  });
}

/** GetRoleByRoleId */
export function fetchGetRoleByRoleId(roleId: string | number) {
  return request({
    url: `/sysRoleMenu/getRoleByRoleId/${roleId}`,
    method: 'get'
  });
}

/** UpdateRoleMenu */
export function fetchUpdateRoleMenu(params: any) {
  return request({
    url: '/sysRoleMenu/updateRoleMenu',
    method: 'put',
    data: params
  });
}

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/sysRole/page',
    method: 'get',
    params
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/sysRole/getAllRoles',
    method: 'get'
  });
}
