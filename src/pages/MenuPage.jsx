import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const TOTAL = 23;
const pages = Array.from({ length: TOTAL }, (_, i) => `/menu-images/${i + 1}.webp`);

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-noir pt-20 pb-20">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0   }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 px-4"
      >
        <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-2">— Our Offerings —</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white">The Menu</h1>
        <div className="h-px w-20 bg-gold/30 mx-auto mt-4" />
      </motion.div>

      {/* ── Vertical Image Stack ── */}
      <div className="max-w-2xl mx-auto px-2 flex flex-col gap-1">
        {pages.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`Menu page ${i + 1}`}
            loading={i < 3 ? 'eager' : 'lazy'}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.4 }}
            className="w-full block"
            style={{ display: 'block' }}
          />
        ))}
      </div>

      {/* ── Download Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-10"
      >
        <a
          href="/menu.pdf"
          download="Hashtag-Menu.pdf"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-gold/40 text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Download Menu PDF
        </a>
      </motion.div>

    </div>
  );
}
