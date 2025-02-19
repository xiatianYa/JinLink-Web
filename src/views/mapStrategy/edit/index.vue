<script setup lang="ts">
import { reactive, ref } from 'vue';
import { uploadImages } from '@/service/api';
import MapStrategyPushDrawer from './modules/map-strategy-push-drawer.vue';


type Model = {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
};

const model: Model = reactive(createDefaultModel());

const pushShow = ref(false);

function createDefaultModel(): Model {
  return {
    id: 0,
    title: '',
    content: '',
    videoUrl: ''
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
    <MapStrategyPushDrawer v-model:visible="pushShow" />
  </div>
</template>

<style scoped></style>
