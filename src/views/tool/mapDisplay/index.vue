<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { useMessage } from 'naive-ui';
// 引入控制器
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
// 引入解压模型库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// 引入RGBLoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { fetchGetMapModes } from '@/service/api';
import Loading from './modules/loading.vue';

// 承载窗口Dom对象
const screenDom = ref<any | null>(null);

// 消息对象
const message = useMessage();

// 地图模型配置项
const mapModeOption = ref<CommonType.Option<string>[]>([]);

// 当前选取的模型地图
const mapMode = ref<string | null>(null);

// 是否在加载模型
const loading = ref<boolean>(false);

// 加载进度
const loadingProgress = ref<number>(0);

// 场景对象
let scene: any = null;

// 地图模型对象
let model: any = null;

// 相机对象
let camera: any = null;

// 渲染器
let renderer: any = null;

// 控制器
let controls: any = null;

// 加载器
let rgbLoader: any = null;
let gltfLoader: any = null;
let dracoLoader: any = null;

// 创建时钟对象
const clock = new THREE.Clock();

const init = async () => {
  const { data, error } = await fetchGetMapModes();
  if (error) {
    message.error(error.message);
    return;
  }
  mapModeOption.value = data;
};

const initThree = () => {
  // 初始化场景
  scene = new THREE.Scene();
  // 初始化相机
  camera = new THREE.PerspectiveCamera(75, screenDom.value.offsetWidth / screenDom.value.offsetHeight, 0.1, 1600);
  // 相机初始位置
  camera.position.set(0, 50, 0);
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true
  });

  renderer.setSize(screenDom.value.offsetWidth, screenDom.value.offsetHeight);
  screenDom.value!.appendChild(renderer.domElement);

  // 设置色调预设
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMappingExposure = 0.5;
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLuminance = true;

  // 创建第一人称控制器
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 20;
  controls.lookSpeed = 0.15;

  // 初始化loader
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('../../draco/');
  gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);
};

// 清空场景
const clearModel = () => {
  scene.remove(model);
  // 相机初始位置
  camera.position.set(200, 50, 10);
};

// 加载模型
const loadModel = () => {
  // 未选择地图模型
  if (!mapMode.value) {
    message.warning('请选择地图模型!');
    return;
  }
  // 模型加载中
  if (loading.value) {
    message.warning('模型加载中,请稍后!');
    return;
  }

  // 清空模型
  if (model) clearModel();

  loading.value = true;

  // 加载环境纹理
  rgbLoader = new RGBELoader();
  rgbLoader.load('../../texture/sky.hdr', (texture: any) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  // 加载模型
  gltfLoader.load(
    mapMode.value,
    (gltf: any) => {
      model = gltf.scene;
      scene.add(model);
    },
    (xhr: any) => {
      loadingProgress.value = Math.floor((xhr.loaded / xhr.total) * 100);
      if (loadingProgress.value >= 100) {
        screenDom.value.requestFullscreen();
        loading.value = false;
      }
    }
  );
  // 动画循环
  function animate() {
    // 渲染动画
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update(clock.getDelta());

    // 渲染场景
    renderer.render(scene, camera);
  }

  // 开始动画循环
  animate();
};

window.onresize = () => {
  if (renderer && camera) {
    renderer.setSize(screenDom.value.offsetWidth, screenDom.value.offsetHeight);
    camera.aspect = screenDom.value.offsetWidth / screenDom.value.offsetHeight;
    camera.updateProjectionMatrix();
  }
};

onMounted(() => {
  init();
  initThree();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NCard size="small" class="mb-15px" content-class="flex">
      <NSelect
        v-model:value="mapMode"
        class="width-50px mr-5px mt-10px max-w-200px"
        :options="mapModeOption"
        :placeholder="$t('page.tool.mapDisplay.mapName')"
        clearable
      />
      <NButton class="mr-5px mt-10px" strong secondary type="info" @click="loadModel()">加载模型</NButton>
    </NCard>
    <NCard size="small" class="map-card mb-15px">
      <div v-show="!loading" ref="screenDom" class="canvas-container"></div>
      <Loading v-if="loading" :loaded="loadingProgress"></Loading>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.map-card {
  height: 75vh;
}

.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
