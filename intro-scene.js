// Knot Another Life - Three.js Intro Scene
window.addEventListener("load", () => {
  const container = document.getElementById("introCanvas");
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060606);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x00fff0, 0.5);
  scene.add(ambient);

  const spot = new THREE.SpotLight(0x00fff0, 1.5);
  spot.position.set(5, 5, 8);
  scene.add(spot);

  const upper = new THREE.ConeGeometry(1.2, 2.5, 64, 1, true);
  const lower = new THREE.ConeGeometry(1.2, 2.5, 64, 1, true);
  lower.rotateX(Math.PI);
  lower.position.y = -2.5;

  const neonMat = new THREE.MeshStandardMaterial({
    color: 0x00fff0,
    emissive: 0x00fff0,
    emissiveIntensity: 1,
    metalness: 0.6,
    roughness: 0.2,
    transparent: true,
    opacity: 0.35
  });

  const upperMesh = new THREE.Mesh(upper, neonMat);
  const lowerMesh = new THREE.Mesh(lower, neonMat);

  const group = new THREE.Group();
  group.add(upperMesh);
  group.add(lowerMesh);
  scene.add(group);

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
