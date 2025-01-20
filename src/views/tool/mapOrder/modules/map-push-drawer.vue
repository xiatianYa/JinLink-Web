<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { useGameStore } from '@/store/modules/game';
import { fetchGetCommunityNames, fetchGetModeNames } from '@/service/api';
import websocket from '@/utils/websocket';
import { useAuth } from '@/hooks/business/auth';

defineOptions({
  name: 'MapPushDrawer'
});

const { hasAuth } = useAuth();

// 游戏模块
const gameStore = useGameStore();

// 社区id
const communityId = ref<number | null>(null);

// 模式id
const modeId = ref<number | null>(null);

// 推送内容
const description = ref<string>('');

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);

// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);

const visible = defineModel<boolean>('visible', {
  default: false
});

async function handlePush(server: any) {
  if (hasAuth('game:gameMapOrder:push')) {
    websocket.sendMsgAllPush({ ...server, description: description.value });
  } else {
    window.$message?.error('您没有权限,申请推送权限请前往QQ群:901243791,联系管理员或群主');
  }
}

// 初始化社区和模式数据
async function initOptions() {
  const communityNames = await fetchGetCommunityNames();
  if (communityNames.data) {
    communityOptions.value = communityNames.data;
  }
  const modeNames = await fetchGetModeNames();
  if (modeNames.data) {
    modeOptions.value = modeNames.data;
  }
}

onMounted(() => {
  initOptions();
});

// 游戏服务器列表
const gameServerList = computed(() => {
  if (communityId.value && modeId.value) {
    // 过滤不匹配的社区
    const filterCommunity = gameStore?.autoMapReceiveList?.find(
      (item: any) => String(item.gameCommunity.id) === String(communityId.value)
    );
    // 过滤不匹配的模式
    const filterMode = filterCommunity?.gameServerVoList.filter(
      (item: any) => String(item.modeId) === String(modeId.value)
    );

    return filterMode;
  }
  return [];
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="$t('page.tool.mapOrder.mapPush')" :native-scrollbar="false" closable>
      <NSpace vertical>
        <NSelect
          v-model:value="communityId"
          clearable
          :options="communityOptions"
          :placeholder="$t('page.game.server.form.communityId')"
        />
        <NSelect
          v-model:value="modeId"
          clearable
          :options="modeOptions"
          :placeholder="$t('page.game.server.form.modeId')"
        />
        <NInput v-model:value="description" placeholder="请输入推送内容" />
      </NSpace>
      <NSpace vertical class="mt-5">
        <NGrid :x-gap="10" :y-gap="10" cols="1 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
          <NGridItem v-for="server in gameServerList" :key="server.addr">
            <div class="server">
              <NEllipsis :line-clamp="1" class="server-name">{{ server.serverName }}</NEllipsis>
              <NImage
                :src="server.mapUrl ? server.mapUrl : 'https://www.bluearchive.top/statics/2024/11/21/noImg.jpg'"
                width="250"
              />
              <div class="push-button">
                <NButton type="primary" size="small" secondary @click="handlePush(server)">
                  {{ $t('common.push') }}
                </NButton>
              </div>
            </div>
          </NGridItem>
        </NGrid>
      </NSpace>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.server {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .push-button {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}
</style>
