import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

// ── list of menu pages ─────────────────────────────────────────────
const TOTAL = 23;
const pages = Array.from({ length: TOTAL }, (_, i) => `/menu-images/${i + 1}.webp`);

// ── tiny thumbnail grid ────────────────────────────────────────────
export default function MenuPage() {
  const [lightbox, setLightbox] = useState(null); // null | index

  const open  = useCallback(i => setLightbox(i), []);
  const close  = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox(i => (i - 1 + TOTAL) % TOTAL), []);
  const next  = useCallback(() => setLightbox(i => (i + 1) % TOTAL), []);

  return (
    <div className="min-h-screen bg-noir pt-24 pb-16 px-4">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y:  0  }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3">— Our Offerings —</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Menu</h1>
        <div className="h-px w-24 bg-gold/30 mx-auto mb-6" />
        <a
          href="/menu.pdf"
          download="Hashtag-Menu.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-gold/80 text-xs tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </motion.div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {pages.map((src, i) => (
          <motion.button
            key={src}
            onClick={() => open(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1    }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 hover:border-gold/40 transition-all duration-300"
          >
            <img
              src={src}
              alt={`Menu page ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <span className="absolute bottom-2 right-2 text-white/40 text-xs group-hover:text-gold/70 transition-colors">
              {i + 1}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={close}
          >
            {/* image */}
            <motion.img
              key={lightbox}
              src={pages[lightbox]}
              alt={`Menu page ${lightbox + 1}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{    scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            {/* close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold/30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightbox + 1} / {TOTAL}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
