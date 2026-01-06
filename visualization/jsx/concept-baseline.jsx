import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Chevron Top + Speakeasy Features
 *
 * KEY IDEAS:
 * 1. Chevron/herringbone pattern butcher block top
 * 2. Hidden storage reveals - touch-latch drawers, magnetic panels
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptChevronSpeakeasy() {
  const uniqueId = useId();
  const [showHidden, setShowHidden] = useState(false);

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
            Concept: Chevron Top + Speakeasy Features
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Elegant pattern meets hidden functionality • Touch-latch reveals • Conversation starter
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Moderate Boldness</span>
            <span className="concept-tag">Farmhouse Fit</span>
            <span className="concept-tag bold">Hidden Features</span>
          </div>
        </div>

        {/* Interactive Toggle */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="toggle-btn" onClick={() => setShowHidden(!showHidden)}>
            {showHidden ? 'Hide Secrets' : 'Reveal Secrets'}
          </button>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>
            {showHidden ? 'Hidden compartments shown in purple' : 'Click to see hidden storage locations'}
          </span>
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

              return (
                <g>
                  {/* Room labels */}
                  <rect x="30" y={groundY} width={stepX - 30} height="40" fill="#1e3a5f"/>
                  <text x="100" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="11">LIVING ROOM</text>

                  <rect x={stepX} y={kitchenFloorY} width="220" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                  <text x="330" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="11">KITCHEN</text>

                  {/* CHEVRON BUTCHER BLOCK TOP */}
                  <g>
                    {/* Main top surface */}
                    <rect
                      x={cabinetLeft}
                      y={barTopY}
                      width={barRight - cabinetLeft}
                      height={barThickPx}
                      fill="#b45309"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                    {/* Chevron pattern overlay */}
                    <rect
                      x={cabinetLeft + 2}
                      y={barTopY + 2}
                      width={barRight - cabinetLeft - 4}
                      height={barThickPx - 4}
                      fill={`url(#${uniqueId}-chevron)`}
                    />
                    {/* Chevron indicator lines */}
                    <g opacity="0.7">
                      {[0, 12, 24, 36, 48, 60].map((offset, i) => (
                        <path
                          key={i}
                          d={`M ${cabinetLeft + 5 + offset} ${barTopY + barThickPx - 2}
                              L ${cabinetLeft + 11 + offset} ${barTopY + 2}
                              L ${cabinetLeft + 17 + offset} ${barTopY + barThickPx - 2}`}
                          fill="none"
                          stroke="#78350f"
                          strokeWidth="1"
                        />
                      ))}
                    </g>
                  </g>

                  {/* Cabinet body with LR-facing doors */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY + barThickPx}
                    width={cabinetDepthPx}
                    height={groundY - barTopY - barThickPx}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />

                  {/* HIDDEN COMPARTMENT 1: Under-counter secret drawer */}
                  {showHidden && (
                    <g>
                      <rect
                        x={cabinetLeft + 5}
                        y={barTopY + barThickPx + 5}
                        width={cabinetDepthPx - 10}
                        height="25"
                        fill={`url(#${uniqueId}-hidden)`}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        rx="3"
                      />
                      <text x={cabinetLeft + cabinetDepthPx/2} y={barTopY + barThickPx + 22} textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">SECRET DRAWER</text>
                    </g>
                  )}

                  {/* Cabinet shelves (visible storage) */}
                  <line x1={cabinetLeft + 3} y1={barTopY + 60} x2={stepX - 3} y2={barTopY + 60} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 110} x2={stepX - 3} y2={barTopY + 110} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 160} x2={stepX - 3} y2={barTopY + 160} stroke="#60a5fa" strokeWidth="0.5"/>

                  {/* HIDDEN COMPARTMENT 2: False panel in lower section */}
                  {showHidden && (
                    <g>
                      <rect
                        x={cabinetLeft + 5}
                        y={barTopY + 165}
                        width={cabinetDepthPx - 10}
                        height="30"
                        fill={`url(#${uniqueId}-hidden)`}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        rx="3"
                      />
                      <text x={cabinetLeft + cabinetDepthPx/2} y={barTopY + 184} textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">FALSE PANEL</text>
                    </g>
                  )}

                  {/* Step face with possible integrated drawer */}
                  <rect
                    x={stepX}
                    y={kitchenFloorY}
                    width="12"
                    height={groundY - kitchenFloorY}
                    fill="#1e3a5f"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />

                  {/* HIDDEN COMPARTMENT 3: Step riser drawer */}
                  {showHidden && (
                    <g>
                      <rect
                        x={stepX + 1}
                        y={groundY - 40}
                        width="10"
                        height="35"
                        fill={`url(#${uniqueId}-hidden)`}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                      />
                      <text x={stepX + 20} y={groundY - 18} fill="#a855f7" fontSize="8" fontWeight="bold">STEP</text>
                      <text x={stepX + 20} y={groundY - 8} fill="#a855f7" fontSize="8" fontWeight="bold">DRAWER</text>
                    </g>
                  )}

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
                  {/* Step height */}
                  <g>
                    <line x1="50" y1={groundY} x2="50" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="45" y1={groundY} x2="55" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="45" y1={kitchenFloorY} x2="55" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <text x="60" y={(groundY + kitchenFloorY) / 2 + 4} fill="#fb923c" fontSize="10" fontFamily="monospace">23.5"</text>
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
                  <text x="30" y="42" fill="#64748b" fontSize="10">Chevron pattern top • Hidden compartments</text>

                  {/* Chevron callout */}
                  <g>
                    <line x1={cabinetLeft + 40} y1={barTopY - 10} x2={cabinetLeft + 40} y2={barTopY + 5} stroke="#fbbf24" strokeWidth="1"/>
                    <circle cx={cabinetLeft + 40} cy={barTopY - 15} r="4" fill="#fbbf24"/>
                    <text x={cabinetLeft + 50} y={barTopY - 12} fill="#fbbf24" fontSize="9" fontWeight="bold">CHEVRON</text>
                  </g>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Plan View - Shows chevron pattern better */}
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

                  {/* Bar top with chevron pattern */}
                  <rect
                    x={startX}
                    y={startY}
                    width={barLength}
                    height={barDepth}
                    fill="#b45309"
                    stroke="#92400e"
                    strokeWidth="2"
                  />

                  {/* Chevron pattern - full herringbone across the top */}
                  <g>
                    {Array.from({ length: 14 }).map((_, col) => (
                      Array.from({ length: 4 }).map((_, row) => {
                        const x = startX + 10 + col * 10;
                        const y = startY + 5 + row * 12;
                        const flip = (col + row) % 2 === 0;
                        return (
                          <path
                            key={`${col}-${row}`}
                            d={flip
                              ? `M ${x} ${y + 10} L ${x + 5} ${y} L ${x + 10} ${y + 10}`
                              : `M ${x} ${y} L ${x + 5} ${y + 10} L ${x + 10} ${y}`
                            }
                            fill="none"
                            stroke="#78350f"
                            strokeWidth="1"
                            opacity="0.5"
                          />
                        );
                      })
                    ))}
                  </g>

                  {/* Cabinet section (LR-facing) */}
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
                  <text x={startX + 10} y={startY + 15} fill="#60a5fa" fontSize="8">cabinet below</text>

                  {/* Hidden compartments in plan view */}
                  {showHidden && (
                    <g>
                      {/* Secret drawer */}
                      <rect
                        x={startX + 10}
                        y={startY + 3}
                        width="40"
                        height="16"
                        fill={`url(#${uniqueId}-hidden)`}
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeDasharray="3,2"
                      />
                      {/* Pop-up outlet location */}
                      <circle
                        cx={startX + barLength - 30}
                        cy={startY + barDepth - 15}
                        r="8"
                        fill={`url(#${uniqueId}-hidden)`}
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeDasharray="3,2"
                      />
                      <text x={startX + barLength - 30} y={startY + barDepth - 12} textAnchor="middle" fill="#a855f7" fontSize="6" fontWeight="bold">POP</text>
                    </g>
                  )}

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
              <h4>Chevron Pattern Top</h4>
              <p>Herringbone butcher block. Available at Home Depot (8ft Hevea). Visual interest without being too bold.</p>
            </div>
            <div className="feature-item">
              <h4>Touch-Latch Secret Drawer</h4>
              <p>Push-to-open drawer hidden under counter lip. No visible hardware. Stores valuables, remotes.</p>
            </div>
            <div className="feature-item">
              <h4>False Panel Storage</h4>
              <p>Magnetic panel in cabinet face conceals deeper compartment. "Speakeasy" style hidden space.</p>
            </div>
            <div className="feature-item">
              <h4>Pop-Up Outlet</h4>
              <p>Recessed outlet pops up when needed. Flat and invisible when closed. Clean countertop.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Chevron is readily available (Home Depot)</li>
              <li>Hidden features are conversation starters</li>
              <li>Clean appearance when "closed"</li>
              <li>Touch-latch = no visible hardware</li>
              <li>Still farmhouse modern aesthetic</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Hidden mechanisms need maintenance</li>
              <li>More complex build than standard</li>
              <li>Touch-latches can fail over time</li>
              <li>May forget where hidden storage is!</li>
              <li>Pop-up outlets cost more (~$100-200 each)</li>
            </ul>
          </div>
        </div>

        {/* Hidden Feature Details */}
        <div className="concept-panel">
          <div className="concept-title">Hidden Feature Options</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #a855f7' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Touch-Latch Drawers</div>
              <div style={{ color: '#94a3b8' }}>Push-to-open, no handles. Blum or Salice hardware. ~$15-30/drawer.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #a855f7' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Magnetic Panels</div>
              <div style={{ color: '#94a3b8' }}>Rare-earth magnets hold panel. Push corner to release. Custom DIY.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #a855f7' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Pop-Up Outlets</div>
              <div style={{ color: '#94a3b8' }}>Lew Electric or similar. 3" diameter hole. USB + AC options.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #a855f7' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Step Riser Drawer</div>
              <div style={{ color: '#94a3b8' }}>Shallow drawer in step face. ~6" deep max. Good for remotes, coasters.</div>
            </div>
          </div>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#fbbf24', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> Combine the visual interest of a chevron/herringbone butcher block top
            with "speakeasy" hidden features. The bar looks elegant and clean from the outside, but push
            the right spot and drawers appear. Hidden storage for valuables, remotes, or that good bourbon
            you don't share with everyone. It's farmhouse (wood pattern) with a playful secret life.
            Less visually dramatic than live edge, but more functional surprise factor.
          </p>
        </div>
      </div>
    </div>
  );
}
