import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Base URL from Vite (handles /kitchen-bar/ prefix on GitHub Pages)
const BASE = import.meta.env.BASE_URL

// Configuration - add more content here
const CONFIG = {
  docs: [
    { title: 'Project Brief', path: `${BASE}notes/kitchen-bar-project-brief.md` }
  ],
  images: [
    { path: `${BASE}notes/1.jpg`, alt: 'Reference photo 1' },
    { path: `${BASE}notes/2.jpg`, alt: 'Reference photo 2' },
    { path: `${BASE}notes/3.jpg`, alt: 'Reference photo 3' },
  ],
  // Add idea photos here: { path: `${BASE}notes/ideas/filename.jpg`, alt: 'Description' }
  ideaImages: [
    { path: `${BASE}notes/ideas/idea1.jpg`, alt: 'Description' },
    { path: `${BASE}notes/ideas/idea2.jpg`, alt: 'Description' },
    { path: `${BASE}notes/ideas/idea3.jpg`, alt: 'Description' },
    { path: `${BASE}notes/ideas/idea4.jpg`, alt: 'Description' },
    { path: `${BASE}notes/ideas/idea5.jpg`, alt: 'Description' },
  ]
}

const styles = {
  button: {
    background: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #3b82f6',
    borderRadius: 4,
    padding: '6px 12px',
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#0f172a',
    borderRadius: 8,
    width: '80%',
    maxWidth: 900,
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #334155',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #334155',
  },
  title: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: 24,
    cursor: 'pointer',
    padding: '0 4px',
    lineHeight: 1,
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #334155',
  },
  tab: {
    padding: '10px 20px',
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: 14,
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: -1,
  },
  tabActive: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 20,
  },
  markdown: {
    color: '#e2e8f0',
    lineHeight: 1.6,
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 6,
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border-color 0.2s',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
  },
  lightboxClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: 32,
    cursor: 'pointer',
  },
  lightboxNav: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: '#fff',
    fontSize: 32,
    cursor: 'pointer',
    padding: '20px 15px',
    borderRadius: 4,
  },
}

// GitHub-flavored markdown styles
const markdownComponents = {
  h1: ({ children }) => <h1 style={{ color: '#f1f5f9', borderBottom: '1px solid #334155', paddingBottom: 8, marginTop: 24 }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ color: '#f1f5f9', borderBottom: '1px solid #334155', paddingBottom: 6, marginTop: 20 }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ color: '#f1f5f9', marginTop: 16 }}>{children}</h3>,
  p: ({ children }) => <p style={{ margin: '12px 0' }}>{children}</p>,
  ul: ({ children }) => <ul style={{ paddingLeft: 24, margin: '8px 0' }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ paddingLeft: 24, margin: '8px 0' }}>{children}</ol>,
  li: ({ children }) => <li style={{ margin: '4px 0' }}>{children}</li>,
  a: ({ href, children }) => <a href={href} style={{ color: '#60a5fa' }} target="_blank" rel="noopener noreferrer">{children}</a>,
  code: ({ inline, children }) => inline
    ? <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4, fontSize: '0.9em' }}>{children}</code>
    : <code style={{ display: 'block', background: '#1e293b', padding: 12, borderRadius: 6, overflow: 'auto', fontSize: '0.9em' }}>{children}</code>,
  pre: ({ children }) => <pre style={{ background: '#1e293b', padding: 12, borderRadius: 6, overflow: 'auto', margin: '12px 0' }}>{children}</pre>,
  blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: 16, margin: '12px 0', color: '#94a3b8' }}>{children}</blockquote>,
  table: ({ children }) => <table style={{ borderCollapse: 'collapse', width: '100%', margin: '12px 0' }}>{children}</table>,
  th: ({ children }) => <th style={{ border: '1px solid #334155', padding: '8px 12px', background: '#1e293b', textAlign: 'left' }}>{children}</th>,
  td: ({ children }) => <td style={{ border: '1px solid #334155', padding: '8px 12px' }}>{children}</td>,
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #334155', margin: '20px 0' }} />,
  strong: ({ children }) => <strong style={{ color: '#f1f5f9' }}>{children}</strong>,
}

export function NotesButton({ onClick }) {
  return (
    <button style={styles.button} onClick={onClick}>
      <span>📋</span> Notes
    </button>
  )
}

export function NotesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('docs')
  const [markdownContent, setMarkdownContent] = useState({})
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [lightboxSource, setLightboxSource] = useState('images') // 'images' or 'ideas'

  // Load markdown files
  useEffect(() => {
    if (!isOpen) return
    CONFIG.docs.forEach(doc => {
      if (!markdownContent[doc.path]) {
        fetch(doc.path)
          .then(res => res.text())
          .then(text => setMarkdownContent(prev => ({ ...prev, [doc.path]: text })))
          .catch(() => setMarkdownContent(prev => ({ ...prev, [doc.path]: 'Failed to load content.' })))
      }
    })
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null)
        else onClose()
      }
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, lightboxIndex, onClose])

  if (!isOpen) return null

  const tabs = [
    ...CONFIG.docs.map(d => ({ id: 'doc-' + d.path, label: d.title, type: 'doc', data: d })),
    { id: 'photos', label: 'Reference Photos', type: 'photos' },
    { id: 'ideas', label: 'Idea Photos', type: 'ideas' }
  ]

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <>
      <div style={styles.backdrop} onClick={onClose}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={styles.header}>
            <h2 style={styles.title}>Project Notes</h2>
            <button style={styles.closeBtn} onClick={onClose}>&times;</button>
          </div>
          <div style={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                style={{ ...styles.tab, ...(activeTab === tab.id ? styles.tabActive : {}) }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={styles.content}>
            {activeTabData.type === 'doc' && (
              <div style={styles.markdown}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {markdownContent[activeTabData.data.path] || 'Loading...'}
                </ReactMarkdown>
              </div>
            )}
            {activeTabData.type === 'photos' && (
              <div style={styles.imageGrid}>
                {CONFIG.images.map((img, idx) => (
                  <img
                    key={img.path}
                    src={img.path}
                    alt={img.alt}
                    style={styles.thumbnail}
                    onClick={() => { setLightboxSource('images'); setLightboxIndex(idx) }}
                    onMouseOver={e => e.target.style.borderColor = '#3b82f6'}
                    onMouseOut={e => e.target.style.borderColor = 'transparent'}
                  />
                ))}
              </div>
            )}
            {activeTabData.type === 'ideas' && (
              CONFIG.ideaImages.length > 0 ? (
                <div style={styles.imageGrid}>
                  {CONFIG.ideaImages.map((img, idx) => (
                    <img
                      key={img.path}
                      src={img.path}
                      alt={img.alt}
                      style={styles.thumbnail}
                      onClick={() => { setLightboxSource('ideas'); setLightboxIndex(idx) }}
                      onMouseOver={e => e.target.style.borderColor = '#3b82f6'}
                      onMouseOut={e => e.target.style.borderColor = 'transparent'}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 40 }}>
                  <p>No idea photos yet.</p>
                  <p style={{ fontSize: 13, marginTop: 8 }}>Add images to <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>public/notes/ideas/</code></p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (() => {
        const imageList = lightboxSource === 'ideas' ? CONFIG.ideaImages : CONFIG.images
        return (
          <div style={styles.lightbox} onClick={() => setLightboxIndex(null)}>
            <button style={styles.lightboxClose} onClick={() => setLightboxIndex(null)}>&times;</button>
            {imageList.length > 1 && (
              <>
                <button
                  style={{ ...styles.lightboxNav, left: 20 }}
                  onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + imageList.length) % imageList.length) }}
                >
                  &#8249;
                </button>
                <button
                  style={{ ...styles.lightboxNav, right: 20 }}
                  onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % imageList.length) }}
                >
                  &#8250;
                </button>
              </>
            )}
            <img
              src={imageList[lightboxIndex].path}
              alt={imageList[lightboxIndex].alt}
              style={styles.lightboxImage}
              onClick={e => e.stopPropagation()}
            />
          </div>
        )
      })()}
    </>
  )
}
