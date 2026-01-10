import React from 'react'

export default function OptionA() {
  // Dimensions
  const totalWidth = 90  // inches (cabinet width, excluding 2" filler)
  const totalHeight = 34.5  // cabinet body height
  const toeKick = 4  // inches
  const scale = 8  // pixels per inch

  // Layout: Classic Symmetry
  // 3 drawers on top (full width)
  // 4 equal cabinet doors below (22.5" each)
  const drawerHeight = 6  // each drawer
  const drawerGap = 0.5
  const topDrawersHeight = (drawerHeight * 3) + (drawerGap * 2)
  const doorHeight = totalHeight - toeKick - topDrawersHeight
  const doorWidth = totalWidth / 4
  const gap = 0.25  // reveal gap between doors/drawers

  // Colors - Modern Farmhouse
  const cabinetColor = '#2c3e50'  // dark blue-gray
  const doorColor = '#34495e'  // slightly lighter blue-gray
  const hardwareColor = '#bdc3c7'  // brushed nickel
  const labelColor = '#e2e8f0'

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20, background: '#0f172a', color: '#e2e8f0' }}>
      <h2>Option A: Classic Symmetry</h2>
      <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>
        Equal-width doors with centered drawers - traditional balanced design
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

        {/* Three drawers - full width */}
        {[0, 1, 2].map((i) => {
          const y = i * (drawerHeight + drawerGap) * scale
          return (
            <g key={`drawer-${i}`}>
              {/* Drawer face */}
              <rect
                x={gap * scale}
                y={y + gap * scale}
                width={(totalWidth - gap * 2) * scale}
                height={(drawerHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={2}
                rx={3}
              />
              {/* Shaker panel inset */}
              <rect
                x={(gap + 1) * scale}
                y={(y + gap + 0.75) * scale}
                width={(totalWidth - gap * 2 - 2) * scale}
                height={(drawerHeight - gap - 1.5) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              {/* Hardware - centered */}
              <rect
                x={(totalWidth / 2 - 2) * scale}
                y={(y + drawerHeight / 2 - 0.25) * scale}
                width={4 * scale}
                height={0.5 * scale}
                fill={hardwareColor}
                rx={1}
              />
              {/* Dimension label */}
              <text
                x={totalWidth * scale + 10}
                y={(y + drawerHeight / 2) * scale}
                fill={labelColor}
                fontSize={11}
                alignmentBaseline="middle"
              >
                {drawerHeight}" H
              </text>
            </g>
          )
        })}

        {/* Four equal cabinet doors */}
        {[0, 1, 2, 3].map((i) => {
          const x = i * doorWidth * scale
          const y = topDrawersHeight * scale
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
              {/* Hardware - knob positioned at 1/3 height from top */}
              <circle
                cx={(x / scale + doorWidth - 3) * scale}
                cy={(y / scale + doorHeight / 3) * scale}
                r={0.75 * scale}
                fill={hardwareColor}
              />
              {/* Width dimension label (on first and last door) */}
              {(i === 0 || i === 3) && (
                <text
                  x={(x / scale + doorWidth / 2) * scale}
                  y={-10}
                  fill={labelColor}
                  fontSize={11}
                  textAnchor="middle"
                >
                  {doorWidth}"
                </text>
              )}
            </g>
          )
        })}

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
      </svg>

      <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Dimensions</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li><strong>Drawer 1-3:</strong> 90" W × 6" H (each)</li>
            <li><strong>Door 1-4:</strong> 22.5" W × {doorHeight.toFixed(1)}" H (each)</li>
            <li><strong>Toe kick:</strong> {toeKick}" H</li>
            <li><strong>Total height:</strong> {totalHeight}" (body)</li>
          </ul>
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Features</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Perfectly symmetrical from center</li>
            <li>Equal door widths (22.5" each)</li>
            <li>Full-width drawers for utensils</li>
            <li>Shaker-style door fronts</li>
            <li>Brushed nickel hardware</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 15, background: '#1e293b', borderRadius: 8, borderLeft: '4px solid #3b82f6' }}>
        <h4 style={{ marginTop: 0, color: '#60a5fa' }}>Design Notes</h4>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Classic proportions with 4 equal doors create a balanced, traditional look.
          The three full-width drawers provide ample storage for silverware, utensils, and linens.
          This layout is the easiest to build with pocket hole construction and ensures perfect symmetry.
        </p>
      </div>
    </div>
  )
}
