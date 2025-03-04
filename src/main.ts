import { createApp } from 'vue';
import './plugins/assets';
import VueLazyload from 'vue3-lazyload';

// MarkDown编辑器的相关资源
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// 主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import App from './App.vue';
import { setupI18n } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';

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

  // 使用 GitHub 主题
  VMdEditor.use(githubTheme);

  // 全局注册 VMdEditor 组件
  app.component('VMdEditor', VMdEditor);

  // 使用 vue3-lazyload 插件
  app.use(VueLazyload, {
    loading: 'loading.png',
    error: 'https://www.bluearchive.top/statics/2025/01/16/835fe6632476fc79f83962f15879f8ea_20250116101103A001.jpeg'
  });

  app.mount('#app');
}

setupApp();
