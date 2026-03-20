import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

/* TikTok SVG icon (not in lucide-react) */
function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.74a4.85 4.85 0 0 1-1-.05z"/>
    </svg>
  );
}

const socials = [
  { icon: Instagram,  href: '#', label: 'Instagram' },
  { icon: TikTokIcon, href: '#', label: 'TikTok'    },
  { icon: Facebook,   href: '#', label: 'Facebook'  },
];

const links = [
  { label: 'Menu',    href: '/menu'    },
  { label: 'Reserve', href: '#booking' },
];

export default function Footer() {
  return (
    <footer className="bg-noir-800 border-t border-white/5 pt-16 pb-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            {/* Logo */}
            <Link to="/" className="inline-block mb-3 select-none">
              <svg viewBox="0 0 185 58" className="h-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');`}</style>
                </defs>
                <text x="4" y="36" fill="#ffffff"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 34 }}
                >#ashtag</text>
                <text x="6" y="52" fill="#C9A96E"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: '0.12em' }}
                >RESTAURANT &amp; CAFÉ</text>
              </svg>
            </Link>

            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Where shadows and candles dance — a cinematic dining experience unlike any other.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium mb-5">Navigation</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/40 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium mb-5">Find Us</h4>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: '84 El-Sayed El-Merghany, Cairo, Egypt' },
                { icon: Phone,  text: '+20 1XX XXX XXXX'                      },
                { icon: Mail,   text: 'hello@ashtag-cafe.com'                 },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-gold/50 mt-0.5 shrink-0" />
                  <span className="text-white/40 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2026 #ashtag Café. جميع الحقوق محفوظة.</p>
          <p className="text-white/15 text-xs">معمول بواسطة <span className="text-gold/30">Fahmy Mohsen</span></p>
        </div>
      </div>
    </footer>
  );
}
