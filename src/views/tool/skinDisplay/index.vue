<script setup lang="ts">
import * as THREE from 'three';
import { NTabPane, NTabs, useMessage } from 'naive-ui';
import { ref } from 'vue';
// 引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入解压模型库
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { fetchGetModelListByType } from '@/service/api';
// 引入RGBLoader
import Loading from './modules/loading.vue';
import SkinCard from './modules/skin-card.vue';

// 模型列表
const modelList = ref<Api.Game.ModelVo[] | null>();

// 承载窗口Dom对象
const screenDom = ref<any | null>(null);

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

// dae加载对象
let rgbLoader: any = null;
let colladaLoader: any = null;

// elf对象
let elf: any = null;

// 消息对象
const message = useMessage();

// 创建时钟对象
const clock = new THREE.Clock();

// 切换目录
const handleUpdateValue = async (name: string) => {
  if (name === '武器模型') {
    const { data } = await fetchGetModelListByType('0');
    modelList.value = data;
  } else {
    const { data } = await fetchGetModelListByType('1');
    modelList.value = data;
  }
};

// 清空场景
const clearModel = () => {
  scene.remove(model);
  // 相机初始位置
  camera.position.set(0, 0.1, -0.5);
};

const initThree = () => {
  // 初始化场景
  scene = new THREE.Scene();
  // 初始化相机
  camera = new THREE.PerspectiveCamera(75, screenDom.value.offsetWidth / screenDom.value.offsetHeight, 0.1, 1600);
  // 相机初始位置
  camera.position.set(0, 0.25, -0.5);
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
  controls = new OrbitControls(camera, renderer.domElement);
  controls.movementSpeed = 20;
  controls.lookSpeed = 0.15;

  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 10);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  scene.add(light9);
};

// 加载模型
function loadModel(modeModel: Api.Game.ModelVo) {
  if (!renderer || !camera) initThree();
  // 未选择地图模型
  if (!modeModel) {
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

  // 创建平面几何体和白色材质
  const geometry = new THREE.CircleGeometry(3, 128);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

  // 将几何体和材质组合成网格
  const plane = new THREE.Mesh(geometry, material);

  plane.rotation.x = -Math.PI / 2;

  // 将网格添加到场景中
  scene.add(plane);

  // 创建RGB加载器
  rgbLoader = new RGBELoader();
  rgbLoader.load('../../texture/sky.hdr', (texture: any) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  });

  // loading manager
  const loadingManager = new THREE.LoadingManager(() => {
    scene.add(elf);
  });
  // 加载模型
  colladaLoader = new ColladaLoader(loadingManager);
  colladaLoader.load(
    modeModel.modelModeUrl,
    (collada: any) => {
      elf = collada.scene;
      model = elf;
    },
    (xhr: any) => {
      loadingProgress.value = Math.floor((xhr.loaded / xhr.total) * 100);
      if (loadingProgress.value >= 100) {
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

    camera.rotateY(0.1);

    // 渲染场景
    renderer.render(scene, camera);
  }

  // 开始动画循环
  animate();
}

window.onresize = () => {
  if (renderer && camera) {
    renderer.setSize(screenDom.value.offsetWidth, screenDom.value.offsetHeight);
    camera.aspect = screenDom.value.offsetWidth / screenDom.value.offsetHeight;
    camera.updateProjectionMatrix();
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px lt-sm:overflow-auto">
    <NCard>
      <NTabs
        type="segment"
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        @update:value="handleUpdateValue"
      >
        <NTabPane name="武器模型" tab="武器模型">
          <div class="min-h-500px flex gap-8px lt-sm:overflow-auto">
            <NCard>
              <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen">
                <NGridItem v-for="(model, index) in modelList" :key="index">
                  <SkinCard :game-model-vo="model" @load-model="loadModel" />
                </NGridItem>
              </NGrid>
            </NCard>
            <NCard>
              <div v-show="!loading" ref="screenDom" class="canvas-container"></div>
              <Loading v-if="loading" :loaded="loadingProgress"></Loading>
            </NCard>
          </div>
        </NTabPane>
        <NTabPane name="人物模型" tab="人物模型">
          <div class="min-h-500px flex gap-8px lt-sm:overflow-auto">
            <NCard>
              <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen">
                <NGridItem v-for="(model, index) in modelList" :key="index">
                  <SkinCard :game-model-vo="model" @load-model="loadModel" />
                </NGridItem>
              </NGrid>
            </NCard>
            <NCard>
              <div v-show="!loading" ref="screenDom" class="canvas-container"></div>
              <Loading v-if="loading" :loaded="loadingProgress"></Loading>
            </NCard>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
