import React, { useState, useId } from 'react'

export default function KitchenConceptsExplorer() {
  const [activeConcept, setActiveConcept] = useState('nook')
  
  const [config, setConfig] = useState({
    // Fixed architectural
    stepHeight: 23.5,
    barLength: 84,
    
    // Shared dimensions
    counterHeight: 40,
    counterThickness: 1.5,
    
    // Concept B: The Nook
    benchHeight: 18,              // Seat height from LR floor
    benchDepth: 16,               // How deep the bench is
    benchStorageType: 'drawers',  // 'drawers', 'lift-top', 'open'
    upperCabinetDepth: 14,        // Shallower since bench takes space
    
    // Concept E: Terraced
    lowerTerraceHeight: 24,       // Height of lower section (matches step)
    lowerTerraceDepth: 14,        // How far it projects into LR
    lowerStorageType: 'mixed',    // 'open', 'closed', 'mixed'
    upperCabinetDepthE: 16,       // Upper cabinet depth
    terraceGap: 2,                // Visual gap between levels
    
    // Design options
    showChevronPattern: true,
    cabinetColor: 'white',
  })

  const uniqueId = useId()
  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Calculated values
  const cabinetHeight = config.counterHeight - config.counterThickness
  const counterFromLRFloor = config.stepHeight + config.counterHeight

  // Storage calculations (rough cubic inches)
  const calcStorageNook = () => {
    const upperStorage = config.barLength * config.upperCabinetDepth * (cabinetHeight - 4) // minus toe kick
    const benchStorage = config.benchStorageType !== 'open' ? config.barLength * config.benchDepth * (config.benchHeight - 4) : 0
    return { upper: upperStorage, bench: benchStorage, total: upperStorage + benchStorage }
  }

  const calcStorageTerrace = () => {
    const upperStorage = config.barLength * config.upperCabinetDepthE * (cabinetHeight - config.lowerTerraceHeight - config.terraceGap)
    const lowerStorage = config.lowerStorageType !== 'open' ? config.barLength * config.lowerTerraceDepth * (config.lowerTerraceHeight - 4) : 0
    return { upper: upperStorage, lower: lowerStorage, total: upperStorage + lowerStorage }
  }

  const storageNook = calcStorageNook()
  const storageTerrace = calcStorageTerrace()

  // Color mappings
  const cabinetColors = {
    white: { fill: '#f8fafc', stroke: '#e2e8f0', accent: '#cbd5e1' },
    sage: { fill: '#a7c4a0', stroke: '#7a9f71', accent: '#5f8256' },
    navy: { fill: '#1e3a5f', stroke: '#0f2744', accent: '#2d4a6f' },
    natural: { fill: '#d4a574', stroke: '#b8956a', accent: '#a67c52' },
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
        .concept-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .concept-tab {
          flex: 1;
          padding: 16px;
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .concept-tab:hover {
          border-color: #60a5fa;
        }
        .concept-tab.active {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }
        .concept-tab h3 {
          margin: 0 0 4px 0;
          font-size: 14px;
          color: #60a5fa;
        }
        .concept-tab p {
          margin: 0;
          font-size: 11px;
          color: #94a3b8;
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
        .storage-meter {
          background: #0f172a;
          border-radius: 4px;
          padding: 12px;
          margin-top: 12px;
        }
        .storage-bar {
          height: 8px;
          background: #334155;
          border-radius: 4px;
          overflow: hidden;
          margin: 8px 0;
        }
        .storage-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
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
        }
        .view-tab:hover { background: #1e3a5f; }
        .view-tab.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .feature-callout {
          background: rgba(34, 197, 94, 0.1);
          border-left: 3px solid #4ade80;
          padding: 10px 12px;
          font-size: 11px;
          color: #94a3b8;
          margin-top: 12px;
          border-radius: 0 4px 4px 0;
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
      `}</style>

      <h1 style={{ color: '#60a5fa', marginBottom: 8, fontSize: 20 }}>Kitchen Concepts Explorer</h1>
      <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 13 }}>
        Two different approaches to your bar — with storage solutions for each
      </p>

      {/* Concept Selector */}
      <div className="concept-tabs">
        <div 
          className={`concept-tab ${activeConcept === 'nook' ? 'active' : ''}`}
          onClick={() => setActiveConcept('nook')}
        >
          <h3>B. The Nook</h3>
          <p>Bench seating on LR side, cabinet storage on kitchen side. Two social zones at different heights.</p>
        </div>
        <div 
          className={`concept-tab ${activeConcept === 'terrace' ? 'active' : ''}`}
          onClick={() => setActiveConcept('terrace')}
        >
          <h3>E. Terraced Levels</h3>
          <p>Two-tier design — lower storage/display facing LR, upper counter with kitchen seating.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        {/* Controls */}
        <div>
          {/* Shared Dimensions */}
          <div className="panel">
            <div className="panel-title">📐 Core Dimensions</div>
            
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
              <div className="slider-note">From kitchen floor</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Bar Length</span>
                <span className="slider-value">{config.barLength}"</span>
              </div>
              <input type="range" min="60" max="96" value={config.barLength}
                onChange={e => update('barLength', +e.target.value)}
              />
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
                ].map(opt => (
                  <div key={opt.id} style={{ textAlign: 'center' }}>
                    <div
                      className={`color-swatch ${config.cabinetColor === opt.id ? 'active' : ''}`}
                      style={{ background: opt.color }}
                      onClick={() => update('cabinetColor', opt.id)}
                    />
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{opt.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Concept-Specific Controls */}
          {activeConcept === 'nook' && (
            <div className="panel">
              <div className="panel-title">🪑 Nook Settings</div>
              
              <div className="slider-group">
                <div className="slider-label">
                  <span>Bench Seat Height</span>
                  <span className="slider-value">{config.benchHeight}"</span>
                </div>
                <input type="range" min="16" max="20" value={config.benchHeight}
                  onChange={e => update('benchHeight', +e.target.value)}
                />
                <div className="slider-note">Standard seat: 17-19" from floor</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Bench Depth</span>
                  <span className="slider-value">{config.benchDepth}"</span>
                </div>
                <input type="range" min="14" max="20" value={config.benchDepth}
                  onChange={e => update('benchDepth', +e.target.value)}
                />
                <div className="slider-note">16-18" is comfortable</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Upper Cabinet Depth</span>
                  <span className="slider-value">{config.upperCabinetDepth}"</span>
                </div>
                <input type="range" min="12" max="18" value={config.upperCabinetDepth}
                  onChange={e => update('upperCabinetDepth', +e.target.value)}
                />
              </div>

              <div className="slider-group">
                <div className="slider-label"><span>Bench Storage Type</span></div>
                <div className="option-group">
                  {[
                    { id: 'drawers', label: 'Drawers' },
                    { id: 'lift-top', label: 'Lift-Top' },
                    { id: 'open', label: 'Open Shelf' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      className={`option-btn ${config.benchStorageType === opt.id ? 'active' : ''}`}
                      onClick={() => update('benchStorageType', opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="feature-callout">
                <strong>How it works:</strong> Sit on the LR bench facing the kitchen. The half-wall becomes your backrest. Counter is at perfect "bar rail" height for resting drinks/food.
              </div>
            </div>
          )}

          {activeConcept === 'terrace' && (
            <div className="panel">
              <div className="panel-title">📊 Terrace Settings</div>
              
              <div className="slider-group">
                <div className="slider-label">
                  <span>Lower Terrace Height</span>
                  <span className="slider-value">{config.lowerTerraceHeight}"</span>
                </div>
                <input type="range" min="20" max="30" value={config.lowerTerraceHeight}
                  onChange={e => update('lowerTerraceHeight', +e.target.value)}
                />
                <div className="slider-note">~24" aligns with step height</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Lower Terrace Depth</span>
                  <span className="slider-value">{config.lowerTerraceDepth}"</span>
                </div>
                <input type="range" min="10" max="18" value={config.lowerTerraceDepth}
                  onChange={e => update('lowerTerraceDepth', +e.target.value)}
                />
                <div className="slider-note">How far it projects into LR</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Upper Cabinet Depth</span>
                  <span className="slider-value">{config.upperCabinetDepthE}"</span>
                </div>
                <input type="range" min="12" max="20" value={config.upperCabinetDepthE}
                  onChange={e => update('upperCabinetDepthE', +e.target.value)}
                />
              </div>

              <div className="slider-group">
                <div className="slider-label"><span>Lower Storage Type</span></div>
                <div className="option-group">
                  {[
                    { id: 'open', label: 'Open Shelves' },
                    { id: 'closed', label: 'Closed Doors' },
                    { id: 'mixed', label: 'Mixed' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      className={`option-btn ${config.lowerStorageType === opt.id ? 'active' : ''}`}
                      onClick={() => update('lowerStorageType', opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="feature-callout">
                <strong>How it works:</strong> Two horizontal bands break up the visual mass. Lower section faces LR (display/storage). Upper section has counter + seating on kitchen side.
              </div>
            </div>
          )}

          {/* Storage Comparison */}
          <div className="panel">
            <div className="panel-title">📦 Storage Comparison</div>
            
            <div className="storage-meter">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: activeConcept === 'nook' ? '#4ade80' : '#94a3b8' }}>The Nook</span>
                <span style={{ color: '#64748b' }}>{Math.round(storageNook.total / 1000)}k cu.in</span>
              </div>
              <div className="storage-bar">
                <div 
                  className="storage-fill" 
                  style={{ 
                    width: `${Math.min(100, storageNook.total / 500)}%`,
                    background: activeConcept === 'nook' ? '#4ade80' : '#64748b'
                  }}
                />
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>
                Upper: {Math.round(storageNook.upper / 1000)}k + Bench: {Math.round(storageNook.bench / 1000)}k
              </div>
            </div>

            <div className="storage-meter">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: activeConcept === 'terrace' ? '#4ade80' : '#94a3b8' }}>Terraced</span>
                <span style={{ color: '#64748b' }}>{Math.round(storageTerrace.total / 1000)}k cu.in</span>
              </div>
              <div className="storage-bar">
                <div 
                  className="storage-fill" 
                  style={{ 
                    width: `${Math.min(100, storageTerrace.total / 500)}%`,
                    background: activeConcept === 'terrace' ? '#4ade80' : '#64748b'
                  }}
                />
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>
                Upper: {Math.round(storageTerrace.upper / 1000)}k + Lower: {Math.round(storageTerrace.lower / 1000)}k
              </div>
            </div>

            <div style={{ marginTop: 12, padding: 8, background: '#0d1520', borderRadius: 4, fontSize: 10, color: '#64748b' }}>
              Original single-cabinet plan: ~{Math.round((config.barLength * 16 * cabinetHeight) / 1000)}k cu.in
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="panel">
          {/* CONCEPT B: THE NOOK */}
          {activeConcept === 'nook' && (
            <div>
              <div style={{ marginBottom: 12, fontSize: 12, color: '#94a3b8' }}>
                <strong style={{ color: '#60a5fa' }}>The Nook:</strong> Bench seating on LR side creates a cozy conversation zone. Storage in upper cabinet + under bench.
              </div>
              
              {/* Side Section View */}
              <svg viewBox="0 0 650 420" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                  <pattern id={`${uniqueId}-chevron`} width="16" height="12" patternUnits="userSpaceOnUse">
                    <path d="M0,6 L8,0 L16,6 M0,6 L8,12 L16,6" fill="none" stroke="#a16207" strokeWidth="0.6" opacity="0.5"/>
                  </pattern>
                  <pattern id={`${uniqueId}-cushion`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1" fill="#64748b" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="650" height="420" fill={`url(#${uniqueId}-grid)`}/>

                {(() => {
                  const scale = 2.8
                  const groundY = 360
                  const kitchenFloorY = groundY - config.stepHeight * scale
                  const counterTopY = kitchenFloorY - cabinetHeight * scale - config.counterThickness * scale
                  
                  const stepX = 280
                  const benchRight = stepX - 10  // Bench is on LR side of wall
                  const benchLeft = benchRight - config.benchDepth * scale
                  const benchTopY = groundY - config.benchHeight * scale
                  
                  const cabinetLeft = stepX
                  const cabinetRight = stepX + config.upperCabinetDepth * scale
                  const counterRight = cabinetRight + 12 * scale  // Knee space
                  const counterLeft = benchLeft - 2 * scale  // Small overhang over bench

                  return (
                    <g>
                      {/* Title */}
                      <text x="30" y="28" fill="#60a5fa" fontSize="14" fontWeight="600">SIDE SECTION — The Nook</text>
                      <text x="30" y="46" fill="#64748b" fontSize="11">Bench seating on LR side, cabinet storage on kitchen side</text>

                      {/* Living room floor */}
                      <rect x="30" y={groundY} width={stepX - 30} height="50" fill="#1e3a5f"/>
                      <text x="120" y={groundY + 28} fill="#3b5a7a" fontSize="10">LIVING ROOM</text>

                      {/* Kitchen floor */}
                      <rect x={stepX} y={kitchenFloorY} width="340" height={groundY - kitchenFloorY + 50} fill="#234060"/>
                      <text x={stepX + 170} y={kitchenFloorY + 20} fill="#3b5a7a" fontSize="10">KITCHEN</text>

                      {/* Existing half-wall (between bench and cabinet) */}
                      <rect
                        x={stepX - 12}
                        y={kitchenFloorY}
                        width="12"
                        height={groundY - kitchenFloorY}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                        strokeWidth="1"
                      />
                      <text x={stepX - 6} y={kitchenFloorY + (groundY - kitchenFloorY) / 2} fill="#8b7355" fontSize="7" textAnchor="middle" transform={`rotate(-90 ${stepX - 6} ${kitchenFloorY + (groundY - kitchenFloorY) / 2})`}>EXISTING WALL</text>

                      {/* BENCH (LR side) */}
                      <g>
                        {/* Bench box */}
                        <rect
                          x={benchLeft}
                          y={benchTopY}
                          width={config.benchDepth * scale}
                          height={config.benchHeight * scale}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />
                        
                        {/* Bench seat cushion */}
                        <rect
                          x={benchLeft + 2}
                          y={benchTopY + 2}
                          width={config.benchDepth * scale - 4}
                          height="12"
                          fill="#475569"
                          rx="3"
                        />
                        <rect
                          x={benchLeft + 2}
                          y={benchTopY + 2}
                          width={config.benchDepth * scale - 4}
                          height="12"
                          fill={`url(#${uniqueId}-cushion)`}
                          rx="3"
                        />

                        {/* Storage indication based on type */}
                        {config.benchStorageType === 'drawers' && (
                          <>
                            <line x1={benchLeft + 8} y1={benchTopY + config.benchHeight * scale * 0.4} x2={benchRight - 16} y2={benchTopY + config.benchHeight * scale * 0.4} stroke={colors.accent} strokeWidth="1"/>
                            <line x1={benchLeft + 8} y1={benchTopY + config.benchHeight * scale * 0.65} x2={benchRight - 16} y2={benchTopY + config.benchHeight * scale * 0.65} stroke={colors.accent} strokeWidth="1"/>
                            <text x={benchLeft + config.benchDepth * scale / 2} y={benchTopY + config.benchHeight * scale * 0.55} fill={colors.accent} fontSize="8" textAnchor="middle">drawers</text>
                          </>
                        )}
                        {config.benchStorageType === 'lift-top' && (
                          <>
                            <path d={`M ${benchLeft + 10} ${benchTopY + 16} L ${benchLeft + config.benchDepth * scale / 2} ${benchTopY + 26} L ${benchRight - 18} ${benchTopY + 16}`} fill="none" stroke={colors.accent} strokeWidth="1"/>
                            <text x={benchLeft + config.benchDepth * scale / 2} y={benchTopY + config.benchHeight * scale * 0.6} fill={colors.accent} fontSize="8" textAnchor="middle">lift-top</text>
                          </>
                        )}
                        {config.benchStorageType === 'open' && (
                          <>
                            <rect x={benchLeft + 6} y={benchTopY + 18} width={config.benchDepth * scale - 20} height={config.benchHeight * scale - 26} fill="#0f172a" rx="2"/>
                            <text x={benchLeft + config.benchDepth * scale / 2} y={benchTopY + config.benchHeight * scale * 0.6} fill="#64748b" fontSize="8" textAnchor="middle">open</text>
                          </>
                        )}

                        {/* Bench label */}
                        <text x={benchLeft + config.benchDepth * scale / 2} y={groundY + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">BENCH</text>
                      </g>

                      {/* UPPER CABINET (Kitchen side) */}
                      <g>
                        <rect
                          x={cabinetLeft}
                          y={counterTopY + config.counterThickness * scale}
                          width={config.upperCabinetDepth * scale}
                          height={cabinetHeight * scale}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />
                        
                        {/* Shelves */}
                        <line x1={cabinetLeft + 6} y1={counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.35} x2={cabinetRight - 6} y2={counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.35} stroke={colors.accent} strokeWidth="1.5" strokeDasharray="4,2"/>
                        <line x1={cabinetLeft + 6} y1={counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.65} x2={cabinetRight - 6} y2={counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.65} stroke={colors.accent} strokeWidth="1.5" strokeDasharray="4,2"/>

                        {/* Door indication (faces kitchen) */}
                        <path d={`M ${cabinetRight + 8} ${counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.5} l 12 -6 l 0 12 z`} fill="#60a5fa" opacity="0.6"/>
                        <text x={cabinetRight + 25} y={counterTopY + config.counterThickness * scale + cabinetHeight * scale * 0.5 + 4} fill="#60a5fa" fontSize="8">doors</text>

                        {/* Cabinet label */}
                        <text x={cabinetLeft + config.upperCabinetDepth * scale / 2} y={kitchenFloorY + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">CABINET</text>
                      </g>

                      {/* BUTCHER BLOCK COUNTER */}
                      <rect
                        x={counterLeft}
                        y={counterTopY}
                        width={counterRight - counterLeft}
                        height={config.counterThickness * scale * 2}
                        fill="#92400e"
                        stroke="#78350f"
                        strokeWidth="2"
                      />
                      {config.showChevronPattern && (
                        <rect
                          x={counterLeft}
                          y={counterTopY}
                          width={counterRight - counterLeft}
                          height={config.counterThickness * scale * 2}
                          fill={`url(#${uniqueId}-chevron)`}
                        />
                      )}

                      {/* Person sitting on bench */}
                      <g opacity="0.6">
                        <ellipse cx={benchLeft + config.benchDepth * scale / 2} cy={benchTopY - 45} rx="14" ry="16" fill="#5a7a9a"/>
                        <rect x={benchLeft + config.benchDepth * scale / 2 - 14} y={benchTopY - 30} width="28" height="32" fill="#5a7a9a" rx="4"/>
                        {/* Legs */}
                        <rect x={benchLeft + config.benchDepth * scale / 2 - 10} y={benchTopY + 2} width="8" height={groundY - benchTopY - 6} fill="#5a7a9a" rx="3"/>
                        <rect x={benchLeft + config.benchDepth * scale / 2 + 2} y={benchTopY + 2} width="8" height={groundY - benchTopY - 6} fill="#5a7a9a" rx="3"/>
                        {/* Arm reaching to counter */}
                        <rect x={benchLeft + config.benchDepth * scale / 2 + 10} y={benchTopY - 22} width="35" height="6" fill="#5a7a9a" rx="2"/>
                      </g>

                      {/* Person on stool (kitchen side) */}
                      <g opacity="0.6">
                        {(() => {
                          const stoolX = cabinetRight + 10 * scale
                          const stoolY = kitchenFloorY - 28 * scale
                          return (
                            <>
                              <rect x={stoolX - 12} y={stoolY} width="24" height="4" fill="#475569" rx="2"/>
                              <rect x={stoolX - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#475569"/>
                              <ellipse cx={stoolX} cy={stoolY - 40} rx="12" ry="14" fill="#5a7a9a"/>
                              <rect x={stoolX - 12} y={stoolY - 26} width="24" height="28" fill="#5a7a9a" rx="4"/>
                            </>
                          )
                        })()}
                      </g>

                      {/* DIMENSIONS */}
                      {/* Bench height */}
                      <g>
                        <line x1={benchLeft - 20} y1={groundY} x2={benchLeft - 20} y2={benchTopY} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={benchLeft - 25} y1={groundY} x2={benchLeft - 15} y2={groundY} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={benchLeft - 25} y1={benchTopY} x2={benchLeft - 15} y2={benchTopY} stroke="#4ade80" strokeWidth="1"/>
                        <text x={benchLeft - 30} y={(groundY + benchTopY) / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="10" fontFamily="monospace">{config.benchHeight}"</text>
                        <text x={benchLeft - 30} y={(groundY + benchTopY) / 2 + 14} textAnchor="end" fill="#64748b" fontSize="8">bench</text>
                      </g>

                      {/* Counter height from kitchen */}
                      <g>
                        <line x1={counterRight + 20} y1={kitchenFloorY} x2={counterRight + 20} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 15} y1={kitchenFloorY} x2={counterRight + 25} y2={kitchenFloorY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 15} y1={counterTopY} x2={counterRight + 25} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <text x={counterRight + 30} y={(kitchenFloorY + counterTopY) / 2} fill="#f472b6" fontSize="10" fontFamily="monospace">{config.counterHeight}"</text>
                      </g>

                      {/* Step height */}
                      <g>
                        <line x1="60" y1={groundY} x2="60" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={groundY} x2="65" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={kitchenFloorY} x2="65" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="50" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* Counter from LR floor */}
                      <g>
                        <line x1="30" y1={groundY} x2="30" y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1="25" y1={groundY} x2="35" y2={groundY} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1="25" y1={counterTopY} x2="35" y2={counterTopY} stroke="#60a5fa" strokeWidth="1"/>
                        <text x="20" y={(groundY + counterTopY) / 2} textAnchor="end" fill="#60a5fa" fontSize="10" fontFamily="monospace">{counterFromLRFloor}"</text>
                      </g>

                      {/* Bench depth */}
                      <g>
                        <line x1={benchLeft} y1={groundY + 35} x2={benchRight} y2={groundY + 35} stroke="#94a3b8" strokeWidth="1"/>
                        <line x1={benchLeft} y1={groundY + 30} x2={benchLeft} y2={groundY + 40} stroke="#94a3b8" strokeWidth="1"/>
                        <line x1={benchRight} y1={groundY + 30} x2={benchRight} y2={groundY + 40} stroke="#94a3b8" strokeWidth="1"/>
                        <text x={(benchLeft + benchRight) / 2} y={groundY + 48} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{config.benchDepth}"</text>
                      </g>

                      {/* Social zone indicator */}
                      <g>
                        <ellipse cx={(benchLeft + counterRight) / 2} cy={counterTopY - 50} rx="80" ry="30" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
                        <text x={(benchLeft + counterRight) / 2} y={counterTopY - 70} textAnchor="middle" fill="#fbbf24" fontSize="9">conversation zone</text>
                      </g>
                    </g>
                  )
                })()}
              </svg>

              {/* Key benefits */}
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Two Seating Zones', detail: 'LR bench + kitchen stools', icon: '🪑' },
                  { label: 'Face-to-Face', detail: 'Natural conversation across levels', icon: '💬' },
                  { label: 'Dual Storage', detail: `Upper cabinet + bench storage`, icon: '📦' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0d1520', padding: 12, borderRadius: 6, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#60a5fa' }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONCEPT E: TERRACED */}
          {activeConcept === 'terrace' && (
            <div>
              <div style={{ marginBottom: 12, fontSize: 12, color: '#94a3b8' }}>
                <strong style={{ color: '#60a5fa' }}>Terraced Levels:</strong> Two horizontal bands break up the mass. Lower tier faces LR, upper tier has counter + seating.
              </div>
              
              {/* Side Section View */}
              <svg viewBox="0 0 650 420" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid-t`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                  <pattern id={`${uniqueId}-chevron-t`} width="16" height="12" patternUnits="userSpaceOnUse">
                    <path d="M0,6 L8,0 L16,6 M0,6 L8,12 L16,6" fill="none" stroke="#a16207" strokeWidth="0.6" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect width="650" height="420" fill={`url(#${uniqueId}-grid-t)`}/>

                {(() => {
                  const scale = 2.8
                  const groundY = 360
                  const kitchenFloorY = groundY - config.stepHeight * scale
                  
                  const lowerTerraceTop = groundY - config.lowerTerraceHeight * scale
                  const upperCabinetHeight = cabinetHeight - config.lowerTerraceHeight - config.terraceGap
                  const upperCabinetTop = kitchenFloorY - cabinetHeight * scale
                  const counterTopY = upperCabinetTop - config.counterThickness * scale
                  
                  const stepX = 280
                  const lowerLeft = stepX - config.lowerTerraceDepth * scale - 8  // Projects past step into LR
                  const lowerRight = stepX - 8
                  
                  const upperLeft = stepX
                  const upperRight = stepX + config.upperCabinetDepthE * scale
                  const counterRight = upperRight + 12 * scale  // Knee space

                  return (
                    <g>
                      {/* Title */}
                      <text x="30" y="28" fill="#60a5fa" fontSize="14" fontWeight="600">SIDE SECTION — Terraced Levels</text>
                      <text x="30" y="46" fill="#64748b" fontSize="11">Two-tier design with lower storage facing LR</text>

                      {/* Living room floor */}
                      <rect x="30" y={groundY} width={stepX - 30} height="50" fill="#1e3a5f"/>
                      <text x="100" y={groundY + 28} fill="#3b5a7a" fontSize="10">LIVING ROOM</text>

                      {/* Kitchen floor */}
                      <rect x={stepX} y={kitchenFloorY} width="340" height={groundY - kitchenFloorY + 50} fill="#234060"/>
                      <text x={stepX + 170} y={kitchenFloorY + 20} fill="#3b5a7a" fontSize="10">KITCHEN</text>

                      {/* Existing half-wall */}
                      <rect
                        x={stepX - 8}
                        y={kitchenFloorY}
                        width="8"
                        height={groundY - kitchenFloorY}
                        fill="#d4c5b0"
                        stroke="#b8a890"
                        strokeWidth="1"
                      />

                      {/* LOWER TERRACE (faces LR) */}
                      <g>
                        <rect
                          x={lowerLeft}
                          y={lowerTerraceTop}
                          width={config.lowerTerraceDepth * scale}
                          height={config.lowerTerraceHeight * scale}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />

                        {/* Storage based on type */}
                        {config.lowerStorageType === 'open' && (
                          <>
                            <rect x={lowerLeft + 4} y={lowerTerraceTop + 6} width={config.lowerTerraceDepth * scale - 8} height={config.lowerTerraceHeight * scale * 0.45 - 8} fill="#0f172a" rx="2"/>
                            <rect x={lowerLeft + 4} y={lowerTerraceTop + config.lowerTerraceHeight * scale * 0.5 + 2} width={config.lowerTerraceDepth * scale - 8} height={config.lowerTerraceHeight * scale * 0.45 - 8} fill="#0f172a" rx="2"/>
                            {/* Display items */}
                            <rect x={lowerLeft + 10} y={lowerTerraceTop + config.lowerTerraceHeight * scale * 0.35} width="12" height="16" fill="#60a5fa" opacity="0.3" rx="1"/>
                            <rect x={lowerLeft + 26} y={lowerTerraceTop + config.lowerTerraceHeight * scale * 0.3} width="8" height="22" fill="#4ade80" opacity="0.3" rx="1"/>
                          </>
                        )}
                        {config.lowerStorageType === 'closed' && (
                          <>
                            <rect x={lowerLeft + 4} y={lowerTerraceTop + 4} width={config.lowerTerraceDepth * scale - 8} height={config.lowerTerraceHeight * scale - 8} fill="none" stroke={colors.accent} strokeWidth="1.5" rx="2"/>
                            <circle cx={lowerLeft + config.lowerTerraceDepth * scale - 14} cy={lowerTerraceTop + config.lowerTerraceHeight * scale / 2} r="3" fill={colors.accent}/>
                          </>
                        )}
                        {config.lowerStorageType === 'mixed' && (
                          <>
                            {/* Open top shelf */}
                            <rect x={lowerLeft + 4} y={lowerTerraceTop + 6} width={config.lowerTerraceDepth * scale - 8} height={config.lowerTerraceHeight * scale * 0.4 - 6} fill="#0f172a" rx="2"/>
                            <rect x={lowerLeft + 8} y={lowerTerraceTop + config.lowerTerraceHeight * scale * 0.25} width="10" height="14" fill="#60a5fa" opacity="0.3" rx="1"/>
                            {/* Closed bottom */}
                            <rect x={lowerLeft + 4} y={lowerTerraceTop + config.lowerTerraceHeight * scale * 0.45} width={config.lowerTerraceDepth * scale - 8} height={config.lowerTerraceHeight * scale * 0.5} fill="none" stroke={colors.accent} strokeWidth="1" rx="2"/>
                          </>
                        )}

                        {/* Label */}
                        <text x={lowerLeft + config.lowerTerraceDepth * scale / 2} y={groundY + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">LOWER</text>
                      </g>

                      {/* UPPER CABINET */}
                      <g>
                        <rect
                          x={upperLeft}
                          y={upperCabinetTop}
                          width={config.upperCabinetDepthE * scale}
                          height={upperCabinetHeight * scale}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />

                        {/* Shelves */}
                        <line x1={upperLeft + 6} y1={upperCabinetTop + upperCabinetHeight * scale * 0.45} x2={upperRight - 6} y2={upperCabinetTop + upperCabinetHeight * scale * 0.45} stroke={colors.accent} strokeWidth="1.5" strokeDasharray="4,2"/>

                        {/* Door arrow */}
                        <path d={`M ${upperRight + 8} ${upperCabinetTop + upperCabinetHeight * scale * 0.5} l 12 -6 l 0 12 z`} fill="#60a5fa" opacity="0.6"/>
                        <text x={upperRight + 25} y={upperCabinetTop + upperCabinetHeight * scale * 0.5 + 4} fill="#60a5fa" fontSize="8">doors</text>

                        {/* Label */}
                        <text x={upperLeft + config.upperCabinetDepthE * scale / 2} y={kitchenFloorY + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">UPPER</text>
                      </g>

                      {/* Gap/shadow between tiers */}
                      <rect
                        x={lowerRight}
                        y={lowerTerraceTop - config.terraceGap * scale}
                        width={upperLeft - lowerRight + 4}
                        height={config.terraceGap * scale}
                        fill="#0f172a"
                        opacity="0.5"
                      />

                      {/* BUTCHER BLOCK COUNTER */}
                      <rect
                        x={lowerLeft - 2 * scale}
                        y={counterTopY}
                        width={counterRight - lowerLeft + 2 * scale}
                        height={config.counterThickness * scale * 2}
                        fill="#92400e"
                        stroke="#78350f"
                        strokeWidth="2"
                      />
                      {config.showChevronPattern && (
                        <rect
                          x={lowerLeft - 2 * scale}
                          y={counterTopY}
                          width={counterRight - lowerLeft + 2 * scale}
                          height={config.counterThickness * scale * 2}
                          fill={`url(#${uniqueId}-chevron-t)`}
                        />
                      )}

                      {/* Person on stool */}
                      <g opacity="0.6">
                        {(() => {
                          const stoolX = upperRight + 8 * scale
                          const stoolY = kitchenFloorY - 28 * scale
                          return (
                            <>
                              <rect x={stoolX - 12} y={stoolY} width="24" height="4" fill="#475569" rx="2"/>
                              <rect x={stoolX - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#475569"/>
                              <ellipse cx={stoolX} cy={stoolY - 40} rx="12" ry="14" fill="#5a7a9a"/>
                              <rect x={stoolX - 12} y={stoolY - 26} width="24" height="28" fill="#5a7a9a" rx="4"/>
                            </>
                          )
                        })()}
                      </g>

                      {/* DIMENSIONS */}
                      {/* Lower terrace height */}
                      <g>
                        <line x1={lowerLeft - 20} y1={groundY} x2={lowerLeft - 20} y2={lowerTerraceTop} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={lowerLeft - 25} y1={groundY} x2={lowerLeft - 15} y2={groundY} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={lowerLeft - 25} y1={lowerTerraceTop} x2={lowerLeft - 15} y2={lowerTerraceTop} stroke="#4ade80" strokeWidth="1"/>
                        <text x={lowerLeft - 30} y={(groundY + lowerTerraceTop) / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="10" fontFamily="monospace">{config.lowerTerraceHeight}"</text>
                      </g>

                      {/* Counter height */}
                      <g>
                        <line x1={counterRight + 20} y1={kitchenFloorY} x2={counterRight + 20} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 15} y1={kitchenFloorY} x2={counterRight + 25} y2={kitchenFloorY} stroke="#f472b6" strokeWidth="1"/>
                        <line x1={counterRight + 15} y1={counterTopY} x2={counterRight + 25} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                        <text x={counterRight + 30} y={(kitchenFloorY + counterTopY) / 2} fill="#f472b6" fontSize="10" fontFamily="monospace">{config.counterHeight}"</text>
                      </g>

                      {/* Step height */}
                      <g>
                        <line x1="60" y1={groundY} x2="60" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={groundY} x2="65" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="55" y1={kitchenFloorY} x2="65" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="50" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* Lower depth */}
                      <g>
                        <line x1={lowerLeft} y1={groundY + 35} x2={lowerRight} y2={groundY + 35} stroke="#94a3b8" strokeWidth="1"/>
                        <line x1={lowerLeft} y1={groundY + 30} x2={lowerLeft} y2={groundY + 40} stroke="#94a3b8" strokeWidth="1"/>
                        <line x1={lowerRight} y1={groundY + 30} x2={lowerRight} y2={groundY + 40} stroke="#94a3b8" strokeWidth="1"/>
                        <text x={(lowerLeft + lowerRight) / 2} y={groundY + 48} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{config.lowerTerraceDepth}"</text>
                      </g>

                      {/* Visual layers annotation */}
                      <g>
                        <line x1="30" y1={counterTopY} x2="50" y2={counterTopY - 15} stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2,2"/>
                        <text x="52" y={counterTopY - 18} fill="#fbbf24" fontSize="8">layer 3: counter</text>
                        
                        <line x1="30" y1={upperCabinetTop + upperCabinetHeight * scale / 2} x2="50" y2={upperCabinetTop + upperCabinetHeight * scale / 2 - 10} stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2,2"/>
                        <text x="52" y={upperCabinetTop + upperCabinetHeight * scale / 2 - 12} fill="#fbbf24" fontSize="8">layer 2: upper cabinet</text>
                        
                        <line x1={lowerLeft + 10} y1={lowerTerraceTop + config.lowerTerraceHeight * scale / 2} x2={lowerLeft - 15} y2={lowerTerraceTop + config.lowerTerraceHeight * scale / 2 - 15} stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2,2"/>
                        <text x={lowerLeft - 18} y={lowerTerraceTop + config.lowerTerraceHeight * scale / 2 - 18} fill="#fbbf24" fontSize="8" textAnchor="end">layer 1: lower terrace</text>
                      </g>
                    </g>
                  )
                })()}
              </svg>

              {/* Front View */}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>FRONT VIEW — What you see from the living room</div>
                <svg viewBox="0 0 650 300" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  {(() => {
                    const scale = 1.8
                    const barLengthPx = config.barLength * scale
                    const startX = (650 - barLengthPx) / 2
                    const groundY = 260
                    const lowerTop = groundY - config.lowerTerraceHeight * scale
                    const upperHeight = (cabinetHeight - config.lowerTerraceHeight - config.terraceGap) * scale
                    const upperTop = lowerTop - config.terraceGap * scale - upperHeight
                    const counterTop = upperTop - config.counterThickness * scale * 2

                    return (
                      <g>
                        {/* LR Floor */}
                        <rect x="30" y={groundY} width="590" height="35" fill="#1e3a5f"/>
                        
                        {/* Lower terrace */}
                        <rect
                          x={startX}
                          y={lowerTop}
                          width={barLengthPx}
                          height={config.lowerTerraceHeight * scale}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />
                        
                        {/* Lower storage visualization */}
                        {config.lowerStorageType === 'open' && (
                          <>
                            {[0, 1, 2, 3].map((i) => {
                              const cubbieW = barLengthPx / 4
                              return (
                                <rect 
                                  key={i}
                                  x={startX + i * cubbieW + 6} 
                                  y={lowerTop + 6} 
                                  width={cubbieW - 12} 
                                  height={config.lowerTerraceHeight * scale - 12} 
                                  fill="#0f172a" 
                                  rx="2"
                                />
                              )
                            })}
                          </>
                        )}
                        {config.lowerStorageType === 'closed' && (
                          <>
                            {[0, 1, 2].map((i) => {
                              const doorW = barLengthPx / 3
                              return (
                                <g key={i}>
                                  <rect 
                                    x={startX + i * doorW + 6} 
                                    y={lowerTop + 6} 
                                    width={doorW - 12} 
                                    height={config.lowerTerraceHeight * scale - 12} 
                                    fill="none"
                                    stroke={colors.accent}
                                    strokeWidth="1.5"
                                    rx="2"
                                  />
                                  <circle cx={startX + (i + 1) * doorW - 16} cy={lowerTop + config.lowerTerraceHeight * scale / 2} r="3" fill={colors.accent}/>
                                </g>
                              )
                            })}
                          </>
                        )}
                        {config.lowerStorageType === 'mixed' && (
                          <>
                            {/* Open cubbies on ends */}
                            <rect x={startX + 6} y={lowerTop + 6} width={barLengthPx / 4 - 10} height={config.lowerTerraceHeight * scale - 12} fill="#0f172a" rx="2"/>
                            <rect x={startX + barLengthPx * 0.75 + 4} y={lowerTop + 6} width={barLengthPx / 4 - 10} height={config.lowerTerraceHeight * scale - 12} fill="#0f172a" rx="2"/>
                            {/* Closed center */}
                            <rect x={startX + barLengthPx / 4 + 4} y={lowerTop + 6} width={barLengthPx / 2 - 8} height={config.lowerTerraceHeight * scale - 12} fill="none" stroke={colors.accent} strokeWidth="1.5" rx="2"/>
                          </>
                        )}

                        {/* Gap between levels */}
                        <rect x={startX} y={lowerTop - config.terraceGap * scale} width={barLengthPx} height={config.terraceGap * scale} fill="#0f172a"/>

                        {/* Upper cabinet */}
                        <rect
                          x={startX}
                          y={upperTop}
                          width={barLengthPx}
                          height={upperHeight}
                          fill={colors.fill}
                          stroke={colors.stroke}
                          strokeWidth="2"
                        />
                        
                        {/* Shaker-style doors on upper */}
                        {[0, 1, 2].map((i) => {
                          const doorW = barLengthPx / 3
                          return (
                            <rect 
                              key={i}
                              x={startX + i * doorW + 12} 
                              y={upperTop + 10} 
                              width={doorW - 24} 
                              height={upperHeight - 20} 
                              fill="none"
                              stroke={colors.accent}
                              strokeWidth="2"
                              rx="2"
                            />
                          )
                        })}

                        {/* Counter */}
                        <rect
                          x={startX - 4}
                          y={counterTop}
                          width={barLengthPx + 8}
                          height={config.counterThickness * scale * 2}
                          fill="#92400e"
                          stroke="#78350f"
                          strokeWidth="2"
                        />

                        {/* Labels */}
                        <text x={startX - 10} y={lowerTop + config.lowerTerraceHeight * scale / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="9">lower</text>
                        <text x={startX - 10} y={upperTop + upperHeight / 2 + 4} textAnchor="end" fill="#60a5fa" fontSize="9">upper</text>
                      </g>
                    )
                  })()}
                </svg>
              </div>

              {/* Key benefits */}
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Visual Layers', detail: 'Breaks up the "block" into horizontal bands', icon: '📊' },
                  { label: 'LR-Facing Storage', detail: config.lowerStorageType === 'open' ? 'Display books, plants, decor' : 'Hidden storage facing LR', icon: '📚' },
                  { label: 'Shadow Lines', detail: 'Gap between tiers adds depth', icon: '🌗' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0d1520', padding: 12, borderRadius: 6, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#60a5fa' }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
