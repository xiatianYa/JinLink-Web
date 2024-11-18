<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui';
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
      >
        <NTabPane name="EXG" tab="EXG社区">
          <iframe src="https://darkrp.cn/" class="iframe"></iframe>
        </NTabPane>
        <NTabPane name="UB" tab="UB社区">
          <iframe src="https://cs.moeub.cn/" class="iframe"></iframe>
        </NTabPane>
        <NTabPane name="ZED" tab="ZED社区">
          <iframe src="https://zombieden.cn/" class="iframe"></iframe>
        </NTabPane>
        <NTabPane name="FYS" tab="FYS社区">
          <iframe src="https://fyscs.com/" class="iframe"></iframe>
        </NTabPane>
        <NTabPane name="93X" tab="93X社区">
          <iframe src="https://servers.upkk.com/" class="iframe"></iframe>
        </NTabPane>
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
