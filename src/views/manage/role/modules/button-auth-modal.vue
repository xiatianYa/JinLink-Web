<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { fetchPermissionAll, fetchPermissionByRoleId, fetchUpdatePermissionByRoleId } from '@/service/api';

defineOptions({
  name: 'ButtonAuthModal'
});

interface Props {
  /** the roleId */
  roleId: string | number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.buttonAuth'));

type ButtonConfig = {
  id: number;
  label: string;
  code: string;
};

const tree = shallowRef<ButtonConfig[]>([]);

async function getAllButtons() {
  // request
  const result = await fetchPermissionAll();
  tree.value = result.data;
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  // request
  const result = await fetchPermissionByRoleId(props.roleId);
  checks.value = result.data;
}

async function handleSubmit() {
  // request
  const params = {
    roleId: props.roleId,
    permissionList: checks.value
  };
  const result = await fetchUpdatePermissionByRoleId(params);
  if (result.data) window.$message?.success?.($t('common.modifySuccess'));
  closeModal();
}

function init() {
  getAllButtons();
  getChecks();
}

watch(visible, newValue => {
  if (newValue) {
    // init
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <NTree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      block-line
      checkable
      expand-on-click
      virtual-scroll
      class="h-280px"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
