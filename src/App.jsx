import React, { useState, lazy, Suspense } from 'react'

const visualizations = {
  'kitchen-bar-planner': lazy(() => import('../visualization/jsx/kitchen-bar-planner-v4.jsx')),
  'kitchen-floor-cabinets-sketch': lazy(() => import('../visualization/jsx/kitchen-floor-cabinets-sketch.jsx')),
}

export default function App() {
  const [current, setCurrent] = useState('kitchen-bar-planner')
  const Visualization = visualizations[current]

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#0a1628',
        borderBottom: '1px solid #243447',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <label style={{ color: '#94a3b8', fontSize: 13 }}>Visualization:</label>
        <select
          value={current}
          onChange={e => setCurrent(e.target.value)}
          style={{
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid #3b82f6',
            borderRadius: 4,
            padding: '6px 12px',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {Object.keys(visualizations).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div style={{ paddingTop: 50 }}>
        <Suspense fallback={<div style={{ color: '#94a3b8', padding: 20 }}>Loading...</div>}>
          <Visualization />
        </Suspense>
      </div>
    </div>
  )
}
