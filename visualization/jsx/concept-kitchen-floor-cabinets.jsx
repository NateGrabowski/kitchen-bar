import React, { useState } from 'react'

/**
 * Concept C2: Kitchen-Floor Cabinets
 *
 * STRUCTURAL VARIATION: Standard cabinets sit on kitchen floor instead of
 * continuous cabinet to LR floor. The 23.5" step becomes decorative panel.
 *
 * Trade-offs:
 * - PRO: Can use pre-made/stock cabinets (30" or 36" standard heights)
 * - PRO: Simpler construction, easier installation
 * - CON: Wastes 23.5" of potential storage in step area
 * - CON: Step area becomes dead space or purely decorative
 */

export default function ConceptKitchenFloorCabinets() {
  const [showComparison, setShowComparison] = useState(false)
  const [cabinetHeight, setCabinetHeight] = useState(30) // 30" or 36" standard

  // Fixed dimensions
  const stepHeight = 23.5
  const barTopFromKitchen = 40
  const barLength = 84
  const totalDepth = 28
  const cabinetDepth = 12
  const kneeSpace = 16
  const barTopThickness = 1.5

  // Calculated
  const spaceAboveCabinet = barTopFromKitchen - barTopThickness - cabinetHeight

  // SVG setup
  const scale = 2.2
  const padding = 60
  const width = 500
  const height = 380

  // Position helpers
  const lrFloor = height - padding
  const kitchenFloor = lrFloor - (stepHeight * scale)
  const barTop = kitchenFloor - (barTopFromKitchen * scale)
  const cabinetTop = kitchenFloor - (cabinetHeight * scale)

  const leftEdge = padding + 40
  const rightEdge = leftEdge + (totalDepth * scale)
  const cabinetFace = leftEdge + (kneeSpace * scale)

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
          C2: Kitchen-Floor Cabinets
        </h1>
        <p style={{ color: '#a0a0a0', margin: '8px 0 0', fontSize: '14px' }}>
          Standard cabinets on kitchen floor - step becomes decorative panel
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
          <input
            type="checkbox"
            checked={showComparison}
            onChange={(e) => setShowComparison(e.target.checked)}
          />
          Show baseline comparison (ghost)
        </label>

        <label style={{ color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Cabinet Height:
          <select
            value={cabinetHeight}
            onChange={(e) => setCabinetHeight(Number(e.target.value))}
            style={{ padding: '4px 8px', borderRadius: '4px' }}
          >
            <option value={30}>30" (Standard Base)</option>
            <option value={36}>36" (Tall Base)</option>
          </select>
        </label>
      </div>

      {/* Main SVG */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width={width} height={height} style={{ background: '#0d1b2a', borderRadius: '12px' }}>
          <defs>
            <pattern id="wood-kfc" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#8B7355"/>
              <line x1="0" y1="5" x2="20" y2="5" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
              <line x1="0" y1="15" x2="20" y2="15" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
            </pattern>

            <linearGradient id="panel-kfc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a5568"/>
              <stop offset="50%" stopColor="#5a6578"/>
              <stop offset="100%" stopColor="#4a5568"/>
            </linearGradient>

            <linearGradient id="shaker-kfc" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8e0d5"/>
              <stop offset="100%" stopColor="#d4ccc1"/>
            </linearGradient>
          </defs>

          {/* Floor lines */}
          <line x1={padding} y1={lrFloor} x2={width - padding} y2={lrFloor}
                stroke="#3d5a80" strokeWidth="2"/>
          <line x1={padding} y1={kitchenFloor} x2={width - padding} y2={kitchenFloor}
                stroke="#3d5a80" strokeWidth="2"/>

          {/* Step (existing structure) */}
          <rect x={cabinetFace} y={kitchenFloor}
                width={(cabinetDepth * scale)} height={stepHeight * scale}
                fill="url(#panel-kfc)" stroke="#2d3748" strokeWidth="1"/>

          {/* Decorative panel on step face - this is what the step becomes */}
          <rect x={cabinetFace + 4} y={kitchenFloor + 8}
                width={(cabinetDepth * scale) - 8} height={(stepHeight * scale) - 16}
                fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,2"/>
          <text x={cabinetFace + (cabinetDepth * scale)/2} y={kitchenFloor + (stepHeight * scale)/2 + 4}
                fill="#9ca3af" fontSize="9" textAnchor="middle">
            decorative
          </text>
          <text x={cabinetFace + (cabinetDepth * scale)/2} y={kitchenFloor + (stepHeight * scale)/2 + 14}
                fill="#9ca3af" fontSize="9" textAnchor="middle">
            panel
          </text>

          {/* Cabinet on kitchen floor */}
          <rect x={cabinetFace} y={cabinetTop}
                width={(cabinetDepth * scale)} height={cabinetHeight * scale}
                fill="url(#shaker-kfc)" stroke="#8b7355" strokeWidth="2"/>

          {/* Shaker door detail */}
          <rect x={cabinetFace + 6} y={cabinetTop + 6}
                width={(cabinetDepth * scale) - 12} height={(cabinetHeight * scale) - 12}
                fill="none" stroke="#b8a890" strokeWidth="2"/>

          {/* Door handle */}
          <rect x={cabinetFace + (cabinetDepth * scale) - 14} y={cabinetTop + (cabinetHeight * scale)/2 - 10}
                width="4" height="20" rx="2" fill="#4a5568"/>

          {/* Gap above cabinet (if any) */}
          {spaceAboveCabinet > 0 && (
            <>
              <rect x={cabinetFace} y={barTop + (barTopThickness * scale)}
                    width={(cabinetDepth * scale)} height={spaceAboveCabinet * scale}
                    fill="#2d3748" stroke="#3d5a80" strokeWidth="1"/>
              <text x={cabinetFace + (cabinetDepth * scale)/2}
                    y={barTop + (barTopThickness * scale) + (spaceAboveCabinet * scale)/2 + 3}
                    fill="#6b7280" fontSize="8" textAnchor="middle">
                {spaceAboveCabinet.toFixed(1)}" gap
              </text>
            </>
          )}

          {/* Bar top */}
          <rect x={leftEdge} y={barTop}
                width={(totalDepth * scale)} height={barTopThickness * scale}
                fill="url(#wood-kfc)" stroke="#6b4423" strokeWidth="2"/>

          {/* Knee space indicator */}
          <line x1={leftEdge + 5} y1={kitchenFloor - 5}
                x2={cabinetFace - 5} y2={kitchenFloor - 5}
                stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,3"/>
          <text x={leftEdge + (kneeSpace * scale)/2} y={kitchenFloor - 10}
                fill="#60a5fa" fontSize="9" textAnchor="middle">
            {kneeSpace}" knee space
          </text>

          {/* Baseline comparison (ghost) */}
          {showComparison && (
            <g opacity="0.3">
              {/* Ghost of continuous cabinet */}
              <rect x={cabinetFace} y={barTop + (barTopThickness * scale)}
                    width={(cabinetDepth * scale)}
                    height={(barTopFromKitchen - barTopThickness + stepHeight) * scale}
                    fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4"/>
              <text x={cabinetFace + (cabinetDepth * scale) + 8}
                    y={kitchenFloor + (stepHeight * scale)/2}
                    fill="#f59e0b" fontSize="10">
                Baseline: 63.5" cabinet
              </text>
            </g>
          )}

          {/* Dimension annotations */}
          {/* Step height */}
          <line x1={rightEdge + 15} y1={kitchenFloor} x2={rightEdge + 15} y2={lrFloor}
                stroke="#9ca3af" strokeWidth="1"/>
          <text x={rightEdge + 20} y={kitchenFloor + (stepHeight * scale)/2 + 4}
                fill="#9ca3af" fontSize="10">
            {stepHeight}" step
          </text>

          {/* Cabinet height */}
          <line x1={rightEdge + 45} y1={cabinetTop} x2={rightEdge + 45} y2={kitchenFloor}
                stroke="#10b981" strokeWidth="1"/>
          <text x={rightEdge + 50} y={cabinetTop + (cabinetHeight * scale)/2 + 4}
                fill="#10b981" fontSize="10">
            {cabinetHeight}" cabinet
          </text>

          {/* Bar height from kitchen */}
          <line x1={leftEdge - 15} y1={barTop} x2={leftEdge - 15} y2={kitchenFloor}
                stroke="#60a5fa" strokeWidth="1"/>
          <text x={leftEdge - 20} y={barTop + (barTopFromKitchen * scale)/2}
                fill="#60a5fa" fontSize="10" textAnchor="end">
            {barTopFromKitchen}"
          </text>

          {/* Labels */}
          <text x={padding + 10} y={lrFloor - 5} fill="#6b7280" fontSize="11">
            Living Room Floor
          </text>
          <text x={padding + 10} y={kitchenFloor - 5} fill="#6b7280" fontSize="11">
            Kitchen Floor
          </text>

          {/* Person silhouette for scale */}
          <g transform={`translate(${leftEdge - 25}, ${kitchenFloor})`}>
            <ellipse cx="0" cy="-65" rx="8" ry="10" fill="#4a5568"/>
            <rect x="-10" y="-55" width="20" height="35" rx="5" fill="#4a5568"/>
            <rect x="-8" y="-20" width="6" height="25" fill="#4a5568"/>
            <rect x="2" y="-20" width="6" height="25" fill="#4a5568"/>
          </g>
        </svg>
      </div>

      {/* Comparison Stats */}
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
            <li>Use standard {cabinetHeight}" base cabinets (stock sizes)</li>
            <li>Simpler installation - no custom framing into step</li>
            <li>Easier to replace/upgrade cabinets later</li>
            <li>Lower cost if using pre-made cabinets</li>
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
            <li>Wastes {stepHeight}" of storage potential</li>
            <li>Step area = decorative only (dead space)</li>
            <li>Total storage: ~{Math.round(cabinetHeight * cabinetDepth * barLength / 1728)} cu.ft vs ~{Math.round(63.5 * cabinetDepth * barLength / 1728)} cu.ft baseline</li>
            <li>{spaceAboveCabinet > 0 ? `${spaceAboveCabinet.toFixed(1)}" gap above cabinet needs covering` : 'Cabinet meets bar top'}</li>
          </ul>
        </div>

        <div style={{
          background: '#1f3d3d',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #2d5a5a'
        }}>
          <h3 style={{ color: '#60a5fa', margin: '0 0 12px', fontSize: '14px' }}>
            KEY DIFFERENCE
          </h3>
          <p style={{ color: '#e0e0e0', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            Cabinets rest on <strong>kitchen floor</strong> (standard construction) instead of
            extending down to living room floor. The 23.5" step becomes a separate decorative
            element rather than integrated storage.
          </p>
        </div>
      </div>
    </div>
  )
}
