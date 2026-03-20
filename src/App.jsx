import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import HomePage    from './pages/HomePage';
import MenuPage    from './pages/MenuPage';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <BrowserRouter>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #C9A96E, #E2C97E, #B87333)' }}
      />

      <Navbar />

      <Routes>
        <Route path="/"     element={<HomePage />}  />
        <Route path="/menu" element={<MenuPage />}  />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
