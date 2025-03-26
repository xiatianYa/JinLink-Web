<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useGameStore } from '@/store/modules/game';
import websocket from '@/utils/websocket';
import { fetchGetChatRoomMessageList } from '@/service/api';

const authStore = useAuthStore();

// 游戏仓库
const gameStore = useGameStore();

// 表情模态框
const EmoJiModel = ref(false);

// 聊天内容
const chatShowRef = ref();

// 打开表情框
const openEmoJiModel = () => {
  EmoJiModel.value = true;
};

// 存储的消息
const content = ref('');

// 处理表情
const handlerEmoji = (emoji: string, type: string) => {
  EmoJiModel.value = false;
  if (type === 'text') {
    websocket.sendEmojiMsg(emoji);
  } else {
    websocket.sendMImgMsg(emoji);
  }
};

// 发送消息
const sendMsg = () => {
  websocket.sendTextMsg(content.value);
  content.value = '';
};

// 滚动事件
const handleScroll = async () => {
  if (chatShowRef.value) {
    // 记录当前滚动条的位置
    const initialScrollTop = chatShowRef.value.scrollTop;
    const initialScrollHeight = chatShowRef.value.scrollHeight;

    // 最底部更新currentNewMsgCount为0
    if (chatShowRef.value.scrollTop === 0) {
      // 获取消息记录
      const { data, error } = await fetchGetChatRoomMessageList(
        gameStore.chatRoomCurrentMsgCount,
        gameStore.chatRoomLoadMsgCount
      );
      // 增加消息数量
      gameStore.chatRoomCurrentMsgCount += data.length;
      if (!error) {
        gameStore.chatRoomMessageList = [...data, ...gameStore.chatRoomMessageList];
      }

      // 等待DOM更新后，恢复滚动条位置
      await nextTick(() => {
        const newScrollHeight = chatShowRef.value.scrollHeight;
        const diff = newScrollHeight - initialScrollHeight;
        chatShowRef.value.scrollTop = initialScrollTop + diff;
      });
    }
  }
};

onMounted(() => {
  // 默认滚动到底部
  chatShowRef.value.scrollTo({
    top: chatShowRef.value.scrollHeight
  });
  if (chatShowRef.value) {
    chatShowRef.value.addEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div class="chat-container">
    <!-- 左侧菜单 -->
    <NCard class="w-20%" content-style="padding: 10px">
      <div class="mt-10px flex-x-center flex-y-center font-size-16px font-bold">
        消息列表
        <NButton class="ml-5px" size="tiny" secondary tertiary type="info">v1.0.0</NButton>
      </div>
      <div class="group-box mt-20px p-10px">
        <div class="group-box-left flex-y-center">
          <div class="avatar">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="group-box-right">
          <div class="top">Ba公共聊天室</div>
          <div class="bottom">xiatian:1231</div>
        </div>
      </div>
    </NCard>
    <!-- 中间菜单 -->
    <NSpace class="w-60%" vertical :wrap-item="false">
      <NCard class="h-10%" content-class="min-h-80px flex-x-center w-full" content-style="padding: 10px">
        <div class="flex-y-center font-size-18px font-bold">Ba公共聊天室</div>
      </NCard>
      <NCard class="h-90%" content-class="h-full" content-style="padding: 15px">
        <div class="chat-content">
          <div ref="chatShowRef" class="chat-show-area">
            <div
              v-for="item in gameStore.chatRoomMessageList"
              :key="item.id"
              class="msg-item"
              :class="{ right: item.fromId === authStore.userInfo.userId }"
            >
              <BaMsg :msg="item" :user="authStore.userInfo" />
            </div>
          </div>
          <div class="chat-input-area mt-20px flex-x-center flex-y-center">
            <NInputGroup class="w-80% flex-y-center">
              <NInput v-model:value="content" class="w-20% p-5px" round>
                <template #prefix>
                  <div @click="openEmoJiModel()">
                    <SvgIcon icon="iconamoon:slightly-smiling-face" class="cursor-pointer font-size-32px" />
                  </div>
                </template>
              </NInput>
            </NInputGroup>
            <NButton class="ml-20px" strong secondary circle size="large" @click="sendMsg()">
              <template #icon>
                <SvgIcon icon="mingcute:send-fill" />
              </template>
            </NButton>
          </div>
        </div>
      </NCard>
    </NSpace>
    <!-- 右侧菜单 -->
    <NSpace class="w-20%" vertical :wrap-item="false">
      <NCard class="h-10%" content-class="w-full flex-y-center" content-style="padding:10px">
        <NAvatar round size="large" class="avatar mr-10px" :src="authStore.userInfo.avatar" />
        <div class="w-60% font-bold">{{ authStore.userInfo.userName }}</div>
      </NCard>
      <NCard class="h-90%" content-style="padding:10px">
        <div class="mt-10px flex-y-center">
          <div class="w-90% font-bold">在线人数({{ gameStore.onlineUserList.length }})</div>
          <!-- <NInput type="text" size="small" placeholder="搜索用户" /> -->
        </div>
        <div class="online-list mt-15px h-92%">
          <div
            v-for="(user, index) in gameStore.onlineUserList"
            :key="index"
            class="online-item mb-5px flex-y-center p-15px"
          >
            <div class="left flex-y-center">
              <NAvatar round size="medium" class="avatar mr-10px" :src="user.avatar" />
              <div class="font-bold">{{ user.nickName }}</div>
            </div>
            <!--
 <div class="right">
              <NButton tertiary size="tiny" type="info">私聊</NButton>
            </div>
-->
          </div>
        </div>
      </NCard>
    </NSpace>
    <!-- 表情模态框 -->
    <NModal v-model:show="EmoJiModel" class="w-500px">
      <NCard :bordered="false" size="huge" role="dialog" aria-modal="true" content-style="padding:10px">
        <EmojiBox @on-emoji="handlerEmoji"></EmojiBox>
      </NCard>
    </NModal>
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .group-box {
    display: flex;
    width: 100%;
    height: 64px;
    background-color: #a3a3a3;
    border-radius: 10px;
    cursor: pointer;

    .group-box-left {
      width: 60px;
      height: 100%;

      .avatar {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        animation: rotate_3922 1.2s linear infinite;
        background-color: #9b59b6;
        background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);

        span {
          position: absolute;
          border-radius: 50%;
          height: 100%;
          width: 100%;
          background-color: #9b59b6;
          background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
        }

        span:nth-of-type(1) {
          filter: blur(5px);
        }

        span:nth-of-type(2) {
          filter: blur(10px);
        }

        span:nth-of-type(3) {
          filter: blur(25px);
        }

        span:nth-of-type(4) {
          filter: blur(50px);
        }

        &::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          background-color: #fff;
          border: solid 5px #ffffff;
          border-radius: 50%;
        }
      }
    }

    .group-box-right {
      width: 80%;

      .top {
        font-size: 14px;
        font-weight: bold;
      }

      .bottom {
        font-size: 12px;
      }
    }
  }

  .online-list {
    width: 100%;
    overflow-y: auto;

    .online-item {
      width: 100%;
      height: 50px;
      justify-content: space-between;
      background-color: #84cdfa;
      border-radius: 5px;

      .right {
        display: none;
        opacity: 0;
        transition: opacity 1s ease;
      }

      &:hover {
        .right {
          display: block;
          opacity: 1;
          transition: opacity 1s ease;
        }
      }
    }
  }

  .chat-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .chat-show-area {
      padding: 10px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;

      .msg-item {
        display: flex;
      }
    }

    .chat-input-area {
      bottom: 0%;
      width: 100%;
      height: 55px;
    }
  }

  .avatar {
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
}

@keyframes rotate_3922 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
