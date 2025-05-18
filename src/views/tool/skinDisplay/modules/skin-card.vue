<script setup lang="ts">
import { NEllipsis, useMessage } from 'naive-ui';
import { ref, watch } from 'vue';

defineOptions({
  name: 'ServerCard'
});

interface Props {
  /** 社区服务器数据 */
  gameModelVo: Api.Game.ModelVo;
}

interface Emits {
  (e: 'loadModel', model: Api.Game.ModelVo): void;
}

const emit = defineEmits<Emits>();

// 定义props
const props = defineProps<Props>();

// 提示消息对象
const message = useMessage();

// 模型对象
const modelVo = ref<Api.Game.ModelVo>({} as Api.Game.ModelVo);

// 加载模型
function loadModel(model: Api.Game.ModelVo) {
  emit('loadModel', model);
  message.success('加载中...');
}

// 初始化游戏服务器数据
function handleInitModel() {
  Object.assign(modelVo.value, props.gameModelVo);
}

// 监听props变化
watch(
  props,
  () => {
    handleInitModel();
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <div
    class="server-card flex overflow-hidden"
    :style="{
      backgroundImage: `url(${modelVo.modelUrl})`
    }"
  >
    <div class="model-card-mask flex flex-center">
      <NButton secondary type="info" @click="loadModel(modelVo)">
        {{ $t('page.tool.skinDisplay.loadModel') }}
      </NButton>
    </div>
    <div class="model-name">
      <NEllipsis :line-clamp="1">{{ modelVo.modelName }}</NEllipsis>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-card {
  position: relative;
  max-width: 180px;
  height: 150px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;

  /* 遮罩层样式 */
  .model-card-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: opacity 1s ease;
  }

  .model-name {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    font-size: 14px;
    font-weight: 700;
    transition: opacity 1s ease;
  }

  /* 当鼠标移入盒子时，遮罩层消失 */
  &:hover .model-card-mask {
    opacity: 1;
  }

  /* 当鼠标移入盒子时，遮罩层消失 */
  &:hover .model-name {
    color: #ffffff;
  }
}
</style>
