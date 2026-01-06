import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Sliding Bar Section
 *
 * KEY IDEAS:
 * 1. Section of bar top slides to reveal hidden compartment
 * 2. Can house charging station, workspace, or storage
 * 3. Clean aesthetic - utilities hidden when closed
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptSlidingBar() {
  const uniqueId = useId();
  const [slidePosition, setSlidePosition] = useState(0); // 0 = closed, 100 = open
  const [revealContent, setRevealContent] = useState('charging'); // 'charging', 'workspace', 'storage'

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
  const slideSectionWidth = 24; // 24" sliding section
  const isOpen = slidePosition > 50;

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
        .toggle-btn.open-btn {
          background: linear-gradient(135deg, #059669, #10b981);
        }
        .toggle-btn.open-btn:hover {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        .slide-select {
          background: #1e293b;
          color: #e2e8f0;
          border: 1px solid #3b82f6;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 13px;
          cursor: pointer;
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Concept: Sliding Bar Section
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Hidden compartment reveals charging, workspace, or storage • Clean when closed • Surprise factor
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Moderate Build</span>
            <span className="concept-tag">Tech-Friendly</span>
            <span className="concept-tag bold">Hidden Utility</span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button
            className={`toggle-btn ${isOpen ? '' : 'open-btn'}`}
            onClick={() => setSlidePosition(isOpen ? 0 : 100)}
          >
            {isOpen ? 'Close Slide' : 'Open Slide'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Reveals:</span>
            <select
              className="slide-select"
              value={revealContent}
              onChange={(e) => setRevealContent(e.target.value)}
            >
              <option value="charging">Charging Station</option>
              <option value="workspace">Prep Workspace</option>
              <option value="storage">Hidden Storage</option>
            </select>
          </div>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>
            {isOpen ? 'Compartment revealed!' : 'Click to see hidden compartment'}
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
              {/* Wood pattern for bar top */}
              <pattern id={`${uniqueId}-wood`} width="30" height="6" patternUnits="userSpaceOnUse">
                <rect width="30" height="6" fill="#b45309"/>
                <path d="M0,2 Q10,1 20,3 T30,2" fill="none" stroke="#92400e" strokeWidth="0.8" opacity="0.6"/>
              </pattern>
              {/* Lighter wood for sliding section */}
              <pattern id={`${uniqueId}-wood-slide`} width="30" height="6" patternUnits="userSpaceOnUse">
                <rect width="30" height="6" fill="#d97706"/>
                <path d="M0,2 Q10,1 20,3 T30,2" fill="none" stroke="#b45309" strokeWidth="0.8" opacity="0.5"/>
              </pattern>
              {/* Metal track gradient */}
              <linearGradient id={`${uniqueId}-track`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b7280"/>
                <stop offset="50%" stopColor="#9ca3af"/>
                <stop offset="100%" stopColor="#6b7280"/>
              </linearGradient>
              {/* Glow for LED */}
              <filter id={`${uniqueId}-glow`}>
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
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

              // Sliding section calculations
              const slideWidthPx = 24 * scale / 2; // Scaled for view
              const slideStartX = cabinetLeft + 15;
              const slideOffset = (slidePosition / 100) * slideWidthPx * 0.6;
              const compartmentDepth = 18;

              return (
                <g>
                  {/* Room labels */}
                  <rect x="30" y={groundY} width={stepX - 30} height="40" fill="#1e3a5f"/>
                  <text x="100" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="11">LIVING ROOM</text>

                  <rect x={stepX} y={kitchenFloorY} width="220" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                  <text x="330" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="11">KITCHEN</text>

                  {/* Bar top - static left section */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY}
                    width={15}
                    height={barThickPx}
                    fill={`url(#${uniqueId}-wood)`}
                    stroke="#92400e"
                    strokeWidth="1"
                  />

                  {/* Bar top - static right section */}
                  <rect
                    x={slideStartX + slideWidthPx}
                    y={barTopY}
                    width={barRight - slideStartX - slideWidthPx}
                    height={barThickPx}
                    fill={`url(#${uniqueId}-wood)`}
                    stroke="#92400e"
                    strokeWidth="1"
                  />

                  {/* Hidden compartment cavity (visible when sliding) */}
                  <rect
                    x={slideStartX}
                    y={barTopY + barThickPx}
                    width={slideWidthPx}
                    height={compartmentDepth}
                    fill="#0a0f18"
                    stroke="#1a2a3a"
                    strokeWidth="1"
                  />

                  {/* Compartment content (visible when open) */}
                  {slidePosition > 20 && (
                    <g opacity={Math.min(1, (slidePosition - 20) / 50)}>
                      {revealContent === 'charging' && (
                        <g>
                          {/* USB ports */}
                          <rect x={slideStartX + 6} y={barTopY + barThickPx + 4} width="10" height="6" fill="#1e1e1e" stroke="#10b981" strokeWidth="1" rx="1"/>
                          <rect x={slideStartX + 20} y={barTopY + barThickPx + 4} width="10" height="6" fill="#1e1e1e" stroke="#10b981" strokeWidth="1" rx="1"/>
                          {/* Power LED */}
                          <circle cx={slideStartX + slideWidthPx / 2} cy={barTopY + barThickPx + 12} r="3" fill="#10b981" filter={`url(#${uniqueId}-glow)`}/>
                        </g>
                      )}
                      {revealContent === 'workspace' && (
                        <g>
                          {/* Cutting board slot */}
                          <rect x={slideStartX + 4} y={barTopY + barThickPx + 3} width={slideWidthPx - 8} height="12" fill="#4a3828" stroke="#3d2d20" strokeWidth="1" rx="2"/>
                        </g>
                      )}
                      {revealContent === 'storage' && (
                        <g>
                          {/* Velvet-lined compartment */}
                          <rect x={slideStartX + 4} y={barTopY + barThickPx + 3} width={slideWidthPx - 8} height="12" fill="#2a1f40" stroke="#4a3060" strokeWidth="1" rx="2"/>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Metal slide tracks */}
                  <rect x={slideStartX - 2} y={barTopY + 2} width="3" height={barThickPx - 4} fill={`url(#${uniqueId}-track)`}/>
                  <rect x={slideStartX + slideWidthPx - 1} y={barTopY + 2} width="3" height={barThickPx - 4} fill={`url(#${uniqueId}-track)`}/>

                  {/* SLIDING bar top section */}
                  <g transform={`translate(${slideOffset}, 0)`}>
                    <rect
                      x={slideStartX}
                      y={barTopY}
                      width={slideWidthPx}
                      height={barThickPx}
                      fill={`url(#${uniqueId}-wood-slide)`}
                      stroke="#b45309"
                      strokeWidth="1.5"
                    />
                    {/* Finger pull groove */}
                    <ellipse cx={slideStartX + slideWidthPx / 2} cy={barTopY + barThickPx / 2} rx="12" ry="1.5" fill="#92400e" opacity="0.7"/>
                    {/* Arrow hint when closed */}
                    {slidePosition < 20 && (
                      <path
                        d={`M ${slideStartX + slideWidthPx / 2 - 6} ${barTopY + barThickPx / 2}
                            L ${slideStartX + slideWidthPx / 2 + 6} ${barTopY + barThickPx / 2}
                            M ${slideStartX + slideWidthPx / 2 + 3} ${barTopY + barThickPx / 2 - 2}
                            L ${slideStartX + slideWidthPx / 2 + 6} ${barTopY + barThickPx / 2}
                            L ${slideStartX + slideWidthPx / 2 + 3} ${barTopY + barThickPx / 2 + 2}`}
                        fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round"
                      />
                    )}
                  </g>

                  {/* Cabinet body with LR-facing doors */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY + barThickPx + compartmentDepth}
                    width={cabinetDepthPx}
                    height={groundY - barTopY - barThickPx - compartmentDepth}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />

                  {/* Cabinet shelves */}
                  <line x1={cabinetLeft + 3} y1={barTopY + 80} x2={stepX - 3} y2={barTopY + 80} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 130} x2={stepX - 3} y2={barTopY + 130} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 180} x2={stepX - 3} y2={barTopY + 180} stroke="#60a5fa" strokeWidth="0.5"/>

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

                  {/* Sliding section dimension */}
                  <g>
                    <line x1={slideStartX} y1={barTopY - 12} x2={slideStartX + slideWidthPx} y2={barTopY - 12} stroke="#0891b2" strokeWidth="1"/>
                    <line x1={slideStartX} y1={barTopY - 17} x2={slideStartX} y2={barTopY - 7} stroke="#0891b2" strokeWidth="1"/>
                    <line x1={slideStartX + slideWidthPx} y1={barTopY - 17} x2={slideStartX + slideWidthPx} y2={barTopY - 7} stroke="#0891b2" strokeWidth="1"/>
                    <text x={slideStartX + slideWidthPx / 2} y={barTopY - 2} textAnchor="middle" fill="#0891b2" fontSize="8" fontFamily="monospace">24" slide</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="25" fill="#60a5fa" fontSize="12" fontWeight="600">SIDE SECTION</text>
                  <text x="30" y="42" fill="#64748b" fontSize="10">Sliding bar section • Hidden compartment below</text>

                  {/* Slide callout */}
                  <g>
                    <line x1={slideStartX + slideWidthPx / 2 + slideOffset} y1={barTopY - 55} x2={slideStartX + slideWidthPx / 2 + slideOffset} y2={barTopY - 5} stroke="#fbbf24" strokeWidth="1"/>
                    <circle cx={slideStartX + slideWidthPx / 2 + slideOffset} cy={barTopY - 60} r="4" fill="#fbbf24"/>
                    <text x={slideStartX + slideWidthPx / 2 + slideOffset + 10} y={barTopY - 58} fill="#fbbf24" fontSize="9" fontWeight="bold">
                      {isOpen ? 'OPEN' : 'SLIDE'}
                    </text>
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

              const slideWidthPlan = 24 * scale;
              const slideStartPlan = startX + 15;
              const slideOffsetPlan = (slidePosition / 100) * 20;

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
                  {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
                    <line
                      key={i}
                      x1={startX + 5}
                      y1={startY + barDepth * t}
                      x2={startX + barLength - 5}
                      y2={startY + barDepth * t}
                      stroke="#92400e"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                  ))}

                  {/* Sliding section (different color) */}
                  <g transform={`translate(${slideOffsetPlan}, 0)`}>
                    <rect
                      x={slideStartPlan}
                      y={startY + 2}
                      width={slideWidthPlan}
                      height={barDepth - 4}
                      fill="#d97706"
                      stroke="#b45309"
                      strokeWidth="1.5"
                    />
                    {/* Finger pull */}
                    <ellipse
                      cx={slideStartPlan + slideWidthPlan / 2}
                      cy={startY + barDepth / 2}
                      rx="8"
                      ry="3"
                      fill="#92400e"
                      opacity="0.6"
                    />
                    {/* Arrow when closed */}
                    {slidePosition < 20 && (
                      <text
                        x={slideStartPlan + slideWidthPlan / 2}
                        y={startY + barDepth / 2 + 3}
                        textAnchor="middle"
                        fill="#78350f"
                        fontSize="10"
                      >
                        →
                      </text>
                    )}
                  </g>

                  {/* Revealed compartment */}
                  {slidePosition > 30 && (
                    <rect
                      x={slideStartPlan + 2}
                      y={startY + 4}
                      width={slideWidthPlan - 4}
                      height={barDepth - 8}
                      fill="#0a0f18"
                      stroke={revealContent === 'charging' ? '#10b981' : revealContent === 'workspace' ? '#f59e0b' : '#a78bfa'}
                      strokeWidth="1"
                      opacity={Math.min(1, (slidePosition - 30) / 50)}
                    />
                  )}

                  {/* Slide tracks */}
                  <line x1={slideStartPlan - 1} y1={startY} x2={slideStartPlan - 1} y2={startY + barDepth} stroke="#6b7280" strokeWidth="2"/>
                  <line x1={slideStartPlan + slideWidthPlan + 1} y1={startY} x2={slideStartPlan + slideWidthPlan + 1} y2={startY + barDepth} stroke="#6b7280" strokeWidth="2"/>

                  {/* Cabinet section */}
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

                  {/* Sliding section dimension */}
                  <g>
                    <line x1={slideStartPlan} y1={startY + barDepth + 45} x2={slideStartPlan + slideWidthPlan} y2={startY + barDepth + 45} stroke="#0891b2" strokeWidth="1"/>
                    <text x={slideStartPlan + slideWidthPlan / 2} y={startY + barDepth + 58} textAnchor="middle" fill="#0891b2" fontSize="9">24" sliding</text>
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
              <h4>24" Sliding Section</h4>
              <p>Portion of bar top slides on heavy-duty drawer slides (100lb+ rated). Reveals 2-3" deep compartment.</p>
            </div>
            <div className="feature-item">
              <h4>Charging Station Option</h4>
              <p>USB-C ports + standard outlets hidden below. Power LED indicator. Clean countertop when closed.</p>
            </div>
            <div className="feature-item">
              <h4>Prep Workspace Option</h4>
              <p>Pull-out cutting board slot. Secondary prep area. Keeps mess contained.</p>
            </div>
            <div className="feature-item">
              <h4>Hidden Storage Option</h4>
              <p>Velvet-lined compartment for valuables. Documents, remotes, "good stuff" hidden from view.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Hidden utility when not in use</li>
              <li>Clean aesthetic - cables/clutter concealed</li>
              <li>Dual-purpose surface</li>
              <li>Conversation starter / surprise factor</li>
              <li>Tech integration without visible outlets</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Visible seams in bar top</li>
              <li>Mechanical complexity (slides)</li>
              <li>Reduced strength in sliding section</li>
              <li>Slide mechanism needs maintenance</li>
              <li>Electrical work for charging option</li>
            </ul>
          </div>
        </div>

        {/* Reveal Options */}
        <div className="concept-panel">
          <div className="concept-title">What the Slide Can Reveal</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #10b981' }}>
              <div style={{ color: '#10b981', fontWeight: 500, marginBottom: 4 }}>Charging Station</div>
              <div style={{ color: '#94a3b8' }}>USB-C ports, standard outlets, cable management. Power indicator LED.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #f59e0b' }}>
              <div style={{ color: '#f59e0b', fontWeight: 500, marginBottom: 4 }}>Prep Workspace</div>
              <div style={{ color: '#94a3b8' }}>Cutting board slot, secondary prep area. Keeps mess hidden.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #a78bfa' }}>
              <div style={{ color: '#a78bfa', fontWeight: 500, marginBottom: 4 }}>Hidden Storage</div>
              <div style={{ color: '#94a3b8' }}>Velvet-lined compartment. Valuables, documents, remotes.</div>
            </div>
          </div>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#fbbf24', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> A 24" section of the butcher block bar top slides sideways on heavy-duty
            drawer slides to reveal a hidden compartment below. Choose between a charging station (USB-C + outlets),
            a prep workspace (cutting board slot), or velvet-lined hidden storage. When closed, the bar top looks
            seamless except for subtle seams. The lighter-colored sliding section adds visual contrast and includes
            a finger pull groove. Full cabinet storage is maintained below - only the top surface gains this hidden feature.
            Best for those who want tech integration without visible outlets, or a surprise element that keeps
            the bar looking clean when guests aren't there.
          </p>
        </div>
      </div>
    </div>
  );
}
