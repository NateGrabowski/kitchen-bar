# Kitchen Floor Cabinets Sketch - Multiple Views Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Front View, Plan View, and Construction View to the kitchen-floor-cabinets-sketch visualization with tab navigation.

**Architecture:** Add `activeView` state to toggle between 4 views (Side Section, Front, Plan, Construction). Each view is a separate SVG rendered conditionally. Tab buttons styled consistently with existing UI. Views share config state and calculated values.

**Tech Stack:** React (useState), SVG, inline styles

---

## Task 1: Add View Tabs UI and State

**Files:**
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx:4-16` (add state)
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx:178` (add tab CSS)
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx:357-359` (add tabs before SVG)

**Step 1: Add activeView state**

After line 15 (`stepPanelStyle: 'match'`), add:

```javascript
  const [activeView, setActiveView] = useState('side')
```

**Step 2: Add tab button CSS**

Inside the `<style>` block (around line 178), add:

```css
.view-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}
.view-tab {
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 600;
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.view-tab:hover {
  background: #1e3a5f;
}
.view-tab.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
```

**Step 3: Add tab buttons in visualization panel**

Replace line 359 (`<div className="panel-title">Side Section View</div>`) with:

```jsx
<div className="view-tabs">
  {[
    { id: 'side', label: 'Side Section' },
    { id: 'front', label: 'Front View' },
    { id: 'plan', label: 'Plan View' },
    { id: 'construction', label: 'Construction' },
  ].map(view => (
    <button
      key={view.id}
      className={`view-tab ${activeView === view.id ? 'active' : ''}`}
      onClick={() => setActiveView(view.id)}
    >
      {view.label}
    </button>
  ))}
</div>
```

**Step 4: Wrap Side Section SVG in conditional**

Wrap the existing SVG (lines 361-546) and explanation div (lines 548-560) in:

```jsx
{activeView === 'side' && (
  <>
    {/* existing SVG */}
    {/* existing explanation div */}
  </>
)}
```

**Step 5: Verify tabs render**

Run: `npm run dev` (already running)
Visual check: Tabs appear, Side Section tab is active, clicking tabs changes active state
Screenshot with Playwright to verify

**Step 6: Commit**

```bash
git add visualization/jsx/kitchen-floor-cabinets-sketch.jsx
git commit -m "feat(sketch): add view tabs UI and state"
```

---

## Task 2: Add Front View (From Living Room)

**Files:**
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` (add after Side Section conditional block)

**Step 1: Add Front View SVG**

After the Side Section conditional block, add:

```jsx
{activeView === 'front' && (
  <>
    <svg viewBox="0 0 600 380" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
      <defs>
        <pattern id={`${uniqueId}-grid-front`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="380" fill={`url(#${uniqueId}-grid-front)`}/>

      {(() => {
        const scale = 1.8
        const barLengthPx = config.barLength * scale
        const cabinetHeightPx = cabinetHeight * scale
        const stepHeightPx = config.stepHeight * scale
        const counterThickPx = config.counterThickness * scale * 2

        const startX = (600 - barLengthPx) / 2
        const groundY = 340  // LR floor
        const kitchenFloorY = groundY - stepHeightPx
        const cabinetTopY = kitchenFloorY - cabinetHeightPx
        const counterTopY = cabinetTopY - counterThickPx

        // Door layout: 3 equal sections for 84" = 28" each
        const numDoors = 3
        const doorWidth = barLengthPx / numDoors

        return (
          <g>
            {/* Labels */}
            <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">FRONT VIEW</text>
            <text x="30" y="42" fill="#64748b" fontSize="10">From living room looking at cabinet face</text>

            {/* Living room floor */}
            <rect x="20" y={groundY} width="560" height="30" fill="#1e3a5f"/>
            <text x="300" y={groundY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM FLOOR</text>

            {/* Step panel (below kitchen floor) */}
            {config.showStepPanel && (
              <rect
                x={startX}
                y={kitchenFloorY}
                width={barLengthPx}
                height={stepHeightPx}
                fill={config.stepPanelStyle === 'match' ? '#2d4a6a' : '#1a1a2e'}
                stroke="#60a5fa"
                strokeWidth="1"
              />
            )}

            {/* Cabinet face with doors */}
            <rect
              x={startX}
              y={cabinetTopY}
              width={barLengthPx}
              height={cabinetHeightPx}
              fill="#2d4a6a"
              stroke="#60a5fa"
              strokeWidth="1.5"
            />

            {/* Door divisions and handles */}
            {Array.from({ length: numDoors }).map((_, i) => {
              const doorX = startX + i * doorWidth
              const handleY = cabinetTopY + cabinetHeightPx * 0.35
              return (
                <g key={i}>
                  {/* Door outline */}
                  <rect
                    x={doorX + 4}
                    y={cabinetTopY + 4}
                    width={doorWidth - 8}
                    height={cabinetHeightPx - 8}
                    fill="none"
                    stroke="#4a6a8a"
                    strokeWidth="1"
                    rx="2"
                  />
                  {/* Handle */}
                  <rect
                    x={doorX + doorWidth - 20}
                    y={handleY}
                    width="8"
                    height="24"
                    fill="#60a5fa"
                    rx="2"
                  />
                  {/* Door number */}
                  <text
                    x={doorX + doorWidth / 2}
                    y={cabinetTopY + cabinetHeightPx / 2}
                    textAnchor="middle"
                    fill="#4a6a8a"
                    fontSize="10"
                  >
                    {Math.round(doorWidth / scale)}"
                  </text>
                </g>
              )
            })}

            {/* Countertop */}
            <rect
              x={startX - config.overhangTowardLR * scale}
              y={counterTopY}
              width={barLengthPx + config.overhangTowardLR * scale}
              height={counterThickPx}
              fill="#92400e"
              stroke="#b45309"
              strokeWidth="1.5"
            />

            {/* Dimension: bar length */}
            <g>
              <line x1={startX} y1={counterTopY - 20} x2={startX + barLengthPx} y2={counterTopY - 20} stroke="#fbbf24" strokeWidth="1"/>
              <line x1={startX} y1={counterTopY - 25} x2={startX} y2={counterTopY - 15} stroke="#fbbf24" strokeWidth="1"/>
              <line x1={startX + barLengthPx} y1={counterTopY - 25} x2={startX + barLengthPx} y2={counterTopY - 15} stroke="#fbbf24" strokeWidth="1"/>
              <text x={startX + barLengthPx / 2} y={counterTopY - 28} textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">{config.barLength}" length</text>
            </g>

            {/* Dimension: cabinet height */}
            <g>
              <line x1={startX + barLengthPx + 15} y1={kitchenFloorY} x2={startX + barLengthPx + 15} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
              <line x1={startX + barLengthPx + 10} y1={kitchenFloorY} x2={startX + barLengthPx + 20} y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
              <line x1={startX + barLengthPx + 10} y1={cabinetTopY} x2={startX + barLengthPx + 20} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
              <text x={startX + barLengthPx + 25} y={(kitchenFloorY + cabinetTopY) / 2} fill="#4ade80" fontSize="10" fontFamily="monospace">{cabinetHeight}"</text>
            </g>

            {/* Dimension: step height */}
            <g>
              <line x1={startX - 15} y1={groundY} x2={startX - 15} y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
              <line x1={startX - 20} y1={groundY} x2={startX - 10} y2={groundY} stroke="#fb923c" strokeWidth="1"/>
              <line x1={startX - 20} y1={kitchenFloorY} x2={startX - 10} y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
              <text x={startX - 25} y={(groundY + kitchenFloorY) / 2} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
            </g>

            {/* Seating positions (3 stools) */}
            {[0.2, 0.5, 0.8].map((pos, i) => (
              <g key={i} opacity="0.5">
                <ellipse
                  cx={startX + barLengthPx * pos}
                  cy={counterTopY - 60}
                  rx="12"
                  ry="14"
                  fill="#5a7a9a"
                />
                <text
                  x={startX + barLengthPx * pos}
                  y={counterTopY - 80}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="8"
                >
                  seat {i + 1}
                </text>
              </g>
            ))}
          </g>
        )
      })()}
    </svg>

    {/* Explanation */}
    <div style={{ marginTop: 16, padding: 12, background: '#0d1520', borderRadius: 6, fontSize: 12, lineHeight: 1.6 }}>
      <strong style={{ color: '#60a5fa' }}>Front View Notes:</strong>
      <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: '#94a3b8' }}>
        <li>Cabinet spans <span style={{ color: '#fbbf24' }}>{config.barLength}"</span> (fits ~3 people at 24" each)</li>
        <li>3 cabinet doors, each ~{Math.round(config.barLength / 3)}" wide</li>
        <li>Doors face living room for easy access</li>
        <li>Countertop overhangs {config.overhangTowardLR}" toward you (viewer)</li>
        {config.showStepPanel && <li>Step panel ({config.stepPanelStyle}) visible below cabinet</li>}
      </ul>
    </div>
  </>
)}
```

**Step 2: Verify Front View renders**

Visual check: Click "Front View" tab, see cabinet face with 3 doors, dimensions
Screenshot with Playwright

**Step 3: Commit**

```bash
git add visualization/jsx/kitchen-floor-cabinets-sketch.jsx
git commit -m "feat(sketch): add front view from living room"
```

---

## Task 3: Add Plan View (Bird's Eye)

**Files:**
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` (add after Front View conditional block)

**Step 1: Add Plan View SVG**

After the Front View conditional block, add:

```jsx
{activeView === 'plan' && (
  <>
    <svg viewBox="0 0 600 350" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
      <defs>
        <pattern id={`${uniqueId}-grid-plan`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="350" fill={`url(#${uniqueId}-grid-plan)`}/>

      {(() => {
        const scale = 1.6
        const barLengthPx = config.barLength * scale
        const totalDepthPx = totalDepth * scale
        const cabinetDepthPx = config.cabinetDepth * scale
        const lrOverhangPx = config.overhangTowardLR * scale
        const kneeSpacePx = config.overhangTowardKitchen * scale

        const startX = (600 - barLengthPx) / 2
        const stepEdgeY = 180  // Where step edge is (kitchen/LR boundary)
        const counterFrontY = stepEdgeY + lrOverhangPx  // Counter extends toward LR
        const cabinetFrontY = stepEdgeY  // Cabinet at step edge
        const cabinetBackY = stepEdgeY - cabinetDepthPx
        const counterBackY = cabinetBackY - kneeSpacePx

        return (
          <g>
            {/* Labels */}
            <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">PLAN VIEW</text>
            <text x="30" y="42" fill="#64748b" fontSize="10">Bird's eye view showing zones</text>

            {/* Living room zone */}
            <rect x="20" y={stepEdgeY} width="560" height="140" fill="#1e3a5f" opacity="0.3"/>
            <text x="300" y={stepEdgeY + 120} textAnchor="middle" fill="#3b5a7a" fontSize="12">LIVING ROOM</text>

            {/* Kitchen zone */}
            <rect x="20" y="60" width="560" height={stepEdgeY - 60} fill="#234060" opacity="0.3"/>
            <text x="300" y="80" textAnchor="middle" fill="#3b5a7a" fontSize="12">KITCHEN</text>

            {/* Step edge line */}
            <line x1="20" y1={stepEdgeY} x2="580" y2={stepEdgeY} stroke="#fb923c" strokeWidth="2" strokeDasharray="8,4"/>
            <text x="590" y={stepEdgeY + 4} fill="#fb923c" fontSize="9">step edge</text>

            {/* Cabinet footprint */}
            <rect
              x={startX}
              y={cabinetBackY}
              width={barLengthPx}
              height={cabinetDepthPx}
              fill="#2d4a6a"
              stroke="#60a5fa"
              strokeWidth="1.5"
            />
            <text x={startX + barLengthPx / 2} y={cabinetBackY + cabinetDepthPx / 2 + 4} textAnchor="middle" fill="#60a5fa" fontSize="10">CABINET</text>

            {/* Counter footprint (full) */}
            <rect
              x={startX}
              y={counterBackY}
              width={barLengthPx}
              height={totalDepthPx}
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeDasharray="4,2"
            />

            {/* Knee space zone (hatched) */}
            <rect
              x={startX}
              y={counterBackY}
              width={barLengthPx}
              height={kneeSpacePx}
              fill="#4ade80"
              opacity="0.15"
            />
            <text x={startX + barLengthPx / 2} y={counterBackY + kneeSpacePx / 2 + 4} textAnchor="middle" fill="#4ade80" fontSize="9">KNEE SPACE</text>

            {/* LR overhang zone */}
            {config.overhangTowardLR > 0 && (
              <>
                <rect
                  x={startX}
                  y={stepEdgeY}
                  width={barLengthPx}
                  height={lrOverhangPx}
                  fill="#fbbf24"
                  opacity="0.15"
                />
                <text x={startX + barLengthPx / 2} y={stepEdgeY + lrOverhangPx / 2 + 4} textAnchor="middle" fill="#fbbf24" fontSize="9">OVERHANG</text>
              </>
            )}

            {/* Seating positions (3 stools from above) */}
            {[0.2, 0.5, 0.8].map((pos, i) => (
              <g key={i}>
                <circle
                  cx={startX + barLengthPx * pos}
                  cy={counterBackY - 20}
                  r="14"
                  fill="#5a7a9a"
                  opacity="0.6"
                />
                <text
                  x={startX + barLengthPx * pos}
                  y={counterBackY - 17}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="8"
                >
                  {i + 1}
                </text>
              </g>
            ))}

            {/* Dimension: bar length */}
            <g>
              <line x1={startX} y1={counterFrontY + 25} x2={startX + barLengthPx} y2={counterFrontY + 25} stroke="#fbbf24" strokeWidth="1"/>
              <line x1={startX} y1={counterFrontY + 20} x2={startX} y2={counterFrontY + 30} stroke="#fbbf24" strokeWidth="1"/>
              <line x1={startX + barLengthPx} y1={counterFrontY + 20} x2={startX + barLengthPx} y2={counterFrontY + 30} stroke="#fbbf24" strokeWidth="1"/>
              <text x={startX + barLengthPx / 2} y={counterFrontY + 40} textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">{config.barLength}"</text>
            </g>

            {/* Dimension: total depth */}
            <g>
              <line x1={startX + barLengthPx + 20} y1={counterBackY} x2={startX + barLengthPx + 20} y2={counterFrontY} stroke="#60a5fa" strokeWidth="1"/>
              <line x1={startX + barLengthPx + 15} y1={counterBackY} x2={startX + barLengthPx + 25} y2={counterBackY} stroke="#60a5fa" strokeWidth="1"/>
              <line x1={startX + barLengthPx + 15} y1={counterFrontY} x2={startX + barLengthPx + 25} y2={counterFrontY} stroke="#60a5fa" strokeWidth="1"/>
              <text x={startX + barLengthPx + 30} y={(counterBackY + counterFrontY) / 2 + 4} fill="#60a5fa" fontSize="10" fontFamily="monospace">{totalDepth}"</text>
            </g>

            {/* Dimension: cabinet depth */}
            <g>
              <line x1={startX - 20} y1={cabinetBackY} x2={startX - 20} y2={cabinetFrontY} stroke="#4ade80" strokeWidth="1"/>
              <line x1={startX - 25} y1={cabinetBackY} x2={startX - 15} y2={cabinetBackY} stroke="#4ade80" strokeWidth="1"/>
              <line x1={startX - 25} y1={cabinetFrontY} x2={startX - 15} y2={cabinetFrontY} stroke="#4ade80" strokeWidth="1"/>
              <text x={startX - 30} y={(cabinetBackY + cabinetFrontY) / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="10" fontFamily="monospace">{config.cabinetDepth}"</text>
            </g>

            {/* Legend */}
            <g transform="translate(30, 290)">
              <rect x="0" y="0" width="12" height="12" fill="#2d4a6a" stroke="#60a5fa"/>
              <text x="18" y="10" fill="#94a3b8" fontSize="9">Cabinet</text>
              <rect x="80" y="0" width="12" height="12" fill="#4ade80" opacity="0.3"/>
              <text x="98" y="10" fill="#94a3b8" fontSize="9">Knee space</text>
              <rect x="170" y="0" width="12" height="12" fill="#fbbf24" opacity="0.3"/>
              <text x="188" y="10" fill="#94a3b8" fontSize="9">LR overhang</text>
              <circle cx="276" cy="6" r="6" fill="#5a7a9a" opacity="0.6"/>
              <text x="288" y="10" fill="#94a3b8" fontSize="9">Seating</text>
            </g>
          </g>
        )
      })()}
    </svg>

    {/* Explanation */}
    <div style={{ marginTop: 16, padding: 12, background: '#0d1520', borderRadius: 6, fontSize: 12, lineHeight: 1.6 }}>
      <strong style={{ color: '#60a5fa' }}>Plan View Notes:</strong>
      <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: '#94a3b8' }}>
        <li>Total footprint: <span style={{ color: '#fbbf24' }}>{config.barLength}" x {totalDepth}"</span></li>
        <li>Cabinet: {config.barLength}" x {config.cabinetDepth}" (sits on kitchen floor at step edge)</li>
        <li>Knee space: {config.overhangTowardKitchen}" overhang into kitchen</li>
        <li>LR overhang: {config.overhangTowardLR}" past step edge</li>
        <li>Seating capacity: ~3 people (at 24" per person)</li>
      </ul>
    </div>
  </>
)}
```

**Step 2: Verify Plan View renders**

Visual check: Click "Plan View" tab, see bird's eye with zones, dimensions
Screenshot with Playwright

**Step 3: Commit**

```bash
git add visualization/jsx/kitchen-floor-cabinets-sketch.jsx
git commit -m "feat(sketch): add plan view bird's eye"
```

---

## Task 4: Add Construction View

**Files:**
- Modify: `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` (add after Plan View conditional block)

**Step 1: Add Construction View**

After the Plan View conditional block, add:

```jsx
{activeView === 'construction' && (
  <div style={{ background: '#0d1520', borderRadius: 4, padding: 20 }}>
    <h3 style={{ color: '#60a5fa', margin: '0 0 16px 0', fontSize: 14 }}>CONSTRUCTION NOTES</h3>

    {/* Materials List */}
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Materials</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Item</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Size</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Qty</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8' }}>Notes</th>
          </tr>
        </thead>
        <tbody style={{ color: '#e2e8f0' }}>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '8px 12px' }}>Butcher block top</td>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" x {totalDepth}" x {config.counterThickness}"</td>
            <td style={{ padding: '8px 12px' }}>1</td>
            <td style={{ padding: '8px 12px', color: '#94a3b8' }}>Seal with food-safe finish</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '8px 12px' }}>Base cabinet</td>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" x {config.cabinetDepth}" x {cabinetHeight}"</td>
            <td style={{ padding: '8px 12px' }}>1</td>
            <td style={{ padding: '8px 12px', color: needsCustom ? '#fb923c' : '#94a3b8' }}>
              {needsCustom ? `Custom height (standard is ${closestStandard.size}")` : `Near standard ${closestStandard.label}`}
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '8px 12px' }}>Step face panel</td>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" x {config.stepHeight}" x 3/4"</td>
            <td style={{ padding: '8px 12px' }}>1</td>
            <td style={{ padding: '8px 12px', color: '#94a3b8' }}>Plywood, {config.stepPanelStyle} finish</td>
          </tr>
          {config.overhangTowardLR > 6 && (
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '8px 12px' }}>Support brackets</td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.overhangTowardLR}" depth</td>
              <td style={{ padding: '8px 12px' }}>2-3</td>
              <td style={{ padding: '8px 12px', color: '#94a3b8' }}>Steel L-brackets for overhang</td>
            </tr>
          )}
          <tr style={{ borderBottom: '1px solid #1e293b' }}>
            <td style={{ padding: '8px 12px' }}>Bar stools</td>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.stoolHeight}" seat height</td>
            <td style={{ padding: '8px 12px' }}>3</td>
            <td style={{ padding: '8px 12px', color: '#94a3b8' }}>For {config.counterHeight}" counter</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Build Steps */}
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Build Sequence</h4>
      <ol style={{ margin: 0, paddingLeft: 20, color: '#e2e8f0', fontSize: 12, lineHeight: 2 }}>
        <li>Remove existing railing and clean step edge</li>
        <li>Install step face panel (plywood flush with step edge)</li>
        <li>Position cabinet on kitchen floor, front aligned with step edge</li>
        <li>Secure cabinet to floor and wall (if applicable)</li>
        {config.overhangTowardLR > 6 && <li>Install support brackets for LR overhang</li>}
        <li>Place butcher block on cabinet, mark for overhang</li>
        <li>Secure butcher block with corner brackets underneath</li>
        <li>Sand and seal butcher block edges</li>
        <li>Install electrical outlets (if planned)</li>
        <li>Final finishing and cleanup</li>
      </ol>
    </div>

    {/* Key Dimensions */}
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Key Dimensions</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Counter height', value: `${config.counterHeight}"`, note: 'from kitchen floor' },
          { label: 'Counter from LR', value: `${counterFromLRFloor}"`, note: 'from LR floor' },
          { label: 'Total depth', value: `${totalDepth}"`, note: 'front to back' },
          { label: 'Cabinet height', value: `${cabinetHeight}"`, note: needsCustom ? 'CUSTOM' : 'near standard' },
          { label: 'Knee space', value: `${config.overhangTowardKitchen}"`, note: kneeSpace >= 12 ? 'OK' : 'tight' },
          { label: 'Seat-to-counter', value: `${seatToCounter}"`, note: seatToCounter >= 10 && seatToCounter <= 14 ? 'ideal' : 'check' },
        ].map((dim, i) => (
          <div key={i} style={{ background: '#1e293b', padding: 12, borderRadius: 4 }}>
            <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>{dim.label}</div>
            <div style={{ color: '#60a5fa', fontSize: 18, fontFamily: 'monospace' }}>{dim.value}</div>
            <div style={{ color: '#64748b', fontSize: 9 }}>{dim.note}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Warnings */}
    <div>
      <h4 style={{ color: '#fb923c', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Considerations</h4>
      <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: 12, lineHeight: 1.8 }}>
        {needsCustom && (
          <li style={{ color: '#fb923c' }}>
            Cabinet height {cabinetHeight}" is non-standard. Consider building custom or using {closestStandard.label} with filler.
          </li>
        )}
        {config.overhangTowardLR > 6 && (
          <li>LR overhang ({config.overhangTowardLR}") needs bracket support every 24-36"</li>
        )}
        <li>Butcher block needs 1/8" gap at walls for expansion</li>
        <li>Run electrical before securing countertop</li>
        <li>This design does NOT use the step area for storage (see "continuous cabinet" alternative)</li>
      </ul>
    </div>
  </div>
)}
```

**Step 2: Verify Construction View renders**

Visual check: Click "Construction" tab, see materials table, build steps, dimensions grid
Screenshot with Playwright

**Step 3: Commit**

```bash
git add visualization/jsx/kitchen-floor-cabinets-sketch.jsx
git commit -m "feat(sketch): add construction details view"
```

---

## Task 5: Final Verification

**Step 1: Test all views**

Run Playwright to screenshot each view:
- Side Section (default)
- Front View
- Plan View
- Construction

**Step 2: Verify tab switching**

Visual check: All 4 tabs work, correct view renders for each

**Step 3: Test slider interactions**

Adjust sliders on each view, verify values update correctly

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(sketch): complete multi-view kitchen floor cabinets visualization"
```

---

## Summary

| Task | Description | Est. Time |
|------|-------------|-----------|
| 1 | View tabs UI and state | 3 min |
| 2 | Front View (from LR) | 5 min |
| 3 | Plan View (bird's eye) | 5 min |
| 4 | Construction View | 5 min |
| 5 | Final verification | 3 min |

**Total: ~21 minutes**
