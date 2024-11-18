<script setup lang="ts">
import { $t } from '@/locales';
import { useEcharts } from '@/hooks/common/echarts';
import { fetchGetPieChart } from '@/service/api';

defineOptions({
  name: 'PieChart'
});

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0
    }
  },
  series: [
    {
      color: ['#37A2FF', '#80FFA5', '#FF0087', '#FFBF00', '#00DDFF'],
      name: $t('page.home.pieChart'),
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12'
        }
      },
      labelLine: {
        show: false
      },
      data: [] as { name: string; value: number }[]
    }
  ]
}));

async function mockData() {
  const { data } = await fetchGetPieChart();

  updateOptions(opts => {
    opts.series[0].data = data ?? [];
    return opts;
  });
}

async function init() {
  mockData();
}

// init
init();
</script>

<template>
  <NCard :bordered="false" class="card-wrapper">
    <div ref="domRef" class="h-360px overflow-hidden"></div>
  </NCard>
</template>

<style scoped></style>
