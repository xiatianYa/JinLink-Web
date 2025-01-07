<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui';

const goHref = (url: string) => {
  // 打开新窗口
  window.open(url, '_blank');
};
const handleUpdateValue = (name: string) => {
  switch (name) {
    case 'EXG':
      goHref('https://darkrp.cn/');
      break;
    case 'UB':
      goHref('https://cs.moeub.cn/');
      break;
    case 'ZED':
      goHref('https://zombieden.cn/');
      break;
    case 'FYS':
      goHref('https://fyscs.com/');
      break;
    case '93X':
      goHref('https://servers.upkk.com/');
      break;
    default:
      break;
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NCard>
      <NTabs
        type="segment"
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        @update:value="handleUpdateValue"
      >
        <NTabPane name="EXG" tab="EXG社区" @click="goHref('https://darkrp.cn/')"></NTabPane>
        <NTabPane name="UB" tab="UB社区" @click="goHref('https://cs.moeub.cn/')"></NTabPane>
        <NTabPane name="ZED" tab="ZED社区" @click="goHref('https://zombieden.cn/')"></NTabPane>
        <NTabPane name="FYS" tab="FYS社区" @click="goHref('https://fyscs.com/')"></NTabPane>
        <NTabPane name="93X" tab="93X社区" @click="goHref('https://servers.upkk.com/')"></NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.iframe {
  width: 100%;
  height: 90vh;
}
</style>
