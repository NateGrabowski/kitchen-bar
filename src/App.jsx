import React, { useState, useEffect, lazy, Suspense } from 'react'
import { NotesButton, NotesModal } from './NotesViewer'

const visualizations = {
  'current-goal': lazy(() => import('../visualization/jsx/kitchen-floor-cabinets-sketch.jsx')),
  'kitchen-bar-planner': lazy(() => import('../visualization/jsx/kitchen-bar-planner-v4.jsx')),
  'kitchen-design-enhanced': lazy(() => import('../visualization/jsx/kitchen-design-enhanced.jsx')),
  'nook-terrace-concepts': lazy(() => import('../visualization/jsx/nook-terrace-concepts-explorer.jsx')),
  // Baseline template (copy of chevron-speakeasy for consistency)
  'concept-baseline': lazy(() => import('../visualization/jsx/concept-baseline.jsx')),
  // Phase 2 Concept Sketches - Round 1 (Materials & Features)
  'concept-live-edge-waterfall': lazy(() => import('../visualization/jsx/concept-live-edge-waterfall.jsx')),
  'concept-chevron-speakeasy': lazy(() => import('../visualization/jsx/concept-chevron-speakeasy.jsx')),
  'concept-floating-cantilever': lazy(() => import('../visualization/jsx/concept-floating-cantilever.jsx')),
  // Phase 2 Concept Sketches - Round 2 (Structural Variations)
  'concept-kitchen-floor-cabinets': lazy(() => import('../visualization/jsx/concept-kitchen-floor-cabinets.jsx')),
  'concept-open-shelving': lazy(() => import('../visualization/jsx/concept-open-shelving.jsx')),
  'concept-angled-bar': lazy(() => import('../visualization/jsx/concept-angled-bar.jsx')),
  'concept-sliding-bar': lazy(() => import('../visualization/jsx/concept-sliding-bar.jsx')),
}

export default function App() {
  const [current, setCurrent] = useState('current-goal')
  const [notesOpen, setNotesOpen] = useState(window.location.hash === '#notes')
  const Visualization = visualizations[current]

  // Sync URL hash with notes modal state
  useEffect(() => {
    if (notesOpen) {
      window.location.hash = 'notes'
    } else if (window.location.hash === '#notes') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [notesOpen])

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
        <div style={{ marginLeft: 'auto' }}>
          <NotesButton onClick={() => setNotesOpen(true)} />
        </div>
      </div>
      <NotesModal isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      <div style={{ paddingTop: 50 }}>
        <Suspense fallback={<div style={{ color: '#94a3b8', padding: 20 }}>Loading...</div>}>
          <Visualization />
        </Suspense>
      </div>
    </div>
  )
}
