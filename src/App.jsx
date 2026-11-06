
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";

const weddingDate = new Date("2026-12-30T03:57:00+05:30");

const translations = {
  en: {
    welcome: "Together with our families",
    open: "Open Invitation",
    invitation: "Wedding Invitation",
    dear: "With the blessings of our elders",
    request: "We joyfully invite you to celebrate the wedding of",
    groom: "Groom",
    bride: "Bride",
    countdown: "Counting Every Moment",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebration: "The Wedding Celebration",
    date: "Wednesday, 30 December 2026",
    muhurtham: "Muhurtham",
    time: "3:57 AM",
    venue: "Venue",
    location: "Salur, Andhra Pradesh, India",
    directions: "Get Directions",
    blessings: "Your presence and blessings will make our celebration more special.",
    footer: "With love and gratitude",
    couple: "A Beautiful Beginning",
    groomName: "Sivakumar",
    brideName: "Srilekha",
    share: "Share Invitation",
    gallery: "Our Special Moments",
    invitationNote: "Please join us and bless the newlyweds."
  },

  te: {
    welcome: "మా కుటుంబాల ఆశీర్వాదాలతో",
    open: "ఆహ్వాన పత్రిక తెరవండి",
    invitation: "వివాహ ఆహ్వానం",
    dear: "పెద్దల ఆశీర్వాదాలతో",
    request: "మా వివాహ వేడుకకు మిమ్మల్ని హృదయపూర్వకంగా ఆహ్వానిస్తున్నాము",
    groom: "వరుడు",
    bride: "వధువు",
    countdown: "శుభ ముహూర్తానికి మరికొంత సమయం",
    days: "రోజులు",
    hours: "గంటలు",
    minutes: "నిమిషాలు",
    seconds: "సెకన్లు",
    celebration: "వివాహ వేడుక",
    date: "బుధవారం, 30 డిసెంబర్ 2026",
    muhurtham: "ముహూర్తం",
    time: "ఉదయం 3:57 గంటలకు",
    venue: "వేదిక",
    location: "సాలూరు, ఆంధ్రప్రదేశ్",
    directions: "మార్గాన్ని చూడండి",
    blessings: "మీ రాక మరియు ఆశీర్వాదాలు మా వేడుకను మరింత ప్రత్యేకం చేస్తాయి.",
    footer: "ప్రేమతో మరియు కృతజ్ఞతలతో",
    couple: "ఒక అందమైన కొత్త ప్రయాణం",
    groomName: "శివకుమార్",
    brideName: "శ్రీలేఖ",
    share: "ఆహ్వాన పత్రికను పంచుకోండి",
    gallery: "మా ప్రత్యేక క్షణాలు",
    invitationNote: "మా వివాహ వేడుకకు విచ్చేసి ఆశీర్వదించండి."
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

function useCountdown() {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const update = () => {
      const difference = Math.max(
        0,
        weddingDate.getTime() - Date.now()
      );

      setRemaining({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return remaining;
}

function App() {
  const [language, setLanguage] = useState("en");
  const [opened, setOpened] = useState(false);

  const t = translations[language];
  const time = useCountdown();

  const mapUrl =
    "https://maps.app.goo.gl/AQJLTwkVT12W4gsW9?g_st=aw";

  const shareMessage =
    `Wedding Invitation: Sivakumar & Srilekha\n` +
    `Date: 30 December 2026\n` +
    `Muhurtham: 3:57 AM\n` +
    `Venue: Salur, Andhra Pradesh\n` +
    `Please join us and bless the couple!`;

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <main>
      {/* LANGUAGE SWITCH */}

      <button
        className="language-switch"
        onClick={() =>
          setLanguage(language === "en" ? "te" : "en")
        }
      >
        {language === "en" ? "తెలుగు" : "English"}
      </button>

      <AnimatePresence mode="wait">

        {!opened ? (

          /* WELCOME INVITATION SCREEN */

          <motion.section
            key="welcome"
            className="envelope-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="envelope-card"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="ornament"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity
                }}
              >
                ❦
              </motion.div>

              <p className="small-heading">
                {t.welcome}
              </p>

              <div className="gold-line" />

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t.invitation}
              </motion.h1>

              <p className="telugu-heading">
                {language === "en"
                  ? "శుభ వివాహ ఆహ్వానం"
                  : "Wedding Invitation"}
              </p>

              <motion.div
                className="seal"
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 5px 15px #80602a40",
                    "0 5px 25px #d6ae5260",
                    "0 5px 15px #80602a40"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
              >
                S & S
              </motion.div>

              <p className="envelope-note">
                {t.dear}
              </p>

              <p className="envelope-note">
                {t.groomName} & {t.brideName}
              </p>

              <motion.button
                className="gold-button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpened(true)}
              >
                {t.open} ✨
              </motion.button>

              <div className="ornament bottom-ornament">
                ❦
              </div>
            </motion.div>
          </motion.section>

        ) : (

          /* MAIN WEDDING INVITATION */

          <motion.div
            key="invitation"
            className="invitation-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            {/* HERO SECTION */}

            <section className="hero section">
              <motion.div
                className="hero-overlay"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <p className="small-heading">
                  {t.dear}
                </p>

                <h1>{t.couple}</h1>

                <div className="gold-line" />

                <div className="name-display">
                  <h2>{t.groomName}</h2>
                  <span>&</span>
                  <h2>{t.brideName}</h2>
                </div>

                <p className="hero-subtitle">
                  {t.request}
                </p>

                <p className="hero-date">
                  {t.date}
                </p>
              </motion.div>
            </section>

            {/* GROOM AND BRIDE PHOTOS */}

            <motion.section
              className="section couple-section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="small-heading">
                {t.couple}
              </p>

              <h2 className="section-title">
                {t.groom} <span>&</span> {t.bride}
              </h2>

              <div className="photo-grid">

                <motion.div
                  className="photo-card"
                  whileHover={{
                    y: -10,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/groom.jpg"
                    alt="Sivakumar - Groom"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <h3>{t.groomName}</h3>
                  <p>{t.groom}</p>
                </motion.div>

                <motion.div
                  className="photo-card"
                  whileHover={{
                    y: -10,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/bride.jpg"
                    alt="Srilekha - Bride"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <h3>{t.brideName}</h3>
                  <p>{t.bride}</p>
                </motion.div>

              </div>
            </motion.section>

            {/* COUNTDOWN */}

            <motion.section
              className="countdown-section section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="small-heading">
                {t.countdown}
              </p>

              <h2>{t.celebration}</h2>

              <div className="countdown-grid">
                {[
                  [t.days, time.days],
                  [t.hours, time.hours],
                  [t.minutes, time.minutes],
                  [t.seconds, time.seconds]
                ].map(([label, value]) => (
                  <motion.div
                    className="count-box"
                    key={label}
                    whileHover={{ scale: 1.06 }}
                  >
                    <strong>
                      {String(value).padStart(2, "0")}
                    </strong>
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* COUPLE PHOTO GALLERY */}

            <motion.section
              className="section couple-photo-section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="small-heading">
                {t.gallery}
              </p>

              <h2 className="section-title">
                {t.couple}
              </h2>

              <motion.img
                className="couple-photo"
                src="/images/couple.jpg"
                alt="Sivakumar and Srilekha together"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </motion.section>

            {/* WEDDING DETAILS */}

            <motion.section
              className="section event-section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="ornament">❦</div>

              <p className="small-heading">
                {t.dear}
              </p>

              <h2>{t.celebration}</h2>

              <div className="gold-line" />

              <div className="event-details">

                <div>
                  <span>✦</span>
                  <h3>{t.date}</h3>
                </div>

                <div>
                  <span>✦</span>
                  <h3>{t.muhurtham}</h3>
                  <p>{t.time}</p>
                </div>

                <div>
                  <span>✦</span>
                  <h3>{t.venue}</h3>
                  <p>{t.location}</p>
                </div>

              </div>

              <a
                className="gold-button map-button"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.directions} ↗
              </a>
            </motion.section>

            {/* WHATSAPP SHARING */}

            <motion.section
              className="section share-section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="ornament">❦</div>

              <h2 className="section-title">
                {t.invitation}
              </h2>

              <p>{t.invitationNote}</p>

              <a
                className="gold-button"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.share} ↗
              </a>
            </motion.section>

            {/* FOOTER */}

            <footer className="footer">
              <div className="ornament">❦</div>

              <h2>
                {t.groomName} & {t.brideName}
              </h2>

              <p>{t.blessings}</p>

              <p className="footer-note">
                {t.footer} ♥
              </p>

              <p className="copyright">
                Made with love
              </p>
            </footer>

          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}

export default App;
