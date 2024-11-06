<template>
  <div>
    <VAceEditor v-model:value="formattedJson" mode="json" lang="json" theme="chrome" style="width: 100%;height: 300px;"
      :options="{
        fontSize: 16,
        useWorker: true,
        tabSize: 2,
        placeholder:
          '/* 请使用 SQL 函数或片段表达式 对左侧的属性字段进行计算编辑 */',
        showPrintMargin: false,
      }"></VAceEditor>
  </div>
</template>

<script lang="ts" setup>
import { VAceEditor } from 'vue3-ace-editor';
import { ref } from 'vue';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome'; // 确保这里与模板中的主题设置相匹配

// 接收参数
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
});

// 格式化后的 JSON 数据
const formattedJson = ref(formatJsonString(props.modelValue));

// 格式化 JSON 字符串的函数
function formatJsonString(jsonString: string): string {
  try {
    const jsonObject = JSON.parse(jsonString);
    return JSON.stringify(jsonObject, null, 2); // 使用 2 个空格进行缩进
  } catch (error) {
    console.error('Invalid JSON:', error);
    return jsonString; // 如果 JSON 无效，则返回原始字符串
  }
}
</script>

<style lang="scss" scope>
/* 你的样式 */
</style>
