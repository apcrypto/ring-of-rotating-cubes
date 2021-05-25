let camera, scene, renderer, controls;

const objects = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
  camera.position.set(0, 3, 7);

  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  const geometry = new THREE.BoxBufferGeometry();
  const material = new THREE.MeshNormalMaterial();

  const count = 10;

  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(geometry, material);

    const t = (i / count) * 2 * Math.PI;

    mesh.position.x = Math.cos(t) * 2;
    mesh.position.z = Math.sin(t) * 2;
    scene.add(mesh);
    objects.push(mesh);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.rotateSpeed = 6.5;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
}

function animate() {
  requestAnimationFrame(animate);

  for (let object of objects) {
    object.rotation.z += 0.005;
    object.rotation.x += 0.005;
  }

  controls.update();

  renderer.render(scene, camera);
}
