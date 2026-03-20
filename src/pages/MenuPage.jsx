import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories } from '../menuData';

/* ─── Floating background orb ─── */
function Orb({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: 'blur(80px)', ...style }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 8 + Math.random() * 4, ease: 'easeInOut' }}
    />
  );
}

/* ─── Per-card animation variants ─── */
const cardVariants = {
  hidden:  { opacity: 0, y: 50, scale: 0.92 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

/* ─── Page fade ─── */
const pageVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [search, setSearch] = useState('');

  const category = menuCategories.find(c => c.id === activeCategory);

  const filteredItems = search.trim()
    ? menuCategories.flatMap(c =>
        c.items.map(item => ({ ...item, categoryImg: c.img }))
      ).filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
      )
    : (category?.items ?? []).map(item => ({ ...item, categoryImg: category.img }));

  return (
    <motion.main
      className="min-h-screen bg-noir pt-24 pb-20 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Orb style={{ left: '5%',  top: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)' }} />
        <Orb style={{ right: '10%', top: '50%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(184,115,51,0.12) 0%, transparent 70%)' }} />
        <Orb style={{ left: '40%', bottom: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <section className="py-14 px-5 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1 }}
            className="text-gold/60 text-xs tracking-[0.4em] uppercase font-medium mb-3"
          >
            #hashtag Restaurant & Café
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl font-bold mb-3"
          >
            Our <span className="gold-text italic">Menu</span>
          </motion.h1>

          {/* Animated divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div className="h-px bg-gold/30" initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.5, duration: 0.8 }} />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <motion.div className="h-px bg-gold/30" initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.5, duration: 0.8 }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/35 text-sm max-w-md mx-auto mb-8"
          >
            From your first sip to your last bite — every item crafted with passion.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40">🔍</span>
              <input
                type="text"
                placeholder="Search any item…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-gold/50 rounded-2xl pl-10 pr-8 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/8 focus:shadow-lg focus:shadow-gold/10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold text-xs transition-colors">✕</button>
              )}
            </div>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {/* ── Category tabs ── */}
          {!search && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 overflow-x-auto pb-4 mb-10"
              style={{ scrollbarWidth: 'none' }}
            >
              {menuCategories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-noir font-semibold shadow-lg shadow-gold/20'
                      : 'text-white/50 border border-white/10 hover:border-gold/30 hover:text-gold'
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.span
                      layoutId="menu-pill"
                      className="absolute inset-0 rounded-full bg-gold-gradient"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.emoji}</span>
                  <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
                  <span className={`relative z-10 text-xs ${activeCategory === cat.id ? 'text-noir/60' : 'text-white/20'}`}>
                    ({cat.items.length})
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Search results header */}
          {search && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-white/40 text-sm mb-6"
            >
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for{' '}
              &ldquo;<span className="text-gold">{search}</span>&rdquo;
            </motion.p>
          )}

          {/* Active category hero label */}
          {!search && category && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + '_label'}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="text-3xl"
                  >
                    {category.emoji}
                  </motion.span>
                  <span>{category.label}</span>
                  <span className="text-white/20 text-base font-normal">
                    {category.items.length} items
                  </span>
                </h2>
                <motion.div
                  className="h-px mt-3 bg-gradient-to-r from-gold/40 via-gold/10 to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── Items Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={search || activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredItems.map((item, i) => (
                <MenuItemCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 text-white/25"
            >
              <p className="text-5xl mb-4">🍽</p>
              <p className="text-lg font-display">Nothing found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
}

/* ─────────────────────────────────────
   Menu Item Card — cinematic hover
───────────────────────────────────── */
function MenuItemCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-noir-700 border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? '0 0 0 1px rgba(201,169,110,0.3), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,169,110,0.1)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-noir-600">
        <motion.img
          src={item.categoryImg}
          alt={item.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-700 via-noir-700/30 to-transparent" />
        
        {/* Gold shimmer line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Price badge */}
        <motion.div
          className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-noir text-[11px] font-bold shadow-lg"
          animate={{ scale: hovered ? 1.1 : 1, y: hovered ? -1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.price}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 relative">
        {/* Animated gold accent line on left */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-0.5 bg-gold rounded-full"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'top' }}
        />

        <motion.h3
          className="font-display font-bold text-base text-white mb-1.5 line-clamp-1"
          animate={{ x: hovered ? 8 : 0, color: hovered ? '#C9A96E' : '#ffffff' }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.h3>
        <motion.p
          className="text-white/40 text-xs leading-relaxed line-clamp-2"
          animate={{ opacity: hovered ? 0.7 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {item.desc}
        </motion.p>

        {/* "View" hint on hover */}
        <motion.div
          className="mt-3 flex items-center gap-1 text-gold text-xs font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
          transition={{ duration: 0.25 }}
        >
          <span>View details</span>
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
          >→</motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
