import React, { useState } from 'react';

export default function KitchenBarPlanner() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    barTopHeight: 40,
    barDepth: 28,
    cabinetDepth: 12,
    barLength: 84,
    stoolHeight: 30,
    showPerson: true,
    cabinetStyle: 'doors', // 'doors', 'open', 'mixed'
  });

  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  // Calculated values
  const kneeSpace = config.barDepth - config.cabinetDepth;
  const barFromLivingRoom = config.barTopHeight + config.stepHeight;
  const cabinetHeight = barFromLivingRoom - 4; // 4" toe kick from living room floor

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      color: '#e8f0f8',
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        .control-group { margin-bottom: 16px; }
        .control-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #6b8ab8;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .control-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        input[type="range"] {
          flex: 1;
          height: 4px;
          background: #1e3a5f;
          border-radius: 2px;
          -webkit-appearance: none;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #4a9eff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
        }
        .value-display {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          color: #4a9eff;
          min-width: 50px;
          text-align: right;
        }
        .view-container {
          background: #0d1e33;
          border: 1px solid #1e3a5f;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .view-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #4a9eff;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #1e3a5f;
        }
        .calc-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #152840;
        }
        .calc-label { color: #8ba4c4; font-size: 13px; }
        .calc-value { 
          font-family: 'IBM Plex Mono', monospace;
          color: #4a9eff;
        }
        .note {
          font-size: 12px;
          color: #5a7a9a;
          font-style: italic;
          margin-top: 4px;
        }
        .cabinet-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid #1e3a5f;
          color: #8ba4c4;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }
        .cabinet-btn.active {
          background: #4a9eff;
          border-color: #4a9eff;
          color: #0a1628;
        }
        .cabinet-btn:hover:not(.active) {
          border-color: #4a9eff;
          color: #4a9eff;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, borderBottom: '1px solid #1e3a5f', paddingBottom: 20 }}>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 300, 
            margin: 0,
            letterSpacing: '-0.5px',
            color: '#fff'
          }}>
            Split-Level Kitchen Bar Planner
          </h1>
          <p style={{ color: '#6b8ab8', marginTop: 8, fontSize: 14 }}>
            Interactive visualization for your elevated kitchen bar with living room storage
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
          {/* Controls Panel */}
          <div>
            <div className="view-container">
              <div className="view-title">Dimensions</div>
              
              <div className="control-group">
                <label className="control-label">Step Height</label>
                <div className="control-row">
                  <input type="range" min="18" max="30" step="0.5" 
                    value={config.stepHeight} 
                    onChange={e => update('stepHeight', parseFloat(e.target.value))} />
                  <span className="value-display">{config.stepHeight}"</span>
                </div>
                <div className="note">Kitchen above living room</div>
              </div>

              <div className="control-group">
                <label className="control-label">Bar Top Height (from kitchen)</label>
                <div className="control-row">
                  <input type="range" min="36" max="46" step="1" 
                    value={config.barTopHeight} 
                    onChange={e => update('barTopHeight', parseFloat(e.target.value))} />
                  <span className="value-display">{config.barTopHeight}"</span>
                </div>
                <div className="note">Standard bar: 42", Counter: 36"</div>
              </div>

              <div className="control-group">
                <label className="control-label">Total Bar Depth</label>
                <div className="control-row">
                  <input type="range" min="24" max="36" step="1" 
                    value={config.barDepth} 
                    onChange={e => update('barDepth', parseFloat(e.target.value))} />
                  <span className="value-display">{config.barDepth}"</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Cabinet Depth</label>
                <div className="control-row">
                  <input type="range" min="8" max="24" step="1" 
                    value={config.cabinetDepth} 
                    onChange={e => update('cabinetDepth', parseFloat(e.target.value))} />
                  <span className="value-display">{config.cabinetDepth}"</span>
                </div>
                <div className="note">Standard base cabinet: 24"</div>
              </div>

              <div className="control-group">
                <label className="control-label">Bar Length</label>
                <div className="control-row">
                  <input type="range" min="60" max="120" step="6" 
                    value={config.barLength} 
                    onChange={e => update('barLength', parseFloat(e.target.value))} />
                  <span className="value-display">{config.barLength}"</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Stool Height</label>
                <div className="control-row">
                  <input type="range" min="24" max="34" step="1" 
                    value={config.stoolHeight} 
                    onChange={e => update('stoolHeight', parseFloat(e.target.value))} />
                  <span className="value-display">{config.stoolHeight}"</span>
                </div>
                <div className="note">Bar stools: 28-30", Counter: 24-26"</div>
              </div>
            </div>

            <div className="view-container">
              <div className="view-title">Cabinet Style (Living Room Side)</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['doors', 'open', 'mixed'].map(style => (
                  <button key={style} 
                    className={`cabinet-btn ${config.cabinetStyle === style ? 'active' : ''}`}
                    onClick={() => update('cabinetStyle', style)}>
                    {style === 'doors' ? 'Closed Doors' : style === 'open' ? 'Open Shelves' : 'Mixed'}
                  </button>
                ))}
              </div>
            </div>

            <div className="view-container">
              <div className="view-title">Calculated Values</div>
              <div className="calc-item">
                <span className="calc-label">Bar top from living room floor</span>
                <span className="calc-value">{barFromLivingRoom}"</span>
              </div>
              <div className="calc-item">
                <span className="calc-label">Knee clearance</span>
                <span className="calc-value">{kneeSpace}"</span>
              </div>
              <div className="calc-item">
                <span className="calc-label">Cabinet height</span>
                <span className="calc-value">{cabinetHeight.toFixed(1)}"</span>
              </div>
              <div className="calc-item">
                <span className="calc-label">Seat to bar top</span>
                <span className="calc-value">{config.barTopHeight - config.stoolHeight}"</span>
              </div>
              <div style={{ 
                marginTop: 12, 
                padding: 12, 
                background: kneeSpace >= 12 ? 'rgba(74, 255, 128, 0.1)' : 'rgba(255, 128, 74, 0.1)',
                borderRadius: 4,
                fontSize: 12,
                color: kneeSpace >= 12 ? '#4aff80' : '#ff8a4a'
              }}>
                {kneeSpace >= 12 
                  ? '✓ Knee clearance is comfortable (12"+ recommended)'
                  : '⚠ Knee clearance may be tight (12"+ recommended)'}
              </div>
              <div style={{ 
                marginTop: 8, 
                padding: 12, 
                background: (config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 
                  ? 'rgba(74, 255, 128, 0.1)' : 'rgba(255, 128, 74, 0.1)',
                borderRadius: 4,
                fontSize: 12,
                color: (config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 
                  ? '#4aff80' : '#ff8a4a'
              }}>
                {(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14
                  ? '✓ Seat-to-bar distance is ideal (10-14")'
                  : '⚠ Seat-to-bar should be 10-14"'}
              </div>
            </div>
          </div>

          {/* Diagrams */}
          <div>
            {/* Side Section View */}
            <div className="view-container">
              <div className="view-title">Side Section View</div>
              <svg viewBox="0 0 500 320" style={{ width: '100%', height: 'auto' }}>
                {/* Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="320" fill="url(#grid)"/>

                {/* Living Room Floor */}
                <rect x="20" y="260" width="180" height="40" fill="#1a3352"/>
                <text x="110" y="285" textAnchor="middle" fill="#4a7090" fontSize="11">LIVING ROOM</text>

                {/* Kitchen Floor (elevated) */}
                <rect x="200" y={260 - config.stepHeight * 2} width="280" height={40 + config.stepHeight * 2} fill="#1e4060"/>
                <text x="360" y={275 - config.stepHeight * 2 + 15} textAnchor="middle" fill="#4a7090" fontSize="11">KITCHEN</text>

                {/* Step */}
                <line x1="200" y1="260" x2="200" y2={260 - config.stepHeight * 2} stroke="#4a9eff" strokeWidth="2"/>
                
                {/* Step dimension */}
                <line x1="170" y1="260" x2="170" y2={260 - config.stepHeight * 2} stroke="#ff9f4a" strokeWidth="1"/>
                <line x1="165" y1="260" x2="175" y2="260" stroke="#ff9f4a" strokeWidth="1"/>
                <line x1="165" y1={260 - config.stepHeight * 2} x2="175" y2={260 - config.stepHeight * 2} stroke="#ff9f4a" strokeWidth="1"/>
                <text x="155" y={260 - config.stepHeight} textAnchor="end" fill="#ff9f4a" fontSize="10" fontFamily="IBM Plex Mono">
                  {config.stepHeight}"
                </text>

                {/* Cabinet (on living room side) */}
                {(() => {
                  const cabinetTop = 260 - config.barTopHeight * 2 - config.stepHeight * 2 + 8;
                  const cabinetBottom = 256; // 4" toe kick
                  const cabinetLeft = 200 - config.cabinetDepth * 2;
                  const cabinetWidth = config.cabinetDepth * 2;
                  const cabinetHeightPx = cabinetBottom - cabinetTop;
                  
                  return (
                    <g>
                      {/* Cabinet body */}
                      <rect x={cabinetLeft} y={cabinetTop} width={cabinetWidth} height={cabinetHeightPx} 
                        fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1.5"/>
                      
                      {/* Toe kick */}
                      <rect x={cabinetLeft} y={cabinetBottom} width={cabinetWidth} height="4" fill="#0d1e33"/>
                      
                      {/* Cabinet style details */}
                      {config.cabinetStyle === 'doors' && (
                        <>
                          <line x1={cabinetLeft + cabinetWidth/2} y1={cabinetTop + 5} x2={cabinetLeft + cabinetWidth/2} y2={cabinetBottom - 5} 
                            stroke="#4a9eff" strokeWidth="0.5"/>
                          <circle cx={cabinetLeft + cabinetWidth/2 - 4} cy={cabinetTop + cabinetHeightPx/2} r="2" fill="#4a9eff"/>
                          <circle cx={cabinetLeft + cabinetWidth/2 + 4} cy={cabinetTop + cabinetHeightPx/2} r="2" fill="#4a9eff"/>
                        </>
                      )}
                      {config.cabinetStyle === 'open' && (
                        <>
                          <line x1={cabinetLeft + 3} y1={cabinetTop + cabinetHeightPx * 0.33} x2={cabinetLeft + cabinetWidth - 3} y2={cabinetTop + cabinetHeightPx * 0.33} 
                            stroke="#4a9eff" strokeWidth="0.5"/>
                          <line x1={cabinetLeft + 3} y1={cabinetTop + cabinetHeightPx * 0.66} x2={cabinetLeft + cabinetWidth - 3} y2={cabinetTop + cabinetHeightPx * 0.66} 
                            stroke="#4a9eff" strokeWidth="0.5"/>
                        </>
                      )}
                      {config.cabinetStyle === 'mixed' && (
                        <>
                          <line x1={cabinetLeft + 3} y1={cabinetTop + cabinetHeightPx * 0.4} x2={cabinetLeft + cabinetWidth - 3} y2={cabinetTop + cabinetHeightPx * 0.4} 
                            stroke="#4a9eff" strokeWidth="1"/>
                          <line x1={cabinetLeft + cabinetWidth/2} y1={cabinetTop + cabinetHeightPx * 0.4 + 5} x2={cabinetLeft + cabinetWidth/2} y2={cabinetBottom - 5} 
                            stroke="#4a9eff" strokeWidth="0.5"/>
                          <circle cx={cabinetLeft + cabinetWidth/2 + 4} cy={cabinetTop + cabinetHeightPx * 0.7} r="2" fill="#4a9eff"/>
                        </>
                      )}
                    </g>
                  );
                })()}

                {/* Bar top (butcher block) */}
                {(() => {
                  const barTopY = 260 - config.barTopHeight * 2 - config.stepHeight * 2;
                  const barLeft = 200 - config.cabinetDepth * 2;
                  const barRight = 200 + (config.barDepth - config.cabinetDepth) * 2;
                  
                  return (
                    <g>
                      <rect x={barLeft} y={barTopY} width={barRight - barLeft} height="8" 
                        fill="#8b5a2b" stroke="#a0522d" strokeWidth="1"/>
                      {/* Wood grain lines */}
                      <line x1={barLeft + 5} y1={barTopY + 3} x2={barRight - 5} y2={barTopY + 3} stroke="#704820" strokeWidth="0.5" opacity="0.5"/>
                      <line x1={barLeft + 5} y1={barTopY + 5} x2={barRight - 5} y2={barTopY + 5} stroke="#704820" strokeWidth="0.5" opacity="0.3"/>
                    </g>
                  );
                })()}

                {/* Knee space bracket underneath bar */}
                {(() => {
                  const barTopY = 260 - config.barTopHeight * 2 - config.stepHeight * 2;
                  const kneeRight = 200 + (config.barDepth - config.cabinetDepth) * 2;
                  
                  return (
                    <g>
                      {/* Support bracket */}
                      <rect x="198" y={barTopY + 8} width="4" height={config.barTopHeight * 2 - 8} fill="#2a4a6a"/>
                    </g>
                  );
                })()}

                {/* Person on stool */}
                {config.showPerson && (() => {
                  const kitchenFloor = 260 - config.stepHeight * 2;
                  const seatY = kitchenFloor - config.stoolHeight * 2;
                  const personX = 260;
                  
                  return (
                    <g opacity="0.8">
                      {/* Stool */}
                      <rect x={personX - 12} y={seatY} width="24" height="4" fill="#4a6a8a" rx="2"/>
                      <rect x={personX - 2} y={seatY + 4} width="4" height={config.stoolHeight * 2 - 4} fill="#4a6a8a"/>
                      <rect x={personX - 10} y={kitchenFloor - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
                      
                      {/* Person (simplified) */}
                      <ellipse cx={personX} cy={seatY - 50} rx="12" ry="14" fill="#6a8aaa" stroke="#8ab0d0" strokeWidth="1"/> {/* Head */}
                      <rect x={personX - 14} y={seatY - 36} width="28" height="38" fill="#6a8aaa" rx="4"/> {/* Torso */}
                      <rect x={personX + 14} y={seatY - 30} width="30" height="8" fill="#6a8aaa" rx="4"/> {/* Arm on bar */}
                      <rect x={personX - 10} y={seatY} width="20" height="8" fill="#6a8aaa" rx="2"/> {/* Upper legs */}
                    </g>
                  );
                })()}

                {/* Dimension: Bar top height from kitchen */}
                {(() => {
                  const kitchenFloor = 260 - config.stepHeight * 2;
                  const barTopY = 260 - config.barTopHeight * 2 - config.stepHeight * 2;
                  
                  return (
                    <g>
                      <line x1="320" y1={kitchenFloor} x2="320" y2={barTopY + 4} stroke="#4aff80" strokeWidth="1"/>
                      <line x1="315" y1={kitchenFloor} x2="325" y2={kitchenFloor} stroke="#4aff80" strokeWidth="1"/>
                      <line x1="315" y1={barTopY + 4} x2="325" y2={barTopY + 4} stroke="#4aff80" strokeWidth="1"/>
                      <text x="330" y={(kitchenFloor + barTopY) / 2 + 4} fill="#4aff80" fontSize="10" fontFamily="IBM Plex Mono">
                        {config.barTopHeight}"
                      </text>
                    </g>
                  );
                })()}

                {/* Dimension: Total bar depth */}
                {(() => {
                  const barTopY = 260 - config.barTopHeight * 2 - config.stepHeight * 2 - 15;
                  const barLeft = 200 - config.cabinetDepth * 2;
                  const barRight = 200 + (config.barDepth - config.cabinetDepth) * 2;
                  
                  return (
                    <g>
                      <line x1={barLeft} y1={barTopY} x2={barRight} y2={barTopY} stroke="#9b4aff" strokeWidth="1"/>
                      <line x1={barLeft} y1={barTopY - 5} x2={barLeft} y2={barTopY + 5} stroke="#9b4aff" strokeWidth="1"/>
                      <line x1={barRight} y1={barTopY - 5} x2={barRight} y2={barTopY + 5} stroke="#9b4aff" strokeWidth="1"/>
                      <text x={(barLeft + barRight) / 2} y={barTopY - 8} textAnchor="middle" fill="#9b4aff" fontSize="10" fontFamily="IBM Plex Mono">
                        {config.barDepth}" total depth
                      </text>
                    </g>
                  );
                })()}

                {/* Labels */}
                <text x="30" y="30" fill="#4a9eff" fontSize="12" fontWeight="500">SIDE SECTION</text>
                <text x="30" y="45" fill="#6a8aaa" fontSize="10">Looking along the bar length</text>
              </svg>
            </div>

            {/* Front Elevation (from Living Room) */}
            <div className="view-container">
              <div className="view-title">Front Elevation — View from Living Room</div>
              <svg viewBox="0 0 500 280" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="280" fill="url(#grid2)"/>

                {/* Floor */}
                <rect x="20" y="240" width="460" height="30" fill="#1a3352"/>

                {/* Cabinet unit */}
                {(() => {
                  const cabinetHeightPx = cabinetHeight * 2.5;
                  const cabinetTop = 236 - cabinetHeightPx;
                  const barLengthPx = config.barLength * 2.5;
                  const startX = (500 - barLengthPx) / 2;
                  const numSections = Math.floor(config.barLength / 21); // ~21" per section
                  const sectionWidth = barLengthPx / numSections;
                  
                  return (
                    <g>
                      {/* Toe kick */}
                      <rect x={startX} y="232" width={barLengthPx} height="8" fill="#0d1e33"/>
                      
                      {/* Main cabinet body */}
                      <rect x={startX} y={cabinetTop} width={barLengthPx} height={cabinetHeightPx} 
                        fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1.5"/>
                      
                      {/* Cabinet sections */}
                      {Array.from({ length: numSections }).map((_, i) => {
                        const sectionX = startX + i * sectionWidth;
                        const isOdd = i % 2 === 0;
                        
                        if (config.cabinetStyle === 'doors') {
                          return (
                            <g key={i}>
                              <rect x={sectionX + 4} y={cabinetTop + 8} width={sectionWidth - 8} height={cabinetHeightPx - 16} 
                                fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                              <circle cx={sectionX + sectionWidth - 14} cy={cabinetTop + cabinetHeightPx/2} r="3" fill="#4a9eff"/>
                            </g>
                          );
                        } else if (config.cabinetStyle === 'open') {
                          return (
                            <g key={i}>
                              <rect x={sectionX + 4} y={cabinetTop + 8} width={sectionWidth - 8} height={cabinetHeightPx - 16} 
                                fill="#1a3352" stroke="#4a9eff" strokeWidth="0.5"/>
                              <line x1={sectionX + 8} y1={cabinetTop + cabinetHeightPx * 0.35} x2={sectionX + sectionWidth - 8} y2={cabinetTop + cabinetHeightPx * 0.35} 
                                stroke="#4a9eff" strokeWidth="0.5"/>
                              <line x1={sectionX + 8} y1={cabinetTop + cabinetHeightPx * 0.65} x2={sectionX + sectionWidth - 8} y2={cabinetTop + cabinetHeightPx * 0.65} 
                                stroke="#4a9eff" strokeWidth="0.5"/>
                              {/* Books/items suggestion */}
                              <rect x={sectionX + 10} y={cabinetTop + cabinetHeightPx * 0.4} width="8" height={cabinetHeightPx * 0.22} fill="#4a6a8a" opacity="0.5"/>
                              <rect x={sectionX + 20} y={cabinetTop + cabinetHeightPx * 0.38} width="6" height={cabinetHeightPx * 0.24} fill="#5a7a9a" opacity="0.5"/>
                            </g>
                          );
                        } else { // mixed
                          return (
                            <g key={i}>
                              {isOdd ? (
                                // Open shelf section
                                <>
                                  <rect x={sectionX + 4} y={cabinetTop + 8} width={sectionWidth - 8} height={cabinetHeightPx * 0.45} 
                                    fill="#1a3352" stroke="#4a9eff" strokeWidth="0.5"/>
                                  <rect x={sectionX + 4} y={cabinetTop + cabinetHeightPx * 0.55} width={sectionWidth - 8} height={cabinetHeightPx * 0.38} 
                                    fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                                  <circle cx={sectionX + sectionWidth - 14} cy={cabinetTop + cabinetHeightPx * 0.74} r="3" fill="#4a9eff"/>
                                </>
                              ) : (
                                // Drawers section
                                <>
                                  <rect x={sectionX + 4} y={cabinetTop + 8} width={sectionWidth - 8} height={cabinetHeightPx * 0.28} 
                                    fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                                  <rect x={sectionX + 4} y={cabinetTop + cabinetHeightPx * 0.38} width={sectionWidth - 8} height={cabinetHeightPx * 0.28} 
                                    fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                                  <rect x={sectionX + 4} y={cabinetTop + cabinetHeightPx * 0.68} width={sectionWidth - 8} height={cabinetHeightPx * 0.24} 
                                    fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                                  {/* Drawer pulls */}
                                  <rect x={sectionX + sectionWidth/2 - 10} y={cabinetTop + cabinetHeightPx * 0.2} width="20" height="3" fill="#4a9eff" rx="1"/>
                                  <rect x={sectionX + sectionWidth/2 - 10} y={cabinetTop + cabinetHeightPx * 0.5} width="20" height="3" fill="#4a9eff" rx="1"/>
                                  <rect x={sectionX + sectionWidth/2 - 10} y={cabinetTop + cabinetHeightPx * 0.78} width="20" height="3" fill="#4a9eff" rx="1"/>
                                </>
                              )}
                            </g>
                          );
                        }
                      })}
                      
                      {/* Bar top */}
                      <rect x={startX - 8} y={cabinetTop - 10} width={barLengthPx + 16} height="10" 
                        fill="#8b5a2b" stroke="#a0522d" strokeWidth="1"/>
                      
                      {/* Dimension: Length */}
                      <line x1={startX} y1="255" x2={startX + barLengthPx} y2="255" stroke="#ff9f4a" strokeWidth="1"/>
                      <line x1={startX} y1="250" x2={startX} y2="260" stroke="#ff9f4a" strokeWidth="1"/>
                      <line x1={startX + barLengthPx} y1="250" x2={startX + barLengthPx} y2="260" stroke="#ff9f4a" strokeWidth="1"/>
                      <text x={startX + barLengthPx/2} y="270" textAnchor="middle" fill="#ff9f4a" fontSize="11" fontFamily="IBM Plex Mono">
                        {config.barLength}" ({(config.barLength / 12).toFixed(1)} ft)
                      </text>
                      
                      {/* Dimension: Height from floor */}
                      <line x1={startX - 20} y1="236" x2={startX - 20} y2={cabinetTop - 10} stroke="#4aff80" strokeWidth="1"/>
                      <line x1={startX - 25} y1="236" x2={startX - 15} y2="236" stroke="#4aff80" strokeWidth="1"/>
                      <line x1={startX - 25} y1={cabinetTop - 10} x2={startX - 15} y2={cabinetTop - 10} stroke="#4aff80" strokeWidth="1"/>
                      <text x={startX - 30} y={(236 + cabinetTop - 10) / 2} textAnchor="end" fill="#4aff80" fontSize="10" fontFamily="IBM Plex Mono">
                        {barFromLivingRoom}"
                      </text>
                    </g>
                  );
                })()}

                <text x="30" y="30" fill="#4a9eff" fontSize="12" fontWeight="500">LIVING ROOM ELEVATION</text>
                <text x="30" y="45" fill="#6a8aaa" fontSize="10">View from living room looking at cabinets/shelving</text>
              </svg>
            </div>

            {/* Plan View */}
            <div className="view-container">
              <div className="view-title">Plan View — Bird's Eye</div>
              <svg viewBox="0 0 500 200" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="200" fill="url(#grid3)"/>

                {(() => {
                  const barLengthPx = Math.min(config.barLength * 2, 380);
                  const startX = (500 - barLengthPx) / 2;
                  const cabinetDepthPx = config.cabinetDepth * 3;
                  const kneeSpacePx = (config.barDepth - config.cabinetDepth) * 3;
                  const totalDepthPx = config.barDepth * 3;
                  
                  const kitchenY = 40;
                  const livingRoomY = kitchenY + totalDepthPx + 20;
                  
                  return (
                    <g>
                      {/* Kitchen area label */}
                      <text x={startX + barLengthPx/2} y="25" textAnchor="middle" fill="#4a7090" fontSize="11">KITCHEN SIDE</text>
                      
                      {/* Bar counter top outline */}
                      <rect x={startX} y={kitchenY} width={barLengthPx} height={totalDepthPx} 
                        fill="#8b5a2b" stroke="#a0522d" strokeWidth="2" opacity="0.8"/>
                      
                      {/* Cabinet zone (living room side) */}
                      <rect x={startX} y={kitchenY + kneeSpacePx} width={barLengthPx} height={cabinetDepthPx} 
                        fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1" strokeDasharray="4,2"/>
                      <text x={startX + barLengthPx/2} y={kitchenY + kneeSpacePx + cabinetDepthPx/2 + 4} 
                        textAnchor="middle" fill="#4a9eff" fontSize="9">CABINETS ({config.cabinetDepth}")</text>
                      
                      {/* Knee space zone */}
                      <rect x={startX} y={kitchenY} width={barLengthPx} height={kneeSpacePx} 
                        fill="none" stroke="#4aff80" strokeWidth="1" strokeDasharray="4,2"/>
                      <text x={startX + barLengthPx/2} y={kitchenY + kneeSpacePx/2 + 4} 
                        textAnchor="middle" fill="#4aff80" fontSize="9">OVERHANG ({kneeSpace}")</text>
                      
                      {/* Stool positions */}
                      {Array.from({ length: Math.floor(config.barLength / 24) }).map((_, i) => {
                        const stoolX = startX + 24 + i * 48;
                        return (
                          <g key={i}>
                            <circle cx={stoolX} cy={kitchenY - 20} r="10" fill="#4a6a8a" stroke="#6a8aaa" strokeWidth="1"/>
                            <circle cx={stoolX} cy={kitchenY - 20} r="4" fill="#6a8aaa"/>
                          </g>
                        );
                      })}
                      <text x={startX - 10} y={kitchenY - 20} textAnchor="end" fill="#6a8aaa" fontSize="9">STOOLS</text>
                      
                      {/* Living room area label */}
                      <text x={startX + barLengthPx/2} y={livingRoomY + 15} textAnchor="middle" fill="#4a7090" fontSize="11">LIVING ROOM SIDE</text>
                      
                      {/* Dimension: Total depth */}
                      <line x1={startX + barLengthPx + 15} y1={kitchenY} x2={startX + barLengthPx + 15} y2={kitchenY + totalDepthPx} stroke="#9b4aff" strokeWidth="1"/>
                      <line x1={startX + barLengthPx + 10} y1={kitchenY} x2={startX + barLengthPx + 20} y2={kitchenY} stroke="#9b4aff" strokeWidth="1"/>
                      <line x1={startX + barLengthPx + 10} y1={kitchenY + totalDepthPx} x2={startX + barLengthPx + 20} y2={kitchenY + totalDepthPx} stroke="#9b4aff" strokeWidth="1"/>
                      <text x={startX + barLengthPx + 25} y={kitchenY + totalDepthPx/2 + 4} fill="#9b4aff" fontSize="10" fontFamily="IBM Plex Mono">
                        {config.barDepth}"
                      </text>
                      
                      {/* Seating capacity note */}
                      <text x={startX + barLengthPx/2} y="185" textAnchor="middle" fill="#6a8aaa" fontSize="10">
                        Seating capacity: ~{Math.floor(config.barLength / 24)} people (24" per person)
                      </text>
                    </g>
                  );
                })()}

                <text x="30" y="20" fill="#4a9eff" fontSize="12" fontWeight="500">PLAN VIEW</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="view-container" style={{ marginTop: 20 }}>
          <div className="view-title">Design Notes & Recommendations</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 13, marginBottom: 8 }}>Electrical Considerations</h4>
              <p style={{ fontSize: 12, color: '#8ba4c4', lineHeight: 1.6 }}>
                For laptop/device charging, plan for 2-3 outlets along the bar top. Consider:
                pop-up outlets, under-counter USB strips, or discrete outlets in the bar face 
                (kitchen side). Run conduit during construction.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 13, marginBottom: 8 }}>Butcher Block Tips</h4>
              <p style={{ fontSize: 12, color: '#8ba4c4', lineHeight: 1.6 }}>
                For an {config.barLength}" span, consider 1.5" thick butcher block minimum. 
                Support every 36" to prevent sagging. Seal with food-safe finish if using 
                for food prep. Allow 1/8" gap at walls for wood movement.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 13, marginBottom: 8 }}>Cabinet Options</h4>
              <p style={{ fontSize: 12, color: '#8ba4c4', lineHeight: 1.6 }}>
                Living room cabinets at {cabinetHeight.toFixed(0)}" tall can hold: books/display items (open), 
                board games, craft supplies, or AV equipment. Consider adjustable shelves 
                and soft-close hinges.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 13, marginBottom: 8 }}>Column Decision</h4>
              <p style={{ fontSize: 12, color: '#8ba4c4', lineHeight: 1.6 }}>
                If the column is non-structural, removing it opens sight lines. If keeping it, 
                consider wrapping it to match the bar/cabinet aesthetic, or making it a 
                design feature with contrasting material.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
