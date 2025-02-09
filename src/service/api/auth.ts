import { request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      userName,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchOAuthLogin(accessToken: string, openId: string, type: number) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/oauth2/qq/login',
    method: 'post',
    data: {
      accessToken,
      openId,
      type
    }
  });
}

/** Logout */
export function fetchLogout() {
  return request<string>({
    url: '/auth/logout',
    method: 'post'
  });
}

/** code */
export function fetchGetCode(userName: string) {
  return request<string>({
    url: '/auth/getCode',
    method: 'get',
    params: {
      userName
    }
  });
}
/** register */
export function fetchRegister({
  userName,
  nickName,
  avatar,
  password,
  confirmPassword,
  code
}: {
  userName: string;
  nickName: string;
  avatar: string;
  password: string;
  confirmPassword: string;
  code: string;
}) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/register',
    method: 'post',
    data: {
      userName,
      nickName,
      avatar,
      password,
      confirmPassword,
      code
    }
  });
}
