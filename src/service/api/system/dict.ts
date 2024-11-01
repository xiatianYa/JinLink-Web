import { request } from '@/service/request';

// =============== Dict Begin ===============

/** get dict page list */
export function fetchGetDictPageList(params?: Api.SystemManage.DictSearchParams) {
  return request<Api.SystemManage.DictPageList>({
    url: '/sysDict/page',
    method: 'get',
    params
  });
}

/** get dict list */
export function fetchGetDictList() {
  return request<Api.SystemManage.DictTree[]>({
    url: '/sysDict/list',
    method: 'get'
  });
}

/** get all dict options list */
export function fetchGetAllDictOptionsList() {
  return request<CommonType.Option[]>({
    url: '/sysDict/allOptions',
    method: 'get'
  });
}

/** get dict edit */
export function fetchGetEditDict(id: string) {
  return request<Api.SystemManage.Dict>({
    url: `/sysDict/getInfo/${id}`,
    method: 'get'
  });
}

/** add dict info */
export function fetchAddDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({
    url: '/sysDict/save',
    method: 'post',
    data
  });
}

/** update dict info */
export function fetchUpdateDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({
    url: '/sysDict/update',
    method: 'put',
    data
  });
}

/** edit delete dict */
export function fetchDeleteDict(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sysDict',
    method: 'delete',
    data
  });
}

/** get all item dict Map */
export function fetchGetAllDictItemMap() {
  return request<Map<string, Api.SystemManage.DictOptions[]>>({
    url: '/sysDict/allDict',
    method: 'get'
  });
}

/** get dict item page list */
export function fetchGetDictItemPageList(params?: Api.SystemManage.DictItemSearchParams) {
  return request<Api.SystemManage.DictItemPageList>({
    url: '/sysDictItem/page',
    method: 'get',
    params
  });
}

/** get dict item edit */
export function fetchGetEditDictItem(id: string) {
  return request<Api.SystemManage.DictItem>({
    url: `/sysDictItem/getInfo/${id}`,
    method: 'get'
  });
}

/** add dict item info */
export function fetchAddDictItem(data: Api.SystemManage.DictItemEdit) {
  return request<boolean>({
    url: '/sysDictItem/save',
    method: 'post',
    data
  });
}

/** update dict item info */
export function fetchUpdateDictItem(data: Api.SystemManage.DictItemEdit) {
  return request<boolean>({
    url: '/sysDictItem/update',
    method: 'put',
    data
  });
}

/** edit delete item dict */
export function fetchDeleteDictItem(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sysDictItem',
    method: 'delete',
    data
  });
}

/** get item dict Map */
export function fetchGetDictItemMap(data: Api.SystemManage.DictStoreSearchParams) {
  return request<Api.SystemManage.DictOptions[]>({
    url: '/sysDictItem/mapOptions',
    method: 'get',
    data
  });
}
