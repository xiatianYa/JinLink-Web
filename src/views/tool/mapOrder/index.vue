<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useGameStore } from '@/store/modules/game';
import { fetchGetMapOrderListByUserId } from '@/service/api';
import MapOrderOperateDrawer from './modules/map-order-operate-drawer.vue';
import MapPushDrawer from './modules/map-push-drawer.vue';
import MapOrderCard from './modules/map-order-card.vue';

// 游戏模块
const gameStore = useGameStore();

// 地图订阅列表加载状态
const loading = ref(false);

// 消息提示
const message = useMessage();

// 地图订阅操作抽屉
const mapOrderDrawerVisible = ref(false);

// 暧服推送操作抽屉
const mapPushDrawerVisible = ref(false);

const initData = async () => {
  loading.value = true;
  const { data, error } = await fetchGetMapOrderListByUserId();
  if (error) {
    message.error(error.message);
  } else {
    gameStore.mapOrderList = data;
  }
  loading.value = false;
};
// 测试地图订阅
const testMapOrder = () => {
  // 判断浏览器是否支持唤醒
  if (window.Notification) {
    const popNotice = () => {
      const notification = new Notification('通知测试', {
        icon: 'https://www.bluearchive.top/favicon.svg'
      });
      // 点击通知的回调函数
      notification.onclick = () => {
        window.open('https://www.bluearchive.top', '_blank');
        notification.close();
      };
    };
    /* 授权过通知 */
    if (Notification.permission === 'granted') {
      popNotice();
    } else {
      /* 未授权，先询问授权 */
      Notification.requestPermission(() => {
        popNotice();
      });
    }
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NSpin :show="loading" size="large" class="min-h-500px">
      <NCard size="small" class="mb-15px">
        <NButton type="primary" @click="mapOrderDrawerVisible = true">
          <template #icon>
            <icon-mdi-add class="text-24px" />
          </template>
          {{ $t('page.tool.mapOrder.add') }}
        </NButton>
        <NButton type="primary" class="ml-15px" @click="mapPushDrawerVisible = true">
          <template #icon>
            <icon-material-symbols-transition-push-outline class="text-24px" />
          </template>
          {{ $t('page.tool.mapOrder.mapPush') }}
        </NButton>
        <NButton type="success" class="ml-15px" @click="testMapOrder">
          <template #icon>
            <icon-ic-sharp-troubleshoot class="text-24px" />
          </template>
          {{ $t('page.tool.mapOrder.test') }}
        </NButton>
      </NCard>
      <NCard size="small" class="mb-15px">
        <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen">
          <NGridItem v-for="(mapOrder, index) in gameStore.mapOrderList" :key="index">
            <MapOrderCard :map-order="mapOrder" @submitted="initData" />
          </NGridItem>
        </NGrid>
        <MapOrderOperateDrawer v-model:visible="mapOrderDrawerVisible" @submitted="initData" />
        <MapPushDrawer v-model:visible="mapPushDrawerVisible" />
      </NCard>
    </NSpin>
  </div>
</template>

<style scoped lang="scss"></style>
