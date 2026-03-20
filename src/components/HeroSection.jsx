import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';

/* ─── Floating orb ─── */
function FloatingOrb({ x, y, size, duration, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
        filter: 'blur(60px)',
        willChange: 'transform, opacity',
      }}
      animate={{
        y: ['0%', '-15%', '0%'],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const titleWords = ['A', 'Cinematic', 'Dining', 'Experience'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};
const wordVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity= useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* Animated "shimmer" line counter */
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => (c + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0 scale-110">
        <img src={heroBg} alt="Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/55 to-noir" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/70 via-transparent to-noir/70" />
      </motion.div>

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <FloatingOrb x="5%"   y="15%"  size="450px" duration={12} delay={0}   color="#C9A96E" />
        <FloatingOrb x="60%"  y="45%"  size="500px" duration={15} delay={2}   color="#B87333" />
      </div>

      {/* Animated grain */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* Animated gold line decorations */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        style={{ height: '40vh' }}
      />
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        style={{ height: '40vh' }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-5 max-w-5xl mx-auto"
      >

        {/* Staggered title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-tight mb-6"
          style={{ perspective: '1000px' }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {i === 2 ? <span className="gold-text italic">{word}</span> : word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="text-white/50 text-base md:text-lg font-light tracking-wide max-w-xl mx-auto mb-4"
        >
          Where every dish tells a story and every sip is a journey through the finest flavours.
        </motion.p>



        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/menu"
            className="group relative px-8 py-4 rounded-full bg-gold-gradient text-noir font-semibold tracking-widest uppercase text-sm overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%', skewX: '-20deg' }}
              whileHover={{ x: '120%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">Explore Menu</span>
          </Link>
          <a
            href="#booking"
            className="px-8 py-4 rounded-full border border-gold/30 text-gold font-medium tracking-widest uppercase text-sm hover:bg-gold/10 hover:border-gold/60 transition-all duration-400"
          >
            Reserve a Table
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/40"
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
