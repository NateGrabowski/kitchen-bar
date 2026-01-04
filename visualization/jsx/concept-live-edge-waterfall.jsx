import React, { useId } from 'react';

/**
 * CONCEPT SKETCH: Live Edge + Waterfall
 *
 * KEY IDEA: Natural bark edge facing living room,
 * butcher block cascades down entire step face (63.5" waterfall)
 *
 * This is a CONCEPT SKETCH - simplified to show the one differentiating idea.
 */
export default function ConceptLiveEdgeWaterfall() {
  const uniqueId = useId();

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
          border-left: 3px solid #4ade80;
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
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, color: '#f1f5f9' }}>
            Concept: Live Edge + Waterfall
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>
            Natural bark edge facing living room • Material cascades down entire step face
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="concept-tag">Moderate Boldness</span>
            <span className="concept-tag">Farmhouse Fit</span>
            <span className="concept-tag bold">Statement Piece</span>
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
              {/* Wood grain pattern for live edge */}
              <pattern id={`${uniqueId}-woodgrain`} width="8" height="4" patternUnits="userSpaceOnUse">
                <path d="M 0 2 Q 4 0, 8 2" fill="none" stroke="#78350f" strokeWidth="0.5" opacity="0.4"/>
              </pattern>
              <linearGradient id={`${uniqueId}-glow`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
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

              // Live edge profile points (irregular natural edge on LR side)
              const liveEdgeVariation = [0, -3, -6, -4, -8, -5, -2, -7, -4, -1];

              return (
                <g>
                  {/* Room labels */}
                  <rect x="30" y={groundY} width={stepX - 30} height="40" fill="#1e3a5f"/>
                  <text x="100" y={groundY + 25} textAnchor="middle" fill="#3b5a7a" fontSize="11">LIVING ROOM</text>

                  <rect x={stepX} y={kitchenFloorY} width="220" height={groundY - kitchenFloorY + 40} fill="#234060"/>
                  <text x="330" y={kitchenFloorY + 20} textAnchor="middle" fill="#3b5a7a" fontSize="11">KITCHEN</text>

                  {/* WATERFALL: Butcher block cascading down entire step face */}
                  {/* This is the KEY DIFFERENTIATOR - 63.5" of continuous wood */}
                  <g>
                    {/* Top horizontal section */}
                    <rect
                      x={cabinetLeft}
                      y={barTopY}
                      width={barRight - cabinetLeft}
                      height={barThickPx}
                      fill="#b45309"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                    {/* Wood grain on top */}
                    <rect
                      x={cabinetLeft + 2}
                      y={barTopY + 2}
                      width={barRight - cabinetLeft - 4}
                      height={barThickPx - 4}
                      fill={`url(#${uniqueId}-woodgrain)`}
                    />

                    {/* LIVE EDGE - irregular natural edge on LR side */}
                    <path
                      d={`M ${cabinetLeft} ${barTopY}
                          ${liveEdgeVariation.map((v, i) =>
                            `L ${cabinetLeft + v} ${barTopY + (barThickPx / 10) * i}`
                          ).join(' ')}
                          L ${cabinetLeft - 5} ${barTopY + barThickPx}
                          `}
                      fill="#78350f"
                      stroke="#5c2d0a"
                      strokeWidth="1"
                    />
                    {/* Bark texture indicator */}
                    <text x={cabinetLeft - 25} y={barTopY + barThickPx/2} fill="#92400e" fontSize="8" textAnchor="end">bark</text>
                    <text x={cabinetLeft - 25} y={barTopY + barThickPx/2 + 10} fill="#92400e" fontSize="8" textAnchor="end">edge</text>

                    {/* Vertical waterfall section - FULL HEIGHT to LR floor */}
                    <rect
                      x={cabinetLeft - 5}
                      y={barTopY + barThickPx}
                      width={barThickPx + 5}
                      height={groundY - barTopY - barThickPx}
                      fill="#b45309"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                    {/* Wood grain on waterfall */}
                    <g>
                      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150].map((offset, i) => (
                        <line
                          key={i}
                          x1={cabinetLeft - 3}
                          y1={barTopY + barThickPx + offset}
                          x2={cabinetLeft + barThickPx}
                          y2={barTopY + barThickPx + offset + 3}
                          stroke="#78350f"
                          strokeWidth="0.5"
                          opacity="0.4"
                        />
                      ))}
                    </g>

                    {/* Live edge on waterfall vertical (continues down) */}
                    <path
                      d={`M ${cabinetLeft - 5} ${barTopY + barThickPx}
                          L ${cabinetLeft - 8} ${barTopY + barThickPx + 30}
                          L ${cabinetLeft - 4} ${barTopY + barThickPx + 60}
                          L ${cabinetLeft - 9} ${barTopY + barThickPx + 90}
                          L ${cabinetLeft - 5} ${barTopY + barThickPx + 120}
                          L ${cabinetLeft - 7} ${barTopY + barThickPx + 150}
                          L ${cabinetLeft - 5} ${groundY}
                          `}
                      fill="#78350f"
                      stroke="#5c2d0a"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Cabinet body (behind waterfall) */}
                  <rect
                    x={cabinetLeft + barThickPx + 3}
                    y={barTopY + barThickPx + 5}
                    width={cabinetDepthPx - barThickPx - 6}
                    height={groundY - barTopY - barThickPx - 10}
                    fill="#2d4a6a"
                    stroke="#60a5fa"
                    strokeWidth="1"
                  />
                  {/* Cabinet shelves */}
                  <line x1={cabinetLeft + barThickPx + 6} y1={barTopY + 50} x2={stepX - 3} y2={barTopY + 50} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + barThickPx + 6} y1={barTopY + 95} x2={stepX - 3} y2={barTopY + 95} stroke="#60a5fa" strokeWidth="0.5"/>
                  <line x1={cabinetLeft + barThickPx + 6} y1={barTopY + 140} x2={stepX - 3} y2={barTopY + 140} stroke="#60a5fa" strokeWidth="0.5"/>

                  {/* Under-cabinet lighting glow */}
                  <rect
                    x={cabinetLeft + barThickPx + 8}
                    y={barTopY + barThickPx + 8}
                    width={cabinetDepthPx - barThickPx - 16}
                    height="20"
                    fill={`url(#${uniqueId}-glow)`}
                  />

                  {/* Step face (kitchen floor edge) */}
                  <line x1={stepX} y1={groundY} x2={stepX} y2={kitchenFloorY} stroke="#60a5fa" strokeWidth="2"/>

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
                  {/* Waterfall height callout - THE KEY NUMBER */}
                  <g>
                    <line x1={cabinetLeft - 45} y1={barTopY} x2={cabinetLeft - 45} y2={groundY} stroke="#f472b6" strokeWidth="2"/>
                    <line x1={cabinetLeft - 55} y1={barTopY} x2={cabinetLeft - 35} y2={barTopY} stroke="#f472b6" strokeWidth="2"/>
                    <line x1={cabinetLeft - 55} y1={groundY} x2={cabinetLeft - 35} y2={groundY} stroke="#f472b6" strokeWidth="2"/>
                    <rect x={cabinetLeft - 80} y={(barTopY + groundY) / 2 - 12} width="50" height="24" fill="#f472b6" rx="4"/>
                    <text x={cabinetLeft - 55} y={(barTopY + groundY) / 2 + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">63.5"</text>
                    <text x={cabinetLeft - 55} y={(barTopY + groundY) / 2 + 28} textAnchor="middle" fill="#f472b6" fontSize="9">waterfall</text>
                  </g>

                  {/* Step height */}
                  <g>
                    <line x1="165" y1={groundY} x2="165" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="160" y1={groundY} x2="170" y2={groundY} stroke="#fb923c" strokeWidth="1"/>
                    <line x1="160" y1={kitchenFloorY} x2="170" y2={kitchenFloorY} stroke="#fb923c" strokeWidth="1"/>
                    <text x="155" y={(groundY + kitchenFloorY) / 2 + 4} textAnchor="end" fill="#fb923c" fontSize="10" fontFamily="monospace">23.5"</text>
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
                  <text x="30" y="42" fill="#64748b" fontSize="10">Live edge faces living room • Waterfall to floor</text>
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
              <h4>Live Edge (Natural Bark)</h4>
              <p>Irregular natural edge faces living room. Each slab is one-of-a-kind. Conversation starter.</p>
            </div>
            <div className="feature-item">
              <h4>63.5" Waterfall</h4>
              <p>Butcher block cascades from bar top to LR floor. Uses your step height as dramatic feature.</p>
            </div>
            <div className="feature-item">
              <h4>Material Continuity</h4>
              <p>Single wood species flows top-to-bottom. Mitered corners hide seams. Unified look.</p>
            </div>
            <div className="feature-item">
              <h4>Farmhouse Modern</h4>
              <p>Natural wood = rustic. Clean lines = modern. Perfect for the aesthetic.</p>
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#4ade80' }}>Pros</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Truly unique - no two slabs are identical</li>
              <li>Leverages 23.5" step as dramatic feature</li>
              <li>Still butcher block (your preference)</li>
              <li>White oak or walnut fits farmhouse modern</li>
              <li>Natural edge hides minor imperfections</li>
            </ul>
          </div>
          <div className="concept-panel">
            <div className="concept-title" style={{ color: '#fb923c' }}>Cons</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Custom slab sourcing required</li>
              <li>More expensive than standard butcher block</li>
              <li>Mitered waterfall needs skilled fabrication</li>
              <li>63.5" vertical = significant wood cost</li>
              <li>Live edge may catch crumbs/debris</li>
            </ul>
          </div>
        </div>

        {/* Material Notes */}
        <div className="concept-panel">
          <div className="concept-title">Material Options</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, fontSize: 12 }}>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>White Oak (Recommended)</div>
              <div style={{ color: '#94a3b8' }}>Light color, prominent grain. $800-$2,500 for slab.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Walnut</div>
              <div style={{ color: '#94a3b8' }}>Rich dark tones. More dramatic. $1,200-$3,500.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Cherry</div>
              <div style={{ color: '#94a3b8' }}>Warm reddish, ages beautifully. $1,000-$2,800.</div>
            </div>
            <div style={{ background: '#0d1520', padding: 12, borderRadius: 6 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>Spalted Maple</div>
              <div style={{ color: '#94a3b8' }}>Wild black streaking. Very unique. $1,500-$4,000.</div>
            </div>
          </div>
        </div>

        {/* Concept Summary */}
        <div className="concept-panel" style={{ borderColor: '#4ade80', borderWidth: 2 }}>
          <div className="concept-title">Concept Summary</div>
          <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            <strong>The idea:</strong> Take your 23.5" step height—normally a constraint—and make it the hero.
            A live edge slab with natural bark facing the living room becomes a 63.5" statement piece
            cascading from bar top to floor. Every guest will notice it. It's farmhouse (natural wood)
            meets modern (clean waterfall lines). Still uses butcher block as you prefer, just in a
            more dramatic form.
          </p>
        </div>
      </div>
    </div>
  );
}
