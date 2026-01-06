import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Angled/L-Shape Bar
 *
 * KEY IDEAS:
 * 1. Bar wraps corner or angles instead of straight 84"
 * 2. Creates different traffic flow and conversation dynamics
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptAngledBar() {
  const uniqueId = useId();
  const [barShape, setBarShape] = useState('l-shape'); // l-shape, angled, curved
  const [showPlanView, setShowPlanView] = useState(true);

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
  const wingLength = barShape === 'l-shape' ? 48 : 0;

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
        .style-select {
          background: #1e293b;
          color: #e2e8f0;
          border: 1px solid #3b82f6;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 13px;
          cursor: pointer;
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Concept: Angled/L-Shape Bar
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Bar wraps corner or angles • More seating capacity • Architectural interest
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Moderate Boldness</span>
            <span className="concept-tag">Extra Seating</span>
            <span className="concept-tag bold">Shape Variation</span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Bar Shape:</label>
            <select
              className="style-select"
              value={barShape}
              onChange={e => setBarShape(e.target.value)}
            >
              <option value="l-shape">L-Shape (84" + 48" wing)</option>
              <option value="angled">Angled (30° bend)</option>
              <option value="curved">Gentle Curve</option>
            </select>
          </div>
          <button className="toggle-btn" onClick={() => setShowPlanView(!showPlanView)}>
            {showPlanView ? 'Hide Plan View' : 'Show Plan View'}
          </button>
        </div>

        {/* Main Visualization - Side Section */}
        <div className="concept-panel">
          <div className="concept-title">Side Section View</div>
          <svg viewBox="0 0 420 360" style={{ width: '100%', background: '#0d1520', borderRadius: 6 }}>
            <defs>
              <pattern id={`${uniqueId}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id={`${uniqueId}-wood`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b45309"/>
                <stop offset="50%" stopColor="#d97706"/>
                <stop offset="100%" stopColor="#b45309"/>
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

                  {/* BUTCHER BLOCK TOP */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY}
                    width={barRight - cabinetLeft}
                    height={barThickPx}
                    fill={`url(#${uniqueId}-wood)`}
                    stroke="#92400e"
                    strokeWidth="1.5"
                  />

                  {/* Wing extension indicator */}
                  {barShape === 'l-shape' && (
                    <g>
                      <rect
                        x={barRight - 5}
                        y={barTopY - 10}
                        width="50"
                        height={kitchenFloorY - barTopY + 10}
                        fill="#7c3aed"
                        fillOpacity="0.15"
                        stroke="#a855f7"
                        strokeWidth="1"
                        strokeDasharray="4,2"
                      />
                      <text x={barRight + 20} y={barTopY - 15} fill="#a78bfa" fontSize="9" textAnchor="middle">48" wing →</text>
                    </g>
                  )}

                  {/* Angle indicator */}
                  {barShape === 'angled' && (
                    <g>
                      <path
                        d={`M ${barRight - 10} ${barTopY + barThickPx/2}
                            L ${barRight + 30} ${barTopY + barThickPx/2 - 15}`}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        fill="none"
                      />
                      <text x={barRight + 15} y={barTopY - 8} fill="#a78bfa" fontSize="9" textAnchor="middle">30° angle</text>
                    </g>
                  )}

                  {/* Curve indicator */}
                  {barShape === 'curved' && (
                    <g>
                      <path
                        d={`M ${cabinetLeft - 10} ${barTopY + barThickPx/2}
                            Q ${(cabinetLeft + barRight)/2} ${barTopY - 20} ${barRight + 10} ${barTopY + barThickPx/2}`}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        fill="none"
                      />
                      <text x={(cabinetLeft + barRight)/2} y={barTopY - 25} fill="#a78bfa" fontSize="9" textAnchor="middle">+10" curve</text>
                    </g>
                  )}

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

                  {/* Cabinet shelves */}
                  <line x1={cabinetLeft + 3} y1={barTopY + 60} x2={stepX - 3} y2={barTopY + 60} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 110} x2={stepX - 3} y2={barTopY + 110} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 160} x2={stepX - 3} y2={barTopY + 160} stroke="#60a5fa" strokeWidth="0.5"/>

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

                  {/* Seating capacity badge */}
                  <g>
                    <rect x="320" y={kitchenFloorY - 40} width="60" height="24" rx="4" fill="#1e293b" stroke="#7c3aed" strokeWidth="1"/>
                    <text x="350" y={kitchenFloorY - 23} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600">
                      {barShape === 'l-shape' ? '4 seats' : barShape === 'curved' ? '4 seats' : '3 seats'}
                    </text>
                  </g>

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
                  <text x="30" y="42" fill="#64748b" fontSize="10">Shape variation • Same cabinet height</text>

                  {/* Shape callout */}
                  <g>
                    <line x1={barRight + 5} y1={barTopY + barThickPx/2} x2={barRight + 25} y2={barTopY + barThickPx/2} stroke="#fbbf24" strokeWidth="1"/>
                    <circle cx={barRight + 30} r="4" cy={barTopY + barThickPx/2} fill="#fbbf24"/>
                    <text x={barRight + 40} y={barTopY + barThickPx/2 + 4} fill="#fbbf24" fontSize="8" fontWeight="bold">
                      {barShape === 'l-shape' ? 'L-SHAPE' : barShape === 'angled' ? 'ANGLED' : 'CURVED'}
                    </text>
                  </g>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Plan View */}
        {showPlanView && (
          <div className="concept-panel">
            <div className="concept-title">Plan View (Bird's Eye)</div>
            <svg viewBox="0 0 420 200" style={{ width: '100%', background: '#0d1520', borderRadius: 6 }}>
              <defs>
                <pattern id={`${uniqueId}-grid2`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="420" height="200" fill={`url(#${uniqueId}-grid2)`}/>

              {(() => {
                const scale = 1.6;
                const barLength = config.barLength * scale;
                const barDepth = config.barDepth * scale;
                const startX = 60;
                const startY = 70;

                return (
                  <g>
                    {/* Living room label */}
                    <text x="210" y="20" textAnchor="middle" fill="#3b5a7a" fontSize="10">LIVING ROOM</text>
                    <text x="360" y="120" textAnchor="middle" fill="#3b5a7a" fontSize="10">KITCHEN</text>

                    {/* Step line */}
                    <line x1={startX} y1={startY + 25} x2={startX + barLength + 60} y2={startY + 25} stroke="#4a6a8a" strokeWidth="2" strokeDasharray="4,2"/>

                    {/* Bar shape based on selection */}
                    {barShape === 'l-shape' && (
                      <g>
                        {/* Main bar */}
                        <rect
                          x={startX}
                          y={startY}
                          width={barLength}
                          height={barDepth}
                          fill="#b45309"
                          stroke="#92400e"
                          strokeWidth="2"
                        />
                        {/* Wing */}
                        <rect
                          x={startX + barLength - barDepth}
                          y={startY + barDepth}
                          width={barDepth}
                          height={48 * scale}
                          fill="#b45309"
                          stroke="#92400e"
                          strokeWidth="2"
                        />
                        {/* Seating - main bar */}
                        {[0, 1, 2].map(i => (
                          <ellipse
                            key={`main${i}`}
                            cx={startX + 25 + i * 40}
                            cy={startY - 15}
                            rx="10"
                            ry="7"
                            fill="#4a6a8a"
                            opacity="0.6"
                          />
                        ))}
                        {/* Seating - wing */}
                        <ellipse
                          cx={startX + barLength + 15}
                          cy={startY + barDepth + 30}
                          rx="7"
                          ry="10"
                          fill="#4a6a8a"
                          opacity="0.6"
                        />
                        {/* Dimensions */}
                        <text x={startX + barLength/2} y={startY + barDepth + 15} textAnchor="middle" fill="#fbbf24" fontSize="9">84"</text>
                        <text x={startX + barLength + 25} y={startY + barDepth + 48*scale/2} fill="#fbbf24" fontSize="9">48"</text>
                      </g>
                    )}

                    {barShape === 'angled' && (
                      <g>
                        {/* First section */}
                        <rect
                          x={startX}
                          y={startY}
                          width={barLength * 0.5}
                          height={barDepth}
                          fill="#b45309"
                          stroke="#92400e"
                          strokeWidth="2"
                        />
                        {/* Angled section */}
                        <g transform={`rotate(-30, ${startX + barLength * 0.5}, ${startY + barDepth/2})`}>
                          <rect
                            x={startX + barLength * 0.5}
                            y={startY}
                            width={barLength * 0.5}
                            height={barDepth}
                            fill="#b45309"
                            stroke="#92400e"
                            strokeWidth="2"
                          />
                        </g>
                        {/* Seating */}
                        {[0, 1].map(i => (
                          <ellipse
                            key={`ang${i}`}
                            cx={startX + 25 + i * 40}
                            cy={startY - 15}
                            rx="10"
                            ry="7"
                            fill="#4a6a8a"
                            opacity="0.6"
                          />
                        ))}
                        <ellipse
                          cx={startX + barLength * 0.6 + 40}
                          cy={startY - 35}
                          rx="10"
                          ry="7"
                          fill="#4a6a8a"
                          opacity="0.6"
                          transform="rotate(-30)"
                        />
                        <text x={startX + barLength/2} y={startY + barDepth + 20} textAnchor="middle" fill="#a78bfa" fontSize="9">30° angle</text>
                      </g>
                    )}

                    {barShape === 'curved' && (
                      <g>
                        {/* Curved bar */}
                        <path
                          d={`M ${startX} ${startY + barDepth}
                              L ${startX} ${startY}
                              Q ${startX + barLength/2} ${startY - 15} ${startX + barLength} ${startY}
                              L ${startX + barLength} ${startY + barDepth}
                              Q ${startX + barLength/2} ${startY + barDepth + 5} ${startX} ${startY + barDepth}
                              Z`}
                          fill="#b45309"
                          stroke="#92400e"
                          strokeWidth="2"
                        />
                        {/* Seating around curve */}
                        {[0, 1, 2, 3].map(i => (
                          <ellipse
                            key={`curve${i}`}
                            cx={startX + 20 + i * 35}
                            cy={startY - 18 - (i === 1 || i === 2 ? 5 : 0)}
                            rx="10"
                            ry="7"
                            fill="#4a6a8a"
                            opacity="0.6"
                          />
                        ))}
                        <text x={startX + barLength/2} y={startY + barDepth + 20} textAnchor="middle" fill="#a78bfa" fontSize="9">+10" depth at center</text>
                      </g>
                    )}

                    {/* Labels */}
                    <text x="30" y="20" fill="#60a5fa" fontSize="12" fontWeight="600">PLAN VIEW</text>
                  </g>
                );
              })()}
            </svg>
          </div>
        )}

        {/* Key Features */}
        <div className="concept-panel">
          <div className="concept-title">Key Features</div>
          <div className="feature-list">
            <div className="feature-item">
              <h4>L-Shape Configuration</h4>
              <p>84" main bar + 48" wing into kitchen. 4 seats total. Creates intimate corner nook.</p>
            </div>
            <div className="feature-item">
              <h4>Angled Version</h4>
              <p>30° bend redirects bar toward room. Same length, more visual interest. 3 seats.</p>
            </div>
            <div className="feature-item">
              <h4>Curved Option</h4>
              <p>Gentle arc adds 10" depth at center. Softens visual line. 4 seats around curve.</p>
            </div>
            <div className="feature-item">
              <h4>Same Cabinet Height</h4>
              <p>All shapes maintain full 63.5" cabinet from bar top to LR floor. Only footprint changes.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>More seating capacity (especially L-shape)</li>
              <li>Creates defined conversation zones</li>
              <li>Corner seat for intimate chats</li>
              <li>Architectural interest and uniqueness</li>
              <li>Can wrap around existing features</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>More complex construction</li>
              <li>L-shape takes 48" into kitchen space</li>
              <li>Corner cabinet access can be awkward</li>
              <li>Longer countertop = more cost</li>
              <li>May crowd kitchen workspace</li>
            </ul>
          </div>
        </div>

        {/* Shape Comparison */}
        <div className="concept-panel">
          <div className="concept-title">Shape Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${barShape === 'l-shape' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>L-Shape</div>
              <div style={{ color: '#94a3b8' }}>84" + 48" wing. 4 seats. Creates separate prep zone. Needs ~48" clear in kitchen.</div>
            </div>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${barShape === 'angled' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Angled</div>
              <div style={{ color: '#94a3b8' }}>30° bend in bar. 3 seats. Minimal extra space. Creates visual interest.</div>
            </div>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${barShape === 'curved' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Curved</div>
              <div style={{ color: '#94a3b8' }}>Gentle arc, +10" at center. 4 seats. Softens line. Organic feel.</div>
            </div>
          </div>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#fbbf24', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> Instead of a straight 84" bar, explore shapes that create more
            seating and architectural interest. The L-shape adds a 48" wing extending into the kitchen
            for 4 seats and a cozy corner. The angled version introduces a 30° bend for visual drama.
            The curved option softens the bar's profile with a gentle arc. All maintain the full 63.5"
            cabinet height - only the footprint changes. Best for those wanting extra seating or
            a more dynamic room layout.
          </p>
        </div>
      </div>
    </div>
  );
}
