# Kitchen Bar 3D Visualization - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a Three.js 3D visualization of the kitchen bar with camera presets and Flush/Tiered toggle.

**Architecture:** Single self-contained HTML file using Three.js via CDN importmap. No build step. Scene contains room context (floors, walls, column) and bar assembly. UI overlay for preset controls.

**Tech Stack:** Three.js r158+, OrbitControls, vanilla HTML/CSS/JS

---

## Task 1: HTML Skeleton with Three.js Imports

**Files:**
- Create: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Create basic HTML structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kitchen Bar 3D Planner</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a1628;
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
    }
    #canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>

  <script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.158.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.158.0/examples/jsm/"
    }
  }
  </script>

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    console.log('Three.js loaded:', THREE.REVISION);

    // Placeholder - will build out in subsequent tasks
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Test cube
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>
```

**Step 2: Verify in browser**

Run: Open `http://localhost:5173/visualization/threejs/kitchen-bar-3d-v2.html` or file directly
Expected: Rotating blue wireframe cube on dark background

**Step 3: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): scaffold HTML with Three.js imports"
```

---

## Task 2: Configuration Constants and OrbitControls

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add CONFIG object and OrbitControls**

Replace the script content with:

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  // Fixed architectural constraint
  stepHeight: 23.5,

  // Bar dimensions (inches)
  barTopHeight: 40,
  barDepth: 28,
  cabinetDepth: 12,
  barLength: 84,
  barTopThickness: 1.5,
  raisedBarHeight: 6,

  // Calculated
  get kneeSpace() { return this.barDepth - this.cabinetDepth },
  get barFromLR() { return this.barTopHeight + this.stepHeight },
  get cabinetHeight() { return this.barFromLR - 4 },
};

// ============================================
// SCENE SETUP
// ============================================
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(-60, 48, 80);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.target.set(42, 30, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 30;
controls.maxDistance = 200;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// Axes helper for development
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Grid helper for development
const gridHelper = new THREE.GridHelper(200, 20, 0x3b82f6, 0x1e3a5f);
scene.add(gridHelper);

// ============================================
// ANIMATION LOOP
// ============================================
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ============================================
// RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('Kitchen Bar 3D - Config:', CONFIG);
```

**Step 2: Verify in browser**

Expected: Grid floor, axes helper (red=X, green=Y, blue=Z), orbit controls work (drag to rotate, scroll to zoom)

**Step 3: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add CONFIG constants and OrbitControls"
```

---

## Task 3: Lighting Setup

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add lighting section after OrbitControls**

```javascript
// ============================================
// LIGHTING
// ============================================
// Ambient light - base illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

// Key light - main shadow-casting light
const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(50, 80, 30);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.camera.near = 10;
keyLight.shadow.camera.far = 200;
keyLight.shadow.camera.left = -100;
keyLight.shadow.camera.right = 100;
keyLight.shadow.camera.top = 100;
keyLight.shadow.camera.bottom = -100;
scene.add(keyLight);

// Fill light - reduce harsh shadows
const fillLight = new THREE.DirectionalLight(0x8080a0, 0.4);
fillLight.position.set(-30, 40, -20);
scene.add(fillLight);

// Optional: light helper for debugging
// const lightHelper = new THREE.DirectionalLightHelper(keyLight, 10);
// scene.add(lightHelper);
```

**Step 2: Add a test object to verify lighting**

```javascript
// Temporary test sphere to verify lighting
const testGeo = new THREE.SphereGeometry(15, 32, 32);
const testMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
const testSphere = new THREE.Mesh(testGeo, testMat);
testSphere.position.set(42, 30, 0);
testSphere.castShadow = true;
scene.add(testSphere);
```

**Step 3: Verify in browser**

Expected: Smooth-shaded blue sphere with shadows, lighting from top-right

**Step 4: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add ambient, key, and fill lighting"
```

---

## Task 4: Room Geometry - Floors and Step

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Remove test objects, add room creation function**

Remove the test sphere and grid/axes helpers. Add:

```javascript
// ============================================
// MATERIALS
// ============================================
const materials = {
  livingRoomFloor: new THREE.MeshStandardMaterial({
    color: 0x8b7355,  // warm oak
    roughness: 0.8,
    metalness: 0.0
  }),
  kitchenFloor: new THREE.MeshStandardMaterial({
    color: 0xd4c4a8,  // cream tile
    roughness: 0.6,
    metalness: 0.0
  }),
  stepFace: new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,  // white trim
    roughness: 0.5
  }),
  wall: new THREE.MeshStandardMaterial({
    color: 0xd4c4a8,  // beige
    roughness: 0.9,
    side: THREE.DoubleSide
  }),
  column: new THREE.MeshStandardMaterial({
    color: 0xffffff,  // white
    roughness: 0.5
  }),
};

// ============================================
// ROOM GEOMETRY
// ============================================
function createRoom() {
  const room = new THREE.Group();
  room.name = 'room';

  // Living room floor (origin level, Y=0)
  const lrFloorGeo = new THREE.BoxGeometry(120, 2, 80);
  const lrFloor = new THREE.Mesh(lrFloorGeo, materials.livingRoomFloor);
  lrFloor.position.set(60, -1, 40);
  lrFloor.receiveShadow = true;
  room.add(lrFloor);

  // Kitchen floor (elevated by stepHeight)
  const kitchenFloorGeo = new THREE.BoxGeometry(120, 2, 60);
  const kitchenFloor = new THREE.Mesh(kitchenFloorGeo, materials.kitchenFloor);
  kitchenFloor.position.set(60, CONFIG.stepHeight - 1, -30);
  kitchenFloor.receiveShadow = true;
  room.add(kitchenFloor);

  // Step face (vertical face between floors)
  const stepFaceGeo = new THREE.BoxGeometry(CONFIG.barLength, CONFIG.stepHeight, 2);
  const stepFace = new THREE.Mesh(stepFaceGeo, materials.stepFace);
  stepFace.position.set(CONFIG.barLength / 2, CONFIG.stepHeight / 2, 0);
  room.add(stepFace);

  // Back wall
  const backWallGeo = new THREE.PlaneGeometry(200, 96);
  const backWall = new THREE.Mesh(backWallGeo, materials.wall);
  backWall.position.set(100, 48, -60);
  backWall.receiveShadow = true;
  room.add(backWall);

  // Left wall (partial)
  const leftWallGeo = new THREE.PlaneGeometry(120, 96);
  const leftWall = new THREE.Mesh(leftWallGeo, materials.wall);
  leftWall.position.set(0, 48, 0);
  leftWall.rotation.y = Math.PI / 2;
  room.add(leftWall);

  // White column at bar end
  const columnGeo = new THREE.BoxGeometry(6, 96, 6);
  const column = new THREE.Mesh(columnGeo, materials.column);
  column.position.set(CONFIG.barLength + 3, 48, 0);
  column.castShadow = true;
  room.add(column);

  return room;
}

// Add room to scene
const room = createRoom();
scene.add(room);
```

**Step 2: Update camera target**

```javascript
controls.target.set(CONFIG.barLength / 2, 30, 0);
controls.update();
```

**Step 3: Verify in browser**

Expected: Two floor levels (living room lower, kitchen elevated), white step face, back/side walls, white column at right end

**Step 4: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add room geometry (floors, step, walls, column)"
```

---

## Task 5: Bar Assembly - Cabinet and Butcher Block (Flush)

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add bar materials**

Add to materials object:

```javascript
  cabinet: new THREE.MeshStandardMaterial({
    color: 0x2d4a6a,  // dark blue-gray
    roughness: 0.7,
    metalness: 0.1
  }),
  butcherBlock: new THREE.MeshStandardMaterial({
    color: 0x92400e,  // warm brown
    roughness: 0.4,
    metalness: 0.0
  }),
```

**Step 2: Add createBar function**

```javascript
// ============================================
// BAR GEOMETRY
// ============================================
function createBar(isTiered = false) {
  const bar = new THREE.Group();
  bar.name = isTiered ? 'bar-tiered' : 'bar-flush';

  const cabinetWidth = CONFIG.cabinetDepth;
  const cabinetHeight = CONFIG.cabinetHeight;
  const cabinetLength = CONFIG.barLength;

  // Cabinet box - extends from LR floor to underside of bar top
  const cabinetGeo = new THREE.BoxGeometry(cabinetLength, cabinetHeight, cabinetWidth);
  const cabinet = new THREE.Mesh(cabinetGeo, materials.cabinet);
  // Position: centered on X, bottom at Y=0 (LR floor), front edge at Z=0 (step line)
  cabinet.position.set(
    cabinetLength / 2,
    cabinetHeight / 2,
    -cabinetWidth / 2
  );
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  bar.add(cabinet);

  // Butcher block top
  const barTopWidth = CONFIG.barDepth;
  const barTopThick = CONFIG.barTopThickness;
  const barTopY = CONFIG.stepHeight + CONFIG.barTopHeight;

  if (isTiered) {
    // Counter level (kitchen side) - over the overhang area
    const counterGeo = new THREE.BoxGeometry(cabinetLength, barTopThick, CONFIG.kneeSpace);
    const counter = new THREE.Mesh(counterGeo, materials.butcherBlock);
    counter.position.set(
      cabinetLength / 2,
      barTopY - barTopThick / 2,
      -CONFIG.cabinetDepth - CONFIG.kneeSpace / 2
    );
    counter.castShadow = true;
    counter.receiveShadow = true;
    bar.add(counter);

    // Raised bar section (living room side)
    const raisedY = barTopY + CONFIG.raisedBarHeight;
    const raisedGeo = new THREE.BoxGeometry(cabinetLength, barTopThick, CONFIG.cabinetDepth);
    const raised = new THREE.Mesh(raisedGeo, materials.butcherBlock);
    raised.position.set(
      cabinetLength / 2,
      raisedY - barTopThick / 2,
      -CONFIG.cabinetDepth / 2
    );
    raised.castShadow = true;
    raised.receiveShadow = true;
    bar.add(raised);

    // Vertical transition piece between levels
    const vertGeo = new THREE.BoxGeometry(cabinetLength, CONFIG.raisedBarHeight, barTopThick);
    const vert = new THREE.Mesh(vertGeo, materials.butcherBlock);
    vert.position.set(
      cabinetLength / 2,
      barTopY + CONFIG.raisedBarHeight / 2 - barTopThick / 2,
      -CONFIG.cabinetDepth
    );
    vert.castShadow = true;
    bar.add(vert);

  } else {
    // Flush - single continuous bar top
    const barTopGeo = new THREE.BoxGeometry(cabinetLength, barTopThick, barTopWidth);
    const barTop = new THREE.Mesh(barTopGeo, materials.butcherBlock);
    barTop.position.set(
      cabinetLength / 2,
      barTopY - barTopThick / 2,
      -barTopWidth / 2
    );
    barTop.castShadow = true;
    barTop.receiveShadow = true;
    bar.add(barTop);
  }

  return bar;
}

// Create both versions, show flush by default
const barFlush = createBar(false);
const barTiered = createBar(true);
barTiered.visible = false;

scene.add(barFlush);
scene.add(barTiered);

// State
let currentPreset = 'flush';
```

**Step 3: Verify in browser**

Expected: Blue-gray cabinet box from LR floor up, orange/brown butcher block on top, positioned at the step

**Step 4: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add bar assembly (cabinet + butcher block, flush and tiered)"
```

---

## Task 6: UI Overlay - Header and Preset Buttons

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add CSS for UI overlay**

Add to `<style>`:

```css
#ui-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background: rgba(10, 22, 40, 0.9);
  border-bottom: 1px solid #243447;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
#ui-top h1 {
  font-size: 18px;
  font-weight: 500;
  color: #f1f5f9;
}
.preset-group {
  display: flex;
  gap: 8px;
}
.preset-btn {
  padding: 8px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}
.preset-btn:hover {
  border-color: #60a5fa;
  color: #e2e8f0;
}
.preset-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
```

**Step 2: Add HTML for top UI**

Add after `<body>` before `<canvas>`:

```html
<div id="ui-top">
  <h1>Kitchen Bar 3D Planner</h1>
  <div class="preset-group">
    <button class="preset-btn active" data-preset="flush">Flush</button>
    <button class="preset-btn" data-preset="tiered">Tiered</button>
  </div>
</div>
```

**Step 3: Add preset toggle logic in JavaScript**

```javascript
// ============================================
// UI: PRESET TOGGLE
// ============================================
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const preset = btn.dataset.preset;
    if (preset === currentPreset) return;

    // Update buttons
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Toggle geometry
    if (preset === 'flush') {
      barFlush.visible = true;
      barTiered.visible = false;
    } else {
      barFlush.visible = false;
      barTiered.visible = true;
    }

    currentPreset = preset;
    console.log('Preset changed to:', preset);
  });
});
```

**Step 4: Verify in browser**

Expected: Header bar with title and Flush/Tiered buttons. Clicking toggles between bar configurations.

**Step 5: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add UI header with Flush/Tiered preset toggle"
```

---

## Task 7: UI Overlay - Camera Presets

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add CSS for bottom camera bar**

Add to `<style>`:

```css
#ui-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background: rgba(10, 22, 40, 0.9);
  border-top: 1px solid #243447;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 100;
}
.camera-btn {
  padding: 8px 14px;
  font-size: 11px;
  background: #111d2e;
  border: 1px solid #243447;
  color: #64748b;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}
.camera-btn:hover {
  border-color: #3b82f6;
  color: #60a5fa;
}
.camera-btn.active {
  background: #1e3a5f;
  border-color: #3b82f6;
  color: #60a5fa;
}
```

**Step 2: Add HTML for camera buttons**

Add before closing `</body>`:

```html
<div id="ui-bottom">
  <button class="camera-btn" data-view="livingroom">Living Room</button>
  <button class="camera-btn" data-view="kitchen">Kitchen</button>
  <button class="camera-btn" data-view="birdseye">Bird's Eye</button>
  <button class="camera-btn" data-view="seated">Seated POV</button>
  <button class="camera-btn" data-view="contractor">Detail</button>
</div>
```

**Step 3: Add camera presets and animation**

```javascript
// ============================================
// CAMERA PRESETS
// ============================================
const CAMERA_PRESETS = {
  livingroom: { pos: [-60, 48, 80], target: [42, 30, 0], fov: 45 },
  kitchen: { pos: [100, 60, -30], target: [42, 30, 0], fov: 45 },
  birdseye: { pos: [42, 120, 42], target: [42, 20, 0], fov: 50 },
  seated: { pos: [60, 53.5, -10], target: [0, 40, 40], fov: 60 },
  contractor: { pos: [-80, 36, 0], target: [42, 30, 0], fov: 40 },
};

let currentView = null;
let cameraAnimating = false;

function animateCamera(targetPos, targetLookAt, targetFov, duration = 500) {
  if (cameraAnimating) return;
  cameraAnimating = true;

  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const startFov = camera.fov;
  const startTime = performance.now();

  function update() {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - t, 3);

    camera.position.lerpVectors(startPos, new THREE.Vector3(...targetPos), ease);
    controls.target.lerpVectors(startTarget, new THREE.Vector3(...targetLookAt), ease);
    camera.fov = startFov + (targetFov - startFov) * ease;
    camera.updateProjectionMatrix();
    controls.update();

    if (t < 1) {
      requestAnimationFrame(update);
    } else {
      cameraAnimating = false;
    }
  }
  update();
}

// ============================================
// UI: CAMERA BUTTONS
// ============================================
document.querySelectorAll('.camera-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    const preset = CAMERA_PRESETS[view];
    if (!preset) return;

    // Update button states
    document.querySelectorAll('.camera-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    animateCamera(preset.pos, preset.target, preset.fov);
    currentView = view;
  });
});
```

**Step 4: Verify in browser**

Expected: Bottom bar with 5 camera buttons. Clicking animates camera smoothly to preset position.

**Step 5: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add camera presets with smooth animation"
```

---

## Task 8: Info Panel

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Add CSS for info panel**

Add to `<style>`:

```css
#info {
  position: fixed;
  bottom: 60px;
  left: 20px;
  padding: 10px 14px;
  background: rgba(17, 29, 46, 0.9);
  border: 1px solid #243447;
  border-radius: 4px;
  font-size: 12px;
  color: #94a3b8;
  font-family: "SF Mono", Monaco, monospace;
  z-index: 100;
}
#info span {
  color: #60a5fa;
}
```

**Step 2: Add HTML for info panel**

Add before `<div id="ui-bottom">`:

```html
<div id="info">
  Bar: <span id="info-height">40"</span> from kitchen (<span id="info-lr-height">63.5"</span> from LR) |
  Config: <span id="info-preset">Flush</span>
</div>
```

**Step 3: Update info on preset change**

Modify the preset toggle event handler to update info:

```javascript
// In the preset button click handler, add:
document.getElementById('info-preset').textContent = preset.charAt(0).toUpperCase() + preset.slice(1);
if (preset === 'tiered') {
  document.getElementById('info-lr-height').textContent = (CONFIG.barFromLR + CONFIG.raisedBarHeight).toFixed(1) + '"';
} else {
  document.getElementById('info-lr-height').textContent = CONFIG.barFromLR.toFixed(1) + '"';
}
```

**Step 4: Verify in browser**

Expected: Info panel in bottom-left showing current dimensions and preset

**Step 5: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): add info panel with dimensions"
```

---

## Task 9: Polish and Cleanup

**Files:**
- Modify: `visualization/threejs/kitchen-bar-3d-v2.html`

**Step 1: Remove development helpers**

Remove or comment out:
- AxesHelper
- GridHelper
- Any console.log statements except essential ones

**Step 2: Add ceiling wireframe indicator**

```javascript
// Ceiling indicator (wireframe)
const ceilingGeo = new THREE.PlaneGeometry(150, 80);
const ceilingMat = new THREE.MeshBasicMaterial({
  color: 0x3b82f6,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
ceiling.position.set(75, 96, -20);
ceiling.rotation.x = Math.PI / 2;
room.add(ceiling);
```

**Step 3: Set default camera to Living Room preset on load**

```javascript
// Set initial camera position
const initialPreset = CAMERA_PRESETS.livingroom;
camera.position.set(...initialPreset.pos);
controls.target.set(...initialPreset.target);
camera.fov = initialPreset.fov;
camera.updateProjectionMatrix();
controls.update();
```

**Step 4: Verify in browser**

Expected: Clean view, no debug helpers, proper initial camera angle

**Step 5: Commit**

```bash
git add visualization/threejs/kitchen-bar-3d-v2.html
git commit -m "feat(3d): polish - remove debug helpers, add ceiling wireframe, set default view"
```

---

## Task 10: Final Testing and Documentation

**Step 1: Test checklist**

- [ ] Page loads without console errors
- [ ] OrbitControls work (drag rotate, scroll zoom, right-drag pan)
- [ ] Flush preset displays correctly
- [ ] Tiered preset displays correctly with raised section
- [ ] All 5 camera presets animate smoothly
- [ ] Info panel updates on preset change
- [ ] Resize handler works (resize window)
- [ ] Works in Chrome, Firefox, Edge

**Step 2: Take screenshots for documentation**

Use Playwright or manual screenshots:
- Default view (Living Room, Flush)
- Tiered preset
- Bird's Eye view
- Seated POV

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat(3d): complete v1 Three.js visualization

- Semi-realistic 3D bar with room context
- Flush and Tiered preset toggle
- 5 camera presets with smooth animation
- Dark theme matching 2D tool
- Info panel with live dimensions"
```

---

## Summary

| Task | Description | Est. Time |
|------|-------------|-----------|
| 1 | HTML skeleton with Three.js | 5 min |
| 2 | CONFIG and OrbitControls | 5 min |
| 3 | Lighting setup | 3 min |
| 4 | Room geometry | 5 min |
| 5 | Bar assembly | 5 min |
| 6 | UI header + preset toggle | 5 min |
| 7 | Camera presets | 5 min |
| 8 | Info panel | 3 min |
| 9 | Polish and cleanup | 3 min |
| 10 | Testing and docs | 5 min |

**Total: ~45 minutes**
