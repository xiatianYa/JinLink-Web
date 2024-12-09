<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { fetchDeleteMapOrderById } from '@/service/api';

defineOptions({
  name: 'MapOrderCard'
});

interface Emits {
  (e: 'submitted'): void;
}

interface Props {
  /** 地图订阅数据 */
  mapOrder: Api.GameMapOrder.gameMapOrderVo;
}

const emit = defineEmits<Emits>();

// 定义props
const props = defineProps<Props>();

// 消息提示
const message = useMessage();

// 定义游戏服务器数据
const mapOrderData = ref<Api.GameMapOrder.gameMapOrderVo | null>();

// 初始化游戏服务器数据
const handleInitModel = () => {
  if (mapOrderData.value && props.mapOrder) {
    Object.assign(mapOrderData.value, props.mapOrder);
  } else {
    mapOrderData.value = { ...props.mapOrder };
  }
};

// 关闭卡片
const deleteMapOrder = async (mapOrderId: string) => {
  const { error } = await fetchDeleteMapOrderById(mapOrderId);
  if (!error) {
    message.success('删除成功');
  }
  emit('submitted');
};

// 注册tag颜色
const renderColor = (typeName: string) => {
  switch (typeName) {
    case '0':
      return {
        color: '#f6ffed',
        borderColor: '#b7eb8f',
        textColor: '#389e0d'
      };
    case '1':
      return {
        color: '#e6fffb',
        borderColor: '#87e8de',
        textColor: '#08979c'
      };
    case '2':
      return {
        color: '#fff0f6',
        borderColor: '#ffadd2',
        textColor: '#c41d7f'
      };
    case '3':
      return {
        color: '#fff2e8',
        borderColor: '#ffbb96',
        textColor: '#d4380d'
      };
    case '4':
      return {
        color: '#fff1f0',
        borderColor: '#ffa39e',
        textColor: '#cf1322'
      };
    default:
      return {
        color: '#f6ffed',
        borderColor: '#b7eb8f',
        textColor: '#389e0d'
      };
  }
};

// 注册Type名称
const renderTypeName = (typeName: string) => {
  switch (typeName) {
    case '0':
      return 'T1-简单';
    case '1':
      return 'T2-普通';
    case '2':
      return 'T3-困难';
    case '3':
      return 'T4-极难';
    case '4':
      return 'T5-史诗';
    default:
      return 'T0-未知';
  }
};

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
  <div class="flex overflow-hidden">
    <NCard size="small" closable @close="deleteMapOrder(mapOrder.id)">
      <template #header>
        <div class="flex-y-center">
          <NEllipsis :line-clamp="1">
            {{ `${mapOrderData?.gameMapVo.mapName}(${mapOrderData?.gameMapVo.mapLabel})` }}
          </NEllipsis>
          <NTag
            v-if="mapOrderData?.gameMapVo.type"
            :color="renderColor(mapOrderData?.gameMapVo.type ?? '-1')"
            size="small"
            strong
            class="ml-5px mr-10px"
          >
            {{ renderTypeName(mapOrderData?.gameMapVo.type ?? '-1') }}
          </NTag>
        </div>
      </template>
      <NImage :height="150" :src="mapOrderData?.gameMapVo.mapUrl" />
    </NCard>
  </div>
</template>

<style scoped lang="scss"></style>
