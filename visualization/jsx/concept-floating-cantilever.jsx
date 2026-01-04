import React, { useId, useState } from 'react';

/**
 * CONCEPT SKETCH: Floating Cantilever + Step Lighting
 *
 * KEY IDEAS:
 * 1. Bar appears to "float" - no visible posts, hidden steel support
 * 2. LED strip under step lip creates floating illusion
 * 3. Dramatic architectural statement
 *
 * This is a CONCEPT SKETCH - simplified to show the differentiating ideas.
 */
export default function ConceptFloatingCantilever() {
  const uniqueId = useId();
  const [lightsOn, setLightsOn] = useState(true);

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
          background: #dc262620;
          color: #f87171;
        }
        .concept-tag.very-bold {
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
          border-left: 3px solid #38bdf8;
        }
        .feature-item h4 {
          margin: 0 0 4px 0;
          font-size: 12px;
          color: #e2e8f0;
        }
        .feature-item p {
          margin: 0;
          font-size: 11px;
          color: '#94a3b8';
          line-height: 1.4;
        }
        .toggle-btn {
          background: ${lightsOn ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'linear-gradient(135deg, #374151, #4b5563)'};
          border: none;
          color: ${lightsOn ? '#0f172a' : '#9ca3af'};
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s;
        }
        .toggle-btn:hover {
          transform: scale(1.02);
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Concept: Floating Cantilever + Step Lighting
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Bar appears to hover • Hidden steel support • Dramatic LED step glow
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag very-bold">Very Bold</span>
            <span className="concept-tag bold">Architectural Statement</span>
            <span className="concept-tag">Modern Drama</span>
          </div>
        </div>

        {/* Interactive Toggle */}
        <div className="concept-panel" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="toggle-btn" onClick={() => setLightsOn(!lightsOn)}>
            {lightsOn ? 'Lights ON' : 'Lights OFF'}
          </button>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>
            {lightsOn ? 'LED strip creates "floating" illusion at night' : 'Daytime appearance - clean lines'}
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
              {/* LED glow effect */}
              <linearGradient id={`${uniqueId}-led-glow`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={lightsOn ? 0.8 : 0}/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </linearGradient>
              <filter id={`${uniqueId}-blur`}>
                <feGaussianBlur stdDeviation="4"/>
              </filter>
              {/* Steel bracket texture */}
              <linearGradient id={`${uniqueId}-steel`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#374151"/>
                <stop offset="50%" stopColor="#4b5563"/>
                <stop offset="100%" stopColor="#374151"/>
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

                  {/* LED STEP GLOW - This creates the "floating" illusion */}
                  {lightsOn && (
                    <g>
                      {/* Glow under step lip */}
                      <rect
                        x={cabinetLeft - 20}
                        y={kitchenFloorY - 8}
                        width={cabinetDepthPx + 25}
                        height="40"
                        fill={`url(#${uniqueId}-led-glow)`}
                        filter={`url(#${uniqueId}-blur)`}
                        style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
                      />
                      {/* LED strip indicator */}
                      <rect
                        x={cabinetLeft - 5}
                        y={kitchenFloorY - 3}
                        width={cabinetDepthPx + 8}
                        height="3"
                        fill="#fbbf24"
                        opacity="0.9"
                      />
                      {/* Floor reflection */}
                      <ellipse
                        cx={stepX - cabinetDepthPx/2}
                        cy={groundY + 5}
                        rx={cabinetDepthPx * 0.8}
                        ry="15"
                        fill="#fbbf24"
                        opacity="0.15"
                        filter={`url(#${uniqueId}-blur)`}
                      />
                    </g>
                  )}

                  {/* FLOATING BAR TOP - Clean, minimal */}
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
                    {/* Simple wood grain */}
                    {[0, 20, 40, 60].map((offset, i) => (
                      <line
                        key={i}
                        x1={cabinetLeft + 5 + offset}
                        y1={barTopY + 2}
                        x2={cabinetLeft + 5 + offset}
                        y2={barTopY + barThickPx - 2}
                        stroke="#78350f"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    ))}
                  </g>

                  {/* Cabinet body - CLEAN AND MINIMAL */}
                  <rect
                    x={cabinetLeft}
                    y={barTopY + barThickPx}
                    width={cabinetDepthPx}
                    height={kitchenFloorY - barTopY - barThickPx}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />

                  {/* NO VISIBLE POSTS - Key differentiator */}
                  {/* Hidden steel bracket system (shown as dashed) */}
                  <g opacity="0.5">
                    {/* Hidden bracket 1 */}
                    <rect
                      x={stepX - 8}
                      y={barTopY + barThickPx + 10}
                      width="6"
                      height={kitchenFloorY - barTopY - barThickPx - 15}
                      fill={`url(#${uniqueId}-steel)`}
                      stroke="#60a5fa"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x={stepX + 5} y={barTopY + 50} fill="#60a5fa" fontSize="8">hidden</text>
                    <text x={stepX + 5} y={barTopY + 60} fill="#60a5fa" fontSize="8">steel</text>
                  </g>

                  {/* Step face - clean panel */}
                  <rect
                    x={cabinetLeft}
                    y={kitchenFloorY}
                    width={cabinetDepthPx + 3}
                    height={groundY - kitchenFloorY}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />

                  {/* Clean cabinet doors (flush, handleless) */}
                  <line x1={cabinetLeft + 3} y1={barTopY + 45} x2={stepX - 3} y2={barTopY + 45} stroke="#475569" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + 3} y1={barTopY + 90} x2={stepX - 3} y2={barTopY + 90} stroke="#475569" strokeWidth="0.5"/>

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

                  {/* FLOATING CALLOUT */}
                  <g>
                    <text x="55" y={(barTopY + kitchenFloorY) / 2 - 10} fill="#38bdf8" fontSize="11" fontWeight="bold">NO</text>
                    <text x="55" y={(barTopY + kitchenFloorY) / 2 + 3} fill="#38bdf8" fontSize="11" fontWeight="bold">VISIBLE</text>
                    <text x="55" y={(barTopY + kitchenFloorY) / 2 + 16} fill="#38bdf8" fontSize="11" fontWeight="bold">POSTS</text>
                    <line x1="85" y1={(barTopY + kitchenFloorY) / 2} x2={cabinetLeft - 5} y2={(barTopY + kitchenFloorY) / 2} stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,2"/>
                  </g>

                  {/* LED callout */}
                  {lightsOn && (
                    <g>
                      <circle cx={cabinetLeft + 20} cy={kitchenFloorY - 15} r="15" fill="#fbbf24" opacity="0.2"/>
                      <text x={cabinetLeft - 35} y={kitchenFloorY - 20} fill="#fbbf24" fontSize="9" fontWeight="bold">LED</text>
                      <text x={cabinetLeft - 35} y={kitchenFloorY - 10} fill="#fbbf24" fontSize="9" fontWeight="bold">STRIP</text>
                    </g>
                  )}

                  {/* DIMENSIONS */}
                  {/* Step height */}
                  <g>
                    <line x1="160" y1={groundY} x2="160" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="155" y1={groundY} x2="165" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="155" y1={kitchenFloorY} x2="165" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <text x="150" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">23.5"</text>
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
                  <text x="30" y="42" fill="#64748b" fontSize="10">Floating appearance • Hidden steel • LED glow</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Front View - Shows clean lines */}
        <div className="concept-panel">
          <div className="concept-title">Front View (from Living Room)</div>
          <svg viewBox="0 0 420 220" style={{ width: '100%', background: '#0d1520', borderRadius: 6 }}>
            <defs>
              <pattern id={`${uniqueId}-grid2`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id={`${uniqueId}-led-front`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={lightsOn ? 0.6 : 0}/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <rect width="420" height="220" fill={`url(#${uniqueId}-grid2)`}/>

            {(() => {
              const scale = 1.4;
              const barLength = config.barLength * scale;
              const groundY = 200;
              const stepHeight = config.stepHeight * scale;
              const cabinetHeight = config.barTopHeight * scale;
              const startX = (420 - barLength) / 2;
              const barTopY = groundY - stepHeight - cabinetHeight;

              return (
                <g>
                  {/* Floor labels */}
                  <text x="30" y={groundY + 15} fill="#3b5a7a" fontSize="9">LR FLOOR</text>
                  <text x={startX + barLength + 10} y={groundY - stepHeight + 10} fill="#3b5a7a" fontSize="9">KITCHEN</text>

                  {/* LED glow from front */}
                  {lightsOn && (
                    <g>
                      <rect
                        x={startX - 10}
                        y={groundY - stepHeight - 10}
                        width={barLength + 20}
                        height="30"
                        fill={`url(#${uniqueId}-led-front)`}
                        filter={`url(#${uniqueId}-blur)`}
                      />
                      {/* LED strip line */}
                      <rect
                        x={startX}
                        y={groundY - stepHeight - 3}
                        width={barLength}
                        height="3"
                        fill="#fbbf24"
                        opacity="0.8"
                      />
                    </g>
                  )}

                  {/* Bar top */}
                  <rect
                    x={startX}
                    y={barTopY}
                    width={barLength}
                    height="8"
                    fill="#b45309"
                    stroke="#92400e"
                    strokeWidth="1"
                  />

                  {/* Cabinet face - CLEAN, FLUSH, HANDLELESS */}
                  <rect
                    x={startX}
                    y={barTopY + 8}
                    width={barLength}
                    height={groundY - barTopY - 8 - stepHeight}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />

                  {/* Subtle door divisions (push-to-open, no handles) */}
                  <line x1={startX + barLength * 0.33} y1={barTopY + 12} x2={startX + barLength * 0.33} y2={groundY - stepHeight - 5} stroke="#475569" strokeWidth="0.5"/>
                  <line x1={startX + barLength * 0.66} y1={barTopY + 12} x2={startX + barLength * 0.66} y2={groundY - stepHeight - 5} stroke="#475569" strokeWidth="0.5"/>

                  {/* Step face */}
                  <rect
                    x={startX}
                    y={groundY - stepHeight}
                    width={barLength}
                    height={stepHeight}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />

                  {/* Floor line */}
                  <line x1="20" y1={groundY} x2="400" y2={groundY} stroke="#3b5a7a" strokeWidth="1"/>

                  {/* CLEAN LINES callout */}
                  <g>
                    <rect x={startX + barLength/2 - 45} y={barTopY + 30} width="90" height="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" rx="3"/>
                    <text x={startX + barLength/2} y={barTopY + 45} textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">HANDLELESS</text>
                  </g>

                  {/* Dimensions */}
                  <g>
                    <line x1={startX} y1="30" x2={startX + barLength} y2="30" stroke="#fbbf24" strokeWidth="1"/>
                    <line x1={startX} y1="25" x2={startX} y2="35" stroke="#fbbf24" strokeWidth="1"/>
                    <line x1={startX + barLength} y1="25" x2={startX + barLength} y2="35" stroke="#fbbf24" strokeWidth="1"/>
                    <text x={startX + barLength/2} y="22" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">84" (7 ft)</text>
                  </g>

                  {/* Height dimension */}
                  <g>
                    <line x1={startX - 20} y1={groundY} x2={startX - 20} y2={barTopY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={startX - 25} y1={groundY} x2={startX - 15} y2={groundY} stroke="#4ade80" strokeWidth="1"/>
                    <line x1={startX - 25} y1={barTopY} x2={startX - 15} y2={barTopY} stroke="#4ade80" strokeWidth="1"/>
                    <text x={startX - 30} y={(groundY + barTopY) / 2 + 4} textAnchor="end" fill="#4ade80" fontSize="9" fontFamily="monospace">63.5"</text>
                  </g>

                  {/* Labels */}
                  <text x="30" y="20" fill="#60a5fa" fontSize="12" fontWeight="600">FRONT VIEW</text>
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
              <h4>Floating Appearance</h4>
              <p>No visible posts or corbels. Bar appears to hover over the step. Architectural drama.</p>
            </div>
            <div className="feature-item">
              <h4>Hidden Steel Support</h4>
              <p>Heavy-duty steel brackets inside cabinet. Rated 500+ lbs. Invisible from outside.</p>
            </div>
            <div className="feature-item">
              <h4>LED Step Lighting</h4>
              <p>Warm white LED strip under step lip. Creates floating illusion at night. Dimmable.</p>
            </div>
            <div className="feature-item">
              <h4>Handleless Cabinets</h4>
              <p>Push-to-open doors. Clean, uninterrupted surfaces. Modern minimalism.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Dramatic "wow factor" - people will notice</li>
              <li>Modern and clean lines</li>
              <li>LED lighting is affordable ($50-100)</li>
              <li>Makes space feel larger/lighter</li>
              <li>Evening ambiance is stunning</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Hidden brackets need precise installation</li>
              <li>May feel "too modern" for farmhouse?</li>
              <li>Handleless = harder to open when hands full</li>
              <li>LED wiring adds complexity</li>
              <li>Less "warm" than natural wood features</li>
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="concept-panel">
          <div className="concept-title">Technical Requirements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Hidden Steel Brackets</div>
              <div style={{ color: '#94a3b8' }}>Federal Brace or similar. Rated 500 lbs. 3-4 brackets for 84" span. ~$150-300 total.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>LED Strip (2700-3000K)</div>
              <div style={{ color: '#94a3b8' }}>Warm white for ambiance. Philips Hue or similar. Dimmable. ~$50-100.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Push-to-Open Hardware</div>
              <div style={{ color: '#94a3b8' }}>Blum TIP-ON or similar. ~$20-30 per door. Enables handleless design.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6, borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Cabinet Finish</div>
              <div style={{ color: '#94a3b8' }}>Matte charcoal or dark gray. Hides seams. Contrasts with wood top.</div>
            </div>
          </div>
        </div>

        {/* Farmhouse Compatibility Note */}
        <div className="concept-panel" style={{ borderColor: '#fb923c', borderWidth: 2 }}>
          <div className="concept-title" style={{ color: '#fb923c' }}>Farmhouse Compatibility Note</div>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
            This concept leans more "modern" than "farmhouse." To balance: use warm butcher block top
            (honey tone, not gray), warm white LEDs (2700K, not cool), and consider adding one farmhouse
            element like a shiplap step face or decorative corbel accent. The floating effect can work
            with farmhouse if the material palette stays warm.
          </p>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#38bdf8', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> Architecture as art. The bar appears to defy gravity—floating above
            the living room with no visible support. At night, LED strips under the step lip create a
            warm glow that makes the entire structure seem to hover. It's the most dramatic of the three
            concepts, a conversation starter that turns your 23.5" step challenge into a design feature.
            Less farmhouse, more architectural statement. For the homeowner who wants their bar to be
            a centerpiece.
          </p>
        </div>
      </div>
    </div>
  );
}
