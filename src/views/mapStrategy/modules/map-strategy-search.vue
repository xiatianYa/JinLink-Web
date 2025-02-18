<script setup lang="ts">
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'MapStrategySearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { dictOptions } = useDict();

const model = defineModel<Api.Game.MapStrategySearchParams>('model', { required: true });

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
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.mapStrategy.title')" path="title" class="pr-24px">
              <NInput v-model:value="model.title" :placeholder="$t('page.game.mapStrategy.form.title')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.mapStrategy.mapLabel')" path="mapId" class="pr-24px">
              <NInput v-model:value="model.mapId" :placeholder="$t('page.game.mapStrategy.form.mapLabel')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.mapStrategy.status')" path="status" class="pr-24px">
              <NSelect
                v-model:value="model.status"
                :options="dictOptions('game_status')"
                :placeholder="$t('page.game.mapStrategy.form.status')"
              />
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
