import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchGetUserInfo, fetchLogin, fetchLogout, fetchOAuthLogin } from '@/service/api';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';
import QC from '@/utils/js/qqAuth.js';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { useDictStore } from '../dict';
import { useGameStore } from '../game';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const routeStore = useRouteStore();
  const dictStore = useDictStore();
  const tabStore = useTabStore();
  const gameStore = useGameStore();
  const { redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    avatar: '',
    roles: [],
    buttons: []
  });

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    await fetchLogout();

    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    gameStore.closeWebSocket();

    tabStore.cacheTabs();
    routeStore.resetStore();

    // 清除第三方登录
    QC.Login.signOut();

    // 无论怎么样 都给我滚去登录页
    if (!route.meta.constant) {
      await redirectFromLogin(false);
    }
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        await routeStore.initAuthRoute();

        await dictStore.init();

        // initialize the websocket
        await gameStore.initWebSocket();

        await redirectFromLogin(redirect);

        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
            duration: 4500
          });
        }
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  /**
   * Login
   *
   * @param accessToken Access token
   * @param openId Open ID
   * @param type 0:QQ 1:微信
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function oAuthLogin({
    accessToken,
    openId,
    type,
    redirect = true
  }: {
    accessToken: string;
    openId: string;
    type: number;
    redirect?: boolean;
  }) {
    startLoading();

    const { data: loginToken, error } = await fetchOAuthLogin(accessToken, openId, type);

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        await routeStore.initAuthRoute();

        await dictStore.init();

        // initialize the websocket
        await gameStore.initWebSocket();

        await redirectFromLogin(redirect);

        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
            duration: 4500
          });
        }
      }
    } else {
      resetStore();
    }
    endLoading();
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // update store
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();

    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    oAuthLogin,
    initUserInfo
  };
});
