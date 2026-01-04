import React, { useState, useId } from 'react';

export default function KitchenBarPlannerV3() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    barTopHeight: 40,
    barDepth: 28,
    cabinetDepth: 12,
    cabinetSetback: 3,
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
  });

  const [activeView, setActiveView] = useState('all');
  const uniqueId = useId();

  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  // Calculated values with safety bounds
  const kneeSpaceKitchen = Math.max(0, config.barDepth - config.cabinetDepth - config.cabinetSetback);
  const overhangLivingRoom = config.cabinetSetback;
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
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Split-Level Kitchen Bar Planner
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
            Interactive design tool with construction details
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
            <div className="panel">
              <div className="panel-title">Dimensions</div>
              
              <div className="slider-group">
                <div className="slider-label">
                  <span>Step Height</span>
                  <span className="slider-value">{config.stepHeight}"</span>
                </div>
                <input type="range" min="18" max="30" step="0.5"
                  value={config.stepHeight}
                  onChange={e => update('stepHeight', parseFloat(e.target.value))} />
                <div className="slider-note">Kitchen floor above living room</div>
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
                  <span>Cabinet Setback</span>
                  <span className="slider-value">{config.cabinetSetback}"</span>
                </div>
                <input type="range" min="0" max="6" step="0.5"
                  value={config.cabinetSetback}
                  onChange={e => update('cabinetSetback', parseFloat(e.target.value))} />
                <div className="slider-note">Tuck cabinets under bar top</div>
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
                <span>Living room overhang</span>
                <span>{overhangLivingRoom}"</span>
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
                <svg viewBox="0 0 480 300" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid1`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                    </pattern>
                    <linearGradient id={`${uniqueId}-glow1`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect width="480" height="300" fill={`url(#${uniqueId}-grid1)`}/>

                  {(() => {
                    const scale = 1.8;
                    const groundY = 250;
                    const kitchenFloorY = groundY - config.stepHeight * scale;
                    const barTopY = kitchenFloorY - config.barTopHeight * scale;
                    const stepX = 180;
                    
                    const cabinetDepthPx = config.cabinetDepth * scale;
                    const setbackPx = config.cabinetSetback * scale;
                    const kneeSpacePx = kneeSpaceKitchen * scale;
                    
                    const cabinetLeft = stepX - cabinetDepthPx;
                    const barLeft = cabinetLeft - setbackPx;
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

                        {/* Cabinet body */}
                        <rect 
                          x={cabinetLeft} 
                          y={barTopY + barThickPx + setbackPx} 
                          width={cabinetDepthPx} 
                          height={groundY - 4 - barTopY - barThickPx - setbackPx} 
                          fill="#2d4a6a" 
                          stroke="#60a5fa" 
                          strokeWidth="1.5"
                        />
                        
                        {/* Toe kick */}
                        <rect x={cabinetLeft} y={groundY - 4} width={cabinetDepthPx} height="4" fill="#0d1520"/>

                        {/* Shelf lines for mixed style */}
                        {config.cabinetStyle !== 'doors' && (
                          <>
                            <line 
                              x1={cabinetLeft + 3} 
                              y1={barTopY + barThickPx + setbackPx + 40} 
                              x2={stepX - 3} 
                              y2={barTopY + barThickPx + setbackPx + 40} 
                              stroke="#60a5fa" 
                              strokeWidth="0.5"
                            />
                            <line 
                              x1={cabinetLeft + 3} 
                              y1={barTopY + barThickPx + setbackPx + 80} 
                              x2={stepX - 3} 
                              y2={barTopY + barThickPx + setbackPx + 80} 
                              stroke="#60a5fa" 
                              strokeWidth="0.5"
                            />
                          </>
                        )}

                        {/* Under-cabinet lighting */}
                        {config.showLighting && setbackPx > 0 && (
                          <rect 
                            x={cabinetLeft + 5} 
                            y={barTopY + barThickPx + 2} 
                            width={cabinetDepthPx - 10} 
                            height={setbackPx + 15} 
                            fill={`url(#${uniqueId}-glow1)`}
                          />
                        )}

                        {/* Bar top */}
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

                        {/* Waterfall edges */}
                        {config.waterfallEdge && (
                          <>
                            <rect x={barLeft} y={barTopY + barThickPx} width={barThickPx} height="30" fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                            <rect x={barRight - barThickPx} y={barTopY + barThickPx} width={barThickPx} height={kitchenFloorY - barTopY - barThickPx} fill="#92400e" stroke="#b45309" strokeWidth="1"/>
                          </>
                        )}

                        {/* Support post */}
                        <rect x={stepX - 3} y={barTopY + barThickPx} width="5" height={kitchenFloorY - barTopY - barThickPx} fill="#2d4a6a"/>

                        {/* Person on stool */}
                        {config.showPerson && (() => {
                          const stoolY = kitchenFloorY - config.stoolHeight * scale;
                          const px = 250;
                          return (
                            <g opacity="0.7">
                              {/* Stool */}
                              <rect x={px - 12} y={stoolY} width="24" height="4" fill="#4a6a8a" rx="2"/>
                              <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#4a6a8a"/>
                              <rect x={px - 10} y={kitchenFloorY - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
                              {/* Person */}
                              <ellipse cx={px} cy={stoolY - 45} rx="11" ry="13" fill="#5a7a9a"/>
                              <rect x={px - 12} y={stoolY - 32} width="24" height="34" fill="#5a7a9a" rx="3"/>
                              <rect x={px + 12} y={stoolY - 26} width="25" height="6" fill="#5a7a9a" rx="3"/>
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

                        {/* Setback dimension */}
                        {config.cabinetSetback > 0 && (
                          <g>
                            <line x1={barLeft} y1={barTopY - 15} x2={cabinetLeft} y2={barTopY - 15} stroke="#f472b6" strokeWidth="1"/>
                            <line x1={barLeft} y1={barTopY - 20} x2={barLeft} y2={barTopY - 10} stroke="#f472b6" strokeWidth="1"/>
                            <line x1={cabinetLeft} y1={barTopY - 20} x2={cabinetLeft} y2={barTopY - 10} stroke="#f472b6" strokeWidth="1"/>
                            <text x={(barLeft + cabinetLeft) / 2} y={barTopY - 22} textAnchor="middle" fill="#f472b6" fontSize="9" fontFamily="monospace">{config.cabinetSetback}"</text>
                          </g>
                        )}

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
                    const setbackShadow = config.cabinetSetback * 2;

                    return (
                      <g>
                        {/* Floor */}
                        <rect x="30" y={groundY} width="420" height="30" fill="#1e3a5f"/>

                        {/* Shadow from overhang */}
                        {config.cabinetSetback > 0 && (
                          <rect x={startX - 5} y={cabinetTopY - 5} width={barLengthPx + 10} height={setbackShadow + 5} fill="#080d14" opacity="0.5"/>
                        )}

                        {/* Toe kick */}
                        <rect x={startX} y={groundY - 8} width={barLengthPx} height="8" fill="#0d1520"/>

                        {/* Cabinet body */}
                        <rect 
                          x={startX} 
                          y={cabinetTopY + setbackShadow} 
                          width={barLengthPx} 
                          height={cabinetHeightPx - setbackShadow} 
                          fill="#2d4a6a" 
                          stroke="#60a5fa" 
                          strokeWidth="1.5"
                        />

                        {/* Pass-through opening */}
                        {config.passThrough && (
                          <rect 
                            x={startX + barLengthPx / 2 - config.passThroughWidth * 1.8} 
                            y={cabinetTopY + setbackShadow + 8}
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
                          const sectionTopY = cabinetTopY + setbackShadow;
                          const sectionH = cabinetHeightPx - setbackShadow;
                          
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

                        {/* Bar top */}
                        <rect x={startX - 8} y={barTopY} width={barLengthPx + 16} height="10" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>

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
                    const setbackPx = config.cabinetSetback * scale;
                    const totalDepthPx = config.barDepth * scale;

                    return (
                      <g>
                        <text x={startX + barLengthPx / 2} y="30" textAnchor="middle" fill="#64748b" fontSize="10">KITCHEN SIDE (seating here)</text>

                        {/* Bar top outline */}
                        <rect x={startX} y={topY} width={barLengthPx} height={totalDepthPx} fill="#92400e" stroke="#b45309" strokeWidth="2" opacity="0.6"/>

                        {/* Knee space zone */}
                        <rect x={startX} y={topY} width={barLengthPx} height={kneeSpacePx} fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="4,2"/>
                        <text x={startX + barLengthPx / 2} y={topY + kneeSpacePx / 2 + 4} textAnchor="middle" fill="#4ade80" fontSize="9">KNEE SPACE ({kneeSpaceKitchen}")</text>

                        {/* Cabinet zone */}
                        <rect x={startX} y={topY + kneeSpacePx} width={barLengthPx} height={cabinetDepthPx} fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,2"/>
                        <text x={startX + barLengthPx / 2} y={topY + kneeSpacePx + cabinetDepthPx / 2 + 4} textAnchor="middle" fill="#60a5fa" fontSize="9">CABINETS ({config.cabinetDepth}")</text>

                        {/* Living room overhang */}
                        {config.cabinetSetback > 0 && (
                          <>
                            <rect x={startX} y={topY + kneeSpacePx + cabinetDepthPx} width={barLengthPx} height={setbackPx} fill="none" stroke="#f472b6" strokeWidth="1" strokeDasharray="4,2"/>
                            <text x={startX + barLengthPx / 2} y={topY + kneeSpacePx + cabinetDepthPx + setbackPx / 2 + 4} textAnchor="middle" fill="#f472b6" fontSize="8">OVERHANG ({config.cabinetSetback}")</text>
                          </>
                        )}

                        {/* Stools */}
                        {Array.from({ length: Math.floor(config.barLength / 24) }).map((_, i) => (
                          <g key={i}>
                            <circle cx={startX + 30 + i * 55} cy={topY - 15} r="10" fill="#3b5a7a" stroke="#5a7a9a" strokeWidth="1"/>
                            <circle cx={startX + 30 + i * 55} cy={topY - 15} r="4" fill="#5a7a9a"/>
                          </g>
                        ))}

                        <text x={startX + barLengthPx / 2} y={topY + totalDepthPx + 20} textAnchor="middle" fill="#64748b" fontSize="10">LIVING ROOM SIDE</text>

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

            {/* Construction View */}
            {(activeView === 'all' || activeView === 'construction') && (
              <div className="panel">
                <div className="panel-title">Construction Details</div>
                <svg viewBox="0 0 480 320" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid4`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="480" height="320" fill={`url(#${uniqueId}-grid4)`}/>

                  {(() => {
                    const scale = 1.6;
                    const groundY = 240;
                    const kitchenFloorY = groundY - config.stepHeight * scale;
                    const barTopY = kitchenFloorY - config.barTopHeight * scale;
                    const stepX = 160;
                    const cabinetDepthPx = config.cabinetDepth * scale;

                    return (
                      <g>
                        {/* Floors */}
                        <rect x="20" y={groundY} width={stepX - 20} height="20" fill="#1e3a5f"/>
                        <rect x={stepX} y={kitchenFloorY} width="120" height={groundY - kitchenFloorY + 20} fill="#234060"/>

                        {/* FRAMING */}
                        {/* Bottom plate */}
                        <rect x={stepX + 2} y={kitchenFloorY - 4} width={cabinetDepthPx + 4} height="4" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                        {/* Vertical studs */}
                        <rect x={stepX + 4} y={barTopY + 15} width="4" height={kitchenFloorY - barTopY - 19} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>
                        <rect x={stepX + cabinetDepthPx} y={barTopY + 15} width="4" height={kitchenFloorY - barTopY - 19} fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                        {/* Horizontal blocking */}
                        <rect x={stepX + 4} y={barTopY + 15 + (kitchenFloorY - barTopY - 19) * 0.5} width={cabinetDepthPx} height="4" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                        {/* Top plate */}
                        <rect x={stepX + 2} y={barTopY + 10} width={cabinetDepthPx + 6} height="4" fill="#d4a574" stroke="#a07850" strokeWidth="0.5"/>

                        {/* Plywood sheathing */}
                        <rect x={stepX} y={barTopY + 14} width="3" height={groundY - 4 - barTopY - 14} fill="#e8d4b8" stroke="#c4a080" strokeWidth="0.5"/>

                        {/* Cabinet box (dashed) */}
                        <rect x={stepX + 8} y={barTopY + 20} width={cabinetDepthPx - 10} height={groundY - 12 - barTopY - 20} fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,2"/>

                        {/* Bar top */}
                        <rect x={stepX - config.cabinetSetback * scale} y={barTopY} width={config.barDepth * scale} height={Math.max(config.barTopThickness * scale * 2, 8)} fill="#92400e" stroke="#b45309" strokeWidth="1.5"/>

                        {/* Steel bracket */}
                        <path d={`M ${stepX + cabinetDepthPx + 2} ${barTopY + 10} L ${stepX + cabinetDepthPx + 2} ${barTopY + 35} L ${stepX + cabinetDepthPx + 25} ${barTopY + 35}`} fill="none" stroke="#9ca3af" strokeWidth="3"/>

                        {/* Electrical conduit */}
                        <path d={`M ${stepX + 15} ${kitchenFloorY - 8} L ${stepX + 15} ${barTopY + 40} L ${stepX + config.barDepth * scale - 25} ${barTopY + 40}`} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6,3"/>
                        <circle cx={stepX + config.barDepth * scale - 25} cy={barTopY + 40} r="5" fill="none" stroke="#fbbf24" strokeWidth="2"/>

                        {/* LED strip */}
                        {config.showLighting && (
                          <rect x={stepX + 5} y={barTopY + 12} width={cabinetDepthPx - 8} height="3" fill="#fbbf24" opacity="0.8"/>
                        )}

                        {/* LEGEND & NOTES */}
                        <g transform="translate(300, 50)">
                          <text fill="#60a5fa" fontSize="11" fontWeight="600">CONSTRUCTION NOTES</text>
                          <text y="20" fill="#94a3b8" fontSize="9">• 2×4 stud framing @ 16" O.C.</text>
                          <text y="35" fill="#94a3b8" fontSize="9">• 3/4" plywood sheathing (LR side)</text>
                          <text y="50" fill="#94a3b8" fontSize="9">• {config.barTopThickness}" butcher block top</text>
                          <text y="65" fill="#94a3b8" fontSize="9">• Steel L-brackets every 24"</text>
                          <text y="80" fill="#94a3b8" fontSize="9">• Pre-wire electrical before closing</text>
                          <text y="95" fill="#94a3b8" fontSize="9">• Cabinet boxes installed separately</text>
                          {config.waterfallEdge && <text y="110" fill="#94a3b8" fontSize="9">• Miter joints for waterfall edges</text>}
                        </g>

                        <g transform="translate(300, 180)">
                          <text fill="#60a5fa" fontSize="10" fontWeight="600">LEGEND</text>
                          <rect y="12" width="15" height="8" fill="#d4a574"/>
                          <text x="20" y="19" fill="#94a3b8" fontSize="9">Framing lumber</text>
                          <rect y="28" width="15" height="8" fill="#e8d4b8"/>
                          <text x="20" y="35" fill="#94a3b8" fontSize="9">Plywood</text>
                          <rect y="44" width="15" height="8" fill="#92400e"/>
                          <text x="20" y="51" fill="#94a3b8" fontSize="9">Butcher block</text>
                          <line y1="64" x2="15" y2="64" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"/>
                          <text x="20" y="67" fill="#94a3b8" fontSize="9">Electrical</text>
                          <rect y="76" width="15" height="4" fill="#9ca3af"/>
                          <text x="20" y="82" fill="#94a3b8" fontSize="9">Steel bracket</text>
                        </g>

                        <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">CONSTRUCTION SECTION</text>
                        <text x="25" y="34" fill="#64748b" fontSize="9">Framing and support detail</text>
                      </g>
                    );
                  })()}
                </svg>
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
              <strong style={{ color: '#60a5fa' }}>Cabinet Setback</strong>
              <p style={{ margin: '4px 0 0' }}>Your {config.cabinetSetback}" setback creates a living room overhang for leaning or resting drinks.</p>
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
