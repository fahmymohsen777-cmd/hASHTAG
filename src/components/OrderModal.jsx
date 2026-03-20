import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';

export default function OrderModal({ item, onClose }) {
  const [qty,       setQty]       = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onClose, 1800);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed z-[90] bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center pointer-events-none"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div
          className="pointer-events-auto w-full md:max-w-md bg-noir-700 border border-gold/15 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black"
          onClick={e => e.stopPropagation()}
        >
          {/* Item image */}
          <div className="relative h-52 overflow-hidden">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-700 via-noir-700/60 to-transparent" />

            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {!confirmed ? (
              <>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-2xl font-bold text-white">{item.name}</h3>
                  <span className="text-gold font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">{item.desc}</p>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-white/60 text-sm tracking-widest uppercase">Quantity</span>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="font-display text-2xl font-bold text-white w-6 text-center">{qty}</span>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setQty(q => q + 1)}
                      className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Confirm button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  className="w-full py-4 rounded-2xl bg-gold-gradient text-noir font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Order
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-gold flex justify-center mb-4"
                >
                  <CheckCircle className="w-16 h-16" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Order Placed!</h3>
                <p className="text-white/50 text-sm">Your item has been added. Enjoy!</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
