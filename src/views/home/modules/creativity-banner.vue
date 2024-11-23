<script setup lang="ts">
import { $t } from '@/locales';
import { useGameStore } from '@/store/modules/game';

// 游戏仓库
const gameStore = useGameStore();

defineOptions({
  name: 'CreativityBanner'
});
</script>

<template>
  <NCard :title="$t('page.home.onlineUser')" :bordered="false" size="small" class="h-full card-wrapper">
    <NGrid cols="4 s:6 m:8 l:10 xl:12 2xl:14" responsive="screen">
      <NGridItem v-for="(user, index) in gameStore.onlineUserList" :key="index">
        <NTooltip trigger="hover">
          <template #trigger>
            <NAvatar round size="medium" :src="user.avatar" />
          </template>
          {{ user.nickName }}
        </NTooltip>
      </NGridItem>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
