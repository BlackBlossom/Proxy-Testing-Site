import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Terms and conditions content (dynamic)
const termsContent = [
  {
    id: 1,
    title: "Usage Terms",
    text: "You agree not to misuse our service. This includes, but is not limited to, abusing the proxy checker to perform illegal or unethical activities. We reserve the right to block or ban users at our discretion."
  },
  {
    id: 2,
    title: "Accuracy",
    text: "While we strive to provide accurate proxy testing results, we cannot guarantee 100% reliability. Results may vary depending on your location, network, or the proxies themselves."
  },
  {
    id: 3,
    title: "Data Policy",
    text: "We do not store the proxy lists you test. All tests are processed client-side or temporarily cached without long-term retention."
  },
  {
    id: 4,
    title: "Third-party Links",
    text: "Our website may include links to third-party services. We are not responsible for their content or practices."
  },
  {
    id: 5,
    title: "Updates to Terms",
    text: "We reserve the right to update these terms at any time. Any changes will be posted on this page."
  }
];

const lastUpdated = "Last updated: 24 May, 2025";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function TermsAndConditions() {
  const location = useLocation();
  const [content, setContent] = useState(termsContent);
  const [lastUpdatedAt, setUpdate] = useState(lastUpdated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTermsContent = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/admin/terms`);
        const updatedAtDates = response.data
          .map(section => new Date(section.updatedAt))
          .sort((a, b) => b - a);
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const lastUpdatedAt = updatedAtDates.length > 0 
          ? `Last updated: ${updatedAtDates[0].toLocaleDateString('en-US', options)}`
          : "Last updated: No update date available";
        
        setUpdate(lastUpdatedAt);
        setContent(response.data);
      } catch (error) {
        console.error("Fetch Error:", error.message);
        setError(error);
        setContent(termsContent);
        setUpdate(lastUpdated);
      } finally {
        setLoading(false);
      }
    };

    fetchTermsContent();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7F5FF] to-[#D0D2E5] dark:from-[#1A1A2E] dark:to-[#1B1340] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#412D99] dark:text-[#4B39EF]"
        >
          Loading Terms & Conditions...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5FF] to-[#D0D2E5] dark:from-[#1A1A2E] dark:to-[#1B1340] text-[#1C1641] dark:text-[#D0D2E5] px-6 py-20 font-arpona">
      <div className="max-w-4xl mt-4 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl/normal md:text-5xl/normal font-bold mb-4 bg-gradient-to-r from-[#412D99] dark:from-[#3AB5C6] to-[#F2188C] bg-clip-text text-transparent"
        >
          Terms & Conditions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-6 text-lg"
        >
          By accessing and using ProxyTester, you accept and agree to be bound
          by the terms and provisions of this agreement. These terms apply to all
          users of the site.
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg"
          >
            Couldn't fetch updated terms & conditions. Showing static content.
          </motion.div>
        )}

        <div className="space-y-8">
          {content.map((item, index) => (
            <motion.section
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="pb-6 border-b border-[#D0D2E5]/30 dark:border-[#4B39EF]/30 last:border-0"
            >
              <h2 className="text-2xl font-semibold mb-3 text-[#412D99] dark:text-[#3AB5C6] flex items-center">
                <span className="mr-2">{item.id}.</span>
                <span className="relative">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3AB5C6] via-[#4B39EF] to-[#F2188C] rounded-full" />
                </span>
              </h2>
              <p className="text-base leading-relaxed">
                {item.text}
              </p>
            </motion.section>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-sm text-left text-[#6d6a7d] dark:text-[#9ea0ba]"
        >
          {lastUpdatedAt}
        </motion.p>
      </div>
    </div>
  );
}
