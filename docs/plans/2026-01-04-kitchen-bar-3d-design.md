# Kitchen Bar 3D Visualization - Design Document

**Date:** 2026-01-04
**Status:** Approved for implementation

## Overview

Create a Three.js 3D visualization of the kitchen bar design to complement the existing 2D SVG planner. The 3D tool enables design exploration, contractor communication, and spatial validation.

## Goals

1. **Design exploration** - Interactive 3D view to experiment with bar configurations
2. **Contractor communication** - Realistic enough to show exactly what should be built
3. **Spatial validation** - Verify proportions, sightlines, and ergonomics

## Scope

### In Scope (v1)
- Semi-realistic rendering (wood textures, room context)
- Room elements: bar, step, floors, column, walls, ceiling indicator
- Standalone HTML file (no build step)
- OrbitControls for free camera movement
- Camera presets (5 views)
- Flush/Tiered preset toggle
- Dark theme matching existing 2D tool

### Out of Scope (v2+)
- Live dimension sliders
- Additional design options (waterfall edge, wine storage, etc.)
- React integration
- Export/screenshot functionality

## Technical Architecture

### File Structure
```
visualization/threejs/
  kitchen-bar-3d-v2.html    # Self-contained HTML + JS
```

### Dependencies (CDN)
- Three.js r158+ (ES modules via importmap)
- OrbitControls addon
- No npm packages or build step

### Coordinate System
- Y-up (Three.js default)
- 1 unit = 1 inch
- Origin at living room floor where step meets bar
- Kitchen floor at Y = 23.5
- Bar extends along X-axis (length), Z-axis (depth)

## Geometry Specification

### Bar Assembly

| Part | Dimensions | Material |
|------|------------|----------|
| Cabinet box | 12"D × 84"L × 59.5"H | #2d4a6a, slight metalness |
| Butcher block (flush) | 28"D × 84"L × 1.5"H | Wood texture, #92400e base |
| Tiered raised section | 12"D × 84"L × 1.5"H | Same wood, +6" Y offset |
| Tiered vertical piece | 1.5"D × 84"L × 6"H | Same wood |
| Support post | 3"D × 3"L × ~36"H | #2d4a6a |

### Room Context

| Element | Dimensions | Material |
|---------|------------|----------|
| Living room floor | 120" × 80" | Hardwood texture (warm oak) |
| Kitchen floor | 120" × 60" at Y=23.5 | Tile texture or solid #d4a574 |
| Step face | 84"L × 23.5"H × 2"D | White #f5f5f5 |
| Back wall | 200"W × 96"H | Beige #d4c4a8 matte |
| Side walls | 80"D × 96"H (partial) | Same beige |
| White column | 6" × 6" × 96"H | White matte #ffffff |
| Ceiling indicator | 200" × 80" at Y=96 | Wireframe only |

## Lighting Setup

| Light | Type | Color | Position | Purpose |
|-------|------|-------|----------|---------|
| Ambient | AmbientLight | #404040 | - | Base illumination |
| Key | DirectionalLight | #ffffff | (50, 80, 30) | Main shadows |
| Fill | DirectionalLight | #8080a0 | (-30, 40, -20) | Reduce harsh shadows |

- Shadows enabled on key light only
- Shadow map: 2048 × 2048
- Targets bar center

## Camera Presets

| Name | Position (x,y,z) | Target | FOV |
|------|------------------|--------|-----|
| Living Room | (-60, 48, 80) | (42, 30, 0) | 45 |
| Kitchen | (100, 60, -30) | (42, 30, 0) | 45 |
| Bird's Eye | (42, 120, 42) | (42, 20, 0) | 50 |
| Seated POV | (60, 53.5, -10) | (0, 40, 40) | 60 |
| Contractor | (-80, 36, 0) | (42, 30, 0) | 40 |

### OrbitControls Settings
```javascript
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.minDistance = 30
controls.maxDistance = 200
controls.maxPolarAngle = Math.PI / 2  // Prevent going below floor
```

## UI Design

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  Kitchen Bar 3D Planner              [Flush] [Tiered]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    3D Canvas                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Living Room │ Kitchen │ Bird's Eye │ Seated │ Detail   │
├─────────────────────────────────────────────────────────┤
│ Bar: 40" from kitchen (63.5" from LR) │ Config: Flush  │
└─────────────────────────────────────────────────────────┘
```

### Styling (matching 2D tool)
- Background: #0a1628
- Panel background: #111d2e
- Border: #243447
- Accent: #3b82f6, #60a5fa
- Text: #e2e8f0, #94a3b8
- Active button: #3b82f6 background

### Interactions
- Preset buttons: Toggle geometry visibility, update info text
- Camera buttons: Animate camera to preset over 0.5s
- OrbitControls: Free rotation/zoom/pan

## Configuration Constants

```javascript
const CONFIG = {
  // Fixed
  stepHeight: 23.5,

  // Adjustable (hardcoded for v1, sliders in v2)
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
}
```

## Implementation Notes

### Texture Loading
- Use Three.js TextureLoader
- Fallback to solid colors if textures fail
- Wood texture: procedural or CDN-hosted

### Geometry Creation Pattern
```javascript
function createBar(config, isTiered) {
  const group = new THREE.Group()

  // Cabinet
  const cabinetGeo = new THREE.BoxGeometry(...)
  const cabinetMat = new THREE.MeshStandardMaterial({...})
  const cabinet = new THREE.Mesh(cabinetGeo, cabinetMat)
  group.add(cabinet)

  // Butcher block
  // ... similar pattern

  // Tiered section (conditional)
  if (isTiered) {
    // raised section geometry
  }

  return group
}
```

### Preset Switching
- Create both flush and tiered bar groups upfront
- Toggle `.visible` property (faster than recreating)
- Update info text on switch

### Camera Animation
```javascript
function animateCamera(targetPos, targetLookAt, duration = 500) {
  // Use TWEEN.js or manual lerp in animation loop
  // Smooth transition from current to target
}
```

## Testing Checklist

- [ ] Page loads without errors
- [ ] OrbitControls work (rotate, zoom, pan)
- [ ] Flush preset displays correctly
- [ ] Tiered preset displays correctly
- [ ] All 5 camera presets work
- [ ] Dimensions match 2D tool values
- [ ] Dark theme matches existing UI
- [ ] Works in Chrome, Firefox, Edge

## Future Enhancements (v2+)

1. **Dimension sliders** - Real-time adjustment like 2D tool
2. **More options** - Waterfall edge, cabinet styles, lighting toggle
3. **Person model** - Show seated figure for scale
4. **Measurement overlay** - 3D dimension lines
5. **React integration** - Plug into existing App.jsx
6. **Screenshot export** - Save current view as PNG
