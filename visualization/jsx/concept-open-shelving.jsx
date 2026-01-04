import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Open Shelving Display
 *
 * KEY IDEAS:
 * 1. Replace closed cabinets with open cubbies/shelves
 * 2. Display-focused - showcase barware, plants, decorative items
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptOpenShelving() {
  const uniqueId = useId();
  const [showContents, setShowContents] = useState(true);
  const [shelfStyle, setShelfStyle] = useState('cubbies'); // cubbies, floating, mixed

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
            Concept: Open Shelving Display
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Showcase your style • Visible storage as decor • Gallery-like presentation
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Moderate Boldness</span>
            <span className="concept-tag">Display Focus</span>
            <span className="concept-tag bold">Visual Interest</span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button className="toggle-btn" onClick={() => setShowContents(!showContents)}>
            {showContents ? 'Hide Contents' : 'Show Contents'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Shelf Style:</label>
            <select
              className="style-select"
              value={shelfStyle}
              onChange={e => setShelfStyle(e.target.value)}
            >
              <option value="cubbies">Grid Cubbies</option>
              <option value="floating">Floating Shelves</option>
              <option value="mixed">Mixed (Shelves + Cubbies)</option>
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

              // Calculate shelf/cubby layout
              const shelfAreaHeight = groundY - barTopY - barThickPx;
              const numRows = shelfStyle === 'floating' ? 4 : 3;
              const rowHeight = shelfAreaHeight / numRows;

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

                  {/* Open Shelving Structure */}
                  {/* Outer frame */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY + barThickPx}
                    width={cabinetDepthPx}
                    height={shelfAreaHeight}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />

                  {/* Shelves based on style */}
                  {shelfStyle === 'cubbies' && (
                    <g>
                      {/* Horizontal dividers */}
                      {[1, 2].map(i => (
                        <line
                          key={`h${i}`}
                          x1={cabinetLeft}
                          y1={barTopY + barThickPx + rowHeight * i}
                          x2={stepX}
                          y2={barTopY + barThickPx + rowHeight * i}
                          stroke="#4a6a8a"
                          strokeWidth="3"
                        />
                      ))}
                      {/* Vertical divider (center) */}
                      <line
                        x1={cabinetLeft + cabinetDepthPx / 2}
                        y1={barTopY + barThickPx}
                        x2={cabinetLeft + cabinetDepthPx / 2}
                        y2={groundY}
                        stroke="#4a6a8a"
                        strokeWidth="3"
                      />
                      {/* Contents in cubbies */}
                      {showContents && (
                        <g>
                          {/* Top left - bottles */}
                          <rect x={cabinetLeft + 4} y={barTopY + barThickPx + rowHeight - 35} width="8" height="30" fill="#92400e" rx="2"/>
                          <rect x={cabinetLeft + 14} y={barTopY + barThickPx + rowHeight - 40} width="8" height="35" fill="#7c3aed" rx="2"/>
                          {/* Top right - glasses */}
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 5} y={barTopY + barThickPx + rowHeight - 25} width="6" height="20" fill="none" stroke="#94a3b8" rx="1"/>
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 14} y={barTopY + barThickPx + rowHeight - 25} width="6" height="20" fill="none" stroke="#94a3b8" rx="1"/>
                          {/* Middle left - plant */}
                          <ellipse cx={cabinetLeft + 15} cy={barTopY + barThickPx + rowHeight * 1.5} rx="10" ry="8" fill="#22c55e" opacity="0.6"/>
                          <rect x={cabinetLeft + 10} y={barTopY + barThickPx + rowHeight * 1.5 + 5} width="10" height="15" fill="#92400e" rx="2"/>
                          {/* Middle right - books */}
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 3} y={barTopY + barThickPx + rowHeight * 2 - 30} width="5" height="25" fill="#3b82f6"/>
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 10} y={barTopY + barThickPx + rowHeight * 2 - 28} width="5" height="23" fill="#ef4444"/>
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 17} y={barTopY + barThickPx + rowHeight * 2 - 26} width="5" height="21" fill="#fbbf24"/>
                          {/* Bottom - larger items */}
                          <rect x={cabinetLeft + 5} y={groundY - 45} width="20" height="40" fill="#4a6a8a" rx="3"/>
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 5} y={groundY - 35} width="18" height="30" fill="#64748b" rx="3"/>
                        </g>
                      )}
                    </g>
                  )}

                  {shelfStyle === 'floating' && (
                    <g>
                      {/* Floating shelves (thinner, no dividers) */}
                      {[1, 2, 3].map(i => (
                        <rect
                          key={`f${i}`}
                          x={cabinetLeft}
                          y={barTopY + barThickPx + rowHeight * i - 3}
                          width={cabinetDepthPx}
                          height="6"
                          fill="#4a6a8a"
                          rx="1"
                        />
                      ))}
                      {/* Contents */}
                      {showContents && (
                        <g>
                          {/* Shelf 1 */}
                          <rect x={cabinetLeft + 5} y={barTopY + barThickPx + rowHeight - 35} width="8" height="28" fill="#92400e" rx="2"/>
                          <rect x={cabinetLeft + 15} y={barTopY + barThickPx + rowHeight - 30} width="6" height="23" fill="#7c3aed" rx="2"/>
                          {/* Shelf 2 */}
                          <ellipse cx={cabinetLeft + 12} cy={barTopY + barThickPx + rowHeight * 2 - 20} rx="8" ry="6" fill="#22c55e" opacity="0.6"/>
                          {/* Shelf 3 */}
                          <rect x={cabinetLeft + 5} y={barTopY + barThickPx + rowHeight * 3 - 25} width="5" height="20" fill="#3b82f6"/>
                          <rect x={cabinetLeft + 12} y={barTopY + barThickPx + rowHeight * 3 - 22} width="5" height="17" fill="#ef4444"/>
                          {/* Floor */}
                          <rect x={cabinetLeft + 5} y={groundY - 40} width="20" height="35" fill="#4a6a8a" rx="3"/>
                        </g>
                      )}
                    </g>
                  )}

                  {shelfStyle === 'mixed' && (
                    <g>
                      {/* Top section - floating shelves */}
                      <rect
                        x={cabinetLeft}
                        y={barTopY + barThickPx + rowHeight - 3}
                        width={cabinetDepthPx}
                        height="6"
                        fill="#4a6a8a"
                        rx="1"
                      />
                      {/* Bottom section - cubbies */}
                      <line
                        x1={cabinetLeft}
                        y1={barTopY + barThickPx + rowHeight * 2}
                        x2={stepX}
                        y2={barTopY + barThickPx + rowHeight * 2}
                        stroke="#4a6a8a"
                        strokeWidth="3"
                      />
                      <line
                        x1={cabinetLeft + cabinetDepthPx / 2}
                        y1={barTopY + barThickPx + rowHeight * 2}
                        x2={cabinetLeft + cabinetDepthPx / 2}
                        y2={groundY}
                        stroke="#4a6a8a"
                        strokeWidth="3"
                      />
                      {/* Contents */}
                      {showContents && (
                        <g>
                          {/* Top floating shelf */}
                          <rect x={cabinetLeft + 5} y={barTopY + barThickPx + rowHeight - 30} width="8" height="24" fill="#92400e" rx="2"/>
                          <rect x={cabinetLeft + 15} y={barTopY + barThickPx + rowHeight - 35} width="8" height="29" fill="#7c3aed" rx="2"/>
                          {/* Middle open area */}
                          <ellipse cx={cabinetLeft + 15} cy={barTopY + barThickPx + rowHeight * 1.5} rx="10" ry="8" fill="#22c55e" opacity="0.6"/>
                          {/* Bottom cubbies */}
                          <rect x={cabinetLeft + 5} y={groundY - 40} width="18" height="35" fill="#4a6a8a" rx="3"/>
                          <rect x={cabinetLeft + cabinetDepthPx/2 + 5} y={groundY - 35} width="16" height="30" fill="#64748b" rx="3"/>
                        </g>
                      )}
                    </g>
                  )}

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
                  <text x="30" y="42" fill="#64748b" fontSize="10">Open shelving • Display storage</text>

                  {/* Open shelving callout */}
                  <g>
                    <line x1={cabinetLeft - 15} y1={barTopY + 80} x2={cabinetLeft + 5} y2={barTopY + 80} stroke="#fbbf24" strokeWidth="1"/>
                    <circle cx={cabinetLeft - 20} r="4" cy={barTopY + 80} fill="#fbbf24"/>
                    <text x={cabinetLeft - 60} y={barTopY + 75} fill="#fbbf24" fontSize="8" fontWeight="bold">OPEN</text>
                    <text x={cabinetLeft - 60} y={barTopY + 85} fill="#fbbf24" fontSize="8" fontWeight="bold">SHELVES</text>
                  </g>
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

                  {/* Open shelf section outline (no fill - open!) */}
                  <rect
                    x={startX}
                    y={startY}
                    width={barLength}
                    height={config.cabinetDepth * scale}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeDasharray="6,3"
                  />

                  {/* Cubby dividers shown from above */}
                  {shelfStyle !== 'floating' && (
                    <g>
                      {[1, 2, 3, 4, 5].map(i => (
                        <line
                          key={i}
                          x1={startX + (barLength / 6) * i}
                          y1={startY}
                          x2={startX + (barLength / 6) * i}
                          y2={startY + config.cabinetDepth * scale}
                          stroke="#4a6a8a"
                          strokeWidth="2"
                        />
                      ))}
                    </g>
                  )}

                  {/* Display items visible from above */}
                  {showContents && (
                    <g>
                      <circle cx={startX + 20} cy={startY + 10} r="4" fill="#92400e"/>
                      <circle cx={startX + 50} cy={startY + 10} r="3" fill="#7c3aed"/>
                      <circle cx={startX + 80} cy={startY + 12} r="5" fill="#22c55e" opacity="0.6"/>
                      <rect x={startX + 105} y={startY + 6} width="8" height="10" fill="#3b82f6"/>
                      <circle cx={startX + barLength - 25} cy={startY + 10} r="4" fill="#fbbf24"/>
                    </g>
                  )}

                  <text x={startX + 10} y={startY + config.cabinetDepth * scale - 3} fill="#60a5fa" fontSize="8">open to LR</text>

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
              <h4>Open Display Storage</h4>
              <p>Visible shelving showcases barware, plants, books, decorative items. Living room becomes gallery.</p>
            </div>
            <div className="feature-item">
              <h4>Curated Visual Interest</h4>
              <p>Carefully arranged items create conversation pieces. Opportunity to express personal style.</p>
            </div>
            <div className="feature-item">
              <h4>Easy Access</h4>
              <p>No doors to open. Grab glasses, bottles, books directly. Great for entertaining flow.</p>
            </div>
            <div className="feature-item">
              <h4>Lighting Potential</h4>
              <p>LED strips on shelf undersides create dramatic display lighting. Highlight special items.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Visual interest from living room</li>
              <li>Showcase beautiful barware/decor</li>
              <li>Easy access - no doors to open</li>
              <li>Makes space feel more open</li>
              <li>Great for LED accent lighting</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Dust collection - regular cleaning needed</li>
              <li>Must keep items tidy (visible clutter)</li>
              <li>Can't hide messy/ugly items</li>
              <li>Less secure storage</li>
              <li>Requires curation discipline</li>
            </ul>
          </div>
        </div>

        {/* Shelf Style Comparison */}
        <div className="concept-panel">
          <div className="concept-title">Shelf Style Options</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${shelfStyle === 'cubbies' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Grid Cubbies</div>
              <div style={{ color: '#94a3b8' }}>Divided compartments. Organized look. Each item gets its own space. Classic mid-century feel.</div>
            </div>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${shelfStyle === 'floating' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Floating Shelves</div>
              <div style={{ color: '#94a3b8' }}>Clean horizontal lines. More flexible arrangement. Modern minimalist aesthetic.</div>
            </div>
            <div style={{
              background: '#0d1520',
              padding: 12,
              borderRadius: 6,
              borderLeft: `3px solid ${shelfStyle === 'mixed' ? '#4ade80' : '#4a6a8a'}`
            }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Mixed Style</div>
              <div style={{ color: '#94a3b8' }}>Best of both. Open shelves up top, cubbies below for larger items. Visual variety.</div>
            </div>
          </div>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#fbbf24', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> Replace traditional closed cabinets with open shelving that turns storage
            into display. Your beautiful glassware, plants, and curated objects become part of the living room
            aesthetic. It's a gallery approach to bar design - everything visible, everything intentional.
            Requires commitment to keeping things tidy and dust-free, but rewards you with visual interest
            and easy access. Pairs well with LED accent lighting for evening ambiance.
          </p>
        </div>
      </div>
    </div>
  );
}
