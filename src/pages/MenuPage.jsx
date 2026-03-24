import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MenuPage() {
  const [scale, setScale] = useState(1);

  const zoomIn  = () => setScale(s => Math.min(s + 0.25, 2.5));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));

  return (
    <div className="min-h-screen bg-noir pt-24 pb-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y:  0  }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 px-4"
      >
        <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3">— Our Offerings —</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          The Menu
        </h1>
        <div className="h-px w-24 bg-gold/30 mx-auto" />
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-3 mb-6 px-4"
      >
        <button
          onClick={zoomOut}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white/30 text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
        <button
          onClick={zoomIn}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <a
          href="/menu.pdf"
          download="Hashtag-Menu.pdf"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold/80 text-xs tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
      </motion.div>

      {/* PDF Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mx-auto px-4"
        style={{ maxWidth: '900px' }}
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <iframe
            src={`/menu.pdf#toolbar=0&navpanes=0&scrollbar=1&zoom=${Math.round(scale * 100)}`}
            title="Hashtag Menu"
            className="w-full"
            style={{ height: '85vh', border: 'none' }}
          />
        </div>

        {/* Mobile fallback */}
        <p className="text-center text-white/20 text-xs mt-4">
          Can&apos;t view the PDF?{' '}
          <a href="/menu.pdf" target="_blank" rel="noreferrer" className="text-gold/50 underline">
            Open in new tab
          </a>
        </p>
      </motion.div>
    </div>
  );
}
