import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ⚠️ غيّر الرقم ده لرقمك الحقيقي (كود الدولة بدون +)
const WHATSAPP_NUMBER = '201001234567';
const WHATSAPP_MSG = 'مرحباً، أود الاستفسار عن...';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1a1a1a] text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 whitespace-nowrap shadow-xl"
          >
            💬 تواصل معنا
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: '#25D366' }}
        aria-label="تواصل معنا على واتساب"
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: '#25D366' }}
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: '#25D366' }}
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />

        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7 relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.529 5.845L0 24l6.335-1.506A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.032-1.383l-.36-.214-3.733.887.937-3.618-.235-.372A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.431 0 9.818 4.388 9.818 9.818 0 5.431-4.387 9.818-9.818 9.818z"/>
        </svg>
      </motion.button>
    </div>
  );
}
