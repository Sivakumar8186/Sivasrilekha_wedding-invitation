import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";

const weddingDate = new Date("2026-12-30T03:57:00+05:30");
const MAP_URL = "https://maps.app.goo.gl/AQJLTwkVT12W4gsW9?g_st=aw";
const SITE_URL = "https://sivasrilekhawedding-invitation-dohk.vercel.app";

const copy = {
  en: {
    mantra: "Shree Ganeshaya Namah",
    family: "Together with our families",
    invite: "You are cordially invited to celebrate the wedding of",
    open: "Open Invitation",
    date: "30 December 2026",
    time: "Muhurtham · 3:57 AM",
    details: "Wedding Celebration",
    blessing: "With the blessings of our elders, we begin a beautiful new chapter.",
    countdown: "Counting down to our special day",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    venue: "Venue", location: "Salur, Andhra Pradesh",
    directions: "Get Directions", share: "Share Invitation",
    gallery: "Our Special Moments", note: "Your presence and blessings will make our day memorable.",
    groom: "Groom", bride: "Bride"
  },
  te: {
    mantra: "శ్రీ గణేశాయ నమః",
    family: "మా కుటుంబాల ఆశీర్వాదాలతో",
    invite: "మా వివాహ వేడుకకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము",
    open: "ఆహ్వాన పత్రిక తెరవండి",
    date: "30 డిసెంబర్ 2026",
    time: "శుభ ముహూర్తం · ఉదయం 3:57",
    details: "వివాహ వేడుక",
    blessing: "పెద్దల ఆశీస్సులతో మా జీవితంలో ఒక అందమైన కొత్త అధ్యాయం ప్రారంభం.",
    countdown: "శుభ ముహూర్తానికి మరికొంత సమయం",
    days: "రోజులు", hours: "గంటలు", minutes: "నిమిషాలు", seconds: "సెకన్లు",
    venue: "వేదిక", location: "సాలూరు, ఆంధ్రప్రదేశ్",
    directions: "మార్గాన్ని చూడండి", share: "ఆహ్వాన పత్రికను పంచుకోండి",
    gallery: "మా ప్రత్యేక క్షణాలు", note: "మీ రాక, ఆశీస్సులు మా రోజును మరింత ప్రత్యేకం చేస్తాయి.",
    groom: "వరుడు", bride: "వధువు"
  }
};

function useCountdown() {
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const ms = Math.max(0, weddingDate.getTime() - Date.now());
      setLeft({
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms / 3600000) % 24),
        minutes: Math.floor((ms / 60000) % 60),
        seconds: Math.floor((ms / 1000) % 60)
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return left;
}

const petals = Array.from({ length: 18 }, (_, i) => i);

export default function App() {
  const [language, setLanguage] = useState("en");
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const countdown = useCountdown();
  const t = copy[language];

  const openInvitation = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    }
  };

  const shareText = `🌺 Shree Ganeshaya Namah 🌺\n\nWith the blessings of our families, we invite you to the wedding of Sivakumar & Srilekha.\n\nDate: Wednesday, 30 December 2026\nMuhurtham: 3:57 AM\nVenue: Salur, Andhra Pradesh\n\nInvitation: ${SITE_URL}\nDirections: ${MAP_URL}`;

  return (
    <main className="wedding-app">
      <audio ref={audioRef} src="/music/wedding-instrumental.mp3" loop preload="none" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            className="welcome-screen"
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.8 }}
          >
            <div className="welcome-art" role="img" aria-label="Traditional Ganesha and South Indian temple wedding artwork" />
            <div className="art-shade" />

            <button
              className="language-switch"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              aria-label="Change language"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>

            <div className="petal-field" aria-hidden="true">
              {petals.map((petal) => (
                <span className={`petal petal-${petal + 1}`} key={petal}>
                  {petal % 2 === 0 ? "❀" : "✿"}
                </span>
              ))}
            </div>

            <div className="welcome-copy">
              <motion.p
                className="welcome-mantra"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1 }}
              >
                {t.mantra}
              </motion.p>

              <motion.p
                className="welcome-family"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {t.family}
              </motion.p>

              <motion.p
                className="welcome-invite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.9 }}
              >
                {t.invite}
              </motion.p>

              <motion.div
                className="couple-names"
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.35, duration: 1.25, ease: [0.2, 0.75, 0.25, 1] }}
              >
                <span className="name groom-name">{language === "en" ? "Sivakumar" : "శివకుమార్"}</span>
                <span className="name-ampersand">&amp;</span>
                <span className="name bride-name">{language === "en" ? "Srilekha" : "శ్రీలేఖ"}</span>
              </motion.div>

              <motion.p
                className="welcome-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.9 }}
              >
                {t.date} <span>✦</span> {t.time}
              </motion.p>

              <motion.button
                className="open-invitation"
                onClick={openInvitation}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.05, duration: 0.9 }}
                whileHover={{ y: -3, scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.open} <span aria-hidden="true">›</span>
              </motion.button>
            </div>
          </motion.section>
        ) : (
          <motion.div
            className="invitation-page"
            key="invitation"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <header className="details-hero">
              <p className="details-mantra">ॐ · {t.mantra} · ॐ</p>
              <p className="details-eyebrow">{t.family}</p>
              <h1>Sivakumar <span>&amp;</span> Srilekha</h1>
              <p className="details-blessing">{t.blessing}</p>
              <p className="details-date">{t.date} · {t.time}</p>
            </header>

            <section className="details-section">
              <p className="section-kicker">{t.countdown}</p>
              <h2>{t.details}</h2>
              <div className="countdown">
                {[
                  [t.days, countdown.days],
                  [t.hours, countdown.hours],
                  [t.minutes, countdown.minutes],
                  [t.seconds, countdown.seconds]
                ].map(([label, value]) => (
                  <div className="count-cell" key={label}>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="details-section couple-section">
              <p className="section-kicker">{t.gallery}</p>
              <h2>Sivakumar <span>&amp;</span> Srilekha</h2>
              <div className="photo-pair">
                <figure>
                  <img src="/images/groom.jpg" alt="Sivakumar" />
                  <figcaption>Sivakumar · {t.groom}</figcaption>
                </figure>
                <figure>
                  <img src="/images/bride.jpg" alt="Srilekha" />
                  <figcaption>Srilekha · {t.bride}</figcaption>
                </figure>
              </div>
              <img className="couple-photo" src="/images/couple.jpg" alt="Sivakumar and Srilekha" />
            </section>

            <section className="details-section event-section">
              <p className="section-kicker">{t.venue}</p>
              <h2>{t.date}</h2>
              <p className="event-time">{t.time}</p>
              <p className="event-location">{t.location}</p>
              <a className="detail-button" href={MAP_URL} target="_blank" rel="noreferrer">
                {t.directions} ↗
              </a>
            </section>

            <section className="details-section closing-section">
              <p>{t.note}</p>
              <a
                className="detail-button whatsapp-button"
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.share} ↗
              </a>
              <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                ↑
              </button>
            </section>

            <footer className="wedding-footer">
              <span>❦</span>
              <p>Sivakumar &amp; Srilekha</p>
              <small>Made with love and blessings</small>
            </footer>

            <div className="detail-controls">
              <button
                className="language-switch detail-language"
                onClick={() => setLanguage(language === "en" ? "te" : "en")}
              >
                {language === "en" ? "తెలుగు" : "English"}
              </button>
              <button className="music-control" onClick={toggleMusic}>
                {musicOn ? "♫ Music On" : "♫ Music Off"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
