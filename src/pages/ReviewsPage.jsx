import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';

// ⚠️ غيّر الرابط ده لرابط Google Reviews بتاعك
const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/DqYDBXEs8y3YkVpm8';
// ⚠️ غيّر الرقم ده لرقمك الحقيقي
const WHATSAPP_NUMBER = '201156943096';

const reviews = [
  {
    id: 1,
    name: 'Ahmed Mohamed',
    avatar: 'A',
    rating: 5,
    date: 'منذ أسبوع',
    text: 'تجربة رائعة من البداية للنهاية! الأجواء راقية جداً والطعام بيفوق التوقعات. المكان نظيف وأنيق والخدمة سريعة ومحترمة. هنرجع تاني أكيد! 🌟',
    lang: 'ar',
  },
  {
    id: 2,
    name: 'Sarah K.',
    avatar: 'S',
    rating: 5,
    date: '2 weeks ago',
    text: 'Absolutely stunning restaurant! The ambiance is incredible — dark, moody and so elegant. The food quality is top-notch and the staff are attentive without being intrusive. Highly recommend!',
    lang: 'en',
  },
  {
    id: 3,
    name: 'Omar Tarek',
    avatar: 'O',
    rating: 5,
    date: 'منذ شهر',
    text: 'أحسن مطعم جربته في المنطقة. كل حاجة من الديكور للأكل للخدمة تحس إنها متعمولة بحب واهتمام. الأسعار كويسة جداً مقارنة بالجودة.',
    lang: 'ar',
  },
  {
    id: 4,
    name: 'Lina Hassan',
    avatar: 'L',
    rating: 5,
    date: 'منذ 3 أسابيع',
    text: 'احتفلنا بعيد ميلاد فيه والمكان كان مبهر! الطاقم اهتم بكل التفاصيل وجابولنا سبرايز حلو. شكراً جزيلاً على الاهتمام الرائع! 🎂',
    lang: 'ar',
  },
  {
    id: 5,
    name: 'Karim Adel',
    avatar: 'K',
    rating: 5,
    date: 'منذ أسبوعين',
    text: 'من أجمل التجارب! القائمة متنوعة وفي خيارات لكل الأذواق. القهوة عندهم من أحسن القهوات اللي جربتها. مكان هادي ومريح للغاية.',
    lang: 'ar',
  },
  {
    id: 6,
    name: 'Nour Samy',
    avatar: 'N',
    rating: 5,
    date: '1 month ago',
    text: 'The QR ordering system is so smooth and modern. Food arrived fast, piping hot and beautifully presented. Will definitely be coming back with the whole family!',
    lang: 'en',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-gold/30 transition-all duration-300 group"
    >
      {/* Quote icon */}
      <Quote className="w-6 h-6 text-gold/30 group-hover:text-gold/50 transition-colors duration-300" />

      {/* Review text */}
      <p
        className="text-white/70 text-sm leading-relaxed flex-1"
        dir={review.lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {review.text}
      </p>

      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <StarRating count={review.rating} />
        <span className="text-white/30 text-xs">{review.date}</span>
      </div>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-noir font-bold text-sm">
          {review.avatar}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            {/* Google G icon */}
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white/30 text-xs">Google Review</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const avgRating = 5.0;

  const handleGoogleReview = () => window.open(GOOGLE_REVIEWS_URL, '_blank');
  const handleWhatsApp = () => {
    const msg = encodeURIComponent('مرحباً، أود مشاركة رأيي في تجربتي...');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-noir pt-24 pb-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-medium">
            آراء ضيوفنا
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            ماذا يقول <span className="gold-text">ضيوفنا</span>
          </h1>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-white">{avgRating.toFixed(1)}</span>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-white/40 text-xs mt-1">بناءً على آراء Google</span>
            </div>
          </div>

          <div className="w-16 h-px bg-gold/30 mx-auto" />
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-10 text-center max-w-2xl mx-auto"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <Star className="w-6 h-6 text-gold fill-gold/30" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            زيارتك تستحق <span className="gold-text">تقييم</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            رأيك يساعدنا على التطور ويساعد ضيوفنا الجدد على اتخاذ قرارهم. شاركنا تجربتك!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Google Review Button */}
            <motion.button
              onClick={handleGoogleReview}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#1a1a1a] font-semibold text-sm tracking-wide hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              اترك تقييمك على Google
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-full border border-[#25D366]/40 text-[#25D366] font-semibold text-sm tracking-wide hover:bg-[#25D366]/10 hover:border-[#25D366]/70 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.529 5.845L0 24l6.335-1.506A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.032-1.383l-.36-.214-3.733.887.937-3.618-.235-.372A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.431 0 9.818 4.388 9.818 9.818 0 5.431-4.387 9.818-9.818 9.818z"/>
              </svg>
              شاركنا رأيك على واتساب
            </motion.button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
