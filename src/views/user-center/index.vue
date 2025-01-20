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

type InfoModel = Pick<Api.Auth.UserInfo, 'userName' | 'avatar' | 'userPhone' | 'userEmail' | 'userGender'>;

type PasswordModel = Pick<Api.SystemManage.UserPasswordVo, 'oldPassword' | 'newPassword' | 'confirmPassword'>;

const infoModel: InfoModel = reactive(createDefaultInfoModel());

const passwordModel: PasswordModel = reactive(createDefaultPasswordModel());

// 社区配置项
const communityOptions = ref<CommonType.Option<string>[]>([]);

// 模式配置项
const modeOptions = ref<CommonType.Option<string>[]>([]);

// 社区偏好
const communityIds = ref<Array<string> | null>(null);

// 模式偏好
const modeIds = ref<Array<string> | null>(null);

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
    avatar: '',
    userPhone: '',
    userEmail: '',
    userGender: ''
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

const passwordRules = computed<Record<keyof PasswordModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    oldPassword: formRules.pwd,
    newPassword: formRules.pwd,
    confirmPassword: formRules.pwd
  };
});

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
  if (communityIds.value) {
    localStorage.setItem('communityIds', communityIds.value.join(','));
  } else {
    localStorage.removeItem('communityIds');
  }
  if (modeIds.value) {
    localStorage.setItem('modeIds', modeIds.value.join(','));
  } else {
    localStorage.removeItem('modeIds');
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
  const communitys = localStorage.getItem('communityIds');
  const modes = localStorage.getItem('modeIds');

  communityIds.value = communitys ? communitys.split(',') : null;
  modeIds.value = modes ? modes.split(',') : null;

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
                <NFormItem :label="$t('page.userCenter.userInfo.userAvatar')" path="userAvatar">
                  <ImgUpload
                    v-model:model-value="infoModel.avatar"
                    :limit="1"
                    :file-type="['image/png', 'image/jpeg']"
                    :file-size="50"
                  ></ImgUpload>
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
                v-model:value="communityIds"
                clearable
                :label="$t('page.userCenter.userInfo.communityPreference')"
                :placeholder="$t('page.userCenter.userInfo.form.communityPreferencePlaceholder')"
                :options="communityOptions"
                multiple
                class="mt-16px"
              />
              <NSelect
                v-model:value="modeIds"
                clearable
                :label="$t('page.userCenter.userInfo.modePreference')"
                :placeholder="$t('page.userCenter.userInfo.form.modePreferencePlaceholder')"
                :options="modeOptions"
                multiple
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
