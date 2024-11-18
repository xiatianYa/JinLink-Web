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
    <NGrid :y-gap="15" :x-gap="20" :cols="10" responsive="screen" :item-responsive="true">
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
