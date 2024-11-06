<template>
  <NModal v-model:show="visible" title="操作日志详细" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <VAceEditor v-model:modelValue="model.methodParams"></VAceEditor>
    </NScrollbar>
  </NModal>
</template>

<script setup lang="tsx">
import { reactive, watch } from 'vue';

export type OperateType = NaiveUI.TableOperateType | 'addChild';
interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit menu data or the parent menu data when adding a child menu */
  rowData?: Api.Monitor.OperationLog | null;
}

const props = defineProps<Props>();

type Model = Pick<
  Api.Monitor.ErrorLog,
  | 'methodParams'
>

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    methodParams: '',
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  const { ...rest } = props.rowData;

  Object.assign(model, rest);

  model.methodParams = JSON.parse(model.methodParams)[0]
}

const visible = defineModel<boolean>('visible', {
  default: false
});

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
  }
});

</script>

<style scoped></style>
