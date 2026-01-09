import React, { useState } from 'react';

export default function CabinetHeightComparison() {
  const [targetHeight, setTargetHeight] = useState(40);
  const [counterThickness, setCounterThickness] = useState(1.5);
  const [selectedApproach, setSelectedApproach] = useState(null);
  
  const scale = 5.5;
  
  // Calculate dimensions for each approach
  const approaches = [
    {
      id: 'ikea-platform',
      name: 'IKEA + Tall Platform',
      description: 'Your current plan: 30" SEKTION on custom base',
      cabinetHeight: 30,
      toeKickHeight: targetHeight - 30 - counterThickness,
      toeKickStyle: 'platform',
      pros: ['IKEA availability', 'Modular', 'Known system'],
      cons: ['Weird proportions', 'Looks DIY', 'Platform seems excessive'],
      verdict: 'awkward',
      cost: '$800-1200',
      difficulty: 'Medium',
    },
    {
      id: 'standard-base',
      name: 'Standard 34.5" Base Cabinet',
      description: 'J Collection or similar with normal toe kick',
      cabinetHeight: 34.5,
      toeKickHeight: targetHeight - 34.5 - counterThickness,
      toeKickStyle: 'recessed',
      pros: ['Normal proportions', 'Pre-assembled', 'Professional look'],
      cons: ['Limited 14" depth options', 'May need to shop around'],
      verdict: 'good',
      cost: '$800-1300',
      difficulty: 'Easy',
      note: targetHeight - 34.5 - counterThickness < 3 ? 
        '⚠️ Toe kick too short for this height' : 
        targetHeight - 34.5 - counterThickness > 6 ?
        '⚠️ Toe kick getting tall' : null
    },
    {
      id: 'furniture-legs',
      name: 'IKEA + Furniture Legs',
      description: '30" cabinet on decorative furniture legs',
      cabinetHeight: 30,
      toeKickHeight: targetHeight - 30 - counterThickness,
      toeKickStyle: 'legs',
      pros: ['Looks intentional', 'Sideboard aesthetic', 'Lighter feel'],
      cons: ['Less stability', 'Visible floor underneath', 'Different look'],
      verdict: 'stylish',
      cost: '$700-1100',
      difficulty: 'Medium',
    },
    {
      id: 'custom-build',
      name: 'Custom Built Cabinet',
      description: 'Build exact height you need',
      cabinetHeight: targetHeight - 4 - counterThickness,
      toeKickHeight: 4,
      toeKickStyle: 'recessed',
      pros: ['Perfect proportions', 'Full control', 'Pride of ownership'],
      cons: ['More time', 'Requires skills', 'Door sourcing'],
      verdict: 'best',
      cost: '$500-1000',
      difficulty: 'Hard',
    },
    {
      id: 'tall-base',
      name: '36" Tall Base Cabinet',
      description: 'Some manufacturers offer 36" height option',
      cabinetHeight: 36,
      toeKickHeight: targetHeight - 36 - counterThickness,
      toeKickStyle: 'recessed',
      pros: ['Better proportions than IKEA', 'Available at some stores'],
      cons: ['Less common', 'May need special order'],
      verdict: targetHeight - 36 - counterThickness >= 2.5 && targetHeight - 36 - counterThickness <= 5 ? 'good' : 'check',
      cost: '$900-1400',
      difficulty: 'Easy',
    },
  ];
  
  const getVerdictColor = (verdict) => {
    switch(verdict) {
      case 'awkward': return '#f87171';
      case 'good': return '#4ade80';
      case 'stylish': return '#a78bfa';
      case 'best': return '#fbbf24';
      case 'check': return '#fb923c';
      default: return '#94a3b8';
    }
  };
  
  const renderCabinet = (approach, x, showLabels = true) => {
    const floorY = 280;
    const cabinetHeightPx = approach.cabinetHeight * scale;
    const toeKickHeightPx = approach.toeKickHeight * scale;
    const counterHeightPx = counterThickness * scale;
    
    const counterTop = floorY - toeKickHeightPx - cabinetHeightPx - counterHeightPx;
    const cabinetTop = counterTop + counterHeightPx;
    const toeKickTop = cabinetTop + cabinetHeightPx;
    
    const width = 70;
    const isSelected = selectedApproach === approach.id;
    
    // Color based on verdict
    const verdictColor = getVerdictColor(approach.verdict);
    
    return (
      <g key={approach.id} opacity={selectedApproach && !isSelected ? 0.4 : 1}>
        {/* Selection highlight */}
        {isSelected && (
          <rect 
            x={x - 8} 
            y={counterTop - 25} 
            width={width + 16} 
            height={floorY - counterTop + 35} 
            fill={verdictColor}
            opacity="0.1"
            rx="4"
          />
        )}
        
        {/* Butcher block */}
        <rect 
          x={x} 
          y={counterTop} 
          width={width} 
          height={counterHeightPx} 
          fill="#92400e"
          stroke="#b45309"
          strokeWidth="1.5"
          rx="2"
        />
        
        {/* Cabinet body */}
        <rect 
          x={x} 
          y={cabinetTop} 
          width={width} 
          height={cabinetHeightPx} 
          fill="#e8e8e3"
          stroke="#3d4a5c"
          strokeWidth="1.5"
          rx="2"
        />
        {/* Shaker detail */}
        <rect 
          x={x + 6} 
          y={cabinetTop + 6} 
          width={width - 12} 
          height={cabinetHeightPx - 12} 
          fill="none"
          stroke="#3d4a5c"
          strokeWidth="1"
          rx="2"
        />
        {/* Handle */}
        <rect 
          x={x + width - 14} 
          y={cabinetTop + cabinetHeightPx/2 - 10} 
          width="4" 
          height="20" 
          fill="#3d4a5c"
          rx="1"
        />
        
        {/* Toe kick / base - different styles */}
        {approach.toeKickStyle === 'platform' && (
          <g>
            {/* Solid platform - looks chunky */}
            <rect 
              x={x - 4} 
              y={toeKickTop + 2} 
              width={width + 8} 
              height={toeKickHeightPx - 2} 
              fill="#374151"
              stroke="#4b5563"
              strokeWidth="1"
              rx="2"
            />
            {/* Warning indicator */}
            <text x={x + width/2} y={toeKickTop + toeKickHeightPx/2 + 4} fill="#f87171" fontSize="8" textAnchor="middle" fontWeight="bold">
              {approach.toeKickHeight.toFixed(1)}"
            </text>
          </g>
        )}
        
        {approach.toeKickStyle === 'recessed' && (
          <g>
            {/* Recessed toe kick - looks normal */}
            <rect 
              x={x + 3} 
              y={toeKickTop + 2} 
              width={width - 6} 
              height={toeKickHeightPx - 2} 
              fill="#1a1a1a"
              rx="1"
            />
            {/* Side panels */}
            <rect x={x} y={toeKickTop} width="3" height={toeKickHeightPx} fill="#e8e8e3" stroke="#3d4a5c" strokeWidth="0.5"/>
            <rect x={x + width - 3} y={toeKickTop} width="3" height={toeKickHeightPx} fill="#e8e8e3" stroke="#3d4a5c" strokeWidth="0.5"/>
          </g>
        )}
        
        {approach.toeKickStyle === 'legs' && (
          <g>
            {/* Furniture legs - looks intentional */}
            <rect x={x + 6} y={toeKickTop + 4} width="8" height={toeKickHeightPx - 4} fill="#78350f" rx="1"/>
            <rect x={x + width - 14} y={toeKickTop + 4} width="8" height={toeKickHeightPx - 4} fill="#78350f" rx="1"/>
            {/* Cross stretcher */}
            <rect x={x + 14} y={toeKickTop + toeKickHeightPx * 0.6} width={width - 28} height="4" fill="#78350f" rx="1"/>
          </g>
        )}
        
        {/* Labels */}
        {showLabels && (
          <g>
            {/* Height dimension line */}
            <line x1={x + width + 8} y1={floorY} x2={x + width + 8} y2={counterTop} stroke={verdictColor} strokeWidth="1"/>
            <line x1={x + width + 4} y1={floorY} x2={x + width + 12} y2={floorY} stroke={verdictColor} strokeWidth="1"/>
            <line x1={x + width + 4} y1={counterTop} x2={x + width + 12} y2={counterTop} stroke={verdictColor} strokeWidth="1"/>
            <text x={x + width + 16} y={(floorY + counterTop)/2 + 4} fill={verdictColor} fontSize="10" fontFamily="monospace">
              {targetHeight}"
            </text>
            
            {/* Cabinet height label */}
            <text x={x + width/2} y={cabinetTop + cabinetHeightPx/2 - 5} fill="#3d4a5c" fontSize="9" textAnchor="middle" fontFamily="monospace">
              {approach.cabinetHeight}"
            </text>
            <text x={x + width/2} y={cabinetTop + cabinetHeightPx/2 + 7} fill="#64748b" fontSize="7" textAnchor="middle">
              cabinet
            </text>
            
            {/* Toe kick label */}
            {approach.toeKickHeight > 2 && (
              <text x={x + width/2} y={toeKickTop + toeKickHeightPx/2 + 3} 
                fill={approach.toeKickStyle === 'platform' ? '#f87171' : '#94a3b8'} 
                fontSize="8" textAnchor="middle" fontFamily="monospace">
                {approach.toeKickHeight.toFixed(1)}"
              </text>
            )}
            
            {/* Name */}
            <text x={x + width/2} y={floorY + 20} fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="600">
              {approach.name.split(' ')[0]}
            </text>
            <text x={x + width/2} y={floorY + 32} fill="#94a3b8" fontSize="8" textAnchor="middle">
              {approach.name.split(' ').slice(1).join(' ')}
            </text>
            
            {/* Verdict badge */}
            <rect x={x + width/2 - 25} y={floorY + 38} width="50" height="14" fill={verdictColor} opacity="0.2" rx="7"/>
            <text x={x + width/2} y={floorY + 49} fill={verdictColor} fontSize="8" textAnchor="middle" fontWeight="600">
              {approach.verdict.toUpperCase()}
            </text>
          </g>
        )}
      </g>
    );
  };
  
  // "Ideal" proportions reference
  const idealToeKick = 4;
  const idealCabinetHeight = targetHeight - counterThickness - idealToeKick;
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-400 mb-1">Cabinet Height Options Compared</h1>
          <p className="text-slate-400 text-sm">
            See how different approaches affect proportions for your target height
          </p>
        </div>
        
        {/* Height selector */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Target Total Height</label>
              <div className="flex items-center gap-2">
                {[37, 38, 39, 40, 41, 42].map(h => (
                  <button
                    key={h}
                    onClick={() => setTargetHeight(h)}
                    className={`px-3 py-2 rounded font-mono text-sm transition-all ${
                      targetHeight === h 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {h}"
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Butcher Block</label>
              <div className="flex items-center gap-2">
                {[1.5, 2].map(t => (
                  <button
                    key={t}
                    onClick={() => setCounterThickness(t)}
                    className={`px-3 py-2 rounded font-mono text-sm transition-all ${
                      counterThickness === t 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {t}"
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Ideal Cabinet Body</div>
              <div className="text-2xl font-mono text-green-400">{idealCabinetHeight}"</div>
              <div className="text-xs text-slate-500">(with 4" toe kick)</div>
            </div>
          </div>
        </div>
        
        {/* Visual comparison */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <div className="mb-3 text-xs text-slate-500 uppercase tracking-wide">Side-by-Side Comparison (click to select)</div>
          
          <svg viewBox="0 0 520 340" className="w-full" style={{ background: '#0f172a', borderRadius: 8 }}>
            {/* Floor line */}
            <line x1="20" y1="280" x2="500" y2="280" stroke="#334155" strokeWidth="2"/>
            <text x="25" y="295" fill="#64748b" fontSize="9">KITCHEN FLOOR</text>
            
            {/* Reference lines for standard toe kick */}
            <line x1="20" y1={280 - 4 * scale} x2="500" y2={280 - 4 * scale} stroke="#22c55e" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3"/>
            <text x="490" y={280 - 4 * scale - 3} fill="#22c55e" fontSize="7" textAnchor="end" opacity="0.5">4" toe kick line</text>
            
            {/* Render each approach */}
            {approaches.map((approach, i) => (
              <g 
                key={approach.id} 
                onClick={() => setSelectedApproach(selectedApproach === approach.id ? null : approach.id)}
                style={{ cursor: 'pointer' }}
              >
                {renderCabinet(approach, 30 + i * 95)}
              </g>
            ))}
            
            {/* Title */}
            <text x="260" y="20" fill="#60a5fa" fontSize="12" textAnchor="middle" fontWeight="600">
              5 Approaches to {targetHeight}" Total Height
            </text>
          </svg>
        </div>
        
        {/* Detailed breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {approaches.map(approach => {
            const isValid = approach.toeKickHeight >= 2.5 && approach.toeKickHeight <= 6;
            const isSelected = selectedApproach === approach.id;
            
            return (
              <div 
                key={approach.id}
                onClick={() => setSelectedApproach(isSelected ? null : approach.id)}
                className={`rounded-lg p-4 cursor-pointer transition-all border ${
                  isSelected 
                    ? 'bg-slate-700 border-blue-500 ring-1 ring-blue-400' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white text-sm">{approach.name}</h3>
                    <p className="text-xs text-slate-400">{approach.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium`} style={{ 
                    backgroundColor: getVerdictColor(approach.verdict) + '22',
                    color: getVerdictColor(approach.verdict)
                  }}>
                    {approach.verdict}
                  </span>
                </div>
                
                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-3 py-2 bg-slate-900/50 rounded">
                  <div className="text-center">
                    <div className="text-slate-500">Cabinet</div>
                    <div className="font-mono text-slate-200">{approach.cabinetHeight}"</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500">Toe Kick</div>
                    <div className={`font-mono ${approach.toeKickHeight > 6 ? 'text-red-400' : approach.toeKickHeight < 3 ? 'text-amber-400' : 'text-slate-200'}`}>
                      {approach.toeKickHeight.toFixed(1)}"
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500">Counter</div>
                    <div className="font-mono text-slate-200">{counterThickness}"</div>
                  </div>
                </div>
                
                {approach.note && (
                  <div className="text-xs text-amber-400 mb-2">{approach.note}</div>
                )}
                
                {/* Pros/Cons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-green-400 mb-1">Pros</div>
                    {approach.pros.map((pro, i) => (
                      <div key={i} className="text-slate-400">• {pro}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-red-400 mb-1">Cons</div>
                    {approach.cons.map((con, i) => (
                      <div key={i} className="text-slate-400">• {con}</div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-3 pt-2 border-t border-slate-700 text-xs">
                  <span className="text-slate-500">Cost: <span className="text-slate-300">{approach.cost}</span></span>
                  <span className="text-slate-500">Difficulty: <span className="text-slate-300">{approach.difficulty}</span></span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Recommendation */}
        <div className="bg-gradient-to-r from-green-900/30 to-slate-800 rounded-lg p-4 border border-green-800/50 mb-6">
          <h3 className="text-green-400 font-medium text-sm mb-2">My Honest Recommendation for {targetHeight}" Height</h3>
          
          {targetHeight <= 38 ? (
            <div className="text-slate-300 text-sm leading-relaxed">
              <p className="mb-2">
                At <strong>{targetHeight}"</strong>, you have good options:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Best bet:</strong> Standard 34.5" base cabinet (J Collection) with {(targetHeight - 34.5 - counterThickness).toFixed(1)}" toe kick — normal proportions</li>
                <li><strong className="text-white">Alternative:</strong> Custom build a {(targetHeight - 4 - counterThickness).toFixed(1)}" cabinet with 4" toe kick — perfect proportions</li>
              </ul>
            </div>
          ) : targetHeight <= 40 ? (
            <div className="text-slate-300 text-sm leading-relaxed">
              <p className="mb-2">
                At <strong>{targetHeight}"</strong>, this is where it gets tricky:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Best visual option:</strong> Furniture legs approach — the 30" IKEA on {(targetHeight - 30 - counterThickness).toFixed(1)}" legs looks <em>intentional</em> like a sideboard</li>
                <li><strong className="text-white">Best proportions:</strong> Custom build a {(targetHeight - 4 - counterThickness).toFixed(1)}" cabinet — more work but perfect result</li>
                <li><strong className="text-amber-300">Avoid:</strong> IKEA with solid platform — that {(targetHeight - 30 - counterThickness).toFixed(1)}" base will look chunky</li>
              </ul>
            </div>
          ) : (
            <div className="text-slate-300 text-sm leading-relaxed">
              <p className="mb-2">
                At <strong>{targetHeight}"</strong>, you're in bar-height territory:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Recommended:</strong> Custom build is really your best path here — build a {(targetHeight - 4 - counterThickness).toFixed(1)}" tall cabinet</li>
                <li><strong className="text-white">Alternative:</strong> Furniture legs could work if you lean into the "sideboard" aesthetic</li>
                <li><strong className="text-red-400">Definitely avoid:</strong> Standard cabinets with oversized toe kicks</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* The real question */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-blue-400 font-medium text-sm mb-3">The Real Question: Do You Need 40"?</h3>
          <p className="text-slate-300 text-sm mb-3">
            Your brief says 37-41" range. Let's think about what height actually makes sense:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-amber-300 font-medium mb-1">36" (Counter Height)</div>
              <p className="text-slate-400 text-xs mb-2">Standard counter height. Works perfectly with 34.5" base + 4" toe kick + 1.5" counter.</p>
              <div className="text-green-400 text-xs">✓ Normal proportions, easy to source</div>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-amber-300 font-medium mb-1">38" (Raised Counter)</div>
              <p className="text-slate-400 text-xs mb-2">Nice middle ground. Still works with standard cabinet + slightly taller toe kick.</p>
              <div className="text-green-400 text-xs">✓ Good proportions, comfortable bar seating</div>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-amber-300 font-medium mb-1">40-42" (Bar Height)</div>
              <p className="text-slate-400 text-xs mb-2">True bar height. Requires custom cabinet or furniture-leg approach.</p>
              <div className="text-amber-400 text-xs">⚠️ More work, but doable with right approach</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4">
            From the living room, the step adds 23.5". So even at 36" from kitchen floor, you're at ~60" from LR floor — still reads as a substantial half-wall with storage.
          </p>
        </div>
      </div>
    </div>
  );
}
