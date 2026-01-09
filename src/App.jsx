import React, { useState, useEffect, Suspense } from 'react'
import { NotesButton, NotesModal } from './NotesViewer'

// Auto-discover all JSX visualizations in the folder
const modules = import.meta.glob('../visualization/jsx/*.jsx')

// Build visualization map from discovered files
const visualizations = {}
for (const path in modules) {
  // Extract filename without extension: '../visualization/jsx/foo.jsx' -> 'foo'
  const name = path.split('/').pop().replace('.jsx', '')
  visualizations[name] = React.lazy(modules[path])
}

const defaultViz = Object.keys(visualizations)[0]

export default function App() {
  const [current, setCurrent] = useState(defaultViz)
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

  const vizKeys = Object.keys(visualizations)
  const showSelector = vizKeys.length > 1

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
        {showSelector ? (
          <>
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
              {vizKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </>
        ) : (
          <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500 }}>Kitchen Bar Design</span>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <NotesButton onClick={() => setNotesOpen(true)} />
        </div>
      </div>
      <NotesModal isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      <div style={{ paddingTop: 50 }}>
        <Suspense fallback={<div style={{ color: '#94a3b8', padding: 20 }}>Loading...</div>}>
          {Visualization && <Visualization />}
        </Suspense>
      </div>
    </div>
  )
}
