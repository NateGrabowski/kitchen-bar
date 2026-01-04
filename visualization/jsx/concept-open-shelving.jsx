import React, { useState } from 'react'

/**
 * Concept C4: Open Shelving Display
 *
 * STRUCTURAL VARIATION: Replace closed cabinets with open cubbies/shelves.
 * Same footprint as baseline, but visually lighter and farmhouse-friendly.
 *
 * Trade-offs:
 * - PRO: Lighter visual weight, more open feel
 * - PRO: Display space for books, decor, bar items
 * - PRO: Strong farmhouse aesthetic (open pantry style)
 * - CON: Dust accumulation on items
 * - CON: Requires curated/organized contents (clutter visible)
 * - CON: Less concealed storage
 */

export default function ConceptOpenShelving() {
  const [shelfStyle, setShelfStyle] = useState('cubbies') // 'cubbies', 'horizontal', 'mixed'
  const [showItems, setShowItems] = useState(true)

  // Fixed dimensions
  const stepHeight = 23.5
  const barTopFromKitchen = 40
  const totalDepth = 28
  const cabinetDepth = 12
  const kneeSpace = 16
  const barTopThickness = 1.5
  const totalCabinetHeight = barTopFromKitchen - barTopThickness + stepHeight // 63.5"

  // SVG setup
  const scale = 2.2
  const padding = 60
  const width = 520
  const height = 400

  // Position helpers
  const lrFloor = height - padding
  const kitchenFloor = lrFloor - (stepHeight * scale)
  const barTop = kitchenFloor - (barTopFromKitchen * scale)

  const leftEdge = padding + 50
  const rightEdge = leftEdge + (totalDepth * scale)
  const shelfFace = leftEdge + (kneeSpace * scale)
  const shelfWidth = cabinetDepth * scale
  const shelfUnitHeight = totalCabinetHeight * scale

  // Cubby configuration
  const cols = 3
  const rows = 4
  const cubbyWidth = (shelfWidth - 8) / cols
  const cubbyHeight = (shelfUnitHeight - 10) / rows

  // Decorative items for cubbies
  const items = [
    { type: 'books', color: '#8B4513' },
    { type: 'vase', color: '#4a7c59' },
    { type: 'bottles', color: '#2d5a4a' },
    { type: 'plant', color: '#228b22' },
    { type: 'basket', color: '#d4a574' },
    { type: 'jar', color: '#87ceeb' },
    { type: 'frame', color: '#333' },
    { type: 'candle', color: '#f5deb3' },
    { type: 'bowl', color: '#cd853f' },
    { type: 'wine', color: '#722f37' },
    { type: 'mug', color: '#e8e0d5' },
    { type: 'box', color: '#8b7355' },
  ]

  const renderItem = (item, x, y, w, h) => {
    const cx = x + w/2
    const cy = y + h/2

    switch(item.type) {
      case 'books':
        return (
          <g>
            <rect x={x + w*0.15} y={y + h*0.2} width={w*0.15} height={h*0.7} fill={item.color}/>
            <rect x={x + w*0.35} y={y + h*0.3} width={w*0.15} height={h*0.6} fill="#654321"/>
            <rect x={x + w*0.55} y={y + h*0.25} width={w*0.15} height={h*0.65} fill="#8b6914"/>
          </g>
        )
      case 'vase':
        return <ellipse cx={cx} cy={y + h*0.6} rx={w*0.25} ry={h*0.35} fill={item.color}/>
      case 'bottles':
        return (
          <g>
            <rect x={x + w*0.25} y={y + h*0.2} width={w*0.2} height={h*0.7} rx="3" fill={item.color}/>
            <rect x={x + w*0.55} y={y + h*0.3} width={w*0.2} height={h*0.6} rx="3" fill="#3d6a5a"/>
          </g>
        )
      case 'plant':
        return (
          <g>
            <rect x={cx - w*0.15} y={y + h*0.6} width={w*0.3} height={h*0.35} fill="#8b4513"/>
            <circle cx={cx - w*0.1} cy={y + h*0.45} r={w*0.12} fill={item.color}/>
            <circle cx={cx + w*0.1} cy={y + h*0.4} r={w*0.15} fill="#32cd32"/>
            <circle cx={cx} cy={y + h*0.5} r={w*0.1} fill={item.color}/>
          </g>
        )
      case 'basket':
        return <rect x={x + w*0.15} y={y + h*0.4} width={w*0.7} height={h*0.5} rx="4" fill={item.color}/>
      case 'wine':
        return (
          <g>
            <rect x={x + w*0.2} y={y + h*0.15} width={w*0.15} height={h*0.75} rx="2" fill={item.color}/>
            <rect x={x + w*0.4} y={y + h*0.2} width={w*0.15} height={h*0.7} rx="2" fill="#5a1f2a"/>
            <rect x={x + w*0.6} y={y + h*0.25} width={w*0.15} height={h*0.65} rx="2" fill={item.color}/>
          </g>
        )
      case 'jar':
        return (
          <g>
            <rect x={cx - w*0.2} y={y + h*0.25} width={w*0.4} height={h*0.65} rx="3" fill={item.color} fillOpacity="0.6"/>
            <rect x={cx - w*0.22} y={y + h*0.2} width={w*0.44} height={h*0.1} fill="#b8860b"/>
          </g>
        )
      case 'frame':
        return <rect x={x + w*0.2} y={y + h*0.15} width={w*0.6} height={h*0.7} fill="none" stroke={item.color} strokeWidth="3"/>
      case 'candle':
        return (
          <g>
            <rect x={cx - w*0.15} y={y + h*0.3} width={w*0.3} height={h*0.6} rx="2" fill={item.color}/>
            <ellipse cx={cx} cy={y + h*0.25} rx={w*0.05} ry={h*0.08} fill="#ffa500"/>
          </g>
        )
      case 'bowl':
        return <ellipse cx={cx} cy={y + h*0.65} rx={w*0.35} ry={h*0.25} fill={item.color}/>
      case 'mug':
        return (
          <g>
            <rect x={cx - w*0.15} y={y + h*0.35} width={w*0.3} height={h*0.55} rx="3" fill={item.color}/>
            <path d={`M ${cx + w*0.15} ${y + h*0.45} Q ${cx + w*0.35} ${y + h*0.55} ${cx + w*0.15} ${y + h*0.7}`}
                  fill="none" stroke={item.color} strokeWidth="3"/>
          </g>
        )
      case 'box':
        return <rect x={x + w*0.15} y={y + h*0.35} width={w*0.7} height={h*0.55} fill={item.color}/>
      default:
        return null
    }
  }

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
          C4: Open Shelving Display
        </h1>
        <p style={{ color: '#a0a0a0', margin: '8px 0 0', fontSize: '14px' }}>
          Replace closed cabinets with open cubbies - farmhouse aesthetic, display storage
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
          Shelf Style:
          <select
            value={shelfStyle}
            onChange={(e) => setShelfStyle(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px' }}
          >
            <option value="cubbies">Grid Cubbies (4x3)</option>
            <option value="horizontal">Horizontal Shelves</option>
            <option value="mixed">Mixed (cubbies + open)</option>
          </select>
        </label>

        <label style={{ color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showItems}
            onChange={(e) => setShowItems(e.target.checked)}
          />
          Show display items
        </label>
      </div>

      {/* Main SVG */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width={width} height={height} style={{ background: '#0d1b2a', borderRadius: '12px' }}>
          <defs>
            <pattern id="wood-os" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#8B7355"/>
              <line x1="0" y1="5" x2="20" y2="5" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
              <line x1="0" y1="15" x2="20" y2="15" stroke="#7a6548" strokeWidth="1" opacity="0.5"/>
            </pattern>

            <linearGradient id="shelf-wood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#deb887"/>
              <stop offset="100%" stopColor="#c4a06a"/>
            </linearGradient>
          </defs>

          {/* Floor lines */}
          <line x1={padding - 10} y1={lrFloor} x2={width - padding + 10} y2={lrFloor}
                stroke="#3d5a80" strokeWidth="2"/>
          <line x1={padding - 10} y1={kitchenFloor} x2={width - padding + 10} y2={kitchenFloor}
                stroke="#3d5a80" strokeWidth="2"/>

          {/* Shelf unit frame */}
          <rect x={shelfFace} y={barTop + (barTopThickness * scale)}
                width={shelfWidth} height={shelfUnitHeight}
                fill="#2a2a2a" stroke="#5a4a3a" strokeWidth="3"/>

          {/* Render shelving based on style */}
          {shelfStyle === 'cubbies' && (
            <g>
              {/* Vertical dividers */}
              {[1, 2].map(i => (
                <line key={`v${i}`}
                      x1={shelfFace + 4 + i * cubbyWidth}
                      y1={barTop + (barTopThickness * scale) + 5}
                      x2={shelfFace + 4 + i * cubbyWidth}
                      y2={barTop + (barTopThickness * scale) + shelfUnitHeight - 5}
                      stroke="url(#shelf-wood)" strokeWidth="4"/>
              ))}
              {/* Horizontal dividers */}
              {[1, 2, 3].map(i => (
                <line key={`h${i}`}
                      x1={shelfFace + 5}
                      y1={barTop + (barTopThickness * scale) + 5 + i * cubbyHeight}
                      x2={shelfFace + shelfWidth - 5}
                      y2={barTop + (barTopThickness * scale) + 5 + i * cubbyHeight}
                      stroke="url(#shelf-wood)" strokeWidth="4"/>
              ))}
              {/* Items in cubbies */}
              {showItems && items.map((item, idx) => {
                const row = Math.floor(idx / cols)
                const col = idx % cols
                const x = shelfFace + 4 + col * cubbyWidth + 2
                const y = barTop + (barTopThickness * scale) + 5 + row * cubbyHeight + 2
                return (
                  <g key={idx}>
                    {renderItem(item, x, y, cubbyWidth - 4, cubbyHeight - 4)}
                  </g>
                )
              })}
            </g>
          )}

          {shelfStyle === 'horizontal' && (
            <g>
              {/* 5 horizontal shelves */}
              {[0, 1, 2, 3, 4].map(i => {
                const y = barTop + (barTopThickness * scale) + 10 + i * (shelfUnitHeight - 20) / 4
                return (
                  <rect key={i}
                        x={shelfFace + 5}
                        y={y}
                        width={shelfWidth - 10}
                        height="6"
                        fill="url(#shelf-wood)"/>
                )
              })}
              {/* Some items on shelves */}
              {showItems && (
                <g>
                  {renderItem(items[0], shelfFace + 8, barTop + (barTopThickness * scale) + 20, 20, 25)}
                  {renderItem(items[3], shelfFace + 35, barTop + (barTopThickness * scale) + 18, 18, 28)}
                  {renderItem(items[9], shelfFace + 10, barTop + (barTopThickness * scale) + 55, 25, 30)}
                  {renderItem(items[4], shelfFace + 8, barTop + (barTopThickness * scale) + 95, 30, 25)}
                  {renderItem(items[1], shelfFace + 45, barTop + (barTopThickness * scale) + 90, 18, 32)}
                </g>
              )}
            </g>
          )}

          {shelfStyle === 'mixed' && (
            <g>
              {/* Upper section: 2x2 cubbies */}
              <line x1={shelfFace + shelfWidth/2} y1={barTop + (barTopThickness * scale) + 5}
                    x2={shelfFace + shelfWidth/2} y2={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.45}
                    stroke="url(#shelf-wood)" strokeWidth="4"/>
              <line x1={shelfFace + 5} y1={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.22}
                    x2={shelfFace + shelfWidth - 5} y2={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.22}
                    stroke="url(#shelf-wood)" strokeWidth="4"/>
              {/* Divider */}
              <rect x={shelfFace + 5} y={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.45}
                    width={shelfWidth - 10} height="6" fill="url(#shelf-wood)"/>
              {/* Lower section: open shelves */}
              <rect x={shelfFace + 5} y={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.65}
                    width={shelfWidth - 10} height="5" fill="url(#shelf-wood)"/>
              <rect x={shelfFace + 5} y={barTop + (barTopThickness * scale) + shelfUnitHeight * 0.85}
                    width={shelfWidth - 10} height="5" fill="url(#shelf-wood)"/>
              {showItems && (
                <g>
                  {renderItem(items[9], shelfFace + 8, barTop + (barTopThickness * scale) + 8, 20, 28)}
                  {renderItem(items[6], shelfFace + 38, barTop + (barTopThickness * scale) + 8, 20, 26)}
                  {renderItem(items[3], shelfFace + 10, barTop + (barTopThickness * scale) + 38, 18, 30)}
                  {renderItem(items[4], shelfFace + 10, barTop + (barTopThickness * scale) + shelfUnitHeight * 0.5, 35, 22)}
                  {renderItem(items[0], shelfFace + 10, barTop + (barTopThickness * scale) + shelfUnitHeight * 0.7, 25, 22)}
                </g>
              )}
            </g>
          )}

          {/* Bar top */}
          <rect x={leftEdge} y={barTop}
                width={(totalDepth * scale)} height={barTopThickness * scale}
                fill="url(#wood-os)" stroke="#6b4423" strokeWidth="2"/>

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

          {/* Dimensions */}
          <line x1={rightEdge + 15} y1={barTop + (barTopThickness * scale)}
                x2={rightEdge + 15} y2={lrFloor}
                stroke="#9ca3af" strokeWidth="1"/>
          <text x={rightEdge + 20} y={barTop + shelfUnitHeight/2 + 4}
                fill="#9ca3af" fontSize="10">
            {totalCabinetHeight}" open shelving
          </text>

          {/* Person silhouette */}
          <g transform={`translate(${leftEdge - 20}, ${kitchenFloor})`}>
            <ellipse cx="0" cy="-65" rx="8" ry="10" fill="#4a5568"/>
            <rect x="-10" y="-55" width="20" height="35" rx="5" fill="#4a5568"/>
            <rect x="-8" y="-20" width="6" height="25" fill="#4a5568"/>
            <rect x="2" y="-20" width="6" height="25" fill="#4a5568"/>
          </g>

          {/* View from LR indicator */}
          <text x={shelfFace + shelfWidth/2} y={lrFloor + 18}
                fill="#60a5fa" fontSize="11" textAnchor="middle">
            ^ View from Living Room ^
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
            <li>Lighter visual weight - doesn't feel like a wall</li>
            <li>Display space for decor, books, bar items</li>
            <li>Strong farmhouse/cottage aesthetic</li>
            <li>Easy access - no doors to open</li>
            <li>Can backlight for dramatic effect</li>
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
            <li>Dust accumulates on displayed items</li>
            <li>Clutter visible - requires curation</li>
            <li>No concealed storage for messy items</li>
            <li>Less secure for valuables</li>
            <li>Needs regular tidying</li>
          </ul>
        </div>

        <div style={{
          background: '#1f3d3d',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #2d5a5a'
        }}>
          <h3 style={{ color: '#60a5fa', margin: '0 0 12px', fontSize: '14px' }}>
            FARMHOUSE FIT
          </h3>
          <p style={{ color: '#e0e0e0', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            Open shelving is a <strong>core farmhouse element</strong> - think open pantry, plate racks,
            displayed pottery. This creates a warm, lived-in look that pairs perfectly with butcher block
            and shaker style.
          </p>
        </div>
      </div>
    </div>
  )
}
