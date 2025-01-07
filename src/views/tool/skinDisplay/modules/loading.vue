<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

// 阿罗纳图片列表
const AlonaList = ref([
  new URL('@/assets/images/Alona01.png', import.meta.url).href,
  new URL('@/assets/images/Alona02.png', import.meta.url).href,
  new URL('@/assets/images/Alona03.png', import.meta.url).href,
  new URL('@/assets/images/Alona04.png', import.meta.url).href
]);

const AlonaUrl = ref(new URL('@/assets/images/Alona01.png', import.meta.url).href);

// 定时任务
const timer = ref<NodeJS.Timeout>();
defineOptions({
  name: 'LoadingView'
});

interface Props {
  /** 加载进度 */
  loaded: number;
}

// 定义props
const props = defineProps<Props>();

onMounted(() => {
  timer.value = setInterval(() => {
    // 从AlonaList 随机选取元素
    AlonaUrl.value = AlonaList.value[Math.floor(Math.random() * AlonaList.value.length)];
  }, 3000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div class="loading-container">
    <div class="alona">
      <img :src="AlonaUrl" />
      <div class="wrapper">
        <h1>CONNECTIING...</h1>
        <div>{{ props.loaded }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/** 加载动漫人物动画 */
@keyframes Alonadupown {
  0% {
    transform: translateY(-15%);
  }

  50% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-15%);
  }
}

.loading-container {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/loadingBg.png') no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  position: relative;

  .alona {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: auto;
      height: 16.6666666667rem;
      margin-bottom: 20px;
      object-fit: cover;
      animation-name: Alonadupown;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      color: #1289f9;

      h1 {
        font-size: 1.8rem;
        color: #1289f9;
      }
    }
  }
}
</style>
