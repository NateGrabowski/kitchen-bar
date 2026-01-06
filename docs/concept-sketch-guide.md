# Concept Sketch Creation Guide

## Overview

This guide documents how to create consistent concept sketches for the kitchen bar design exploration. All concepts should derive from the **baseline template** to ensure visual consistency.

## The Golden Rule

**ALWAYS copy `concept-baseline.jsx` and make targeted edits.** Never create concepts from scratch.

The baseline is a copy of `concept-chevron-speakeasy.jsx` (Round 1 quality) that establishes:
- CSS class structure
- SVG dimensions and scale
- Color scheme
- Layout pattern
- Dimension annotation style

## File Structure

```
visualization/jsx/
├── concept-baseline.jsx          # TEMPLATE - copy this for new concepts
├── concept-chevron-speakeasy.jsx # Round 1 (original baseline source)
├── concept-live-edge-waterfall.jsx
├── concept-floating-cantilever.jsx
├── concept-kitchen-floor-cabinets.jsx
├── concept-open-shelving.jsx
├── concept-angled-bar.jsx
└── concept-sliding-bar.jsx
```

## Baseline Template Structure

### 1. Imports and Hook
```jsx
import React, { useId, useState } from 'react';

export default function ConceptName() {
  const uniqueId = useId();  // CRITICAL: prevents SVG pattern ID collisions
  const [someState, setSomeState] = useState(initialValue);
```

### 2. Config Object (Do Not Change)
```jsx
const config = {
  stepHeight: 23.5,      // Fixed - actual floor height
  barTopHeight: 40,      // From kitchen floor
  barDepth: 28,          // Total front-to-back
  cabinetDepth: 12,      // Storage section
  barLength: 84,         // 7 feet
  barTopThickness: 1.5,  // Butcher block
};

const kneeSpace = config.barDepth - config.cabinetDepth; // 16"
```

### 3. CSS Classes (Copy Exactly)
```css
.concept-panel { background: #111d2e; border: 1px solid #243447; ... }
.concept-title { color: #60a5fa; font-size: 13px; text-transform: uppercase; ... }
.concept-tag { background: #1e3a5f; color: #4ade80; ... }
.concept-tag.bold { background: #7c3aed20; color: #a78bfa; }
.feature-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); ... }
.feature-item { background: #0d1520; border-left: 3px solid #fbbf24; ... }
.toggle-btn { background: linear-gradient(135deg, #7c3aed, #a855f7); ... }
```

### 4. SVG Viewboxes
| View | viewBox | Scale | Purpose |
|------|---------|-------|---------|
| Side Section | `0 0 420 360` | 2.6 | Primary design view |
| Plan View | `0 0 420 180` | 1.8 | Bird's eye layout |

### 5. SVG Pattern IDs (CRITICAL)
Always prefix pattern/gradient IDs with `uniqueId`:
```jsx
<pattern id={`${uniqueId}-grid`} ...>
<linearGradient id={`${uniqueId}-wood`} ...>
```

**Why:** Without unique IDs, multiple concepts loaded in the same session will have pattern conflicts, causing visual glitches.

### 6. Color Scheme
| Element | Color | Hex |
|---------|-------|-----|
| Background | Dark navy | `#0a1628` |
| Panel | Darker navy | `#111d2e` |
| Panel border | Slate | `#243447` |
| Primary accent | Blue | `#60a5fa` |
| Success/Pro | Green | `#4ade80` |
| Warning/Con | Orange | `#fb923c` |
| Special | Purple | `#a78bfa` |
| Wood/Butcher block | Amber | `#b45309` |
| Wood grain | Dark amber | `#92400e` |

### 7. Dimension Annotations
| Measurement | Color | Example |
|-------------|-------|---------|
| Step height (23.5") | Orange | `#fb923c` |
| Bar height (40") | Green | `#4ade80` |
| Depth (28") | Purple | `#a78bfa` |
| Special dims | Cyan | `#0891b2` |

### 8. Layout Order
1. Header (title, subtitle, tags)
2. Interactive Controls panel
3. Side Section View (SVG 420×360)
4. Plan View (SVG 420×180)
5. Key Features (4-column grid)
6. Pros/Cons (2-column grid)
7. Concept-specific details panel
8. Concept Summary (gold border)

## Creating a New Concept

### Step 1: Copy Baseline
```bash
cp visualization/jsx/concept-baseline.jsx visualization/jsx/concept-new-idea.jsx
```

### Step 2: Update Function Name
```jsx
// Change from:
export default function ConceptChevronSpeakeasy() {
// To:
export default function ConceptNewIdea() {
```

### Step 3: Update Header Content
- Title
- Subtitle description
- Tags (keep same styling)

### Step 4: Update State Variables
Change state to match your concept's interactive features:
```jsx
const [showFeature, setShowFeature] = useState(false);
const [optionSelected, setOptionSelected] = useState('default');
```

### Step 5: Modify SVG Content
Keep the structure, change only what's needed for your concept:
- Room labels (keep)
- Ground/floor positioning (keep)
- Bar top shape/pattern (modify)
- Cabinet visualization (modify)
- Person on stool (keep)
- Dimension annotations (keep unless adding new ones)

### Step 6: Update Text Content
- Key Features descriptions
- Pros/Cons lists
- Concept-specific options panel
- Summary paragraph

### Step 7: Register in App.jsx
```jsx
const visualizations = {
  // ...existing...
  'concept-new-idea': lazy(() => import('../visualization/jsx/concept-new-idea.jsx')),
}
```

## Common Mistakes to Avoid

### ❌ Creating from Scratch
**Problem:** Inconsistent styling, different dimensions, colors don't match.
**Solution:** Always start from baseline.

### ❌ Forgetting `useId()` for SVG Patterns
**Problem:** Pattern ID collisions cause visual glitches when switching concepts.
**Solution:** Use `const uniqueId = useId()` and prefix all pattern/gradient IDs.

### ❌ Changing the Config Object
**Problem:** Dimensions become inconsistent with project constraints.
**Solution:** Config values are fixed project requirements. Don't modify them.

### ❌ Different SVG Dimensions
**Problem:** Concepts look different sizes, don't align.
**Solution:** Always use viewBox `420 360` for side, `420 180` for plan.

### ❌ Hardcoded Colors
**Problem:** One concept looks different from others.
**Solution:** Use the established color palette.

### ❌ Different Layout Order
**Problem:** Concepts feel disjointed when comparing.
**Solution:** Follow the 8-section layout order.

## Testing Checklist

Before considering a concept complete:

- [ ] Function name matches filename
- [ ] `useId()` hook is used
- [ ] All pattern/gradient IDs use `${uniqueId}-` prefix
- [ ] Config object unchanged
- [ ] Side Section SVG is 420×360
- [ ] Plan View SVG is 420×180
- [ ] Colors match palette
- [ ] Dimension annotations use correct colors
- [ ] Registered in App.jsx
- [ ] Interactive controls work
- [ ] Looks consistent when switching between concepts

## Screenshots

Use Playwright skill to capture consistent screenshots:

```javascript
const concepts = [
  { key: 'concept-name', filename: 'concept-XX-name.png' },
];

// Set viewport
await page.setViewportSize({ width: 1920, height: 1200 });

// Select concept
await page.selectOption('select', { value: concept.key });
await page.waitForTimeout(2000);

// Interact if needed (toggle buttons, etc.)

// Capture
await page.screenshot({ path: outputPath, fullPage: true });
```

Screenshots go to: `docs/images/concept-screenshots/`
