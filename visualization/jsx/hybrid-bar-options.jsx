import React, { useState, useId } from 'react';

export default function HybridBarOptions() {
  const [activeOption, setActiveOption] = useState('flush');
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    cabinetHeight: 34.5,
    cabinetDepth: 24,
    barTopThickness: 1.5,
    barLength: 84,
    kitchenOverhang: 12, // Overhang into kitchen for seating
    cabinetSetback: 0, // How far back from step edge
    // For tiered option
    raisedBarHeight: 6,
    // For hybrid options
    lrShelfHeight: 42, // Height of living room shelf from LR floor
    lrShelfDepth: 10,
  });

  const uniqueId = useId();
  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  const barTopFromKitchen = config.cabinetHeight + config.barTopThickness;

  const options = [
    { id: 'flush', name: 'Flush Peninsula', desc: 'Cabinets align with step edge' },
    { id: 'setback', name: 'Setback Peninsula', desc: 'Cabinets pulled back, step edge visible' },
    { id: 'tiered', name: 'Tiered Top', desc: 'Two-level: counter + raised bar' },
    { id: 'ledge', name: 'Ledge + Cabinets', desc: 'Add LR-side shelf for drinks' },
    { id: 'floating', name: 'Upper + Lower', desc: 'Base cabs + floating LR shelves' },
  ];

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
        .option-btn {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          margin-bottom: 8px;
          background: #0d1520;
          border: 2px solid #243447;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .option-btn.active {
          border-color: #3b82f6;
          background: #1a2d44;
        }
        .option-btn:hover:not(.active) {
          border-color: #3b5a7a;
        }
        .option-btn .name {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
        }
        .option-btn .desc {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
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
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }
        .pros, .cons {
          background: #0d1520;
          border-radius: 6px;
          padding: 10px;
        }
        .pros-title { color: #4ade80; font-size: 11px; font-weight: 600; margin-bottom: 6px; }
        .cons-title { color: #fb923c; font-size: 11px; font-weight: 600; margin-bottom: 6px; }
        .pros ul, .cons ul {
          margin: 0;
          padding-left: 16px;
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .pros-cons { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Kitchen Bar Options — Hybrid Approaches
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
            Exploring configurations with cabinets on the kitchen floor
          </p>
        </div>

        <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
          {/* Left Panel */}
          <div>
            <div className="panel">
              <div className="panel-title">Configuration Options</div>
              {options.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${activeOption === opt.id ? 'active' : ''}`}
                  onClick={() => setActiveOption(opt.id)}
                >
                  <div className="name">{opt.name}</div>
                  <div className="desc">{opt.desc}</div>
                </button>
              ))}
            </div>

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
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Cabinet Height</span>
                  <span className="slider-value">{config.cabinetHeight}"</span>
                </div>
                <input type="range" min="30" max="42" step="0.5"
                  value={config.cabinetHeight}
                  onChange={e => update('cabinetHeight', parseFloat(e.target.value))} />
                <div className="slider-note">Standard base: 34.5"</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Cabinet Depth</span>
                  <span className="slider-value">{config.cabinetDepth}"</span>
                </div>
                <input type="range" min="12" max="30" step="1"
                  value={config.cabinetDepth}
                  onChange={e => update('cabinetDepth', parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Kitchen Overhang</span>
                  <span className="slider-value">{config.kitchenOverhang}"</span>
                </div>
                <input type="range" min="8" max="18" step="1"
                  value={config.kitchenOverhang}
                  onChange={e => update('kitchenOverhang', parseFloat(e.target.value))} />
                <div className="slider-note">For seating knee clearance</div>
              </div>

              {activeOption === 'setback' && (
                <div className="slider-group">
                  <div className="slider-label">
                    <span>Setback from Step</span>
                    <span className="slider-value">{config.cabinetSetback}"</span>
                  </div>
                  <input type="range" min="0" max="18" step="1"
                    value={config.cabinetSetback}
                    onChange={e => update('cabinetSetback', parseFloat(e.target.value))} />
                </div>
              )}

              {activeOption === 'tiered' && (
                <div className="slider-group">
                  <div className="slider-label">
                    <span>Raised Bar Addition</span>
                    <span className="slider-value">{config.raisedBarHeight}"</span>
                  </div>
                  <input type="range" min="4" max="10" step="0.5"
                    value={config.raisedBarHeight}
                    onChange={e => update('raisedBarHeight', parseFloat(e.target.value))} />
                  <div className="slider-note">Height above counter level</div>
                </div>
              )}

              {(activeOption === 'ledge' || activeOption === 'floating') && (
                <>
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>LR Shelf Height</span>
                      <span className="slider-value">{config.lrShelfHeight}"</span>
                    </div>
                    <input type="range" min="36" max="48" step="1"
                      value={config.lrShelfHeight}
                      onChange={e => update('lrShelfHeight', parseFloat(e.target.value))} />
                    <div className="slider-note">From living room floor</div>
                  </div>
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>LR Shelf Depth</span>
                      <span className="slider-value">{config.lrShelfDepth}"</span>
                    </div>
                    <input type="range" min="6" max="16" step="1"
                      value={config.lrShelfDepth}
                      onChange={e => update('lrShelfDepth', parseFloat(e.target.value))} />
                  </div>
                </>
              )}

              <div className="slider-group">
                <div className="slider-label">
                  <span>Bar Length</span>
                  <span className="slider-value">{config.barLength}"</span>
                </div>
                <input type="range" min="60" max="120" step="6"
                  value={config.barLength}
                  onChange={e => update('barLength', parseFloat(e.target.value))} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-title">Key Measurements</div>
              <div className="calc-row">
                <span>Bar top from kitchen</span>
                <span>{barTopFromKitchen}"</span>
              </div>
              <div className="calc-row">
                <span>Bar top from living room</span>
                <span>{(config.stepHeight + barTopFromKitchen).toFixed(1)}"</span>
              </div>
              {activeOption === 'tiered' && (
                <div className="calc-row">
                  <span>Raised bar from kitchen</span>
                  <span>{(barTopFromKitchen + config.raisedBarHeight).toFixed(1)}"</span>
                </div>
              )}
              {(activeOption === 'ledge' || activeOption === 'floating') && (
                <div className="calc-row">
                  <span>LR shelf from LR floor</span>
                  <span>{config.lrShelfHeight}"</span>
                </div>
              )}
              <div className="calc-row">
                <span>Seating capacity</span>
                <span>~{Math.floor(config.barLength / 24)}</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Diagrams */}
          <div>
            {/* Main Diagram */}
            <div className="panel">
              <div className="panel-title">
                {options.find(o => o.id === activeOption)?.name} — Side Section
              </div>
              <svg viewBox="0 0 540 360" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="540" height="360" fill={`url(#${uniqueId}-grid)`}/>

                {(() => {
                  const scale = 1.8;
                  const groundY = 300;
                  const kitchenFloorY = groundY - config.stepHeight * scale;
                  const stepX = 220;
                  
                  const cabinetHeightPx = config.cabinetHeight * scale;
                  const cabinetDepthPx = config.cabinetDepth * scale;
                  const barThickPx = Math.max(config.barTopThickness * scale * 2, 6);
                  const kitchenOverhangPx = config.kitchenOverhang * scale;
                  const setbackPx = (activeOption === 'setback' ? config.cabinetSetback : 0) * scale;
                  
                  const cabinetTopY = kitchenFloorY - cabinetHeightPx;
                  const barTopY = cabinetTopY - barThickPx;
                  
                  // Cabinet sits on kitchen floor, front face at step edge (or setback)
                  const cabinetFront = stepX - setbackPx;
                  const cabinetBack = cabinetFront + cabinetDepthPx;
                  const barFront = cabinetFront; // Bar aligns with cabinet front (toward LR)
                  const barBack = cabinetBack + kitchenOverhangPx; // Extends into kitchen

                  return (
                    <g>
                      {/* Floors */}
                      <rect x="20" y={groundY} width={stepX - 20} height="50" fill="#1e3a5f"/>
                      <text x="110" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM</text>
                      
                      <rect x={stepX} y={kitchenFloorY} width="300" height={groundY - kitchenFloorY + 50} fill="#234060"/>
                      <text x="420" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="10">KITCHEN</text>

                      {/* Step face */}
                      <line x1={stepX} y1={groundY} x2={stepX} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="2"/>

                      {/* Setback landing area */}
                      {activeOption === 'setback' && setbackPx > 0 && (
                        <rect x={stepX} y={kitchenFloorY - 3} width={setbackPx} height="3" fill="#2d4a6a"/>
                      )}

                      {/* Cabinet body */}
                      <rect 
                        x={cabinetFront} 
                        y={cabinetTopY} 
                        width={cabinetDepthPx} 
                        height={cabinetHeightPx - 4} 
                        fill="#2d4a6a" 
                        stroke="#60a5fa" 
                        strokeWidth="1.5"
                      />
                      
                      {/* Toe kick */}
                      <rect x={cabinetFront} y={kitchenFloorY - 4} width={cabinetDepthPx} height="4" fill="#0d1520"/>

                      {/* Cabinet door lines (facing kitchen) */}
                      <line x1={cabinetBack - 3} y1={cabinetTopY + 8} x2={cabinetBack - 3} y2={kitchenFloorY - 12} stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
                      <circle cx={cabinetBack - 10} cy={cabinetTopY + cabinetHeightPx * 0.35} r="2" fill="#60a5fa"/>
                      <circle cx={cabinetBack - 10} cy={cabinetTopY + cabinetHeightPx * 0.65} r="2" fill="#60a5fa"/>

                      {/* Back panel (living room side) */}
                      <rect x={cabinetFront} y={cabinetTopY} width="3" height={cabinetHeightPx - 4} fill="#1e3a5f"/>

                      {/* === OPTION-SPECIFIC ELEMENTS === */}
                      
                      {/* FLUSH & SETBACK: Simple bar top */}
                      {(activeOption === 'flush' || activeOption === 'setback') && (
                        <rect 
                          x={barFront - 2} 
                          y={barTopY} 
                          width={barBack - barFront + 4} 
                          height={barThickPx} 
                          fill="#92400e" 
                          stroke="#b45309" 
                          strokeWidth="1.5"
                        />
                      )}

                      {/* TIERED: Two-level top */}
                      {activeOption === 'tiered' && (() => {
                        const raisedPx = config.raisedBarHeight * scale;
                        const raisedY = barTopY - raisedPx;
                        const raisedWidth = cabinetDepthPx * 0.4; // Raised section is narrower
                        
                        return (
                          <>
                            {/* Lower counter section */}
                            <rect 
                              x={cabinetFront + raisedWidth} 
                              y={barTopY} 
                              width={barBack - cabinetFront - raisedWidth + 4} 
                              height={barThickPx} 
                              fill="#92400e" 
                              stroke="#b45309" 
                              strokeWidth="1.5"
                            />
                            {/* Raised bar section */}
                            <rect 
                              x={cabinetFront - 2} 
                              y={raisedY} 
                              width={raisedWidth + 4} 
                              height={barThickPx} 
                              fill="#92400e" 
                              stroke="#b45309" 
                              strokeWidth="1.5"
                            />
                            {/* Support for raised section */}
                            <rect 
                              x={cabinetFront + raisedWidth - 4} 
                              y={raisedY + barThickPx} 
                              width="4" 
                              height={raisedPx - 2} 
                              fill="#78350f"
                            />
                            {/* Label */}
                            <text x={cabinetFront + raisedWidth / 2} y={raisedY - 8} textAnchor="middle" fill="#fb923c" fontSize="9">BAR ({(barTopFromKitchen + config.raisedBarHeight).toFixed(0)}")</text>
                            <text x={cabinetFront + raisedWidth + 30} y={barTopY - 8} textAnchor="middle" fill="#4ade80" fontSize="9">COUNTER ({barTopFromKitchen}")</text>
                          </>
                        );
                      })()}

                      {/* LEDGE: Bar top + LR shelf */}
                      {activeOption === 'ledge' && (() => {
                        const shelfY = groundY - config.lrShelfHeight * scale;
                        const shelfDepthPx = config.lrShelfDepth * scale;
                        
                        return (
                          <>
                            {/* Main bar top */}
                            <rect 
                              x={barFront - 2} 
                              y={barTopY} 
                              width={barBack - barFront + 4} 
                              height={barThickPx} 
                              fill="#92400e" 
                              stroke="#b45309" 
                              strokeWidth="1.5"
                            />
                            {/* Living room shelf */}
                            <rect 
                              x={stepX - shelfDepthPx - 5} 
                              y={shelfY} 
                              width={shelfDepthPx} 
                              height={barThickPx * 0.7} 
                              fill="#78350f" 
                              stroke="#92400e" 
                              strokeWidth="1"
                            />
                            {/* Shelf bracket */}
                            <path 
                              d={`M ${stepX - 3} ${shelfY + barThickPx * 0.7} L ${stepX - 3} ${shelfY + 25} L ${stepX - shelfDepthPx} ${shelfY + 25}`}
                              fill="none" 
                              stroke="#4a6a8a" 
                              strokeWidth="2"
                            />
                            {/* Label */}
                            <text x={stepX - shelfDepthPx / 2 - 5} y={shelfY - 8} textAnchor="middle" fill="#f472b6" fontSize="9">LEDGE ({config.lrShelfHeight}" from LR)</text>
                          </>
                        );
                      })()}

                      {/* FLOATING: Bar top + floating shelves */}
                      {activeOption === 'floating' && (() => {
                        const shelfY = groundY - config.lrShelfHeight * scale;
                        const shelfDepthPx = config.lrShelfDepth * scale;
                        const shelf2Y = shelfY - 35;
                        
                        return (
                          <>
                            {/* Main bar top */}
                            <rect 
                              x={barFront - 2} 
                              y={barTopY} 
                              width={barBack - barFront + 4} 
                              height={barThickPx} 
                              fill="#92400e" 
                              stroke="#b45309" 
                              strokeWidth="1.5"
                            />
                            {/* Lower shelf */}
                            <rect 
                              x={stepX - shelfDepthPx - 5} 
                              y={shelfY} 
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
                            {/* Items on shelves */}
                            <rect x={stepX - shelfDepthPx + 5} y={shelfY - 12} width="8" height="12" fill="#4a6a8a" opacity="0.6"/>
                            <rect x={stepX - shelfDepthPx + 18} y={shelfY - 18} width="6" height="18" fill="#5a7a9a" opacity="0.6"/>
                            {/* Label */}
                            <text x={stepX - shelfDepthPx / 2 - 5} y={shelf2Y - 12} textAnchor="middle" fill="#a78bfa" fontSize="9">DISPLAY</text>
                          </>
                        );
                      })()}

                      {/* Person on stool */}
                      {(() => {
                        const stoolHeight = 30;
                        const stoolY = kitchenFloorY - stoolHeight * scale;
                        const px = cabinetBack + kitchenOverhangPx / 2 + 20;
                        return (
                          <g opacity="0.6">
                            <rect x={px - 10} y={stoolY} width="20" height="4" fill="#4a6a8a" rx="2"/>
                            <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#4a6a8a"/>
                            <ellipse cx={px} cy={stoolY - 40} rx="10" ry="12" fill="#5a7a9a"/>
                            <rect x={px - 10} y={stoolY - 28} width="20" height="30" fill="#5a7a9a" rx="3"/>
                            <rect x={px - 30} y={stoolY - 22} width="22" height="5" fill="#5a7a9a" rx="2"/>
                          </g>
                        );
                      })()}

                      {/* Standing person in LR for scale */}
                      <g opacity="0.35">
                        <ellipse cx="80" cy={groundY - 58} rx="9" ry="11" fill="#5a7a9a"/>
                        <rect x="71" y={groundY - 47} width="18" height="47" fill="#5a7a9a" rx="3"/>
                      </g>

                      {/* DIMENSIONS */}
                      {/* Step height */}
                      <g>
                        <line x1="180" y1={groundY} x2="180" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="175" y1={groundY} x2="185" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="175" y1={kitchenFloorY} x2="185" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="170" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* Bar from kitchen */}
                      <g>
                        <line x1={cabinetBack + kitchenOverhangPx + 30} y1={kitchenFloorY} x2={cabinetBack + kitchenOverhangPx + 30} y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={cabinetBack + kitchenOverhangPx + 25} y1={kitchenFloorY} x2={cabinetBack + kitchenOverhangPx + 35} y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={cabinetBack + kitchenOverhangPx + 25} y1={barTopY + 3} x2={cabinetBack + kitchenOverhangPx + 35} y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                        <text x={cabinetBack + kitchenOverhangPx + 40} y={(kitchenFloorY + barTopY) / 2} fill="#4ade80" fontSize="10" fontFamily="monospace">{barTopFromKitchen}"</text>
                      </g>

                      {/* Kitchen overhang */}
                      <g>
                        <line x1={cabinetBack} y1={barTopY - 12} x2={cabinetBack + kitchenOverhangPx} y2={barTopY - 12} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={cabinetBack} y1={barTopY - 17} x2={cabinetBack} y2={barTopY - 7} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={cabinetBack + kitchenOverhangPx} y1={barTopY - 17} x2={cabinetBack + kitchenOverhangPx} y2={barTopY - 7} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={cabinetBack + kitchenOverhangPx / 2} y={barTopY - 20} textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">{config.kitchenOverhang}" overhang</text>
                      </g>

                      {/* Labels */}
                      <text x="25" y="22" fill="#60a5fa" fontSize="12" fontWeight="600">{options.find(o => o.id === activeOption)?.name.toUpperCase()}</text>
                      <text x="25" y="38" fill="#64748b" fontSize="10">{options.find(o => o.id === activeOption)?.desc}</text>

                      {/* Cabinet access arrow */}
                      <g>
                        <line x1={cabinetBack + 15} y1={cabinetTopY + cabinetHeightPx / 2} x2={cabinetBack + 35} y2={cabinetTopY + cabinetHeightPx / 2} stroke="#4ade80" strokeWidth="2"/>
                        <polygon points={`${cabinetBack + 35},${cabinetTopY + cabinetHeightPx / 2 - 4} ${cabinetBack + 35},${cabinetTopY + cabinetHeightPx / 2 + 4} ${cabinetBack + 42},${cabinetTopY + cabinetHeightPx / 2}`} fill="#4ade80"/>
                        <text x={cabinetBack + 45} y={cabinetTopY + cabinetHeightPx / 2 + 4} fill="#4ade80" fontSize="8">ACCESS</text>
                      </g>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Pros and Cons */}
            <div className="panel">
              <div className="panel-title">Pros & Cons — {options.find(o => o.id === activeOption)?.name}</div>
              
              {activeOption === 'flush' && (
                <div className="pros-cons">
                  <div className="pros">
                    <div className="pros-title">✓ PROS</div>
                    <ul>
                      <li>Simplest construction</li>
                      <li>Standard base cabinets work</li>
                      <li>Maximizes cabinet space</li>
                      <li>Solid, stable structure</li>
                      <li>Easy to install electrical</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <div className="cons-title">⚠ CONS</div>
                    <ul>
                      <li>No function from living room side</li>
                      <li>Appears as ~{(config.stepHeight + barTopFromKitchen).toFixed(0)}" wall from LR</li>
                      <li>Back panel faces living room</li>
                      <li>Limited to counter height (~36")</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeOption === 'setback' && (
                <div className="pros-cons">
                  <div className="pros">
                    <div className="pros-title">✓ PROS</div>
                    <ul>
                      <li>Step edge remains visible</li>
                      <li>Creates natural landing zone</li>
                      <li>Easier to navigate step</li>
                      <li>Less imposing from living room</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <div className="cons-title">⚠ CONS</div>
                    <ul>
                      <li>Loses some counter depth</li>
                      <li>Gap may collect debris</li>
                      <li>Still no LR-side function</li>
                      <li>May look unfinished</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeOption === 'tiered' && (
                <div className="pros-cons">
                  <div className="pros">
                    <div className="pros-title">✓ PROS</div>
                    <ul>
                      <li>Two functional heights</li>
                      <li>Counter for prep, bar for eating</li>
                      <li>Hides kitchen mess from bar</li>
                      <li>More visual interest</li>
                      <li>Bar section at proper height</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <div className="cons-title">⚠ CONS</div>
                    <ul>
                      <li>More complex construction</li>
                      <li>Less continuous workspace</li>
                      <li>Raised section needs support</li>
                      <li>Crumbs fall behind raised area</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeOption === 'ledge' && (
                <div className="pros-cons">
                  <div className="pros">
                    <div className="pros-title">✓ PROS</div>
                    <ul>
                      <li>Function from both sides</li>
                      <li>LR shelf for drinks/remotes</li>
                      <li>Standing-friendly from LR</li>
                      <li>Two separate build phases possible</li>
                      <li>Ledge is removable later</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <div className="cons-title">⚠ CONS</div>
                    <ul>
                      <li>Ledge needs secure mounting</li>
                      <li>Limited shelf capacity</li>
                      <li>Visual gap between elements</li>
                      <li>Two different materials/heights</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeOption === 'floating' && (
                <div className="pros-cons">
                  <div className="pros">
                    <div className="pros-title">✓ PROS</div>
                    <ul>
                      <li>Display storage from LR</li>
                      <li>Books, decor, plants visible</li>
                      <li>Modern, open aesthetic</li>
                      <li>Kitchen storage + LR display</li>
                      <li>Customizable shelf heights</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <div className="cons-title">⚠ CONS</div>
                    <ul>
                      <li>Open = visible clutter</li>
                      <li>Needs frequent tidying</li>
                      <li>Mounting into step structure</li>
                      <li>Dust accumulation</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Recommendation */}
            <div className="panel">
              <div className="panel-title">Recommendation for Your Setup</div>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Given your 23.5" step and desire for a multi-use bar (homework, eating, chatting), 
                I'd lean toward either:
              </p>
              <ul style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, margin: '12px 0 0', paddingLeft: 20 }}>
                <li><strong style={{ color: '#60a5fa' }}>Tiered Top</strong> — Gives you true bar height ({(barTopFromKitchen + config.raisedBarHeight).toFixed(0)}") for eating/chatting while keeping counter height for prep. Best of both worlds.</li>
                <li><strong style={{ color: '#60a5fa' }}>Ledge + Cabinets</strong> — If you want living room functionality (drinks ledge while watching TV, place to lean during parties). The two elements can even be different materials (butcher block bar, painted wood ledge).</li>
              </ul>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 12 }}>
                The original design (cabinets on LR side) gives more flexibility for bar height but requires more custom work. 
                Kitchen-floor cabinets are simpler to build but lock you into counter height unless you add a raiser or tiered top.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
