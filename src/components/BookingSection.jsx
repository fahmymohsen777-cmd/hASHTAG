import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, User, Send, CheckCircle } from 'lucide-react';

// ⚠️ Replace with your actual WhatsApp number (country code without +)
const WHATSAPP_NUMBER = '201001234567';

const fields = [
  { id: 'name',   label: 'Full Name',        icon: User,     type: 'text',    placeholder: 'Your name'   },
  { id: 'phone',  label: 'Phone Number',     icon: User,     type: 'tel',     placeholder: '+20 1XX XXX XXXX' },
  { id: 'date',   label: 'Date',             icon: Calendar, type: 'date',    placeholder: ''            },
  { id: 'time',   label: 'Time',             icon: Clock,    type: 'time',    placeholder: ''            },
  { id: 'guests', label: 'Number of Guests', icon: Users,    type: 'number',  placeholder: '2'           },
];

const fieldVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BookingSection() {
  const [values,  setValues]  = useState({});
  const [notes,   setNotes]   = useState('');
  const [sent,    setSent]    = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build WhatsApp message
    const msg = [
      `🌹 *طلب حجز جديد — #hashtag*`,
      ``,
      `👤 *الاسم:* ${values.name || '—'}`,
      `📱 *الهاتف:* ${values.phone || '—'}`,
      `📅 *التاريخ:* ${values.date || '—'}`,
      `🕐 *الوقت:* ${values.time || '—'}`,
      `👥 *عدد الأشخاص:* ${values.guests || '—'}`,
      notes ? `📝 *ملاحظات:* ${notes}` : null,
      ``,
      `سيتم الرد في أقرب وقت بتأكيد التوافر. شكراً لاختياركم #hashtag! 🙏`,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Show success state briefly then open WhatsApp
    setSent(true);
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="booking" className="py-28 px-5 relative overflow-hidden bg-noir">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-medium">Exclusive Dining</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Reserve Your <span className="gold-text">Table</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Fill in your details and we'll reach out via WhatsApp to confirm availability.
          </p>
        </motion.div>

        {/* Glassmorphism form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl p-8 shadow-2xl shadow-black"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((f, i) => (
              <motion.div
                key={f.id}
                custom={i}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label className="block text-white/50 text-xs tracking-widest uppercase mb-2 font-medium">
                  {f.label}
                </label>
                <div className="relative">
                  <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50 pointer-events-none" />
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    min={f.type === 'number' ? 1 : undefined}
                    max={f.type === 'number' ? 20 : undefined}
                    onChange={(e) => setValues(v => ({ ...v, [f.id]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-white/20 outline-none transition-all duration-300"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Notes */}
            <motion.div
              custom={5}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <label className="block text-white/50 text-xs tracking-widest uppercase mb-2 font-medium">
                Special Requests
              </label>
              <textarea
                rows={3}
                placeholder="Allergies, celebrations, dietary requirements…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 resize-none"
                style={{ colorScheme: 'dark' }}
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={sent}
              className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all duration-500 ${
                sent
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : 'bg-gold-gradient text-noir shadow-lg shadow-gold/20 hover:shadow-gold/30'
              }`}
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  جاري مراجعة توفر الأماكن… سيتم الرد عليك قريباً ✅
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Confirm via WhatsApp
                </>
              )}
            </motion.button>

            {!sent && (
              <p className="text-center text-white/25 text-xs mt-2">
                سيتم تحويلك إلى واتساب لإرسال بياناتك مباشرة
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
