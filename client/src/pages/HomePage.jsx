import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdRenderer from "../components/AdRenderer";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
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
      // console.log("Fetched Home Data:", response.data);
      setHomeData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError("Failed to load home data. Please try again later.");
      setHomeData(staticHomeData); // Fallback to static data
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHomeData();
    AOS.init({ duration: 1000 });
    AOS.refresh(); // Refresh animations on initial load
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  const [expandedIndex, setExpandedIndex] = useState(null);


  return (
    <div className="bg-[#F7F5FF] text-[#1B1340] dark:bg-[#1B1340] dark:text-[#F7F5FF] font-arpona">

      {/* Home Top Ad */}
      <AdRenderer placement="home_top" className="py-2" priority="high" />

      {/* Header Banner Ad */}
      <AdRenderer placement="header_banner" className="py-2" priority="high" />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-20 overflow-hidden text-center">
        <img
          src={worldMap}
          alt="World Map"
          className="absolute inset-0 w-full h-full dark:bg-[#F5F7FF] object-cover opacity-10 dark:opacity-20 pointer-events-none z-0"
        />


        <div className="z-10 max-w-4xl" data-aos="fade-up">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg" data-aos="fade-up">
              {error}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {homeData.hero.title} <br />
            <span className="text-[#412D99] dark:text-[#6D4AFF]">
              {homeData.hero.subtitle}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#372580] dark:text-[#D0D2E5] mb-8">
            {/* Verify connectivity, latency, and anonymity — all in real time. */}
            {homeData.hero.description}
          </p>
          <Link
            to={homeData.hero.ctaLink}
            className="inline-block bg-[#6D4AFF] hover:bg-[#412D99] text-white font-semibold px-8 py-3 rounded-full transition duration-300"
          >
            {homeData.hero.ctaText}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20 dark:bg-[#160f33]">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Use Our Proxy Tester?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#372580] dark:text-[#D0D2E5]">
            Our tool is designed for speed, privacy, and ease of use. Whether
            you're a developer, analyst, or network engineer, you'll find
            everything you need to test and manage your proxies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {homeData.features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-20 dark:bg-[#1B1340]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {homeData.testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#372580] rounded-lg shadow-md p-8 hover:shadow-xl transition duration-300"
                data-aos="fade-up"
              >
                <p className="text-[#412D99] dark:text-[#D0D2E5] mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-[#372580] dark:text-[#D0D2E5]">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-20 dark:bg-[#160f33]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {homeData.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#372580] rounded-lg shadow-md p-6 hover:shadow-xl ease-in-out transition duration-500"
                data-aos="fade-up"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <h4 className="text-xl font-semibold mb-3 text-[#412D99] dark:text-[#D0D2E5] flex justify-between items-center">
                  {faq.question}
                  <span className="text-lg">
                    {expandedIndex === i ? "−" : "+"}
                  </span>
                </h4>
                {expandedIndex === i && <p className="mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sidebar Right Ad */}
      <div className="hidden lg:block lg:w-full lg:text-center">
        <AdRenderer placement="sidebar_right" priority="high" />
      </div>

      {/* Inline Mobile Ad */}
      <AdRenderer placement="inline_mobile" className="lg:hidden fixed bottom-0 left-0 right-0 z-50" priority="high"/>

      {/* Popup Ad */}
      <AdRenderer placement="popup_ad" variant="popup" priority="high" />

    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div
      className="bg-white dark:bg-[#372580] text-[#1B1340] dark:text-[#F7F5FF] rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
      data-aos="fade-up"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-xl font-semibold mb-3 text-[#412D99] dark:text-[#D0D2E5]">
        {title}
      </h4>
      <p>{desc}</p>
    </div>
  );
}
