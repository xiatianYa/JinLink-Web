<script setup lang="tsx">
import { NButton, NCard, NImage, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteFeedbackById, fetchGetFeedbackList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import { useAuth } from '@/hooks/business/auth';
import FeedbackListSearch from './modules/feedback-list-search.vue';
import FeedbackOperateDrawer from './modules/feedback-operate-drawer.vue';

defineOptions({
  name: 'FeedBack'
});

const appStore = useAppStore();

const { dictTag } = useDict();

const { hasAuth } = useAuth();

const { columns, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetFeedbackList,
  apiParams: {
    current: 1,
    size: 10,
    content: null,
    type: null,
    status: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'userName',
      title: $t('page.feedback.userName'),
      width: 100,
      align: 'center'
    },
    {
      key: 'content',
      title: $t('page.feedback.content'),
      width: 100,
      align: 'center'
    },
    {
      key: 'image',
      title: $t('page.feedback.image'),
      width: 100,
      align: 'center',
      render: row => (
        <div class="flex-center justify-center gap-8px">
          {row.image.map(item => (
            <NImage width="150" src={item} />
          ))}
        </div>
      )
    },
    {
      key: 'type',
      title: $t('page.feedback.type'),
      width: 100,
      align: 'center',
      render: row => dictTag('feedback_type', row.type)
    },
    {
      key: 'status',
      title: $t('page.feedback.status'),
      width: 100,
      align: 'center',
      render: row => dictTag('feedback_status', row.status)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:sysFeedback:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:sysFeedback:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const { drawerVisible, editingData, operateType, handleAdd, handleEdit, onDeleted } = useTableOperate(data, getData);

async function handleDelete(id: string) {
  // request
  const { error } = await fetchDeleteFeedbackById(id);
  if (!error) onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <FeedbackListSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        add-auth="sys:sysFeedback:save"
        :loading="loading"
        @add="handleAdd"
        @refresh="getDataByPage"
      />
      <NDataTable
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <FeedbackOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
