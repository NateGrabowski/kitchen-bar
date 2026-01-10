import React from 'react'

export default function OptionB() {
  // Dimensions
  const totalWidth = 90  // inches
  const totalHeight = 34.5  // cabinet body height
  const toeKick = 4  // inches
  const scale = 8  // pixels per inch

  // Layout: Open Shelving Mix
  // Top section: 2 open shelves (13" total height)
  // Bottom section: 3 cabinet doors (17.5" height)
  const openShelfHeight = 13
  const shelfThickness = 0.75
  const doorHeight = totalHeight - toeKick - openShelfHeight
  const doorWidth = totalWidth / 3  // 3 equal doors
  const gap = 0.25

  // Colors
  const cabinetColor = '#2c3e50'
  const doorColor = '#34495e'
  const hardwareColor = '#bdc3c7'
  const woodTone = '#8b7355'  // for open shelves (butcher block match)
  const labelColor = '#e2e8f0'

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20, background: '#0f172a', color: '#e2e8f0' }}>
      <h2>Option B: Open Shelving Mix</h2>
      <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>
        Open shelves on top for display, closed cabinets below for storage
      </p>

      <svg
        width={totalWidth * scale + 100}
        height={(totalHeight + 20) * scale}
        viewBox={`-50 -50 ${totalWidth * scale + 100} ${(totalHeight + 20) * scale}`}
        style={{ background: '#1e293b', borderRadius: 8 }}
      >
        {/* Toe kick */}
        <rect
          x={0}
          y={totalHeight * scale - toeKick * scale}
          width={totalWidth * scale}
          height={toeKick * scale}
          fill="#1a1a1a"
          stroke="#475569"
          strokeWidth={1}
        />

        {/* Open shelf section - frame */}
        <rect
          x={0}
          y={0}
          width={totalWidth * scale}
          height={openShelfHeight * scale}
          fill="#1a2332"
          stroke={cabinetColor}
          strokeWidth={2}
        />

        {/* Two open shelves */}
        {[0, 1].map((i) => {
          const shelfY = (i + 1) * (openShelfHeight / 3) * scale - (shelfThickness / 2) * scale
          return (
            <g key={`shelf-${i}`}>
              {/* Shelf */}
              <rect
                x={gap * scale}
                y={shelfY}
                width={(totalWidth - gap * 2) * scale}
                height={shelfThickness * scale}
                fill={woodTone}
                stroke="#6b5940"
                strokeWidth={1}
              />
              {/* Vertical dividers (creating 3 compartments) */}
              {[1, 2].map((divider) => (
                <rect
                  key={`divider-${i}-${divider}`}
                  x={(divider * (totalWidth / 3) - 0.375) * scale}
                  y={0}
                  width={0.75 * scale}
                  height={openShelfHeight * scale}
                  fill={cabinetColor}
                />
              ))}
            </g>
          )
        })}

        {/* Label for open shelf section */}
        <text
          x={totalWidth * scale + 10}
          y={(openShelfHeight / 2) * scale}
          fill={labelColor}
          fontSize={11}
          alignmentBaseline="middle"
        >
          {openShelfHeight}" open shelves
        </text>

        {/* Three equal cabinet doors */}
        {[0, 1, 2].map((i) => {
          const x = i * doorWidth * scale
          const y = openShelfHeight * scale
          return (
            <g key={`door-${i}`}>
              {/* Door face */}
              <rect
                x={x + gap * scale}
                y={y + gap * scale}
                width={(doorWidth - gap * 2) * scale}
                height={(doorHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={2}
                rx={3}
              />
              {/* Shaker panel inset */}
              <rect
                x={(x / scale + gap + 1.5) * scale}
                y={(y / scale + gap + 1.5) * scale}
                width={(doorWidth - gap * 2 - 3) * scale}
                height={(doorHeight - gap - 3) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              {/* Hardware - knob */}
              <circle
                cx={(x / scale + doorWidth - 3) * scale}
                cy={(y / scale + doorHeight / 3) * scale}
                r={0.75 * scale}
                fill={hardwareColor}
              />
              {/* Width dimension label */}
              {i === 1 && (
                <text
                  x={(x / scale + doorWidth / 2) * scale}
                  y={-10}
                  fill={labelColor}
                  fontSize={11}
                  textAnchor="middle"
                >
                  {doorWidth}" (each door)
                </text>
              )}
            </g>
          )
        })}

        {/* Door height dimension */}
        <text
          x={totalWidth * scale + 10}
          y={(openShelfHeight + doorHeight / 2) * scale}
          fill={labelColor}
          fontSize={11}
          alignmentBaseline="middle"
        >
          {doorHeight.toFixed(1)}" doors
        </text>

        {/* Overall width dimension */}
        <line x1={0} y1={-30} x2={totalWidth * scale} y2={-30} stroke={labelColor} strokeWidth={1} />
        <line x1={0} y1={-35} x2={0} y2={-25} stroke={labelColor} strokeWidth={1} />
        <line x1={totalWidth * scale} y1={-35} x2={totalWidth * scale} y2={-25} stroke={labelColor} strokeWidth={1} />
        <text
          x={(totalWidth * scale) / 2}
          y={-32}
          fill={labelColor}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {totalWidth}" TOTAL WIDTH
        </text>

        {/* Height dimension */}
        <line x1={-30} y1={0} x2={-30} y2={(totalHeight - toeKick) * scale} stroke={labelColor} strokeWidth={1} />
        <line x1={-35} y1={0} x2={-25} y2={0} stroke={labelColor} strokeWidth={1} />
        <line x1={-35} y1={(totalHeight - toeKick) * scale} x2={-25} y2={(totalHeight - toeKick) * scale} stroke={labelColor} strokeWidth={1} />
        <text
          x={-40}
          y={((totalHeight - toeKick) * scale) / 2}
          fill={labelColor}
          fontSize={11}
          textAnchor="middle"
          transform={`rotate(-90, -40, ${((totalHeight - toeKick) * scale) / 2})`}
        >
          {totalHeight - toeKick}" cabinet
        </text>

        {/* Display items on shelves (decorative) */}
        {/* Books on left shelf */}
        <g opacity={0.6}>
          <rect x={4 * scale} y={4.5 * scale} width={1.5 * scale} height={8 * scale} fill="#e74c3c" />
          <rect x={6 * scale} y={5 * scale} width={1.5 * scale} height={7.5 * scale} fill="#3498db" />
          <rect x={8 * scale} y={4 * scale} width={1.5 * scale} height={8.5 * scale} fill="#2ecc71" />
        </g>
        {/* Vase in middle shelf */}
        <ellipse cx={45 * scale} cy={8 * scale} rx={2 * scale} ry={3 * scale} fill="#95a5a6" opacity={0.5} />
        {/* Small plants on right shelf */}
        <circle cx={78 * scale} cy={7 * scale} r={2 * scale} fill="#27ae60" opacity={0.4} />
        <circle cx={82 * scale} cy={6.5 * scale} r={1.5 * scale} fill="#27ae60" opacity={0.4} />
      </svg>

      <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Dimensions</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li><strong>Open shelf section:</strong> 90" W × {openShelfHeight}" H</li>
            <li><strong>Shelf compartments:</strong> {doorWidth}" W each (3 compartments)</li>
            <li><strong>Cabinet doors:</strong> {doorWidth}" W × {doorHeight.toFixed(1)}" H (each)</li>
            <li><strong>Toe kick:</strong> {toeKick}" H</li>
            <li><strong>Total height:</strong> {totalHeight}" (body)</li>
          </ul>
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Features</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Open display shelves (top 13")</li>
            <li>3 equal compartments for decor</li>
            <li>Closed storage below (3 doors)</li>
            <li>Modern farmhouse aesthetic</li>
            <li>Visual interest with mixed storage</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 15, background: '#1e293b', borderRadius: 8, borderLeft: '4px solid #10b981' }}>
        <h4 style={{ marginTop: 0, color: '#34d399' }}>Design Notes</h4>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          The open shelving on top creates visual lightness and display opportunities for cookbooks, plants, or decorative items.
          The three compartments prevent clutter while maintaining an airy feel. Closed cabinets below hide less attractive items.
          This design matches modern farmhouse trends and adds personality to the bar.
        </p>
      </div>
    </div>
  )
}
