import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Kitchen-Floor Cabinets (C2)
 *
 * KEY IDEAS:
 * 1. Standard 30" or 36" base cabinets sit on kitchen floor
 * 2. The 23.5" step becomes a decorative panel only (no storage)
 * 3. Simpler construction using stock cabinets
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptKitchenFloorCabinets() {
  const uniqueId = useId();
  const [showBaseline, setShowBaseline] = useState(false);
  const [cabinetHeight, setCabinetHeight] = useState(30); // 30" or 36"

  // Fixed dimensions from project constraints
  const config = {
    stepHeight: 23.5,
    barTopHeight: 40,
    barDepth: 28,
    cabinetDepth: 12,
    barLength: 84,
    barTopThickness: 1.5,
  };

  const kneeSpace = config.barDepth - config.cabinetDepth;
  const barFromLivingRoom = config.barTopHeight + config.stepHeight;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px',
    }}>
      <style>{`
        .concept-panel {
          background: #111d2e;
          border: 1px solid #243447;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .concept-title {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #60a5fa;
          margin-bottom: 8px;
        }
        .concept-tag {
          display: inline-block;
          padding: 4px 10px;
          background: #1e3a5f;
          border-radius: 4px;
          font-size: 11px;
          color: #4ade80;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .concept-tag.bold {
          background: #7c3aed20;
          color: #a78bfa;
        }
        .feature-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        .feature-item {
          background: #0d1520;
          padding: 12px;
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
        }
        .feature-item h4 {
          margin: 0 0 4px 0;
          font-size: 12px;
          color: #e2e8f0;
        }
        .feature-item p {
          margin: 0;
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.4;
        }
        .toggle-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .toggle-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            <span style={{ background: '#1e3a5f', padding: '2px 8px', borderRadius: 4, fontSize: 14, marginRight: 10 }}>C2</span>
            Concept: Kitchen-Floor Cabinets
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Standard cabinets on kitchen floor • Step becomes decorative panel • Simpler construction
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Standard Construction</span>
            <span className="concept-tag">Stock Cabinets OK</span>
            <span className="concept-tag bold">Storage Trade-off</span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button className="toggle-btn" onClick={() => setShowBaseline(!showBaseline)}>
            {showBaseline ? 'Hide Comparison' : 'Show Baseline'}
          </button>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>
            {showBaseline ? 'Baseline (continuous cabinet) shown in outline' : 'Compare to baseline continuous cabinet'}
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: '#94a3b8' }}>Cabinet Height:</label>
            <select
              value={cabinetHeight}
              onChange={e => setCabinetHeight(Number(e.target.value))}
              style={{ background: '#1e293b', color: '#e2e8f0', border: '1px solid #3b82f6', borderRadius: 4, padding: '4px 8px' }}
            >
              <option value={30}>30" (Standard Base)</option>
              <option value={36}>36" (Tall Base)</option>
            </select>
          </div>
        </div>

        {/* Main Visualization - Side Section */}
        <div className="concept-panel">
          <div className="concept-title">Side Section View</div>
          <svg viewBox="0 0 420 360" style={{ width: '100%', background: '#0d1520', borderRadius: 6 }}>
            <defs>
              <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
              {/* Chevron pattern for top */}
              <pattern id={`${uniqueId}-chevron`} width="20" height="10" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 10 0 L 20 10" fill="none" stroke="#92400e" strokeWidth="1.5" opacity="0.6"/>
              </pattern>
              <linearGradient id={`${uniqueId}-hidden`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5"/>
              </linearGradient>
            </defs>
            <rect width="420" height="360" fill={`url(#${uniqueId}-grid)`}/>

            {(() => {
              const scale = 2.6;
              const groundY = 310;
              const kitchenFloorY = groundY - config.stepHeight * scale;
              const barTopY = kitchenFloorY - config.barTopHeight * scale;
              const stepX = 180;

              const cabinetDepthPx = config.cabinetDepth * scale;
              const kneeSpacePx = kneeSpace * scale;
              const barThickPx = Math.max(config.barTopThickness * scale * 2, 8);

              const cabinetLeft = stepX - cabinetDepthPx;
              const barRight = stepX + kneeSpacePx;

              // Kitchen-floor cabinet calculations
              const cabinetHeightPx = cabinetHeight * scale;
              const cabinetTopY = kitchenFloorY - cabinetHeightPx;
              const gapAboveCabinet = barTopY + barThickPx - cabinetTopY; // gap between bar and cabinet

              return (
                <g>
                  {/* Room labels */}
                  <rect x="30" y={groundY} width={stepX - 30} height="40" fill="#1e3a5f"/>
                  <text x="100" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="11">LIVING ROOM</text>

                  <rect x={stepX} y={kitchenFloorY} width="220" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                  <text x="330" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="11">KITCHEN</text>

                  {/* BASELINE COMPARISON - continuous cabinet outline */}
                  {showBaseline && (
                    <rect
                      x={cabinetLeft}
                      y={barTopY + barThickPx}
                      width={cabinetDepthPx}
                      height={groundY - barTopY - barThickPx}
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray="6,3"
                      opacity="0.6"
                    />
                  )}

                  {/* BUTCHER BLOCK TOP */}
                  <g>
                    <rect
                      x={cabinetLeft}
                      y={barTopY}
                      width={barRight - cabinetLeft}
                      height={barThickPx}
                      fill="#b45309"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                    {/* Wood grain lines */}
                    <g opacity="0.4">
                      {[0, 15, 30, 45, 60].map((offset, i) => (
                        <line
                          key={i}
                          x1={cabinetLeft + 5 + offset}
                          y1={barTopY + 2}
                          x2={cabinetLeft + 5 + offset}
                          y2={barTopY + barThickPx - 2}
                          stroke="#78350f"
                          strokeWidth="1"
                        />
                      ))}
                    </g>
                  </g>

                  {/* Gap/spacer between bar top and cabinet (if any) */}
                  {gapAboveCabinet > 0 && (
                    <rect
                      x={cabinetLeft}
                      y={barTopY + barThickPx}
                      width={cabinetDepthPx}
                      height={gapAboveCabinet}
                      fill="#1e3a5f"
                      stroke="#60a5fa"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />
                  )}

                  {/* KITCHEN-FLOOR CABINET - shorter, sits on kitchen floor */}
                  <rect
                    x={cabinetLeft}
                    y={cabinetTopY}
                    width={cabinetDepthPx}
                    height={cabinetHeightPx}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />

                  {/* Cabinet shelves */}
                  <line x1={cabinetLeft + 3} y1={cabinetTopY + cabinetHeightPx * 0.33} x2={stepX - 3} y2={cabinetTopY + cabinetHeightPx * 0.33} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={cabinetTopY + cabinetHeightPx * 0.66} x2={stepX - 3} y2={cabinetTopY + cabinetHeightPx * 0.66} stroke="#60a5fa" strokeWidth="0.5"/>

                  {/* DECORATIVE STEP PANEL - the 23.5" wasted space */}
                  <rect
                    x={cabinetLeft}
                    y={kitchenFloorY}
                    width={cabinetDepthPx}
                    height={groundY - kitchenFloorY}
                    fill="#3d1a0a"
                    stroke="#78350f"
                    strokeWidth="1"
                  />
                  <text x={cabinetLeft + cabinetDepthPx/2} y={(kitchenFloorY + groundY) / 2 - 5} textAnchor="middle" fill="#94a3b8" fontSize="8">DECORATIVE</text>
                  <text x={cabinetLeft + cabinetDepthPx/2} y={(kitchenFloorY + groundY) / 2 + 5} textAnchor="middle" fill="#94a3b8" fontSize="8">PANEL ONLY</text>

                  {/* Step face */}
                  <rect
                    x={stepX}
                    y={kitchenFloorY}
                    width="12"
                    height={groundY - kitchenFloorY}
                    fill="#1e3a5f"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />

                  {/* Support post */}
                  <rect x={stepX - 3} y={barTopY + barThickPx} width="5" height={kitchenFloorY - barTopY - barThickPx} fill="#2d4a6a"/>

                  {/* Person on stool */}
                  {(() => {
                    const stoolY = kitchenFloorY - 30 * scale;
                    const px = 280;
                    return (
                      <g opacity="0.6">
                        <rect x={px - 12} y={stoolY} width="24" height="4" fill="#4a6a8a" rx="2"/>
                        <rect x={px - 2} y={stoolY + 4} width="4" height={kitchenFloorY - stoolY - 4} fill="#4a6a8a"/>
                        <rect x={px - 10} y={kitchenFloorY - 4} width="20" height="4" fill="#4a6a8a" rx="2"/>
                        <ellipse cx={px} cy={stoolY - 45} rx="11" ry="13" fill="#5a7a9a"/>
                        <rect x={px - 12} y={stoolY - 32} width="24" height="34" fill="#5a7a9a" rx="3"/>
                        <rect x={px - 37} y={stoolY - 26} width="25" height="6" fill="#5a7a9a" rx="3"/>
                      </g>
                    );
                  })()}

                  {/* DIMENSIONS */}
                  {/* Step height - WASTED */}
                  <g>
                    <line x1="50" y1={groundY} x2="50" y2={kitchenFloorY} stroke="#ef4444" strokeWidth="1.5"/>
                    <line x1="45" y1={groundY} x2="55" y2={groundY} stroke="#ef4444" strokeWidth="1.5"/>
                    <line x1="45" y1={kitchenFloorY} x2="55" y2={kitchenFloorY} stroke="#ef4444" strokeWidth="1.5"/>
                    <text x="60" y={(groundY + kitchenFloorY) / 2 - 2} fill="#ef4444" fontSize="9" fontWeight="bold">23.5"</text>
                    <text x="60" y={(groundY + kitchenFloorY) / 2 + 10} fill="#ef4444" fontSize="8">wasted</text>
                  </g>

                  {/* Cabinet height */}
                  <g>
                    <line x1={cabinetLeft - 15} y1={kitchenFloorY} x2={cabinetLeft - 15} y2={cabinetTopY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1={cabinetLeft - 20} y1={kitchenFloorY} x2={cabinetLeft - 10} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="1"/>
                    <line x1={cabinetLeft - 20} y1={cabinetTopY} x2={cabinetLeft - 10} y2={cabinetTopY} stroke="#60a5fa" strokeWidth="1"/>
                    <text x={cabinetLeft - 25} y={(kitchenFloorY + cabinetTopY) / 2 + 4} fill="#60a5fa" fontSize="9" fontFamily="monospace" textAnchor="end">{cabinetHeight}"</text>
                  </g>

                  {/* Bar height */}
                  <g>
                    <line x1="340" y1={kitchenFloorY} x2="340" y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                    <line x1="335" y1={kitchenFloorY} x2="345" y2={kitchenFloorY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1="335" y1={barTopY + 3} x2="345" y2={barTopY + 3} stroke="#4ade80" strokeWidth="1"/>
                    <text x="350" y={(kitchenFloorY + barTopY) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">40"</text>
                  </g>

                  {/* Total depth */}
                  <g>
                    <line x1={cabinetLeft} y1={barTopY - 30} x2={barRight} y2={barTopY - 30} stroke="#a78bfa" strokeWidth="1"/>
                    <line x1={cabinetLeft} y1={barTopY - 35} x2={cabinetLeft} y2={barTopY - 25} stroke="#a78bfa" strokeWidth="1"/>
                    <line x1={barRight} y1={barTopY - 35} x2={barRight} y2={barTopY - 25} stroke="#a78bfa" strokeWidth="1"/>
                    <text x={(cabinetLeft + barRight) / 2} y={barTopY - 38} textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">28" depth</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">SIDE SECTION</text>
                  <text x="30" y="42" fill="#64748b" fontSize="10">Standard cabinet on kitchen floor • Step = decorative only</text>

                  {/* Gap callout */}
                  {gapAboveCabinet > 10 && (
                    <g>
                      <line x1={cabinetLeft + cabinetDepthPx + 10} y1={barTopY + barThickPx + 5} x2={cabinetLeft + cabinetDepthPx + 10} y2={cabinetTopY - 5} stroke="#fbbf24" strokeWidth="1"/>
                      <text x={cabinetLeft + cabinetDepthPx + 15} y={(barTopY + barThickPx + cabinetTopY) / 2} fill="#fbbf24" fontSize="8">{Math.round((config.barTopHeight - cabinetHeight) * 10) / 10}" gap</text>
                    </g>
                  )}
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Plan View */}
        <div className="concept-panel">
          <div className="concept-title">Plan View (Bird's Eye)</div>
          <svg viewBox="0 0 420 180" style={{ width: '100%', background: '#0d1520', borderRadius: 6 }}>
            <defs>
              <pattern id={`${uniqueId}-grid2`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="420" height="180" fill={`url(#${uniqueId}-grid2)`}/>

            {(() => {
              const scale = 1.8;
              const barLength = config.barLength * scale;
              const barDepth = config.barDepth * scale;
              const startX = (420 - barLength) / 2;
              const startY = 50;

              return (
                <g>
                  {/* Living room label */}
                  <text x="210" y="25" textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM</text>
                  <text x="210" y="165" textAnchor="middle" fill="#3b5a7a" fontSize="10">KITCHEN</text>

                  {/* Bar top */}
                  <rect
                    x={startX}
                    y={startY}
                    width={barLength}
                    height={barDepth}
                    fill="#b45309"
                    stroke="#92400e"
                    strokeWidth="2"
                  />

                  {/* Wood grain lines */}
                  <g opacity="0.3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={i}
                        x1={startX + 10 + i * 12}
                        y1={startY + 2}
                        x2={startX + 10 + i * 12}
                        y2={startY + barDepth - 2}
                        stroke="#78350f"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  {/* Cabinet footprint */}
                  <rect
                    x={startX}
                    y={startY}
                    width={barLength}
                    height={config.cabinetDepth * scale}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1"
                    strokeDasharray="4,2"
                  />
                  <text x={startX + 10} y={startY + 15} fill="#60a5fa" fontSize="8">{cabinetHeight}" cabinet</text>

                  {/* Seating positions */}
                  {[0, 1, 2].map(i => (
                    <g key={i}>
                      <ellipse
                        cx={startX + 30 + i * 50}
                        cy={startY + barDepth + 20}
                        rx="12"
                        ry="8"
                        fill="#4a6a8a"
                        opacity="0.5"
                      />
                    </g>
                  ))}

                  {/* Dimensions */}
                  <g>
                    <line x1={startX} y1={startY - 15} x2={startX + barLength} y2={startY - 15} stroke="#fbbf24" strokeWidth="1"/>
                    <line x1={startX} y1={startY - 20} x2={startX} y2={startY - 10} stroke="#fbbf24" strokeWidth="1"/>
                    <line x1={startX + barLength} y1={startY - 20} x2={startX + barLength} y2={startY - 10} stroke="#fbbf24" strokeWidth="1"/>
                    <text x={startX + barLength/2} y={startY - 22} textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">84" (7 ft)</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">PLAN VIEW</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Key Features */}
        <div className="concept-panel">
          <div className="concept-title">Key Features</div>
          <div className="feature-list">
            <div className="feature-item">
              <h4>Stock Cabinet Compatible</h4>
              <p>Use standard 30" or 36" base cabinets. No custom fabrication needed for cabinet boxes.</p>
            </div>
            <div className="feature-item">
              <h4>Simpler Construction</h4>
              <p>No need to frame into the step. Standard cabinet installation on kitchen floor.</p>
            </div>
            <div className="feature-item">
              <h4>Decorative Step Panel</h4>
              <p>Step face becomes a decorative element. Could match cabinet style or be an accent material.</p>
            </div>
            <div className="feature-item">
              <h4>Easy Replacement</h4>
              <p>Cabinets can be swapped out later without structural changes to the bar.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Use pre-made stock cabinets (lower cost)</li>
              <li>Simpler installation - no step framing</li>
              <li>Easier to replace/upgrade later</li>
              <li>Standard cabinet heights (30" or 36")</li>
              <li>Familiar construction for any contractor</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li><strong>Wastes 23.5" of storage</strong> (step area)</li>
              <li>Step panel is purely decorative (dead space)</li>
              <li>~18 cu.ft storage vs ~37 cu.ft baseline</li>
              <li>{config.barTopHeight - cabinetHeight}" gap above cabinet needs trim</li>
              <li>Less dramatic visual impact</li>
            </ul>
          </div>
        </div>

        {/* Storage Comparison */}
        <div className="concept-panel">
          <div className="concept-title">Storage Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0d1520', padding: 20, borderRadius: 6, borderLeft: '3px solid #ef4444', textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: 32, fontWeight: 600 }}>~18</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>cubic feet</div>
              <div style={{ color: '#ef4444', fontSize: 11, marginTop: 8 }}>This Concept ({cabinetHeight}" cabinet)</div>
            </div>
            <div style={{ background: '#0d1520', padding: 20, borderRadius: 6, borderLeft: '3px solid #4ade80', textAlign: 'center' }}>
              <div style={{ color: '#4ade80', fontSize: 32, fontWeight: 600 }}>~37</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>cubic feet</div>
              <div style={{ color: '#4ade80', fontSize: 11, marginTop: 8 }}>Baseline (63.5" continuous)</div>
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
            You lose approximately half the storage capacity with kitchen-floor cabinets
          </p>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#fbbf24', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The trade-off:</strong> Kitchen-floor cabinets are simpler and use stock sizes, but they treat your 23.5" step as wasted space.
            If storage is a priority, this isn't ideal. If simplicity and cost matter more, this is the conventional approach.
            The step becomes a decorative panel—potentially an accent color or material, but not functional storage.
          </p>
        </div>
      </div>
    </div>
  );
}
