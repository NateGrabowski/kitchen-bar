import React, { useState } from 'react'

/**
 * Concept B6: Sliding Bar Section
 *
 * FEATURE VARIATION: A section of the bar top slides to reveal hidden
 * workspace, charging station, or storage beneath.
 *
 * Trade-offs:
 * - PRO: Hidden utility area when not in use
 * - PRO: Clean aesthetic - tech/mess concealed
 * - PRO: Dual-purpose: bar + workspace
 * - CON: Mechanical complexity (slides/tracks)
 * - CON: Reduced bar top strength in sliding section
 * - CON: Maintenance of slide mechanism
 */

export default function ConceptSlidingBar() {
  const [slidePosition, setSlidePosition] = useState(0) // 0 = closed, 100 = fully open
  const [revealContent, setRevealContent] = useState('charging') // 'charging', 'workspace', 'storage'

  // Fixed dimensions
  const stepHeight = 23.5
  const barTopFromKitchen = 40
  const totalDepth = 28
  const cabinetDepth = 12
  const kneeSpace = 16
  const barTopThickness = 1.5
  const slideSectionWidth = 24 // 24" sliding section

  // SVG setup
  const scale = 2.4
  const padding = 60
  const width = 600
  const height = 400

  // Position helpers
  const lrFloor = height - padding
  const kitchenFloor = lrFloor - (stepHeight * scale)
  const barTop = kitchenFloor - (barTopFromKitchen * scale)

  const leftEdge = padding + 80
  const rightEdge = leftEdge + (totalDepth * scale)
  const cabinetFace = leftEdge + (kneeSpace * scale)

  // Sliding section position (centered on bar)
  const slideStart = leftEdge + 10
  const slideWidth = slideSectionWidth * scale
  const slideOffset = (slidePosition / 100) * slideWidth * 0.8 // How far it slides

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
          B6: Sliding Bar Section
        </h1>
        <p style={{ color: '#a0a0a0', margin: '8px 0 0', fontSize: '14px' }}>
          Bar top slides to reveal hidden workspace, charging, or storage
        </p>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 20px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSlidePosition(0)}
            style={{
              padding: '8px 16px',
              background: slidePosition === 0 ? '#3b82f6' : '#1e3a5f',
              color: '#fff',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Closed
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={slidePosition}
            onChange={(e) => setSlidePosition(Number(e.target.value))}
            style={{ width: '150px' }}
          />
          <button
            onClick={() => setSlidePosition(100)}
            style={{
              padding: '8px 16px',
              background: slidePosition === 100 ? '#10b981' : '#1e3a5f',
              color: '#fff',
              border: '1px solid #10b981',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Open
          </button>
        </div>

        <label style={{ color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Reveals:
          <select
            value={revealContent}
            onChange={(e) => setRevealContent(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px' }}
          >
            <option value="charging">Charging Station (USB/outlets)</option>
            <option value="workspace">Workspace (cutting board slot)</option>
            <option value="storage">Hidden Storage (valuables)</option>
          </select>
        </label>
      </div>

      {/* Main SVG */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width={width} height={height} style={{ background: '#0d1b2a', borderRadius: '12px' }}>
          <defs>
            <pattern id="wood-slide" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#8B7355"/>
              <line x1="0" y1="5" x2="20" y2="5" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
              <line x1="0" y1="15" x2="20" y2="15" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
            </pattern>

            <pattern id="wood-slide-light" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#a08060"/>
              <line x1="0" y1="5" x2="20" y2="5" stroke="#8a7050" strokeWidth="1" opacity="0.5"/>
              <line x1="0" y1="15" x2="20" y2="15" stroke="#8a7050" strokeWidth="1" opacity="0.5"/>
            </pattern>

            <linearGradient id="metal-track" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b7280"/>
              <stop offset="50%" stopColor="#9ca3af"/>
              <stop offset="100%" stopColor="#6b7280"/>
            </linearGradient>

            <linearGradient id="cabinet-slide" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8e0d5"/>
              <stop offset="100%" stopColor="#d4ccc1"/>
            </linearGradient>

            <filter id="glow-green">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Floor lines */}
          <line x1={padding - 20} y1={lrFloor} x2={width - padding + 20} y2={lrFloor}
                stroke="#3d5a80" strokeWidth="2"/>
          <line x1={padding - 20} y1={kitchenFloor} x2={width - padding + 20} y2={kitchenFloor}
                stroke="#3d5a80" strokeWidth="2"/>

          {/* Cabinet structure */}
          <rect x={cabinetFace} y={barTop + (barTopThickness * scale)}
                width={(cabinetDepth * scale)}
                height={(barTopFromKitchen - barTopThickness + stepHeight) * scale}
                fill="url(#cabinet-slide)" stroke="#8b7355" strokeWidth="2"/>

          {/* Shaker door details */}
          <rect x={cabinetFace + 5} y={barTop + (barTopThickness * scale) + 5}
                width={(cabinetDepth * scale) - 10}
                height={(barTopFromKitchen - barTopThickness) * scale - 10}
                fill="none" stroke="#b8a890" strokeWidth="2"/>
          <rect x={cabinetFace + 5} y={kitchenFloor + 5}
                width={(cabinetDepth * scale) - 10}
                height={(stepHeight * scale) - 10}
                fill="none" stroke="#b8a890" strokeWidth="2"/>

          {/* STATIC bar top sections (left and right of slide) */}
          <rect x={leftEdge} y={barTop}
                width={10} height={barTopThickness * scale}
                fill="url(#wood-slide)" stroke="#6b4423" strokeWidth="1"/>
          <rect x={leftEdge + 10 + slideWidth} y={barTop}
                width={(totalDepth * scale) - 10 - slideWidth} height={barTopThickness * scale}
                fill="url(#wood-slide)" stroke="#6b4423" strokeWidth="1"/>

          {/* Hidden compartment (revealed when open) */}
          <rect x={slideStart} y={barTop + (barTopThickness * scale)}
                width={slideWidth} height={20}
                fill="#1a1a2a" stroke="#333" strokeWidth="1"/>

          {/* Content inside compartment */}
          {slidePosition > 20 && (
            <g opacity={Math.min(1, (slidePosition - 20) / 50)}>
              {revealContent === 'charging' && (
                <g>
                  {/* USB ports */}
                  <rect x={slideStart + 10} y={barTop + (barTopThickness * scale) + 4}
                        width="12" height="8" fill="#333" stroke="#10b981" strokeWidth="1"/>
                  <rect x={slideStart + 10 + 2} y={barTop + (barTopThickness * scale) + 6}
                        width="8" height="4" fill="#10b981"/>
                  <rect x={slideStart + 30} y={barTop + (barTopThickness * scale) + 4}
                        width="12" height="8" fill="#333" stroke="#10b981" strokeWidth="1"/>
                  <rect x={slideStart + 30 + 2} y={barTop + (barTopThickness * scale) + 6}
                        width="8" height="4" fill="#10b981"/>

                  {/* Power outlet */}
                  <rect x={slideStart + slideWidth - 30} y={barTop + (barTopThickness * scale) + 3}
                        width="20" height="12" rx="2" fill="#f5f5f5" stroke="#999"/>
                  <circle cx={slideStart + slideWidth - 24} cy={barTop + (barTopThickness * scale) + 7}
                          r="2" fill="#333"/>
                  <circle cx={slideStart + slideWidth - 16} cy={barTop + (barTopThickness * scale) + 7}
                          r="2" fill="#333"/>
                  <rect x={slideStart + slideWidth - 22} y={barTop + (barTopThickness * scale) + 11}
                        width="6" height="2" fill="#333"/>

                  {/* LED indicator */}
                  <circle cx={slideStart + slideWidth / 2} cy={barTop + (barTopThickness * scale) + 10}
                          r="3" fill="#10b981" filter="url(#glow-green)"/>

                  <text x={slideStart + slideWidth / 2} y={barTop + (barTopThickness * scale) + 35}
                        fill="#10b981" fontSize="9" textAnchor="middle">
                    USB-C + Outlets
                  </text>
                </g>
              )}

              {revealContent === 'workspace' && (
                <g>
                  {/* Cutting board slot */}
                  <rect x={slideStart + 5} y={barTop + (barTopThickness * scale) + 2}
                        width={slideWidth - 10} height="14" fill="#5a4a3a" stroke="#3d3020"/>
                  <text x={slideStart + slideWidth / 2} y={barTop + (barTopThickness * scale) + 12}
                        fill="#a08060" fontSize="8" textAnchor="middle">
                    cutting board slot
                  </text>
                  <text x={slideStart + slideWidth / 2} y={barTop + (barTopThickness * scale) + 35}
                        fill="#f59e0b" fontSize="9" textAnchor="middle">
                    Pull-out Prep Area
                  </text>
                </g>
              )}

              {revealContent === 'storage' && (
                <g>
                  {/* Lined compartment */}
                  <rect x={slideStart + 3} y={barTop + (barTopThickness * scale) + 2}
                        width={slideWidth - 6} height="15" fill="#2a2040" stroke="#4a3060"/>
                  {/* Velvet texture suggestion */}
                  <line x1={slideStart + 8} y1={barTop + (barTopThickness * scale) + 5}
                        x2={slideStart + slideWidth - 8} y2={barTop + (barTopThickness * scale) + 5}
                        stroke="#3a2850" strokeWidth="1"/>
                  <line x1={slideStart + 8} y1={barTop + (barTopThickness * scale) + 10}
                        x2={slideStart + slideWidth - 8} y2={barTop + (barTopThickness * scale) + 10}
                        stroke="#3a2850" strokeWidth="1"/>
                  <text x={slideStart + slideWidth / 2} y={barTop + (barTopThickness * scale) + 35}
                        fill="#a78bfa" fontSize="9" textAnchor="middle">
                    Lined Hidden Storage
                  </text>
                </g>
              )}
            </g>
          )}

          {/* Slide tracks (visible on sides) */}
          <rect x={slideStart - 2} y={barTop + 1}
                width="3" height={barTopThickness * scale - 2}
                fill="url(#metal-track)"/>
          <rect x={slideStart + slideWidth - 1} y={barTop + 1}
                width="3" height={barTopThickness * scale - 2}
                fill="url(#metal-track)"/>

          {/* SLIDING bar top section */}
          <g transform={`translate(${slideOffset}, 0)`}>
            <rect x={slideStart} y={barTop}
                  width={slideWidth} height={barTopThickness * scale}
                  fill="url(#wood-slide-light)" stroke="#6b4423" strokeWidth="2"/>

            {/* Finger pull groove */}
            <ellipse cx={slideStart + slideWidth / 2} cy={barTop + (barTopThickness * scale) / 2}
                     rx="15" ry="2" fill="#7a6040" opacity="0.6"/>

            {/* Arrow indicator when closed */}
            {slidePosition < 20 && (
              <g>
                <path d={`M ${slideStart + slideWidth / 2 - 8} ${barTop + (barTopThickness * scale) / 2}
                          L ${slideStart + slideWidth / 2 + 8} ${barTop + (barTopThickness * scale) / 2}
                          M ${slideStart + slideWidth / 2 + 4} ${barTop + (barTopThickness * scale) / 2 - 3}
                          L ${slideStart + slideWidth / 2 + 8} ${barTop + (barTopThickness * scale) / 2}
                          L ${slideStart + slideWidth / 2 + 4} ${barTop + (barTopThickness * scale) / 2 + 3}`}
                      fill="none" stroke="#4a3a2a" strokeWidth="1.5"/>
              </g>
            )}
          </g>

          {/* Knee space area */}
          <rect x={leftEdge} y={barTop + (barTopThickness * scale)}
                width={(kneeSpace * scale)} height={(barTopFromKitchen - barTopThickness) * scale}
                fill="none" stroke="#3d5a80" strokeWidth="1" strokeDasharray="4,4"/>

          {/* Labels */}
          <text x={padding} y={lrFloor - 5} fill="#6b7280" fontSize="11">
            Living Room Floor
          </text>
          <text x={padding} y={kitchenFloor - 5} fill="#6b7280" fontSize="11">
            Kitchen Floor
          </text>

          {/* Dimension: slide section */}
          <line x1={slideStart} y1={barTop - 15}
                x2={slideStart + slideWidth} y2={barTop - 15}
                stroke="#f59e0b" strokeWidth="1"/>
          <text x={slideStart + slideWidth / 2} y={barTop - 20}
                fill="#f59e0b" fontSize="10" textAnchor="middle">
            {slideSectionWidth}" sliding section
          </text>

          {/* Person silhouette */}
          <g transform={`translate(${leftEdge - 25}, ${kitchenFloor})`}>
            <ellipse cx="0" cy="-65" rx="8" ry="10" fill="#4a5568"/>
            <rect x="-10" y="-55" width="20" height="35" rx="5" fill="#4a5568"/>
            <rect x="-8" y="-20" width="6" height="25" fill="#4a5568"/>
            <rect x="2" y="-20" width="6" height="25" fill="#4a5568"/>
          </g>

          {/* Interaction hint */}
          <text x={width / 2} y={height - 25}
                fill="#60a5fa" fontSize="12" textAnchor="middle">
            {slidePosition < 50 ? "← Slide to reveal hidden compartment →" : "Hidden compartment revealed!"}
          </text>

          {/* Side section view label */}
          <text x={width - padding} y={padding - 10}
                fill="#6b7280" fontSize="11" textAnchor="end">
            Side Section View
          </text>
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
            <li>Hidden utility when not in use</li>
            <li>Clean aesthetic - tech cables concealed</li>
            <li>Dual-purpose surface</li>
            <li>Conversation piece / surprise factor</li>
            <li>Keeps charging clutter off counter</li>
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
            <li>Mechanical complexity (drawer slides)</li>
            <li>Seams visible in bar top</li>
            <li>Reduced strength in sliding section</li>
            <li>Maintenance of slide mechanism</li>
            <li>Electrical work for charging option</li>
          </ul>
        </div>

        <div style={{
          background: '#1f3d3d',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #2d5a5a'
        }}>
          <h3 style={{ color: '#60a5fa', margin: '0 0 12px', fontSize: '14px' }}>
            IMPLEMENTATION
          </h3>
          <p style={{ color: '#e0e0e0', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
            <strong>Mechanism:</strong> Heavy-duty drawer slides (100lb+ rated)<br/>
            <strong>Depth:</strong> 2-3" below bar top surface<br/>
            <strong>Electrical:</strong> Run conduit during framing if charging option<br/>
            <strong>Material:</strong> Lighter wood/composite for sliding piece
          </p>
        </div>
      </div>

      {/* Reveal Options */}
      <div style={{
        maxWidth: '900px',
        margin: '20px auto 0',
        background: '#1a2a3a',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #2d4a6a'
      }}>
        <h3 style={{ color: '#f0e6d3', margin: '0 0 12px', fontSize: '14px' }}>
          WHAT IT COULD REVEAL
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ color: '#a0a0a0', fontSize: '13px' }}>
            <strong style={{ color: '#10b981' }}>Charging Station</strong><br/>
            USB-C ports, standard outlets, cable management
          </div>
          <div style={{ color: '#a0a0a0', fontSize: '13px' }}>
            <strong style={{ color: '#f59e0b' }}>Workspace</strong><br/>
            Cutting board slot, prep area, laptop stand
          </div>
          <div style={{ color: '#a0a0a0', fontSize: '13px' }}>
            <strong style={{ color: '#a78bfa' }}>Hidden Storage</strong><br/>
            Valuables, documents, small items
          </div>
        </div>
      </div>
    </div>
  )
}
