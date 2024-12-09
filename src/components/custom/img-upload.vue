<script setup lang="tsx">
import type { UploadFileInfo } from 'naive-ui';
import { NUpload, useMessage } from 'naive-ui';
import { onMounted, reactive, ref, watch } from 'vue';
import { getServiceBaseURL } from '@/utils/service';

interface Props {
  modelValue?: string | Array<string>;
  limit: number;
  fileSize: number;
  fileType: Array<string>;
}

interface Model {
  modelValue: string | Array<string>;
  limit: number;
  fileSize: number;
  fileType: Array<string>;
}

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  limit: 1,
  fileSize: 50,
  fileType: () => ['image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'image/svg+xml']
});

const model: Model = reactive(props);

// 文件列表
const fileList = ref<UploadFileInfo[]>([]);
// 提示框
const message = useMessage();

// 限制上传文件类型和文件大小
function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const size = data.file.file?.size ?? 0;
  const isLt = size / 1024 / 1024 < model.fileSize;
  if (!isLt) {
    message.error(`上传文件大小不能超过 ${props.fileSize} MB!`);
    return false;
  }
  if (!props.fileType.includes(data.file.file?.type ?? '')) {
    message.error(`文件类型不匹配,请上传${props.fileType}类型的文件`);
    return false;
  }
  return true;
}

// 上传成功处理函数
const handleFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const { data, error } = JSON.parse((event?.target as XMLHttpRequest).response);
  if (!error) {
    file.url = data.url;
    file.name = data.name;
  }
  return file;
};

onMounted(() => {
  fileList.value = [];
  if (model.modelValue) {
    // 判断是不是数组
    if (Array.isArray(model.modelValue)) {
      for (let index = 0; index < model.modelValue.length; index += 1) {
        const url: string = String(model.modelValue[index]);
        const previewFile: UploadFileInfo = {
          id: url,
          name: '文件',
          status: 'uploading',
          url
        };
        fileList.value.push(previewFile);
      }
    } else {
      const urls: string = String(model.modelValue);
      const fileListStr = urls.split(',');
      fileListStr.forEach(item => {
        const previewFile: UploadFileInfo = {
          id: item,
          name: '文件',
          status: 'uploading',
          url: item
        };
        fileList.value.push(previewFile);
      });
    }
  } else {
    fileList.value = [];
  }
  return fileList.value;
});

watch(fileList, () => {
  emit('update:modelValue', fileList.value.map(item => item.url).join(','));
});

watch(model, () => {
  fileList.value = [];
  if (model.modelValue) {
    // 判断是不是数组
    if (Array.isArray(model.modelValue) && model.modelValue.length) {
      for (let index = 0; index < model.modelValue.length; index += 1) {
        const url: string = String(model.modelValue[index]);
        const previewFile: UploadFileInfo = {
          id: url,
          name: '文件',
          status: 'uploading',
          url
        };
        fileList.value.push(previewFile);
      }
    } else {
      const urls: string = String(model.modelValue);
      const fileListStr = urls.split(',');
      fileListStr.forEach(item => {
        const previewFile: UploadFileInfo = {
          id: item,
          name: '文件',
          status: 'uploading',
          url: item
        };
        fileList.value.push(previewFile);
      });
    }
  } else {
    fileList.value = [];
  }
  return fileList.value;
});
</script>

<template>
  <NUpload
    v-model:file-list="fileList"
    :max="model.limit"
    :action="`${baseURL}/file/upload`"
    :show-retry-button="true"
    list-type="image-card"
    @finish="handleFinish"
    @before-upload="beforeUpload"
  >
    点击上传
  </NUpload>
</template>

<style lang="scss" scope></style>
