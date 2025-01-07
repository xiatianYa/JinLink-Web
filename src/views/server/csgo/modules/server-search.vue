<script setup lang="ts">
import { ref, watch } from 'vue';
import { $t } from '@/locales';

defineOptions({
  name: 'ServerSearch'
});

interface Props {
  /** the community name options */
  communityOptions?: CommonType.Option[] | [];
  /** the mode name options */
  modeOptions?: CommonType.Option[] | [];
}

const props = defineProps<Props>();

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Game.ServerSearchParams>('model', { required: true });

const communityOption = ref<CommonType.Option[]>([]);

const modeOption = ref<CommonType.Option[]>([]);

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

function handleInitModel() {
  Object.assign(communityOption.value, props.communityOptions);
  Object.assign(modeOption.value, props.modeOptions);
}

watch(
  props,
  () => {
    handleInitModel();
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.game.server.communityId')"
              path="communityIds"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.communityIds"
                multiple
                clearable
                :options="communityOption"
                :placeholder="$t('page.game.server.form.communityId')"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.game.server.modeId')" path="modeId" class="pr-24px">
              <NSelect
                v-model:value="model.modeIds"
                multiple
                clearable
                :options="modeOption"
                :placeholder="$t('page.game.server.form.modeId')"
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
