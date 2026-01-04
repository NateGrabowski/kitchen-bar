# Kitchen Bar Planner v4 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a unified kitchen bar visualization combining v3's multi-view architecture with hybrid's configuration presets and pros/cons guidance.

**Architecture:** Single React component with preset buttons that adjust state values + toggle features. Four SVG diagram views update reactively. Presets are shortcuts, not modes - all controls remain manually adjustable.

**Tech Stack:** React (useState, useId), inline SVG, CSS-in-JS via style tag

---

## Task 1: Create v4 Base File

**Files:**
- Create: `visualization/jsx/kitchen-bar-planner-v4.jsx`
- Modify: `src/App.jsx`

**Step 1: Copy v3 as starting point**

```bash
cp visualization/jsx/kitchen-bar-planner-v3.jsx visualization/jsx/kitchen-bar-planner-v4.jsx
```

**Step 2: Update component name in v4**

In `visualization/jsx/kitchen-bar-planner-v4.jsx`, change:
- Function name: `KitchenBarPlannerV3` → `KitchenBarPlannerV4`
- Title text: "Split-Level Kitchen Bar Planner" → "Kitchen Bar Planner v4"

**Step 3: Add v4 to App.jsx**

In `src/App.jsx`, add import:
```javascript
const visualizations = {
  'kitchen-bar-planner-v4': lazy(() => import('../visualization/jsx/kitchen-bar-planner-v4.jsx')),
  // ... existing entries
}
```

And update default:
```javascript
const [current, setCurrent] = useState('kitchen-bar-planner-v4')
```

**Step 4: Verify in browser**

Run: `npm run dev`
Expected: v4 loads by default, looks identical to v3

**Step 5: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx src/App.jsx
git commit -m "feat: create v4 base from v3"
```

---

## Task 2: Add Preset State

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add new state variables to config**

Add to the `useState` object:
```javascript
const [config, setConfig] = useState({
  // ... existing v3 values ...

  // NEW: Preset tracking
  activePreset: 'flush',

  // NEW: Tiered bar
  tieredBar: false,
  raisedBarHeight: 6,

  // NEW: LR ledge
  lrLedge: false,
  ledgeHeight: 42,
  ledgeDepth: 10,

  // NEW: LR shelves
  lrShelves: false,
  shelfHeight: 42,
});
```

**Step 2: Add preset definitions object**

Add after the `useState` block:
```javascript
const presets = {
  flush: {
    name: 'Flush',
    desc: 'Cabinets align with step edge',
    pros: ['Simplest build', 'Standard cabinets'],
    cons: ['No LR function', 'Counter height only'],
    values: { cabinetSetback: 0, tieredBar: false, lrLedge: false, lrShelves: false }
  },
  setback: {
    name: 'Setback',
    desc: 'Step edge stays visible',
    pros: ['Natural boundary', 'Easier step navigation'],
    cons: ['May collect debris', 'Counter height only'],
    values: { cabinetSetback: 4, tieredBar: false, lrLedge: false, lrShelves: false }
  },
  tiered: {
    name: 'Tiered',
    desc: 'Counter + raised bar section',
    pros: ['True bar height', 'Hides kitchen mess'],
    cons: ['More complex', 'Crumb gap'],
    values: { cabinetSetback: 0, tieredBar: true, raisedBarHeight: 6, lrLedge: false, lrShelves: false }
  },
  ledge: {
    name: 'Ledge',
    desc: 'Add LR drink shelf',
    pros: ['LR functionality', 'Standing-friendly'],
    cons: ['Needs secure mounting', 'Two separate elements'],
    values: { cabinetSetback: 0, tieredBar: false, lrLedge: true, ledgeHeight: 42, ledgeDepth: 10, lrShelves: false }
  },
  floating: {
    name: 'Floating',
    desc: 'Add LR display shelves',
    pros: ['Display storage', 'Modern look'],
    cons: ['Visible clutter', 'Dust accumulation'],
    values: { cabinetSetback: 0, tieredBar: false, lrLedge: false, lrShelves: true, shelfHeight: 42 }
  },
};
```

**Step 3: Add applyPreset function**

Add after presets object:
```javascript
const applyPreset = (presetId) => {
  const preset = presets[presetId];
  if (preset) {
    setConfig(prev => ({
      ...prev,
      activePreset: presetId,
      ...preset.values
    }));
  }
};
```

**Step 4: Verify no errors**

Check browser console for errors. Component should still render.

**Step 5: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): add preset state and definitions"
```

---

## Task 3: Add Preset Buttons UI

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add CSS for preset buttons**

Add to the `<style>` tag:
```css
.preset-row {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.preset-btn {
  padding: 6px 10px;
  font-size: 11px;
  background: #0d1520;
  border: 1px solid #243447;
  color: #94a3b8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}
.preset-btn:hover {
  border-color: #3b5a7a;
}
.preset-btn.active {
  background: #1e3a5f;
  border-color: #3b82f6;
  color: #60a5fa;
}
.preset-info {
  background: #0d1520;
  border-radius: 4px;
  padding: 8px 10px;
  margin-bottom: 12px;
  font-size: 11px;
}
.preset-info-desc {
  color: #e2e8f0;
  margin-bottom: 4px;
}
.preset-info-pros-cons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.preset-info-pros-cons span {
  color: #64748b;
}
.preset-info-pros-cons .pro { color: #4ade80; }
.preset-info-pros-cons .con { color: #fb923c; }
```

**Step 2: Add preset panel to left column**

Add as first panel in left column (before Dimensions panel):
```jsx
<div className="panel">
  <div className="panel-title">Configuration</div>
  <div className="preset-row">
    {Object.entries(presets).map(([id, preset]) => (
      <button
        key={id}
        className={`preset-btn ${config.activePreset === id ? 'active' : ''}`}
        onClick={() => applyPreset(id)}
      >
        {preset.name}
      </button>
    ))}
  </div>
  {config.activePreset && presets[config.activePreset] && (
    <div className="preset-info">
      <div className="preset-info-desc">
        {presets[config.activePreset].desc}
      </div>
      <div className="preset-info-pros-cons">
        {presets[config.activePreset].pros.map((pro, i) => (
          <span key={`pro-${i}`} className="pro">✓ {pro}</span>
        ))}
        {presets[config.activePreset].cons.map((con, i) => (
          <span key={`con-${i}`} className="con">⚠ {con}</span>
        ))}
      </div>
    </div>
  )}
</div>
```

**Step 3: Verify in browser**

Expected: Preset buttons appear, clicking changes active state, info updates

**Step 4: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): add preset buttons with inline pros/cons"
```

---

## Task 4: Add New Toggle Controls

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add tiered bar toggle and slider**

In Design Options panel, add after existing checkboxes:
```jsx
<div className="checkbox-item" onClick={() => update('tieredBar', !config.tieredBar)}>
  <input type="checkbox" checked={config.tieredBar} readOnly />
  <span>Tiered bar top</span>
</div>

{config.tieredBar && (
  <div className="slider-group" style={{ marginLeft: 24, marginTop: 8 }}>
    <div className="slider-label">
      <span>Raised Bar Height</span>
      <span className="slider-value">{config.raisedBarHeight}"</span>
    </div>
    <input type="range" min="4" max="10" step="0.5"
      value={config.raisedBarHeight}
      onChange={e => update('raisedBarHeight', parseFloat(e.target.value))} />
    <div className="slider-note">Height above counter level</div>
  </div>
)}
```

**Step 2: Add LR ledge toggle and sliders**

```jsx
<div className="checkbox-item" onClick={() => update('lrLedge', !config.lrLedge)}>
  <input type="checkbox" checked={config.lrLedge} readOnly />
  <span>Living room ledge</span>
</div>

{config.lrLedge && (
  <>
    <div className="slider-group" style={{ marginLeft: 24, marginTop: 8 }}>
      <div className="slider-label">
        <span>Ledge Height (from LR)</span>
        <span className="slider-value">{config.ledgeHeight}"</span>
      </div>
      <input type="range" min="36" max="48" step="1"
        value={config.ledgeHeight}
        onChange={e => update('ledgeHeight', parseFloat(e.target.value))} />
    </div>
    <div className="slider-group" style={{ marginLeft: 24 }}>
      <div className="slider-label">
        <span>Ledge Depth</span>
        <span className="slider-value">{config.ledgeDepth}"</span>
      </div>
      <input type="range" min="6" max="16" step="1"
        value={config.ledgeDepth}
        onChange={e => update('ledgeDepth', parseFloat(e.target.value))} />
    </div>
  </>
)}
```

**Step 3: Add LR shelves toggle and slider**

```jsx
<div className="checkbox-item" onClick={() => update('lrShelves', !config.lrShelves)}>
  <input type="checkbox" checked={config.lrShelves} readOnly />
  <span>Living room shelves</span>
</div>

{config.lrShelves && (
  <div className="slider-group" style={{ marginLeft: 24, marginTop: 8 }}>
    <div className="slider-label">
      <span>Shelf Height (from LR)</span>
      <span className="slider-value">{config.shelfHeight}"</span>
    </div>
    <input type="range" min="36" max="54" step="1"
      value={config.shelfHeight}
      onChange={e => update('shelfHeight', parseFloat(e.target.value))} />
  </div>
)}
```

**Step 4: Verify toggles work**

Click toggles, verify sliders appear/hide. Click presets, verify toggles update.

**Step 5: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): add tiered bar, LR ledge, LR shelves toggles"
```

---

## Task 5: Update Side Section View - Tiered Bar

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Locate Side Section SVG rendering**

Find the `{/* Side Section */}` block in the right panel, inside the SVG.

**Step 2: Modify bar top rendering for tiered option**

Replace the simple bar top rect with conditional rendering:
```jsx
{/* Bar top - tiered or flat */}
{config.tieredBar ? (
  <>
    {/* Lower counter section (kitchen side) */}
    <rect
      x={barLeft + (barRight - barLeft) * 0.4}
      y={barTopY}
      width={(barRight - barLeft) * 0.6}
      height={barThickPx}
      fill="#92400e"
      stroke="#b45309"
      strokeWidth="1.5"
    />
    {/* Raised bar section (LR side) */}
    <rect
      x={barLeft}
      y={barTopY - config.raisedBarHeight * scale}
      width={(barRight - barLeft) * 0.4}
      height={barThickPx}
      fill="#92400e"
      stroke="#b45309"
      strokeWidth="1.5"
    />
    {/* Vertical support between levels */}
    <rect
      x={barLeft + (barRight - barLeft) * 0.4 - 3}
      y={barTopY - config.raisedBarHeight * scale + barThickPx}
      width="4"
      height={config.raisedBarHeight * scale - barThickPx + 2}
      fill="#78350f"
    />
    {/* Labels */}
    <text x={barLeft + (barRight - barLeft) * 0.2} y={barTopY - config.raisedBarHeight * scale - 8} textAnchor="middle" fill="#fb923c" fontSize="9">BAR ({(config.barTopHeight + config.raisedBarHeight).toFixed(0)}")</text>
    <text x={barLeft + (barRight - barLeft) * 0.7} y={barTopY - 8} textAnchor="middle" fill="#4ade80" fontSize="9">COUNTER ({config.barTopHeight}")</text>
  </>
) : (
  /* Original flat bar top */
  <rect
    x={barLeft}
    y={barTopY}
    width={barRight - barLeft}
    height={barThickPx}
    fill="#92400e"
    stroke="#b45309"
    strokeWidth="1.5"
  />
)}
```

**Step 3: Verify tiered rendering**

Toggle "Tiered bar top" checkbox, verify two-level bar appears in Side Section.

**Step 4: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): render tiered bar in side section view"
```

---

## Task 6: Update Side Section View - LR Ledge

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add LR ledge rendering to Side Section**

Add after bar top rendering, before dimensions:
```jsx
{/* LR Ledge */}
{config.lrLedge && (() => {
  const ledgeY = groundY - config.ledgeHeight * scale;
  const ledgeDepthPx = config.ledgeDepth * scale;

  return (
    <>
      {/* Ledge surface */}
      <rect
        x={stepX - ledgeDepthPx - 5}
        y={ledgeY}
        width={ledgeDepthPx}
        height={barThickPx * 0.7}
        fill="#78350f"
        stroke="#92400e"
        strokeWidth="1"
      />
      {/* Bracket */}
      <path
        d={`M ${stepX - 3} ${ledgeY + barThickPx * 0.7} L ${stepX - 3} ${ledgeY + 25} L ${stepX - ledgeDepthPx} ${ledgeY + 25}`}
        fill="none"
        stroke="#4a6a8a"
        strokeWidth="2"
      />
      {/* Label */}
      <text x={stepX - ledgeDepthPx / 2 - 5} y={ledgeY - 8} textAnchor="middle" fill="#f472b6" fontSize="9">LEDGE ({config.ledgeHeight}" from LR)</text>
    </>
  );
})()}
```

**Step 2: Verify ledge rendering**

Toggle "Living room ledge", verify shelf appears on LR side of step.

**Step 3: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): render LR ledge in side section view"
```

---

## Task 7: Update Side Section View - LR Shelves

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add LR shelves rendering to Side Section**

Add after LR ledge block:
```jsx
{/* LR Floating Shelves */}
{config.lrShelves && (() => {
  const shelf1Y = groundY - config.shelfHeight * scale;
  const shelf2Y = shelf1Y - 35;
  const shelfDepthPx = 12 * scale; // Fixed 12" depth for display shelves

  return (
    <>
      {/* Lower shelf */}
      <rect
        x={stepX - shelfDepthPx - 5}
        y={shelf1Y}
        width={shelfDepthPx}
        height={barThickPx * 0.6}
        fill="#2d4a6a"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      {/* Upper shelf */}
      <rect
        x={stepX - shelfDepthPx - 5}
        y={shelf2Y}
        width={shelfDepthPx}
        height={barThickPx * 0.6}
        fill="#2d4a6a"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      {/* Decorative items */}
      <rect x={stepX - shelfDepthPx + 5} y={shelf1Y - 12} width="8" height="12" fill="#4a6a8a" opacity="0.6"/>
      <rect x={stepX - shelfDepthPx + 18} y={shelf1Y - 18} width="6" height="18" fill="#5a7a9a" opacity="0.6"/>
      {/* Label */}
      <text x={stepX - shelfDepthPx / 2 - 5} y={shelf2Y - 12} textAnchor="middle" fill="#a78bfa" fontSize="9">DISPLAY</text>
    </>
  );
})()}
```

**Step 2: Verify shelves rendering**

Toggle "Living room shelves", verify two floating shelves appear.

**Step 3: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): render LR floating shelves in side section view"
```

---

## Task 8: Update Living Room View - Tiered Bar

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Locate Living Room View SVG**

Find the `{/* Living Room Elevation */}` block.

**Step 2: Modify bar top for tiered option**

Replace the bar top rect with conditional rendering:
```jsx
{/* Bar top - tiered or flat */}
{config.tieredBar ? (
  <>
    {/* Lower section */}
    <rect x={startX + barLengthPx * 0.35 - 4} y={barTopY} width={barLengthPx * 0.65 + 12} height="10" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
    {/* Raised section (closer to viewer from LR) */}
    <rect x={startX - 8} y={barTopY - config.raisedBarHeight * 2} width={barLengthPx * 0.35 + 4} height="10" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
    {/* Vertical piece */}
    <rect x={startX + barLengthPx * 0.35 - 4} y={barTopY - config.raisedBarHeight * 2 + 10} width="4" height={config.raisedBarHeight * 2 - 10} fill="#78350f"/>
  </>
) : (
  <rect x={startX - 8} y={barTopY} width={barLengthPx + 16} height="10" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
)}
```

**Step 3: Verify in Front View**

Switch to "Front View" tab, toggle tiered, verify raised section visible.

**Step 4: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): render tiered bar in living room view"
```

---

## Task 9: Update Living Room View - LR Ledge & Shelves

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add LR ledge to Living Room View**

Add after bar top, before dimensions:
```jsx
{/* LR Ledge */}
{config.lrLedge && (() => {
  const ledgeY = groundY - 8 - config.ledgeHeight * 1.5;
  return (
    <>
      <rect x={startX - 4} y={ledgeY} width={barLengthPx + 8} height="6" fill="#78350f" stroke="#92400e" strokeWidth="1"/>
      <text x={startX + barLengthPx / 2} y={ledgeY - 6} textAnchor="middle" fill="#f472b6" fontSize="9">LEDGE</text>
    </>
  );
})()}
```

**Step 2: Add LR shelves to Living Room View**

```jsx
{/* LR Floating Shelves */}
{config.lrShelves && (() => {
  const shelf1Y = groundY - 8 - config.shelfHeight * 1.5;
  const shelf2Y = shelf1Y - 30;
  return (
    <>
      <rect x={startX + 20} y={shelf1Y} width={barLengthPx - 40} height="5" fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1"/>
      <rect x={startX + 20} y={shelf2Y} width={barLengthPx - 40} height="5" fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1"/>
      {/* Items on lower shelf */}
      <rect x={startX + 40} y={shelf1Y - 15} width="12" height="15" fill="#4a6a8a" opacity="0.5"/>
      <rect x={startX + 60} y={shelf1Y - 20} width="10" height="20" fill="#5a7a9a" opacity="0.5"/>
      <rect x={startX + barLengthPx - 80} y={shelf1Y - 12} width="15" height="12" fill="#4a6a8a" opacity="0.5"/>
      <text x={startX + barLengthPx / 2} y={shelf2Y - 8} textAnchor="middle" fill="#a78bfa" fontSize="9">DISPLAY SHELVES</text>
    </>
  );
})()}
```

**Step 3: Verify in Front View**

Toggle ledge and shelves, verify they appear in Living Room View.

**Step 4: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): render LR ledge and shelves in living room view"
```

---

## Task 10: Update Plan View

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Locate Plan View SVG**

Find the `{/* Plan View */}` block.

**Step 2: Add tiered zone indication**

After existing zones, add:
```jsx
{/* Tiered section zone */}
{config.tieredBar && (
  <>
    <rect x={startX} y={topY + kneeSpacePx + cabinetDepthPx - 5} width={barLengthPx * 0.35} height={setbackPx + 10} fill="none" stroke="#fb923c" strokeWidth="1" strokeDasharray="4,2"/>
    <text x={startX + barLengthPx * 0.175} y={topY + totalDepthPx + 35} textAnchor="middle" fill="#fb923c" fontSize="8">RAISED BAR ZONE</text>
  </>
)}
```

**Step 3: Add LR ledge indication**

```jsx
{/* LR Ledge zone */}
{config.lrLedge && (
  <>
    <rect x={startX} y={topY + totalDepthPx + 5} width={barLengthPx} height={config.ledgeDepth * 2} fill="none" stroke="#f472b6" strokeWidth="1" strokeDasharray="4,2"/>
    <text x={startX + barLengthPx / 2} y={topY + totalDepthPx + 5 + config.ledgeDepth} textAnchor="middle" fill="#f472b6" fontSize="8">LEDGE ({config.ledgeDepth}")</text>
  </>
)}
```

**Step 4: Verify in Plan View**

Toggle options, verify zones appear in bird's eye view.

**Step 5: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): update plan view with tiered and ledge zones"
```

---

## Task 11: Update Construction View

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Locate Construction View SVG**

Find the `{/* Construction View */}` block.

**Step 2: Add tiered framing detail**

In construction notes area, add conditional note:
```jsx
{config.tieredBar && <text y="110" fill="#94a3b8" fontSize="9">• Raised bar needs vertical support</text>}
```

**Step 3: Add ledge bracket detail**

```jsx
{config.lrLedge && <text y="125" fill="#94a3b8" fontSize="9">• Ledge brackets into step face (lag bolts)</text>}
```

**Step 4: Add shelves mounting note**

```jsx
{config.lrShelves && <text y="140" fill="#94a3b8" fontSize="9">• Floating shelves need wall cleats</text>}
```

**Step 5: Verify construction notes update**

Toggle features, verify notes appear.

**Step 6: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): add construction notes for new features"
```

---

## Task 12: Add Calculated Values for New Features

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Add calculated values for tiered bar**

In Calculated Values panel, add:
```jsx
{config.tieredBar && (
  <div className="calc-row">
    <span>Raised bar from kitchen</span>
    <span>{(config.barTopHeight + config.raisedBarHeight).toFixed(1)}"</span>
  </div>
)}
```

**Step 2: Add calculated values for LR ledge**

```jsx
{config.lrLedge && (
  <div className="calc-row">
    <span>Ledge from LR floor</span>
    <span>{config.ledgeHeight}"</span>
  </div>
)}
```

**Step 3: Verify calculated values**

Toggle features, verify values appear in panel.

**Step 4: Commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): add calculated values for tiered bar and ledge"
```

---

## Task 13: Final Polish & Testing

**Files:**
- Modify: `visualization/jsx/kitchen-bar-planner-v4.jsx`

**Step 1: Test all presets**

Click through each preset (Flush, Setback, Tiered, Ledge, Floating):
- Verify sliders update
- Verify toggles update
- Verify all 4 views update correctly
- Verify pros/cons info updates

**Step 2: Test manual overrides**

- Select "Flush" preset
- Manually enable "Tiered bar top"
- Verify diagram shows tiered bar
- Verify preset button doesn't change (stays on Flush)

**Step 3: Test responsive layout**

Resize browser window, verify panels stack on mobile.

**Step 4: Final commit**

```bash
git add visualization/jsx/kitchen-bar-planner-v4.jsx
git commit -m "feat(v4): complete kitchen bar planner v4"
```

---

## Verification Checklist

After all tasks complete:

- [ ] v4 loads as default visualization
- [ ] All 5 presets work and update state correctly
- [ ] Preset info (desc, pros/cons) displays inline
- [ ] Tiered bar toggle shows/hides slider, updates all views
- [ ] LR ledge toggle shows/hides sliders, updates all views
- [ ] LR shelves toggle shows/hides slider, updates all views
- [ ] Manual overrides work after selecting preset
- [ ] All 4 view tabs work (All, Side, Front, Plan, Construction)
- [ ] Calculated values update correctly
- [ ] No console errors
