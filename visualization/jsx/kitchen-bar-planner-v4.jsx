import React, { useState, useId } from 'react';

export default function KitchenBarPlannerV4() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    barTopHeight: 40,
    barDepth: 28,
    cabinetDepth: 12,
    barLength: 84,
    stoolHeight: 30,
    barTopThickness: 1.5,
    showPerson: true,
    cabinetStyle: 'mixed',
    waterfallEdge: false,
    showLighting: true,
    passThrough: false,
    passThroughWidth: 24,
    wineStorage: false,
    // Preset tracking
    activePreset: 'flush',
    // Tiered bar option
    tieredBar: false,
    raisedBarHeight: 6,
  });

  const [activeView, setActiveView] = useState('all');
  const uniqueId = useId();

  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  // Preset definitions - two main configurations
  const presets = {
    flush: {
      name: 'Flush',
      desc: 'Single-level counter aligned with step',
      pros: ['Simplest build', 'Standard cabinets', 'Clean look'],
      cons: ['Counter height only (36")'],
      values: { tieredBar: false }
    },
    tiered: {
      name: 'Tiered',
      desc: 'Counter + raised bar section facing LR',
      pros: ['True bar height (42"+)', 'Hides kitchen mess'],
      cons: ['More complex build', 'Crumb gap between levels'],
      values: { tieredBar: true, raisedBarHeight: 6 }
    },
  };

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

  // Calculated values with safety bounds
  const kneeSpaceKitchen = Math.max(0, config.barDepth - config.cabinetDepth);
  const barFromLivingRoom = config.barTopHeight + config.stepHeight;
  const cabinetHeight = Math.max(20, barFromLivingRoom - 4);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '16px',
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .panel {
          background: #111d2e;
          border: 1px solid #243447;
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
          border-bottom: 1px solid #243447;
        }
        .slider-group { margin-bottom: 12px; }
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
        .toggle-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .toggle-btn {
          padding: 6px 12px;
          font-size: 11px;
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
        .view-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .view-tab {
          padding: 8px 14px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #111d2e;
          border: 1px solid #243447;
          color: #64748b;
          border-radius: 4px;
          cursor: pointer;
        }
        .view-tab.active {
          background: #1e3a5f;
          border-color: #3b82f6;
          color: #60a5fa;
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
        }
        .preset-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .preset-btn {
          flex: 1;
          min-width: 50px;
          padding: 8px 6px;
          font-size: 10px;
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
          background: #1e3a5f;
          border-color: #3b82f6;
          color: #60a5fa;
        }
        .preset-info {
          background: #0d1520;
          border-radius: 4px;
          padding: 10px;
          margin-top: 4px;
        }
        .preset-desc {
          font-size: 12px;
          color: #e2e8f0;
          margin-bottom: 8px;
        }
        .preset-pros-cons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 10px;
        }
        .preset-pro {
          color: #4ade80;
        }
        .preset-con {
          color: #fb923c;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Split-Level Kitchen Bar Planner v4
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
            Interactive design tool with configuration presets
          </p>
        </div>

        {/* View Tabs */}
        <div className="view-tabs">
          {[
            { id: 'all', label: 'All Views' },
            { id: 'section', label: 'Side Section' },
            { id: 'elevation', label: 'Front View' },
            { id: 'plan', label: 'Plan View' },
            { id: 'construction', label: 'Construction' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`view-tab ${activeView === tab.id ? 'active' : ''}`}
              onClick={() => setActiveView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
          {/* Left Panel - Controls */}
          <div>
            {/* Configuration Presets */}
            <div className="panel">
              <div className="panel-title">Configuration Presets</div>
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
                  <div className="preset-desc">{presets[config.activePreset].desc}</div>
                  <div className="preset-pros-cons">
                    {presets[config.activePreset].pros.map((pro, i) => (
                      <span key={`pro-${i}`} className="preset-pro">✓ {pro}</span>
                    ))}
                    {presets[config.activePreset].cons.map((con, i) => (
                      <span key={`con-${i}`} className="preset-con">⚠ {con}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="panel">
              <div className="panel-title">Dimensions</div>
              
              <div className="slider-group">
                <div className="slider-label">
                  <span>Step Height (fixed)</span>
                  <span className="slider-value">{config.stepHeight}"</span>
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: '#1e3a5f',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#94a3b8'
                }}>
                  Your step is 23.5" — this is a fixed architectural constraint
                </div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Bar Top Height</span>
                  <span className="slider-value">{config.barTopHeight}"</span>
                </div>
                <input type="range" min="36" max="46" step="1"
                  value={config.barTopHeight}
                  onChange={e => update('barTopHeight', parseFloat(e.target.value))} />
                <div className="slider-note">From kitchen floor (bar: 42", counter: 36")</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Total Depth</span>
                  <span className="slider-value">{config.barDepth}"</span>
                </div>
                <input type="range" min="24" max="36" step="1"
                  value={config.barDepth}
                  onChange={e => update('barDepth', parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Cabinet Depth</span>
                  <span className="slider-value">{config.cabinetDepth}"</span>
                </div>
                <input type="range" min="8" max="24" step="1"
                  value={config.cabinetDepth}
                  onChange={e => update('cabinetDepth', parseFloat(e.target.value))} />
                <div className="slider-note">Standard base cabinet: 24"</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Bar Length</span>
                  <span className="slider-value">{config.barLength}"</span>
                </div>
                <input type="range" min="60" max="120" step="6"
                  value={config.barLength}
                  onChange={e => update('barLength', parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Stool Height</span>
                  <span className="slider-value">{config.stoolHeight}"</span>
                </div>
                <input type="range" min="24" max="34" step="1"
                  value={config.stoolHeight}
                  onChange={e => update('stoolHeight', parseFloat(e.target.value))} />
                <div className="slider-note">Bar stools: 28-30"</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Top Thickness</span>
                  <span className="slider-value">{config.barTopThickness}"</span>
                </div>
                <input type="range" min="1" max="2.5" step="0.25"
                  value={config.barTopThickness}
                  onChange={e => update('barTopThickness', parseFloat(e.target.value))} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-title">Design Options</div>
              
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>Cabinet Style</div>
                <div className="toggle-group">
                  {['doors', 'open', 'mixed'].map(style => (
                    <button
                      key={style}
                      className={`toggle-btn ${config.cabinetStyle === style ? 'active' : ''}`}
                      onClick={() => update('cabinetStyle', style)}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiered Bar Toggle */}
              <div className="checkbox-item" onClick={() => update('tieredBar', !config.tieredBar)}>
                <input type="checkbox" checked={config.tieredBar} readOnly />
                <span>Tiered bar (raised section)</span>
              </div>
              {config.tieredBar && (
                <div className="slider-group" style={{ marginLeft: 24, marginTop: 8 }}>
                  <div className="slider-label">
                    <span>Raised Height</span>
                    <span className="slider-value">{config.raisedBarHeight}"</span>
                  </div>
                  <input type="range" min="4" max="10" step="1"
                    value={config.raisedBarHeight}
                    onChange={e => update('raisedBarHeight', parseFloat(e.target.value))} />
                  <div className="slider-note">Height above counter level</div>
                </div>
              )}

              <div className="checkbox-item" onClick={() => update('waterfallEdge', !config.waterfallEdge)}>
                <input type="checkbox" checked={config.waterfallEdge} readOnly />
                <span>Waterfall edge (sides)</span>
              </div>

              <div className="checkbox-item" onClick={() => update('showLighting', !config.showLighting)}>
                <input type="checkbox" checked={config.showLighting} readOnly />
                <span>Under-cabinet lighting</span>
              </div>
              
              <div className="checkbox-item" onClick={() => update('wineStorage', !config.wineStorage)}>
                <input type="checkbox" checked={config.wineStorage} readOnly />
                <span>Wine storage section</span>
              </div>
              
              <div className="checkbox-item" onClick={() => update('passThrough', !config.passThrough)}>
                <input type="checkbox" checked={config.passThrough} readOnly />
                <span>Pass-through opening</span>
              </div>

              {config.passThrough && (
                <div className="slider-group" style={{ marginLeft: 24, marginTop: 8 }}>
                  <div className="slider-label">
                    <span>Opening Width</span>
                    <span className="slider-value">{config.passThroughWidth}"</span>
                  </div>
                  <input type="range" min="18" max="36" step="2"
                    value={config.passThroughWidth}
                    onChange={e => update('passThroughWidth', parseFloat(e.target.value))} />
                </div>
              )}

              <div className="checkbox-item" onClick={() => update('showPerson', !config.showPerson)}>
                <input type="checkbox" checked={config.showPerson} readOnly />
                <span>Show seated person</span>
              </div>
            </div>

            <div className="panel">
              <div className="panel-title">Calculated Values</div>
              
              <div className="calc-row">
                <span>Bar from living room floor</span>
                <span>{barFromLivingRoom}"</span>
              </div>
              <div className="calc-row">
                <span>Kitchen knee clearance</span>
                <span>{kneeSpaceKitchen}"</span>
              </div>
              <div className="calc-row">
                <span>Cabinet height (approx)</span>
                <span>{cabinetHeight}"</span>
              </div>
              <div className="calc-row">
                <span>Seat to bar top</span>
                <span>{config.barTopHeight - config.stoolHeight}"</span>
              </div>
              <div className="calc-row">
                <span>Seating capacity</span>
                <span>~{Math.floor(config.barLength / 24)}</span>
              </div>

              {config.tieredBar && (
                <div className="calc-row" style={{ color: '#f472b6' }}>
                  <span>Raised bar from LR floor</span>
                  <span>{barFromLivingRoom + config.raisedBarHeight}"</span>
                </div>
              )}

              <div className={kneeSpaceKitchen >= 12 ? 'status-ok' : 'status-warn'}>
                {kneeSpaceKitchen >= 12 ? '✓' : '⚠'} Knee space {kneeSpaceKitchen >= 12 ? 'comfortable' : 'may be tight'} (12"+ recommended)
              </div>

              <div className={(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? 'status-ok' : 'status-warn'}>
                {(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? '✓' : '⚠'} Seat-to-bar: {config.barTopHeight - config.stoolHeight}" (ideal: 10-14")
              </div>
            </div>
          </div>

          {/* Right Panel - Diagrams */}
          <div>
            {/* Side Section */}
            {(activeView === 'all' || activeView === 'section') && (
              <div className="panel">
                <div className="panel-title">Side Section View</div>
                <svg viewBox="0 0 380 320" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid1`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                    </pattern>
                    <linearGradient id={`${uniqueId}-glow1`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect width="380" height="320" fill={`url(#${uniqueId}-grid1)`}/>

                  {(() => {
                    const scale = 2.4;
                    const groundY = 280;
                    const kitchenFloorY = groundY - config.stepHeight * scale;
                    const barTopY = kitchenFloorY - config.barTopHeight * scale;
                    const stepX = 160;
                    
                    const cabinetDepthPx = config.cabinetDepth * scale;
                    const kneeSpacePx = kneeSpaceKitchen * scale;

                    const cabinetLeft = stepX - cabinetDepthPx;
                    const barLeft = cabinetLeft; // Bar aligns with cabinet front
                    const barRight = stepX + kneeSpacePx;
                    const barThickPx = Math.max(config.barTopThickness * scale * 2, 6);

                    return (
                      <g>
                        {/* Floors */}
                        <rect x="20" y={groundY} width={stepX - 20} height="40" fill="#1e3a5f"/>
                        <text x="90" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM</text>
                        
                        <rect x={stepX} y={kitchenFloorY} width="280" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                        <text x="330" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="10">KITCHEN</text>

                        {/* Step face */}
                        <line x1={stepX} y1={groundY} x2={stepX} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="2"/>

                        {/* Cabinet body - continuous from bar top to LR floor */}
                        <rect
                          x={cabinetLeft}
                          y={barTopY + barThickPx}
                          width={cabinetDepthPx}
                          height={groundY - barTopY - barThickPx}
                          fill="#2d4a6a"
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                        />

                        {/* Shelf lines for open/mixed style */}
                        {config.cabinetStyle !== 'doors' && (
                          <>
                            <line
                              x1={cabinetLeft + 3}
                              y1={barTopY + barThickPx + 40}
                              x2={stepX - 3}
                              y2={barTopY + barThickPx + 40}
                              stroke="#60a5fa"
                              strokeWidth="0.5"
                            />
                            <line
                              x1={cabinetLeft + 3}
                              y1={barTopY + barThickPx + 80}
                              x2={stepX - 3}
                              y2={barTopY + barThickPx + 80}
                              stroke="#60a5fa"
                              strokeWidth="0.5"
                            />
                          </>
                        )}

                        {/* Under-cabinet lighting */}
                        {config.showLighting && (
                          <rect
                            x={cabinetLeft + 5}
                            y={barTopY + barThickPx + 2}
                            width={cabinetDepthPx - 10}
                            height="15"
                            fill={`url(#${uniqueId}-glow1)`}
                          />
                        )}

                        {/* Bar top - conditional tiered rendering */}
                        {config.tieredBar ? (
                          <>
                            {/* Counter level (kitchen side) */}
                            <rect
                              x={stepX}
                              y={barTopY}
                              width={barRight - stepX}
                              height={barThickPx}
                              fill="#92400e"
                              stroke="#b45309"
                              strokeWidth="1.5"
                            />
                            {/* Raised bar level (living room side) */}
                            <rect
                              x={barLeft}
                              y={barTopY - config.raisedBarHeight * scale}
                              width={stepX - barLeft}
                              height={barThickPx}
                              fill="#92400e"
                              stroke="#b45309"
                              strokeWidth="1.5"
                            />
                            {/* Vertical transition piece */}
                            <rect
                              x={stepX - barThickPx / 2}
                              y={barTopY - config.raisedBarHeight * scale}
                              width={barThickPx}
                              height={config.raisedBarHeight * scale + barThickPx}
                              fill="#92400e"
                              stroke="#b45309"
                              strokeWidth="1"
                            />
                            {/* Wood grain - counter */}
                            <line x1={stepX + 5} y1={barTopY + 3} x2={barRight - 5} y2={barTopY + 3} stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>
                            {/* Wood grain - raised */}
                            <line x1={barLeft + 5} y1={barTopY - config.raisedBarHeight * scale + 3} x2={stepX - 5} y2={barTopY - config.raisedBarHeight * scale + 3} stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>
                            {/* Raised height dimension */}
                            <g>
                              <line x1={barLeft - 15} y1={barTopY} x2={barLeft - 15} y2={barTopY - config.raisedBarHeight * scale} stroke="#f472b6" strokeWidth="1"/>
                              <line x1={barLeft - 20} y1={barTopY} x2={barLeft - 10} y2={barTopY} stroke="#f472b6" strokeWidth="1"/>
                              <line x1={barLeft - 20} y1={barTopY - config.raisedBarHeight * scale} x2={barLeft - 10} y2={barTopY - config.raisedBarHeight * scale} stroke="#f472b6" strokeWidth="1"/>
                              <text x={barLeft - 25} y={barTopY - config.raisedBarHeight * scale / 2 + 3} textAnchor="end" fill="#f472b6" fontSize="9" fontFamily="monospace">+{config.raisedBarHeight}"</text>
                            </g>
                          </>
                        ) : (
                          <>
                            {/* Standard single-level bar top */}
                            <rect
                              x={barLeft}
                              y={barTopY}
                              width={barRight - barLeft}
                              height={barThickPx}
                              fill="#92400e"
                              stroke="#b45309"
                              strokeWidth="1.5"
                            />
                            {/* Wood grain */}
                            <line x1={barLeft + 5} y1={barTopY + 3} x2={barRight - 5} y2={barTopY + 3} stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>
                          </>
                        )}

                        {/* Waterfall edges */}
                        {config.waterfallEdge && (
                          <>
                            <rect x={barLeft} y={barTopY + barThickPx} width={barThickPx} height="30" fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                            <rect x={barRight - barThickPx} y={barTopY + barThickPx} width={barThickPx} height={kitchenFloorY - barTopY - barThickPx} fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                          </>
                        )}

                        {/* Support post */}
                        <rect x={stepX - 3} y={barTopY + barThickPx} width="5" height={kitchenFloorY - barTopY - barThickPx} fill="#2d4a6a"/>

                        {/* Person on stool - facing toward living room (left) */}
                        {config.showPerson && (() => {
                          const stoolY = kitchenFloorY - config.stoolHeight * scale;
                          const px = 250;
                          return (
                            <g opacity="0.7">
                              {/* Stool */}
                              <rect x={px - 12} y={stoolY} width="24" height="4" fill="#4a6a8a" rx="2"/>
                              <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#4a6a8a"/>
                              <rect x={px - 10} y={kitchenFloorY - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
                              {/* Person - facing LEFT (toward living room) */}
                              <ellipse cx={px} cy={stoolY - 45} rx="11" ry="13" fill="#5a7a9a"/>
                              <rect x={px - 12} y={stoolY - 32} width="24" height="34" fill="#5a7a9a" rx="3"/>
                              {/* Arm reaching toward bar/living room (left side) */}
                              <rect x={px - 37} y={stoolY - 26} width="25" height="6" fill="#5a7a9a" rx="3"/>
                            </g>
                          );
                        })()}

                        {/* DIMENSIONS */}
                        {/* Step height */}
                        <g>
                          <line x1="150" y1={groundY} x2="150" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                          <line x1="145" y1={groundY} x2="155" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                          <line x1="145" y1={kitchenFloorY} x2="155" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                          <text x="140" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                        </g>

                        {/* Bar height from kitchen */}
                        <g>
                          <line x1="300" y1={kitchenFloorY} x2="300" y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                          <line x1="295" y1={kitchenFloorY} x2="305" y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                          <line x1="295" y1={barTopY + 3} x2="305" y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                          <text x="310" y={(kitchenFloorY + barTopY) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">{config.barTopHeight}"</text>
                        </g>

                        {/* Total depth */}
                        <g>
                          <line x1={barLeft} y1={barTopY - 35} x2={barRight} y2={barTopY - 35} stroke="#a78bfa" strokeWidth="1"/>
                          <line x1={barLeft} y1={barTopY - 40} x2={barLeft} y2={barTopY - 30} stroke="#a78bfa" strokeWidth="1"/>
                          <line x1={barRight} y1={barTopY - 40} x2={barRight} y2={barTopY - 30} stroke="#a78bfa" strokeWidth="1"/>
                          <text x={(barLeft + barRight) / 2} y={barTopY - 42} textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">{config.barDepth}" total</text>
                        </g>

                        {/* Labels */}
                        <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">SIDE SECTION</text>
                        <text x="25" y="34" fill="#64748b" fontSize="9">Looking along bar length</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {/* Living Room Elevation */}
            {(activeView === 'all' || activeView === 'elevation') && (
              <div className="panel">
                <div className="panel-title">View from Living Room</div>
                <svg viewBox="0 0 480 260" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid2`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                    </pattern>
                    <linearGradient id={`${uniqueId}-glow2`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect width="480" height="260" fill={`url(#${uniqueId}-grid2)`}/>

                  {(() => {
                    const groundY = 220;
                    const barLengthPx = Math.min(config.barLength * 2.5, 380);
                    const startX = (480 - barLengthPx) / 2;
                    const cabinetHeightPx = Math.min(cabinetHeight * 2, 150);
                    const cabinetTopY = groundY - 8 - cabinetHeightPx;
                    const barTopY = cabinetTopY - 10;
                    const numSections = Math.max(1, Math.floor(config.barLength / 21));
                    const sectionWidth = barLengthPx / numSections;

                    return (
                      <g>
                        {/* Floor */}
                        <rect x="30" y={groundY} width="420" height="30" fill="#1e3a5f"/>

                        {/* Toe kick */}
                        <rect x={startX} y={groundY - 8} width={barLengthPx} height="8" fill="#0d1520"/>

                        {/* Cabinet body */}
                        <rect
                          x={startX}
                          y={cabinetTopY}
                          width={barLengthPx}
                          height={cabinetHeightPx}
                          fill="#2d4a6a"
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                        />

                        {/* Pass-through opening */}
                        {config.passThrough && (
                          <rect
                            x={startX + barLengthPx / 2 - config.passThroughWidth * 1.8}
                            y={cabinetTopY + 8}
                            width={config.passThroughWidth * 3.6}
                            height={cabinetHeightPx * 0.45}
                            fill="#0d1520"
                            stroke="#60a5fa"
                            strokeWidth="1"
                          />
                        )}

                        {/* Cabinet sections */}
                        {Array.from({ length: numSections }).map((_, i) => {
                          const sectionX = startX + i * sectionWidth;
                          const sectionTopY = cabinetTopY;
                          const sectionH = cabinetHeightPx;
                          
                          // Skip if in pass-through zone
                          if (config.passThrough) {
                            const ptLeft = startX + barLengthPx / 2 - config.passThroughWidth * 1.8;
                            const ptRight = startX + barLengthPx / 2 + config.passThroughWidth * 1.8;
                            if (sectionX + sectionWidth > ptLeft && sectionX < ptRight) return null;
                          }

                          const isWine = config.wineStorage && i === 0;
                          const isOdd = i % 2 === 0;

                          if (isWine) {
                            return (
                              <g key={i}>
                                <rect x={sectionX + 3} y={sectionTopY + 5} width={sectionWidth - 6} height={sectionH - 10} fill="#1a2d40" stroke="#60a5fa" strokeWidth="0.5"/>
                                {Array.from({ length: 3 }).map((_, r) => (
                                  Array.from({ length: 2 }).map((_, c) => (
                                    <ellipse key={`${r}-${c}`} cx={sectionX + 18 + c * 22} cy={sectionTopY + 25 + r * 25} rx="8" ry="10" fill="none" stroke="#7c3aed" strokeWidth="1"/>
                                  ))
                                ))}
                              </g>
                            );
                          }

                          if (config.cabinetStyle === 'doors') {
                            return (
                              <g key={i}>
                                <rect x={sectionX + 3} y={sectionTopY + 5} width={sectionWidth - 6} height={sectionH - 10} fill="none" stroke="#60a5fa" strokeWidth="0.5" rx="2"/>
                                <circle cx={sectionX + sectionWidth - 12} cy={sectionTopY + sectionH / 2} r="3" fill="#60a5fa"/>
                              </g>
                            );
                          }

                          if (config.cabinetStyle === 'open') {
                            return (
                              <g key={i}>
                                <rect x={sectionX + 3} y={sectionTopY + 5} width={sectionWidth - 6} height={sectionH - 10} fill="#1a2d40" stroke="#60a5fa" strokeWidth="0.5"/>
                                {config.showLighting && (
                                  <rect x={sectionX + 5} y={sectionTopY + 7} width={sectionWidth - 10} height="12" fill={`url(#${uniqueId}-glow2)`}/>
                                )}
                                <line x1={sectionX + 6} y1={sectionTopY + sectionH * 0.35} x2={sectionX + sectionWidth - 6} y2={sectionTopY + sectionH * 0.35} stroke="#60a5fa" strokeWidth="0.5"/>
                                <line x1={sectionX + 6} y1={sectionTopY + sectionH * 0.65} x2={sectionX + sectionWidth - 6} y2={sectionTopY + sectionH * 0.65} stroke="#60a5fa" strokeWidth="0.5"/>
                              </g>
                            );
                          }

                          // Mixed style
                          return (
                            <g key={i}>
                              {isOdd ? (
                                <>
                                  <rect x={sectionX + 3} y={sectionTopY + 5} width={sectionWidth - 6} height={sectionH * 0.4} fill="#1a2d40" stroke="#60a5fa" strokeWidth="0.5"/>
                                  {config.showLighting && (
                                    <rect x={sectionX + 5} y={sectionTopY + 7} width={sectionWidth - 10} height="10" fill={`url(#${uniqueId}-glow2)`}/>
                                  )}
                                  <rect x={sectionX + 3} y={sectionTopY + sectionH * 0.48} width={sectionWidth - 6} height={sectionH * 0.45} fill="none" stroke="#60a5fa" strokeWidth="0.5" rx="2"/>
                                  <circle cx={sectionX + sectionWidth - 12} cy={sectionTopY + sectionH * 0.7} r="3" fill="#60a5fa"/>
                                </>
                              ) : (
                                <>
                                  <rect x={sectionX + 3} y={sectionTopY + 5} width={sectionWidth - 6} height={sectionH * 0.28} fill="none" stroke="#60a5fa" strokeWidth="0.5" rx="2"/>
                                  <rect x={sectionX + 3} y={sectionTopY + sectionH * 0.37} width={sectionWidth - 6} height={sectionH * 0.28} fill="none" stroke="#60a5fa" strokeWidth="0.5" rx="2"/>
                                  <rect x={sectionX + 3} y={sectionTopY + sectionH * 0.69} width={sectionWidth - 6} height={sectionH * 0.24} fill="none" stroke="#60a5fa" strokeWidth="0.5" rx="2"/>
                                  <rect x={sectionX + sectionWidth / 2 - 10} y={sectionTopY + sectionH * 0.17} width="20" height="3" fill="#60a5fa" rx="1"/>
                                  <rect x={sectionX + sectionWidth / 2 - 10} y={sectionTopY + sectionH * 0.49} width="20" height="3" fill="#60a5fa" rx="1"/>
                                  <rect x={sectionX + sectionWidth / 2 - 10} y={sectionTopY + sectionH * 0.79} width="20" height="3" fill="#60a5fa" rx="1"/>
                                </>
                              )}
                            </g>
                          );
                        })}

                        {/* Bar top - conditional tiered rendering */}
                        {config.tieredBar ? (
                          <>
                            {/* Raised bar section (front portion, higher) */}
                            <rect
                              x={startX - 8}
                              y={barTopY - config.raisedBarHeight * 2}
                              width={barLengthPx + 16}
                              height="10"
                              fill="#92400e"
                              stroke="#b45309"
                              strokeWidth="1.5"
                            />
                            {/* Counter level (back, lower - visible behind) */}
                            <rect
                              x={startX - 4}
                              y={barTopY}
                              width={barLengthPx + 8}
                              height="6"
                              fill="#78350f"
                              stroke="#92400e"
                              strokeWidth="1"
                              opacity="0.7"
                            />
                            {/* Raised height indicator */}
                            <text x={startX + barLengthPx + 15} y={barTopY - config.raisedBarHeight + 5} fill="#f472b6" fontSize="9" fontFamily="monospace">+{config.raisedBarHeight}"</text>
                          </>
                        ) : (
                          <rect x={startX - 8} y={barTopY} width={barLengthPx + 16} height="10" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
                        )}

                        {/* Waterfall edges */}
                        {config.waterfallEdge && (
                          <>
                            <rect x={startX - 8} y={barTopY + 10} width="8" height="35" fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                            <rect x={startX + barLengthPx} y={barTopY + 10} width="8" height="35" fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                          </>
                        )}

                        {/* Dimensions */}
                        <g>
                          <line x1={startX} y1={groundY + 15} x2={startX + barLengthPx} y2={groundY + 15} stroke="#fb923c" strokeWidth="1"/>
                          <line x1={startX} y1={groundY + 10} x2={startX} y2={groundY + 20} stroke="#fb923c" strokeWidth="1"/>
                          <line x1={startX + barLengthPx} y1={groundY + 10} x2={startX + barLengthPx} y2={groundY + 20} stroke="#fb923c" strokeWidth="1"/>
                          <text x={(startX + startX + barLengthPx) / 2} y={groundY + 28} textAnchor="middle" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.barLength}" ({(config.barLength / 12).toFixed(1)} ft)</text>
                        </g>

                        <g>
                          <line x1={startX - 20} y1={groundY - 8} x2={startX - 20} y2={barTopY} stroke="#4ade80" strokeWidth="1"/>
                          <line x1={startX - 25} y1={groundY - 8} x2={startX - 15} y2={groundY - 8} stroke="#4ade80" strokeWidth="1"/>
                          <line x1={startX - 25} y1={barTopY} x2={startX - 15} y2={barTopY} stroke="#4ade80" strokeWidth="1"/>
                          <text x={startX - 30} y={(groundY - 8 + barTopY) / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="10" fontFamily="monospace">{barFromLivingRoom}"</text>
                        </g>

                        <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">LIVING ROOM VIEW</text>
                        <text x="25" y="34" fill="#64748b" fontSize="9">Cabinet/shelf front elevation</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {/* Plan View */}
            {(activeView === 'all' || activeView === 'plan') && (
              <div className="panel">
                <div className="panel-title">Plan View (Bird's Eye)</div>
                <svg viewBox="0 0 480 200" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid3`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="480" height="200" fill={`url(#${uniqueId}-grid3)`}/>

                  {(() => {
                    const barLengthPx = Math.min(config.barLength * 2.5, 380);
                    const startX = (480 - barLengthPx) / 2;
                    const topY = 45;
                    const scale = 2.5;
                    
                    const kneeSpacePx = kneeSpaceKitchen * scale;
                    const cabinetDepthPx = config.cabinetDepth * scale;
                    const totalDepthPx = config.barDepth * scale;

                    return (
                      <g>
                        <text x={startX + barLengthPx / 2} y="30" textAnchor="middle" fill="#64748b" fontSize="10">KITCHEN SIDE (seating here)</text>

                        {/* Bar top outline */}
                        <rect x={startX} y={topY} width={barLengthPx} height={totalDepthPx} fill="#92400e" stroke="#b45309" strokeWidth="2" opacity="0.6"/>

                        {/* Knee space zone (overhang for seating) */}
                        <rect x={startX} y={topY} width={barLengthPx} height={kneeSpacePx} fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="4,2"/>
                        <text x={startX + barLengthPx / 2} y={topY + kneeSpacePx / 2 + 4} textAnchor="middle" fill="#4ade80" fontSize="9">OVERHANG ({kneeSpaceKitchen}")</text>

                        {/* Cabinet zone */}
                        <rect x={startX} y={topY + kneeSpacePx} width={barLengthPx} height={cabinetDepthPx} fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,2"/>
                        <text x={startX + barLengthPx / 2} y={topY + kneeSpacePx + cabinetDepthPx / 2 + 4} textAnchor="middle" fill="#60a5fa" fontSize="9">CABINETS ({config.cabinetDepth}")</text>

                        {/* Stools */}
                        {Array.from({ length: Math.floor(config.barLength / 24) }).map((_, i) => (
                          <g key={i}>
                            <circle cx={startX + 30 + i * 55} cy={topY - 15} r="10" fill="#3b5a7a" stroke="#5a7a9a" strokeWidth="1"/>
                            <circle cx={startX + 30 + i * 55} cy={topY - 15} r="4" fill="#5a7a9a"/>
                          </g>
                        ))}

                        <text x={startX + barLengthPx / 2} y={topY + totalDepthPx + 20} textAnchor="middle" fill="#64748b" fontSize="10">LIVING ROOM SIDE</text>

                        {/* Tiered bar indicator (raised section on LR side) */}
                        {config.tieredBar && (
                          <g>
                            <rect
                              x={startX}
                              y={topY + totalDepthPx - 15}
                              width={barLengthPx}
                              height="15"
                              fill="#b45309"
                              stroke="#f59e0b"
                              strokeWidth="1"
                              opacity="0.8"
                            />
                            <text x={startX + barLengthPx / 2} y={topY + totalDepthPx - 5} textAnchor="middle" fill="#fbbf24" fontSize="7">RAISED +{config.raisedBarHeight}"</text>
                          </g>
                        )}

                        {/* Depth dimension */}
                        <g>
                          <line x1={startX + barLengthPx + 15} y1={topY} x2={startX + barLengthPx + 15} y2={topY + totalDepthPx} stroke="#a78bfa" strokeWidth="1"/>
                          <line x1={startX + barLengthPx + 10} y1={topY} x2={startX + barLengthPx + 20} y2={topY} stroke="#a78bfa" strokeWidth="1"/>
                          <line x1={startX + barLengthPx + 10} y1={topY + totalDepthPx} x2={startX + barLengthPx + 20} y2={topY + totalDepthPx} stroke="#a78bfa" strokeWidth="1"/>
                          <text x={startX + barLengthPx + 25} y={topY + totalDepthPx / 2 + 4} fill="#a78bfa" fontSize="10" fontFamily="monospace">{config.barDepth}"</text>
                        </g>

                        <text x={startX + barLengthPx / 2} y="185" textAnchor="middle" fill="#64748b" fontSize="10">
                          Seating: ~{Math.floor(config.barLength / 24)} people (24" per seat)
                        </text>

                        <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">PLAN VIEW</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {/* Construction View - Continuous Cabinet from LR Floor to Bar Top */}
            {(activeView === 'all' || activeView === 'construction') && (
              <div className="panel">
                <div className="panel-title">Construction Details - Continuous Structure</div>
                <div style={{ background: '#0d1520', borderRadius: 4, padding: 20 }}>
                  <h3 style={{ color: '#60a5fa', margin: '0 0 16px 0', fontSize: 14 }}>FRAMING DIAGRAMS</h3>

                  {/* 2x2 Grid of Framing Views */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

                    {/* 1. FULL-HEIGHT 2x4 FRAMING */}
                    <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                      {(() => {
                        const frameW = 180;
                        const frameH = 140;
                        const startX = 50;
                        const startY = 35;
                        const studW = 6;

                        return (
                          <g>
                            <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">FULL-HEIGHT FRAMING</text>
                            <text x="14" y="32" fill="#64748b" fontSize="8">2x4 studs span LR floor to bar top</text>

                            {/* Top plate */}
                            <rect x={startX} y={startY} width={frameW} height={studW} fill="#d4a574" stroke="#a07850" strokeWidth="1"/>
                            <text x={startX + frameW / 2} y={startY - 4} fill="#fbbf24" fontSize="7" textAnchor="middle">TOP PLATE (2x4)</text>

                            {/* Bottom plate */}
                            <rect x={startX} y={startY + frameH - studW} width={frameW} height={studW} fill="#d4a574" stroke="#a07850" strokeWidth="1"/>
                            <text x={startX + frameW / 2} y={startY + frameH + 12} fill="#fbbf24" fontSize="7" textAnchor="middle">BOTTOM PLATE (on LR floor)</text>

                            {/* Studs */}
                            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                              <rect key={i} x={startX + pct * (frameW - studW)} y={startY + studW} width={studW} height={frameH - studW * 2} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                            ))}
                            <text x={startX - 6} y={startY + frameH / 2} fill="#60a5fa" fontSize="7" textAnchor="end" transform={`rotate(-90 ${startX - 6} ${startY + frameH / 2})`}>STUDS 16" O.C.</text>

                            {/* Blocking at step level (horizontal) */}
                            <rect x={startX + studW} y={startY + frameH * 0.4} width={frameW - studW * 2} height={studW} fill="#4ade80" stroke="#22c55e" strokeWidth="1"/>
                            <text x={startX + frameW + 8} y={startY + frameH * 0.4 + 5} fill="#4ade80" fontSize="6">blocking @</text>
                            <text x={startX + frameW + 8} y={startY + frameH * 0.4 + 13} fill="#4ade80" fontSize="6">step level</text>

                            {/* Mid-height blocking */}
                            <rect x={startX + studW} y={startY + frameH * 0.7} width={frameW - studW * 2} height={studW} fill="#4ade80" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="3,2"/>

                            {/* Dimensions */}
                            <text x="265" y="95" fill="#64748b" fontSize="8" textAnchor="end">{Math.round(barFromLivingRoom - 4)}"h</text>
                            <text x="265" y="107" fill="#64748b" fontSize="8" textAnchor="end">{config.cabinetDepth}"d</text>
                            <text x="265" y="119" fill="#64748b" fontSize="8" textAnchor="end">{config.barLength}"w</text>

                            {/* Legend */}
                            <g transform="translate(14, 175)">
                              <rect x="0" y="-4" width="12" height="6" fill="#d4a574"/>
                              <text x="16" y="0" fill="#94a3b8" fontSize="7">2x4 lumber</text>
                              <rect x="75" y="-4" width="12" height="6" fill="#4ade80"/>
                              <text x="91" y="0" fill="#94a3b8" fontSize="7">Blocking</text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>

                    {/* 2. PLYWOOD SHEATHING */}
                    <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                      {(() => {
                        const frameW = 180;
                        const frameH = 130;
                        const startX = 50;
                        const startY = 45;

                        return (
                          <g>
                            <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">LR-FACING SHEATHING</text>
                            <text x="14" y="32" fill="#64748b" fontSize="8">3/4" plywood on living room side</text>

                            {/* Frame outline (behind) */}
                            <rect x={startX + 4} y={startY + 4} width={frameW} height={frameH} fill="none" stroke="#4a6a8a" strokeWidth="1" strokeDasharray="4,2"/>

                            {/* Plywood sheet (front) */}
                            <rect x={startX} y={startY} width={frameW} height={frameH} fill="#e8d4b8" stroke="#c4a080" strokeWidth="2"/>

                            {/* Wood grain pattern */}
                            {[0.2, 0.4, 0.6, 0.8].map((pct, i) => (
                              <line key={i} x1={startX + 5} y1={startY + frameH * pct} x2={startX + frameW - 5} y2={startY + frameH * pct} stroke="#d4c5b0" strokeWidth="0.5"/>
                            ))}

                            <text x={startX + frameW / 2} y={startY + frameH / 2} fill="#8b7355" fontSize="10" textAnchor="middle">3/4" PLYWOOD</text>
                            <text x={startX + frameW / 2} y={startY + frameH / 2 + 14} fill="#8b7355" fontSize="8" textAnchor="middle">(LR facing)</text>

                            {/* Toe kick cutout */}
                            <rect x={startX} y={startY + frameH - 12} width={frameW} height="12" fill="#0a0f18" stroke="#c4a080" strokeWidth="1"/>
                            <text x={startX + frameW / 2} y={startY + frameH - 3} fill="#64748b" fontSize="6" textAnchor="middle">TOE KICK RECESS</text>

                            {/* Callout */}
                            <line x1={startX - 8} y1={startY + 20} x2={startX - 20} y2={startY + 10} stroke="#c4a080" strokeWidth="0.5"/>
                            <text x={startX - 22} y={startY + 8} fill="#c4a080" fontSize="6" textAnchor="end">glue + brad</text>
                            <text x={startX - 22} y={startY + 15} fill="#64748b" fontSize="5" textAnchor="end">to studs</text>

                            {/* Legend */}
                            <g transform="translate(14, 185)">
                              <rect x="0" y="-4" width="12" height="6" fill="#e8d4b8"/>
                              <text x="16" y="0" fill="#94a3b8" fontSize="7">Plywood</text>
                              <rect x="75" y="-6" width="12" height="8" fill="#0a0f18" stroke="#c4a080" strokeWidth="0.5"/>
                              <text x="91" y="0" fill="#94a3b8" fontSize="7">Toe kick</text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>

                    {/* 3. COUNTER ATTACHMENT */}
                    <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                      {(() => {
                        const cabinetW = 140;
                        const cabinetH = 70;
                        const counterH = 14;
                        const startX = 70;
                        const startY = 70;

                        return (
                          <g>
                            <text x="14" y="20" fill="#60a5fa" fontSize="10" fontWeight="600">COUNTER ATTACHMENT</text>
                            <text x="14" y="32" fill="#64748b" fontSize="8">L-brackets inside cabinet screw UP</text>

                            {/* Top plate of frame (cross section) */}
                            <rect x={startX} y={startY} width={cabinetW} height="8" fill="#d4a574" stroke="#a07850" strokeWidth="1"/>
                            <text x={startX + cabinetW / 2} y={startY + 6} fill="#a07850" fontSize="6" textAnchor="middle">top plate</text>

                            {/* Butcher block */}
                            <rect x={startX - 20} y={startY - counterH - 5} width={cabinetW + config.barDepth - config.cabinetDepth + 10} height={counterH} fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
                            <line x1={startX - 15} y1={startY - counterH} x2={startX + cabinetW + 20} y2={startY - counterH} stroke="#78350f" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <text x={startX + cabinetW / 2} y={startY - counterH / 2 - 2} fill="#fcd34d" fontSize="8" textAnchor="middle">BUTCHER BLOCK ({config.barTopThickness}")</text>

                            {/* L-Brackets INSIDE frame - screwing UP */}
                            <g>
                              {/* Left bracket */}
                              <path d={`M ${startX + 20} ${startY} L ${startX + 20} ${startY - 12} L ${startX + 30} ${startY - 12}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                              <circle cx={startX + 25} cy={startY - 9} r="2" fill="#4ade80"/>

                              {/* Center bracket */}
                              <path d={`M ${startX + cabinetW / 2} ${startY} L ${startX + cabinetW / 2} ${startY - 12} L ${startX + cabinetW / 2 + 10} ${startY - 12}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                              <circle cx={startX + cabinetW / 2 + 5} cy={startY - 9} r="2" fill="#4ade80"/>

                              {/* Right bracket */}
                              <path d={`M ${startX + cabinetW - 20} ${startY} L ${startX + cabinetW - 20} ${startY - 12} L ${startX + cabinetW - 30} ${startY - 12}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                              <circle cx={startX + cabinetW - 25} cy={startY - 9} r="2" fill="#4ade80"/>
                            </g>
                            <text x={startX + cabinetW + 8} y={startY - 8} fill="#4ade80" fontSize="7">L-brackets</text>
                            <text x={startX + cabinetW + 8} y={startY} fill="#64748b" fontSize="6">(screw up)</text>

                            {/* Cabinet interior below */}
                            <rect x={startX + 6} y={startY + 12} width={cabinetW - 12} height="50" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="0.5" strokeDasharray="3,2"/>
                            <text x={startX + cabinetW / 2} y={startY + 42} fill="#3b5a7a" fontSize="8" textAnchor="middle">CABINET</text>
                            <text x={startX + cabinetW / 2} y={startY + 54} fill="#3b5a7a" fontSize="8" textAnchor="middle">INTERIOR</text>

                            {/* Knee space indicator */}
                            <rect x={startX + cabinetW} y={startY - counterH - 5} width={kneeSpaceKitchen * 2} height={counterH + 30} fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,2"/>
                            <text x={startX + cabinetW + kneeSpaceKitchen} y={startY + 28} fill="#38bdf8" fontSize="7" textAnchor="middle">KNEE</text>
                            <text x={startX + cabinetW + kneeSpaceKitchen} y={startY + 38} fill="#38bdf8" fontSize="7" textAnchor="middle">SPACE</text>

                            {/* Legend */}
                            <g transform="translate(14, 175)">
                              <path d="M 0 0 L 8 0 L 8 -6" fill="none" stroke="#4ade80" strokeWidth="2"/>
                              <text x="14" y="0" fill="#94a3b8" fontSize="7">L-brackets (slotted)</text>
                              <rect x="100" y="-4" width="10" height="6" fill="#92400e"/>
                              <text x="114" y="0" fill="#94a3b8" fontSize="7">Butcher block</text>
                            </g>

                            <text x="140" y="192" fill="#64748b" fontSize="7" textAnchor="middle">4-6 brackets along {config.barLength}" length</text>
                          </g>
                        );
                      })()}
                    </svg>

                    {/* 4. BLOCKING AT STEP LEVEL */}
                    <svg viewBox="0 0 280 200" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                      {(() => {
                        const startX = 60;
                        const startY = 45;
                        const stepY = 110;

                        return (
                          <g>
                            <text x="14" y="20" fill="#4ade80" fontSize="10" fontWeight="600">STEP-LEVEL BLOCKING</text>
                            <text x="14" y="32" fill="#64748b" fontSize="8">Structural tie-in at kitchen floor</text>

                            {/* Kitchen floor */}
                            <rect x={startX + 80} y={stepY} width="130" height="12" fill="#234060" stroke="#3b5a7a" strokeWidth="1"/>
                            <text x={startX + 145} y={stepY + 9} fill="#3b5a7a" fontSize="7" textAnchor="middle">KITCHEN FLOOR</text>

                            {/* LR floor */}
                            <rect x="20" y={stepY + 50} width={startX + 60} height="12" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="1"/>
                            <text x="70" y={stepY + 59} fill="#3b5a7a" fontSize="7" textAnchor="middle">LR FLOOR</text>

                            {/* Step face */}
                            <rect x={startX + 76} y={stepY} width="6" height="50" fill="#d4c5b0" stroke="#b8a890" strokeWidth="1"/>
                            <text x={startX + 79} y={stepY + 30} fill="#8b7355" fontSize="5" textAnchor="middle" transform={`rotate(-90 ${startX + 79} ${stepY + 30})`}>STEP</text>

                            {/* Frame studs */}
                            <rect x={startX} y={startY} width="6" height={stepY + 50 - startY - 6} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                            <rect x={startX + 70} y={startY} width="6" height={stepY - startY} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                            {/* BLOCKING - ties frame to step structure */}
                            <rect x={startX + 6} y={stepY - 4} width="64" height="8" fill="#4ade80" stroke="#22c55e" strokeWidth="1.5"/>

                            {/* Anchor screws into step */}
                            <circle cx={startX + 72} cy={stepY} r="3" fill="#f472b6"/>
                            <circle cx={startX + 72} cy={stepY + 20} r="3" fill="#f472b6"/>

                            {/* Callout for blocking */}
                            <line x1={startX + 40} y1={stepY - 4} x2={startX + 40} y2={stepY - 20} stroke="#4ade80" strokeWidth="0.5"/>
                            <rect x={startX + 5} y={stepY - 45} width="70" height="24" fill="#0a0f18" stroke="#4ade80" strokeWidth="1" rx="2"/>
                            <text x={startX + 40} y={stepY - 33} fill="#4ade80" fontSize="7" textAnchor="middle" fontWeight="600">BLOCKING</text>
                            <text x={startX + 40} y={stepY - 23} fill="#64748b" fontSize="6" textAnchor="middle">anchors to step</text>

                            {/* Dimension: step height */}
                            <g>
                              <line x1={startX + 95} y1={stepY} x2={startX + 95} y2={stepY + 50} stroke="#fb923c" strokeWidth="1"/>
                              <line x1={startX + 90} y1={stepY} x2={startX + 100} y2={stepY} stroke="#fb923c" strokeWidth="1"/>
                              <line x1={startX + 90} y1={stepY + 50} x2={startX + 100} y2={stepY + 50} stroke="#fb923c" strokeWidth="1"/>
                              <text x={startX + 105} y={stepY + 28} fill="#fb923c" fontSize="8" fontFamily="monospace">{config.stepHeight}"</text>
                            </g>

                            {/* Legend */}
                            <g transform="translate(14, 175)">
                              <rect x="0" y="-4" width="10" height="6" fill="#4ade80"/>
                              <text x="14" y="0" fill="#94a3b8" fontSize="7">Blocking (2x4)</text>
                              <circle cx="95" cy="-1" r="3" fill="#f472b6"/>
                              <text x="102" y="0" fill="#94a3b8" fontSize="7">Anchor screws</text>
                              <rect x="165" y="-4" width="10" height="6" fill="#d4c5b0"/>
                              <text x="179" y="0" fill="#94a3b8" fontSize="7">Step</text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Cross-Section with Callouts */}
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Cross-Section with Callouts</h4>
                    <svg viewBox="0 0 700 380" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                      {(() => {
                        const scale = 2.2;
                        const groundY = 320;
                        const kitchenFloorY = groundY - config.stepHeight * scale;
                        const barTopY = kitchenFloorY - config.barTopHeight * scale;
                        const barThickPx = Math.max(config.barTopThickness * scale * 2, 8);
                        const stepX = 280;
                        const cabinetDepthPx = config.cabinetDepth * scale;
                        const cabinetFrontX = stepX - cabinetDepthPx;
                        const kneeSpacePx = kneeSpaceKitchen * scale;

                        return (
                          <g>
                            {/* Title */}
                            <text x="20" y="25" fill="#60a5fa" fontSize="11" fontWeight="600">CONTINUOUS STRUCTURE CROSS-SECTION</text>
                            <text x="20" y="40" fill="#64748b" fontSize="9">Cabinet spans from LR floor to bar top ({Math.round(barFromLivingRoom - 4)}" total height)</text>

                            {/* Living room floor */}
                            <rect x="40" y={groundY} width={stepX - 40} height="35" fill="#1e3a5f"/>
                            <text x="140" y={groundY + 22} fill="#3b5a7a" fontSize="10">LR FLOOR</text>

                            {/* Kitchen floor */}
                            <rect x={stepX} y={kitchenFloorY} width="280" height={groundY - kitchenFloorY + 35} fill="#234060"/>
                            <text x={stepX + 140} y={kitchenFloorY + 18} fill="#3b5a7a" fontSize="10">KITCHEN FLOOR</text>

                            {/* Step face */}
                            <rect x={stepX - 4} y={kitchenFloorY} width="6" height={groundY - kitchenFloorY} fill="#d4c5b0" stroke="#b8a890" strokeWidth="1"/>

                            {/* Bottom plate on LR floor */}
                            <rect x={cabinetFrontX} y={groundY - 6} width={cabinetDepthPx} height="6" fill="#d4a574" stroke="#a07850" strokeWidth="1"/>

                            {/* Front stud - full height */}
                            <rect x={cabinetFrontX} y={barTopY + barThickPx + 6} width="6" height={groundY - 6 - barTopY - barThickPx - 6} fill="#d4a574" stroke="#a07850" strokeWidth="1"/>

                            {/* Back stud */}
                            <rect x={stepX - 10} y={barTopY + barThickPx + 6} width="6" height={groundY - 6 - barTopY - barThickPx - 6} fill="#d4a574" stroke="#a07850" strokeWidth="1"/>

                            {/* Top plate */}
                            <rect x={cabinetFrontX - 2} y={barTopY + barThickPx} width={cabinetDepthPx + 4} height="6" fill="#d4a574" stroke="#a07850" strokeWidth="1"/>

                            {/* Blocking at step level */}
                            <rect x={cabinetFrontX + 6} y={kitchenFloorY - 4} width={cabinetDepthPx - 12} height="6" fill="#4ade80" stroke="#22c55e" strokeWidth="1"/>

                            {/* Mid-height blocking */}
                            <rect x={cabinetFrontX + 6} y={barTopY + barThickPx + (groundY - barTopY - barThickPx) * 0.5} width={cabinetDepthPx - 12} height="5" fill="#4ade80" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="3,2"/>

                            {/* Plywood sheathing (LR side) */}
                            <rect x={cabinetFrontX - 5} y={barTopY + barThickPx + 6} width="5" height={groundY - 18 - barTopY - barThickPx} fill="#e8d4b8" stroke="#c4a080" strokeWidth="1"/>

                            {/* Toe kick */}
                            <rect x={cabinetFrontX - 5} y={groundY - 18} width={cabinetDepthPx / 2} height="12" fill="#0a0f18" stroke="#1a2a3a" strokeWidth="0.5"/>

                            {/* Bar top / butcher block */}
                            <rect x={cabinetFrontX - 10} y={barTopY} width={config.barDepth * scale + 15} height={barThickPx} fill="#92400e" stroke="#b45309" strokeWidth="2"/>
                            <line x1={cabinetFrontX - 5} y1={barTopY + 4} x2={cabinetFrontX + config.barDepth * scale + 5} y2={barTopY + 4} stroke="#78350f" strokeWidth="0.5" opacity="0.6"/>

                            {/* L-Brackets inside */}
                            <g>
                              <path d={`M ${cabinetFrontX + 15} ${barTopY + barThickPx + 6} L ${cabinetFrontX + 15} ${barTopY + barThickPx - 4} L ${cabinetFrontX + 25} ${barTopY + barThickPx - 4}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                              <circle cx={cabinetFrontX + 20} cy={barTopY + barThickPx - 1} r="2" fill="#4ade80"/>
                              <path d={`M ${stepX - 18} ${barTopY + barThickPx + 6} L ${stepX - 18} ${barTopY + barThickPx - 4} L ${stepX - 28} ${barTopY + barThickPx - 4}`} fill="none" stroke="#4ade80" strokeWidth="3"/>
                              <circle cx={stepX - 23} cy={barTopY + barThickPx - 1} r="2" fill="#4ade80"/>
                            </g>

                            {/* Knee space support */}
                            <rect x={stepX - 2} y={barTopY + barThickPx} width="4" height={kitchenFloorY - barTopY - barThickPx} fill="#2d4a6a" stroke="#3d5a7a" strokeWidth="0.5"/>

                            {/* Electrical conduit */}
                            <path d={`M ${cabinetFrontX + 15} ${groundY - 25} L ${cabinetFrontX + 15} ${barTopY + 45} L ${stepX + kneeSpacePx - 15} ${barTopY + 45}`} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6,3"/>
                            <circle cx={stepX + kneeSpacePx - 15} cy={barTopY + 45} r="6" fill="none" stroke="#fbbf24" strokeWidth="2"/>

                            {/* Tiered section if enabled */}
                            {config.tieredBar && (() => {
                              const raisedTopY = barTopY - config.raisedBarHeight * scale;
                              return (
                                <g>
                                  <rect x={cabinetFrontX} y={raisedTopY + barThickPx} width="6" height={config.raisedBarHeight * scale} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                                  <rect x={stepX - 10} y={raisedTopY + barThickPx} width="6" height={config.raisedBarHeight * scale} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                                  <rect x={cabinetFrontX - 10} y={raisedTopY} width={cabinetDepthPx + 10} height={barThickPx} fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>
                                </g>
                              );
                            })()}

                            {/* === CALLOUT BOXES === */}

                            {/* Callout 1: Butcher Block */}
                            <g>
                              <line x1={cabinetFrontX + 60} y1={barTopY - 20} x2={cabinetFrontX + 60} y2={barTopY + 4} stroke="#b45309" strokeWidth="1"/>
                              <circle cx={cabinetFrontX + 60} cy={barTopY + 4} r="3" fill="#b45309"/>
                              <rect x={cabinetFrontX + 15} y={barTopY - 55} width="90" height="32" fill="#0a0f18" stroke="#b45309" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX + 60} y={barTopY - 40} fill="#b45309" fontSize="9" textAnchor="middle" fontWeight="600">BUTCHER BLOCK</text>
                              <text x={cabinetFrontX + 60} y={barTopY - 28} fill="#94a3b8" fontSize="8" textAnchor="middle">{config.barTopThickness}" thick, {config.barDepth}"d</text>
                            </g>

                            {/* Callout 2: Full-Height Frame */}
                            <g>
                              <line x1={cabinetFrontX - 35} y1={(groundY + barTopY) / 2} x2={cabinetFrontX - 5} y2={(groundY + barTopY) / 2} stroke="#d4a574" strokeWidth="1"/>
                              <circle cx={cabinetFrontX - 3} cy={(groundY + barTopY) / 2} r="3" fill="#d4a574"/>
                              <rect x={cabinetFrontX - 130} y={(groundY + barTopY) / 2 - 28} width="92" height="56" fill="#0a0f18" stroke="#d4a574" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX - 84} y={(groundY + barTopY) / 2 - 12} fill="#d4a574" fontSize="9" textAnchor="middle" fontWeight="600">2x4 FRAMING</text>
                              <text x={cabinetFrontX - 84} y={(groundY + barTopY) / 2 + 2} fill="#94a3b8" fontSize="8" textAnchor="middle">{Math.round(barFromLivingRoom - 4)}"h full-height</text>
                              <text x={cabinetFrontX - 84} y={(groundY + barTopY) / 2 + 14} fill="#64748b" fontSize="7" textAnchor="middle">studs 16" O.C.</text>
                            </g>

                            {/* Callout 3: Blocking at Step */}
                            <g>
                              <line x1={cabinetFrontX + cabinetDepthPx / 2} y1={kitchenFloorY - 4} x2={cabinetFrontX + cabinetDepthPx / 2} y2={kitchenFloorY - 35} stroke="#4ade80" strokeWidth="1"/>
                              <circle cx={cabinetFrontX + cabinetDepthPx / 2} cy={kitchenFloorY - 4} r="3" fill="#4ade80"/>
                              <rect x={cabinetFrontX + cabinetDepthPx / 2 - 55} y={kitchenFloorY - 70} width="110" height="32" fill="#0a0f18" stroke="#4ade80" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX + cabinetDepthPx / 2} y={kitchenFloorY - 55} fill="#4ade80" fontSize="9" textAnchor="middle" fontWeight="600">STEP-LEVEL BLOCKING</text>
                              <text x={cabinetFrontX + cabinetDepthPx / 2} y={kitchenFloorY - 43} fill="#94a3b8" fontSize="8" textAnchor="middle">Ties frame to step structure</text>
                            </g>

                            {/* Callout 4: Bottom Plate */}
                            <g>
                              <line x1={cabinetFrontX + cabinetDepthPx / 2} y1={groundY - 6} x2={cabinetFrontX + cabinetDepthPx / 2} y2={groundY + 20} stroke="#fbbf24" strokeWidth="1"/>
                              <circle cx={cabinetFrontX + cabinetDepthPx / 2} cy={groundY - 3} r="3" fill="#fbbf24"/>
                              <rect x={cabinetFrontX + cabinetDepthPx / 2 - 50} y={groundY + 22} width="100" height="30" fill="#0a0f18" stroke="#fbbf24" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX + cabinetDepthPx / 2} y={groundY + 38} fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="600">BOTTOM PLATE</text>
                              <text x={cabinetFrontX + cabinetDepthPx / 2} y={groundY + 50} fill="#94a3b8" fontSize="8" textAnchor="middle">Anchored to LR floor</text>
                            </g>

                            {/* Callout 5: L-Brackets */}
                            <g>
                              <line x1={cabinetFrontX + 20} y1={barTopY + barThickPx - 30} x2={cabinetFrontX + 20} y2={barTopY + barThickPx - 2} stroke="#4ade80" strokeWidth="1"/>
                              <rect x={cabinetFrontX - 25} y={barTopY + barThickPx - 58} width="90" height="26" fill="#0a0f18" stroke="#4ade80" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX + 20} y={barTopY + barThickPx - 45} fill="#4ade80" fontSize="8" textAnchor="middle" fontWeight="600">L-BRACKETS</text>
                              <text x={cabinetFrontX + 20} y={barTopY + barThickPx - 35} fill="#64748b" fontSize="7" textAnchor="middle">slotted holes</text>
                            </g>

                            {/* Callout 6: Plywood */}
                            <g>
                              <line x1={cabinetFrontX - 5} y1={(groundY + barTopY) / 2 + 60} x2={cabinetFrontX - 25} y2={(groundY + barTopY) / 2 + 80} stroke="#c4a080" strokeWidth="1"/>
                              <circle cx={cabinetFrontX - 3} cy={(groundY + barTopY) / 2 + 60} r="3" fill="#c4a080"/>
                              <rect x={cabinetFrontX - 90} y={(groundY + barTopY) / 2 + 72} width="65" height="24" fill="#0a0f18" stroke="#c4a080" strokeWidth="1" rx="3"/>
                              <text x={cabinetFrontX - 57} y={(groundY + barTopY) / 2 + 87} fill="#c4a080" fontSize="8" textAnchor="middle" fontWeight="600">3/4" PLY</text>
                            </g>

                            {/* === DIMENSION LINES === */}
                            {/* Step height */}
                            <g>
                              <line x1="70" y1={groundY} x2="70" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                              <line x1="65" y1={groundY} x2="75" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                              <line x1="65" y1={kitchenFloorY} x2="75" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                              <text x="60" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                            </g>

                            {/* Bar height from kitchen */}
                            <g>
                              <line x1={stepX + kneeSpacePx + 50} y1={kitchenFloorY} x2={stepX + kneeSpacePx + 50} y2={barTopY} stroke="#60a5fa" strokeWidth="1"/>
                              <line x1={stepX + kneeSpacePx + 45} y1={kitchenFloorY} x2={stepX + kneeSpacePx + 55} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                              <line x1={stepX + kneeSpacePx + 45} y1={barTopY} x2={stepX + kneeSpacePx + 55} y2={barTopY} stroke="#60a5fa" strokeWidth="1"/>
                              <text x={stepX + kneeSpacePx + 60} y={(kitchenFloorY + barTopY) / 2} fill="#60a5fa" fontSize="10" fontFamily="monospace">{config.barTopHeight}"</text>
                              <text x={stepX + kneeSpacePx + 60} y={(kitchenFloorY + barTopY) / 2 + 12} fill="#64748b" fontSize="8">from kitchen</text>
                            </g>

                            {/* Total from LR floor */}
                            <g>
                              <line x1="40" y1={groundY} x2="40" y2={barTopY} stroke="#f472b6" strokeWidth="1"/>
                              <line x1="35" y1={groundY} x2="45" y2={groundY} stroke="#f472b6" strokeWidth="1"/>
                              <line x1="35" y1={barTopY} x2="45" y2={barTopY} stroke="#f472b6" strokeWidth="1"/>
                              <text x="30" y={(groundY + barTopY) / 2} textAnchor="end" fill="#f472b6" fontSize="10" fontFamily="monospace">{barFromLivingRoom}"</text>
                              <text x="30" y={(groundY + barTopY) / 2 + 12} textAnchor="end" fill="#64748b" fontSize="8">from LR</text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Connection Details - 3 Column */}
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Connection Details</h4>
                    <p style={{ color: '#94a3b8', fontSize: 11, margin: '0 0 12px 0' }}>Zoomed views of critical joints</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      {/* Detail 1: Counter-to-Frame (L-Brackets) */}
                      <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                        <div style={{ color: '#60a5fa', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Counter Attachment</div>
                        <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                          {/* Top plate (cross section) */}
                          <rect x="20" y="70" width="140" height="10" fill="#d4a574" stroke="#a07850" strokeWidth="1"/>
                          <text x="90" y="78" fill="#a07850" fontSize="7" textAnchor="middle">top plate (2x4)</text>

                          {/* Butcher block */}
                          <rect x="15" y="32" width="150" height="32" fill="#854d0e" stroke="#a16207" strokeWidth="1"/>
                          <line x1="25" y1="38" x2="155" y2="38" stroke="#a16207" strokeWidth="0.5" strokeDasharray="2,2"/>
                          <line x1="25" y1="50" x2="155" y2="50" stroke="#a16207" strokeWidth="0.5" strokeDasharray="2,2"/>
                          <text x="90" y="54" fill="#fcd34d" fontSize="8" textAnchor="middle">butcher block ({config.barTopThickness}")</text>

                          {/* L-Bracket 1 */}
                          <g transform="translate(50, 64)">
                            <path d="M0,0 L0,-22 L-8,-22 L-8,-26 L3,-26 L3,0 Z" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                            <ellipse cx="-2" cy="-10" rx="2" ry="5" fill="#0a0f18"/>
                            <line x1="-2" y1="-26" x2="-2" y2="-32" stroke="#60a5fa" strokeWidth="2"/>
                            <circle cx="-2" cy="-33" r="2.5" fill="#60a5fa"/>
                          </g>

                          {/* L-Bracket 2 */}
                          <g transform="translate(130, 64)">
                            <path d="M0,0 L0,-22 L-8,-22 L-8,-26 L3,-26 L3,0 Z" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                            <ellipse cx="-2" cy="-10" rx="2" ry="5" fill="#0a0f18"/>
                            <line x1="-2" y1="-26" x2="-2" y2="-32" stroke="#60a5fa" strokeWidth="2"/>
                            <circle cx="-2" cy="-33" r="2.5" fill="#60a5fa"/>
                          </g>

                          {/* Callout: slotted hole */}
                          <line x1="48" y1="54" x2="30" y2="22" stroke="#4ade80" strokeWidth="0.5"/>
                          <text x="18" y="18" fill="#4ade80" fontSize="6">slotted hole</text>
                          <text x="18" y="25" fill="#64748b" fontSize="5">(wood movement)</text>

                          {/* Callout: screw */}
                          <line x1="128" y1="32" x2="148" y2="14" stroke="#60a5fa" strokeWidth="0.5"/>
                          <text x="150" y="12" fill="#60a5fa" fontSize="6">#10 x 1.5"</text>
                          <text x="150" y="19" fill="#64748b" fontSize="5">into block</text>

                          {/* Legend */}
                          <rect x="20" y="100" width="8" height="8" fill="#9ca3af" stroke="#d1d5db" strokeWidth="0.5"/>
                          <text x="32" y="107" fill="#94a3b8" fontSize="6">L-bracket</text>

                          <rect x="20" y="115" width="8" height="8" fill="#854d0e"/>
                          <text x="32" y="122" fill="#94a3b8" fontSize="6">Butcher block</text>

                          <text x="90" y="135" fill="#64748b" fontSize="7" textAnchor="middle">4-6 brackets along length</text>
                        </svg>
                      </div>

                      {/* Detail 2: Frame-to-Floor */}
                      <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                        <div style={{ color: '#fbbf24', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Frame to LR Floor</div>
                        <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                          {/* LR Floor / subfloor */}
                          <rect x="20" y="85" width="140" height="20" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="1"/>
                          <text x="90" y="98" fill="#3b5a7a" fontSize="8" textAnchor="middle">LR SUBFLOOR</text>

                          {/* Bottom plate */}
                          <rect x="40" y="75" width="100" height="10" fill="#d4a574" stroke="#a07850" strokeWidth="1.5"/>
                          <text x="90" y="83" fill="#a07850" fontSize="7" textAnchor="middle">bottom plate</text>

                          {/* Studs coming up */}
                          <rect x="42" y="35" width="8" height="40" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                          <rect x="85" y="35" width="8" height="40" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                          <rect x="130" y="35" width="8" height="40" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                          <text x="90" y="55" fill="#64748b" fontSize="7" textAnchor="middle">studs</text>

                          {/* Anchor bolts */}
                          <g>
                            <line x1="55" y1="85" x2="55" y2="100" stroke="#f472b6" strokeWidth="2"/>
                            <circle cx="55" cy="77" r="3" fill="none" stroke="#f472b6" strokeWidth="1.5"/>
                            <line x1="120" y1="85" x2="120" y2="100" stroke="#f472b6" strokeWidth="2"/>
                            <circle cx="120" cy="77" r="3" fill="none" stroke="#f472b6" strokeWidth="1.5"/>
                          </g>

                          {/* Callout */}
                          <line x1="55" y1="77" x2="25" y2="55" stroke="#f472b6" strokeWidth="0.5"/>
                          <text x="10" y="50" fill="#f472b6" fontSize="6">1/2" concrete</text>
                          <text x="10" y="57" fill="#f472b6" fontSize="6">anchor (if slab)</text>
                          <text x="10" y="66" fill="#64748b" fontSize="5">or lag bolt</text>

                          {/* Legend */}
                          <rect x="20" y="108" width="8" height="6" fill="#d4a574"/>
                          <text x="32" y="113" fill="#94a3b8" fontSize="6">2x4 PT lumber</text>

                          <line x1="100" y1="111" x2="108" y2="111" stroke="#f472b6" strokeWidth="2"/>
                          <text x="112" y="113" fill="#94a3b8" fontSize="6">Anchor</text>

                          <text x="90" y="135" fill="#64748b" fontSize="7" textAnchor="middle">Pressure-treated bottom plate</text>
                        </svg>
                      </div>

                      {/* Detail 3: Frame-to-Step */}
                      <div style={{ background: '#1e293b', borderRadius: 4, padding: 8 }}>
                        <div style={{ color: '#4ade80', fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Frame to Step</div>
                        <svg viewBox="0 0 180 140" style={{ width: '100%', background: '#0a0f18', borderRadius: 4 }}>
                          {/* Kitchen floor level */}
                          <rect x="90" y="55" width="90" height="12" fill="#234060" stroke="#3b5a7a" strokeWidth="1"/>
                          <text x="135" y="64" fill="#3b5a7a" fontSize="7" textAnchor="middle">kitchen floor</text>

                          {/* Step face */}
                          <rect x="82" y="55" width="8" height="50" fill="#d4c5b0" stroke="#b8a890" strokeWidth="1"/>
                          <text x="86" y="85" fill="#8b7355" fontSize="5" textAnchor="middle" transform="rotate(-90 86 85)">STEP</text>

                          {/* Frame stud (back) */}
                          <rect x="70" y="25" width="8" height="75" fill="#d4a574" stroke="#a07850" strokeWidth="1"/>
                          <text x="74" y="60" fill="#a07850" fontSize="5" transform="rotate(-90 74 60)" textAnchor="middle">STUD</text>

                          {/* Frame stud (front) */}
                          <rect x="25" y="25" width="8" height="75" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                          {/* Blocking at step level - ties into step */}
                          <rect x="33" y="53" width="37" height="8" fill="#4ade80" stroke="#22c55e" strokeWidth="1.5"/>
                          <text x="51" y="50" fill="#4ade80" fontSize="6" textAnchor="middle">BLOCKING</text>

                          {/* Anchor screws into step structure */}
                          <circle cx="78" cy="58" r="3" fill="#f472b6"/>
                          <circle cx="78" cy="72" r="3" fill="#f472b6"/>
                          <line x1="78" y1="58" x2="85" y2="58" stroke="#f472b6" strokeWidth="1.5"/>
                          <line x1="78" y1="72" x2="85" y2="72" stroke="#f472b6" strokeWidth="1.5"/>

                          {/* Callout */}
                          <line x1="82" y1="65" x2="110" y2="35" stroke="#f472b6" strokeWidth="0.5"/>
                          <text x="112" y="32" fill="#f472b6" fontSize="6">3" screws into</text>
                          <text x="112" y="40" fill="#f472b6" fontSize="6">step framing</text>

                          {/* LR floor below */}
                          <rect x="0" y="105" width="90" height="12" fill="#1e3a5f" stroke="#3b5a7a" strokeWidth="1"/>
                          <text x="45" y="114" fill="#3b5a7a" fontSize="7" textAnchor="middle">LR floor</text>

                          {/* Legend */}
                          <rect x="100" y="85" width="8" height="6" fill="#4ade80"/>
                          <text x="112" y="90" fill="#94a3b8" fontSize="6">Blocking</text>

                          <circle cx="104" cy="100" r="3" fill="#f472b6"/>
                          <text x="112" y="103" fill="#94a3b8" fontSize="6">Screws</text>

                          <text x="90" y="130" fill="#64748b" fontSize="7" textAnchor="middle">Blocking ties frame to step</text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Materials Table */}
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
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" x {config.barDepth}" x {config.barTopThickness}"</td>
                          <td style={{ padding: '8px 12px' }}>1</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>Seal with food-safe finish</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>2x4 studs (full-height)</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{Math.round(barFromLivingRoom - 4)}" length</td>
                          <td style={{ padding: '8px 12px' }}>{Math.ceil(config.barLength / 16) + 1}</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>16" O.C. spacing</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>2x4 plates (top/bottom)</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" length</td>
                          <td style={{ padding: '8px 12px' }}>2</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>PT for bottom plate</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>2x4 blocking</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.cabinetDepth}" length</td>
                          <td style={{ padding: '8px 12px' }}>{Math.ceil(config.barLength / 16) * 2}</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>At step level + mid-height</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>3/4" plywood sheathing</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.barLength}" x {Math.round(barFromLivingRoom - 12)}"</td>
                          <td style={{ padding: '8px 12px' }}>1 sheet</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>LR-facing side only</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>L-brackets (slotted)</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>2" x 2"</td>
                          <td style={{ padding: '8px 12px' }}>6</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>For counter attachment</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '8px 12px' }}>Concrete anchors / lag bolts</td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>1/2" x 4"</td>
                          <td style={{ padding: '8px 12px' }}>4-6</td>
                          <td style={{ padding: '8px 12px', color: '#94a3b8' }}>For bottom plate to floor</td>
                        </tr>
                        {config.tieredBar && (
                          <tr style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '8px 12px' }}>2x4 for raised section</td>
                            <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{config.raisedBarHeight}" studs</td>
                            <td style={{ padding: '8px 12px' }}>{Math.ceil(config.barLength / 16) + 1}</td>
                            <td style={{ padding: '8px 12px', color: '#f472b6' }}>For tiered bar option</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Build Sequence */}
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Build Sequence</h4>
                    <ol style={{ margin: 0, paddingLeft: 20, color: '#e2e8f0', fontSize: 12, lineHeight: 2 }}>
                      <li>Layout bottom plate position on LR floor (mark {config.cabinetDepth}" out from step face)</li>
                      <li>Drill and anchor pressure-treated bottom plate to LR subfloor</li>
                      <li>Cut full-height studs ({Math.round(barFromLivingRoom - 4)}")</li>
                      <li>Attach studs to bottom plate at 16" O.C.</li>
                      <li>Install blocking at step level - anchor into step framing</li>
                      <li>Install mid-height blocking for rigidity</li>
                      <li>Attach top plate to stud tops</li>
                      <li>Run electrical conduit from LR floor up through frame (before sheathing)</li>
                      <li>Install 3/4" plywood sheathing on LR-facing side</li>
                      <li>Cut and install toe kick recess at bottom</li>
                      {config.tieredBar && <li>Frame raised section (+{config.raisedBarHeight}") on LR side of cabinet</li>}
                      <li>Place butcher block on top plate, verify level</li>
                      <li>Attach L-brackets inside frame, screw up into butcher block (use slotted holes!)</li>
                      <li>Install interior shelving as desired</li>
                      <li>Install outlet boxes and connect electrical</li>
                      <li>Finish/seal butcher block edges</li>
                    </ol>
                  </div>

                  {/* Key Dimensions - 6 Grid */}
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ color: '#4ade80', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Key Dimensions</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      {[
                        { label: 'Bar height (kitchen)', value: `${config.barTopHeight}"`, note: 'from kitchen floor' },
                        { label: 'Bar height (LR)', value: `${barFromLivingRoom}"`, note: 'from LR floor' },
                        { label: 'Total bar length', value: `${config.barLength}"`, note: `${(config.barLength / 12).toFixed(1)} ft` },
                        { label: 'Cabinet depth', value: `${config.cabinetDepth}"`, note: 'frame + sheathing' },
                        { label: 'Knee space', value: `${kneeSpaceKitchen}"`, note: kneeSpaceKitchen >= 12 ? 'OK (12"+ ideal)' : 'TIGHT (<12")' },
                        { label: 'Seat-to-bar gap', value: `${config.barTopHeight - config.stoolHeight}"`, note: (config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? 'ideal (10-14")' : 'check comfort' },
                      ].map((dim, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: 12, borderRadius: 4 }}>
                          <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>{dim.label}</div>
                          <div style={{ color: '#60a5fa', fontSize: 18, fontFamily: 'monospace' }}>{dim.value}</div>
                          <div style={{ color: '#64748b', fontSize: 9 }}>{dim.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Considerations */}
                  <div>
                    <h4 style={{ color: '#fb923c', margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase' }}>Considerations</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: 12, lineHeight: 1.8 }}>
                      <li>This is a <strong style={{ color: '#4ade80' }}>continuous structure</strong> - cabinet spans from LR floor to bar top ({Math.round(barFromLivingRoom - 4)}" framing height)</li>
                      <li>Bottom plate sits directly on LR floor - requires proper anchoring to subfloor</li>
                      <li>Step-level blocking is critical for lateral stability - anchor into step framing</li>
                      <li>All electrical must be run BEFORE plywood sheathing is installed</li>
                      <li style={{ color: '#fbbf24' }}>Butcher block needs 1/8" gap at walls for seasonal expansion</li>
                      <li>Use slotted holes in L-brackets to allow wood movement</li>
                      {kneeSpaceKitchen < 12 && (
                        <li style={{ color: '#fb923c' }}>Knee space ({kneeSpaceKitchen}") is less than recommended 12" - may feel tight for seating</li>
                      )}
                      {config.tieredBar && (
                        <li style={{ color: '#f472b6' }}>Tiered bar adds +{config.raisedBarHeight}" raised section - additional framing required</li>
                      )}
                      {config.waterfallEdge && (
                        <li>Waterfall edges require precise miter cuts (45°) in butcher block</li>
                      )}
                      <li>Consider adding LED strip lighting under bar top (wire before closing frame)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Notes */}
        <div className="panel" style={{ marginTop: 12 }}>
          <div className="panel-title">Design Notes</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
            <div>
              <strong style={{ color: '#60a5fa' }}>Butcher Block</strong>
              <p style={{ margin: '4px 0 0' }}>Use 1.5"+ thickness for {config.barLength}" span. Support every 24-36". Allow 1/8" gap at walls.</p>
            </div>
            <div>
              <strong style={{ color: '#60a5fa' }}>Electrical</strong>
              <p style={{ margin: '4px 0 0' }}>Plan 2-3 outlets along bar top. Pop-up outlets keep surface clean. Run conduit before closing walls.</p>
            </div>
            <div>
              <strong style={{ color: '#60a5fa' }}>Cabinets</strong>
              <p style={{ margin: '4px 0 0' }}>Build/buy cabinet boxes separately. Allows easier install and future modifications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
