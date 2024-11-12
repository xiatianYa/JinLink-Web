<script setup lang="ts">
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'MapSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { dictOptions } = useDict();

const model = defineModel<Api.Game.MapSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.map.mapName')" path="mapName" class="pr-24px">
              <NInput v-model:value="model.mapName" :placeholder="$t('page.game.map.form.mapName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.map.mapLabel')" path="mapLabel" class="pr-24px">
              <NInput v-model:value="model.mapLabel" :placeholder="$t('page.game.map.form.mapLabel')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.map.type')" path="modeId" class="pr-24px">
              <NSelect
                v-model:value="model.type"
                :options="dictOptions('game_type')"
                :placeholder="$t('page.game.map.form.type')"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.map.modeId')" path="modeId" class="pr-24px">
              <NSelect
                v-model:value="model.modeId"
                :options="dictOptions('game_mode')"
                :placeholder="$t('page.game.map.form.modeId')"
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
