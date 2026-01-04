import React, { useState } from 'react'

/**
 * Concept C6: Angled/L-Shape Bar
 *
 * STRUCTURAL VARIATION: Bar shape changes from straight 84" to angled or L-shaped.
 * Creates different traffic flow and conversation dynamics.
 *
 * Trade-offs:
 * - PRO: More seating capacity (wrap-around)
 * - PRO: Defines space differently, creates zones
 * - PRO: Corner seating for intimate conversation
 * - CON: More complex construction
 * - CON: Requires more floor space
 * - CON: Cabinet access may be awkward in corner
 */

export default function ConceptAngledBar() {
  const [barShape, setBarShape] = useState('l-shape') // 'l-shape', 'angled', 'curved'

  // Fixed dimensions (in inches, for display)
  const mainLength = 84
  const wingLength = 48 // L-shape extension
  const barDepth = 28
  const angleAmount = 30 // degrees for angled version

  // SVG setup - plan view (bird's eye)
  const scale = 4
  const padding = 80
  const width = 600
  const height = 500

  // Kitchen area (upper portion of view)
  const kitchenY = padding
  const stepEdgeY = height - padding - 100

  // Bar position
  const barStartX = padding + 60

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
        <h1 style={{ color: '#f0e6d3', margin: 0, fontSize: '28px' }}>
          C6: Angled / L-Shape Bar
        </h1>
        <p style={{ color: '#a0a0a0', margin: '8px 0 0', fontSize: '14px' }}>
          Plan View (Bird's Eye) - Bar wraps or angles instead of straight 84"
        </p>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 20px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <label style={{ color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Bar Shape:
          <select
            value={barShape}
            onChange={(e) => setBarShape(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px' }}
          >
            <option value="l-shape">L-Shape (84" + 48" wing)</option>
            <option value="angled">Angled (30° bend)</option>
            <option value="curved">Gentle Curve</option>
          </select>
        </label>
      </div>

      {/* Main SVG - Plan View */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width={width} height={height} style={{ background: '#0d1b2a', borderRadius: '12px' }}>
          <defs>
            <pattern id="wood-plan" patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill="#8B7355"/>
              <line x1="0" y1="4" x2="8" y2="4" stroke="#7a6548" strokeWidth="0.5" opacity="0.5"/>
            </pattern>

            <pattern id="tile-kitchen" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#2a3a4a"/>
              <rect x="0" y="0" width="19" height="19" fill="#243444"/>
            </pattern>

            <pattern id="floor-lr" patternUnits="userSpaceOnUse" width="30" height="30">
              <rect width="30" height="30" fill="#1a2a3a"/>
              <rect x="0" y="0" width="15" height="30" fill="#1e2e3e"/>
            </pattern>

            <linearGradient id="cabinet-plan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8e0d5"/>
              <stop offset="100%" stopColor="#d4ccc1"/>
            </linearGradient>
          </defs>

          {/* Kitchen floor area */}
          <rect x={padding - 20} y={kitchenY - 20}
                width={width - padding * 2 + 40} height={stepEdgeY - kitchenY + 10}
                fill="url(#tile-kitchen)"/>
          <text x={padding} y={kitchenY + 15} fill="#6b7280" fontSize="12">
            KITCHEN (higher)
          </text>

          {/* Living room floor area */}
          <rect x={padding - 20} y={stepEdgeY + 10}
                width={width - padding * 2 + 40} height={height - stepEdgeY - padding + 10}
                fill="url(#floor-lr)"/>
          <text x={padding} y={height - padding + 15} fill="#6b7280" fontSize="12">
            LIVING ROOM (lower)
          </text>

          {/* Step edge line */}
          <line x1={padding - 20} y1={stepEdgeY}
                x2={width - padding + 20} y2={stepEdgeY}
                stroke="#3d5a80" strokeWidth="3"/>
          <text x={width - padding - 60} y={stepEdgeY - 5}
                fill="#3d5a80" fontSize="10">
            23.5" step edge
          </text>

          {/* Render bar based on shape */}
          {barShape === 'l-shape' && (
            <g>
              {/* Main bar section (84" along step) */}
              <rect x={barStartX} y={stepEdgeY - barDepth * scale}
                    width={mainLength / scale * scale} height={barDepth * scale}
                    fill="url(#wood-plan)" stroke="#6b4423" strokeWidth="2"/>

              {/* Cabinet portion of main */}
              <rect x={barStartX + 16 * scale} y={stepEdgeY - 12 * scale}
                    width={(mainLength - 16) / scale * scale - 10} height={12 * scale}
                    fill="url(#cabinet-plan)" stroke="#8b7355" strokeWidth="1"/>

              {/* L-wing (extends into kitchen) */}
              <rect x={barStartX + mainLength / scale * scale - barDepth * scale}
                    y={stepEdgeY - barDepth * scale - wingLength / scale * scale}
                    width={barDepth * scale} height={wingLength / scale * scale}
                    fill="url(#wood-plan)" stroke="#6b4423" strokeWidth="2"/>

              {/* Cabinet portion of wing */}
              <rect x={barStartX + mainLength / scale * scale - 12 * scale}
                    y={stepEdgeY - barDepth * scale - wingLength / scale * scale + 10}
                    width={12 * scale} height={(wingLength - 28) / scale * scale}
                    fill="url(#cabinet-plan)" stroke="#8b7355" strokeWidth="1"/>

              {/* Seating positions */}
              {[0, 1, 2].map(i => (
                <g key={`seat-main-${i}`}>
                  <circle cx={barStartX + 30 + i * 70} cy={stepEdgeY - barDepth * scale - 30}
                          r="12" fill="#4a5568" stroke="#60a5fa" strokeWidth="2"/>
                  <text x={barStartX + 30 + i * 70} y={stepEdgeY - barDepth * scale - 26}
                        fill="#fff" fontSize="10" textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              ))}

              {/* Wing seating */}
              <g>
                <circle cx={barStartX + mainLength / scale * scale - barDepth * scale - 30}
                        cy={stepEdgeY - barDepth * scale - wingLength / scale * scale + 50}
                        r="12" fill="#4a5568" stroke="#10b981" strokeWidth="2"/>
                <text x={barStartX + mainLength / scale * scale - barDepth * scale - 30}
                      y={stepEdgeY - barDepth * scale - wingLength / scale * scale + 54}
                      fill="#fff" fontSize="10" textAnchor="middle">4</text>
              </g>

              {/* Dimensions */}
              <line x1={barStartX} y1={stepEdgeY + 20}
                    x2={barStartX + mainLength / scale * scale} y2={stepEdgeY + 20}
                    stroke="#60a5fa" strokeWidth="1"/>
              <text x={barStartX + mainLength / scale * scale / 2} y={stepEdgeY + 35}
                    fill="#60a5fa" fontSize="11" textAnchor="middle">
                {mainLength}" main section
              </text>

              <line x1={barStartX + mainLength / scale * scale + 20}
                    y1={stepEdgeY - barDepth * scale - wingLength / scale * scale}
                    x2={barStartX + mainLength / scale * scale + 20}
                    y2={stepEdgeY - barDepth * scale}
                    stroke="#10b981" strokeWidth="1"/>
              <text x={barStartX + mainLength / scale * scale + 25}
                    y={stepEdgeY - barDepth * scale - wingLength / scale * scale / 2}
                    fill="#10b981" fontSize="11">
                {wingLength}" wing
              </text>
            </g>
          )}

          {barShape === 'angled' && (
            <g>
              {/* First section (straight) */}
              <rect x={barStartX} y={stepEdgeY - barDepth * scale}
                    width={50 * scale} height={barDepth * scale}
                    fill="url(#wood-plan)" stroke="#6b4423" strokeWidth="2"/>

              {/* Angled section */}
              <g transform={`rotate(-${angleAmount}, ${barStartX + 50 * scale}, ${stepEdgeY - barDepth * scale / 2})`}>
                <rect x={barStartX + 50 * scale - 5}
                      y={stepEdgeY - barDepth * scale}
                      width={40 * scale} height={barDepth * scale}
                      fill="url(#wood-plan)" stroke="#6b4423" strokeWidth="2"/>
              </g>

              {/* Cabinet (simplified) */}
              <rect x={barStartX + 16 * scale} y={stepEdgeY - 12 * scale}
                    width={30 * scale} height={12 * scale}
                    fill="url(#cabinet-plan)" stroke="#8b7355" strokeWidth="1"/>

              {/* Seating */}
              {[0, 1].map(i => (
                <g key={`seat-${i}`}>
                  <circle cx={barStartX + 30 + i * 60} cy={stepEdgeY - barDepth * scale - 30}
                          r="12" fill="#4a5568" stroke="#60a5fa" strokeWidth="2"/>
                  <text x={barStartX + 30 + i * 60} y={stepEdgeY - barDepth * scale - 26}
                        fill="#fff" fontSize="10" textAnchor="middle">{i + 1}</text>
                </g>
              ))}

              {/* Angled section seat */}
              <circle cx={barStartX + 50 * scale + 50} cy={stepEdgeY - barDepth * scale - 80}
                      r="12" fill="#4a5568" stroke="#10b981" strokeWidth="2"/>
              <text x={barStartX + 50 * scale + 50} y={stepEdgeY - barDepth * scale - 76}
                    fill="#fff" fontSize="10" textAnchor="middle">3</text>

              {/* Angle indicator */}
              <path d={`M ${barStartX + 50 * scale} ${stepEdgeY - barDepth * scale / 2}
                        L ${barStartX + 50 * scale + 40} ${stepEdgeY - barDepth * scale / 2}
                        A 40 40 0 0 0 ${barStartX + 50 * scale + 40 * Math.cos(angleAmount * Math.PI / 180)}
                        ${stepEdgeY - barDepth * scale / 2 - 40 * Math.sin(angleAmount * Math.PI / 180)}`}
                    fill="none" stroke="#f59e0b" strokeWidth="2"/>
              <text x={barStartX + 50 * scale + 55} y={stepEdgeY - barDepth * scale / 2 - 10}
                    fill="#f59e0b" fontSize="11">{angleAmount}°</text>
            </g>
          )}

          {barShape === 'curved' && (
            <g>
              {/* Curved bar top */}
              <path d={`M ${barStartX} ${stepEdgeY}
                        L ${barStartX} ${stepEdgeY - barDepth * scale}
                        Q ${barStartX + mainLength / scale * scale / 2} ${stepEdgeY - barDepth * scale - 40}
                        ${barStartX + mainLength / scale * scale} ${stepEdgeY - barDepth * scale}
                        L ${barStartX + mainLength / scale * scale} ${stepEdgeY}
                        Q ${barStartX + mainLength / scale * scale / 2} ${stepEdgeY - 20}
                        ${barStartX} ${stepEdgeY}
                        Z`}
                    fill="url(#wood-plan)" stroke="#6b4423" strokeWidth="2"/>

              {/* Cabinet (follows curve roughly) */}
              <path d={`M ${barStartX + 16 * scale} ${stepEdgeY}
                        L ${barStartX + 16 * scale} ${stepEdgeY - 10 * scale}
                        Q ${barStartX + mainLength / scale * scale / 2} ${stepEdgeY - 10 * scale - 25}
                        ${barStartX + mainLength / scale * scale - 5} ${stepEdgeY - 10 * scale}
                        L ${barStartX + mainLength / scale * scale - 5} ${stepEdgeY}
                        Z`}
                    fill="url(#cabinet-plan)" stroke="#8b7355" strokeWidth="1"/>

              {/* Seating along curve */}
              {[0, 1, 2, 3].map(i => {
                const t = (i + 0.5) / 4
                const x = barStartX + t * mainLength / scale * scale
                const curveOffset = Math.sin(t * Math.PI) * 40
                return (
                  <g key={`seat-${i}`}>
                    <circle cx={x} cy={stepEdgeY - barDepth * scale - 30 - curveOffset}
                            r="12" fill="#4a5568" stroke="#60a5fa" strokeWidth="2"/>
                    <text x={x} y={stepEdgeY - barDepth * scale - 26 - curveOffset}
                          fill="#fff" fontSize="10" textAnchor="middle">{i + 1}</text>
                  </g>
                )
              })}

              {/* Curve depth indicator */}
              <line x1={barStartX + mainLength / scale * scale / 2}
                    y1={stepEdgeY - barDepth * scale}
                    x2={barStartX + mainLength / scale * scale / 2}
                    y2={stepEdgeY - barDepth * scale - 40}
                    stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2"/>
              <text x={barStartX + mainLength / scale * scale / 2 + 5}
                    y={stepEdgeY - barDepth * scale - 20}
                    fill="#f59e0b" fontSize="10">
                +10" curve depth
              </text>
            </g>
          )}

          {/* Baseline comparison (straight bar ghost) */}
          <rect x={barStartX} y={stepEdgeY - barDepth * scale}
                width={mainLength / scale * scale} height={barDepth * scale}
                fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="8,4" opacity="0.4"/>
          <text x={barStartX + mainLength / scale * scale + 5} y={stepEdgeY - barDepth * scale + 15}
                fill="#f59e0b" fontSize="9" opacity="0.6">
            baseline (straight)
          </text>

          {/* Legend */}
          <g transform="translate(420, 30)">
            <rect x="0" y="0" width="150" height="80" fill="#1a2a3a" stroke="#3d5a80" rx="4"/>
            <text x="10" y="18" fill="#e0e0e0" fontSize="11" fontWeight="bold">Seating Positions</text>
            <circle cx="20" cy="35" r="8" fill="#4a5568" stroke="#60a5fa" strokeWidth="2"/>
            <text x="35" y="39" fill="#a0a0a0" fontSize="10">Main bar (3 seats)</text>
            <circle cx="20" cy="55" r="8" fill="#4a5568" stroke="#10b981" strokeWidth="2"/>
            <text x="35" y="59" fill="#a0a0a0" fontSize="10">Wing/corner (+1 seat)</text>
          </g>

          {/* North arrow */}
          <g transform="translate(100, 60)">
            <polygon points="0,-20 -8,0 8,0" fill="#6b7280"/>
            <text x="0" y="15" fill="#6b7280" fontSize="10" textAnchor="middle">N</text>
          </g>
        </svg>
      </div>

      {/* Info Cards */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: '#1e3a5f',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #2d5a87'
        }}>
          <h3 style={{ color: '#10b981', margin: '0 0 12px', fontSize: '14px' }}>
            PROS
          </h3>
          <ul style={{ color: '#a0a0a0', margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
            <li>More seating capacity (4+ vs 3)</li>
            <li>Creates defined conversation zones</li>
            <li>Corner seat for intimate chats</li>
            <li>Architectural interest</li>
            <li>Can wrap around existing features</li>
          </ul>
        </div>

        <div style={{
          background: '#3d1f1f',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #5a2d2d'
        }}>
          <h3 style={{ color: '#ef4444', margin: '0 0 12px', fontSize: '14px' }}>
            CONS
          </h3>
          <ul style={{ color: '#a0a0a0', margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
            <li>More complex construction</li>
            <li>Takes more floor space (kitchen side)</li>
            <li>Corner cabinet access can be awkward</li>
            <li>More expensive materials (longer countertop)</li>
            <li>May crowd kitchen workspace</li>
          </ul>
        </div>

        <div style={{
          background: '#1f3d3d',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #2d5a5a'
        }}>
          <h3 style={{ color: '#60a5fa', margin: '0 0 12px', fontSize: '14px' }}>
            SPACE REQUIREMENT
          </h3>
          <p style={{ color: '#e0e0e0', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            <strong>L-Shape:</strong> Needs ~48" into kitchen for wing<br/>
            <strong>Angled:</strong> Minimal extra space, just direction change<br/>
            <strong>Curved:</strong> ~10" deeper at center point
          </p>
        </div>
      </div>
    </div>
  )
}
