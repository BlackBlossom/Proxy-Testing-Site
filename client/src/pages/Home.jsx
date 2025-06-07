import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaQuoteLeft} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import AdRenderer from "../components/AdRenderer";
import worldMap from "../assets/world.svg";

const staticHomeData = {
  hero: {
    title: "Test Your Proxies.",
    subtitle: "Fast. Secure. Reliable.",
    description:
      "Experience real-time insights on connectivity, latency, and proxy location for seamless performance.",
    ctaText: "Start Testing",
    ctaLink: "/test",
  },
  features: [
    {
      icon: "📊",
      title: "Batch Proxy Checks",
      desc: "Test multiple proxies simultaneously and save valuable time. Our tool handles large lists efficiently, so you get results quickly.",
    },
    {
      icon: "⚡",
      title: "Real-Time Results",
      desc: "Visual feedback shows active and non-working proxies instantly. Color-coded results make it easy to identify healthy proxies.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "We don't store any proxy data. All tests are performed locally for maximum privacy and security.",
    },
    {
      icon: "🌍",
      title: "Location Detection",
      desc: "Identify the country and city of each proxy server. This helps you select proxies from specific regions.",
    },
    {
      icon: "🖥️",
      title: "Easy-to-Use Interface",
      desc: "No technical skills needed. Just paste your proxies, hit test, and get results in seconds.",
    },
    {
      icon: "📋",
      title: "Detailed Reporting",
      desc: "Get comprehensive reports for each proxy, including latency, status, and location details.",
    },
  ],
  faqs: [
    {
      question: "How does the proxy tester work?",
      answer:
        "Our tool checks connectivity, latency, and anonymity by sending test requests through each proxy and analyzing the results in real time.",
    },
    {
      question: "Is my proxy data secure?",
      answer:
        "Yes, we do not store any proxy data. All tests are performed on your device and results are displayed only to you.",
    },
    {
      question: "Can I test multiple proxies at once?",
      answer:
        "Absolutely! You can paste multiple proxies (one per line) and test them all simultaneously.",
    },
    {
      question: "What proxy formats are supported?",
      answer:
        "We support HTTP, HTTPS, and SOCKS proxies. You can use formats like 'ip:port', 'http://ip:port', or 'socks://ip:port'.",
    },
    {
      question: "How fast are the results?",
      answer:
        "Results are generated in seconds, thanks to our optimized parallel testing engine.",
    },
    {
      question: "Do you provide proxy location information?",
      answer:
        "Yes, for every working proxy, we display its country and city based on the IP address.",
    },
  ],
  testimonials: [
    {
      name: "Alex K.",
      role: "Web Developer",
      quote:
        "This tool saved me hours of manual testing. It's fast, reliable, and super easy to use!",
    },
    {
      name: "Samira R.",
      role: "Security Analyst",
      quote:
        "The anonymity checks are a game-changer. I trust this tool for all my proxy audits.",
    },
    {
      name: "Jordan T.",
      role: "Network Engineer",
      quote:
        "The batch processing and location detection are top-notch. Highly recommended!",
    },
  ],
};


export default function Home() {
  const location = useLocation();
  const [homeData, setHomeData] = useState(staticHomeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const fetchHomeData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/admin/home`);
      setHomeData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError("Failed to load home data. Please try again later.");
      setHomeData(staticHomeData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
    AOS.init({ duration: 1000 });
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [expandedIndex, setExpandedIndex] = useState(null);

const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // Feature card animation variants
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8 }
    })
  };

  // Testimonial marquee animation
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] text-[#1B1340] dark:bg-[#1B1340] dark:text-[#F7F5FF] font-arpona overflow-hidden">     
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-20 overflow-hidden text-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <img
            src={worldMap}
            alt="World Map"
            className="w-full h-full dark:bg-[#F7F5FF] object-cover opacity-[15%] dark:opacity-[8%]"
          />
        </motion.div>
        
        <div className="z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg" data-aos="fade-up">
                {error}
              </div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            >
              {homeData.hero.title} <br />
              <span className="bg-gradient-to-r from-[#4B39EF] to-[#F2188C] bg-clip-text text-transparent">
                {homeData.hero.subtitle}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-[#372580] dark:text-[#D0D2E5] mb-8"
            >
              {homeData.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link
                to={homeData.hero.ctaLink}
                className="inline-block bg-gradient-to-r from-[#4B39EF] to-[#F2188C] hover:from-[#412D99] hover:to-[#F2188C]/80 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
              >
                {homeData.hero.ctaText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Shadcn-inspired cards */}
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-[#160F33]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Core Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={i}
                className="group relative p-5 bg-white dark:bg-[#372580]/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#D0D2E5]/20 dark:border-[#412D99]/30"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#3AB5C6]/10 to-[#F2188C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-4xl mb-4 text-[#4B39EF] dark:text-[#3AB5C6]">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#372580] dark:text-[#D0D2E5]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Aceternity-inspired marquee */}
      <section className="py-20 px-6 md:px-20 bg-[#F7F5FF] dark:bg-[#0F1944] overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          User Testimonials
        </h2>
        <div className="relative h-56">
          <motion.div
            className="absolute top-0 left-0 flex h-full gap-8"
            variants={marqueeVariants}
            animate="animate"
          >
            { Array(2)
              .fill(null)
              .flatMap(() =>
              [...homeData.testimonials, ...homeData.testimonials].map((t, i) => (
              <motion.div
                key={i}
                className="w-80 md:w-96 p-6 bg-white dark:bg-[#372580]/90 backdrop-blur-md rounded-xl shadow-lg border border-[#D0D2E5]/20 dark:border-[#111018]/20"
                whileHover={{ scale: 1.02 }}
              >
                <FaQuoteLeft className="text-3xl text-[#F2188C] dark:text-[#3AB5C6] mb-4" />
                <p className="text-[#412D99] dark:text-[#D0D2E5] mb-4 italic">"{t.quote}"</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-[#372580] dark:text-[#D0D2E5]">{t.role}</div>
              </motion.div>
            )))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - React-Bits inspired */}
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-[#160F33]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {homeData.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 text-[#412D99] dark:text-[#F7F5FF] bg-[#F6FAFA] dark:bg-[#372580]/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <h4 className="text-xl font-semibold">{faq.question}</h4>
                  {expandedIndex === i ? <FiChevronDown /> : <FiChevronRight />}
                </div>
                <AnimatePresence initial={false}>
                  {expandedIndex === i && (
                    <motion.p
                      initial={{ opacity: 0, maxHeight: 0, marginTop: 0 }}
                      animate={{ opacity: 1, maxHeight: 200, marginTop: 16 }}
                      exit={{ opacity: 0, maxHeight: 0, marginTop: 0 }}
                      transition={{ type: "tween", duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                      className="pt-4 text-[16px] text-[#1B1340] dark:text-[#D0D2E5]"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}