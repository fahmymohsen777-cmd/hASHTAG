import { motion } from 'framer-motion';
import { QrCode, ScanLine, ShoppingCart, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: QrCode,
    title: 'Scan',
    desc: 'Find the QR code on your table. Open your phone camera and scan it — no app required.',
  },
  {
    number: '02',
    icon: ScanLine,
    title: 'Browse',
    desc: 'Explore our full menu with photos, descriptions, and daily specials — all right on your device.',
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'Order',
    desc: 'Add to your basket and confirm. Your order goes straight to our kitchen in seconds.',
  },
];

export default function QRSection() {
  return (
    <section id="qr" className="py-28 px-5 bg-noir-800 relative overflow-hidden">
      {/* Glow blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-copper/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-medium">Smart Ordering</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            QR <span className="gold-text">Guide</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Experience zero-wait ordering. Scan, browse, and order — without leaving your seat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="relative glass rounded-3xl p-8 group transition-all duration-500 hover:border-gold/30"
            >
              {/* Gold number badge */}
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-gold-gradient text-noir text-xs font-bold tracking-widest">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors duration-300 mt-3">
                <step.icon className="w-7 h-7 text-gold" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>

              {/* Connector line (not last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gold/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Central QR illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative glass rounded-3xl px-10 py-8 flex flex-col items-center text-center max-w-sm">
            <Sparkles className="w-5 h-5 text-gold mb-4 animate-pulse" />
            <div className="w-28 h-28 rounded-2xl bg-white p-2 mb-5 shadow-2xl shadow-gold/10">
              {/* SVG QR Code pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Top-left finder */}
                <rect x="5" y="5" width="35" height="35" rx="4" fill="#080808"/>
                <rect x="10" y="10" width="25" height="25" rx="2" fill="white"/>
                <rect x="15" y="15" width="15" height="15" rx="1" fill="#080808"/>
                {/* Top-right finder */}
                <rect x="60" y="5" width="35" height="35" rx="4" fill="#080808"/>
                <rect x="65" y="10" width="25" height="25" rx="2" fill="white"/>
                <rect x="70" y="15" width="15" height="15" rx="1" fill="#080808"/>
                {/* Bottom-left finder */}
                <rect x="5" y="60" width="35" height="35" rx="4" fill="#080808"/>
                <rect x="10" y="65" width="25" height="25" rx="2" fill="white"/>
                <rect x="15" y="70" width="15" height="15" rx="1" fill="#080808"/>
                {/* Data modules (simplified) */}
                {[50,55,60,65,70,75,80,85,90].map((x,i) => (
                  [50,55,60,65,70,75,80,85,90].map((y,j) => (
                    (i+j)%3 !== 0 && (
                      <rect key={`${i}-${j}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#080808"/>
                    )
                  ))
                ))}
                {[5,10,15,20,25].map((x,i) => (
                  [50,55,60,65,70,75,80,85].map((y,j) => (
                    (i*3+j)%4 !== 0 && (
                      <rect key={`b${i}-${j}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#080808"/>
                    )
                  ))
                ))}
              </svg>
            </div>
            <p className="text-white/70 text-sm font-medium mb-1">Scan at your table</p>
            <p className="text-white/30 text-xs">noor-dining.com/menu</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
