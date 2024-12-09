<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NSelect, useNotification } from 'naive-ui';
// 键
const key = ref<any>(null);
// 值
const value = ref<any>(null);
// 绑定指令
const instruct = ref<any>(null);
// 消息弹出框
const notification = useNotification();
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
const valueOptions = ref([
  { label: '一键大跳', value: `alias "+cjump" "+jump;+duck";alias "-cjump" "-jump;-duck";bind "value" "+cjump";` },
  { label: '跳跃', value: `bind "value" "+jump";` },
  { label: '蹲伏', value: `bind "value" "+duck";` },
  { label: '手雷', value: `bind "value" "say !he";` },
  { label: '火瓶', value: `bind "value" "say !fire";` },
  { label: '血针', value: `bind "value" "say !xz";` },
  { label: '护甲(EXG)', value: `bind "value" "say !kevlar";` },
  { label: '夜视仪:开启(EXG)', value: `bind "value" "say toggle mat_fullbright 1";` },
  { label: '夜视仪:关闭(EXG)', value: `bind "value" "say toggle mat_fullbright 0";` },
  { label: 'bizon', value: `bind "value" "say !bizon";` },
  { label: 'mac10 ', value: `bind "value" "say !mac10";` },
  { label: 'mp5', value: `bind "value" "say !mp5";` },
  { label: 'mp7', value: `bind "value" "say !mp7";` },
  { label: 'mp9', value: `bind "value" "say !mp9";` },
  { label: 'p90', value: `bind "value" "say !p90";` },
  { label: 'ump45', value: `bind "value" "say !ump45";` },
  { label: 'ak47', value: `bind "value" "say !ak47";` },
  { label: 'aug', value: `bind "value" "say !aug";` },
  { label: 'famas', value: `bind "value" "say !famas";` },
  { label: 'galilar', value: `bind "value" "say !galilar";` },
  { label: 'm4a4', value: `bind "value" "say !m4a4";` },
  { label: 'm4a1', value: `bind "value" "say !m4a1";` },
  { label: 'sg553', value: `bind "value" "say !sg553";` },
  { label: 'awp', value: `bind "value" "say !awp";` },
  { label: 'g3sg1', value: `bind "value" "say !g3sg1";` },
  { label: 'scar20', value: `bind "value" "say !scar20";` },
  { label: 'ssg08', value: `bind "value" "say !ssg08";` },
  { label: 'mag7', value: `bind "value" "say !mag7";` },
  { label: 'nova', value: `bind "value" "say !nova";` },
  { label: 'sawedoff', value: `bind "value" "say !sawedoff";` },
  { label: 'xm1014 ', value: `bind "value" "say !xm1014 ";` },
  { label: 'm249', value: `bind "value" "say !m249";` },
  { label: 'negev', value: `bind "value" "say !negev";` },
  { label: 'deagle', value: `bind "value" "say !deagle";` },
  { label: 'elite ', value: `bind "value" "say !elite ";` },
  { label: 'fiveseven', value: `bind "value" "say !fiveseven";` },
  { label: 'glock', value: `bind "value" "say !glock";` },
  { label: 'p2000', value: `bind "value" "say !p2000";` },
  { label: 'p250', value: `bind "value" "say !p250";` },
  { label: 'tec9', value: `bind "value" "say !tec9";` },
  { label: 'usp', value: `bind "value" "say !usp";` },
  { label: 'cz', value: `bind "value" "say !cz";` },
  { label: 'r8', value: `bind "value" "say !r8";` },
  { label: 'AA12(EXG)', value: `bind "value" "say !aa12";` }
]);

// 保存指令
const saveButton = async () => {
  if (key.value && value.value) {
    instruct.value = value.value?.replace('value', key.value);
    try {
      await navigator.clipboard.writeText(instruct.value);
      notification.success({
        content: '复制成功',
        meta: '已复制绑定指令.',
        duration: 1500,
        keepAliveOnHover: true
      });
    } catch {
      notification.error({
        content: '复制失败',
        meta: '复制绑定指令失败.',
        duration: 1500,
        keepAliveOnHover: true
      });
    }
  } else {
    notification.error({
      content: '绑键失败',
      meta: '请选择绑定的键和绑定的指令',
      duration: 1500,
      keepAliveOnHover: true
    });
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NSelect
      v-model:value="key"
      class="width-50px mr-5px mt-10px"
      :options="keyOptions"
      :placeholder="$t('page.tool.bind.key')"
      clearable
    />
    <NSelect
      v-model:value="value"
      class="width-100px mr-5px mt-10px"
      :options="valueOptions"
      :placeholder="$t('page.tool.bind.value')"
      clearable
    />
    <NButton class="mr-5px mt-10px" strong secondary type="info" @click="saveButton">保存指令</NButton>
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
