import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../menuData';

const categories = Object.keys(menuData);

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MenuSection({ onOrder }) {
  const [activeTab, setActiveTab] = useState('Drinks');

  return (
    <section id="menu" className="py-28 px-5 bg-noir-800">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-medium">Curated Selection</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Our <span className="gold-text">Menu</span>
          </h2>
          <div className="w-16 h-px bg-gold/30 mx-auto" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                activeTab === cat
                  ? 'text-noir font-semibold'
                  : 'text-white/50 border border-white/10 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {activeTab === cat && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gold-gradient"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {menuData[activeTab].map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} onOrder={onOrder} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuCard({ item, index, onOrder }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hovered"
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-noir-700 border border-white/5 hover:border-gold/20 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
          variants={{ hovered: { scale: 1.08 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Glow overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-noir-700 via-transparent to-transparent"
          variants={{ hovered: { background: 'linear-gradient(to top, rgba(26,26,26,0.9) 0%, rgba(201,169,110,0.05) 50%, transparent 100%)' } }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: 'inset 0 0 40px rgba(201,169,110,0.15)' }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors duration-300">{item.name}</h3>
          <span className="text-gold font-semibold text-sm whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-5 line-clamp-2">{item.desc}</p>

        <motion.button
          onClick={() => onOrder(item)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-xl border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
        >
          Order Now
        </motion.button>
      </div>
    </motion.div>
  );
}
