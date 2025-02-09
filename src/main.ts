import { createApp } from 'vue';
import './plugins/assets';
import VueLazyload from 'vue3-lazyload';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import App from './App.vue';

async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  setupAppVersionNotification();

  // 使用 vue3-lazyload 插件
  app.use(VueLazyload, {
    loading: 'loading.png',
    error: 'error.png'
  });

  app.mount('#app');
}

setupApp();
