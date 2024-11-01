import { request } from '../../request';

/** Insert */
export function fetchInsertMenu(params: any) {
  return request({
    url: '/sysMenu/save',
    method: 'post',
    data: params
  });
}

/** Update */
export function fetchUpdateMenu(params: any) {
  return request({
    url: '/sysMenu/update',
    method: 'put',
    data: params
  });
}

/** Delete */
export function fetchDeleteMenuById(id: string) {
  return request({
    url: `/sysMenu/remove/${id}`,
    method: 'delete'
  });
}

/** Delete */
export function fetchDeleteMenuByIds(params: any) {
  return request<Api.Auth.LoginToken>({
    url: '/sysMenu/removeByIds',
    method: 'delete',
    data: params
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/sysMenu/page',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/sysMenu/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/sysMenu/getMenuTree',
    method: 'get'
  });
}
