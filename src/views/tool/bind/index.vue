<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { NButton, NSelect } from 'naive-ui';
import { saveAs } from 'file-saver';
import {
  fetchGetBindByCommunityId,
  fetchGetCommunityBind,
  fetchGetCommunityNames,
  fetchUpdateBind
} from '@/service/api';

// 社区id
const communityId = ref<any>(null);

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);

// 社区按键命令
const communityBindOptions = ref<Array<{ code: string; desc: string }>>([]);

// 社区按键命令
const bindOptions = ref<Api.Game.CommunityBindOptionsVo[]>([]);

// 按钮
const buttons = ref<Array<{ code: string; desc: string }>>([]);

// 按钮编辑模式
const buttonEditMode = ref<boolean>(true);

// 按键选项
const keyOptions = ref([
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
  { label: 'c', value: 'c' },
  { label: 'd', value: 'd' },
  { label: 'e', value: 'e' },
  { label: 'f', value: 'f' },
  { label: 'g', value: 'g' },
  { label: 'h', value: 'h' },
  { label: 'i', value: 'i' },
  { label: 'j', value: 'j' },
  { label: 'k', value: 'k' },
  { label: 'l', value: 'l' },
  { label: 'm', value: 'm' },
  { label: 'n', value: 'n' },
  { label: 'o', value: 'o' },
  { label: 'p', value: 'p' },
  { label: 'q', value: 'q' },
  { label: 'r', value: 'r' },
  { label: 's', value: 's' },
  { label: 't', value: 't' },
  { label: 'u', value: 'u' },
  { label: 'v', value: 'v' },
  { label: 'w', value: 'w' },
  { label: 'x', value: 'x' },
  { label: 'y', value: 'y' },
  { label: 'z', value: 'z' },
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '-', value: '-' },
  { label: '=', value: '=' },
  { label: '`', value: '`' },
  { label: 'F1', value: 'f1' },
  { label: 'F2', value: 'f2' },
  { label: 'F3', value: 'f3' },
  { label: 'F4', value: 'f4' },
  { label: 'F5', value: 'f5' },
  { label: 'F6', value: 'f6' },
  { label: 'F7', value: 'f7' },
  { label: 'F8', value: 'f8' },
  { label: 'F9', value: 'f9' },
  { label: 'F10', value: 'f10' },
  { label: 'F11', value: 'f11' },
  { label: 'F12', value: 'f12' },
  { label: ',', value: ',' },
  { label: '.', value: '.' },
  { label: '/', value: '/' },
  { label: ';', value: ';' },
  { label: "'", value: "'" },
  { label: '[', value: '[' },
  { label: ']', value: ']' },
  { label: '\\', value: '\\' },
  { label: 'ctrl', value: 'ctrl' },
  { label: 'shift', value: 'shift' },
  { label: 'enter', value: 'enter' },
  { label: 'capslocktoggle', value: 'capslocktoggle' },
  { label: 'tab', value: 'tab' },
  { label: 'alt', value: 'alt' },
  { label: 'space', value: 'space' },
  { label: 'mouse1', value: 'mouse1' },
  { label: 'mouse2', value: 'mouse2' },
  { label: 'mouse3', value: 'mouse3' },
  { label: 'mouse4', value: 'mouse4' },
  { label: 'mouse5', value: 'mouse5' },
  { label: '滚轮向下', value: 'mwheeldown' },
  { label: '滚轮向上', value: 'mwheelup' },
  { label: '小键盘.', value: 'kp_del' },
  { label: '小键盘*', value: 'kp_multiply' },
  { label: '小键盘-', value: 'kp_minus' },
  { label: '小键盘+', value: 'kp_plus' },
  { label: '小键盘/', value: 'kp_slash' },
  { label: '小键盘回车', value: 'kp_enter' },
  { label: '小键盘1', value: 'kp_1' },
  { label: '小键盘2', value: 'kp_2' },
  { label: '小键盘3', value: 'kp_3' },
  { label: '小键盘4', value: 'kp_4' },
  { label: '小键盘5', value: 'kp_5' },
  { label: '小键盘6', value: 'kp_6' },
  { label: '小键盘7', value: 'kp_7' },
  { label: '小键盘8', value: 'kp_8' },
  { label: '小键盘9', value: 'kp_9' },
  { label: '小键盘0', value: 'kp_0' },
  { label: '上方向键', value: 'uparrow' },
  { label: '下方向键', value: 'downarrow' },
  { label: '左方向键', value: 'leftarrow' },
  { label: '右方向键', value: 'rightarrow' },
  { label: 'del', value: 'del' },
  { label: 'ins', value: 'ins' },
  { label: 'end', value: 'end' },
  { label: 'home', value: 'home' },
  { label: 'pgup', value: 'pgup' },
  { label: 'pgdn', value: 'pgdn' }
]);

function handleCreateButton() {
  if (!communityId.value) {
    window?.$message?.error('请选择社区');
    return null;
  }
  const buttonItem: { code: string | null; desc: string | null } = {
    code: null,
    desc: null
  };

  return buttonItem;
}

// 导出为Cfg文件
function exportCfg() {
  let cfgContent = '';
  buttons.value.forEach(button => {
    cfgContent += `bind ${button.code} "${button.desc}"\n`;
  });

  const blob = new Blob([cfgContent], { type: 'text/plain;charset=utf-8' });
  // 获取社区名称
  const communityName = communityOptions.value.find(item => item.value === communityId.value)?.label;
  // 名称转为小写
  saveAs(blob, `${communityName?.toLowerCase()}.cfg`);
}

// 保存配置
async function saveCfg() {
  if (!communityId.value) {
    window?.$message?.error('请选择社区');
    return;
  }
  const { error } = await fetchUpdateBind({ communityId: communityId.value, cfg: JSON.stringify(buttons.value) });
  if (!error) {
    window?.$message?.success('保存成功');
  } else {
    window?.$message?.error(`保存失败${error.message}`);
  }
}

// 切换编辑模式
function changeEditMode() {
  buttonEditMode.value = !buttonEditMode.value;
  window?.$message?.success('切换成功');
}

// 初始化社区和模式数据
async function initOptions() {
  const communityNames = await fetchGetCommunityNames();
  if (communityNames.data) {
    communityOptions.value = communityNames.data;
  }
  const bindNames = await fetchGetCommunityBind();
  if (bindNames.data) {
    bindOptions.value = bindNames.data;
  }
}

// 初始化配置
async function initCfg() {
  if (communityId.value) {
    const { data, error } = await fetchGetBindByCommunityId({ communityId: communityId.value });
    if (!error) {
      if (data) {
        buttons.value = JSON.parse(data.cfg);
      } else {
        buttons.value = [];
      }
    } else {
      window?.$message?.error(`获取配置失败${error.message}`);
    }
  }
}

onMounted(() => {
  initOptions();
});

watch(communityId, async () => {
  if (communityId.value) {
    initCfg();
    const findOptions = bindOptions.value.find(item => String(item.communityId) === String(communityId.value));
    if (findOptions && findOptions.options) {
      communityBindOptions.value = findOptions.options;
    } else {
      window?.$message?.error('当前社区没有指令列表');
    }
  }
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NCard size="small" class="mb-15px" content-class="flex flex-wrap">
      <NSelect
        v-model:value="communityId"
        class="mr-5px mt-10px max-w-250px"
        :options="communityOptions"
        :placeholder="$t('page.game.server.form.communityId')"
        clearable
      />
      <NButton class="mr-5px mt-10px" strong secondary type="success" @click="saveCfg">
        <template #icon>
          <NIcon>
            <SvgIcon icon="material-symbols:save-outline" />
          </NIcon>
        </template>
        {{ $t('page.tool.bind.saveCfg') }}
      </NButton>
      <NButton class="mr-5px mt-10px" strong secondary type="info" @click="exportCfg">
        <template #icon>
          <SvgIcon icon="material-symbols:file-export-outline" />
        </template>
        {{ $t('page.tool.bind.exportCfg') }}
      </NButton>
      <NButton class="mr-5px mt-10px" strong secondary type="info" @click="changeEditMode">
        <template #icon>
          <SvgIcon icon="hugeicons:exchange-01" />
        </template>
        {{ $t('page.tool.bind.editMode') }}
      </NButton>
      <NPopover trigger="hover" placement="bottom-start">
        <template #trigger>
          <NButton class="mr-5px mt-10px" strong secondary type="info">
            <template #icon>
              <SvgIcon icon="tabler:info-square-rounded" />
            </template>
          </NButton>
        </template>
        <template #header>
          <div class="text-14px font-bold">提示</div>
        </template>
        <div class="text-14px">
          Steam内鼠标移至CS2点击右键选管理→浏览本地文件，然后依序打开资料夹→game→csgo→cfg 将cfg移至此资料夹内即可
          <br />
          进入游戏后打开控制台输入exec cfg文件名称（exec与名称之间要空格，文件名即可副档名无需输入，如zed.cfg
          只需要输入zed）
          <br />
          每次启动游戏都需要输入一次（如果启动游戏发现绑键失效的话）
          <br />
          如需添加指令,请添加反馈QQ群:901243791
        </div>
      </NPopover>
    </NCard>
    <NCard size="small" class="mb-15px" content-class="flex flex-wrap">
      <NDynamicInput v-model:value="buttons" :on-create="handleCreateButton">
        <template #default="{ value }">
          <div class="ml-8px flex-y-center flex-1 gap-12px">
            <NSelect
              v-model:value="value.code"
              class="mr-5px min-w-150px"
              :options="keyOptions"
              :placeholder="$t('page.tool.bind.key')"
              clearable
            />
            <NSelect
              v-if="buttonEditMode"
              v-model:value="value.desc"
              :options="communityBindOptions"
              label-field="desc"
              value-field="code"
              class="mr-5px min-w-150px"
              :placeholder="$t('page.tool.bind.value')"
              clearable
            />
            <NInput
              v-else
              v-model:value="value.desc"
              class="mr-5px min-w-150px"
              :placeholder="$t('page.tool.bind.value')"
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
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.toolPage {
  height: auto;

  .title {
    font-size: 16px;
    font-weight: bolder;
  }
}
</style>
