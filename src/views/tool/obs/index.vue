<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { fetchGetUserServerInfo } from '@/service/api/game/websocket';
import { useAuthStore } from '@/store/modules/auth';
import { fetchGetUserObsOptions, fetchUpdateLiveObsConfig } from '@/service/api/game/live';

const authStore = useAuthStore();

// 轮询间隔
const interval = ref<NodeJS.Timeout>();

// 用户服务器
type UserServer = {
  serverName: string;
  addr: string;
  mapName: string;
  mapLabel: string;
  mapUrl: string;
  players: number;
  maxPlayers: number;
};

// OBS配置
type Options = {
  fontSize: number;
  fontColor: string;
  fontShadow: string;
  obsLink: string;
  fontAlign: string;
  showMap: boolean;
  customText: string[];
  fontFamily: string;
};

// OBS配置
const options = ref<Options>({
  fontSize: 16,
  fontColor: '#FFFFFF',
  fontShadow: 'rgba(255, 255, 255, 0.5)',
  obsLink: `https://www.bluearchive.top/obs?id=${authStore.userInfo.userId}`,
  fontAlign: 'left',
  showMap: true,
  customText: [],
  fontFamily: 'Microsoft YaHei'
});

// 用户服务器
const userServer = ref<UserServer | null>(null);

// 对齐方式
const fontAlignOptions = ref([
  { label: '左对齐', value: 'left' },
  { label: '右对齐', value: 'right' },
  { label: '居中对齐', value: 'center' }
]);

const fontFamilyOptions = ref([
  { label: '宋体', value: 'SimSun' },
  { label: '黑体', value: 'SimHei' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '楷体', value: 'KaiTi' },
  { label: '新宋体', value: 'NSimSun' }
]);

// 复制链接
const copyLink = () => {
  navigator.clipboard.writeText(options.value.obsLink);
  window?.$message?.success('复制成功');
};

// 保存配置
const handleSubmit = async () => {
  const { error } = await fetchUpdateLiveObsConfig(JSON.stringify(options.value));
  if (!error) {
    window?.$message?.success('保存成功');
  }
};

// 初始化
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

// 创建自定义文本
const handleCreateCustomText = () => {
  return null;
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
      <div
        v-if="userServer"
        class="obs-preview p-20px"
        :style="`text-align: ${options.fontAlign}; font-family: ${options.fontFamily}, sans-serif`"
      >
        <div
          class="font-bold"
          :style="`color: ${options.fontColor}; text-shadow: -1px -1px 0 ${options.fontShadow}, 1px -1px 0 ${options.fontShadow}, -1px 1px 0 ${options.fontShadow}, 1px 1px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
        >
          服务器名称：{{ userServer?.serverName }}
        </div>
        <div
          class="mt-5px font-bold"
          :style="`color: ${options.fontColor}; text-shadow: 1px 1px 0 ${options.fontShadow}, -1px -1px 0 ${options.fontShadow}, 1px -1px 0 ${options.fontShadow}, -1px 1px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
        >
          服务器人数：{{ userServer?.players }}/{{ userServer?.maxPlayers }}
        </div>
        <div
          class="mt-5px font-bold"
          :style="`color: ${options.fontColor}; text-shadow: 1px 1px 0 ${options.fontShadow}, -1px -1px 0 ${options.fontShadow}, 1px -1px 0 ${options.fontShadow}, -1px 1px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
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
            :style="`color: ${options.fontColor}; text-shadow: 1px 1px 0 ${options.fontShadow}, -1px -1px 0 ${options.fontShadow}, 1px -1px 0 ${options.fontShadow}, -1px 1px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
          >
            暂无地图图片
          </div>
        </div>
        <div v-for="(item, index) in options.customText" :key="index">
          <div
            class="mt-5px font-bold"
            :style="`color: ${options.fontColor}; text-shadow: 1px 1px 0 ${options.fontShadow}, -1px -1px 0 ${options.fontShadow}, 1px -1px 0 ${options.fontShadow}, -1px 1px 0 ${options.fontShadow}; text-align: ${options.fontAlign}; font-size: ${options.fontSize}px`"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </NCard>
    <NCard>
      <NForm>
        <NFormItem :label="$t('page.tool.obs.fontFamily')" path="fontFamily">
          <NSelect v-model:value="options.fontFamily" :options="fontFamilyOptions" />
        </NFormItem>
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
        <NFormItem :label="$t('page.tool.obs.customText')">
          <NDynamicInput v-model:value="options.customText" :on-create="handleCreateCustomText">
            <template #default="{ value, index }">
              <div class="ml-8px flex-y-center flex-1 gap-12px">
                <NInput
                  :value="value"
                  class="mr-5px min-w-150px"
                  clearable
                  @update:value="v => (options.customText[index] = v)"
                />
              </div>
            </template>
            <template #action="{ index, create, remove }">
              <div class="ml-8px flex-y-center gap-12px">
                <NButton class="min-w-100px" size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton class="min-w-100px" size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </div>
            </template>
          </NDynamicInput>
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
