import React, { useState, useId } from 'react'

export default function KitchenFloorCabinetsSketch() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,           // Fixed - living room to kitchen floor
    counterHeight: 38.5,          // PRIMARY: counter height from kitchen floor (range: 36-42")
    counterThickness: 1.5,      // Butcher block
    cabinetDepth: 14,           // Cabinet depth (doors face LR side)
    overhangTowardLR: 3,        // How far counter extends past cabinet toward LR
    overhangTowardKitchen: 12,  // Knee space on kitchen side
    barLength: 84,
    stoolHeight: 28,
    // Recessed herb planter
    planterEnabled: false,
    planterLength: 20,          // Length along bar (inches)
    planterWidth: 6,            // Width/depth into counter (inches)
    planterDepth: 4,            // How deep the insert sits (inches)
    planterOffset: 6,           // Distance from left end of bar (inches)
  })

  const [activeView, setActiveView] = useState('side')

  const uniqueId = useId()
  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Calculated values - cabinet height is DERIVED from counter height
  const cabinetHeight = config.counterHeight - config.counterThickness
  const counterFromLRFloor = config.stepHeight + config.counterHeight
  const totalDepth = config.cabinetDepth + config.overhangTowardLR + config.overhangTowardKitchen

  // Ergonomics
  const seatToCounter = config.counterHeight - config.stoolHeight
  const kneeSpace = config.overhangTowardKitchen

  // Standard cabinet sizes for comparison
  const standardCabinetSizes = [
    { size: 30, label: '30" (vanity)' },
    { size: 34.5, label: '34.5" (standard base)' },
    { size: 36, label: '36" (tall base)' },
  ]
  const closestStandard = standardCabinetSizes.reduce((prev, curr) =>
    Math.abs(curr.size - cabinetHeight) < Math.abs(prev.size - cabinetHeight) ? curr : prev
  )
  const cabinetDiff = cabinetHeight - closestStandard.size
  const needsCustom = Math.abs(cabinetDiff) > 1

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      background: '#0f172a',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: 20
    }}>
      <style>{`
        .panel {
          background: #1e293b;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .panel-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #60a5fa;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid #334155;
        }
        .slider-group { margin-bottom: 14px; }
        .slider-label {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .slider-value {
          font-family: "SF Mono", Monaco, monospace;
          color: #60a5fa;
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          background: #1e3a5f;
          border-radius: 3px;
          -webkit-appearance: none;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider-note {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 12px;
          border-bottom: 1px solid #1e293b;
        }
        .calc-row span:first-child { color: #94a3b8; }
        .calc-row span:last-child {
          font-family: "SF Mono", Monaco, monospace;
          color: #60a5fa;
        }
        .status-ok {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-top: 8px;
        }
        .status-warn {
          background: rgba(251, 146, 60, 0.15);
          color: #fb923c;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-top: 8px;
        }
        .status-info {
          background: rgba(96, 165, 250, 0.15);
          color: #60a5fa;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-top: 8px;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          cursor: pointer;
          font-size: 12px;
          color: #94a3b8;
        }
        .checkbox-item input { accent-color: #3b82f6; }
        .comparison-box {
          background: #0d1520;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 12px;
          margin-top: 16px;
        }
        .comparison-title {
          font-size: 11px;
          font-weight: 600;
          color: #f472b6;
          margin-bottom: 8px;
        }
        .toggle-group {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }
        .toggle-btn {
          padding: 4px 10px;
          font-size: 10px;
          background: transparent;
          border: 1px solid #334155;
          color: #94a3b8;
          border-radius: 4px;
          cursor: pointer;
        }
        .toggle-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
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
      `}</style>

      <h1 style={{ color: '#60a5fa', marginBottom: 8, fontSize: 20 }}>Kitchen Floor Cabinets — Sketch</h1>
      <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 13 }}>
        Simpler alternative: standard cabinets on kitchen floor with counter overhang
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Controls */}
        <div>
          <div className="panel">
            <div className="panel-title">Dimensions</div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Step Height (fixed)</span>
                <span className="slider-value">{config.stepHeight}"</span>
              </div>
              <div style={{ padding: '6px 10px', background: '#1e3a5f', borderRadius: 4, fontSize: 11, color: '#94a3b8' }}>
                Your floor — architectural constraint
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Counter Height</span>
                <span className="slider-value">{config.counterHeight}"</span>
              </div>
              <input type="range" min="36" max="42" step="0.5" value={config.counterHeight}
                onChange={e => update('counterHeight', +e.target.value)}
              />
              <div className="slider-note">From kitchen floor (counter: 36", bar: 40-42")</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Counter Thickness</span>
                <span className="slider-value">{config.counterThickness}"</span>
              </div>
              <input type="range" min="1" max="2" step="0.25" value={config.counterThickness}
                onChange={e => update('counterThickness', +e.target.value)}
              />
              <div className="slider-note">Butcher block (1.5"+ recommended)</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Cabinet Depth</span>
                <span className="slider-value">{config.cabinetDepth}"</span>
              </div>
              <input type="range" min="12" max="24" value={config.cabinetDepth}
                onChange={e => update('cabinetDepth', +e.target.value)}
              />
              <div className="slider-note">Doors face LR (12" shallow, 24" standard)</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Overhang toward LR</span>
                <span className="slider-value">{config.overhangTowardLR}"</span>
              </div>
              <input type="range" min="0" max="12" value={config.overhangTowardLR}
                onChange={e => update('overhangTowardLR', +e.target.value)}
              />
              <div className="slider-note">Counter past step edge (needs bracket if &gt;6")</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Knee Space (kitchen side)</span>
                <span className="slider-value">{config.overhangTowardKitchen}"</span>
              </div>
              <input type="range" min="10" max="18" value={config.overhangTowardKitchen}
                onChange={e => update('overhangTowardKitchen', +e.target.value)}
              />
              <div className="slider-note">12"+ for comfortable seating</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Stool Height</span>
                <span className="slider-value">{config.stoolHeight}"</span>
              </div>
              <input type="range" min="24" max="32" value={config.stoolHeight}
                onChange={e => update('stoolHeight', +e.target.value)}
              />
              <div className="slider-note">Counter stool: 24-26", bar stool: 28-30"</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">Herb Planter</div>

            <div className="slider-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={config.planterEnabled}
                  onChange={e => update('planterEnabled', e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ color: config.planterEnabled ? '#22c55e' : '#64748b' }}>
                  Recessed planter enabled
                </span>
              </label>
            </div>

            {config.planterEnabled && (
              <>
                <div className="slider-group">
                  <div className="slider-label">
                    <span>Planter Length</span>
                    <span className="slider-value">{config.planterLength}"</span>
                  </div>
                  <input type="range" min="12" max="36" value={config.planterLength}
                    onChange={e => update('planterLength', +e.target.value)}
                  />
                  <div className="slider-note">Length along bar</div>
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <span>Planter Width</span>
                    <span className="slider-value">{config.planterWidth}"</span>
                  </div>
                  <input type="range" min="4" max="10" value={config.planterWidth}
                    onChange={e => update('planterWidth', +e.target.value)}
                  />
                  <div className="slider-note">Depth into counter</div>
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <span>Insert Depth</span>
                    <span className="slider-value">{config.planterDepth}"</span>
                  </div>
                  <input type="range" min="3" max="6" value={config.planterDepth}
                    onChange={e => update('planterDepth', +e.target.value)}
                  />
                  <div className="slider-note">How deep insert sits below counter</div>
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <span>Position from Left</span>
                    <span className="slider-value">{config.planterOffset}"</span>
                  </div>
                  <input type="range" min="0" max={config.barLength - config.planterLength} value={config.planterOffset}
                    onChange={e => update('planterOffset', +e.target.value)}
                  />
                  <div className="slider-note">Distance from left end of bar</div>
                </div>

                <div style={{ marginTop: 8, padding: 8, background: '#0d1520', borderRadius: 4, fontSize: 11 }}>
                  <div style={{ color: '#22c55e', marginBottom: 4 }}>Stainless steel insert with drain</div>
                  <div style={{ color: '#64748b' }}>Total depth: {config.counterThickness + config.planterDepth}" (counter + insert)</div>
                </div>
              </>
            )}
          </div>

          <div className="panel">
            <div className="panel-title">Calculated Values</div>

            <div className="calc-row">
              <span>Required cabinet height</span>
              <span>{cabinetHeight}"</span>
            </div>
            <div className="calc-row">
              <span>Counter from LR floor</span>
              <span>{counterFromLRFloor}"</span>
            </div>
            <div className="calc-row">
              <span>Total depth</span>
              <span>{totalDepth}"</span>
            </div>
            <div className="calc-row">
              <span>Seat-to-counter</span>
              <span>{seatToCounter}"</span>
            </div>

            {/* Standard cabinet size indicator */}
            <div style={{ marginTop: 12, padding: 10, background: '#0d1520', borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: '#64748b', marginBottom: 6 }}>CABINET SIZE CHECK</div>
              <div style={{ fontSize: 12, color: needsCustom ? '#fb923c' : '#4ade80' }}>
                {needsCustom ? (
                  <>⚠ Requires custom: {cabinetHeight}" ({cabinetDiff > 0 ? '+' : ''}{cabinetDiff.toFixed(1)}" from {closestStandard.label})</>
                ) : (
                  <>✓ Close to standard: {closestStandard.label}</>
                )}
              </div>
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 6 }}>
                Standard sizes: 30" (vanity), 34.5" (base), 36" (tall)
              </div>
            </div>

            {/* Ergonomics checks */}
            <div className={kneeSpace >= 12 ? 'status-ok' : 'status-warn'}>
              {kneeSpace >= 12 ? '✓' : '⚠'} Knee space: {kneeSpace}" {kneeSpace < 12 ? '(12"+ recommended)' : ''}
            </div>
            <div className={seatToCounter >= 10 && seatToCounter <= 14 ? 'status-ok' : 'status-warn'}>
              {seatToCounter >= 10 && seatToCounter <= 14 ? '✓' : '⚠'} Seat-to-counter: {seatToCounter}" (ideal: 10-14")
            </div>
          </div>

          {/* Comparison box */}
          <div className="comparison-box">
            <div className="comparison-title">THIS APPROACH vs. CONTINUOUS CABINET</div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#4ade80' }}>✓ Simpler build:</strong> Uses standard cabinets on kitchen floor
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#4ade80' }}>✓ Off-the-shelf:</strong> Can use pre-made cabinet boxes
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#fb923c' }}>✗ Less storage:</strong> Step area not utilized
              </div>
              <div>
                <strong style={{ color: '#fb923c' }}>✗ Step panel needed:</strong> Must finish the step face
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="panel">
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

          {activeView === 'side' && (
          <>
          <svg viewBox="0 0 520 350" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
            <defs>
              <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id={`${uniqueId}-glow`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <rect width="520" height="350" fill={`url(#${uniqueId}-grid)`}/>

            {(() => {
              const scale = 2.4
              const groundY = 300  // LR floor level
              const kitchenFloorY = groundY - config.stepHeight * scale
              const cabinetTopY = kitchenFloorY - cabinetHeight * scale
              const counterTopY = cabinetTopY - config.counterThickness * scale

              const stepX = 220  // Where step edge is
              const cabinetLeft = stepX  // Cabinet front aligns with step
              const cabinetRight = stepX + config.cabinetDepth * scale
              const counterLeft = stepX - config.overhangTowardLR * scale
              const counterRight = cabinetRight + config.overhangTowardKitchen * scale

              return (
                <g>
                  {/* Living room floor */}
                  <rect x="30" y={groundY} width={stepX - 30} height="40" fill="#1e3a5f"/>
                  <text x="100" y={groundY + 22} fill="#3b5a7a" fontSize="10">LIVING ROOM</text>

                  {/* Existing drywall half-wall (already there) */}
                  <rect
                    x={stepX - 8}
                    y={kitchenFloorY}
                    width="8"
                    height={groundY - kitchenFloorY}
                    fill="#d4c5b0"
                    stroke="#b8a890"
                    strokeWidth="1"
                  />
                  {/* Wood cap on existing half-wall */}
                  <rect
                    x={stepX - 10}
                    y={kitchenFloorY - 3}
                    width="12"
                    height="4"
                    fill="#8b6914"
                    stroke="#a07d1a"
                    strokeWidth="0.5"
                  />
                  <text x={stepX - 4} y={groundY - 15} fill="#8b7355" fontSize="7" textAnchor="middle" style={{ writingMode: 'vertical-rl' }}>EXISTING WALL</text>

                  {/* Kitchen floor */}
                  <rect x={stepX} y={kitchenFloorY} width="260" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                  <text x={stepX + 130} y={kitchenFloorY + 20} fill="#3b5a7a" fontSize="10">KITCHEN</text>

                  {/* Cabinet box - sits ON kitchen floor */}
                  <rect
                    x={cabinetLeft}
                    y={cabinetTopY}
                    width={config.cabinetDepth * scale}
                    height={cabinetHeight * scale}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  {/* Cabinet interior (cross-section view - shelves visible) */}
                  <line x1={cabinetLeft + 4} y1={cabinetTopY + cabinetHeight * scale * 0.4}
                        x2={cabinetRight - 4} y2={cabinetTopY + cabinetHeight * scale * 0.4}
                        stroke="#4a6a8a" strokeWidth="1" strokeDasharray="4,2"/>
                  <line x1={cabinetLeft + 4} y1={cabinetTopY + cabinetHeight * scale * 0.7}
                        x2={cabinetRight - 4} y2={cabinetTopY + cabinetHeight * scale * 0.7}
                        stroke="#4a6a8a" strokeWidth="1" strokeDasharray="4,2"/>
                  {/* Arrow indicating door access from LR */}
                  <path d={`M ${cabinetLeft - 8} ${(cabinetTopY + kitchenFloorY) / 2} l -12 -6 l 0 12 z`}
                        fill="#60a5fa" opacity="0.6"/>
                  <text x={cabinetLeft - 25} y={(cabinetTopY + kitchenFloorY) / 2 + 4}
                        textAnchor="end" fill="#60a5fa" fontSize="8">doors</text>

                  {/* Countertop */}
                  <rect
                    x={counterLeft}
                    y={counterTopY}
                    width={counterRight - counterLeft}
                    height={config.counterThickness * scale * 2}
                    fill="#92400e"
                    stroke="#b45309"
                    strokeWidth="1.5"
                  />
                  {/* Wood grain */}
                  <line x1={counterLeft + 8} y1={counterTopY + 3} x2={counterRight - 8} y2={counterTopY + 3} stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>

                  {/* Recessed Herb Planter - Cross Section */}
                  {config.planterEnabled && (() => {
                    const planterWidthPx = config.planterWidth * scale
                    const planterDepthPx = config.planterDepth * scale
                    const counterThickPx = config.counterThickness * scale * 2
                    // Position planter centered on cabinet, toward LR side
                    const planterCenterX = stepX + config.cabinetDepth * scale * 0.4
                    const planterLeft = planterCenterX - planterWidthPx / 2
                    return (
                      <g>
                        {/* Cutout showing depth */}
                        <rect
                          x={planterLeft}
                          y={counterTopY}
                          width={planterWidthPx}
                          height={counterThickPx + planterDepthPx}
                          fill="#1e3a5f"
                          stroke="#475569"
                          strokeWidth="1"
                        />
                        {/* Stainless steel insert */}
                        <rect
                          x={planterLeft + 2}
                          y={counterTopY + 2}
                          width={planterWidthPx - 4}
                          height={counterThickPx + planterDepthPx - 4}
                          fill="#334155"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                          rx="1"
                        />
                        {/* Soil/herbs indicator */}
                        <rect
                          x={planterLeft + 4}
                          y={counterTopY + counterThickPx - 4}
                          width={planterWidthPx - 8}
                          height={planterDepthPx - 6}
                          fill="#3d2817"
                          rx="1"
                        />
                        {/* Herb sprouts */}
                        <path d={`M ${planterCenterX - 6} ${counterTopY + counterThickPx - 8} q 0 -8 4 -14`} stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                        <path d={`M ${planterCenterX + 2} ${counterTopY + counterThickPx - 8} q 0 -10 -3 -16`} stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                        <path d={`M ${planterCenterX + 8} ${counterTopY + counterThickPx - 8} q 0 -6 2 -12`} stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                        {/* Dimension line for planter depth */}
                        <line x1={planterLeft - 8} y1={counterTopY} x2={planterLeft - 8} y2={counterTopY + counterThickPx + planterDepthPx} stroke="#22c55e" strokeWidth="0.5"/>
                        <text x={planterLeft - 12} y={counterTopY + (counterThickPx + planterDepthPx) / 2} textAnchor="end" fill="#22c55e" fontSize="8" fontFamily="monospace">{config.planterDepth + config.counterThickness}"</text>
                        {/* Label */}
                        <text x={planterCenterX} y={counterTopY - 8} textAnchor="middle" fill="#22c55e" fontSize="8">planter</text>
                      </g>
                    )
                  })()}

                  {/* Support bracket for LR overhang (if > 6") */}
                  {config.overhangTowardLR > 6 && (
                    <path
                      d={`M ${stepX} ${counterTopY + config.counterThickness * scale * 2}
                          L ${stepX} ${counterTopY + 45}
                          L ${counterLeft + 12} ${counterTopY + config.counterThickness * scale * 2}`}
                      fill="none" stroke="#9ca3af" strokeWidth="3"
                    />
                  )}

                  {/* Person on kitchen side - facing LEFT (toward LR) */}
                  {(() => {
                    const stoolY = kitchenFloorY - config.stoolHeight * scale
                    const px = cabinetRight + config.overhangTowardKitchen * scale / 2
                    return (
                      <g opacity="0.7">
                        {/* Stool */}
                        <rect x={px - 12} y={stoolY} width="24" height="4" fill="#475569" rx="2"/>
                        <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#475569"/>
                        <rect x={px - 10} y={kitchenFloorY - 4} width="20" height="4" fill="#475569" rx="2"/>
                        {/* Person */}
                        <ellipse cx={px} cy={stoolY - 42} rx="10" ry="12" fill="#5a7a9a"/>
                        <rect x={px - 10} y={stoolY - 30} width="20" height="32" fill="#5a7a9a" rx="3"/>
                        {/* Arm toward counter */}
                        <rect x={px - 32} y={stoolY - 24} width="22" height="5" fill="#5a7a9a" rx="2"/>
                      </g>
                    )
                  })()}

                  {/* DIMENSIONS */}

                  {/* Step height */}
                  <g>
                    <line x1="60" y1={groundY} x2="60" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="55" y1={groundY} x2="65" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="55" y1={kitchenFloorY} x2="65" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <text x="50" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="11" fontFamily="monospace">{config.stepHeight}"</text>
                    <text x="50" y={(groundY + kitchenFloorY) / 2 + 16} textAnchor="end" fill="#64748b" fontSize="8">step</text>
                  </g>

                  {/* Cabinet height */}
                  <g>
                    <line x1={cabinetRight + 15} y1={kitchenFloorY} x2={cabinetRight + 15} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={cabinetRight + 10} y1={kitchenFloorY} x2={cabinetRight + 20} y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={cabinetRight + 10} y1={cabinetTopY} x2={cabinetRight + 20} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
                    <text x={cabinetRight + 25} y={(kitchenFloorY + cabinetTopY) / 2} fill="#4ade80" fontSize="10" fontFamily="monospace">{cabinetHeight}"</text>
                    <text x={cabinetRight + 25} y={(kitchenFloorY + cabinetTopY) / 2 + 12} fill="#64748b" fontSize="8">cabinet</text>
                  </g>

                  {/* Counter height from kitchen floor */}
                  <g>
                    <line x1={counterRight + 35} y1={kitchenFloorY} x2={counterRight + 35} y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1={counterRight + 30} y1={kitchenFloorY} x2={counterRight + 40} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1={counterRight + 30} y1={counterTopY} x2={counterRight + 40} y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                    <text x={counterRight + 45} y={(kitchenFloorY + counterTopY) / 2} fill="#60a5fa" fontSize="11" fontFamily="monospace">{config.counterHeight}"</text>
                    <text x={counterRight + 45} y={(kitchenFloorY + counterTopY) / 2 + 12} fill="#64748b" fontSize="8">counter</text>
                  </g>

                  {/* Counter from LR floor */}
                  <g>
                    <line x1={counterLeft - 15} y1={groundY} x2={counterLeft - 15} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                    <line x1={counterLeft - 20} y1={groundY} x2={counterLeft - 10} y2={groundY} stroke="#f472b6" strokeWidth="1"/>
                    <line x1={counterLeft - 20} y1={counterTopY} x2={counterLeft - 10} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                    <text x={counterLeft - 25} y={(groundY + counterTopY) / 2} textAnchor="end" fill="#f472b6" fontSize="11" fontFamily="monospace">{counterFromLRFloor}"</text>
                    <text x={counterLeft - 25} y={(groundY + counterTopY) / 2 + 12} textAnchor="end" fill="#64748b" fontSize="8">from LR</text>
                  </g>

                  {/* LR overhang */}
                  {config.overhangTowardLR > 0 && (
                    <g>
                      <line x1={counterLeft} y1={counterTopY - 18} x2={stepX} y2={counterTopY - 18} stroke="#fbbf24" strokeWidth="1"/>
                      <line x1={counterLeft} y1={counterTopY - 22} x2={counterLeft} y2={counterTopY - 14} stroke="#fbbf24" strokeWidth="1"/>
                      <line x1={stepX} y1={counterTopY - 22} x2={stepX} y2={counterTopY - 14} stroke="#fbbf24" strokeWidth="1"/>
                      <text x={(counterLeft + stepX) / 2} y={counterTopY - 24} textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">{config.overhangTowardLR}" overhang</text>
                    </g>
                  )}

                  {/* Knee space */}
                  <g>
                    <line x1={cabinetRight} y1={counterTopY - 18} x2={counterRight} y2={counterTopY - 18} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={cabinetRight} y1={counterTopY - 22} x2={cabinetRight} y2={counterTopY - 14} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={counterRight} y1={counterTopY - 22} x2={counterRight} y2={counterTopY - 14} stroke="#4ade80" strokeWidth="1"/>
                    <text x={(cabinetRight + counterRight) / 2} y={counterTopY - 24} textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">{config.overhangTowardKitchen}" knee</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">SIDE SECTION</text>
                  <text x="30" y="42" fill="#64748b" fontSize="10">Cabinet on kitchen floor, counter overhangs both sides</text>

                  {/* Step panel label */}
                </g>
              )
            })()}
          </svg>

          {/* Explanation */}
          <div style={{ marginTop: 16, padding: 12, background: '#0d1520', borderRadius: 6, fontSize: 12, lineHeight: 1.6 }}>
            <strong style={{ color: '#60a5fa' }}>How this design works:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: '#94a3b8' }}>
              <li>Standard cabinets ({cabinetHeight}" tall) sit on <span style={{ color: '#4ade80' }}>kitchen floor</span></li>
              <li><span style={{ color: '#60a5fa' }}>Cabinet doors face living room</span> (access from LR side)</li>
              <li>Countertop overhangs <span style={{ color: '#fbbf24' }}>{config.overhangTowardLR}"</span> toward living room</li>
              <li>Seating on kitchen side with <span style={{ color: '#4ade80' }}>{config.overhangTowardKitchen}" knee space</span></li>
              <li><span style={{ color: '#d4c5b0' }}>Existing drywall half-wall</span> stays in place (just remove metal railing)</li>
              {config.overhangTowardLR > 6 && <li>Steel bracket supports the LR overhang</li>}
              {needsCustom && <li style={{ color: '#fb923c' }}>Note: {cabinetHeight}" cabinet requires custom build (not standard size)</li>}
            </ul>
          </div>
          </>
          )}

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

                    {/* Existing drywall half-wall (below kitchen floor) */}
                    <rect
                      x={startX}
                      y={kitchenFloorY}
                      width={barLengthPx}
                      height={stepHeightPx}
                      fill="#d4c5b0"
                      stroke="#b8a890"
                      strokeWidth="1"
                    />
                    {/* Wood cap on existing half-wall */}
                    <rect
                      x={startX - 3}
                      y={kitchenFloorY - 4}
                      width={barLengthPx + 6}
                      height="5"
                      fill="#8b6914"
                      stroke="#a07d1a"
                      strokeWidth="0.5"
                    />
                    <text x={startX + barLengthPx / 2} y={kitchenFloorY + stepHeightPx / 2 + 4} textAnchor="middle" fill="#8b7355" fontSize="10">EXISTING DRYWALL HALF-WALL</text>

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

                    {/* Recessed Herb Planter */}
                    {config.planterEnabled && (() => {
                      const planterX = startX + config.planterOffset * scale
                      const planterW = config.planterLength * scale
                      return (
                        <g>
                          {/* Cutout in butcher block */}
                          <rect
                            x={planterX}
                            y={counterTopY + 2}
                            width={planterW}
                            height={counterThickPx - 4}
                            fill="#1e3a5f"
                            stroke="#475569"
                            strokeWidth="1"
                          />
                          {/* Stainless steel insert rim */}
                          <rect
                            x={planterX + 2}
                            y={counterTopY + 3}
                            width={planterW - 4}
                            height={counterThickPx - 6}
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                            rx="1"
                          />
                          {/* Herb icons */}
                          <text x={planterX + planterW * 0.25} y={counterTopY + counterThickPx / 2 + 2} textAnchor="middle" fill="#22c55e" fontSize="8">🌿</text>
                          <text x={planterX + planterW * 0.5} y={counterTopY + counterThickPx / 2 + 2} textAnchor="middle" fill="#22c55e" fontSize="8">🌱</text>
                          <text x={planterX + planterW * 0.75} y={counterTopY + counterThickPx / 2 + 2} textAnchor="middle" fill="#22c55e" fontSize="8">🌿</text>
                          {/* Label */}
                          <text x={planterX + planterW / 2} y={counterTopY - 8} textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="monospace">{config.planterLength}" planter</text>
                        </g>
                      )
                    })()}

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
                <li>Existing drywall half-wall remains below cabinet (railing removed)</li>
              </ul>
            </div>
          </>
          )}

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

          {activeView === 'construction' && (
          <div style={{ background: '#0d1520', borderRadius: 4, padding: 20 }}>
            <h3 style={{ color: '#60a5fa', margin: '0 0 16px 0', fontSize: 14 }}>FRAMING DIAGRAMS</h3>

            {/* 2x2 Grid of Framing Views */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

              {/* 1. CABINET CARCASS */}
              <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                {(() => {
                  // Cabinet box skeleton - 3D-ish view
                  const boxW = 180
                  const boxH = 120
                  const boxD = 40  // depth for 3D effect
                  const startX = 50
                  const startY = 50
                  const matThick = 6  // 3/4" material thickness shown

                  return (
                    <g>
                      <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">CABINET CARCASS</text>
                      <text x="14" y="32" fill="#64748b" fontSize="8">Box skeleton (3/4" plywood)</text>

                      {/* Back panel (behind) */}
                      <rect x={startX + boxD} y={startY} width={boxW} height={boxH} fill="none" stroke="#4a6a8a" strokeWidth="1.5"/>

                      {/* Left side panel */}
                      <polygon
                        points={`${startX},${startY + boxD} ${startX + boxD},${startY} ${startX + boxD},${startY + boxH} ${startX},${startY + boxH + boxD}`}
                        fill="none" stroke="#60a5fa" strokeWidth="2"
                      />
                      <text x={startX - 8} y={startY + boxH/2 + boxD/2} fill="#60a5fa" fontSize="7" transform={`rotate(-90 ${startX - 8} ${startY + boxH/2 + boxD/2})`} textAnchor="middle">SIDE</text>

                      {/* Right side panel */}
                      <polygon
                        points={`${startX + boxW},${startY + boxD} ${startX + boxW + boxD},${startY} ${startX + boxW + boxD},${startY + boxH} ${startX + boxW},${startY + boxH + boxD}`}
                        fill="none" stroke="#60a5fa" strokeWidth="2"
                      />

                      {/* Bottom panel */}
                      <polygon
                        points={`${startX},${startY + boxH + boxD} ${startX + boxD},${startY + boxH} ${startX + boxW + boxD},${startY + boxH} ${startX + boxW},${startY + boxH + boxD}`}
                        fill="none" stroke="#4ade80" strokeWidth="2"
                      />
                      <text x={startX + boxW/2 + boxD/2} y={startY + boxH + boxD + 14} fill="#4ade80" fontSize="7" textAnchor="middle">BOTTOM</text>

                      {/* Top stretchers (not full panel - just front/back rails) */}
                      <line x1={startX} y1={startY + boxD} x2={startX + boxW} y2={startY + boxD} stroke="#fbbf24" strokeWidth="2"/>
                      <line x1={startX + boxD} y1={startY} x2={startX + boxW + boxD} y2={startY} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2"/>
                      <text x={startX + boxW/2} y={startY + boxD - 6} fill="#fbbf24" fontSize="7" textAnchor="middle">TOP STRETCHERS</text>

                      {/* Shelf dado lines on side panel */}
                      <line x1={startX + 2} y1={startY + boxD + boxH * 0.4} x2={startX + boxD - 2} y2={startY + boxH * 0.4} stroke="#f472b6" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1={startX + 2} y1={startY + boxD + boxH * 0.7} x2={startX + boxD - 2} y2={startY + boxH * 0.7} stroke="#f472b6" strokeWidth="1" strokeDasharray="2,2"/>
                      <text x={startX + boxD + 4} y={startY + boxH * 0.55} fill="#f472b6" fontSize="6">dadoes</text>

                      {/* Legend */}
                      <g transform="translate(14, 165)">
                        <line x1="0" y1="0" x2="12" y2="0" stroke="#60a5fa" strokeWidth="2"/>
                        <text x="16" y="3" fill="#94a3b8" fontSize="7">Sides</text>
                        <line x1="55" y1="0" x2="67" y2="0" stroke="#4ade80" strokeWidth="2"/>
                        <text x="71" y="3" fill="#94a3b8" fontSize="7">Bottom</text>
                        <line x1="110" y1="0" x2="122" y2="0" stroke="#fbbf24" strokeWidth="2"/>
                        <text x="126" y="3" fill="#94a3b8" fontSize="7">Stretchers</text>
                      </g>

                      {/* Dimensions */}
                      <text x="265" y="85" fill="#64748b" fontSize="8" textAnchor="end">{cabinetHeight}"h</text>
                      <text x="265" y="97" fill="#64748b" fontSize="8" textAnchor="end">{config.cabinetDepth}"d</text>
                      <text x="265" y="109" fill="#64748b" fontSize="8" textAnchor="end">{config.barLength}"w</text>
                    </g>
                  )
                })()}
              </svg>

              {/* 2. FACE FRAME */}
              <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                {(() => {
                  const frameW = 200
                  const frameH = 130
                  const startX = 40
                  const startY = 45
                  const stileW = 8
                  const railH = 8
                  const numDoors = 3
                  const openingW = (frameW - (numDoors + 1) * stileW) / numDoors

                  return (
                    <g>
                      <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">FACE FRAME</text>
                      <text x="14" y="32" fill="#64748b" fontSize="8">Rails and stiles (3/4" x 1.5" hardwood)</text>

                      {/* Top rail */}
                      <rect x={startX} y={startY} width={frameW} height={railH} fill="none" stroke="#fbbf24" strokeWidth="2"/>
                      <text x={startX + frameW/2} y={startY - 4} fill="#fbbf24" fontSize="7" textAnchor="middle">TOP RAIL</text>

                      {/* Bottom rail */}
                      <rect x={startX} y={startY + frameH - railH} width={frameW} height={railH} fill="none" stroke="#fbbf24" strokeWidth="2"/>
                      <text x={startX + frameW/2} y={startY + frameH + 12} fill="#fbbf24" fontSize="7" textAnchor="middle">BOTTOM RAIL</text>

                      {/* Stiles (vertical) */}
                      {Array.from({ length: numDoors + 1 }).map((_, i) => {
                        const x = startX + i * (openingW + stileW)
                        return (
                          <rect key={i} x={x} y={startY} width={stileW} height={frameH} fill="none" stroke="#60a5fa" strokeWidth="2"/>
                        )
                      })}
                      <text x={startX - 4} y={startY + frameH/2} fill="#60a5fa" fontSize="7" textAnchor="end" transform={`rotate(-90 ${startX - 4} ${startY + frameH/2})`}>STILE</text>

                      {/* Door openings labeled */}
                      {Array.from({ length: numDoors }).map((_, i) => {
                        const x = startX + stileW + i * (openingW + stileW)
                        return (
                          <g key={i}>
                            <rect x={x + 4} y={startY + railH + 4} width={openingW - 8} height={frameH - railH * 2 - 8} fill="#1e3a5f" opacity="0.3" rx="2"/>
                            <text x={x + openingW/2} y={startY + frameH/2} fill="#4a6a8a" fontSize="8" textAnchor="middle">DOOR {i + 1}</text>
                            <text x={x + openingW/2} y={startY + frameH/2 + 12} fill="#64748b" fontSize="7" textAnchor="middle">{Math.round(config.barLength / 3)}"w</text>
                          </g>
                        )
                      })}

                      {/* Hinge indicators */}
                      {Array.from({ length: numDoors }).map((_, i) => {
                        const x = startX + stileW + i * (openingW + stileW) + openingW - 4
                        return (
                          <g key={i}>
                            <circle cx={x} cy={startY + railH + 15} r="3" fill="#f472b6"/>
                            <circle cx={x} cy={startY + frameH - railH - 15} r="3" fill="#f472b6"/>
                          </g>
                        )
                      })}
                      <text x={startX + frameW + 8} y={startY + railH + 18} fill="#f472b6" fontSize="6">hinges</text>

                      {/* Legend */}
                      <g transform="translate(14, 185)">
                        <rect x="0" y="-4" width="10" height="6" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
                        <text x="14" y="0" fill="#94a3b8" fontSize="7">Rails (horiz)</text>
                        <rect x="75" y="-4" width="6" height="10" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
                        <text x="85" y="2" fill="#94a3b8" fontSize="7">Stiles (vert)</text>
                        <circle cx="150" cy="0" r="3" fill="#f472b6"/>
                        <text x="156" y="2" fill="#94a3b8" fontSize="7">Hinges</text>
                      </g>
                    </g>
                  )
                })()}
              </svg>

              {/* 3. COUNTER ATTACHMENT */}
              <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                {(() => {
                  const cabinetW = 140
                  const cabinetH = 70
                  const counterH = 12
                  const startX = 70
                  const startY = 70
                  const overhangL = 30  // LR side
                  const overhangR = 40  // Kitchen side

                  return (
                    <g>
                      <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">COUNTER ATTACHMENT</text>
                      <text x="14" y="32" fill="#64748b" fontSize="8">How butcher block secures to cabinet</text>

                      {/* Cabinet box (side section view) */}
                      <rect x={startX} y={startY} width={cabinetW} height={cabinetH} fill="#1e3a5f" stroke="#4a6a8a" strokeWidth="1.5"/>
                      <text x={startX + cabinetW/2} y={startY + cabinetH/2 + 4} fill="#4a6a8a" fontSize="8" textAnchor="middle">CABINET</text>

                      {/* Counter top */}
                      <rect x={startX - overhangL} y={startY - counterH} width={cabinetW + overhangL + overhangR} height={counterH} fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
                      <text x={startX + cabinetW/2} y={startY - counterH/2 + 3} fill="#fcd34d" fontSize="7" textAnchor="middle">BUTCHER BLOCK</text>

                      {/* Corner brackets (inside cabinet, screwed up into counter) */}
                      <g>
                        {/* Left bracket */}
                        <path d={`M ${startX + 15} ${startY} L ${startX + 15} ${startY - 8} L ${startX + 25} ${startY - 8}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                        <circle cx={startX + 20} cy={startY - 5} r="2" fill="#4ade80"/>

                        {/* Middle bracket */}
                        <path d={`M ${startX + cabinetW/2 - 5} ${startY} L ${startX + cabinetW/2 - 5} ${startY - 8} L ${startX + cabinetW/2 + 5} ${startY - 8}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                        <circle cx={startX + cabinetW/2} cy={startY - 5} r="2" fill="#4ade80"/>

                        {/* Right bracket */}
                        <path d={`M ${startX + cabinetW - 15} ${startY} L ${startX + cabinetW - 15} ${startY - 8} L ${startX + cabinetW - 25} ${startY - 8}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                        <circle cx={startX + cabinetW - 20} cy={startY - 5} r="2" fill="#4ade80"/>
                      </g>
                      <text x={startX + cabinetW + 8} y={startY - 2} fill="#4ade80" fontSize="7">L-brackets</text>
                      <text x={startX + cabinetW + 8} y={startY + 8} fill="#64748b" fontSize="6">(screw up)</text>

                      {/* Slotted holes note for wood movement */}
                      <g transform={`translate(${startX + 45}, ${startY + 15})`}>
                        <rect x="0" y="0" width="50" height="20" fill="#0a0f18" stroke="#fbbf24" strokeWidth="1" rx="2"/>
                        <text x="25" y="9" fill="#fbbf24" fontSize="6" textAnchor="middle">SLOTTED</text>
                        <text x="25" y="16" fill="#fbbf24" fontSize="6" textAnchor="middle">HOLES</text>
                      </g>
                      <path d={`M ${startX + 70} ${startY + 35} L ${startX + 70} ${startY + 45}`} stroke="#fbbf24" strokeWidth="1"/>
                      <text x={startX + 72} y={startY + 55} fill="#64748b" fontSize="6">allows wood</text>
                      <text x={startX + 72} y={startY + 63} fill="#64748b" fontSize="6">expansion</text>

                      {/* LR overhang support bracket (if needed) */}
                      {config.overhangTowardLR > 6 && (
                        <g>
                          <path d={`M ${startX} ${startY} L ${startX} ${startY - counterH + 2} L ${startX - overhangL + 10} ${startY - counterH + 2}`} fill="none" stroke="#f472b6" strokeWidth="3"/>
                          <text x={startX - overhangL/2} y={startY + 12} fill="#f472b6" fontSize="7" textAnchor="middle">STEEL</text>
                          <text x={startX - overhangL/2} y={startY + 20} fill="#f472b6" fontSize="7" textAnchor="middle">BRACKET</text>
                        </g>
                      )}

                      {/* Dimension: overhang amounts */}
                      <g>
                        <line x1={startX - overhangL} y1={startY - counterH - 8} x2={startX} y2={startY - counterH - 8} stroke="#fb923c" strokeWidth="1"/>
                        <text x={startX - overhangL/2} y={startY - counterH - 12} fill="#fb923c" fontSize="7" textAnchor="middle">{config.overhangTowardLR}"</text>

                        <line x1={startX + cabinetW} y1={startY - counterH - 8} x2={startX + cabinetW + overhangR} y2={startY - counterH - 8} stroke="#4ade80" strokeWidth="1"/>
                        <text x={startX + cabinetW + overhangR/2} y={startY - counterH - 12} fill="#4ade80" fontSize="7" textAnchor="middle">{config.overhangTowardKitchen}"</text>
                      </g>

                      {/* Zone labels */}
                      <text x={startX - overhangL/2} y={startY + cabinetH + 15} fill="#64748b" fontSize="7" textAnchor="middle">LR SIDE</text>
                      <text x={startX + cabinetW + overhangR/2} y={startY + cabinetH + 15} fill="#64748b" fontSize="7" textAnchor="middle">KITCHEN</text>

                      {/* Legend */}
                      <g transform="translate(14, 175)">
                        <path d="M 0 0 L 8 0 L 8 -6" fill="none" stroke="#4ade80" strokeWidth="2"/>
                        <text x="12" y="0" fill="#94a3b8" fontSize="7">L-brackets</text>
                        {config.overhangTowardLR > 6 && (
                          <>
                            <path d="M 70 0 L 70 -6 L 78 -6" fill="none" stroke="#f472b6" strokeWidth="2"/>
                            <text x="82" y="0" fill="#94a3b8" fontSize="7">Steel support</text>
                          </>
                        )}
                      </g>
                    </g>
                  )
                })()}
              </svg>

              {/* 4. EXISTING WALL PREP */}
              <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                <g>
                  <text x="14" y="20" fill="#d4c5b0" fontSize="10" fontWeight="600">EXISTING WALL PREP</text>
                  <text x="14" y="32" fill="#64748b" fontSize="8">Railing removal and patching</text>

                  {/* Existing drywall half-wall */}
                  <rect x="50" y="50" width="180" height="90" fill="#d4c5b0" stroke="#b8a890" strokeWidth="1"/>
                  <text x="140" y="100" fill="#8b7355" fontSize="9" textAnchor="middle">EXISTING DRYWALL</text>
                  <text x="140" y="112" fill="#8b7355" fontSize="7" textAnchor="middle">HALF-WALL</text>

                  {/* Wood cap */}
                  <rect x="45" y="45" width="190" height="8" fill="#8b6914" stroke="#a07d1a" strokeWidth="0.5"/>
                  <text x="140" y="42" fill="#a07d1a" fontSize="7" textAnchor="middle">wood cap (keep or replace)</text>

                  {/* Railing mount holes to patch */}
                  <circle cx="80" cy="55" r="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1"/>
                  <circle cx="140" cy="55" r="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1"/>
                  <circle cx="200" cy="55" r="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1"/>

                  {/* Callout for holes */}
                  <line x1="200" y1="55" x2="240" y2="40" stroke="#ef4444" strokeWidth="0.5"/>
                  <text x="242" y="38" fill="#ef4444" fontSize="6">patch holes</text>
                  <text x="242" y="46" fill="#64748b" fontSize="5">(spackle + paint)</text>

                  {/* Floor labels */}
                  <rect x="30" y="140" width="220" height="20" fill="#234060" stroke="#3b5a7a" strokeWidth="1"/>
                  <text x="140" y="154" fill="#3b5a7a" fontSize="8" textAnchor="middle">KITCHEN FLOOR</text>

                  <rect x="30" y="160" width="100" height="30" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="1"/>
                  <text x="80" y="180" fill="#3b5a7a" fontSize="8" textAnchor="middle">LR FLOOR</text>

                  {/* Steps checklist */}
                  <g transform="translate(14, 175)">
                    <text x="0" y="0" fill="#4ade80" fontSize="6">✓ Remove metal railing</text>
                    <text x="90" y="0" fill="#4ade80" fontSize="6">✓ Patch screw holes</text>
                    <text x="175" y="0" fill="#4ade80" fontSize="6">✓ Touch up paint</text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Construction Side Section with Callouts */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Construction Side Section</h4>
              <svg viewBox="0 0 700 380" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                {(() => {
                  const scale = 2.2
                  const groundY = 320
                  const kitchenFloorY = groundY - config.stepHeight * scale
                  const cabinetTopY = kitchenFloorY - cabinetHeight * scale
                  const counterTopY = cabinetTopY - config.counterThickness * scale

                  const stepX = 250
                  const cabinetLeft = stepX
                  const cabinetRight = stepX + config.cabinetDepth * scale
                  const counterLeft = stepX - config.overhangTowardLR * scale
                  const counterRight = cabinetRight + config.overhangTowardKitchen * scale

                  // Callout positions
                  const callouts = [
                    { id: 1, x: counterLeft + 40, y: counterTopY + 4, label: 'Butcher Block', detail: `${config.counterThickness}" thick`, color: '#b45309', targetX: counterLeft + 80, targetY: counterTopY + 8 },
                    { id: 2, x: cabinetLeft + config.cabinetDepth * scale / 2, y: cabinetTopY + cabinetHeight * scale / 2, label: 'Cabinet Box', detail: `${cabinetHeight}"h × ${config.cabinetDepth}"d`, color: '#60a5fa', targetX: cabinetLeft + 20, targetY: cabinetTopY + 40 },
                    { id: 3, x: stepX - 10, y: kitchenFloorY + (groundY - kitchenFloorY) / 2, label: 'Existing Wall', detail: `drywall, ${config.stepHeight}"h`, color: '#b8a890', targetX: stepX - 6, targetY: kitchenFloorY + 30 },
                    { id: 4, x: cabinetRight + config.overhangTowardKitchen * scale / 2, y: counterTopY - 15, label: 'Knee Space', detail: `${config.overhangTowardKitchen}" overhang`, color: '#4ade80', targetX: cabinetRight + 15, targetY: counterTopY + 5 },
                  ]

                  return (
                    <g>
                      {/* Title */}
                      <text x="20" y="25" fill="#60a5fa" fontSize="11" fontWeight="600">CROSS-SECTION WITH CALLOUTS</text>
                      <text x="20" y="40" fill="#64748b" fontSize="9">Material thicknesses and connection points</text>

                      {/* Living room floor */}
                      <rect x="40" y={groundY} width={stepX - 40} height="35" fill="#1e3a5f"/>
                      <text x="120" y={groundY + 22} fill="#3b5a7a" fontSize="10">LR FLOOR</text>

                      {/* Existing drywall half-wall */}
                      <rect
                        x={stepX - 10}
                        y={kitchenFloorY}
                        width="10"
                        height={groundY - kitchenFloorY}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                        strokeWidth="1"
                      />
                      {/* Wood cap on half-wall */}
                      <rect
                        x={stepX - 12}
                        y={kitchenFloorY - 4}
                        width="14"
                        height="5"
                        fill="#8b6914"
                        stroke="#a07d1a"
                        strokeWidth="0.5"
                      />

                      {/* Kitchen floor */}
                      <rect x={stepX} y={kitchenFloorY} width="280" height={groundY - kitchenFloorY + 35} fill="#234060"/>
                      <text x={stepX + 140} y={kitchenFloorY + 18} fill="#3b5a7a" fontSize="10">KITCHEN FLOOR</text>

                      {/* Cabinet box - with interior detail */}
                      <rect
                        x={cabinetLeft}
                        y={cabinetTopY}
                        width={config.cabinetDepth * scale}
                        height={cabinetHeight * scale}
                        fill="#1e3a5f"
                        stroke="#60a5fa"
                        strokeWidth="2"
                      />
                      {/* Cabinet sides (3/4" thick) */}
                      <rect x={cabinetLeft} y={cabinetTopY} width="4" height={cabinetHeight * scale} fill="#2d4a6a" stroke="#4a6a8a" strokeWidth="0.5"/>
                      <rect x={cabinetRight - 4} y={cabinetTopY} width="4" height={cabinetHeight * scale} fill="#2d4a6a" stroke="#4a6a8a" strokeWidth="0.5"/>
                      {/* Cabinet bottom */}
                      <rect x={cabinetLeft} y={kitchenFloorY - 4} width={config.cabinetDepth * scale} height="4" fill="#2d4a6a" stroke="#4a6a8a" strokeWidth="0.5"/>
                      {/* Shelves */}
                      <line x1={cabinetLeft + 6} y1={cabinetTopY + cabinetHeight * scale * 0.4} x2={cabinetRight - 6} y2={cabinetTopY + cabinetHeight * scale * 0.4} stroke="#4a6a8a" strokeWidth="2"/>
                      <line x1={cabinetLeft + 6} y1={cabinetTopY + cabinetHeight * scale * 0.7} x2={cabinetRight - 6} y2={cabinetTopY + cabinetHeight * scale * 0.7} stroke="#4a6a8a" strokeWidth="2"/>

                      {/* Countertop */}
                      <rect
                        x={counterLeft}
                        y={counterTopY}
                        width={counterRight - counterLeft}
                        height={config.counterThickness * scale * 2.5}
                        fill="#92400e"
                        stroke="#b45309"
                        strokeWidth="2"
                      />
                      {/* Wood grain */}
                      <line x1={counterLeft + 10} y1={counterTopY + 4} x2={counterRight - 10} y2={counterTopY + 4} stroke="#78350f" strokeWidth="0.5" opacity="0.6"/>

                      {/* L-brackets (counter to cabinet) */}
                      <g>
                        <path d={`M ${cabinetLeft + 15} ${cabinetTopY} L ${cabinetLeft + 15} ${cabinetTopY - 6} L ${cabinetLeft + 25} ${cabinetTopY - 6}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                        <path d={`M ${cabinetRight - 15} ${cabinetTopY} L ${cabinetRight - 15} ${cabinetTopY - 6} L ${cabinetRight - 25} ${cabinetTopY - 6}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                      </g>

                      {/* Support bracket for LR overhang (if > 6") */}
                      {config.overhangTowardLR > 6 && (
                        <g>
                          <path
                            d={`M ${stepX} ${counterTopY + config.counterThickness * scale * 2.5}
                                L ${stepX} ${counterTopY + 50}
                                L ${counterLeft + 15} ${counterTopY + config.counterThickness * scale * 2.5}`}
                            fill="none" stroke="#9ca3af" strokeWidth="4"
                          />
                          <text x={stepX - 25} y={counterTopY + 40} fill="#9ca3af" fontSize="8" textAnchor="end">STEEL</text>
                          <text x={stepX - 25} y={counterTopY + 50} fill="#9ca3af" fontSize="8" textAnchor="end">BRACKET</text>
                        </g>
                      )}

                      {/* Cleats for step panel */}
                      {config.showStepPanel && (
                        <g>
                          <rect x={stepX - 2} y={kitchenFloorY + 8} width="8" height="8" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
                          <rect x={stepX - 2} y={groundY - 20} width="8" height="8" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
                          <text x={stepX + 12} y={kitchenFloorY + 15} fill="#4ade80" fontSize="7">cleat</text>
                        </g>
                      )}

                      {/* CALLOUT LINES AND LABELS */}
                      {/* Callout 1: Butcher Block */}
                      <g>
                        <line x1={counterLeft + 60} y1={counterTopY - 25} x2={counterLeft + 60} y2={counterTopY + 3} stroke="#b45309" strokeWidth="1"/>
                        <circle cx={counterLeft + 60} cy={counterTopY + 3} r="3" fill="#b45309"/>
                        <rect x={counterLeft + 20} y={counterTopY - 55} width="80" height="28" fill="#0a0f18" stroke="#b45309" strokeWidth="1" rx="3"/>
                        <text x={counterLeft + 60} y={counterTopY - 42} fill="#b45309" fontSize="9" textAnchor="middle" fontWeight="600">BUTCHER BLOCK</text>
                        <text x={counterLeft + 60} y={counterTopY - 30} fill="#94a3b8" fontSize="8" textAnchor="middle">{config.counterThickness}" thick × {totalDepth}"d</text>
                      </g>

                      {/* Callout 2: Cabinet Box */}
                      <g>
                        <line x1={cabinetRight + 25} y1={cabinetTopY + cabinetHeight * scale / 2} x2={cabinetRight + 60} y2={cabinetTopY + cabinetHeight * scale / 2} stroke="#60a5fa" strokeWidth="1"/>
                        <circle cx={cabinetRight + 2} cy={cabinetTopY + cabinetHeight * scale / 2} r="3" fill="#60a5fa"/>
                        <rect x={cabinetRight + 62} y={cabinetTopY + cabinetHeight * scale / 2 - 22} width="95" height="44" fill="#0a0f18" stroke="#60a5fa" strokeWidth="1" rx="3"/>
                        <text x={cabinetRight + 110} y={cabinetTopY + cabinetHeight * scale / 2 - 8} fill="#60a5fa" fontSize="9" textAnchor="middle" fontWeight="600">CABINET BOX</text>
                        <text x={cabinetRight + 110} y={cabinetTopY + cabinetHeight * scale / 2 + 5} fill="#94a3b8" fontSize="8" textAnchor="middle">{cabinetHeight}"h × {config.cabinetDepth}"d</text>
                        <text x={cabinetRight + 110} y={cabinetTopY + cabinetHeight * scale / 2 + 17} fill="#64748b" fontSize="7" textAnchor="middle">3/4" plywood</text>
                      </g>

                      {/* Callout 3: Existing Wall */}
                      <g>
                        <line x1={stepX - 45} y1={kitchenFloorY + (groundY - kitchenFloorY) / 2} x2={stepX - 10} y2={kitchenFloorY + (groundY - kitchenFloorY) / 2} stroke="#b8a890" strokeWidth="1"/>
                        <circle cx={stepX - 8} cy={kitchenFloorY + (groundY - kitchenFloorY) / 2} r="3" fill="#b8a890"/>
                        <rect x={stepX - 130} y={kitchenFloorY + (groundY - kitchenFloorY) / 2 - 22} width="82" height="44" fill="#0a0f18" stroke="#b8a890" strokeWidth="1" rx="3"/>
                        <text x={stepX - 89} y={kitchenFloorY + (groundY - kitchenFloorY) / 2 - 8} fill="#d4c5b0" fontSize="9" textAnchor="middle" fontWeight="600">EXISTING WALL</text>
                        <text x={stepX - 89} y={kitchenFloorY + (groundY - kitchenFloorY) / 2 + 5} fill="#94a3b8" fontSize="8" textAnchor="middle">{config.stepHeight}"h drywall</text>
                        <text x={stepX - 89} y={kitchenFloorY + (groundY - kitchenFloorY) / 2 + 17} fill="#64748b" fontSize="7" textAnchor="middle">railing removed</text>
                      </g>

                      {/* Callout 4: Knee Space */}
                      <g>
                        <line x1={cabinetRight + config.overhangTowardKitchen * scale / 2} y1={counterTopY - 30} x2={cabinetRight + config.overhangTowardKitchen * scale / 2} y2={counterTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                        <circle cx={cabinetRight + config.overhangTowardKitchen * scale / 2} cy={counterTopY + 3} r="3" fill="#4ade80"/>
                        <rect x={cabinetRight + config.overhangTowardKitchen * scale / 2 - 45} y={counterTopY - 58} width="90" height="26" fill="#0a0f18" stroke="#4ade80" strokeWidth="1" rx="3"/>
                        <text x={cabinetRight + config.overhangTowardKitchen * scale / 2} y={counterTopY - 45} fill="#4ade80" fontSize="9" textAnchor="middle" fontWeight="600">KNEE SPACE</text>
                        <text x={cabinetRight + config.overhangTowardKitchen * scale / 2} y={counterTopY - 34} fill="#94a3b8" fontSize="8" textAnchor="middle">{config.overhangTowardKitchen}" overhang</text>
                      </g>

                      {/* Callout 5: L-Brackets */}
                      <g>
                        <line x1={cabinetLeft + 20} y1={cabinetTopY - 25} x2={cabinetLeft + 20} y2={cabinetTopY - 8} stroke="#4ade80" strokeWidth="1"/>
                        <rect x={cabinetLeft - 15} y={cabinetTopY - 50} width="70" height="24" fill="#0a0f18" stroke="#4ade80" strokeWidth="1" rx="3"/>
                        <text x={cabinetLeft + 20} y={cabinetTopY - 37} fill="#4ade80" fontSize="8" textAnchor="middle" fontWeight="600">L-BRACKETS</text>
                        <text x={cabinetLeft + 20} y={cabinetTopY - 27} fill="#64748b" fontSize="7" textAnchor="middle">slotted holes</text>
                      </g>

                      {/* Dimension lines */}
                      {/* Step height */}
                      <g>
                        <line x1="70" y1={groundY} x2="70" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="65" y1={groundY} x2="75" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="65" y1={kitchenFloorY} x2="75" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="60" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* Counter height from kitchen */}
                      <g>
                        <line x1={counterRight + 175} y1={kitchenFloorY} x2={counterRight + 175} y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={counterRight + 170} y1={kitchenFloorY} x2={counterRight + 180} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={counterRight + 170} y1={counterTopY} x2={counterRight + 180} y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={counterRight + 185} y={(kitchenFloorY + counterTopY) / 2} fill="#60a5fa" fontSize="10" fontFamily="monospace">{config.counterHeight}"</text>
                        <text x={counterRight + 185} y={(kitchenFloorY + counterTopY) / 2 + 12} fill="#64748b" fontSize="8">counter</text>
                      </g>

                      {/* Total from LR floor */}
                      <g>
                        <line x1="40" y1={groundY} x2="40" y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1="35" y1={groundY} x2="45" y2={groundY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1="35" y1={counterTopY} x2="45" y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <text x="30" y={(groundY + counterTopY) / 2} textAnchor="end" fill="#f472b6" fontSize="10" fontFamily="monospace">{counterFromLRFloor}"</text>
                        <text x="30" y={(groundY + counterTopY) / 2 + 12} textAnchor="end" fill="#64748b" fontSize="8">from LR</text>
                      </g>
                    </g>
                  )
                })()}
              </svg>
            </div>

            {/* Detail Callouts - Zoomed Connection Details */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Connection Details</h4>
              <p style={{ color: '#94a3b8', fontSize: 11, margin: '0 0 12px 0' }}>Zoomed views of critical joints</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {/* Detail 1: Counter-to-Cabinet (L-Brackets) */}
                <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                  <div style={{ color: '#60a5fa', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Counter Attachment</div>
                  <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                    {/* Cabinet top (cross section) */}
                    <rect x="20" y="70" width="140" height="12" fill="#334155" stroke="#475569" strokeWidth="1"/>
                    <text x="90" y="79" fill="#64748b" fontSize="7" textAnchor="middle">cabinet top (3/4" ply)</text>

                    {/* Butcher block */}
                    <rect x="15" y="35" width="150" height="30" fill="#854d0e" stroke="#a16207" strokeWidth="1"/>
                    <line x1="25" y1="40" x2="155" y2="40" stroke="#a16207" strokeWidth="0.5" strokeDasharray="2,2"/>
                    <line x1="25" y1="50" x2="155" y2="50" stroke="#a16207" strokeWidth="0.5" strokeDasharray="2,2"/>
                    <text x="90" y="52" fill="#fcd34d" fontSize="7" textAnchor="middle">butcher block</text>

                    {/* L-Bracket 1 */}
                    <g transform="translate(45, 65)">
                      <path d="M0,0 L0,-20 L-8,-20 L-8,-23 L3,-23 L3,0 Z" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                      {/* Slotted hole */}
                      <ellipse cx="-2" cy="-10" rx="2" ry="4" fill="#0a0f18"/>
                      {/* Screw into countertop */}
                      <line x1="-2" y1="-23" x2="-2" y2="-30" stroke="#60a5fa" strokeWidth="1.5"/>
                      <circle cx="-2" cy="-31" r="2" fill="#60a5fa"/>
                    </g>

                    {/* L-Bracket 2 */}
                    <g transform="translate(125, 65)">
                      <path d="M0,0 L0,-20 L-8,-20 L-8,-23 L3,-23 L3,0 Z" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                      <ellipse cx="-2" cy="-10" rx="2" ry="4" fill="#0a0f18"/>
                      <line x1="-2" y1="-23" x2="-2" y2="-30" stroke="#60a5fa" strokeWidth="1.5"/>
                      <circle cx="-2" cy="-31" r="2" fill="#60a5fa"/>
                    </g>

                    {/* Callout: slotted hole */}
                    <line x1="43" y1="55" x2="30" y2="25" stroke="#4ade80" strokeWidth="0.5"/>
                    <text x="18" y="20" fill="#4ade80" fontSize="6">slotted hole</text>
                    <text x="18" y="27" fill="#64748b" fontSize="5">(wood movement)</text>

                    {/* Callout: screw */}
                    <line x1="123" y1="35" x2="145" y2="15" stroke="#60a5fa" strokeWidth="0.5"/>
                    <text x="147" y="12" fill="#60a5fa" fontSize="6">#10 screw</text>
                    <text x="147" y="19" fill="#64748b" fontSize="5">into block</text>

                    {/* Legend */}
                    <rect x="20" y="100" width="8" height="8" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                    <text x="32" y="107" fill="#94a3b8" fontSize="6">L-bracket</text>

                    <rect x="20" y="115" width="8" height="8" fill="#854d0e"/>
                    <text x="32" y="122" fill="#94a3b8" fontSize="6">Butcher block</text>

                    <text x="90" y="135" fill="#64748b" fontSize="7" textAnchor="middle">4-6 brackets along length</text>
                  </svg>
                </div>

                {/* Detail 2: Cabinet Positioning */}
                <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                  <div style={{ color: '#d4c5b0', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Cabinet Position</div>
                  <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                    {/* Kitchen floor */}
                    <rect x="60" y="55" width="120" height="15" fill="#234060" stroke="#3b5a7a" strokeWidth="1"/>
                    <text x="120" y="66" fill="#3b5a7a" fontSize="7" textAnchor="middle">kitchen floor</text>

                    {/* Existing drywall half-wall */}
                    <rect x="30" y="35" width="12" height="70" fill="#d4c5b0" stroke="#b8a890" strokeWidth="1"/>
                    <text x="36" y="75" fill="#8b7355" fontSize="5" textAnchor="middle" transform="rotate(-90 36 75)">EXISTING WALL</text>

                    {/* Wood cap */}
                    <rect x="28" y="32" width="16" height="4" fill="#8b6914" stroke="#a07d1a" strokeWidth="0.5"/>

                    {/* LR floor */}
                    <rect x="0" y="105" width="60" height="10" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="1"/>
                    <text x="30" y="113" fill="#3b5a7a" fontSize="6" textAnchor="middle">LR floor</text>

                    {/* Cabinet */}
                    <rect x="60" y="20" width="30" height="35" fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1.5"/>
                    <text x="75" y="42" fill="#60a5fa" fontSize="6" textAnchor="middle">CABINET</text>

                    {/* Gap indicator */}
                    <line x1="42" y1="35" x2="60" y2="35" stroke="#4ade80" strokeWidth="1" strokeDasharray="2,2"/>
                    <line x1="42" y1="32" x2="42" y2="38" stroke="#4ade80" strokeWidth="1"/>
                    <line x1="60" y1="32" x2="60" y2="38" stroke="#4ade80" strokeWidth="1"/>

                    {/* Callout */}
                    <line x1="51" y1="35" x2="51" y2="18" stroke="#4ade80" strokeWidth="0.5"/>
                    <text x="51" y="14" fill="#4ade80" fontSize="6" textAnchor="middle">gap behind</text>

                    {/* Countertop */}
                    <rect x="25" y="15" width="90" height="6" fill="#854d0e" stroke="#a16207" strokeWidth="1"/>

                    {/* Notes */}
                    <text x="90" y="90" fill="#94a3b8" fontSize="6" textAnchor="middle">Cabinet sits ON kitchen floor</text>
                    <text x="90" y="100" fill="#94a3b8" fontSize="6" textAnchor="middle">BEHIND existing half-wall</text>

                    {/* Legend */}
                    <rect x="120" y="75" width="6" height="6" fill="#d4c5b0"/>
                    <text x="130" y="80" fill="#94a3b8" fontSize="5">Existing wall</text>

                    <rect x="120" y="85" width="6" height="6" fill="#2d4a6a"/>
                    <text x="130" y="90" fill="#94a3b8" fontSize="5">Cabinet</text>

                    <text x="90" y="135" fill="#64748b" fontSize="7" textAnchor="middle">Front of cabinet aligns with step edge</text>
                  </svg>
                </div>

                {/* Detail 3: LR Overhang Support */}
                <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                  <div style={{ color: '#fb923c', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Overhang Support</div>
                  <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                    {/* Butcher block (cross section showing overhang) */}
                    <rect x="30" y="25" width="130" height="20" fill="#854d0e" stroke="#a16207" strokeWidth="1"/>
                    <line x1="40" y1="30" x2="150" y2="30" stroke="#a16207" strokeWidth="0.5" strokeDasharray="2,2"/>

                    {/* Cabinet box (partial) */}
                    <rect x="80" y="45" width="80" height="50" fill="#334155" stroke="#475569" strokeWidth="1"/>
                    <text x="120" y="75" fill="#64748b" fontSize="7" textAnchor="middle">cabinet</text>

                    {/* Existing wall */}
                    <rect x="30" y="45" width="8" height="55" fill="#d4c5b0" stroke="#b8a890" strokeWidth="0.5"/>

                    {/* LR floor */}
                    <rect x="0" y="100" width="80" height="10" fill="#334155" stroke="#475569" strokeWidth="1"/>
                    <text x="40" y="108" fill="#64748b" fontSize="6" textAnchor="middle">LR floor</text>

                    {/* Steel bracket - triangular support */}
                    <g transform="translate(45, 45)">
                      <path d="M0,0 L25,0 L25,5 L5,5 L5,40 L0,40 Z" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                      {/* Diagonal brace */}
                      <line x1="5" y1="5" x2="25" y2="0" stroke="#d1d5db" strokeWidth="2"/>
                      {/* Screws */}
                      <circle cx="15" cy="2" r="1.5" fill="#60a5fa"/>
                      <circle cx="2" cy="15" r="1.5" fill="#60a5fa"/>
                      <circle cx="2" cy="30" r="1.5" fill="#60a5fa"/>
                    </g>

                    {/* Dimension: overhang */}
                    <line x1="35" y1="50" x2="35" y2="20" stroke="#fb923c" strokeWidth="0.5"/>
                    <line x1="35" y1="20" x2="80" y2="20" stroke="#fb923c" strokeWidth="0.5"/>
                    <line x1="80" y1="18" x2="80" y2="22" stroke="#fb923c" strokeWidth="0.5"/>
                    <text x="57" y="18" fill="#fb923c" fontSize="7" textAnchor="middle">{config.overhangTowardLR}"</text>

                    {/* Callout */}
                    <line x1="70" y1="60" x2="100" y2="55" stroke="#9ca3af" strokeWidth="0.5"/>
                    <text x="102" y="52" fill="#9ca3af" fontSize="6">steel bracket</text>
                    <text x="102" y="59" fill="#64748b" fontSize="5">(if overhang &gt;6")</text>

                    {/* Legend */}
                    <rect x="110" y="75" width="6" height="6" fill="#9ca3af"/>
                    <text x="120" y="80" fill="#94a3b8" fontSize="6">Bracket</text>

                    <rect x="110" y="85" width="6" height="6" fill="#854d0e"/>
                    <text x="120" y="90" fill="#94a3b8" fontSize="6">Block</text>

                    <text x="90" y="125" fill={config.overhangTowardLR > 6 ? '#fb923c' : '#4ade80'} fontSize="7" textAnchor="middle">
                      {config.overhangTowardLR > 6 ? `${config.overhangTowardLR}" overhang - REQUIRED` : `${config.overhangTowardLR}" overhang - optional`}
                    </text>
                    <text x="90" y="135" fill="#64748b" fontSize="6" textAnchor="middle">Space every 24-36" along length</text>
                  </svg>
                </div>
              </div>
            </div>

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
                <li>Remove existing metal railing from half-wall</li>
                <li>Patch screw holes in drywall, touch up paint</li>
                <li>Position cabinet on kitchen floor, behind existing half-wall</li>
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
        </div>
      </div>
    </div>
  )
}
