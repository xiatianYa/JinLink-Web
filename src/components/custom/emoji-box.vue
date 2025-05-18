<script setup lang="ts">
import { ref, watch } from 'vue';
import emojis from '@/utils/emoji';

const currentSelectedIndex = ref<number>(0);
const currentEmojiList = ref<any>([]);

interface Emits {
  (e: 'onEmoji', emoji: string, type: string): void;
}

const emit = defineEmits<Emits>();

watch(
  currentSelectedIndex,
  () => {
    currentEmojiList.value = emojis[currentSelectedIndex.value].list;
  },
  { immediate: true }
);

const handlerEmoji = (emoji: string) => {
  emit('onEmoji', emoji, currentSelectedIndex.value === 0 ? 'text' : 'link');
};

function isEmoji(src: string) {
  return /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}]+$/u.test(
    src
  );
}
</script>

<template>
  <div class="emoji-box">
    <div class="emoji-content">
      <div v-for="(emoji, index) in currentEmojiList" :key="index" @click="handlerEmoji(emoji.icon)">
        <NButton v-if="isEmoji(emoji.icon)">
          <template #icon>
            <NTooltip trigger="hover">
              <template #trigger>
                {{ emoji.icon }}
              </template>
              {{ emoji.name }}
            </NTooltip>
          </template>
        </NButton>
        <NButton v-else strong secondary class="h-82px w-82px">
          <NTooltip trigger="hover">
            <template #trigger>
              <NImage class="w-82px" :src="emoji.icon" preview-disabled />
            </template>
            {{ emoji.name }}
          </NTooltip>
        </NButton>
      </div>
    </div>
    <div class="emoji-type mt-10px">
      <div v-for="(emoji, index) in emojis" :key="index" class="mr-5px">
        <NButton v-if="isEmoji(emoji.icon)" strong secondary @click="currentSelectedIndex = index">
          <template #icon>
            {{ emoji.icon }}
          </template>
        </NButton>
        <NButton v-else strong secondary @click="currentSelectedIndex = index">
          <template #icon>
            <NImage :src="emoji.icon" preview-disabled></NImage>
          </template>
        </NButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emoji-box {
  width: 100%;
  height: 500px;
  background-color: rgba(var(--background-color), 0.6);
  backdrop-filter: blur(8px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    width: 80%;
    height: 260px;
  }

  .emoji-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    overflow-y: auto;
    flex-wrap: wrap;
    padding: 10px;
  }

  .emoji-type {
    padding: 10px;
    display: flex;
    background-color: rgba(var(--background-color), 0.7);
    gap: 2px;
  }
}
</style>
