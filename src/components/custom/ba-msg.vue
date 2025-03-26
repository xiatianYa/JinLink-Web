<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import { formatTime } from '@/utils/date';

const props = defineProps<{
  msg: any;
  user: Api.Auth.UserInfo;
}>();

interface Model {
  msg: any;
  user: Api.Auth.UserInfo;
}

const right = props.msg.fromId === props.user.userId;

const model: Model = reactive(props);
</script>

<template>
  <div class="ba-msg-box" :class="{ right: right }">
    <!-- 时间 -->
    <div v-if="model.msg.isShowTime" :content="props.msg.createTime" class="mb-10px flex-x-center">
      <NTag :bordered="false">{{ formatTime(model.msg.createTime) }}</NTag>
    </div>
    <!-- 撤回 -->
    <template v-if="msg.type === 'recall'">
      {{ model.msg.content }}
    </template>
    <div v-else class="msg-box-wrapper" :class="{ right: right }">
      <NAvatar round size="large" class="avatar mr-10px" :src="model.user.avatar" />
      <div class="msg-box-info">
        <!--用户信息-->
        <div class="msg-username">
          {{ model.user.userName }}
        </div>
        <!--消息内容-->
        <NButton v-if="model.msg.type === '1' || model.msg.type === '3'" strong secondary>
          {{ model.msg.content }}
        </NButton>
        <NButton v-else-if="model.msg.type === '2'" strong secondary class="h-136px w-136px">
          <NImage class="h-120px w-120px" :src="model.msg.content" preview-disabled />
        </NButton>
        <!--引用信息-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ba-msg-box {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: column;

  .msg-box-wrapper {
    display: flex;

    .avatar {
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .msg-box-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      .msg-username {
        color: rgba(var(--text-color), 0.7);
        user-select: none;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
</style>
