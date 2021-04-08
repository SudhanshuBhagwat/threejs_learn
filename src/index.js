import "./index.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create constant render window size
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Create a new Scene to hold all of the objects
const scene = new THREE.Scene();

// Create a new Geometry and Material for a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a new Mesh with the created Geometry and Material
const cube = new THREE.Mesh(geometry, material);

// Add the Cube mesh to the Scene
scene.add(cube);

const canvas = document.querySelector("canvas.webgl");

// Create a new WEBGL Renderer to render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(windowSize.width, windowSize.height);

// Create a new Camera for the Scene
const camera = new THREE.PerspectiveCamera(
  75,
  windowSize.width / windowSize.height
);

window.addEventListener("resize", () => {
  console.log("resize");
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;

  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();

  renderer.setSize(windowSize.width, windowSize.height);
});

// Need to reposition the camera so that we are out of the cube
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

const tick = () => {
  const delayedTime = clock.getElapsedTime();

  controls.update();

  // Render the scene
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
