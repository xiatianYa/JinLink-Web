<script setup lang="ts">
defineOptions({
  name: 'GlobalLogo'
});
</script>

<template>
  <RouterLink to="/" class="w-full flex-center nowrap-hidden">
    <SvgIcon local-icon="logo" class="text-82px" />
  </RouterLink>
</template>

<style scoped></style>
