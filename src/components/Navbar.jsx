import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const navLinks = [
  { label: 'Menu',    to: '/menu'    },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Reserve', href: '#booking' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1  }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? 'glass py-2 shadow-lg shadow-black/50' : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo — inline SVG, zero background, guaranteed transparent */}
        <Link to="/" className="flex items-center select-none">
          <svg viewBox="0 0 185 58" className="h-10 md:h-12" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
              `}</style>
            </defs>
            {/* Main logo text — white */}
            <text
              x="4" y="36"
              fill="#ffffff"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 34 }}
            >#ashtag</text>
            {/* Subtitle — gold */}
            <text
              x="6" y="52"
              fill="#C9A96E"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: '0.12em' }}
            >RESTAURANT &amp; CAFÉ</text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <li key={l.label}>
              {l.to ? (
                <Link
                  to={l.to}
                  className="text-sm font-medium text-white/70 hover:text-gold transition-colors duration-300 tracking-widest uppercase"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="text-sm font-medium text-white/70 hover:text-gold transition-colors duration-300 tracking-widest uppercase"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Reserve CTA — desktop */}
        {isHome && (
          <a
            href="#booking"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
          >
            Reserve a Table
          </a>
        )}
        {!isHome && (
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
          >
            ← Back Home
          </Link>
        )}

        {/* Mobile */}
        <button
          className="md:hidden text-gold p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass border-t border-gold/10 px-5 py-4"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map(l => (
              <li key={l.label}>
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-white/80 hover:text-gold transition-colors uppercase tracking-widest"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-white/80 hover:text-gold transition-colors uppercase tracking-widest"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
