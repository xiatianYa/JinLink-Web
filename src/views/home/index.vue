<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
import HeaderBanner from './modules/header-banner.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import CreativityBanner from './modules/creativity-banner.vue';

const appStore = useAppStore();

const payImg1 = 'https://www.bluearchive.top/statics/system/pay1.png';
const payImg2 = 'https://www.bluearchive.top/statics/system/pay2.png';

const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard :bordered="false" class="card-wrapper">
          <LineChart />
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:10">
        <NCard :bordered="false" class="card-wrapper">
          <PieChart />
        </NCard>
      </NGi>
    </NGrid>
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <ProjectNews />
      </NGi>
      <NGi span="24 s:24 m:10">
        <CreativityBanner />
      </NGi>
    </NGrid>
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard class="sponsor mb-10">
          <NSpace class="mb-5px">
            <NText class="text-16px font-semibold">{{ $t('page.home.sponsor.title') }}</NText>
          </NSpace>
          <NSpace>
            <!--
 <NImage class="h-250px" :src="payImg1" />
            <NImage class="h-250px" :src="payImg2" /> 
-->
          </NSpace>
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:10">
        <NCard class="sponsor mb-10">
          <NSpace class="mb-5px">
            <NText class="text-16px font-semibold">{{ $t('page.home.sponsor.sponsorRecord') }}</NText>
          </NSpace>
          <NInfiniteScroll class="h-300px">
            <NTable :bordered="true" :single-line="false">
              <thead>
                <tr>
                  <th>{{ $t('page.home.sponsor.name') }}</th>
                  <th>{{ $t('page.home.sponsor.amount') }}</th>
                  <th>{{ $t('page.home.sponsor.time') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>818qwq</td>
                  <td>50元</td>
                  <td>2025-05-08</td>
                </tr>
                <tr>
                  <td>大🐟多</td>
                  <td>300元</td>
                  <td>2025-05-07</td>
                </tr>
                <tr>
                  <td>贝拉</td>
                  <td>200元</td>
                  <td>2025-05-06</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2025-05-06</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2025-04-28</td>
                </tr>
                <tr>
                  <td>匿名老板</td>
                  <td>5元</td>
                  <td>2025-04-28</td>
                </tr>
                <tr>
                  <td>尾生</td>
                  <td>50元</td>
                  <td>2025-04-22</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2025-04-17</td>
                </tr>
                <tr>
                  <td>匿名老板</td>
                  <td>5元</td>
                  <td>2025-04-17</td>
                </tr>
                <tr>
                  <td>雨过天晴</td>
                  <td>10元</td>
                  <td>2025-04-14</td>
                </tr>
                <tr>
                  <td>用户哥</td>
                  <td>10元</td>
                  <td>2025-04-14</td>
                </tr>
                <tr>
                  <td>Neverland</td>
                  <td>11元</td>
                  <td>2025-04-11</td>
                </tr>
                <tr>
                  <td>流星云云</td>
                  <td>2.51元</td>
                  <td>2025-04-08</td>
                </tr>
                <tr>
                  <td>Cyrex</td>
                  <td>50元</td>
                  <td>2025-04-07</td>
                </tr>
                <tr>
                  <td>poimare</td>
                  <td>50元</td>
                  <td>2025-04-06</td>
                </tr>
                <tr>
                  <td>霓光</td>
                  <td>5元</td>
                  <td>2025-04-05</td>
                </tr>
                <tr>
                  <td>timeless</td>
                  <td>25元</td>
                  <td>2025-04-01</td>
                </tr>
                <tr>
                  <td>匿名老板</td>
                  <td>10元</td>
                  <td>2025-04-01</td>
                </tr>
                <tr>
                  <td>**波</td>
                  <td>10元</td>
                  <td>2025-03-27</td>
                </tr>
                <tr>
                  <td>**翔</td>
                  <td>9元</td>
                  <td>2025-03-27</td>
                </tr>
                <tr>
                  <td>**雨</td>
                  <td>5元</td>
                  <td>2025-03-26</td>
                </tr>
                <tr>
                  <td>**杰</td>
                  <td>10元</td>
                  <td>2025-03-26</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2025-03-26</td>
                </tr>
                <tr>
                  <td>**宏</td>
                  <td>10元</td>
                  <td>2025-03-12</td>
                </tr>
                <tr>
                  <td>连湘庄主</td>
                  <td>3元</td>
                  <td>2025-03-02</td>
                </tr>
                <tr>
                  <td>t117y</td>
                  <td>10元</td>
                  <td>2025-02-26</td>
                </tr>
                <tr>
                  <td>未知大佬</td>
                  <td>5元</td>
                  <td>2025-02-12</td>
                </tr>
                <tr>
                  <td>小坑</td>
                  <td>5元</td>
                  <td>2025-02-11</td>
                </tr>
                <tr>
                  <td>啦啦啦y^O^y</td>
                  <td>5元</td>
                  <td>2025-02-06</td>
                </tr>
                <tr>
                  <td>YorangSama</td>
                  <td>50元</td>
                  <td>2025-02-06</td>
                </tr>
                <tr>
                  <td>NuMash</td>
                  <td>3元</td>
                  <td>2025-02-06</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2025-02-05</td>
                </tr>
                <tr>
                  <td>TG 117</td>
                  <td>10元</td>
                  <td>2024-01-27</td>
                </tr>
                <tr>
                  <td>Yoim1ya</td>
                  <td>5元</td>
                  <td>2024-01-21</td>
                </tr>
                <tr>
                  <td>YorangSama</td>
                  <td>30元</td>
                  <td>2024-01-19</td>
                </tr>
                <tr>
                  <td>时绘</td>
                  <td>50元</td>
                  <td>2024-01-14</td>
                </tr>
                <tr>
                  <td>匿名大佬</td>
                  <td>50元</td>
                  <td>2024-01-12</td>
                </tr>
                <tr>
                  <td>U.N.OWEN</td>
                  <td>25元</td>
                  <td>2024-01-08</td>
                </tr>
                <tr>
                  <td>kTz.</td>
                  <td>10元</td>
                  <td>2024-01-05</td>
                </tr>
                <tr>
                  <td>非酋</td>
                  <td>5元</td>
                  <td>2024-12-08</td>
                </tr>
                <tr>
                  <td>HK</td>
                  <td>10元</td>
                  <td>2024-12-07</td>
                </tr>
                <tr>
                  <td>深海潜水</td>
                  <td>2.33元</td>
                  <td>2024-12-06</td>
                </tr>
                <tr>
                  <td>橙大猫</td>
                  <td>66元</td>
                  <td>2024-12-02</td>
                </tr>
                <tr>
                  <td>Error</td>
                  <td>3元</td>
                  <td>2024-11-30</td>
                </tr>
                <tr>
                  <td>冰雪羊</td>
                  <td>10元</td>
                  <td>2024-11-29</td>
                </tr>
                <tr>
                  <td>星空·夜想曲</td>
                  <td>6.66元</td>
                  <td>2024-11-24</td>
                </tr>
                <tr>
                  <td>安年</td>
                  <td>3元</td>
                  <td>2024-11-24</td>
                </tr>
                <tr>
                  <td>满山猴子我腚最红</td>
                  <td>3元</td>
                  <td>2024-11-23</td>
                </tr>
                <tr>
                  <td>幻觉表</td>
                  <td>5元</td>
                  <td>2024-11-23</td>
                </tr>
                <tr>
                  <td>Yayoiiii</td>
                  <td>5元</td>
                  <td>2024-11-20</td>
                </tr>
                <tr>
                  <td>水无愁</td>
                  <td>50元</td>
                  <td>2024-11-09</td>
                </tr>
                <tr>
                  <td>manten</td>
                  <td>5元</td>
                  <td>2024-10-23</td>
                </tr>
                <tr>
                  <td>啊菜</td>
                  <td>23.3元</td>
                  <td>2024-10-13</td>
                </tr>
                <tr>
                  <td>鲤鱼吃鲨鱼</td>
                  <td>2.3.3元</td>
                  <td>2024-10-05</td>
                </tr>
                <tr>
                  <td>矫情少</td>
                  <td>2.33元</td>
                  <td>2024-10-04</td>
                </tr>
                <tr>
                  <td>Michael</td>
                  <td>10元</td>
                  <td>2024-10-03</td>
                </tr>
                <tr>
                  <td>不关杰杰的事</td>
                  <td>60元</td>
                  <td>2024-10-03</td>
                </tr>
                <tr>
                  <td>Noxx_</td>
                  <td>10元</td>
                  <td>2024-10-02</td>
                </tr>
                <tr>
                  <td>气轩辕</td>
                  <td>8.88元</td>
                  <td>2024-10-01</td>
                </tr>
                <tr>
                  <td>Rainsfield☨</td>
                  <td>50元</td>
                  <td>2024-10-01</td>
                </tr>
                <tr>
                  <td>红豆</td>
                  <td>5元</td>
                  <td>2024-09-28</td>
                </tr>
                <tr>
                  <td>kk</td>
                  <td>10元</td>
                  <td>2024-09-25</td>
                </tr>
                <tr>
                  <td>阿飞</td>
                  <td>5元</td>
                  <td>2024-09-24</td>
                </tr>
                <tr>
                  <td>Cmz</td>
                  <td>5元</td>
                  <td>2024-09-23</td>
                </tr>
                <tr>
                  <td>无邬</td>
                  <td>3元</td>
                  <td>2024-09-14</td>
                </tr>
              </tbody>
            </NTable>
          </NInfiniteScroll>
          <NSpace class="mt-5">{{ $t('page.home.sponsor.desc') }}</NSpace>
        </NCard>
      </NGi>
    </NGrid>
  </NSpace>
</template>

<style scoped></style>
