<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useRouterPush } from '@/hooks/common/router';
import { useAuthStore } from '@/store/modules/auth';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
import { fetchGetCommunityNames, fetchGetModeNames, fetchUpdatePassword, fetchUpdateUserInfo } from '@/service/api';
import UserInfoOperateDrawer from './modules/user-info-operate-drawer.vue';

type InfoModel = Pick<
  Api.SystemManage.UserVo,
  'userName' | 'userAvatar' | 'nickName' | 'userPhone' | 'userEmail' | 'userGender'
>;

type PasswordModel = Pick<Api.SystemManage.UserPasswordVo, 'oldPassword' | 'newPassword' | 'confirmPassword'>;

const infoModel: InfoModel = reactive(createDefaultInfoModel());

const passwordModel: PasswordModel = reactive(createDefaultPasswordModel());

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);

// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);

// 社区偏好
const communityId = ref<string | null>(null);

// 模式偏好
const modeId = ref<string | null>(null);

// 用户信息操作抽屉
const drawerVisible = ref(false);

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));

const { routerPushByKey } = useRouterPush();

const authStore = useAuthStore();

const { dictLabel, dictOptions } = useDict();

const { formRef: infoFormRef, validate: validateInfoForm } = useNaiveForm();
const { formRef: passwordFormRef, validate: validatePasswordForm } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

function createDefaultInfoModel(): InfoModel {
  return {
    userName: '',
    userAvatar: '',
    nickName: '',
    userPhone: '',
    userEmail: '',
    userGender: null
  };
}

function createDefaultPasswordModel(): PasswordModel {
  return {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
}

type InfoRuleKey = Extract<keyof InfoModel, 'userName' | 'userGender'>;

const infoRules: Record<InfoRuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  userGender: defaultRequiredRule
};

type PasswordRuleKey = Extract<keyof PasswordModel, 'oldPassword' | 'newPassword' | 'confirmPassword'>;

const passwordRules: Record<PasswordRuleKey, App.Global.FormRule> = {
  oldPassword: defaultRequiredRule,
  newPassword: defaultRequiredRule,
  confirmPassword: defaultRequiredRule
};

function handleCancel() {
  routerPushByKey('root');
}

async function handleInfoSubmit() {
  await validateInfoForm();
  // request
  const { error } = await fetchUpdateUserInfo(infoModel);
  if (!error) window.$message?.success($t('common.updateSuccess'));
  authStore.initUserInfo();
}

async function handlePasswordSubmit() {
  await validatePasswordForm();
  // request
  const { error } = await fetchUpdatePassword(passwordModel);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    authStore.resetStore();
  }
}
async function handleGameConfigSubmit() {
  if (communityId.value) {
    localStorage.setItem('communityId', communityId.value);
  } else {
    localStorage.removeItem('communityId');
  }
  if (modeId.value) {
    localStorage.setItem('modeId', modeId.value);
  } else {
    localStorage.removeItem('modeId');
  }
  window.$message?.success($t('common.updateSuccess'));
}

function handleResetUserName() {
  drawerVisible.value = true;
}

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
  Object.assign(infoModel, authStore.userInfo);
  // 获取社区和模式配置项
  communityId.value = localStorage.getItem('communityId');
  modeId.value = localStorage.getItem('modeId');
  initOptions();
});
</script>

<template>
  <NSpace vertical :size="16">
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard :title="$t('page.userCenter.userInfo.personalInfo')" :bordered="false" class="card-wrapper">
          <NAvatar :size="64" :src="authStore.userInfo.avatar"></NAvatar>
          <div class="mt-16px flex items-center justify-between">
            <div class="flex items-center">
              <icon-material-symbols:deployed-code-account-outline class="text-24px" />
              {{ $t('page.userCenter.userInfo.nickName') }}
            </div>
            {{ authStore.userInfo?.userName }}
          </div>
          <div class="mt-16px flex items-center justify-between">
            <div class="flex items-center">
              <icon-material-symbols:phone-android-outline class="text-24px" />
              {{ $t('page.userCenter.userInfo.phone') }}
            </div>
            {{ authStore.userInfo?.userPhone }}
          </div>
          <div class="mt-16px flex items-center justify-between">
            <div class="flex items-center">
              <icon-uil:envelope-minus class="text-24px" />
              {{ $t('page.userCenter.userInfo.email') }}
            </div>
            {{ authStore.userInfo?.userEmail }}
          </div>
          <div class="mt-16px flex items-center justify-between">
            <div class="flex items-center">
              <icon-mdi:gender-female class="text-24px" />
              {{ $t('page.userCenter.userInfo.gender') }}
            </div>
            {{ dictLabel('gender', authStore.userInfo?.userGender) }}
          </div>
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:10">
        <NCard :title="$t('page.userCenter.userInfo.basicInfo')" :bordered="false" class="card-wrapper">
          <NTabs type="segment" animated>
            <NTabPane name="chap1" :tab="$t('page.userCenter.userInfo.basicInfo')">
              <NForm ref="infoFormRef" :model="infoModel" :rules="infoRules">
                <NFormItem :label="$t('page.userCenter.userInfo.nickName')" path="nickName">
                  <NInput v-model:value="infoModel.userName" />
                </NFormItem>
                <NFormItem :label="$t('page.userCenter.userInfo.phone')" path="userPhone">
                  <NInput v-model:value="infoModel.userPhone" />
                </NFormItem>
                <NFormItem :label="$t('page.userCenter.userInfo.email')" path="userEmail">
                  <NInput v-model:value="infoModel.userEmail" />
                </NFormItem>
                <NFormItem :label="$t('page.userCenter.userInfo.gender')" path="userGender">
                  <NRadioGroup v-model:value="infoModel.userGender">
                    <NRadio v-for="item in dictOptions('gender')" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </NRadio>
                  </NRadioGroup>
                </NFormItem>
              </NForm>
              <NSpace :size="16">
                <NButton @click="handleCancel">{{ $t('common.cancel') }}</NButton>
                <NButton type="info" @click="handleResetUserName">{{ $t('common.resetUserName') }}</NButton>
                <NButton type="success" @click="handleInfoSubmit">{{ $t('common.confirm') }}</NButton>
              </NSpace>
            </NTabPane>
            <NTabPane name="chap2" :tab="$t('page.userCenter.userInfo.changePassword')">
              <NForm ref="passwordFormRef" :model="passwordModel" :rules="passwordRules">
                <NFormItem :label="$t('page.userCenter.userInfo.oldPassword')" path="oldPassword">
                  <NInput
                    v-model:value="passwordModel.oldPassword"
                    :placeholder="$t('page.userCenter.userInfo.form.oldPasswordPlaceholder')"
                    type="password"
                    show-password-on="click"
                  />
                </NFormItem>
                <NFormItem :label="$t('page.userCenter.userInfo.newPassword')" path="newPassword">
                  <NInput
                    v-model:value="passwordModel.newPassword"
                    :placeholder="$t('page.userCenter.userInfo.form.newPasswordPlaceholder')"
                    type="password"
                    show-password-on="click"
                  />
                </NFormItem>
                <NFormItem :label="$t('page.userCenter.userInfo.confirmPassword')" path="confirmPassword">
                  <NInput
                    v-model:value="passwordModel.confirmPassword"
                    :placeholder="$t('page.userCenter.userInfo.form.confirmPasswordPlaceholder')"
                    type="password"
                    show-password-on="click"
                  />
                </NFormItem>
              </NForm>
              <NSpace :size="16">
                <NButton @click="handleCancel">{{ $t('common.cancel') }}</NButton>
                <NButton type="success" @click="handlePasswordSubmit">{{ $t('common.confirm') }}</NButton>
              </NSpace>
            </NTabPane>
            <NTabPane name="chap3" :tab="$t('page.userCenter.userInfo.gameConfig')">
              <NSelect
                v-model:value="communityId"
                clearable
                :label="$t('page.userCenter.userInfo.communityPreference')"
                :placeholder="$t('page.userCenter.userInfo.form.communityPreferencePlaceholder')"
                :options="communityOptions"
                class="mt-16px"
              />
              <NSelect
                v-model:value="modeId"
                clearable
                :label="$t('page.userCenter.userInfo.modePreference')"
                :placeholder="$t('page.userCenter.userInfo.form.modePreferencePlaceholder')"
                :options="modeOptions"
                class="mt-16px"
              />
              <NSpace :size="16" class="mt-16px">
                <NButton @click="handleCancel">{{ $t('common.cancel') }}</NButton>
                <NButton type="success" @click="handleGameConfigSubmit">{{ $t('common.confirm') }}</NButton>
              </NSpace>
            </NTabPane>
          </NTabs>
        </NCard>
      </NGi>
    </NGrid>
    <UserInfoOperateDrawer v-model:visible="drawerVisible" />
  </NSpace>
</template>

<style scoped></style>
