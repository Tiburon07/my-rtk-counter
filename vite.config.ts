// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// 1. Importiamo il plugin SVGR
import svgr from 'vite-plugin-svgr'; 
 

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // 3. Configuriamo le opzioni (esempio)
      filename: 'dist/stats.html', // Percorso di output relativo alla 'root'
      open: true,                  // Apre automaticamente il report nel browser
      gzipSize: true,              // Mostra la dimensione gzippata (fondamentale)
      brotliSize: true,            // Mostra la dimensione Brotli (ancora più realistica)
      template: 'treemap',           // 'sunburst' o 'treemap' (preferenza personale)
    }),
    // 2. Aggiungiamo il plugin alla pipeline
    ViteImageOptimizer({
      // Configurazione per gli ottimizzatori
      // (Spesso i default sono già eccellenti)
      png: {
        quality: 85, // Qualità da 0 a 100
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      // Possiamo anche configurare la generazione di formati moderni
      webp: {
        quality: 85,
      },
      avif: {
        quality: 70, // AVIF è molto efficiente, si può scendere
      },
    }),
    // 2. Aggiungiamo il plugin SVGR
    svgr() 
  ],
  // Inizia la nostra nuova configurazione di build
  build: {
    sourcemap: true, // Utile per analizzare i bundle
    rollupOptions: {
      output: { manualChunks: undefined },
      //output: {
      //  manualChunks(id) {
      //    // Normalizza i separatori di percorso per
      //    // funzionare sia su Windows che su Mac/Linux
      //    const path = id.replace(/\\/g, '/');

      //    if (path.includes('/node_modules/')) {
      //     
      //      // 1. REGOLA ROUTER (Super-specifica)
      //      // Deve catturare sia il wrapper (dom) che il core (router)
      //      if (path.includes('/node_modules/react-router-dom/') || path.includes('/node_modules/react-router/')) {
      //        return 'vendor-router';
      //      }

      //      // 2. REGOLA REACT CORE (Ultra-specifica)
      //      // Controlliamo l'intera cartella per evitare 'react-anything-else'
      //      // Usiamo '/react/' e '/react-dom/' (con gli slash)
      //      if (path.includes('/node_modules/react-dom/')) {
      //        return 'vendor-react-core';
      //      }
      //      if (path.includes('/node_modules/react/')) {
      //        return 'vendor-react-core';
      //      }
      //     
      //      // 3. REGOLA "FALLBACK"
      //      // Tutto il resto (axios, zustand, ecc.)
      //      return 'vendor-others';
      //    }
      //  },
      //},
    },
  },
});

 
