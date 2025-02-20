<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchAuditMapStrategy, fetchGetMapStrategyDetail, uploadImages } from '@/service/api';
import { useAuth } from '@/hooks/business/auth';
import MapStrategyPushDrawer from './modules/map-strategy-push-drawer.vue';

type Model = {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  status: number | null;
};

const { hasAuth } = useAuth();

const route = useRoute();

const model: Model = reactive(createDefaultModel());

const router = useRouter();

const pushShow = ref(false);

function createDefaultModel(): Model {
  return {
    id: 0,
    title: '',
    content: '',
    videoUrl: '',
    status: null
  };
}

// 文章编辑器上传图片
async function handleUploadImage(_event: any, insertImage: any, files: any) {
  const formData = new FormData();
  formData.append('file', files[0]);
  const { data, error } = await uploadImages(formData);
  if (!error) {
    insertImage({
      url: data.url,
      desc: data.name,
      width: '100%',
      height: '300px'
    });
    window.$message?.success('上传图片成功');
  } else {
    window.$message?.error('上传图片失败');
  }
}

function save() {
  pushShow.value = true;
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

async function handleAudit(type: 'pass' | 'reject') {
  if (type === 'pass') {
    const { error } = await fetchAuditMapStrategy(model.id, 'pass');
    if (!error) {
      window.$message?.success('审核通过');
    }
  } else {
    const { error } = await fetchAuditMapStrategy(model.id, 'reject');
    if (!error) {
      window.$message?.success('审核驳回');
    }
  }
  // 跳转路由
  router.push({
    path: '/mapstrategy/list'
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="h-full">
    <NCard :bordered="false" size="small" class="mb-20px card-wrapper">
      <NSpace class="w-full" justify="start">
        <NButton strong secondary type="info" @click="save">
          <template #icon>
            <icon-ic:baseline-save-all class="text-icon" />
          </template>
          保存
        </NButton>
        <NButton
          v-if="hasAuth('game:gameMapStrategy:examine') && model.status == 1"
          strong
          secondary
          type="success"
          @click="handleAudit('pass')"
        >
          <template #icon>
            <icon-hugeicons:passport-valid class="text-icon" />
          </template>
          审核通过
        </NButton>
        <NButton
          v-if="hasAuth('game:gameMapStrategy:examine') && model.status == 1"
          strong
          secondary
          type="error"
          @click="handleAudit('reject')"
        >
          <template #icon>
            <icon-hugeicons:passport-expired class="text-icon" />
          </template>
          审核驳回
        </NButton>
      </NSpace>
    </NCard>
    <VMdEditor
      v-model="model.content"
      :include-level="[2, 3, 4]"
      mode="editable"
      height="100vh"
      :disabled-menus="[]"
      left-toolbar="undo redo h bold italic strikethrough quote ul ol table hr link image tip"
      right-toolbar="preview toc sync-scroll"
      @upload-image="handleUploadImage"
    ></VMdEditor>
    <MapStrategyPushDrawer v-model:visible="pushShow" :row-data="model" />
  </div>
</template>

<style scoped></style>
