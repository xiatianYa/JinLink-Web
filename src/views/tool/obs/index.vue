<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { fetchGetUserServerInfo } from '@/service/api/game/websocket';
import { useAuthStore } from '@/store/modules/auth';
import { fetchGetUserObsOptions, fetchUpdateLiveObsConfig } from '@/service/api/game/live';

const authStore = useAuthStore();

const interval = ref<NodeJS.Timeout>();

type UserServer = {
  serverName: string;
  addr: string;
  mapName: string;
  mapLabel: string;
  mapUrl: string;
  players: number;
  maxPlayers: number;
};

type Options = {
  fontSize: number;
  fontColor: string;
  fontShadow: string;
  obsLink: string;
  fontAlign: string;
  showMap: boolean;
};

const options = ref<Options>({
  fontSize: 16,
  fontColor: '#FFFFFF',
  fontShadow: 'rgba(255, 255, 255, 0.5)',
  obsLink: `https://www.bluearchive.top/obs?id=${authStore.userInfo.userId}`,
  fontAlign: 'left',
  showMap: true
});
const userServer = ref<UserServer | null>(null);
const fontAlignOptions = ref([
  { label: '左对齐', value: 'left' },
  { label: '右对齐', value: 'right' },
  { label: '居中对齐', value: 'center' }
]);

const copyLink = () => {
  navigator.clipboard.writeText(options.value.obsLink);
  window?.$message?.success('复制成功');
};

const handleSubmit = async () => {
  const { error } = await fetchUpdateLiveObsConfig(JSON.stringify(options.value));
  if (!error) {
    window?.$message?.success('保存成功');
  }
};

const init = async () => {
  const { data } = await fetchGetUserServerInfo(authStore.userInfo.userId);
  userServer.value = data;
};

const initOptions = async () => {
  const { data } = await fetchGetUserObsOptions(authStore.userInfo.userId);
  if (data) {
    const optionsData = JSON.parse(data);
    options.value = JSON.parse(optionsData.options);
  }
};

onMounted(async () => {
  await init();
  await initOptions();
  interval.value = setInterval(async () => {
    await init();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div class="min-h-500px flex gap-8px lt-sm:overflow-auto">
    <NCard>
      <div v-if="userServer" class="obs-preview p-20px" :style="`text-align: ${options.fontAlign}`">
        <div
          class="font-bold"
          :style="`color: ${options.fontColor}; text-shadow: 2px 2px 4px ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
        >
          服务器名称：{{ userServer?.serverName }}
        </div>
        <div
          class="mt-5px font-bold"
          :style="`color: ${options.fontColor}; text-shadow: 2px 2px 4px ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
        >
          服务器人数：{{ userServer?.players }}/{{ userServer?.maxPlayers }}
        </div>
        <div
          class="mt-5px font-bold"
          :style="`color: ${options.fontColor}; text-shadow: 2px 2px 4px ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
        >
          地图名称：{{ userServer?.mapName }} ({{ userServer?.mapLabel }})
        </div>
        <div
          v-if="options.showMap"
          class="flex"
          :class="
            options.fontAlign === 'center'
              ? 'justify-center'
              : options.fontAlign === 'right'
                ? 'justify-end'
                : 'justify-start'
          "
        >
          <img v-if="userServer?.mapUrl" v-lazy="userServer?.mapUrl" class="mt-5px h-130px w-300px" />
          <div
            v-else
            class="font-bold"
            :style="`color: ${options.fontColor}; text-shadow: 2px 2px 4px ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
          >
            暂无地图图片
          </div>
        </div>
      </div>
    </NCard>
    <NCard>
      <NForm>
        <NFormItem :label="$t('page.tool.obs.fontSize')" path="fontSize">
          <NInputNumber v-model:value="options.fontSize" :min="1" :max="32" />
        </NFormItem>
        <NFormItem :label="$t('page.tool.obs.fontAlign')" path="fontAlign">
          <NSelect v-model:value="options.fontAlign" :options="fontAlignOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.tool.obs.fontColor')" path="fontColor">
          <NColorPicker v-model:value="options.fontColor" />
        </NFormItem>
        <NFormItem :label="$t('page.tool.obs.fontShadow')" path="fontShadow">
          <NColorPicker v-model:value="options.fontShadow" />
        </NFormItem>
        <NFormItem :label="$t('page.tool.obs.showMap')" path="showMap">
          <NSwitch v-model:value="options.showMap" />
        </NFormItem>
        <NFormItem :label="$t('page.tool.obs.obsLink')" path="obsLink">
          <NInput v-model:value="options.obsLink" disabled class="mr-20px" />
          <NButton type="primary" @click="copyLink">
            <template #icon>
              <SvgIcon icon="solar:copy-outline" class="text-20px" />
            </template>
            {{ $t('common.copy') }}
          </NButton>
        </NFormItem>
      </NForm>
      <NSpace :size="16">
        <NButton type="primary" @click="handleSubmit">
          <template #icon>
            <SvgIcon icon="ic:round-save-all" class="text-20px" />
          </template>
          {{ $t('common.save') }}
        </NButton>
        <NPopover trigger="hover" placement="bottom-start">
          <template #trigger>
            <NButton strong secondary type="info">
              <template #icon>
                <SvgIcon icon="tabler:info-square-rounded" />
              </template>
            </NButton>
          </template>
          <template #header>
            <div class="text-14px font-bold">提示</div>
          </template>
          <div class="text-14px">
            OBS内配置文本,然后在登录器内加入一个服务器,然后复制OBS显示链接,以Bilibili为例,添加浏览器输入OBS链接即可.
          </div>
        </NPopover>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped lang="scss"></style>
