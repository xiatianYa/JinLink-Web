<script setup lang="ts">
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'FeedbackListSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const { dictOptions } = useDict();

const emit = defineEmits<Emits>();

const model = defineModel<Api.Feedback.FeedbackSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="feedback-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.feedback.content')" path="content" class="pr-24px">
              <NInput v-model:value="model.content" :placeholder="$t('page.feedback.form.content')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.feedback.type')" path="type" class="pr-24px">
              <NSelect v-model:value="model.type" :options="dictOptions('feedback_type')"
                :placeholder="$t('page.feedback.form.type')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.feedback.status')" path="status" class="pr-24px">
              <NSelect v-model:value="model.status" :options="dictOptions('feedback_status')"
                :placeholder="$t('page.feedback.form.status')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
