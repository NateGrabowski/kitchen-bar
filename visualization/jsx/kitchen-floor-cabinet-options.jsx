import React, { useState, useId } from 'react';

export default function KitchenFloorCabinetOptions() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    cabinetHeight: 34.5, // Standard base cabinet height
    barTopThickness: 1.5,
    cabinetDepth: 24, // Standard base cabinet depth
    barOverhang: 12, // How far bar extends past cabinets toward living room
    barLength: 84,
    stoolHeight: 30,
    cabinetFacing: 'kitchen', // 'kitchen', 'livingroom', 'double'
    showPerson: true,
    includeRaiser: false, // Add height to bring bar to preferred level
    raiserHeight: 6,
    openShelvingBack: true, // Open shelving on the back side
  });

  const [activeOption, setActiveOption] = useState('kitchen'); // Which facing option to highlight
  const uniqueId = useId();

  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  // Calculated values
  const totalBarHeight = config.cabinetHeight + config.barTopThickness + (config.includeRaiser ? config.raiserHeight : 0);
  const barFromLivingRoom = config.stepHeight + totalBarHeight;
  const barFromKitchen = totalBarHeight;
  const totalDepth = config.cabinetDepth + config.barOverhang;

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
        .option-card {
          background: #0d1520;
          border: 2px solid #243447;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 10px;
        }
        .option-card.active {
          border-color: #3b82f6;
          background: #1a2d44;
        }
        .option-card:hover:not(.active) {
          border-color: #3b5a7a;
        }
        .option-title {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 4px;
        }
        .option-desc {
          font-size: 11px;
          color: #64748b;
          line-height: 1.4;
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
        .status-info {
          background: rgba(96, 165, 250, 0.15);
          color: #60a5fa;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-top: 8px;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }
        .compare-box {
          background: #0d1520;
          border: 1px solid #243447;
          border-radius: 6px;
          padding: 10px;
        }
        .compare-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #64748b;
          margin-bottom: 8px;
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .comparison-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Kitchen-Floor Cabinet Options
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
            Explore configurations where base cabinets sit on the kitchen floor
          </p>
        </div>

        <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16 }}>
          {/* Left Panel */}
          <div>
            {/* Cabinet Facing Options */}
            <div className="panel">
              <div className="panel-title">Cabinet Orientation</div>
              
              <div 
                className={`option-card ${config.cabinetFacing === 'kitchen' ? 'active' : ''}`}
                onClick={() => update('cabinetFacing', 'kitchen')}
              >
                <div className="option-title">→ Facing Kitchen</div>
                <div className="option-desc">
                  Doors/drawers open into kitchen. Back panel or open shelving faces living room. 
                  Best for kitchen storage (pots, appliances).
                </div>
              </div>

              <div 
                className={`option-card ${config.cabinetFacing === 'livingroom' ? 'active' : ''}`}
                onClick={() => update('cabinetFacing', 'livingroom')}
              >
                <div className="option-title">← Facing Living Room</div>
                <div className="option-desc">
                  Doors open toward living room (step down to access). Back faces kitchen. 
                  Best for display, books, bar supplies.
                </div>
              </div>

              <div 
                className={`option-card ${config.cabinetFacing === 'double' ? 'active' : ''}`}
                onClick={() => update('cabinetFacing', 'double')}
              >
                <div className="option-title">↔ Double-Sided Access</div>
                <div className="option-desc">
                  Accessible from both sides. Typically open shelving or pass-through design.
                  Most flexible but less enclosed storage.
                </div>
              </div>

              {config.cabinetFacing === 'kitchen' && (
                <div className="checkbox-item" onClick={() => update('openShelvingBack', !config.openShelvingBack)}>
                  <input type="checkbox" checked={config.openShelvingBack} readOnly />
                  <span>Open shelving on living room side</span>
                </div>
              )}
            </div>

            {/* Dimensions */}
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

              <div className="checkbox-item" onClick={() => update('includeRaiser', !config.includeRaiser)}>
                <input type="checkbox" checked={config.includeRaiser} readOnly />
                <span>Add raiser/spacer for more height</span>
              </div>

              {config.includeRaiser && (
                <div className="slider-group" style={{ marginLeft: 24 }}>
                  <div className="slider-label">
                    <span>Raiser Height</span>
                    <span className="slider-value">{config.raiserHeight}"</span>
                  </div>
                  <input type="range" min="2" max="12" step="0.5"
                    value={config.raiserHeight}
                    onChange={e => update('raiserHeight', parseFloat(e.target.value))} />
                </div>
              )}

              <div className="slider-group">
                <div className="slider-label">
                  <span>Cabinet Depth</span>
                  <span className="slider-value">{config.cabinetDepth}"</span>
                </div>
                <input type="range" min="12" max="30" step="1"
                  value={config.cabinetDepth}
                  onChange={e => update('cabinetDepth', parseFloat(e.target.value))} />
                <div className="slider-note">Standard base: 24"</div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Bar Overhang (LR side)</span>
                  <span className="slider-value">{config.barOverhang}"</span>
                </div>
                <input type="range" min="0" max="18" step="1"
                  value={config.barOverhang}
                  onChange={e => update('barOverhang', parseFloat(e.target.value))} />
                <div className="slider-note">Extension past cabinets toward living room</div>
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
                  <span>Bar Top Thickness</span>
                  <span className="slider-value">{config.barTopThickness}"</span>
                </div>
                <input type="range" min="1" max="2.5" step="0.25"
                  value={config.barTopThickness}
                  onChange={e => update('barTopThickness', parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>Stool Height</span>
                  <span className="slider-value">{config.stoolHeight}"</span>
                </div>
                <input type="range" min="24" max="34" step="1"
                  value={config.stoolHeight}
                  onChange={e => update('stoolHeight', parseFloat(e.target.value))} />
              </div>

              <div className="checkbox-item" onClick={() => update('showPerson', !config.showPerson)}>
                <input type="checkbox" checked={config.showPerson} readOnly />
                <span>Show seated person</span>
              </div>
            </div>

            {/* Calculations */}
            <div className="panel">
              <div className="panel-title">Calculated Values</div>
              
              <div className="calc-row">
                <span>Bar height from kitchen floor</span>
                <span>{barFromKitchen.toFixed(1)}"</span>
              </div>
              <div className="calc-row">
                <span>Bar height from living room floor</span>
                <span>{barFromLivingRoom.toFixed(1)}"</span>
              </div>
              <div className="calc-row">
                <span>Total depth</span>
                <span>{totalDepth}"</span>
              </div>
              <div className="calc-row">
                <span>Seat to bar (kitchen side)</span>
                <span>{(barFromKitchen - config.stoolHeight).toFixed(1)}"</span>
              </div>
              <div className="calc-row">
                <span>Seating capacity</span>
                <span>~{Math.floor(config.barLength / 24)}</span>
              </div>

              {barFromKitchen >= 36 && barFromKitchen <= 42 ? (
                <div className="status-ok">✓ Bar height is in standard range (36-42")</div>
              ) : barFromKitchen < 36 ? (
                <div className="status-warn">⚠ Bar may be low ({barFromKitchen.toFixed(1)}"). Consider adding a raiser.</div>
              ) : (
                <div className="status-info">ℹ Bar is tall ({barFromKitchen.toFixed(1)}"). Works great for standing or tall stools.</div>
              )}

              <div className="status-info" style={{ marginTop: 8 }}>
                ℹ From living room, bar appears {barFromLivingRoom.toFixed(1)}" tall — 
                {barFromLivingRoom > 48 ? " more like a wall/counter than seating height" : " comfortable standing height"}
              </div>
            </div>
          </div>

          {/* Right Panel - Diagrams */}
          <div>
            {/* Main Side Section */}
            <div className="panel">
              <div className="panel-title">Side Section — {
                config.cabinetFacing === 'kitchen' ? 'Cabinets Facing Kitchen' :
                config.cabinetFacing === 'livingroom' ? 'Cabinets Facing Living Room' :
                'Double-Sided Access'
              }</div>
              <svg viewBox="0 0 520 340" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid1`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="520" height="340" fill={`url(#${uniqueId}-grid1)`}/>

                {(() => {
                  const scale = 1.7;
                  const groundY = 280;
                  const kitchenFloorY = groundY - config.stepHeight * scale;
                  const stepX = 200;
                  
                  const cabinetHeightPx = config.cabinetHeight * scale;
                  const raiserPx = config.includeRaiser ? config.raiserHeight * scale : 0;
                  const barThickPx = Math.max(config.barTopThickness * scale * 2, 6);
                  const cabinetDepthPx = config.cabinetDepth * scale;
                  const overhangPx = config.barOverhang * scale;
                  
                  const cabinetTopY = kitchenFloorY - cabinetHeightPx - raiserPx;
                  const barTopY = cabinetTopY - barThickPx;
                  
                  // Cabinet position: sits on kitchen floor, extends toward living room
                  const cabinetRight = stepX;
                  const cabinetLeft = stepX - cabinetDepthPx;
                  const barLeft = cabinetLeft - overhangPx;
                  const barRight = stepX + 10; // Small overhang into kitchen

                  return (
                    <g>
                      {/* Floors */}
                      <rect x="20" y={groundY} width={stepX - 20} height="50" fill="#1e3a5f"/>
                      <text x="100" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM</text>
                      
                      <rect x={stepX} y={kitchenFloorY} width="300" height={groundY - kitchenFloorY + 50} fill="#234060"/>
                      <text x="380" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="10">KITCHEN</text>

                      {/* Step face */}
                      <line x1={stepX} y1={groundY} x2={stepX} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="2"/>

                      {/* Raiser/spacer if enabled */}
                      {config.includeRaiser && (
                        <rect 
                          x={cabinetLeft} 
                          y={kitchenFloorY - raiserPx} 
                          width={cabinetDepthPx} 
                          height={raiserPx} 
                          fill="#3d5a7a" 
                          stroke="#4a7090" 
                          strokeWidth="1"
                        />
                      )}

                      {/* Cabinet body */}
                      <rect 
                        x={cabinetLeft} 
                        y={cabinetTopY} 
                        width={cabinetDepthPx} 
                        height={cabinetHeightPx} 
                        fill="#2d4a6a" 
                        stroke="#60a5fa" 
                        strokeWidth="1.5"
                      />

                      {/* Cabinet details based on facing direction */}
                      {config.cabinetFacing === 'kitchen' && (
                        <>
                          {/* Doors/drawers on kitchen side */}
                          <rect x={cabinetRight - 4} y={cabinetTopY + 5} width="2" height={cabinetHeightPx - 10} fill="#60a5fa" opacity="0.5"/>
                          <circle cx={cabinetRight - 10} cy={cabinetTopY + cabinetHeightPx * 0.3} r="2" fill="#60a5fa"/>
                          <circle cx={cabinetRight - 10} cy={cabinetTopY + cabinetHeightPx * 0.7} r="2" fill="#60a5fa"/>
                          
                          {/* Back panel or open shelving on living room side */}
                          {config.openShelvingBack ? (
                            <>
                              <line x1={cabinetLeft + 5} y1={cabinetTopY + cabinetHeightPx * 0.33} x2={cabinetLeft + 25} y2={cabinetTopY + cabinetHeightPx * 0.33} stroke="#60a5fa" strokeWidth="0.5"/>
                              <line x1={cabinetLeft + 5} y1={cabinetTopY + cabinetHeightPx * 0.66} x2={cabinetLeft + 25} y2={cabinetTopY + cabinetHeightPx * 0.66} stroke="#60a5fa" strokeWidth="0.5"/>
                              <rect x={cabinetLeft + 8} y={cabinetTopY + cabinetHeightPx * 0.4} width="6" height={cabinetHeightPx * 0.2} fill="#4a6a8a" opacity="0.5"/>
                            </>
                          ) : (
                            <rect x={cabinetLeft} y={cabinetTopY} width="3" height={cabinetHeightPx} fill="#1e3a5f"/>
                          )}
                        </>
                      )}

                      {config.cabinetFacing === 'livingroom' && (
                        <>
                          {/* Doors on living room side */}
                          <rect x={cabinetLeft + 2} y={cabinetTopY + 5} width="2" height={cabinetHeightPx - 10} fill="#60a5fa" opacity="0.5"/>
                          <circle cx={cabinetLeft + 10} cy={cabinetTopY + cabinetHeightPx * 0.3} r="2" fill="#60a5fa"/>
                          <circle cx={cabinetLeft + 10} cy={cabinetTopY + cabinetHeightPx * 0.7} r="2" fill="#60a5fa"/>
                          
                          {/* Back panel on kitchen side */}
                          <rect x={cabinetRight - 3} y={cabinetTopY} width="3" height={cabinetHeightPx} fill="#1e3a5f"/>
                        </>
                      )}

                      {config.cabinetFacing === 'double' && (
                        <>
                          {/* Open shelving both sides */}
                          <line x1={cabinetLeft + 5} y1={cabinetTopY + cabinetHeightPx * 0.33} x2={cabinetRight - 5} y2={cabinetTopY + cabinetHeightPx * 0.33} stroke="#60a5fa" strokeWidth="0.5"/>
                          <line x1={cabinetLeft + 5} y1={cabinetTopY + cabinetHeightPx * 0.66} x2={cabinetRight - 5} y2={cabinetTopY + cabinetHeightPx * 0.66} stroke="#60a5fa" strokeWidth="0.5"/>
                          <rect x={cabinetLeft + cabinetDepthPx / 2 - 5} y={cabinetTopY + cabinetHeightPx * 0.4} width="10" height={cabinetHeightPx * 0.2} fill="#4a6a8a" opacity="0.5"/>
                        </>
                      )}

                      {/* Toe kick */}
                      <rect x={cabinetLeft} y={kitchenFloorY - (config.includeRaiser ? raiserPx : 0) - 4} width={cabinetDepthPx} height="4" fill="#0d1520"/>

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
                      <line x1={barLeft + 5} y1={barTopY + 3} x2={barRight - 5} y2={barTopY + 3} stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>

                      {/* Person on stool in kitchen */}
                      {config.showPerson && (() => {
                        const stoolY = kitchenFloorY - config.stoolHeight * scale;
                        const px = stepX + 50;
                        return (
                          <g opacity="0.7">
                            <rect x={px - 12} y={stoolY} width="24" height="4" fill="#4a6a8a" rx="2"/>
                            <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#4a6a8a"/>
                            <rect x={px - 10} y={kitchenFloorY - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
                            <ellipse cx={px} cy={stoolY - 45} rx="11" ry="13" fill="#5a7a9a"/>
                            <rect x={px - 12} y={stoolY - 32} width="24" height="34" fill="#5a7a9a" rx="3"/>
                            <rect x={px - 35} y={stoolY - 26} width="25" height="6" fill="#5a7a9a" rx="3"/>
                          </g>
                        );
                      })()}

                      {/* Standing person in living room for scale */}
                      <g opacity="0.4">
                        <ellipse cx="80" cy={groundY - 60} rx="10" ry="12" fill="#5a7a9a"/>
                        <rect x="70" y={groundY - 48} width="20" height="48" fill="#5a7a9a" rx="3"/>
                      </g>

                      {/* DIMENSIONS */}
                      {/* Step height */}
                      <g>
                        <line x1="170" y1={groundY} x2="170" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="165" y1={groundY} x2="175" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                        <line x1="165" y1={kitchenFloorY} x2="175" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                        <text x="160" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">{config.stepHeight}"</text>
                      </g>

                      {/* Cabinet height from kitchen */}
                      <g>
                        <line x1={stepX + 100} y1={kitchenFloorY} x2={stepX + 100} y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={stepX + 95} y1={kitchenFloorY} x2={stepX + 105} y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                        <line x1={stepX + 95} y1={barTopY + 3} x2={stepX + 105} y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                        <text x={stepX + 110} y={(kitchenFloorY + barTopY) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">{barFromKitchen.toFixed(1)}"</text>
                      </g>

                      {/* Height from living room floor */}
                      <g>
                        <line x1="50" y1={groundY} x2="50" y2={barTopY + 3} stroke="#a78bfa" strokeWidth="1"/>
                        <line x1="45" y1={groundY} x2="55" y2={groundY} stroke="#a78bfa" strokeWidth="1"/>
                        <line x1="45" y1={barTopY + 3} x2="55" y2={barTopY + 3} stroke="#a78bfa" strokeWidth="1"/>
                        <text x="40" y={(groundY + barTopY) / 2} textAnchor="end" fill="#a78bfa" fontSize="9" fontFamily="monospace">{barFromLivingRoom.toFixed(1)}"</text>
                      </g>

                      {/* Overhang dimension */}
                      {config.barOverhang > 0 && (
                        <g>
                          <line x1={barLeft} y1={barTopY - 15} x2={cabinetLeft} y2={barTopY - 15} stroke="#f472b6" strokeWidth="1"/>
                          <line x1={barLeft} y1={barTopY - 20} x2={barLeft} y2={barTopY - 10} stroke="#f472b6" strokeWidth="1"/>
                          <line x1={cabinetLeft} y1={barTopY - 20} x2={cabinetLeft} y2={barTopY - 10} stroke="#f472b6" strokeWidth="1"/>
                          <text x={(barLeft + cabinetLeft) / 2} y={barTopY - 22} textAnchor="middle" fill="#f472b6" fontSize="9" fontFamily="monospace">{config.barOverhang}"</text>
                        </g>
                      )}

                      {/* Total depth */}
                      <g>
                        <line x1={barLeft} y1={barTopY - 35} x2={barRight} y2={barTopY - 35} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={barLeft} y1={barTopY - 40} x2={barLeft} y2={barTopY - 30} stroke="#60a5fa" strokeWidth="1"/>
                        <line x1={barRight} y1={barTopY - 40} x2={barRight} y2={barTopY - 30} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={(barLeft + barRight) / 2} y={barTopY - 42} textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">{totalDepth}" total</text>
                      </g>

                      {/* Arrow indicating cabinet access direction */}
                      {config.cabinetFacing === 'kitchen' && (
                        <g>
                          <line x1={cabinetRight + 10} y1={cabinetTopY + cabinetHeightPx / 2} x2={cabinetRight + 30} y2={cabinetTopY + cabinetHeightPx / 2} stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow)"/>
                          <text x={cabinetRight + 35} y={cabinetTopY + cabinetHeightPx / 2 + 4} fill="#4ade80" fontSize="9">ACCESS</text>
                        </g>
                      )}
                      {config.cabinetFacing === 'livingroom' && (
                        <g>
                          <line x1={cabinetLeft - 10} y1={cabinetTopY + cabinetHeightPx / 2} x2={cabinetLeft - 30} y2={cabinetTopY + cabinetHeightPx / 2} stroke="#4ade80" strokeWidth="2"/>
                          <text x={cabinetLeft - 55} y={cabinetTopY + cabinetHeightPx / 2 + 4} fill="#4ade80" fontSize="9">ACCESS</text>
                        </g>
                      )}

                      {/* Labels */}
                      <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">SIDE SECTION</text>
                      <text x="25" y="34" fill="#64748b" fontSize="9">Cabinets on kitchen floor, bar extends toward living room</text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Comparison with original design */}
            <div className="panel">
              <div className="panel-title">Comparison: Kitchen-Floor vs. Living-Room-Side Cabinets</div>
              
              <div className="comparison-grid">
                <div className="compare-box">
                  <div className="compare-title">Kitchen-Floor Cabinets (This Page)</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
                    <li>Standard base cabinet construction</li>
                    <li>Easier to install (sits on floor)</li>
                    <li>Bar height: {barFromKitchen.toFixed(1)}" from kitchen</li>
                    <li>Appears {barFromLivingRoom.toFixed(1)}" tall from living room</li>
                    <li>Cabinet storage in kitchen (if facing kitchen)</li>
                    <li>More structural support for heavy countertop</li>
                  </ul>
                </div>
                <div className="compare-box">
                  <div className="compare-title">Living-Room-Side Cabinets (Original)</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
                    <li>Custom build or wall-hung cabinets</li>
                    <li>More complex installation (hangs off step)</li>
                    <li>Bar height adjustable independently</li>
                    <li>Cabinet storage from living room</li>
                    <li>Taller cabinet height possible (60"+)</li>
                    <li>Requires steel brackets for knee space</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan View */}
            <div className="panel">
              <div className="panel-title">Plan View</div>
              <svg viewBox="0 0 520 200" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
                <defs>
                  <pattern id={`${uniqueId}-grid2`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="520" height="200" fill={`url(#${uniqueId}-grid2)`}/>

                {(() => {
                  const barLengthPx = Math.min(config.barLength * 2.5, 400);
                  const startX = (520 - barLengthPx) / 2;
                  const topY = 50;
                  const scale = 2.5;
                  
                  const cabinetDepthPx = config.cabinetDepth * scale;
                  const overhangPx = config.barOverhang * scale;
                  const totalDepthPx = (config.cabinetDepth + config.barOverhang) * scale;
                  const stepLineY = topY + overhangPx;

                  return (
                    <g>
                      <text x={startX + barLengthPx / 2} y="30" textAnchor="middle" fill="#64748b" fontSize="10">LIVING ROOM</text>

                      {/* Bar top */}
                      <rect x={startX} y={topY} width={barLengthPx} height={totalDepthPx} fill="#92400e" stroke="#b45309" strokeWidth="2" opacity="0.6"/>

                      {/* Living room overhang */}
                      {config.barOverhang > 0 && (
                        <>
                          <rect x={startX} y={topY} width={barLengthPx} height={overhangPx} fill="none" stroke="#f472b6" strokeWidth="1" strokeDasharray="4,2"/>
                          <text x={startX + barLengthPx / 2} y={topY + overhangPx / 2 + 4} textAnchor="middle" fill="#f472b6" fontSize="8">OVERHANG ({config.barOverhang}")</text>
                        </>
                      )}

                      {/* Step line */}
                      <line x1={startX - 20} y1={stepLineY} x2={startX + barLengthPx + 20} y2={stepLineY} stroke="#60a5fa" strokeWidth="2" strokeDasharray="8,4"/>
                      <text x={startX - 25} y={stepLineY + 4} textAnchor="end" fill="#60a5fa" fontSize="9">STEP</text>

                      {/* Cabinet zone */}
                      <rect x={startX} y={stepLineY} width={barLengthPx} height={cabinetDepthPx} fill="#2d4a6a" stroke="#60a5fa" strokeWidth="1"/>
                      <text x={startX + barLengthPx / 2} y={stepLineY + cabinetDepthPx / 2 + 4} textAnchor="middle" fill="#60a5fa" fontSize="9">CABINETS ({config.cabinetDepth}")</text>

                      {/* Access arrows based on facing */}
                      {config.cabinetFacing === 'kitchen' && (
                        <>
                          <text x={startX + barLengthPx / 2} y={stepLineY + cabinetDepthPx + 18} textAnchor="middle" fill="#4ade80" fontSize="9">↓ CABINET ACCESS</text>
                        </>
                      )}
                      {config.cabinetFacing === 'livingroom' && (
                        <>
                          <text x={startX + barLengthPx / 2} y={stepLineY - 8} textAnchor="middle" fill="#4ade80" fontSize="9">↑ CABINET ACCESS (step down)</text>
                        </>
                      )}
                      {config.cabinetFacing === 'double' && (
                        <>
                          <text x={startX + barLengthPx / 2} y={stepLineY - 8} textAnchor="middle" fill="#4ade80" fontSize="9">↑ ACCESS ↓</text>
                        </>
                      )}

                      {/* Stools */}
                      {Array.from({ length: Math.floor(config.barLength / 24) }).map((_, i) => (
                        <g key={i}>
                          <circle cx={startX + 30 + i * 55} cy={stepLineY + cabinetDepthPx + 30} r="10" fill="#3b5a7a" stroke="#5a7a9a" strokeWidth="1"/>
                        </g>
                      ))}
                      <text x={startX - 10} y={stepLineY + cabinetDepthPx + 35} textAnchor="end" fill="#64748b" fontSize="9">STOOLS</text>

                      <text x={startX + barLengthPx / 2} y="185" textAnchor="middle" fill="#64748b" fontSize="10">KITCHEN</text>

                      <text x="25" y="20" fill="#60a5fa" fontSize="11" fontWeight="600">PLAN VIEW</text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="panel" style={{ marginTop: 12 }}>
          <div className="panel-title">Design Considerations</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
            <div>
              <strong style={{ color: '#60a5fa' }}>Height Adjustment</strong>
              <p style={{ margin: '4px 0 0' }}>
                Standard 34.5" base cabinets + 1.5" top = 36" counter height. 
                {barFromKitchen < 40 && " Add a raiser (4-8\") to reach bar height."}
              </p>
            </div>
            <div>
              <strong style={{ color: '#60a5fa' }}>Living Room Perspective</strong>
              <p style={{ margin: '4px 0 0' }}>
                At {barFromLivingRoom.toFixed(0)}" from living room floor, 
                {barFromLivingRoom > 50 ? " this will feel more like a half-wall than a bar from that side." : " still usable as a leaning/standing bar."}
              </p>
            </div>
            <div>
              <strong style={{ color: '#60a5fa' }}>Cabinet Facing Choice</strong>
              <p style={{ margin: '4px 0 0' }}>
                Facing kitchen = convenient for cookware. Facing living room = display/bar storage. 
                Double-sided = most flexible but less hidden storage.
              </p>
            </div>
            <div>
              <strong style={{ color: '#60a5fa' }}>Construction</strong>
              <p style={{ margin: '4px 0 0' }}>
                Kitchen-floor cabinets are standard base cabinet construction—easier to source, 
                install, and modify than custom wall-hung units.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
