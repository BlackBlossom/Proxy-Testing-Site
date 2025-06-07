import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue } from 'framer-motion'
import ProxyForm from "../components/ProxyForm";
import ProxyResult from "../components/ProxyResult";
import Loader from "../components/Loader";
import { testProxies } from "../services/proxyService";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { ShieldCheckIcon, ExclamationTriangleIcon, CheckIcon, } from "@heroicons/react/24/solid";

export default function TestToolPage() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const [activeTab,setActiveTab] = useState("proxy");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef(null);

  const [isIpChecking, setIsIpChecking] = useState(false);
  const [isProxy, setIsProxy] = useState(null);
  const [ipDetails, setIpDetails] = useState(null);

  const handleTest = async (proxyList) => {
    setIsLoading(true);
    try {
      if (resultsRef.current) {
        setTimeout(() => {
          const element = resultsRef.current;
          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const offset = 200;
            window.scrollTo({
              top: elementTop - offset,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
      const res = await testProxies(proxyList);
      setResults(res);
      setIsLoading(false);
    } catch (error) {
      console.error("Error testing proxies:", error);
      setIsLoading(false);
    }
  };

  const checkCurrentIp = async () => {
    setIsIpChecking(true);
    try {
      // Get user IP details
      const ipDetailsResponse = await axios.get("https://api.ipify.org?format=json");
      const ip = ipDetailsResponse.data.ip;

      const ipDetailsData = (await axios.get(`https://api.ipapi.is/?q=${ip}`)).data;

      const isProxy = Boolean(ipDetailsData.is_proxy || ipDetailsData.is_vpn); 

      setIpDetails({
        ip: ipDetailsData.ip,
        country: `${ipDetailsData.location.city}, ${ipDetailsData.location.country}`,
        isp: ipDetailsData.asn.org,
        proxy: isProxy
      });
      setIsProxy(isProxy);
    } catch (error) {
      console.error("IP check failed:", error);
      setIsProxy(null);
    } finally {
      setIsIpChecking(false);
    }
  };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });
  const scrollY = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollY.set(latest);
  });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const toggleHover = (hovering) => {
    setIsHovering(hovering);
  };

  return (
    <div
      ref={pageRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-br from-[#F7F5FF] to-[#D0D2E5] dark:from-[#1A1A2E] dark:to-[#1B1340] text-[#1C1641] dark:text-[#D0D2E5] font-arpona transition-colors"
    >
      {/* Playful Cursor Effect */}
      {/* <motion.div
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.6,
          backgroundColor: isHovering ? "#F2188C" : "#4B39EF",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      /> */}

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10 mt-12"
        >
          <motion.h1
            animate={{
              backgroundPosition: `${scrollY.get() * 100}%`,
            }}
            style={{
              background: "linear-gradient(90deg, #412D99, #F2188C, #3AB5C6)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-4xl/normal md:text-5xl/normal font-bold mb-3"
          >
            Proxy Test Tool
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg opacity-80 max-w-2xl mx-auto"
          >
            Enter your proxies below to test their status, latency, and location.
          </motion.p>
        </motion.div>

        {/* Toggle Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center -mt-2 mb-8"
        >
          <div className="flex rounded-full gap-1 bg-[#D0D2E5]/30 dark:bg-[#2A2A4A] p-1">
            {["proxy", "ip"].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#4B39EF] to-[#F2188C] text-white"
                    : "text-[#1C1641] dark:text-[#D0D2E5] hover:bg-[#D0D2E5]/20"
                }`}
              >
                {tab === "proxy" ? "Proxy Tester" : "IP Checker"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "proxy" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Proxy Form */}
              <motion.div
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <ProxyForm onSubmit={handleTest} />
              </motion.div>

              {/* Results Section */}
              <div ref={resultsRef}>
                {isLoading ? (
                  <Loader />
                ) : results.length > 0 ? (
                  <ProxyResult results={results} />
                ) : null}
              </div>
            </motion.div>
          )}

          {activeTab === "ip" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              {/* Current IP Check Section */}
              <motion.div
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="group relative bg-white/90 dark:bg-[#1B1340]/90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-3xl border border-[#D0D2E5] dark:border-[#4B39EF]/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3AB5C6]/10 to-[#F2188C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <ShieldCheckIcon className="w-8 h-8 text-[#4B39EF]" />
                    Check Current IP Status
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={checkCurrentIp}
                    disabled={isIpChecking}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                    className="px-6 py-3 bg-gradient-to-r from-[#4B39EF] to-[#F2188C] hover:from-[#372580] hover:to-[#F2188C]/90 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    Check My IP Now
                  </motion.button>

                  {isIpChecking && <Loader />}

                  <AnimatePresence>
                    {(ipDetails && !isIpChecking) && (
                      <motion.div
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: 300 }} // Set a max-height that fits your content
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full mt-4 overflow-hidden rounded-lg bg-[#F7F5FF] dark:bg-[#160f33] border border-[#D0D2E5] dark:border-[#4b4583] text-[#1C1641] dark:text-[#D0D2E5]"
                      >
                        <div className="p-4">
                          <div className={`flex items-center gap-3 ${isProxy ? 'text-red-500' : 'text-green-500'}`}>
                            {isProxy ? <ExclamationTriangleIcon className="w-6 h-6" /> : <CheckIcon className="w-6 h-6"/>}
                            <p className="font-semibold">
                              {isProxy ? "Proxy Detected!" : "No Proxy Detected"}
                            </p>
                          </div>
                          <div className="mt-3 space-y-1 text-sm">
                            <p>IP Address: {ipDetails.ip}</p>
                            <p>Location: {ipDetails.country}</p>
                            <p>ISP: {ipDetails.isp}</p>
                          </div>
                          {isProxy && (
                            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                              Warning: Your network appears to be using a proxy or VPN
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}