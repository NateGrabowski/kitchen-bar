import React, { useState, useId } from 'react'

export default function KitchenFloorCabinetsSketch() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,           // Fixed - living room to kitchen floor
    counterHeight: 40,          // PRIMARY: counter height from kitchen floor (range: 36-42")
    counterThickness: 1.5,      // Butcher block
    cabinetDepth: 12,           // Cabinet depth (doors face LR side)
    overhangTowardLR: 8,        // How far counter extends past cabinet toward LR
    overhangTowardKitchen: 12,  // Knee space on kitchen side
    barLength: 84,
    stoolHeight: 30,
    // Options
    showStepPanel: true,        // Show finished panel on step face
    stepPanelStyle: 'match',    // 'match' cabinet or 'contrast'
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
            <div className="panel-title">Options</div>

            <div className="checkbox-item" onClick={() => update('showStepPanel', !config.showStepPanel)}>
              <input type="checkbox" checked={config.showStepPanel} readOnly />
              <span>Show step face panel</span>
            </div>
            {config.showStepPanel && (
              <div style={{ marginLeft: 24 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Panel style</div>
                <div className="toggle-group">
                  {['match', 'contrast'].map(style => (
                    <button
                      key={style}
                      className={`toggle-btn ${config.stepPanelStyle === style ? 'active' : ''}`}
                      onClick={() => update('stepPanelStyle', style)}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
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

                  {/* Step face - with optional panel */}
                  {config.showStepPanel ? (
                    <rect
                      x={stepX - 4}
                      y={kitchenFloorY}
                      width="4"
                      height={groundY - kitchenFloorY}
                      fill={config.stepPanelStyle === 'match' ? '#2d4a6a' : '#1a1a2e'}
                      stroke="#60a5fa"
                      strokeWidth="1"
                    />
                  ) : (
                    <rect x={stepX - 4} y={kitchenFloorY} width="4" height={groundY - kitchenFloorY} fill="#334155"/>
                  )}

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
                  {config.showStepPanel && (
                    <text x={stepX - 8} y={kitchenFloorY + (groundY - kitchenFloorY) / 2}
                          textAnchor="end" fill="#64748b" fontSize="8" transform={`rotate(-90 ${stepX - 8} ${kitchenFloorY + (groundY - kitchenFloorY) / 2})`}>
                      panel
                    </text>
                  )}
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
              <li>Step face {config.showStepPanel ? `covered with ${config.stepPanelStyle} panel` : 'left exposed (needs finishing)'}</li>
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
        </div>
      </div>
    </div>
  )
}
