import React, { useState } from 'react';

export default function KitchenBarPlannerV2() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,
    barTopHeight: 40,
    barDepth: 28,
    cabinetDepth: 12,
    cabinetSetback: 3, // NEW: how far cabinets are tucked under
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

  const [activeView, setActiveView] = useState('all'); // 'all', 'section', 'elevation', 'plan', 'construction'

  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  // Calculated values
  const kneeSpaceKitchen = config.barDepth - config.cabinetDepth - config.cabinetSetback;
  const overhangLivingRoom = config.cabinetSetback;
  const barFromLivingRoom = config.barTopHeight + config.stepHeight;
  const cabinetHeight = barFromLivingRoom - 4 - config.cabinetSetback; // Account for setback shadow line

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    
    * { box-sizing: border-box; }
    
    .control-group { margin-bottom: 14px; }
    .control-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
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
      font-size: 13px;
      color: #4a9eff;
      min-width: 45px;
      text-align: right;
    }
    .view-container {
      background: #0d1e33;
      border: 1px solid #1e3a5f;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
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
      padding: 6px 0;
      border-bottom: 1px solid #152840;
      font-size: 12px;
    }
    .calc-label { color: #8ba4c4; }
    .calc-value { 
      font-family: 'IBM Plex Mono', monospace;
      color: #4a9eff;
    }
    .note {
      font-size: 11px;
      color: #5a7a9a;
      margin-top: 3px;
    }
    .toggle-btn {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid #1e3a5f;
      color: #8ba4c4;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      transition: all 0.2s;
    }
    .toggle-btn.active {
      background: #4a9eff;
      border-color: #4a9eff;
      color: #0a1628;
    }
    .toggle-btn:hover:not(.active) {
      border-color: #4a9eff;
      color: #4a9eff;
    }
    .section-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #4a6a8a;
      margin: 16px 0 10px 0;
      padding-top: 12px;
      border-top: 1px solid #152840;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      cursor: pointer;
    }
    .checkbox-row input {
      accent-color: #4a9eff;
    }
    .checkbox-row label {
      font-size: 12px;
      color: #8ba4c4;
      cursor: pointer;
    }
    .view-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .view-tab {
      padding: 8px 16px;
      background: #0d1e33;
      border: 1px solid #1e3a5f;
      color: #6b8ab8;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s;
    }
    .view-tab.active {
      background: #1e3a5f;
      border-color: #4a9eff;
      color: #4a9eff;
    }
    .view-tab:hover:not(.active) {
      border-color: #4a9eff;
    }
    .status-good {
      background: rgba(74, 255, 128, 0.1);
      color: #4aff80;
    }
    .status-warn {
      background: rgba(255, 128, 74, 0.1);
      color: #ff8a4a;
    }
    .status-box {
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 11px;
      margin-top: 6px;
    }
  `;

  const SideSection = () => {
    const scale = 2;
    const kitchenFloor = 260 - config.stepHeight * scale;
    const barTopY = 260 - config.barTopHeight * scale - config.stepHeight * scale;
    const cabinetLeft = 200 - config.cabinetDepth * scale;
    const cabinetRight = 200;
    const barLeft = cabinetLeft - config.cabinetSetback * scale;
    const barRight = 200 + kneeSpaceKitchen * scale;
    const cabinetTop = barTopY + 10 + config.cabinetSetback * scale;
    const cabinetBottom = 256;

    return (
      <svg viewBox="0 0 500 320" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="barLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffdd88" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#ffdd88" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="500" height="320" fill="url(#grid)"/>

        {/* Living Room Floor */}
        <rect x="20" y="260" width="180" height="40" fill="#1a3352"/>
        <text x="110" y="285" textAnchor="middle" fill="#4a7090" fontSize="11">LIVING ROOM</text>

        {/* Kitchen Floor (elevated) */}
        <rect x="200" y={kitchenFloor} width="280" height={300 - kitchenFloor} fill="#1e4060"/>
        <text x="360" y={kitchenFloor + 20} textAnchor="middle" fill="#4a7090" fontSize="11">KITCHEN</text>

        {/* Step edge */}
        <line x1="200" y1="260" x2="200" y2={kitchenFloor} stroke="#4a9eff" strokeWidth="2"/>

        {/* Cabinet */}
        <rect x={cabinetLeft} y={cabinetTop} width={config.cabinetDepth * scale} height={cabinetBottom - cabinetTop} 
          fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1.5"/>
        <rect x={cabinetLeft} y={cabinetBottom} width={config.cabinetDepth * scale} height="4" fill="#0d1e33"/>

        {/* Cabinet interior details */}
        {config.cabinetStyle === 'mixed' && (
          <>
            <line x1={cabinetLeft + 4} y1={cabinetTop + (cabinetBottom - cabinetTop) * 0.4} 
              x2={cabinetRight - 4} y2={cabinetTop + (cabinetBottom - cabinetTop) * 0.4} 
              stroke="#4a9eff" strokeWidth="1"/>
          </>
        )}

        {/* Wine storage */}
        {config.wineStorage && (
          <g>
            {Array.from({ length: 3 }).map((_, i) => (
              <ellipse key={i} cx={cabinetLeft + 12 + i * 8} cy={cabinetTop + 20} rx="3" ry="6" 
                fill="none" stroke="#6a4a8a" strokeWidth="1"/>
            ))}
          </g>
        )}

        {/* Bar top */}
        <rect x={barLeft} y={barTopY} width={barRight - barLeft} height={config.barTopThickness * scale + 6} 
          fill="#8b5a2b" stroke="#a0522d" strokeWidth="1.5"/>
        <line x1={barLeft + 4} y1={barTopY + 4} x2={barRight - 4} y2={barTopY + 4} 
          stroke="#704820" strokeWidth="0.5" opacity="0.5"/>

        {/* Waterfall edge */}
        {config.waterfallEdge && (
          <>
            <rect x={barLeft} y={barTopY + config.barTopThickness * scale + 6} 
              width={config.barTopThickness * scale + 6} height={40} 
              fill="#8b5a2b" stroke="#a0522d" strokeWidth="1.5"/>
            <rect x={barRight - config.barTopThickness * scale - 6} y={barTopY + config.barTopThickness * scale + 6} 
              width={config.barTopThickness * scale + 6} height={kitchenFloor - barTopY - config.barTopThickness * scale - 6} 
              fill="#8b5a2b" stroke="#a0522d" strokeWidth="1.5"/>
          </>
        )}

        {/* Under-bar lighting glow */}
        {config.showLighting && (
          <rect x={barLeft + 10} y={barTopY + config.barTopThickness * scale + 8} 
            width={cabinetRight - barLeft - 20} height="30" 
            fill="url(#barLight)"/>
        )}

        {/* Support structure */}
        <rect x="198" y={barTopY + config.barTopThickness * scale + 6} width="4" 
          height={kitchenFloor - barTopY - config.barTopThickness * scale - 6} fill="#2a4a6a"/>

        {/* Person on stool */}
        {config.showPerson && (() => {
          const seatY = kitchenFloor - config.stoolHeight * scale;
          const personX = 260;
          
          return (
            <g opacity="0.8">
              <rect x={personX - 12} y={seatY} width="24" height="4" fill="#4a6a8a" rx="2"/>
              <rect x={personX - 2} y={seatY + 4} width="4" height={config.stoolHeight * scale - 4} fill="#4a6a8a"/>
              <rect x={personX - 10} y={kitchenFloor - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
              <ellipse cx={personX} cy={seatY - 50} rx="12" ry="14" fill="#6a8aaa" stroke="#8ab0d0" strokeWidth="1"/>
              <rect x={personX - 14} y={seatY - 36} width="28" height="38" fill="#6a8aaa" rx="4"/>
              <rect x={personX + 14} y={seatY - 30} width="30" height="8" fill="#6a8aaa" rx="4"/>
              <rect x={personX - 10} y={seatY} width="20" height="8" fill="#6a8aaa" rx="2"/>
            </g>
          );
        })()}

        {/* Dimensions */}
        {/* Step height */}
        <line x1="170" y1="260" x2="170" y2={kitchenFloor} stroke="#ff9f4a" strokeWidth="1"/>
        <line x1="165" y1="260" x2="175" y2="260" stroke="#ff9f4a" strokeWidth="1"/>
        <line x1="165" y1={kitchenFloor} x2="175" y2={kitchenFloor} stroke="#ff9f4a" strokeWidth="1"/>
        <text x="160" y={(260 + kitchenFloor) / 2 + 4} textAnchor="end" fill="#ff9f4a" fontSize="10" fontFamily="monospace">
          {config.stepHeight}"
        </text>

        {/* Bar height from kitchen */}
        <line x1="320" y1={kitchenFloor} x2="320" y2={barTopY + 4} stroke="#4aff80" strokeWidth="1"/>
        <line x1="315" y1={kitchenFloor} x2="325" y2={kitchenFloor} stroke="#4aff80" strokeWidth="1"/>
        <line x1="315" y1={barTopY + 4} x2="325" y2={barTopY + 4} stroke="#4aff80" strokeWidth="1"/>
        <text x="330" y={(kitchenFloor + barTopY) / 2} fill="#4aff80" fontSize="10" fontFamily="monospace">
          {config.barTopHeight}"
        </text>

        {/* Cabinet setback / Living room overhang */}
        {config.cabinetSetback > 0 && (
          <>
            <line x1={barLeft} y1={barTopY - 12} x2={cabinetLeft} y2={barTopY - 12} stroke="#ff4a9e" strokeWidth="1"/>
            <line x1={barLeft} y1={barTopY - 17} x2={barLeft} y2={barTopY - 7} stroke="#ff4a9e" strokeWidth="1"/>
            <line x1={cabinetLeft} y1={barTopY - 17} x2={cabinetLeft} y2={barTopY - 7} stroke="#ff4a9e" strokeWidth="1"/>
            <text x={(barLeft + cabinetLeft) / 2} y={barTopY - 20} textAnchor="middle" fill="#ff4a9e" fontSize="9" fontFamily="monospace">
              {config.cabinetSetback}"
            </text>
          </>
        )}

        {/* Total depth */}
        <line x1={barLeft} y1={barTopY - 35} x2={barRight} y2={barTopY - 35} stroke="#9b4aff" strokeWidth="1"/>
        <line x1={barLeft} y1={barTopY - 40} x2={barLeft} y2={barTopY - 30} stroke="#9b4aff" strokeWidth="1"/>
        <line x1={barRight} y1={barTopY - 40} x2={barRight} y2={barTopY - 30} stroke="#9b4aff" strokeWidth="1"/>
        <text x={(barLeft + barRight) / 2} y={barTopY - 42} textAnchor="middle" fill="#9b4aff" fontSize="10" fontFamily="monospace">
          {config.barDepth}" total
        </text>

        <text x="30" y="25" fill="#4a9eff" fontSize="12" fontWeight="500">SIDE SECTION</text>
        <text x="30" y="40" fill="#6a8aaa" fontSize="10">Looking along the bar length</text>
      </svg>
    );
  };

  const LivingRoomElevation = () => {
    const cabinetHeightPx = cabinetHeight * 2.2;
    const cabinetTop = 230 - cabinetHeightPx;
    const barLengthPx = Math.min(config.barLength * 2.2, 400);
    const startX = (500 - barLengthPx) / 2;
    const numSections = Math.floor(config.barLength / 21);
    const sectionWidth = barLengthPx / numSections;

    return (
      <svg viewBox="0 0 500 280" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="shelfLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffdd88" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#ffdd88" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="500" height="280" fill="url(#grid2)"/>

        <rect x="20" y="235" width="460" height="35" fill="#1a3352"/>

        {/* Shadow from overhang */}
        {config.cabinetSetback > 0 && (
          <rect x={startX - 4} y={cabinetTop - 4} width={barLengthPx + 8} height={config.cabinetSetback * 3} 
            fill="#0a1420" opacity="0.4"/>
        )}

        {/* Toe kick */}
        <rect x={startX} y="227" width={barLengthPx} height="8" fill="#0d1e33"/>

        {/* Main cabinet body */}
        <rect x={startX} y={cabinetTop + (config.cabinetSetback > 0 ? config.cabinetSetback * 2 : 0)} 
          width={barLengthPx} height={cabinetHeightPx - (config.cabinetSetback > 0 ? config.cabinetSetback * 2 : 0)} 
          fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1.5"/>

        {/* Pass-through opening */}
        {config.passThrough && (
          <rect x={startX + barLengthPx / 2 - config.passThroughWidth * 1.5} 
            y={cabinetTop + (config.cabinetSetback > 0 ? config.cabinetSetback * 2 : 0) + 10}
            width={config.passThroughWidth * 3} 
            height={cabinetHeightPx * 0.5}
            fill="#0d1e33" stroke="#4a9eff" strokeWidth="1"/>
        )}

        {/* Cabinet sections */}
        {Array.from({ length: numSections }).map((_, i) => {
          const sectionX = startX + i * sectionWidth;
          const sectionTop = cabinetTop + (config.cabinetSetback > 0 ? config.cabinetSetback * 2 : 0);
          const sectionHeight = cabinetHeightPx - (config.cabinetSetback > 0 ? config.cabinetSetback * 2 : 0);
          const isPassThroughZone = config.passThrough && 
            sectionX + sectionWidth > startX + barLengthPx / 2 - config.passThroughWidth * 1.5 &&
            sectionX < startX + barLengthPx / 2 + config.passThroughWidth * 1.5;
          
          if (isPassThroughZone) return null;

          const isOdd = i % 2 === 0;
          const isWineSection = config.wineStorage && i === 0;

          if (isWineSection) {
            return (
              <g key={i}>
                <rect x={sectionX + 4} y={sectionTop + 8} width={sectionWidth - 8} height={sectionHeight - 16} 
                  fill="#1a2a40" stroke="#4a9eff" strokeWidth="0.5"/>
                {Array.from({ length: 4 }).map((_, row) => (
                  Array.from({ length: 3 }).map((_, col) => (
                    <ellipse key={`${row}-${col}`} 
                      cx={sectionX + 15 + col * 14} 
                      cy={sectionTop + 25 + row * 20} 
                      rx="5" ry="8" 
                      fill="none" stroke="#6a4a8a" strokeWidth="1"/>
                  ))
                ))}
              </g>
            );
          }

          if (config.cabinetStyle === 'doors') {
            return (
              <g key={i}>
                <rect x={sectionX + 4} y={sectionTop + 8} width={sectionWidth - 8} height={sectionHeight - 16} 
                  fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                <circle cx={sectionX + sectionWidth - 14} cy={sectionTop + sectionHeight/2} r="3" fill="#4a9eff"/>
              </g>
            );
          } else if (config.cabinetStyle === 'open') {
            return (
              <g key={i}>
                <rect x={sectionX + 4} y={sectionTop + 8} width={sectionWidth - 8} height={sectionHeight - 16} 
                  fill="#1a3352" stroke="#4a9eff" strokeWidth="0.5"/>
                {config.showLighting && (
                  <rect x={sectionX + 6} y={sectionTop + 10} width={sectionWidth - 12} height="15" fill="url(#shelfLight)"/>
                )}
                <line x1={sectionX + 8} y1={sectionTop + sectionHeight * 0.35} 
                  x2={sectionX + sectionWidth - 8} y2={sectionTop + sectionHeight * 0.35} 
                  stroke="#4a9eff" strokeWidth="0.5"/>
                <line x1={sectionX + 8} y1={sectionTop + sectionHeight * 0.65} 
                  x2={sectionX + sectionWidth - 8} y2={sectionTop + sectionHeight * 0.65} 
                  stroke="#4a9eff" strokeWidth="0.5"/>
                <rect x={sectionX + 12} y={sectionTop + sectionHeight * 0.4} width="8" height={sectionHeight * 0.22} fill="#4a6a8a" opacity="0.6"/>
                <rect x={sectionX + 22} y={sectionTop + sectionHeight * 0.38} width="6" height={sectionHeight * 0.24} fill="#5a7a9a" opacity="0.6"/>
              </g>
            );
          } else {
            return (
              <g key={i}>
                {isOdd ? (
                  <>
                    <rect x={sectionX + 4} y={sectionTop + 8} width={sectionWidth - 8} height={sectionHeight * 0.4} 
                      fill="#1a3352" stroke="#4a9eff" strokeWidth="0.5"/>
                    {config.showLighting && (
                      <rect x={sectionX + 6} y={sectionTop + 10} width={sectionWidth - 12} height="12" fill="url(#shelfLight)"/>
                    )}
                    <rect x={sectionX + 4} y={sectionTop + sectionHeight * 0.52} width={sectionWidth - 8} height={sectionHeight * 0.4} 
                      fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                    <circle cx={sectionX + sectionWidth - 14} cy={sectionTop + sectionHeight * 0.72} r="3" fill="#4a9eff"/>
                  </>
                ) : (
                  <>
                    <rect x={sectionX + 4} y={sectionTop + 8} width={sectionWidth - 8} height={sectionHeight * 0.28} 
                      fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                    <rect x={sectionX + 4} y={sectionTop + sectionHeight * 0.38} width={sectionWidth - 8} height={sectionHeight * 0.28} 
                      fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                    <rect x={sectionX + 4} y={sectionTop + sectionHeight * 0.68} width={sectionWidth - 8} height={sectionHeight * 0.24} 
                      fill="none" stroke="#4a9eff" strokeWidth="0.5" rx="2"/>
                    <rect x={sectionX + sectionWidth/2 - 10} y={sectionTop + sectionHeight * 0.18} width="20" height="3" fill="#4a9eff" rx="1"/>
                    <rect x={sectionX + sectionWidth/2 - 10} y={sectionTop + sectionHeight * 0.48} width="20" height="3" fill="#4a9eff" rx="1"/>
                    <rect x={sectionX + sectionWidth/2 - 10} y={sectionTop + sectionHeight * 0.78} width="20" height="3" fill="#4a9eff" rx="1"/>
                  </>
                )}
              </g>
            );
          }
        })}

        {/* Bar top with overhang */}
        <rect x={startX - 10} y={cabinetTop - 12} width={barLengthPx + 20} height="12" 
          fill="#8b5a2b" stroke="#a0522d" strokeWidth="1.5"/>

        {/* Waterfall edges */}
        {config.waterfallEdge && (
          <>
            <rect x={startX - 10} y={cabinetTop} width="10" height="40" fill="#8b5a2b" stroke="#a0522d" strokeWidth="1"/>
            <rect x={startX + barLengthPx} y={cabinetTop} width="10" height="40" fill="#8b5a2b" stroke="#a0522d" strokeWidth="1"/>
          </>
        )}

        {/* Dimensions */}
        <line x1={startX} y1="250" x2={startX + barLengthPx} y2="250" stroke="#ff9f4a" strokeWidth="1"/>
        <line x1={startX} y1="245" x2={startX} y2="255" stroke="#ff9f4a" strokeWidth="1"/>
        <line x1={startX + barLengthPx} y1="245" x2={startX + barLengthPx} y2="255" stroke="#ff9f4a" strokeWidth="1"/>
        <text x={startX + barLengthPx/2} y="265" textAnchor="middle" fill="#ff9f4a" fontSize="11" fontFamily="monospace">
          {config.barLength}" ({(config.barLength / 12).toFixed(1)} ft)
        </text>

        <line x1={startX - 25} y1="230" x2={startX - 25} y2={cabinetTop - 12} stroke="#4aff80" strokeWidth="1"/>
        <line x1={startX - 30} y1="230" x2={startX - 20} y2="230" stroke="#4aff80" strokeWidth="1"/>
        <line x1={startX - 30} y1={cabinetTop - 12} x2={startX - 20} y2={cabinetTop - 12} stroke="#4aff80" strokeWidth="1"/>
        <text x={startX - 35} y={(230 + cabinetTop - 12) / 2} textAnchor="end" fill="#4aff80" fontSize="10" fontFamily="monospace">
          {barFromLivingRoom}"
        </text>

        <text x="30" y="25" fill="#4a9eff" fontSize="12" fontWeight="500">LIVING ROOM ELEVATION</text>
        <text x="30" y="40" fill="#6a8aaa" fontSize="10">View from living room</text>
      </svg>
    );
  };

  const PlanView = () => {
    const barLengthPx = Math.min(config.barLength * 2.2, 400);
    const startX = (500 - barLengthPx) / 2;
    const totalDepthPx = config.barDepth * 2.5;
    const cabinetDepthPx = config.cabinetDepth * 2.5;
    const setbackPx = config.cabinetSetback * 2.5;
    const kneeSpacePx = kneeSpaceKitchen * 2.5;
    const kitchenY = 50;

    return (
      <svg viewBox="0 0 500 220" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="220" fill="url(#grid3)"/>

        <text x={startX + barLengthPx/2} y="30" textAnchor="middle" fill="#4a7090" fontSize="11">KITCHEN SIDE (seating)</text>

        {/* Bar top outline */}
        <rect x={startX} y={kitchenY} width={barLengthPx} height={totalDepthPx} 
          fill="#8b5a2b" stroke="#a0522d" strokeWidth="2" opacity="0.7"/>

        {/* Living room overhang zone */}
        {config.cabinetSetback > 0 && (
          <>
            <rect x={startX} y={kitchenY + kneeSpacePx + cabinetDepthPx} width={barLengthPx} height={setbackPx} 
              fill="none" stroke="#ff4a9e" strokeWidth="1" strokeDasharray="4,2"/>
            <text x={startX + barLengthPx/2} y={kitchenY + kneeSpacePx + cabinetDepthPx + setbackPx/2 + 4} 
              textAnchor="middle" fill="#ff4a9e" fontSize="8">LR OVERHANG ({config.cabinetSetback}")</text>
          </>
        )}

        {/* Cabinet zone */}
        <rect x={startX} y={kitchenY + kneeSpacePx} width={barLengthPx} height={cabinetDepthPx} 
          fill="#2a4a6a" stroke="#4a9eff" strokeWidth="1" strokeDasharray="4,2"/>
        <text x={startX + barLengthPx/2} y={kitchenY + kneeSpacePx + cabinetDepthPx/2 + 4} 
          textAnchor="middle" fill="#4a9eff" fontSize="9">CABINETS ({config.cabinetDepth}")</text>

        {/* Pass-through */}
        {config.passThrough && (
          <rect x={startX + barLengthPx/2 - config.passThroughWidth * 1.2} 
            y={kitchenY + kneeSpacePx} 
            width={config.passThroughWidth * 2.4} 
            height={cabinetDepthPx}
            fill="#0d1e33" stroke="#ffaa4a" strokeWidth="1"/>
        )}

        {/* Knee space zone */}
        <rect x={startX} y={kitchenY} width={barLengthPx} height={kneeSpacePx} 
          fill="none" stroke="#4aff80" strokeWidth="1" strokeDasharray="4,2"/>
        <text x={startX + barLengthPx/2} y={kitchenY + kneeSpacePx/2 + 4} 
          textAnchor="middle" fill="#4aff80" fontSize="9">KNEE SPACE ({kneeSpaceKitchen}")</text>

        {/* Stools */}
        {Array.from({ length: Math.floor(config.barLength / 24) }).map((_, i) => (
          <g key={i}>
            <circle cx={startX + 30 + i * 50} cy={kitchenY - 18} r="10" fill="#4a6a8a" stroke="#6a8aaa" strokeWidth="1"/>
            <circle cx={startX + 30 + i * 50} cy={kitchenY - 18} r="4" fill="#6a8aaa"/>
          </g>
        ))}
        <text x={startX - 10} y={kitchenY - 15} textAnchor="end" fill="#6a8aaa" fontSize="9">STOOLS</text>

        <text x={startX + barLengthPx/2} y={kitchenY + totalDepthPx + 25} textAnchor="middle" fill="#4a7090" fontSize="11">LIVING ROOM SIDE</text>

        {/* Depth dimension */}
        <line x1={startX + barLengthPx + 15} y1={kitchenY} x2={startX + barLengthPx + 15} y2={kitchenY + totalDepthPx} stroke="#9b4aff" strokeWidth="1"/>
        <line x1={startX + barLengthPx + 10} y1={kitchenY} x2={startX + barLengthPx + 20} y2={kitchenY} stroke="#9b4aff" strokeWidth="1"/>
        <line x1={startX + barLengthPx + 10} y1={kitchenY + totalDepthPx} x2={startX + barLengthPx + 20} y2={kitchenY + totalDepthPx} stroke="#9b4aff" strokeWidth="1"/>
        <text x={startX + barLengthPx + 25} y={kitchenY + totalDepthPx/2 + 4} fill="#9b4aff" fontSize="10" fontFamily="monospace">
          {config.barDepth}"
        </text>

        <text x={startX + barLengthPx/2} y="205" textAnchor="middle" fill="#6a8aaa" fontSize="10">
          Seating: ~{Math.floor(config.barLength / 24)} people (24" each)
        </text>

        <text x="30" y="20" fill="#4a9eff" fontSize="12" fontWeight="500">PLAN VIEW</text>
      </svg>
    );
  };

  const ConstructionView = () => {
    const scale = 1.8;
    const kitchenFloor = 240 - config.stepHeight * scale;
    const barTopY = 240 - config.barTopHeight * scale - config.stepHeight * scale;

    return (
      <svg viewBox="0 0 500 340" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152840" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="340" fill="url(#grid4)"/>

        {/* Living room floor */}
        <rect x="20" y="240" width="160" height="20" fill="#1a3352"/>
        
        {/* Kitchen floor */}
        <rect x="180" y={kitchenFloor} width="300" height={260 - kitchenFloor} fill="#1e4060"/>

        {/* FRAMING STRUCTURE */}
        
        {/* Bottom plate on kitchen floor */}
        <rect x="182" y={kitchenFloor - 3} width={config.cabinetDepth * scale + 4} height="3" fill="#c4a574" stroke="#8b7355" strokeWidth="0.5"/>
        <text x="182" y={kitchenFloor + 12} fill="#c4a574" fontSize="8">2×4 BOTTOM PLATE</text>

        {/* Vertical studs */}
        {[0, config.cabinetDepth * scale].map((offset, i) => (
          <rect key={i} x={184 + offset} y={barTopY + 15} width="3" height={kitchenFloor - barTopY - 18} 
            fill="#c4a574" stroke="#8b7355" strokeWidth="0.5"/>
        ))}
        
        {/* Horizontal blocking */}
        <rect x="184" y={barTopY + 15 + (kitchenFloor - barTopY - 18) * 0.5} 
          width={config.cabinetDepth * scale} height="3" fill="#c4a574" stroke="#8b7355" strokeWidth="0.5"/>
        
        {/* Top plate */}
        <rect x="182" y={barTopY + 12} width={config.cabinetDepth * scale + 6} height="3" 
          fill="#c4a574" stroke="#8b7355" strokeWidth="0.5"/>

        {/* Living room side sheathing */}
        <rect x="180" y={barTopY + 15} width="3" height={236 - barTopY - 15} 
          fill="#d4c4a4" stroke="#a49474" strokeWidth="0.5"/>
        <text x="165" y={(barTopY + 236) / 2} textAnchor="end" fill="#d4c4a4" fontSize="7" transform={`rotate(-90 165 ${(barTopY + 236) / 2})`}>
          3/4" PLYWOOD
        </text>

        {/* Cabinet box representation */}
        <rect x="184" y={barTopY + 18 + config.cabinetSetback * scale} 
          width={config.cabinetDepth * scale - 2} 
          height={232 - barTopY - 18 - config.cabinetSetback * scale} 
          fill="none" stroke="#4a9eff" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="188" y={barTopY + 35 + config.cabinetSetback * scale} fill="#4a9eff" fontSize="7">CABINET</text>
        <text x="188" y={barTopY + 43 + config.cabinetSetback * scale} fill="#4a9eff" fontSize="7">BOX</text>

        {/* Bar top support cleat */}
        <rect x={184 + config.cabinetDepth * scale - 3} y={barTopY + 8} width="3" height="8" 
          fill="#c4a574" stroke="#8b7355" strokeWidth="0.5"/>

        {/* Bar top (butcher block) */}
        <rect x={180 - config.cabinetSetback * scale} y={barTopY} 
          width={config.barDepth * scale} height={config.barTopThickness * scale + 5} 
          fill="#8b5a2b" stroke="#a0522d" strokeWidth="1.5"/>

        {/* Knee space support bracket (L-bracket representation) */}
        <path d={`M ${184 + config.cabinetDepth * scale} ${barTopY + config.barTopThickness * scale + 6} 
          L ${184 + config.cabinetDepth * scale} ${barTopY + 35} 
          L ${184 + config.cabinetDepth * scale + 20} ${barTopY + 35}`}
          fill="none" stroke="#888" strokeWidth="2"/>
        <text x={190 + config.cabinetDepth * scale} y={barTopY + 50} fill="#888" fontSize="7">STEEL</text>
        <text x={190 + config.cabinetDepth * scale} y={barTopY + 58} fill="#888" fontSize="7">BRACKET</text>

        {/* Electrical run indication */}
        <path d={`M 186 ${kitchenFloor - 10} L 186 ${barTopY + 40} L ${180 + config.barDepth * scale - 20} ${barTopY + 40}`}
          fill="none" stroke="#ffaa00" strokeWidth="1.5" strokeDasharray="5,3"/>
        <circle cx={180 + config.barDepth * scale - 20} cy={barTopY + 40} r="4" fill="none" stroke="#ffaa00" strokeWidth="1.5"/>
        <text x="195" y={barTopY + 60} fill="#ffaa00" fontSize="7">ELECTRICAL</text>
        <text x="195" y={barTopY + 68} fill="#ffaa00" fontSize="7">CONDUIT</text>

        {/* Under-cabinet lighting */}
        {config.showLighting && (
          <>
            <rect x="184" y={barTopY + 14 + config.cabinetSetback * scale} width={config.cabinetDepth * scale - 6} height="2" 
              fill="#ffdd88" opacity="0.8"/>
            <text x={186 + config.cabinetDepth * scale} y={barTopY + 18 + config.cabinetSetback * scale} fill="#ffdd88" fontSize="7">LED STRIP</text>
          </>
        )}

        {/* Dimension callouts */}
        <g fill="#6a8aaa" fontSize="8">
          <text x="350" y="50">CONSTRUCTION NOTES:</text>
          <text x="350" y="68">• 2×4 stud framing @ 16" O.C.</text>
          <text x="350" y="82">• 3/4" plywood sheathing (LR side)</text>
          <text x="350" y="96">• {config.barTopThickness}" butcher block top</text>
          <text x="350" y="110">• Steel L-brackets for overhang</text>
          <text x="350" y="124">  (every 24" for {kneeSpaceKitchen}" span)</text>
          <text x="350" y="138">• Pre-wire electrical before closing</text>
          <text x="350" y="152">• Cabinet boxes are separate units</text>
          <text x="350" y="166">• Scribe filler strips at walls</text>
          {config.waterfallEdge && <text x="350" y="180">• Miter joints for waterfall edges</text>}
        </g>

        {/* Legend */}
        <g transform="translate(350, 200)">
          <text fill="#4a9eff" fontSize="9" fontWeight="500">LEGEND</text>
          <rect x="0" y="12" width="15" height="8" fill="#c4a574"/>
          <text x="20" y="19" fill="#8ba4c4" fontSize="8">Framing lumber</text>
          <rect x="0" y="28" width="15" height="8" fill="#d4c4a4"/>
          <text x="20" y="35" fill="#8ba4c4" fontSize="8">Plywood sheathing</text>
          <rect x="0" y="44" width="15" height="8" fill="#8b5a2b"/>
          <text x="20" y="51" fill="#8ba4c4" fontSize="8">Butcher block</text>
          <line x1="0" y1="64" x2="15" y2="64" stroke="#ffaa00" strokeWidth="2" strokeDasharray="3,2"/>
          <text x="20" y="67" fill="#8ba4c4" fontSize="8">Electrical</text>
          <rect x="0" y="76" width="15" height="3" fill="#888"/>
          <text x="20" y="82" fill="#8ba4c4" fontSize="8">Steel brackets</text>
        </g>

        <text x="30" y="25" fill="#4a9eff" fontSize="12" fontWeight="500">CONSTRUCTION SECTION</text>
        <text x="30" y="40" fill="#6a8aaa" fontSize="10">Framing and support detail</text>
      </svg>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #0d1e33 100%)',
      color: '#e8f0f8',
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: '20px',
    }}>
      <style>{styles}</style>

      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24, borderBottom: '1px solid #1e3a5f', paddingBottom: 16 }}>
          <h1 style={{ fontSize: 26, fontWeight: 300, margin: 0, color: '#fff', letterSpacing: '-0.5px' }}>
            Split-Level Kitchen Bar Planner
            <span style={{ fontSize: 12, color: '#4a9eff', marginLeft: 12, fontWeight: 400 }}>v2.0</span>
          </h1>
          <p style={{ color: '#6b8ab8', marginTop: 6, fontSize: 13 }}>
            Interactive design tool with construction details
          </p>
        </div>

        {/* View Tabs */}
        <div className="view-tabs">
          {[
            { id: 'all', label: 'All Views' },
            { id: 'section', label: 'Side Section' },
            { id: 'elevation', label: 'Living Room' },
            { id: 'plan', label: 'Plan View' },
            { id: 'construction', label: 'Construction' },
          ].map(tab => (
            <button key={tab.id} className={`view-tab ${activeView === tab.id ? 'active' : ''}`}
              onClick={() => setActiveView(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
          {/* Controls */}
          <div>
            <div className="view-container">
              <div className="view-title">Core Dimensions</div>
              
              {[
                { key: 'stepHeight', label: 'Step Height', min: 18, max: 30, step: 0.5, note: 'Kitchen above living room' },
                { key: 'barTopHeight', label: 'Bar Height (kitchen)', min: 36, max: 46, step: 1, note: 'Bar: 42" / Counter: 36"' },
                { key: 'barDepth', label: 'Total Depth', min: 24, max: 36, step: 1 },
                { key: 'cabinetDepth', label: 'Cabinet Depth', min: 8, max: 24, step: 1, note: 'Standard base: 24"' },
                { key: 'cabinetSetback', label: 'Cabinet Setback', min: 0, max: 8, step: 0.5, note: 'Tuck under bar top' },
                { key: 'barLength', label: 'Bar Length', min: 60, max: 120, step: 6 },
                { key: 'stoolHeight', label: 'Stool Height', min: 24, max: 34, step: 1, note: 'Bar: 28-30" / Counter: 24-26"' },
                { key: 'barTopThickness', label: 'Top Thickness', min: 1, max: 2.5, step: 0.25, note: 'Butcher block thickness' },
              ].map(({ key, label, min, max, step, note }) => (
                <div className="control-group" key={key}>
                  <label className="control-label">
                    <span>{label}</span>
                    <span className="value-display">{config[key]}"</span>
                  </label>
                  <input type="range" min={min} max={max} step={step}
                    value={config[key]} onChange={e => update(key, parseFloat(e.target.value))} />
                  {note && <div className="note">{note}</div>}
                </div>
              ))}
            </div>

            <div className="view-container">
              <div className="view-title">Design Options</div>
              
              <div style={{ marginBottom: 12 }}>
                <div className="control-label">Cabinet Style</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['doors', 'open', 'mixed'].map(style => (
                    <button key={style} className={`toggle-btn ${config.cabinetStyle === style ? 'active' : ''}`}
                      onClick={() => update('cabinetStyle', style)}>
                      {style === 'doors' ? 'Doors' : style === 'open' ? 'Open' : 'Mixed'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="checkbox-row" onClick={() => update('waterfallEdge', !config.waterfallEdge)}>
                <input type="checkbox" checked={config.waterfallEdge} readOnly />
                <label>Waterfall edge (sides)</label>
              </div>
              <div className="checkbox-row" onClick={() => update('showLighting', !config.showLighting)}>
                <input type="checkbox" checked={config.showLighting} readOnly />
                <label>Under-cabinet lighting</label>
              </div>
              <div className="checkbox-row" onClick={() => update('wineStorage', !config.wineStorage)}>
                <input type="checkbox" checked={config.wineStorage} readOnly />
                <label>Wine bottle storage</label>
              </div>
              <div className="checkbox-row" onClick={() => update('passThrough', !config.passThrough)}>
                <input type="checkbox" checked={config.passThrough} readOnly />
                <label>Pass-through opening</label>
              </div>
              {config.passThrough && (
                <div className="control-group" style={{ marginLeft: 24, marginTop: 8 }}>
                  <label className="control-label">
                    <span>Opening Width</span>
                    <span className="value-display">{config.passThroughWidth}"</span>
                  </label>
                  <input type="range" min={18} max={36} step={2}
                    value={config.passThroughWidth} onChange={e => update('passThroughWidth', parseFloat(e.target.value))} />
                </div>
              )}
              <div className="checkbox-row" onClick={() => update('showPerson', !config.showPerson)}>
                <input type="checkbox" checked={config.showPerson} readOnly />
                <label>Show seated person</label>
              </div>
            </div>

            <div className="view-container">
              <div className="view-title">Calculated Values</div>
              {[
                { label: 'Bar from living room floor', value: `${barFromLivingRoom}"` },
                { label: 'Kitchen knee clearance', value: `${kneeSpaceKitchen}"` },
                { label: 'Living room overhang', value: `${overhangLivingRoom}"` },
                { label: 'Cabinet height', value: `${cabinetHeight.toFixed(1)}"` },
                { label: 'Seat to bar top', value: `${config.barTopHeight - config.stoolHeight}"` },
                { label: 'Seating capacity', value: `~${Math.floor(config.barLength / 24)}` },
              ].map(({ label, value }) => (
                <div className="calc-item" key={label}>
                  <span className="calc-label">{label}</span>
                  <span className="calc-value">{value}</span>
                </div>
              ))}

              <div className={`status-box ${kneeSpaceKitchen >= 12 ? 'status-good' : 'status-warn'}`}>
                {kneeSpaceKitchen >= 12 ? '✓' : '⚠'} Knee space: {kneeSpaceKitchen >= 12 ? 'comfortable' : 'tight'} (12"+ ideal)
              </div>
              <div className={`status-box ${(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? 'status-good' : 'status-warn'}`}>
                {(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? '✓' : '⚠'} Seat-to-bar: {(config.barTopHeight - config.stoolHeight) >= 10 && (config.barTopHeight - config.stoolHeight) <= 14 ? 'ideal' : 'check'} (10-14")
              </div>
            </div>
          </div>

          {/* Diagrams */}
          <div>
            {(activeView === 'all' || activeView === 'section') && (
              <div className="view-container">
                <SideSection />
              </div>
            )}
            {(activeView === 'all' || activeView === 'elevation') && (
              <div className="view-container">
                <LivingRoomElevation />
              </div>
            )}
            {(activeView === 'all' || activeView === 'plan') && (
              <div className="view-container">
                <PlanView />
              </div>
            )}
            {(activeView === 'all' || activeView === 'construction') && (
              <div className="view-container">
                <ConstructionView />
              </div>
            )}
          </div>
        </div>

        {/* Design Notes */}
        <div className="view-container" style={{ marginTop: 16 }}>
          <div className="view-title">Design Notes & Material Considerations</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, fontSize: 12, color: '#8ba4c4', lineHeight: 1.6 }}>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 12, marginBottom: 6 }}>Butcher Block ({config.barLength}" span)</h4>
              <p>Use {config.barTopThickness >= 1.5 ? '✓' : '⚠'} minimum 1.5" thickness. Support brackets every 24-36". 
              Allow 1/8" gap at walls for expansion. Seal with food-safe oil or polyurethane.</p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 12, marginBottom: 6 }}>Cabinet Setback Benefit</h4>
              <p>Your {config.cabinetSetback}" setback creates a {overhangLivingRoom}" overhang on the living room side—
              perfect for leaning, resting drinks, or quick conversations without sitting.</p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 12, marginBottom: 6 }}>Electrical Planning</h4>
              <p>Run 12/2 Romex through framing before closing walls. Consider: 2-3 duplex outlets along bar top, 
              USB ports, and low-voltage for LED strips. Pop-up outlets keep surface clean.</p>
            </div>
            <div>
              <h4 style={{ color: '#4a9eff', fontSize: 12, marginBottom: 6 }}>Cabinet Construction</h4>
              <p>Build or buy cabinet boxes separately from framing. This allows for easier installation and future 
              modifications. Use adjustable shelves and soft-close hardware.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
