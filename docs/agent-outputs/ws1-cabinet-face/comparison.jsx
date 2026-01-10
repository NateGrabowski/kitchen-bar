import React from 'react'

export default function CabinetFaceComparison() {
  const totalWidth = 90
  const totalHeight = 34.5
  const toeKick = 4
  const scale = 4  // Smaller scale for side-by-side comparison

  const cabinetColor = '#2c3e50'
  const doorColor = '#34495e'
  const hardwareColor = '#bdc3c7'
  const woodTone = '#8b7355'
  const labelColor = '#e2e8f0'
  const gap = 0.25

  // Option A layout
  const optionA = {
    drawerHeight: 6,
    drawerCount: 3,
    doorWidth: totalWidth / 4,
    doorCount: 4,
  }
  optionA.topDrawersHeight = optionA.drawerHeight * 3 + 0.5 * 2
  optionA.doorHeight = totalHeight - toeKick - optionA.topDrawersHeight

  // Option B layout
  const optionB = {
    openShelfHeight: 13,
    doorWidth: totalWidth / 3,
    doorCount: 3,
  }
  optionB.doorHeight = totalHeight - toeKick - optionB.openShelfHeight

  // Option C layout
  const optionC = {
    wideDoorWidth: 38,
    drawerHeight: 6,
    drawerCount: 2,
  }
  optionC.drawerSectionWidth = totalWidth - optionC.wideDoorWidth
  optionC.topDrawersHeight = optionC.drawerHeight * 2 + 0.5
  optionC.smallDoorWidth = optionC.drawerSectionWidth / 2
  optionC.doorHeight = totalHeight - toeKick - optionC.topDrawersHeight
  optionC.wideDoorHeight = totalHeight - toeKick

  const renderOptionA = (offsetX) => {
    return (
      <g transform={`translate(${offsetX}, 0)`}>
        {/* Toe kick */}
        <rect
          x={0}
          y={(totalHeight - toeKick) * scale}
          width={totalWidth * scale}
          height={toeKick * scale}
          fill="#1a1a1a"
          stroke="#475569"
          strokeWidth={1}
        />
        {/* Drawers */}
        {[0, 1, 2].map((i) => {
          const y = i * (optionA.drawerHeight + 0.5) * scale
          return (
            <g key={`a-drawer-${i}`}>
              <rect
                x={gap * scale}
                y={y + gap * scale}
                width={(totalWidth - gap * 2) * scale}
                height={(optionA.drawerHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              <rect
                x={(gap + 0.5) * scale}
                y={(y + gap + 0.4) * scale}
                width={(totalWidth - gap * 2 - 1) * scale}
                height={(optionA.drawerHeight - gap - 0.8) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1}
                rx={1}
              />
              <rect
                x={(totalWidth / 2 - 1) * scale}
                y={(y + optionA.drawerHeight / 2 - 0.15) * scale}
                width={2 * scale}
                height={0.3 * scale}
                fill={hardwareColor}
                rx={0.5}
              />
            </g>
          )
        })}
        {/* Doors */}
        {[0, 1, 2, 3].map((i) => {
          const x = i * optionA.doorWidth * scale
          const y = optionA.topDrawersHeight * scale
          return (
            <g key={`a-door-${i}`}>
              <rect
                x={x + gap * scale}
                y={y + gap * scale}
                width={(optionA.doorWidth - gap * 2) * scale}
                height={(optionA.doorHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              <rect
                x={(x / scale + gap + 0.75) * scale}
                y={(y / scale + gap + 0.75) * scale}
                width={(optionA.doorWidth - gap * 2 - 1.5) * scale}
                height={(optionA.doorHeight - gap - 1.5) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1}
                rx={1}
              />
              <circle
                cx={(x / scale + optionA.doorWidth - 2) * scale}
                cy={(y / scale + optionA.doorHeight / 3) * scale}
                r={0.5 * scale}
                fill={hardwareColor}
              />
            </g>
          )
        })}
      </g>
    )
  }

  const renderOptionB = (offsetX) => {
    return (
      <g transform={`translate(${offsetX}, 0)`}>
        {/* Toe kick */}
        <rect
          x={0}
          y={(totalHeight - toeKick) * scale}
          width={totalWidth * scale}
          height={toeKick * scale}
          fill="#1a1a1a"
          stroke="#475569"
          strokeWidth={1}
        />
        {/* Open shelf frame */}
        <rect
          x={0}
          y={0}
          width={totalWidth * scale}
          height={optionB.openShelfHeight * scale}
          fill="#1a2332"
          stroke={cabinetColor}
          strokeWidth={1.5}
        />
        {/* Shelves */}
        {[0, 1].map((i) => {
          const shelfY = (i + 1) * (optionB.openShelfHeight / 3) * scale - 0.4 * scale
          return (
            <g key={`b-shelf-${i}`}>
              <rect
                x={gap * scale}
                y={shelfY}
                width={(totalWidth - gap * 2) * scale}
                height={0.75 * scale}
                fill={woodTone}
                stroke="#6b5940"
                strokeWidth={0.5}
              />
            </g>
          )
        })}
        {/* Dividers */}
        {[1, 2].map((divider) => (
          <rect
            key={`b-divider-${divider}`}
            x={(divider * (totalWidth / 3) - 0.375) * scale}
            y={0}
            width={0.75 * scale}
            height={optionB.openShelfHeight * scale}
            fill={cabinetColor}
          />
        ))}
        {/* Doors */}
        {[0, 1, 2].map((i) => {
          const x = i * optionB.doorWidth * scale
          const y = optionB.openShelfHeight * scale
          return (
            <g key={`b-door-${i}`}>
              <rect
                x={x + gap * scale}
                y={y + gap * scale}
                width={(optionB.doorWidth - gap * 2) * scale}
                height={(optionB.doorHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              <rect
                x={(x / scale + gap + 0.75) * scale}
                y={(y / scale + gap + 0.75) * scale}
                width={(optionB.doorWidth - gap * 2 - 1.5) * scale}
                height={(optionB.doorHeight - gap - 1.5) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1}
                rx={1}
              />
              <circle
                cx={(x / scale + optionB.doorWidth - 2) * scale}
                cy={(y / scale + optionB.doorHeight / 3) * scale}
                r={0.5 * scale}
                fill={hardwareColor}
              />
            </g>
          )
        })}
      </g>
    )
  }

  const renderOptionC = (offsetX) => {
    return (
      <g transform={`translate(${offsetX}, 0)`}>
        {/* Toe kick */}
        <rect
          x={0}
          y={(totalHeight - toeKick) * scale}
          width={totalWidth * scale}
          height={toeKick * scale}
          fill="#1a1a1a"
          stroke="#475569"
          strokeWidth={1}
        />
        {/* Wide door */}
        <rect
          x={gap * scale}
          y={gap * scale}
          width={(optionC.wideDoorWidth - gap * 2) * scale}
          height={(optionC.wideDoorHeight - gap) * scale}
          fill={doorColor}
          stroke={cabinetColor}
          strokeWidth={1.5}
          rx={2}
        />
        <rect
          x={(gap + 1) * scale}
          y={(gap + 1) * scale}
          width={(optionC.wideDoorWidth - gap * 2 - 2) * scale}
          height={(optionC.wideDoorHeight - gap - 2) * scale}
          fill="none"
          stroke={cabinetColor}
          strokeWidth={1}
          rx={1}
        />
        <circle cx={(optionC.wideDoorWidth - 2) * scale} cy={(optionC.wideDoorHeight / 3) * scale} r={0.5 * scale} fill={hardwareColor} />
        <circle cx={(optionC.wideDoorWidth - 2) * scale} cy={(optionC.wideDoorHeight * 2 / 3) * scale} r={0.5 * scale} fill={hardwareColor} />
        {/* Drawers */}
        {[0, 1].map((i) => {
          const x = optionC.wideDoorWidth
          const y = i * (optionC.drawerHeight + 0.5)
          return (
            <g key={`c-drawer-${i}`}>
              <rect
                x={(x + gap) * scale}
                y={(y + gap) * scale}
                width={(optionC.drawerSectionWidth - gap * 2) * scale}
                height={(optionC.drawerHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              <rect
                x={(x + gap + 0.5) * scale}
                y={(y + gap + 0.4) * scale}
                width={(optionC.drawerSectionWidth - gap * 2 - 1) * scale}
                height={(optionC.drawerHeight - gap - 0.8) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1}
                rx={1}
              />
              <rect
                x={(x + optionC.drawerSectionWidth / 2 - 1) * scale}
                y={(y + optionC.drawerHeight / 2 - 0.15) * scale}
                width={2 * scale}
                height={0.3 * scale}
                fill={hardwareColor}
                rx={0.5}
              />
            </g>
          )
        })}
        {/* Small doors */}
        {[0, 1].map((i) => {
          const x = optionC.wideDoorWidth + (i * optionC.smallDoorWidth)
          const y = optionC.topDrawersHeight
          return (
            <g key={`c-door-${i}`}>
              <rect
                x={(x + gap) * scale}
                y={(y + gap) * scale}
                width={(optionC.smallDoorWidth - gap * 2) * scale}
                height={(optionC.doorHeight - gap) * scale}
                fill={doorColor}
                stroke={cabinetColor}
                strokeWidth={1.5}
                rx={2}
              />
              <rect
                x={(x + gap + 0.75) * scale}
                y={(y + gap + 0.75) * scale}
                width={(optionC.smallDoorWidth - gap * 2 - 1.5) * scale}
                height={(optionC.doorHeight - gap - 1.5) * scale}
                fill="none"
                stroke={cabinetColor}
                strokeWidth={1}
                rx={1}
              />
              <circle
                cx={(x + optionC.smallDoorWidth - 2) * scale}
                cy={(y + optionC.doorHeight / 3) * scale}
                r={0.5 * scale}
                fill={hardwareColor}
              />
            </g>
          )
        })}
      </g>
    )
  }

  const svgWidth = totalWidth * scale * 3 + 100
  const svgHeight = totalHeight * scale + 100

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20, background: '#0f172a', color: '#e2e8f0' }}>
      <h1 style={{ marginBottom: 10 }}>Cabinet Face Design Comparison</h1>
      <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 30 }}>
        Three distinct options for 90" kitchen bar cabinet - Modern farmhouse aesthetic
      </p>

      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ background: '#1e293b', borderRadius: 8 }}>
        {/* Option A */}
        {renderOptionA(10)}
        <text x={(totalWidth * scale) / 2 + 10} y={totalHeight * scale + 40} fill="#3b82f6" fontSize={14} fontWeight="bold" textAnchor="middle">
          Option A: Classic Symmetry
        </text>
        <text x={(totalWidth * scale) / 2 + 10} y={totalHeight * scale + 58} fill={labelColor} fontSize={11} textAnchor="middle">
          3 drawers + 4 equal doors
        </text>

        {/* Option B */}
        {renderOptionB(totalWidth * scale + 40)}
        <text x={(totalWidth * scale) * 1.5 + 40} y={totalHeight * scale + 40} fill="#10b981" fontSize={14} fontWeight="bold" textAnchor="middle">
          Option B: Open Shelving Mix
        </text>
        <text x={(totalWidth * scale) * 1.5 + 40} y={totalHeight * scale + 58} fill={labelColor} fontSize={11} textAnchor="middle">
          Open shelves + 3 doors
        </text>

        {/* Option C */}
        {renderOptionC(totalWidth * scale * 2 + 70)}
        <text x={(totalWidth * scale) * 2.5 + 70} y={totalHeight * scale + 40} fill="#f59e0b" fontSize={14} fontWeight="bold" textAnchor="middle">
          Option C: Functional Asymmetry
        </text>
        <text x={(totalWidth * scale) * 2.5 + 70} y={totalHeight * scale + 58} fill={labelColor} fontSize={11} textAnchor="middle">
          Wide platter door + drawer group
        </text>
      </svg>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <div style={{ padding: 20, background: '#1e293b', borderRadius: 8, borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#3b82f6', marginTop: 0 }}>Option A</h3>
          <h4 style={{ marginBottom: 8 }}>Pros</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Perfectly symmetrical</li>
            <li>Easiest to build</li>
            <li>Traditional appeal</li>
            <li>Maximum drawer storage</li>
          </ul>
          <h4 style={{ marginBottom: 8 }}>Cons</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Less visual interest</li>
            <li>No display opportunities</li>
            <li>Conventional layout</li>
          </ul>
        </div>

        <div style={{ padding: 20, background: '#1e293b', borderRadius: 8, borderTop: '4px solid #10b981' }}>
          <h3 style={{ color: '#10b981', marginTop: 0 }}>Option B</h3>
          <h4 style={{ marginBottom: 8 }}>Pros</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Modern farmhouse style</li>
            <li>Display for decor/books</li>
            <li>Visual lightness</li>
            <li>Personality & character</li>
          </ul>
          <h4 style={{ marginBottom: 8 }}>Cons</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Less enclosed storage</li>
            <li>Needs styling/maintenance</li>
            <li>Dust collection on shelves</li>
          </ul>
        </div>

        <div style={{ padding: 20, background: '#1e293b', borderRadius: 8, borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#f59e0b', marginTop: 0 }}>Option C</h3>
          <h4 style={{ marginBottom: 8 }}>Pros</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Optimized for platters</li>
            <li>Functional asymmetry</li>
            <li>Grouped drawers</li>
            <li>Unique & interesting</li>
          </ul>
          <h4 style={{ marginBottom: 8 }}>Cons</h4>
          <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Unbalanced appearance</li>
            <li>More complex joinery</li>
            <li>Fewer drawers</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 30, padding: 20, background: '#1e293b', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Quick Comparison</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #475569' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94a3b8' }}>Feature</th>
              <th style={{ textAlign: 'center', padding: '12px 8px', color: '#3b82f6' }}>Option A</th>
              <th style={{ textAlign: 'center', padding: '12px 8px', color: '#10b981' }}>Option B</th>
              <th style={{ textAlign: 'center', padding: '12px 8px', color: '#f59e0b' }}>Option C</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px 8px' }}>Door Count</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>4</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>3</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>3</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px 8px' }}>Drawer Count</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>3</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>0</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>2</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px 8px' }}>Open Storage</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>None</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>13" shelves</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>None</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px 8px' }}>Build Complexity</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Simple</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Moderate</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Moderate</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px 8px' }}>Style</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Traditional</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Modern Farmhouse</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Contemporary</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 8px' }}>Best For</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Max storage</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Display</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>Entertaining</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
