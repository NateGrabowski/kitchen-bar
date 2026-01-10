import React, { useState } from 'react';

export default function CabinetFaceFinal() {
  const [showDimensions, setShowDimensions] = useState(true);
  const [showLED, setShowLED] = useState(true);
  const [showXFrameEnds, setShowXFrameEnds] = useState(true);
  const [barnDoorPosition, setBarnDoorPosition] = useState('closed'); // 'closed' or 'open'
  const [cabinetColor, setCabinetColor] = useState('navy');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LOCKED SPECIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  const specs = {
    // Overall dimensions
    barLength: 92,           // Total width (90" cabinet + 2" filler)
    cabinetHeight: 34.5,     // Standard base cabinet height
    toeKickHeight: 4,        // Standard toe kick
    cabinetDepth: 14,        // Doors face living room
    butcherBlockThickness: 1.5,
    
    // Section widths (must sum to 92")
    drawerWidth: 30,         // Triple drawer bank
    barnOpeningWidth: 30,    // Barn door opening
    doubleDoorWidth: 32,     // Split shaker doors
    
    // Barn door specs
    barnDoorWidth: 30,       // Door itself is 30" to cover opening
    barnDoorSlide: 'left',   // Slides toward drawer side
  };
  
  // Verify total
  const totalWidth = specs.drawerWidth + specs.barnOpeningWidth + specs.doubleDoorWidth;
  console.assert(totalWidth === specs.barLength, `Width mismatch: ${totalWidth} !== ${specs.barLength}`);
  
  const colorSchemes = {
    white: { 
      cabinet: '#f5f5f0', 
      accent: '#2d3a28', 
      drawer: '#e8e8e3', 
      open: '#1a1a2e', 
      wood: '#c4a77d',
      xFrame: '#c4a77d'
    },
    navy: { 
      cabinet: '#3d4f5f', 
      accent: '#1a252e', 
      drawer: '#344555', 
      open: '#0f1a24', 
      wood: '#b8996f',
      xFrame: '#b8996f'
    },
    charcoal: { 
      cabinet: '#3a3a3a', 
      accent: '#1a1a1a', 
      drawer: '#4a4a4a', 
      open: '#0a0a0a', 
      wood: '#c4a77d',
      xFrame: '#c4a77d'
    },
    sage: { 
      cabinet: '#8b9a7d', 
      accent: '#2d3a28', 
      drawer: '#7a8970', 
      open: '#1a2a1e', 
      wood: '#a89070',
      xFrame: '#5b4a3a'
    },
    natural: { 
      cabinet: '#c4a77d', 
      accent: '#5b4434', 
      drawer: '#b8996f', 
      open: '#2a2015', 
      wood: '#a07d50',
      xFrame: '#5b4434'
    },
  };
  
  const colors = colorSchemes[cabinetColor];
  const scale = 4.5;
  
  // Calculate positions
  const startX = 50;
  const cabinetTop = 40;
  const mainHeight = specs.cabinetHeight * scale;
  
  const drawerSectionX = startX;
  const barnSectionX = startX + specs.drawerWidth * scale;
  const doorSectionX = barnSectionX + specs.barnOpeningWidth * scale;
  
  // Barn door position (slides left over drawers when open)
  const barnDoorClosedX = barnSectionX + 4;
  const barnDoorOpenX = drawerSectionX + 4; // Slides over drawer section
  const barnDoorX = barnDoorPosition === 'open' ? barnDoorOpenX : barnDoorClosedX;
  
  // Shaker inset styling
  const renderShakerInset = (x, y, w, h) => {
    const inset = Math.min(10, w * 0.08);
    return (
      <rect 
        x={x + inset} 
        y={y + inset} 
        width={w - inset * 2} 
        height={h - inset * 2} 
        fill="none" 
        stroke={colors.accent} 
        strokeWidth="1.5"
        rx="2"
      />
    );
  };
  
  // X-panel styling for barn door
  const renderXPanel = (x, y, w, h) => {
    return (
      <g>
        <line 
          x1={x + 8} 
          y1={y + 8} 
          x2={x + w - 8} 
          y2={y + h - 8} 
          stroke={colors.xFrame} 
          strokeWidth="3"
        />
        <line 
          x1={x + w - 8} 
          y1={y + 8} 
          x2={x + 8} 
          y2={y + h - 8} 
          stroke={colors.xFrame} 
          strokeWidth="3"
        />
      </g>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">FINAL DESIGN</span>
            <h1 className="text-2xl font-semibold text-blue-400">Cabinet Face Layout</h1>
          </div>
          <p className="text-slate-400 text-sm">Drawers + Barn Door + Double Door — Locked specifications</p>
        </div>
        
        {/* Specs Summary */}
        <div className="bg-slate-800 rounded-lg p-4 mb-4">
          <h3 className="text-green-400 font-medium text-sm mb-3 uppercase tracking-wide">Locked Specifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-slate-500 text-xs">Total Width</div>
              <div className="text-white font-mono text-lg">{specs.barLength}"</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Cabinet Height</div>
              <div className="text-white font-mono text-lg">{specs.cabinetHeight}"</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Cabinet Depth</div>
              <div className="text-white font-mono text-lg">{specs.cabinetDepth}"</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Toe Kick</div>
              <div className="text-white font-mono text-lg">{specs.toeKickHeight}"</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-slate-500 text-xs mb-2">Section Breakdown</div>
            <div className="flex gap-2 text-sm">
              <span className="px-3 py-1 bg-blue-900/50 rounded font-mono">Drawers: {specs.drawerWidth}"</span>
              <span className="px-3 py-1 bg-amber-900/50 rounded font-mono">Barn Opening: {specs.barnOpeningWidth}"</span>
              <span className="px-3 py-1 bg-green-900/50 rounded font-mono">Double Door: {specs.doubleDoorWidth}"</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Color:</span>
            {Object.keys(colorSchemes).map(color => (
              <button
                key={color}
                onClick={() => setCabinetColor(color)}
                className={`px-2 py-1 rounded text-xs capitalize ${
                  cabinetColor === color 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setBarnDoorPosition(p => p === 'closed' ? 'open' : 'closed')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                barnDoorPosition === 'open'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Barn Door: {barnDoorPosition === 'open' ? 'Open ←' : 'Closed'}
            </button>
            
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showXFrameEnds} 
                onChange={e => setShowXFrameEnds(e.target.checked)}
                className="rounded accent-amber-600"
              />
              X-Frame Ends
            </label>
            
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showLED} 
                onChange={e => setShowLED(e.target.checked)}
                className="rounded accent-amber-500"
              />
              LED
            </label>
            
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showDimensions} 
                onChange={e => setShowDimensions(e.target.checked)}
                className="rounded"
              />
              Dimensions
            </label>
          </div>
        </div>
        
        {/* Main Visualization */}
        <div className="bg-slate-800 rounded-xl p-6 mb-4">
          <div className="flex justify-center overflow-x-auto">
            <svg 
              viewBox={`0 0 ${specs.barLength * scale + 120} ${specs.cabinetHeight * scale + 120}`} 
              className="w-full max-w-5xl"
              style={{ background: '#0f172a', borderRadius: 8 }}
            >
              <defs>
                {/* Chevron wood pattern */}
                <pattern id="chevronPattern" patternUnits="userSpaceOnUse" width="40" height="20">
                  <rect width="40" height="20" fill="#92400e"/>
                  <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="#a16207" opacity="0.4"/>
                  <path d="M20,10 L30,0 L40,10 L30,20 Z" fill="#78350f" opacity="0.3"/>
                </pattern>
              </defs>
              
              {/* ═══════════════════════════════════════════════════════════════════
                  BUTCHER BLOCK TOP
                  ═══════════════════════════════════════════════════════════════════ */}
              <rect 
                x={startX - 8} 
                y="10" 
                width={specs.barLength * scale + 16} 
                height="24" 
                fill="url(#chevronPattern)"
                stroke="#b45309"
                strokeWidth="2"
                rx="2"
              />
              <text 
                x={startX + specs.barLength * scale / 2} 
                y="26" 
                fill="#fcd34d" 
                fontSize="9" 
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                1.5&quot; CHEVRON BUTCHER BLOCK
              </text>
              
              {/* ═══════════════════════════════════════════════════════════════════
                  X-FRAME END PANELS
                  ═══════════════════════════════════════════════════════════════════ */}
              {showXFrameEnds && (
                <>
                  {/* Left X-frame */}
                  <g>
                    <rect 
                      x={startX - 14} 
                      y={cabinetTop} 
                      width="14" 
                      height={mainHeight} 
                      fill={colors.xFrame} 
                      stroke={colors.accent} 
                      strokeWidth="1"
                      rx="2"
                    />
                    <line 
                      x1={startX - 12} y1={cabinetTop + 6} 
                      x2={startX - 2} y2={cabinetTop + mainHeight - 6} 
                      stroke={colors.accent} strokeWidth="2"
                    />
                    <line 
                      x1={startX - 2} y1={cabinetTop + 6} 
                      x2={startX - 12} y2={cabinetTop + mainHeight - 6} 
                      stroke={colors.accent} strokeWidth="2"
                    />
                  </g>
                  
                  {/* Right X-frame */}
                  <g>
                    <rect 
                      x={startX + specs.barLength * scale} 
                      y={cabinetTop} 
                      width="14" 
                      height={mainHeight} 
                      fill={colors.xFrame} 
                      stroke={colors.accent} 
                      strokeWidth="1"
                      rx="2"
                    />
                    <line 
                      x1={startX + specs.barLength * scale + 2} y1={cabinetTop + 6} 
                      x2={startX + specs.barLength * scale + 12} y2={cabinetTop + mainHeight - 6} 
                      stroke={colors.accent} strokeWidth="2"
                    />
                    <line 
                      x1={startX + specs.barLength * scale + 12} y1={cabinetTop + 6} 
                      x2={startX + specs.barLength * scale + 2} y2={cabinetTop + mainHeight - 6} 
                      stroke={colors.accent} strokeWidth="2"
                    />
                  </g>
                </>
              )}
              
              {/* ═══════════════════════════════════════════════════════════════════
                  SECTION 1: TRIPLE DRAWER BANK (30")
                  ═══════════════════════════════════════════════════════════════════ */}
              {(() => {
                const w = specs.drawerWidth * scale;
                const drawerH = (mainHeight - 8) / 3;
                
                return (
                  <g>
                    {[0, 1, 2].map(i => (
                      <g key={i}>
                        <rect 
                          x={drawerSectionX} 
                          y={cabinetTop + i * (drawerH + 4)} 
                          width={w} 
                          height={drawerH} 
                          fill={colors.drawer} 
                          stroke={colors.accent} 
                          strokeWidth="1.5" 
                          rx="3"
                        />
                        {renderShakerInset(drawerSectionX, cabinetTop + i * (drawerH + 4), w, drawerH)}
                        {/* Bar pull */}
                        <rect 
                          x={drawerSectionX + w/2 - 28} 
                          y={cabinetTop + i * (drawerH + 4) + drawerH/2 - 3} 
                          width="56" 
                          height="6" 
                          fill={colors.accent} 
                          rx="2"
                        />
                      </g>
                    ))}
                    
                    {/* Section label */}
                    {showDimensions && (
                      <text 
                        x={drawerSectionX + w/2} 
                        y={cabinetTop - 10} 
                        fill="#60a5fa" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                      >
                        {specs.drawerWidth}&quot; DRAWERS
                      </text>
                    )}
                  </g>
                );
              })()}
              
              {/* ═══════════════════════════════════════════════════════════════════
                  SECTION 2: BARN DOOR OPENING (30") + SLIDING DOOR
                  ═══════════════════════════════════════════════════════════════════ */}
              {(() => {
                const w = specs.barnOpeningWidth * scale;
                const doorW = specs.barnDoorWidth * scale;
                
                return (
                  <g>
                    {/* Opening/cabinet back */}
                    <rect 
                      x={barnSectionX} 
                      y={cabinetTop} 
                      width={w} 
                      height={mainHeight} 
                      fill={colors.open} 
                      stroke={colors.accent} 
                      strokeWidth="1.5" 
                      rx="3"
                    />
                    
                    {/* Internal shelves */}
                    <line 
                      x1={barnSectionX + 6} y1={cabinetTop + mainHeight * 0.33} 
                      x2={barnSectionX + w - 6} y2={cabinetTop + mainHeight * 0.33} 
                      stroke={colors.wood} strokeWidth="5"
                    />
                    <line 
                      x1={barnSectionX + 6} y1={cabinetTop + mainHeight * 0.66} 
                      x2={barnSectionX + w - 6} y2={cabinetTop + mainHeight * 0.66} 
                      stroke={colors.wood} strokeWidth="5"
                    />
                    
                    {/* LED strips */}
                    {showLED && (
                      <>
                        <rect x={barnSectionX + 8} y={cabinetTop + 6} width={w - 16} height="3" fill="#fbbf24" opacity="0.5" rx="1"/>
                        <rect x={barnSectionX + 8} y={cabinetTop + mainHeight * 0.33 + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.3" rx="1"/>
                        <rect x={barnSectionX + 8} y={cabinetTop + mainHeight * 0.66 + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.3" rx="1"/>
                      </>
                    )}
                    
                    {/* Display items (visible when door open) */}
                    {barnDoorPosition === 'open' && (
                      <>
                        <rect x={barnSectionX + 12} y={cabinetTop + mainHeight * 0.08} width={24} height={mainHeight * 0.2} fill={colors.wood} rx="2" opacity="0.3"/>
                        <rect x={barnSectionX + w - 40} y={cabinetTop + mainHeight * 0.1} width={28} height={mainHeight * 0.18} fill={colors.wood} rx="2" opacity="0.25"/>
                        <rect x={barnSectionX + 15} y={cabinetTop + mainHeight * 0.38} width={20} height={mainHeight * 0.22} fill={colors.wood} rx="2" opacity="0.25"/>
                        <circle cx={barnSectionX + w - 25} cy={cabinetTop + mainHeight * 0.48} r={14} fill={colors.wood} opacity="0.2"/>
                        <rect x={barnSectionX + 18} y={cabinetTop + mainHeight * 0.72} width={30} height={mainHeight * 0.2} fill={colors.wood} rx="2" opacity="0.25"/>
                        <rect x={barnSectionX + w - 45} y={cabinetTop + mainHeight * 0.74} width={32} height={mainHeight * 0.18} fill={colors.wood} rx="2" opacity="0.2"/>
                      </>
                    )}
                    
                    {/* Track (extends over drawer section for sliding) */}
                    <rect 
                      x={drawerSectionX - 4} 
                      y={cabinetTop - 12} 
                      width={specs.drawerWidth * scale + w + 8} 
                      height="10" 
                      fill={colors.accent} 
                      rx="2"
                    />
                    
                    {/* THE BARN DOOR (slides left) */}
                    <g style={{ transition: 'transform 0.3s ease' }}>
                      <rect 
                        x={barnDoorX} 
                        y={cabinetTop - 2} 
                        width={doorW - 8} 
                        height={mainHeight + 4} 
                        fill={colors.cabinet} 
                        stroke={colors.accent} 
                        strokeWidth="2" 
                        rx="3"
                      />
                      {/* X pattern on barn door */}
                      {renderXPanel(barnDoorX, cabinetTop - 2, doorW - 8, mainHeight + 4)}
                      {/* Door handle */}
                      <rect 
                        x={barnDoorX + doorW - 18} 
                        y={cabinetTop + mainHeight/2 - 20} 
                        width="6" 
                        height="40" 
                        fill={colors.accent} 
                        rx="2"
                      />
                    </g>
                    
                    {/* Section label */}
                    {showDimensions && (
                      <text 
                        x={barnSectionX + w/2} 
                        y={cabinetTop - 24} 
                        fill="#fbbf24" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                      >
                        {specs.barnOpeningWidth}&quot; BARN OPENING
                      </text>
                    )}
                    
                    {/* Slide direction indicator */}
                    {showDimensions && (
                      <g>
                        <line 
                          x1={barnSectionX + w/2 + 20} 
                          y1={cabinetTop - 18} 
                          x2={barnSectionX - 20} 
                          y2={cabinetTop - 18} 
                          stroke="#fbbf24" 
                          strokeWidth="1" 
                          strokeDasharray="3,2"
                          markerEnd="url(#arrowhead)"
                        />
                        <text 
                          x={barnSectionX + w/2 - 30} 
                          y={cabinetTop - 22} 
                          fill="#fbbf24" 
                          fontSize="7" 
                          textAnchor="middle"
                        >
                          ← slides left
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
              
              {/* ═══════════════════════════════════════════════════════════════════
                  SECTION 3: DOUBLE DOOR (32")
                  ═══════════════════════════════════════════════════════════════════ */}
              {(() => {
                const w = specs.doubleDoorWidth * scale;
                const gap = 3;
                const halfW = (w - gap) / 2;
                
                return (
                  <g>
                    {/* Left door */}
                    <rect 
                      x={doorSectionX} 
                      y={cabinetTop} 
                      width={halfW} 
                      height={mainHeight} 
                      fill={colors.cabinet} 
                      stroke={colors.accent} 
                      strokeWidth="1.5" 
                      rx="3"
                    />
                    {renderShakerInset(doorSectionX, cabinetTop, halfW, mainHeight)}
                    <rect 
                      x={doorSectionX + halfW - 16} 
                      y={cabinetTop + mainHeight/2 - 14} 
                      width="5" 
                      height="28" 
                      fill={colors.accent} 
                      rx="2"
                    />
                    
                    {/* Right door */}
                    <rect 
                      x={doorSectionX + halfW + gap} 
                      y={cabinetTop} 
                      width={halfW} 
                      height={mainHeight} 
                      fill={colors.cabinet} 
                      stroke={colors.accent} 
                      strokeWidth="1.5" 
                      rx="3"
                    />
                    {renderShakerInset(doorSectionX + halfW + gap, cabinetTop, halfW, mainHeight)}
                    <rect 
                      x={doorSectionX + halfW + gap + 11} 
                      y={cabinetTop + mainHeight/2 - 14} 
                      width="5" 
                      height="28" 
                      fill={colors.accent} 
                      rx="2"
                    />
                    
                    {/* Section label */}
                    {showDimensions && (
                      <text 
                        x={doorSectionX + w/2} 
                        y={cabinetTop - 10} 
                        fill="#4ade80" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                      >
                        {specs.doubleDoorWidth}&quot; DOUBLE DOOR
                      </text>
                    )}
                  </g>
                );
              })()}
              
              {/* ═══════════════════════════════════════════════════════════════════
                  TOE KICK
                  ═══════════════════════════════════════════════════════════════════ */}
              <rect 
                x={startX + 4} 
                y={cabinetTop + mainHeight + 3} 
                width={specs.barLength * scale - 8} 
                height="14" 
                fill={colors.accent}
                rx="2"
              />
              <rect 
                x={startX + 10} 
                y={cabinetTop + mainHeight + 6} 
                width={specs.barLength * scale - 20} 
                height="8" 
                fill="#0a0f18"
                rx="2"
              />
              
              {/* ═══════════════════════════════════════════════════════════════════
                  DIMENSION LINES
                  ═══════════════════════════════════════════════════════════════════ */}
              {showDimensions && (
                <g>
                  {/* Total width */}
                  <line 
                    x1={startX} y1={cabinetTop + mainHeight + 35} 
                    x2={startX + specs.barLength * scale} y2={cabinetTop + mainHeight + 35} 
                    stroke="#fbbf24" strokeWidth="1"
                  />
                  <line x1={startX} y1={cabinetTop + mainHeight + 30} x2={startX} y2={cabinetTop + mainHeight + 40} stroke="#fbbf24" strokeWidth="1"/>
                  <line x1={startX + specs.barLength * scale} y1={cabinetTop + mainHeight + 30} x2={startX + specs.barLength * scale} y2={cabinetTop + mainHeight + 40} stroke="#fbbf24" strokeWidth="1"/>
                  <text 
                    x={startX + specs.barLength * scale / 2} 
                    y={cabinetTop + mainHeight + 52} 
                    fill="#fbbf24" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold"
                  >
                    {specs.barLength}&quot; TOTAL
                  </text>
                  
                  {/* Height */}
                  <line 
                    x1={startX + specs.barLength * scale + 25} y1={cabinetTop} 
                    x2={startX + specs.barLength * scale + 25} y2={cabinetTop + mainHeight} 
                    stroke="#4ade80" strokeWidth="1"
                  />
                  <line x1={startX + specs.barLength * scale + 20} y1={cabinetTop} x2={startX + specs.barLength * scale + 30} y2={cabinetTop} stroke="#4ade80" strokeWidth="1"/>
                  <line x1={startX + specs.barLength * scale + 20} y1={cabinetTop + mainHeight} x2={startX + specs.barLength * scale + 30} y2={cabinetTop + mainHeight} stroke="#4ade80" strokeWidth="1"/>
                  <text 
                    x={startX + specs.barLength * scale + 35} 
                    y={cabinetTop + mainHeight/2 + 4} 
                    fill="#4ade80" fontSize="11" fontFamily="monospace"
                  >
                    {specs.cabinetHeight}&quot;
                  </text>
                  
                  {/* Section divider lines */}
                  <line x1={barnSectionX} y1={cabinetTop + mainHeight + 25} x2={barnSectionX} y2={cabinetTop + mainHeight + 40} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2"/>
                  <line x1={doorSectionX} y1={cabinetTop + mainHeight + 25} x2={doorSectionX} y2={cabinetTop + mainHeight + 40} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2"/>
                </g>
              )}
            </svg>
          </div>
          
          {/* Barn door state indicator */}
          <div className="mt-4 flex justify-center">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              barnDoorPosition === 'open' 
                ? 'bg-amber-600/20 text-amber-400 border border-amber-600/50' 
                : 'bg-slate-700 text-slate-400'
            }`}>
              {barnDoorPosition === 'open' 
                ? '← Barn door OPEN (slid left over drawers)' 
                : 'Barn door CLOSED (covering opening)'
              }
            </div>
          </div>
        </div>
        
        {/* Detailed Specs */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-green-400 font-medium text-sm mb-3 uppercase tracking-wide">Final Layout Summary</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Section 1</td>
                  <td className="py-2 text-white font-mono">Triple Drawer Bank</td>
                  <td className="py-2 text-blue-400 font-mono text-right">{specs.drawerWidth}"</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Section 2</td>
                  <td className="py-2 text-white font-mono">Barn Door Opening</td>
                  <td className="py-2 text-amber-400 font-mono text-right">{specs.barnOpeningWidth}"</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Section 3</td>
                  <td className="py-2 text-white font-mono">Double Shaker Doors</td>
                  <td className="py-2 text-green-400 font-mono text-right">{specs.doubleDoorWidth}"</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400 font-medium">Total</td>
                  <td className="py-2"></td>
                  <td className="py-2 text-white font-mono text-right font-bold">{specs.barLength}"</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium text-sm mb-3 uppercase tracking-wide">Barn Door Details</h3>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span className="text-slate-400">Door width</span>
                <span className="text-white font-mono">{specs.barnDoorWidth}"</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Opening width</span>
                <span className="text-white font-mono">{specs.barnOpeningWidth}"</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Slide direction</span>
                <span className="text-amber-400">← Left (over drawers)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Track length needed</span>
                <span className="text-white font-mono">~{specs.drawerWidth + specs.barnOpeningWidth}"</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Door style</span>
                <span className="text-white">X-panel (farmhouse)</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Construction Notes */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h3 className="text-blue-400 font-medium text-sm mb-3">Construction Notes</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-400">
            <div>
              <div className="text-white font-medium mb-1">Drawers (30")</div>
              <ul className="space-y-1">
                <li>• 3 equal drawers, shaker fronts</li>
                <li>• Full-extension soft-close slides</li>
                <li>• Bar pulls (centered)</li>
              </ul>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Barn Door (30")</div>
              <ul className="space-y-1">
                <li>• Track extends 60" (30" + 30")</li>
                <li>• X-panel pattern in wood accent</li>
                <li>• Soft-stop hardware recommended</li>
              </ul>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Double Door (32")</div>
              <ul className="space-y-1">
                <li>• Two 16" doors (minus gap)</li>
                <li>• Shaker style, inset or overlay</li>
                <li>• Handles on meeting edge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
