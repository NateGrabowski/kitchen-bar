import React, { useState } from 'react'

export default function KitchenFloorCabinetsSketch() {
  const [config, setConfig] = useState({
    stepHeight: 23.5,        // Fixed - living room to kitchen floor
    cabinetHeight: 24,       // Shorter drawer-base cabinets (adjustable)
    cabinetDepth: 24,        // Standard cabinet depth
    counterThickness: 1.5,   // Butcher block
    overhangTowardLR: 8,     // How far counter extends past cabinet toward LR
    overhangTowardKitchen: 12, // Knee space on kitchen side
    barLength: 84,
  })

  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Calculated values
  const counterFromKitchenFloor = config.cabinetHeight + config.counterThickness
  const counterFromLRFloor = config.stepHeight + counterFromKitchenFloor
  const totalDepth = config.cabinetDepth + config.overhangTowardLR + config.overhangTowardKitchen

  // Ergonomics
  const kitchenStoolHeight = counterFromKitchenFloor - 10 // 10" below counter
  const lrStoolHeight = counterFromLRFloor - 10

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      background: '#0f172a',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: 20
    }}>
      <h1 style={{ color: '#60a5fa', marginBottom: 8 }}>Kitchen Floor Cabinets - Sketch</h1>
      <p style={{ color: '#94a3b8', marginBottom: 20 }}>Cabinets sit on kitchen floor (upper level), bar extends toward living room</p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Controls */}
        <div style={{ background: '#1e293b', padding: 16, borderRadius: 8 }}>
          <h3 style={{ color: '#60a5fa', marginTop: 0 }}>Dimensions</h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Step Height (fixed)</span>
              <span style={{ color: '#60a5fa' }}>{config.stepHeight}"</span>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Cabinet Height</span>
              <span style={{ color: '#60a5fa' }}>{config.cabinetHeight}"</span>
            </div>
            <input type="range" min="18" max="34" value={config.cabinetHeight}
              onChange={e => update('cabinetHeight', +e.target.value)}
              style={{ width: '100%' }} />
            <div style={{ fontSize: 11, color: '#64748b' }}>18" (drawer base) to 34" (full cabinet)</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Cabinet Depth</span>
              <span style={{ color: '#60a5fa' }}>{config.cabinetDepth}"</span>
            </div>
            <input type="range" min="12" max="24" value={config.cabinetDepth}
              onChange={e => update('cabinetDepth', +e.target.value)}
              style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Overhang toward LR</span>
              <span style={{ color: '#60a5fa' }}>{config.overhangTowardLR}"</span>
            </div>
            <input type="range" min="0" max="16" value={config.overhangTowardLR}
              onChange={e => update('overhangTowardLR', +e.target.value)}
              style={{ width: '100%' }} />
            <div style={{ fontSize: 11, color: '#64748b' }}>Counter extending past step toward living room</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Overhang toward Kitchen</span>
              <span style={{ color: '#60a5fa' }}>{config.overhangTowardKitchen}"</span>
            </div>
            <input type="range" min="8" max="16" value={config.overhangTowardKitchen}
              onChange={e => update('overhangTowardKitchen', +e.target.value)}
              style={{ width: '100%' }} />
            <div style={{ fontSize: 11, color: '#64748b' }}>Knee space for kitchen-side seating</div>
          </div>

          <h3 style={{ color: '#60a5fa', marginTop: 24 }}>Calculated Heights</h3>

          <div style={{ fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Counter from kitchen floor:</span>
              <span style={{ color: '#4ade80' }}>{counterFromKitchenFloor}"</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Counter from LR floor:</span>
              <span style={{ color: '#f472b6' }}>{counterFromLRFloor}"</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total depth:</span>
              <span>{totalDepth}"</span>
            </div>
          </div>

          <h3 style={{ color: '#60a5fa', marginTop: 24 }}>Seating</h3>
          <div style={{ fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Kitchen stool height:</span>
              <span style={{ color: '#4ade80' }}>{kitchenStoolHeight}"</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>LR stool height:</span>
              <span style={{ color: '#f472b6' }}>{lrStoolHeight}"</span>
            </div>
          </div>

          {/* Warnings */}
          <div style={{ marginTop: 20, padding: 12, background: '#1a1a2e', borderRadius: 6, fontSize: 12 }}>
            {counterFromLRFloor > 42 ? (
              <div style={{ color: '#fbbf24' }}>
                ⚠ Counter is {counterFromLRFloor}" from LR floor - standard bar height is 42".
                {counterFromLRFloor > 48 && " This may be too high for comfortable seating from LR side."}
              </div>
            ) : (
              <div style={{ color: '#4ade80' }}>
                ✓ Counter at {counterFromLRFloor}" from LR floor - good bar height range
              </div>
            )}
          </div>
        </div>

        {/* Visualization */}
        <div style={{ background: '#1e293b', padding: 16, borderRadius: 8 }}>
          <h3 style={{ color: '#60a5fa', marginTop: 0 }}>Side Section View</h3>

          <svg viewBox="0 0 500 320" style={{ width: '100%', background: '#0d1520', borderRadius: 4 }}>
            {/* Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="500" height="320" fill="url(#grid)"/>

            {(() => {
              const scale = 2.2
              const groundY = 280  // LR floor level
              const kitchenFloorY = groundY - config.stepHeight * scale
              const cabinetTopY = kitchenFloorY - config.cabinetHeight * scale
              const counterTopY = cabinetTopY - config.counterThickness * scale

              const stepX = 200  // Where step edge is
              const cabinetLeft = stepX  // Cabinet starts at step edge
              const cabinetRight = stepX + config.cabinetDepth * scale
              const counterLeft = stepX - config.overhangTowardLR * scale
              const counterRight = cabinetRight + config.overhangTowardKitchen * scale

              return (
                <g>
                  {/* Living room floor */}
                  <rect x="30" y={groundY} width={stepX - 30} height="30" fill="#1e3a5f"/>
                  <text x="80" y={groundY + 18} fill="#64748b" fontSize="10">LIVING ROOM</text>

                  {/* Step face */}
                  <rect x={stepX - 4} y={kitchenFloorY} width="4" height={groundY - kitchenFloorY} fill="#334155"/>

                  {/* Kitchen floor */}
                  <rect x={stepX} y={kitchenFloorY} width="250" height={groundY - kitchenFloorY + 30} fill="#234060"/>
                  <text x={stepX + 100} y={kitchenFloorY + 25} fill="#64748b" fontSize="10">KITCHEN</text>

                  {/* Cabinet box */}
                  <rect
                    x={cabinetLeft}
                    y={cabinetTopY}
                    width={config.cabinetDepth * scale}
                    height={config.cabinetHeight * scale}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  {/* Cabinet door lines */}
                  <line x1={cabinetLeft + config.cabinetDepth * scale / 2} y1={cabinetTopY + 5}
                        x2={cabinetLeft + config.cabinetDepth * scale / 2} y2={kitchenFloorY - 5}
                        stroke="#60a5fa" strokeWidth="0.5"/>

                  {/* Countertop */}
                  <rect
                    x={counterLeft}
                    y={counterTopY}
                    width={counterRight - counterLeft}
                    height={config.counterThickness * scale * 2}
                    fill="#92400e"
                    stroke="#b45309"
                    strokeWidth="1.5"
                  />

                  {/* Support bracket for LR overhang (if significant) */}
                  {config.overhangTowardLR > 6 && (
                    <path
                      d={`M ${stepX} ${counterTopY + config.counterThickness * scale * 2}
                          L ${stepX} ${counterTopY + 40}
                          L ${counterLeft + 15} ${counterTopY + config.counterThickness * scale * 2}`}
                      fill="none" stroke="#9ca3af" strokeWidth="2.5"
                    />
                  )}

                  {/* Person on kitchen side */}
                  <g transform={`translate(${cabinetRight + config.overhangTowardKitchen * scale / 2}, ${kitchenFloorY})`}>
                    {/* Stool */}
                    <rect x="-12" y={-kitchenStoolHeight * scale} width="24" height="4" fill="#475569" rx="2"/>
                    <rect x="-2" y={-kitchenStoolHeight * scale + 4} width="4" height={kitchenStoolHeight * scale - 4} fill="#475569"/>
                    {/* Person (simplified) */}
                    <circle cx="0" cy={-kitchenStoolHeight * scale - 35} r="10" fill="#64748b"/>
                    <rect x="-8" y={-kitchenStoolHeight * scale - 25} width="16" height="20" fill="#64748b" rx="3"/>
                  </g>

                  {/* Dimensions */}
                  {/* Step height */}
                  <g>
                    <line x1="50" y1={groundY} x2="50" y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1="45" y1={groundY} x2="55" y2={groundY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1="45" y1={kitchenFloorY} x2="55" y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                    <text x="40" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#60a5fa" fontSize="11" fontFamily="monospace">{config.stepHeight}"</text>
                  </g>

                  {/* Cabinet height */}
                  <g>
                    <line x1={cabinetRight + 15} y1={kitchenFloorY} x2={cabinetRight + 15} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={cabinetRight + 10} y1={kitchenFloorY} x2={cabinetRight + 20} y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={cabinetRight + 10} y1={cabinetTopY} x2={cabinetRight + 20} y2={cabinetTopY} stroke="#4ade80" strokeWidth="1"/>
                    <text x={cabinetRight + 25} y={(kitchenFloorY + cabinetTopY) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">{config.cabinetHeight}"</text>
                  </g>

                  {/* Counter from LR floor */}
                  <g>
                    <line x1={counterLeft - 15} y1={groundY} x2={counterLeft - 15} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                    <line x1={counterLeft - 20} y1={groundY} x2={counterLeft - 10} y2={groundY} stroke="#f472b6" strokeWidth="1"/>
                    <line x1={counterLeft - 20} y1={counterTopY} x2={counterLeft - 10} y2={counterTopY} stroke="#f472b6" strokeWidth="1"/>
                    <text x={counterLeft - 25} y={(groundY + counterTopY) / 2 + 4} textAnchor="end" fill="#f472b6" fontSize="11" fontFamily="monospace">{counterFromLRFloor}"</text>
                  </g>

                  {/* LR overhang */}
                  {config.overhangTowardLR > 0 && (
                    <g>
                      <line x1={counterLeft} y1={counterTopY - 15} x2={stepX} y2={counterTopY - 15} stroke="#fbbf24" strokeWidth="1"/>
                      <text x={(counterLeft + stepX) / 2} y={counterTopY - 20} textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">{config.overhangTowardLR}" overhang</text>
                    </g>
                  )}

                  {/* Kitchen overhang (knee space) */}
                  <g>
                    <line x1={cabinetRight} y1={counterTopY - 15} x2={counterRight} y2={counterTopY - 15} stroke="#4ade80" strokeWidth="1"/>
                    <text x={(cabinetRight + counterRight) / 2} y={counterTopY - 20} textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">{config.overhangTowardKitchen}" knee</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">SIDE SECTION</text>
                  <text x="30" y="40" fill="#64748b" fontSize="10">Cabinets on kitchen floor</text>
                </g>
              )
            })()}
          </svg>

          {/* Explanation */}
          <div style={{ marginTop: 16, padding: 12, background: '#0d1520', borderRadius: 6, fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: '#60a5fa' }}>How this works:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: '#94a3b8' }}>
              <li>Standard or short base cabinets sit on <span style={{ color: '#4ade80' }}>kitchen floor</span></li>
              <li>Countertop extends toward LR creating <span style={{ color: '#fbbf24' }}>overhang</span></li>
              <li>Seating on kitchen side with <span style={{ color: '#4ade80' }}>{config.overhangTowardKitchen}" knee space</span></li>
              <li>Step face becomes backing (can add panel/trim)</li>
              {config.overhangTowardLR > 6 && <li>Steel bracket supports LR overhang</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
