import React from 'react'

export default function OptionC() {
  // Dimensions
  const totalWidth = 90  // inches
  const totalHeight = 34.5  // cabinet body height
  const toeKick = 4  // inches
  const scale = 8  // pixels per inch

  // Layout: Functional Asymmetry
  // Left side: 1 wide door (38") - for serving platters
  // Right side: 2 drawers (top 12") + 2 smaller doors (26" each)
  const wideDoorWidth = 38
  const drawerSectionWidth = totalWidth - wideDoorWidth
  const drawerHeight = 6
  const drawerGap = 0.5
  const topDrawersHeight = (drawerHeight * 2) + drawerGap
  const smallDoorWidth = drawerSectionWidth / 2
  const doorHeight = totalHeight - toeKick - topDrawersHeight
  const wideDoorHeight = totalHeight - toeKick
  const gap = 0.25

  // Colors
  const cabinetColor = '#2c3e50'
  const doorColor = '#34495e'
  const hardwareColor = '#bdc3c7'
  const labelColor = '#e2e8f0'

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20, background: '#0f172a', color: '#e2e8f0' }}>
      <h2>Option C: Functional Asymmetry</h2>
      <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>
        Wide serving platter door on left, drawers and storage on right
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

        {/* Left side: Wide door for serving platters */}
        <g>
          {/* Wide door face */}
          <rect
            x={gap * scale}
            y={gap * scale}
            width={(wideDoorWidth - gap * 2) * scale}
            height={(wideDoorHeight - gap) * scale}
            fill={doorColor}
            stroke={cabinetColor}
            strokeWidth={2}
            rx={3}
          />
          {/* Shaker panel inset */}
          <rect
            x={(gap + 2) * scale}
            y={(gap + 2) * scale}
            width={(wideDoorWidth - gap * 2 - 4) * scale}
            height={(wideDoorHeight - gap - 4) * scale}
            fill="none"
            stroke={cabinetColor}
            strokeWidth={1.5}
            rx={2}
          />
          {/* Double knobs for wide door */}
          <circle
            cx={(wideDoorWidth - 3) * scale}
            cy={(wideDoorHeight / 3) * scale}
            r={0.75 * scale}
            fill={hardwareColor}
          />
          <circle
            cx={(wideDoorWidth - 3) * scale}
            cy={(wideDoorHeight * 2 / 3) * scale}
            r={0.75 * scale}
            fill={hardwareColor}
          />
          {/* Label */}
          <text
            x={(wideDoorWidth / 2) * scale}
            y={(wideDoorHeight / 2) * scale}
            fill={labelColor}
            fontSize={10}
            textAnchor="middle"
            opacity={0.5}
          >
            Serving Platter Storage
          </text>
          {/* Width dimension */}
          <text
            x={(wideDoorWidth / 2) * scale}
            y={-10}
            fill={labelColor}
            fontSize={11}
            textAnchor="middle"
          >
            {wideDoorWidth}"
          </text>
        </g>

        {/* Right side: 2 drawers on top */}
        {[0, 1].map((i) => {
          const x = wideDoorWidth
          const y = i * (drawerHeight + drawerGap)
          return (
            <g key={`drawer-${i}`}>
              {/* Drawer face */}
              <rect
                x={(x + gap) * scale}
                y={(y + gap) * scale}
                width={(drawerSectionWidth - gap * 2) * scale}
                height={(drawerHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={2}
                rx={3}
              />
              {/* Shaker panel inset */}
              <rect
                x={(x + gap + 1) * scale}
                y={(y + gap + 0.75) * scale}
                width={(drawerSectionWidth - gap * 2 - 2) * scale}
                height={(drawerHeight - gap - 1.5) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              {/* Hardware - centered */}
              <rect
                x={(x + drawerSectionWidth / 2 - 2) * scale}
                y={(y + drawerHeight / 2 - 0.25) * scale}
                width={4 * scale}
                height={0.5 * scale}
                fill={hardwareColor}
                rx={1}
              />
              {/* Label */}
              {i === 0 && (
                <text
                  x={totalWidth * scale + 10}
                  y={(y + drawerHeight / 2) * scale}
                  fill={labelColor}
                  fontSize={11}
                  alignmentBaseline="middle"
                >
                  {drawerHeight}" drawers
                </text>
              )}
            </g>
          )
        })}

        {/* Right side: 2 smaller doors below drawers */}
        {[0, 1].map((i) => {
          const x = wideDoorWidth + (i * smallDoorWidth)
          const y = topDrawersHeight
          return (
            <g key={`door-${i}`}>
              {/* Door face */}
              <rect
                x={(x + gap) * scale}
                y={(y + gap) * scale}
                width={(smallDoorWidth - gap * 2) * scale}
                height={(doorHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={2}
                rx={3}
              />
              {/* Shaker panel inset */}
              <rect
                x={(x + gap + 1.5) * scale}
                y={(y + gap + 1.5) * scale}
                width={(smallDoorWidth - gap * 2 - 3) * scale}
                height={(doorHeight - gap - 3) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              {/* Hardware - knob */}
              <circle
                cx={(x + smallDoorWidth - 3) * scale}
                cy={(y + doorHeight / 3) * scale}
                r={0.75 * scale}
                fill={hardwareColor}
              />
              {/* Width dimension */}
              {i === 0 && (
                <text
                  x={(x + smallDoorWidth / 2) * scale}
                  y={-10}
                  fill={labelColor}
                  fontSize={11}
                  textAnchor="middle"
                >
                  {smallDoorWidth}"
                </text>
              )}
            </g>
          )
        })}

        {/* Vertical divider line (visual indicator) */}
        <line
          x1={wideDoorWidth * scale}
          y1={0}
          x2={wideDoorWidth * scale}
          y2={(totalHeight - toeKick) * scale}
          stroke={labelColor}
          strokeWidth={0.5}
          strokeDasharray="4 4"
          opacity={0.3}
        />

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

        {/* Door height dimension for small doors */}
        <text
          x={totalWidth * scale + 10}
          y={(topDrawersHeight + doorHeight / 2) * scale}
          fill={labelColor}
          fontSize={11}
          alignmentBaseline="middle"
        >
          {doorHeight.toFixed(1)}" H
        </text>
      </svg>

      <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Dimensions</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li><strong>Wide door (left):</strong> {wideDoorWidth}" W × {wideDoorHeight.toFixed(1)}" H</li>
            <li><strong>Drawers (right):</strong> {drawerSectionWidth}" W × {drawerHeight}" H (each)</li>
            <li><strong>Small doors (right):</strong> {smallDoorWidth}" W × {doorHeight.toFixed(1)}" H (each)</li>
            <li><strong>Toe kick:</strong> {toeKick}" H</li>
            <li><strong>Total height:</strong> {totalHeight}" (body)</li>
          </ul>
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #475569', paddingBottom: 8 }}>Features</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Extra-wide door for platters/trays</li>
            <li>Asymmetrical but balanced layout</li>
            <li>Grouped drawers for efficiency</li>
            <li>Double knobs on wide door</li>
            <li>Optimized for entertaining</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 15, background: '#1e293b', borderRadius: 8, borderLeft: '4px solid #f59e0b' }}>
        <h4 style={{ marginTop: 0, color: '#fbbf24' }}>Design Notes</h4>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Intentionally asymmetrical for functional reasons: the 38" wide door on the left easily accommodates large serving platters, pizza stones, and baking sheets.
          The right side groups drawers together for utensils and linens, with smaller doors below for general storage.
          This layout creates visual interest while solving real storage challenges for entertaining.
        </p>
      </div>
    </div>
  )
}
