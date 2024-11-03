import { request } from '../../request';

/** Delete */
export function fetchDeleteUserById(id: string) {
  return request({
    url: `/sysUser/remove/${id}`,
    method: 'delete'
  });
}

/** Delete */
export function fetchDeleteUserByIds(params: any) {
  return request<Api.Auth.LoginToken>({
    url: '/sysUser/removeByIds',
    method: 'delete',
    data: params
  });
}

/** Insert */
export function fetchInsertUser(params: any) {
  return request({
    url: '/sysUser/save',
    method: 'post',
    data: params
  });
}

/** Update */
export function fetchUpdateUser(params: any) {
  return request({
    url: '/sysUser/update',
    method: 'put',
    data: params
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/sysUser/page',
    method: 'get',
    params
  });
}

/** get scheduler all job name */
export function fetchGetUserNames() {
  return request<CommonType.Option<string>[]>({
    url: '/sysUser/allUserNames',
    method: 'get'
  });
}
