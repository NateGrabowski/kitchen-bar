import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin to auto-generate image manifest for notes
function notesImageManifest() {
  const publicDir = 'public'
  const notesDir = 'notes'
  const manifestPath = path.join(publicDir, notesDir, 'manifest.json')

  function generateManifest() {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const manifest = { images: [], ideaImages: [] }

    // Scan notes root for images
    const notesPath = path.join(publicDir, notesDir)
    if (fs.existsSync(notesPath)) {
      fs.readdirSync(notesPath).forEach(file => {
        const ext = path.extname(file).toLowerCase()
        if (imageExtensions.includes(ext)) {
          manifest.images.push(file)
        }
      })
    }

    // Scan ideas folder
    const ideasPath = path.join(publicDir, notesDir, 'ideas')
    if (fs.existsSync(ideasPath)) {
      fs.readdirSync(ideasPath).forEach(file => {
        const ext = path.extname(file).toLowerCase()
        if (imageExtensions.includes(ext)) {
          manifest.ideaImages.push(file)
        }
      })
    }

    // Sort for consistent ordering
    manifest.images.sort()
    manifest.ideaImages.sort()

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    console.log(`📷 Generated image manifest: ${manifest.images.length} photos, ${manifest.ideaImages.length} ideas`)
  }

  return {
    name: 'notes-image-manifest',
    buildStart() {
      generateManifest()
    },
    configureServer(server) {
      // Regenerate on file changes in dev mode
      generateManifest()
      server.watcher.on('add', (file) => {
        if (file.includes(notesDir)) generateManifest()
      })
      server.watcher.on('unlink', (file) => {
        if (file.includes(notesDir)) generateManifest()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), notesImageManifest()],
  root: '.',
  base: '/kitchen-bar/',
})
