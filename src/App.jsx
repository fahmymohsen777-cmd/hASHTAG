import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar           from './components/Navbar';
import Footer           from './components/Footer';
import WhatsAppButton   from './components/WhatsAppButton';
import { motion, useScroll, useSpring } from 'framer-motion';

const HomePage    = lazy(() => import('./pages/HomePage'));
const MenuPage    = lazy(() => import('./pages/MenuPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));

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

      <Suspense fallback={<div className="min-h-screen bg-noir" />}>
        <Routes>
          <Route path="/"        element={<HomePage />}     />
          <Route path="/menu"    element={<MenuPage />}     />
          <Route path="/reviews" element={<ReviewsPage />}  />
        </Routes>
      </Suspense>

      <WhatsAppButton />

      <Footer />
    </BrowserRouter>
  );
}
