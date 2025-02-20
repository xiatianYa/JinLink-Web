<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { fetchGetMapStrategyDetail } from '@/service/api';

type Model = {
  title: string;
  mapLabel: string;
  content: string;
  videoUrl: string;
  createUserId: string;
  createUserName: string;
  createTime: string;
};

const route = useRoute();

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    title: '',
    mapLabel: '',
    content: '',
    videoUrl: '',
    createUserId: '',
    createUserName: '',
    createTime: ''
  };
}

async function init() {
  const { id } = route.query;
  if (id) {
    const { data, error } = await fetchGetMapStrategyDetail(id as string);
    if (!error) {
      Object.assign(model, data);
    }
  }
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NCard class="card-wrapper">
      <NSpace justify="center" class="text-20px font-bold">{{ model.title }}</NSpace>
      <NSpace justify="center">
        <span class="text-14px">作者 : {{ model.createUserName }}</span>
        <span class="text-14px">发布时间:{{ model.createTime }}</span>
      </NSpace>
    </NCard>
    <NCard v-if="model.videoUrl" class="card-wrapper">
      <video :src="model.videoUrl" controls></video>
    </NCard>
    <NCard class="card-wrapper">
      <VMdEditor v-model="model.content" mode="preview" height="100vh"></VMdEditor>
    </NCard>
  </div>
</template>

<style scoped></style>
