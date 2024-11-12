<script setup lang="tsx">
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import { type UploadCustomRequestOptions, type UploadFileInfo, useMessage } from 'naive-ui';
import { uploadFiles } from '@/service/api';
const emit = defineEmits(['update:modelValue']);
// 接收参数
const props = defineProps({
  // 传递过来的值
  modelValue: {
    type: [String, Array],
    default: ''
  },
  // 数量限制
  limit: {
    type: Number,
    default: 1
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 1024
  },
  fileType: {
    type: Array,
    default: () => ['video/mp4', 'audio/mpeg']
  }
});

// 文件列表
const fileList = ref<UploadFileInfo[]>([]);
// 提示框
const message = useMessage();

onMounted(() => {
  if (props.modelValue) {
    // 判断是不是数组
    if (Array.isArray(props.modelValue) && props.modelValue.length) {
      for (let index = 0; index < props.modelValue.length; index += 1) {
        const url: string = String(props.modelValue[index]);
        const previewFile: UploadFileInfo = {
          id: url,
          name: '文件',
          status: 'uploading',
          url
        };
        fileList.value.push(previewFile);
      }
    } else {
      const urls: string = String(props.modelValue);
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

// 上传文件函数
function customRequest({ file }: UploadCustomRequestOptions) {
  uploadFiles(file)
    .then(res => {
      // 使用 find 方法找到具有相同 batchId 的文件对象
      const foundFileObj = fileList.value.find(fileObj => fileObj.batchId === file.batchId);
      // 如果找到了对应的文件对象，则更新其 URL
      if (foundFileObj) {
        foundFileObj.url = res.data.url;
      }
      message.success('上传文件成功');
      // 数据同步
      uploadedSuccessfully();
    })
    .catch(error => {
      message.error(`上传文件失败${error}`);
    });
}
// 限制上传文件类型和文件大小
function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const size: any = data.file.file?.size;
  const isLt = size / 1024 / 1024 < props.fileSize;
  if (!isLt) {
    message.error(`上传文件大小不能超过 ${props.fileSize} MB!`);
    return false;
  }
  if (!props.fileType.includes(data.file.file?.type)) {
    message.error(`文件类型不匹配,请上传${props.fileType}类型的文件`);
    return false;
  }
  return true;
}
// 上传成功处理函数
function uploadedSuccessfully() {
  emit('update:modelValue', listToString(fileList.value));
}
// 文件删除函数
function handleRemove(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  // 使用 filter 方法移除 batchId 相同的元素
  fileList.value = fileList.value.filter(item => item.batchId !== data.file.batchId);
  // 数据同步
  uploadedSuccessfully();
  message.success('删除成功');
}
// 工具函数
function listToString(list: Array<any>, separator?: string) {
  let strs = '';
  const sep = separator || ',';
  for (let index = 0; index < list.length; index += 1) {
    const item = list[index];
    if (!index) {
      strs += item.url;
    } else {
      strs += sep + item.url; // Use new variable
    }
  }
  return strs;
}
</script>

<template>
  <NUpload
    v-model:file-list="fileList"
    :show-retry-button="true"
    :max="limit"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
    @remove="handleRemove"
  >
    <NButton type="primary">上传文件</NButton>
  </NUpload>
</template>

<style lang="scss" scope></style>
