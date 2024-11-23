<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';
defineOptions({
  name: 'SoybeanAvatar'
});

const authStore = useAuthStore();
</script>

<template>
  <div class="size-72px overflow-hidden rd-1/2">
    <img :src="authStore.userInfo.avatar" class="size-full" />
  </div>
</template>

<style scoped></style>
