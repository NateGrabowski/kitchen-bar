import React, { useState, useId } from 'react'

export default function KitchenDesignEnhanced() {
  const [config, setConfig] = useState({
    // Core dimensions
    stepHeight: 23.5,
    counterHeight: 40,
    counterThickness: 1.5,
    cabinetDepth: 16,
    overhangTowardLR: 2.5,      // Default to 2.5" for shadow line
    overhangTowardKitchen: 12,
    barLength: 84,
    stoolHeight: 28,
    
    // Design options - NEW
    doorStyle: 'shaker',        // 'flat', 'shaker', 'beadboard'
    hasGlassInsert: true,       // One section with glass/mesh
    glassPosition: 'left',      // 'left', 'center', 'right'
    toeKickStyle: 'recessed',   // 'flush', 'recessed'
    toeKickHeight: 4,
    toeKickDepth: 3,
    hasCorbels: true,
    corbelStyle: 'farmhouse',   // 'farmhouse', 'modern', 'craftsman'
    hasLEDLighting: true,
    cabinetColor: 'white',      // 'white', 'sage', 'navy', 'natural', 'black'
    showChevronPattern: true,
    
    // Herb planter
    planterEnabled: false,
    planterLength: 20,
    planterWidth: 6,
    planterDepth: 4,
    planterOffset: 6,
  })

  const [activeView, setActiveView] = useState('front')
  const uniqueId = useId()
  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Calculated values
  const cabinetHeight = config.counterHeight - config.counterThickness
  const counterFromLRFloor = config.stepHeight + config.counterHeight
  const totalDepth = config.cabinetDepth + config.overhangTowardLR + config.overhangTowardKitchen
  const seatToCounter = config.counterHeight - config.stoolHeight
  const kneeSpace = config.overhangTowardKitchen

  // Color mappings
  const cabinetColors = {
    white: { fill: '#f8fafc', stroke: '#e2e8f0', accent: '#cbd5e1', text: '#475569' },
    sage: { fill: '#a7c4a0', stroke: '#7a9f71', accent: '#5f8256', text: '#3d5237' },
    navy: { fill: '#1e3a5f', stroke: '#0f2744', accent: '#2d4a6f', text: '#93c5fd' },
    natural: { fill: '#d4a574', stroke: '#b8956a', accent: '#a67c52', text: '#5c3d1e' },
    black: { fill: '#1e293b', stroke: '#0f172a', accent: '#334155', text: '#94a3b8' },
  }
  const colors = cabinetColors[config.cabinetColor]

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
        .option-group {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }
        .option-btn {
          padding: 6px 12px;
          font-size: 10px;
          background: transparent;
          border: 1px solid #334155;
          color: #94a3b8;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .option-btn:hover {
          background: #1e3a5f;
        }
        .option-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #1e293b;
        }
        .toggle-row:last-child { border-bottom: none; }
        .toggle-label { font-size: 12px; color: #94a3b8; }
        .toggle-switch {
          width: 40px;
          height: 22px;
          background: #334155;
          border-radius: 11px;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-switch.active { background: #3b82f6; }
        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
        }
        .toggle-switch.active::after { transform: translateX(18px); }
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
        .view-tab:hover { background: #1e3a5f; }
        .view-tab.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .color-swatch {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.15s;
        }
        .color-swatch:hover { transform: scale(1.1); }
        .color-swatch.active { border-color: #60a5fa; }
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
        .design-note {
          background: rgba(96, 165, 250, 0.1);
          border-left: 3px solid #60a5fa;
          padding: 8px 12px;
          font-size: 11px;
          color: #94a3b8;
          margin-top: 12px;
          border-radius: 0 4px 4px 0;
        }
      `}</style>

      <h1 style={{ color: '#60a5fa', marginBottom: 8, fontSize: 20 }}>Kitchen Bar Design — Enhanced</h1>
      <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 13 }}>
        Modern farmhouse options: toggle features to see what works
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        {/* Controls */}
        <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          
          {/* Design Options - NEW PANEL */}
          <div className="panel">
            <div className="panel-title">✨ Design Options</div>
            
            {/* Door Style */}
            <div className="slider-group">
              <div className="slider-label"><span>Door Style</span></div>
              <div className="option-group">
                {[
                  { id: 'flat', label: 'Flat Slab' },
                  { id: 'shaker', label: 'Shaker' },
                  { id: 'beadboard', label: 'Beadboard' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`option-btn ${config.doorStyle === opt.id ? 'active' : ''}`}
                    onClick={() => update('doorStyle', opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="slider-note">Shaker adds shadow lines, reduces "flat" look</div>
            </div>

            {/* Cabinet Color */}
            <div className="slider-group">
              <div className="slider-label"><span>Cabinet Color</span></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {[
                  { id: 'white', color: '#f8fafc', label: 'White' },
                  { id: 'sage', color: '#a7c4a0', label: 'Sage' },
                  { id: 'navy', color: '#1e3a5f', label: 'Navy' },
                  { id: 'natural', color: '#d4a574', label: 'Natural' },
                  { id: 'black', color: '#1e293b', label: 'Black' },
                ].map(opt => (
                  <div key={opt.id} style={{ textAlign: 'center' }}>
                    <div
                      className={`color-swatch ${config.cabinetColor === opt.id ? 'active' : ''}`}
                      style={{ background: opt.color, border: opt.id === 'black' ? '1px solid #475569' : undefined }}
                      onClick={() => update('cabinetColor', opt.id)}
                    />
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{opt.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ marginTop: 16 }}>
              <div className="toggle-row">
                <span className="toggle-label">Glass/Mesh Insert</span>
                <div
                  className={`toggle-switch ${config.hasGlassInsert ? 'active' : ''}`}
                  onClick={() => update('hasGlassInsert', !config.hasGlassInsert)}
                />
              </div>
              
              {config.hasGlassInsert && (
                <div style={{ paddingLeft: 12, paddingBottom: 8 }}>
                  <div className="option-group">
                    {['left', 'center', 'right'].map(pos => (
                      <button
                        key={pos}
                        className={`option-btn ${config.glassPosition === pos ? 'active' : ''}`}
                        onClick={() => update('glassPosition', pos)}
                        style={{ textTransform: 'capitalize', padding: '4px 10px' }}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="toggle-row">
                <span className="toggle-label">Recessed Toe Kick</span>
                <div
                  className={`toggle-switch ${config.toeKickStyle === 'recessed' ? 'active' : ''}`}
                  onClick={() => update('toeKickStyle', config.toeKickStyle === 'recessed' ? 'flush' : 'recessed')}
                />
              </div>

              <div className="toggle-row">
                <span className="toggle-label">Decorative Corbels</span>
                <div
                  className={`toggle-switch ${config.hasCorbels ? 'active' : ''}`}
                  onClick={() => update('hasCorbels', !config.hasCorbels)}
                />
              </div>

              {config.hasCorbels && (
                <div style={{ paddingLeft: 12, paddingBottom: 8 }}>
                  <div className="option-group">
                    {['farmhouse', 'modern', 'craftsman'].map(style => (
                      <button
                        key={style}
                        className={`option-btn ${config.corbelStyle === style ? 'active' : ''}`}
                        onClick={() => update('corbelStyle', style)}
                        style={{ textTransform: 'capitalize', padding: '4px 10px' }}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="toggle-row">
                <span className="toggle-label">Under-counter LED</span>
                <div
                  className={`toggle-switch ${config.hasLEDLighting ? 'active' : ''}`}
                  onClick={() => update('hasLEDLighting', !config.hasLEDLighting)}
                />
              </div>

              <div className="toggle-row">
                <span className="toggle-label">Show Chevron Pattern</span>
                <div
                  className={`toggle-switch ${config.showChevronPattern ? 'active' : ''}`}
                  onClick={() => update('showChevronPattern', !config.showChevronPattern)}
                />
              </div>
            </div>

            <div className="design-note">
              💡 <strong>Anti-block strategy:</strong> Overhang + shaker doors + glass insert + recessed toe kick = visual depth and interest from the living room.
            </div>
          </div>

          {/* Dimensions Panel */}
          <div className="panel">
            <div className="panel-title">📐 Dimensions</div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Step Height (fixed)</span>
                <span className="slider-value">{config.stepHeight}"</span>
              </div>
              <div style={{ padding: '6px 10px', background: '#1e3a5f', borderRadius: 4, fontSize: 11, color: '#94a3b8' }}>
                Architectural constraint
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
              <div className="slider-note">From kitchen floor (bar height: 40-42")</div>
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
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>LR Overhang</span>
                <span className="slider-value">{config.overhangTowardLR}"</span>
              </div>
              <input type="range" min="0" max="6" step="0.5" value={config.overhangTowardLR}
                onChange={e => update('overhangTowardLR', +e.target.value)}
              />
              <div className="slider-note">
                {config.overhangTowardLR >= 2 ? '✓ Creates shadow line' : '⚠ Add 2-3" for shadow line'}
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Knee Space</span>
                <span className="slider-value">{config.overhangTowardKitchen}"</span>
              </div>
              <input type="range" min="10" max="18" value={config.overhangTowardKitchen}
                onChange={e => update('overhangTowardKitchen', +e.target.value)}
              />
              <div className="slider-note">12"+ for comfortable seating</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Bar Length</span>
                <span className="slider-value">{config.barLength}"</span>
              </div>
              <input type="range" min="60" max="96" value={config.barLength}
                onChange={e => update('barLength', +e.target.value)}
              />
              <div className="slider-note">~7 feet = 84"</div>
            </div>
          </div>

          {/* Calculated Values */}
          <div className="panel">
            <div className="panel-title">📊 Calculated</div>
            <div className="calc-row">
              <span>Cabinet height</span>
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
          </div>
        </div>

        {/* Visualization */}
        <div className="panel">
          <div className="view-tabs">
            {[
              { id: 'front', label: 'Front View (from LR)' },
              { id: 'side', label: 'Side Section' },
              { id: 'perspective', label: '3D Sketch' },
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

          {/* FRONT VIEW */}
          {activeView === 'front' && (
            <div>
              <svg viewBox="0 0 700 480" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                  
                  {/* Chevron pattern for butcher block */}
                  <pattern id={`${uniqueId}-chevron`} width="20" height="16" patternUnits="userSpaceOnUse">
                    <path d="M0,8 L10,0 L20,8 M0,8 L10,16 L20,8" fill="none" stroke="#a16207" strokeWidth="0.8" opacity="0.5"/>
                  </pattern>
                  
                  {/* Glass/mesh pattern */}
                  <pattern id={`${uniqueId}-mesh`} width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#1e3a5f" opacity="0.3"/>
                    <line x1="0" y1="0" x2="8" y2="0" stroke="#94a3b8" strokeWidth="0.5" opacity="0.4"/>
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" strokeWidth="0.5" opacity="0.4"/>
                  </pattern>
                  
                  {/* LED glow */}
                  <linearGradient id={`${uniqueId}-led-glow`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                <rect width="700" height="480" fill={`url(#${uniqueId}-grid)`}/>

                {(() => {
                  const scale = 2.0
                  const barLengthPx = config.barLength * scale
                  const cabinetHeightPx = cabinetHeight * scale
                  const stepHeightPx = config.stepHeight * scale
                  const counterThickPx = config.counterThickness * scale * 2
                  const toeKickPx = config.toeKickHeight * scale
                  const toeKickDepthPx = config.toeKickDepth * scale

                  const startX = (700 - barLengthPx) / 2
                  const groundY = 420
                  const kitchenFloorY = groundY - stepHeightPx
                  const cabinetTopY = kitchenFloorY - cabinetHeightPx
                  const counterTopY = cabinetTopY - counterThickPx

                  // Door layout
                  const numDoors = 3
                  const doorWidth = barLengthPx / numDoors
                  const doorInset = 6
                  const shakerInset = 12

                  const glassIndex = config.glassPosition === 'left' ? 0 : config.glassPosition === 'center' ? 1 : 2

                  return (
                    <g>
                      {/* Title */}
                      <text x="30" y="30" fill="#60a5fa" fontSize="14" fontWeight="600">FRONT VIEW — From Living Room</text>
                      <text x="30" y="48" fill="#64748b" fontSize="11">This is your primary view. Toggle options to see effects.</text>

                      {/* Living room floor */}
                      <rect x="30" y={groundY} width="640" height="50" fill="#1e3a5f"/>
                      <text x="350" y={groundY + 30} textAnchor="middle" fill="#3b5a7a" fontSize="11">LIVING ROOM FLOOR (you are here, looking up)</text>

                      {/* Existing drywall half-wall */}
                      <rect
                        x={startX}
                        y={kitchenFloorY}
                        width={barLengthPx}
                        height={stepHeightPx}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                        strokeWidth="1"
                      />
                      <text x={startX + barLengthPx / 2} y={kitchenFloorY + stepHeightPx / 2 + 4} textAnchor="middle" fill="#8b7355" fontSize="10">EXISTING DRYWALL (railing removed)</text>

                      {/* LED Glow effect (if enabled) */}
                      {config.hasLEDLighting && (
                        <rect
                          x={startX - config.overhangTowardLR * scale}
                          y={cabinetTopY + counterThickPx}
                          width={barLengthPx + config.overhangTowardLR * scale}
                          height="35"
                          fill={`url(#${uniqueId}-led-glow)`}
                        />
                      )}

                      {/* Toe kick area */}
                      {config.toeKickStyle === 'recessed' ? (
                        <rect
                          x={startX + toeKickDepthPx}
                          y={kitchenFloorY - toeKickPx}
                          width={barLengthPx - toeKickDepthPx * 2}
                          height={toeKickPx}
                          fill="#0f172a"
                          stroke="#1e293b"
                        />
                      ) : null}

                      {/* Cabinet box */}
                      <rect
                        x={startX}
                        y={cabinetTopY}
                        width={barLengthPx}
                        height={cabinetHeightPx - (config.toeKickStyle === 'recessed' ? toeKickPx : 0)}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth="2"
                      />

                      {/* Cabinet doors */}
                      {Array.from({ length: numDoors }).map((_, i) => {
                        const doorX = startX + i * doorWidth
                        const isGlass = config.hasGlassInsert && i === glassIndex
                        const doorY = cabinetTopY + doorInset
                        const doorH = cabinetHeightPx - (config.toeKickStyle === 'recessed' ? toeKickPx : 0) - doorInset * 2

                        return (
                          <g key={i}>
                            {/* Door panel */}
                            <rect
                              x={doorX + doorInset}
                              y={doorY}
                              width={doorWidth - doorInset * 2}
                              height={doorH}
                              fill={isGlass ? `url(#${uniqueId}-mesh)` : colors.fill}
                              stroke={colors.stroke}
                              strokeWidth="1.5"
                              rx="2"
                            />

                            {/* Shaker style inner frame */}
                            {config.doorStyle === 'shaker' && !isGlass && (
                              <rect
                                x={doorX + doorInset + shakerInset}
                                y={doorY + shakerInset}
                                width={doorWidth - doorInset * 2 - shakerInset * 2}
                                height={doorH - shakerInset * 2}
                                fill="none"
                                stroke={colors.accent}
                                strokeWidth="2"
                                rx="1"
                              />
                            )}

                            {/* Beadboard style vertical lines */}
                            {config.doorStyle === 'beadboard' && !isGlass && (
                              <>
                                {Array.from({ length: 5 }).map((_, j) => {
                                  const lineX = doorX + doorInset + shakerInset + j * ((doorWidth - doorInset * 2 - shakerInset * 2) / 5)
                                  return (
                                    <line
                                      key={j}
                                      x1={lineX}
                                      y1={doorY + shakerInset}
                                      x2={lineX}
                                      y2={doorY + doorH - shakerInset}
                                      stroke={colors.accent}
                                      strokeWidth="1"
                                      opacity="0.6"
                                    />
                                  )
                                })}
                              </>
                            )}

                            {/* Glass insert details */}
                            {isGlass && (
                              <>
                                {/* Inner frame */}
                                <rect
                                  x={doorX + doorInset + 8}
                                  y={doorY + 8}
                                  width={doorWidth - doorInset * 2 - 16}
                                  height={doorH - 16}
                                  fill="none"
                                  stroke="#94a3b8"
                                  strokeWidth="1"
                                  rx="1"
                                />
                                {/* Glass items inside (bottles/glasses) */}
                                <g opacity="0.4">
                                  <rect x={doorX + doorWidth / 2 - 15} y={doorY + doorH - 45} width="8" height="30" fill="#94a3b8" rx="2"/>
                                  <rect x={doorX + doorWidth / 2 - 3} y={doorY + doorH - 50} width="10" height="35" fill="#94a3b8" rx="2"/>
                                  <rect x={doorX + doorWidth / 2 + 12} y={doorY + doorH - 40} width="7" height="25" fill="#94a3b8" rx="2"/>
                                </g>
                              </>
                            )}

                            {/* Door handle */}
                            <rect
                              x={doorX + doorWidth - doorInset - 18}
                              y={doorY + doorH * 0.35}
                              width="6"
                              height="24"
                              fill={colors.accent}
                              rx="2"
                            />

                            {/* Door width label */}
                            <text
                              x={doorX + doorWidth / 2}
                              y={cabinetTopY + cabinetHeightPx - (config.toeKickStyle === 'recessed' ? toeKickPx : 0) + 16}
                              textAnchor="middle"
                              fill="#64748b"
                              fontSize="9"
                            >
                              {Math.round(doorWidth / scale)}"
                            </text>
                          </g>
                        )
                      })}

                      {/* Corbels */}
                      {config.hasCorbels && (
                        <>
                          {/* Left corbel */}
                          {config.corbelStyle === 'farmhouse' && (
                            <>
                              <path
                                d={`M ${startX - config.overhangTowardLR * scale} ${counterTopY + counterThickPx}
                                    L ${startX - config.overhangTowardLR * scale} ${counterTopY + counterThickPx + 40}
                                    Q ${startX - config.overhangTowardLR * scale + 10} ${counterTopY + counterThickPx + 50}
                                      ${startX} ${counterTopY + counterThickPx + 50}
                                    L ${startX} ${counterTopY + counterThickPx}
                                    Z`}
                                fill="#92400e"
                                stroke="#78350f"
                                strokeWidth="1"
                              />
                              <path
                                d={`M ${startX + barLengthPx} ${counterTopY + counterThickPx}
                                    L ${startX + barLengthPx} ${counterTopY + counterThickPx + 50}
                                    Q ${startX + barLengthPx - 10} ${counterTopY + counterThickPx + 50}
                                      ${startX + barLengthPx - config.overhangTowardLR * scale} ${counterTopY + counterThickPx + 40}
                                    L ${startX + barLengthPx - config.overhangTowardLR * scale + config.overhangTowardLR * scale} ${counterTopY + counterThickPx}
                                    Z`}
                                fill="#92400e"
                                stroke="#78350f"
                                strokeWidth="1"
                              />
                            </>
                          )}
                          {config.corbelStyle === 'modern' && (
                            <>
                              <rect
                                x={startX - config.overhangTowardLR * scale + 2}
                                y={counterTopY + counterThickPx}
                                width="6"
                                height="35"
                                fill="#475569"
                              />
                              <rect
                                x={startX + barLengthPx - 8}
                                y={counterTopY + counterThickPx}
                                width="6"
                                height="35"
                                fill="#475569"
                              />
                            </>
                          )}
                          {config.corbelStyle === 'craftsman' && (
                            <>
                              <path
                                d={`M ${startX - config.overhangTowardLR * scale} ${counterTopY + counterThickPx}
                                    L ${startX - config.overhangTowardLR * scale} ${counterTopY + counterThickPx + 50}
                                    L ${startX} ${counterTopY + counterThickPx + 50}
                                    L ${startX} ${counterTopY + counterThickPx + 15}
                                    L ${startX - config.overhangTowardLR * scale + 15} ${counterTopY + counterThickPx}
                                    Z`}
                                fill="#92400e"
                                stroke="#78350f"
                                strokeWidth="1"
                              />
                              <path
                                d={`M ${startX + barLengthPx} ${counterTopY + counterThickPx}
                                    L ${startX + barLengthPx} ${counterTopY + counterThickPx + 50}
                                    L ${startX + barLengthPx - config.overhangTowardLR * scale} ${counterTopY + counterThickPx + 50}
                                    L ${startX + barLengthPx - config.overhangTowardLR * scale} ${counterTopY + counterThickPx + 15}
                                    L ${startX + barLengthPx - 15} ${counterTopY + counterThickPx}
                                    Z`}
                                fill="#92400e"
                                stroke="#78350f"
                                strokeWidth="1"
                              />
                            </>
                          )}
                        </>
                      )}

                      {/* Butcher block counter */}
                      <rect
                        x={startX - config.overhangTowardLR * scale}
                        y={counterTopY}
                        width={barLengthPx + config.overhangTowardLR * scale}
                        height={counterThickPx}
                        fill="#92400e"
                        stroke="#78350f"
                        strokeWidth="2"
                      />
                      
                      {/* Chevron pattern overlay */}
                      {config.showChevronPattern && (
                        <rect
                          x={startX - config.overhangTowardLR * scale}
                          y={counterTopY}
                          width={barLengthPx + config.overhangTowardLR * scale}
                          height={counterThickPx}
                          fill={`url(#${uniqueId}-chevron)`}
                        />
                      )}

                      {/* Counter edge highlight */}
                      <line
                        x1={startX - config.overhangTowardLR * scale}
                        y1={counterTopY + counterThickPx - 2}
                        x2={startX + barLengthPx}
                        y2={counterTopY + counterThickPx - 2}
                        stroke="#78350f"
                        strokeWidth="1"
                        opacity="0.5"
                      />

                      {/* LED strip indicator */}
                      {config.hasLEDLighting && (
                        <>
                          <line
                            x1={startX - config.overhangTowardLR * scale + 5}
                            y1={counterTopY + counterThickPx + 2}
                            x2={startX + barLengthPx - 5}
                            y2={counterTopY + counterThickPx + 2}
                            stroke="#fef3c7"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x={startX + barLengthPx + 10} y={counterTopY + counterThickPx + 6} fill="#fef3c7" fontSize="8">LED</text>
                        </>
                      )}

                      {/* Dimension: bar length */}
                      <g>
                        <line x1={startX} y1={counterTopY - 25} x2={startX + barLengthPx} y2={counterTopY - 25} stroke="#fbbf24" strokeWidth="1"/>
                        <line x1={startX} y1={counterTopY - 30} x2={startX} y2={counterTopY - 20} stroke="#fbbf24" strokeWidth="1"/>
                        <line x1={startX + barLengthPx} y1={counterTopY - 30} x2={startX + barLengthPx} y2={counterTopY - 20} stroke="#fbbf24" strokeWidth="1"/>
                        <text x={startX + barLengthPx / 2} y={counterTopY - 32} textAnchor="middle" fill="#fbbf24" fontSize="12" fontFamily="monospace">{config.barLength}" length</text>
                      </g>

                      {/* Dimension: total height from LR */}
                      <g>
                        <line x1={startX - config.overhangTowardLR * scale - 25} y1={groundY} x2={startX - config.overhangTowardLR * scale - 25} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={startX - config.overhangTowardLR * scale - 30} y1={groundY} x2={startX - config.overhangTowardLR * scale - 20} y2={groundY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={startX - config.overhangTowardLR * scale - 30} y1={counterTopY} x2={startX - config.overhangTowardLR * scale - 20} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <text x={startX - config.overhangTowardLR * scale - 35} y={(groundY + counterTopY) / 2} textAnchor="end" fill="#f472b6" fontSize="11" fontFamily="monospace">{counterFromLRFloor}"</text>
                        <text x={startX - config.overhangTowardLR * scale - 35} y={(groundY + counterTopY) / 2 + 14} textAnchor="end" fill="#64748b" fontSize="9">from LR</text>
                      </g>

                      {/* Shadow line callout */}
                      {config.overhangTowardLR >= 2 && (
                        <g>
                          <line x1={startX + 30} y1={cabinetTopY} x2={startX + 30} y2={counterTopY + counterThickPx} stroke="#4ade80" strokeWidth="1" strokeDasharray="3,2"/>
                          <text x={startX + 35} y={cabinetTopY + 15} fill="#4ade80" fontSize="8">shadow</text>
                          <text x={startX + 35} y={cabinetTopY + 24} fill="#4ade80" fontSize="8">line ✓</text>
                        </g>
                      )}

                      {/* Feature callouts */}
                      {config.toeKickStyle === 'recessed' && (
                        <g>
                          <line x1={startX + barLengthPx / 2} y1={kitchenFloorY - toeKickPx / 2} x2={startX + barLengthPx + 40} y2={kitchenFloorY - toeKickPx / 2 - 20} stroke="#94a3b8" strokeWidth="0.5"/>
                          <text x={startX + barLengthPx + 45} y={kitchenFloorY - toeKickPx / 2 - 22} fill="#94a3b8" fontSize="9">recessed toe kick</text>
                          <text x={startX + barLengthPx + 45} y={kitchenFloorY - toeKickPx / 2 - 12} fill="#64748b" fontSize="8">(lighter feel)</text>
                        </g>
                      )}
                    </g>
                  )
                })()}
              </svg>

              {/* Feature summary */}
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { 
                    label: 'Shadow Line', 
                    status: config.overhangTowardLR >= 2, 
                    detail: config.overhangTowardLR >= 2 ? `${config.overhangTowardLR}" overhang ✓` : 'Add 2"+ overhang' 
                  },
                  { 
                    label: 'Visual Depth', 
                    status: config.hasGlassInsert || config.doorStyle !== 'flat', 
                    detail: config.hasGlassInsert ? 'Glass insert shows depth' : config.doorStyle !== 'flat' ? `${config.doorStyle} doors add shadow` : 'Add glass or shaker' 
                  },
                  { 
                    label: 'Lighter Feel', 
                    status: config.toeKickStyle === 'recessed', 
                    detail: config.toeKickStyle === 'recessed' ? 'Recessed toe kick ✓' : 'Enable recessed toe kick' 
                  },
                ].map((item, i) => (
                  <div key={i} style={{ 
                    background: item.status ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 146, 60, 0.1)', 
                    padding: 12, 
                    borderRadius: 6,
                    borderLeft: `3px solid ${item.status ? '#4ade80' : '#fb923c'}`
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: item.status ? '#4ade80' : '#fb923c' }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SIDE VIEW */}
          {activeView === 'side' && (
            <div>
              <svg viewBox="0 0 600 400" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid-side`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id={`${uniqueId}-led-side`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill={`url(#${uniqueId}-grid-side)`}/>

                {(() => {
                  const scale = 2.6
                  const groundY = 340
                  const kitchenFloorY = groundY - config.stepHeight * scale
                  const cabinetTopY = kitchenFloorY - cabinetHeight * scale
                  const counterTopY = cabinetTopY - config.counterThickness * scale * 2
                  const toeKickPx = config.toeKickHeight * scale

                  const stepX = 240
                  const cabinetLeft = stepX
                  const cabinetRight = stepX + config.cabinetDepth * scale
                  const counterLeft = stepX - config.overhangTowardLR * scale
                  const counterRight = cabinetRight + config.overhangTowardKitchen * scale

                  return (
                    <g>
                      <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">SIDE SECTION</text>
                      <text x="30" y="42" fill="#64748b" fontSize="10">Cross-section showing overhang and shadow line</text>

                      {/* Living room floor */}
                      <rect x="30" y={groundY} width={stepX - 30} height="50" fill="#1e3a5f"/>
                      <text x="100" y={groundY + 28} fill="#3b5a7a" fontSize="10">LIVING ROOM</text>

                      {/* Kitchen floor */}
                      <rect x={stepX} y={kitchenFloorY} width="320" height={groundY - kitchenFloorY + 50} fill="#234060"/>
                      <text x={stepX + 160} y={kitchenFloorY + 22} fill="#3b5a7a" fontSize="10">KITCHEN</text>

                      {/* Existing half-wall */}
                      <rect
                        x={stepX - 10}
                        y={kitchenFloorY}
                        width="10"
                        height={groundY - kitchenFloorY}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                      />

                      {/* Cabinet */}
                      <rect
                        x={cabinetLeft}
                        y={cabinetTopY + (config.toeKickStyle === 'recessed' ? 0 : 0)}
                        width={config.cabinetDepth * scale}
                        height={cabinetHeight * scale - (config.toeKickStyle === 'recessed' ? toeKickPx : 0)}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth="2"
                      />

                      {/* Recessed toe kick */}
                      {config.toeKickStyle === 'recessed' && (
                        <rect
                          x={cabinetLeft + config.toeKickDepth * scale}
                          y={kitchenFloorY - toeKickPx}
                          width={config.cabinetDepth * scale - config.toeKickDepth * scale * 2}
                          height={toeKickPx}
                          fill="#0f172a"
                        />
                      )}

                      {/* Shaker door detail on side */}
                      {config.doorStyle === 'shaker' && (
                        <rect
                          x={cabinetLeft + 8}
                          y={cabinetTopY + 12}
                          width={config.cabinetDepth * scale - 16}
                          height={cabinetHeight * scale - (config.toeKickStyle === 'recessed' ? toeKickPx : 0) - 24}
                          fill="none"
                          stroke={colors.accent}
                          strokeWidth="2"
                        />
                      )}

                      {/* Countertop */}
                      <rect
                        x={counterLeft}
                        y={counterTopY}
                        width={counterRight - counterLeft}
                        height={config.counterThickness * scale * 2}
                        fill="#92400e"
                        stroke="#78350f"
                        strokeWidth="2"
                      />

                      {/* LED glow */}
                      {config.hasLEDLighting && (
                        <ellipse
                          cx={counterLeft + 20}
                          cy={counterTopY + config.counterThickness * scale * 2 + 15}
                          rx="30"
                          ry="20"
                          fill={`url(#${uniqueId}-led-side)`}
                        />
                      )}

                      {/* Corbel on side */}
                      {config.hasCorbels && config.overhangTowardLR > 0 && (
                        <path
                          d={`M ${counterLeft + 5} ${counterTopY + config.counterThickness * scale * 2}
                              L ${counterLeft + 5} ${counterTopY + config.counterThickness * scale * 2 + 30}
                              Q ${counterLeft + 15} ${counterTopY + config.counterThickness * scale * 2 + 35}
                                ${cabinetLeft} ${counterTopY + config.counterThickness * scale * 2 + 35}
                              L ${cabinetLeft} ${counterTopY + config.counterThickness * scale * 2}
                              Z`}
                          fill="#92400e"
                          stroke="#78350f"
                        />
                      )}

                      {/* Person on stool */}
                      {(() => {
                        const stoolY = kitchenFloorY - config.stoolHeight * scale
                        const px = counterRight - config.overhangTowardKitchen * scale / 2
                        return (
                          <g opacity="0.6">
                            <rect x={px - 12} y={stoolY} width="24" height="4" fill="#475569" rx="2"/>
                            <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#475569"/>
                            <ellipse cx={px} cy={stoolY - 35} rx="12" ry="14" fill="#5a7a9a"/>
                            <rect x={px - 12} y={stoolY - 22} width="24" height="24" fill="#5a7a9a" rx="4"/>
                          </g>
                        )
                      })()}

                      {/* Dimensions */}
                      {/* Step height */}
                      <g>
                        <line x1="60" y1={groundY} x2="60" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={groundY} x2="65" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={kitchenFloorY} x2="65" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="50" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="11" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* LR overhang */}
                      {config.overhangTowardLR > 0 && (
                        <g>
                          <line x1={counterLeft} y1={counterTopY - 15} x2={cabinetLeft} y2={counterTopY - 15} stroke="#4ade80" strokeWidth="1"/>
                          <line x1={counterLeft} y1={counterTopY - 20} x2={counterLeft} y2={counterTopY - 10} stroke="#4ade80" strokeWidth="1"/>
                          <line x1={cabinetLeft} y1={counterTopY - 20} x2={cabinetLeft} y2={counterTopY - 10} stroke="#4ade80" strokeWidth="1"/>
                          <text x={(counterLeft + cabinetLeft) / 2} y={counterTopY - 22} textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace">{config.overhangTowardLR}"</text>
                          <text x={(counterLeft + cabinetLeft) / 2} y={counterTopY - 32} textAnchor="middle" fill="#4ade80" fontSize="8">shadow line</text>
                        </g>
                      )}

                      {/* Knee space */}
                      <g>
                        <line x1={cabinetRight} y1={counterTopY - 15} x2={counterRight} y2={counterTopY - 15} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={cabinetRight} y1={counterTopY - 20} x2={cabinetRight} y2={counterTopY - 10} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={counterRight} y1={counterTopY - 20} x2={counterRight} y2={counterTopY - 10} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={(cabinetRight + counterRight) / 2} y={counterTopY - 22} textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">{config.overhangTowardKitchen}" knee</text>
                      </g>

                      {/* Counter height */}
                      <g>
                        <line x1={counterRight + 25} y1={kitchenFloorY} x2={counterRight + 25} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 20} y1={kitchenFloorY} x2={counterRight + 30} y2={kitchenFloorY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 20} y1={counterTopY} x2={counterRight + 30} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <text x={counterRight + 35} y={(kitchenFloorY + counterTopY) / 2} fill="#f472b6" fontSize="11" fontFamily="monospace">{config.counterHeight}"</text>
                      </g>
                    </g>
                  )
                })()}
              </svg>
            </div>
          )}

          {/* 3D PERSPECTIVE SKETCH */}
          {activeView === 'perspective' && (
            <div>
              <svg viewBox="0 0 700 500" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <linearGradient id={`${uniqueId}-floor-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="1"/>
                  </linearGradient>
                  <linearGradient id={`${uniqueId}-cabinet-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={colors.fill}/>
                    <stop offset="100%" stopColor={colors.accent}/>
                  </linearGradient>
                </defs>

                <rect width="700" height="500" fill="#0a0f18"/>

                {(() => {
                  // Simplified 3D perspective
                  const vanishX = 350
                  const vanishY = 180
                  
                  // Base positions
                  const frontLeft = { x: 80, y: 420 }
                  const frontRight = { x: 620, y: 420 }
                  const backLeft = { x: 180, y: 280 }
                  const backRight = { x: 520, y: 280 }
                  
                  const cabinetH = 120
                  const counterH = 8
                  const stepH = 35

                  return (
                    <g>
                      <text x="30" y="30" fill="#60a5fa" fontSize="14" fontWeight="600">3D PERSPECTIVE SKETCH</text>
                      <text x="30" y="50" fill="#64748b" fontSize="11">Approximation of view from living room</text>

                      {/* Floor */}
                      <polygon
                        points={`${frontLeft.x},${frontLeft.y} ${frontRight.x},${frontRight.y} ${backRight.x},${backRight.y} ${backLeft.x},${backLeft.y}`}
                        fill={`url(#${uniqueId}-floor-grad)`}
                      />

                      {/* Step/half-wall */}
                      <polygon
                        points={`${frontLeft.x},${frontLeft.y - stepH} ${frontRight.x},${frontRight.y - stepH} ${frontRight.x},${frontRight.y} ${frontLeft.x},${frontLeft.y}`}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                      />

                      {/* Cabinet front face */}
                      <polygon
                        points={`${frontLeft.x},${frontLeft.y - stepH - cabinetH} ${frontRight.x},${frontRight.y - stepH - cabinetH} ${frontRight.x},${frontRight.y - stepH} ${frontLeft.x},${frontLeft.y - stepH}`}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth="2"
                      />

                      {/* Door divisions */}
                      {[0.33, 0.66].map((pos, i) => {
                        const x = frontLeft.x + (frontRight.x - frontLeft.x) * pos
                        return (
                          <line
                            key={i}
                            x1={x}
                            y1={frontLeft.y - stepH - cabinetH + 8}
                            x2={x}
                            y2={frontLeft.y - stepH - 8}
                            stroke={colors.stroke}
                            strokeWidth="1"
                          />
                        )
                      })}

                      {/* Shaker frames on doors */}
                      {config.doorStyle === 'shaker' && [0, 1, 2].map((i) => {
                        const segW = (frontRight.x - frontLeft.x) / 3
                        const x1 = frontLeft.x + i * segW + 20
                        const x2 = frontLeft.x + (i + 1) * segW - 20
                        const y1 = frontLeft.y - stepH - cabinetH + 20
                        const y2 = frontLeft.y - stepH - 20
                        const isGlass = config.hasGlassInsert && 
                          ((config.glassPosition === 'left' && i === 0) ||
                           (config.glassPosition === 'center' && i === 1) ||
                           (config.glassPosition === 'right' && i === 2))
                        
                        return (
                          <g key={i}>
                            <rect
                              x={x1}
                              y={y1}
                              width={x2 - x1}
                              height={y2 - y1}
                              fill={isGlass ? 'rgba(148, 163, 184, 0.2)' : 'none'}
                              stroke={isGlass ? '#94a3b8' : colors.accent}
                              strokeWidth={isGlass ? 1 : 2}
                            />
                            {isGlass && (
                              <g opacity="0.4">
                                <rect x={x1 + (x2-x1)/2 - 8} y={y2 - 40} width="6" height="30" fill="#94a3b8" rx="1"/>
                                <rect x={x1 + (x2-x1)/2 + 2} y={y2 - 35} width="5" height="25" fill="#94a3b8" rx="1"/>
                              </g>
                            )}
                          </g>
                        )
                      })}

                      {/* Cabinet top surface */}
                      <polygon
                        points={`${frontLeft.x - 15},${frontLeft.y - stepH - cabinetH - counterH} 
                                 ${frontRight.x + 5},${frontRight.y - stepH - cabinetH - counterH}
                                 ${backRight.x},${backRight.y - cabinetH - counterH - 30}
                                 ${backLeft.x - 10},${backLeft.y - cabinetH - counterH - 30}`}
                        fill="#92400e"
                        stroke="#78350f"
                        strokeWidth="2"
                      />

                      {/* Counter front edge (shows overhang) */}
                      {config.overhangTowardLR > 0 && (
                        <polygon
                          points={`${frontLeft.x - 15},${frontLeft.y - stepH - cabinetH - counterH}
                                   ${frontRight.x + 5},${frontRight.y - stepH - cabinetH - counterH}
                                   ${frontRight.x + 5},${frontRight.y - stepH - cabinetH}
                                   ${frontLeft.x - 15},${frontLeft.y - stepH - cabinetH}`}
                          fill="#78350f"
                          stroke="#5c2a0e"
                        />
                      )}

                      {/* Chevron pattern hint on counter */}
                      {config.showChevronPattern && (
                        <g opacity="0.3">
                          {Array.from({ length: 8 }).map((_, i) => {
                            const x = frontLeft.x + i * 70
                            const y = frontLeft.y - stepH - cabinetH - counterH - 3
                            return (
                              <path
                                key={i}
                                d={`M ${x} ${y} L ${x + 35} ${y - 8} L ${x + 70} ${y}`}
                                fill="none"
                                stroke="#a16207"
                                strokeWidth="1"
                              />
                            )
                          })}
                        </g>
                      )}

                      {/* LED glow */}
                      {config.hasLEDLighting && (
                        <ellipse
                          cx={350}
                          cy={frontLeft.y - stepH - cabinetH + 30}
                          rx="250"
                          ry="25"
                          fill="#fef3c7"
                          opacity="0.15"
                        />
                      )}

                      {/* Corbels */}
                      {config.hasCorbels && (
                        <>
                          <path
                            d={`M ${frontLeft.x - 10} ${frontLeft.y - stepH - cabinetH}
                                Q ${frontLeft.x - 5} ${frontLeft.y - stepH - cabinetH + 30}
                                  ${frontLeft.x + 15} ${frontLeft.y - stepH - cabinetH + 35}
                                L ${frontLeft.x + 15} ${frontLeft.y - stepH - cabinetH}
                                Z`}
                            fill="#78350f"
                            stroke="#5c2a0e"
                          />
                          <path
                            d={`M ${frontRight.x + 5} ${frontRight.y - stepH - cabinetH}
                                Q ${frontRight.x} ${frontRight.y - stepH - cabinetH + 30}
                                  ${frontRight.x - 20} ${frontRight.y - stepH - cabinetH + 35}
                                L ${frontRight.x - 20} ${frontRight.y - stepH - cabinetH}
                                Z`}
                            fill="#78350f"
                            stroke="#5c2a0e"
                          />
                        </>
                      )}

                      {/* Recessed toe kick shadow */}
                      {config.toeKickStyle === 'recessed' && (
                        <rect
                          x={frontLeft.x + 15}
                          y={frontLeft.y - stepH - 12}
                          width={frontRight.x - frontLeft.x - 30}
                          height="10"
                          fill="#0f172a"
                          opacity="0.8"
                        />
                      )}

                      {/* Label callouts */}
                      <g>
                        <text x="50" y="470" fill="#94a3b8" fontSize="10">
                          Features shown: {[
                            config.doorStyle !== 'flat' && config.doorStyle + ' doors',
                            config.hasGlassInsert && 'glass insert',
                            config.hasCorbels && 'corbels',
                            config.hasLEDLighting && 'LED',
                            config.toeKickStyle === 'recessed' && 'recessed toe',
                          ].filter(Boolean).join(' • ')}
                        </text>
                      </g>
                    </g>
                  )
                })()}
              </svg>

              <div className="design-note" style={{ marginTop: 16 }}>
                This is a rough sketch to help visualize the overall feel. Actual proportions will vary. Toggle features above to see how they affect the composition.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
