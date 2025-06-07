import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const privacyPolicyContent = [
  {
    id: 1,
    title: "Overview",
    text: "Your privacy is important to us. ProxyTester does not store any logs or proxy data. All tests are run client-side for full transparency and control."
  },
  {
    id: 2,
    title: "Data Collection",
    text: "We do not collect or store any proxy addresses, IPs, or testing outcomes. Basic analytics may be used for performance optimization but never tied to individuals."
  },
  {
    id: 3,
    title: "Cookies",
    text: "This site only uses cookies for theme preference (dark/light). No third-party cookies or trackers are used."
  },
  {
    id: 4,
    title: "Security",
    text: "All communication with our platform is secured via HTTPS. Client-side tests ensure no data is transmitted to our servers."
  },
  {
    id: 5,
    title: "Changes to Policy",
    text: "We may update this policy from time to time. Changes will be reflected on this page with an updated date."
  },
  {
    id: 6,
    title: "Contact Us",
    text: "Have questions or concerns? Reach out to us at support@proxytester.com."
  }
];

const lastUpdated = "Last updated: May 24, 2025";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function PrivacyPolicy() {
  const location = useLocation();
  const [content, setContent] = useState(privacyPolicyContent);
  const [lastUpdatedAt, setUpdate] = useState(lastUpdated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyContent = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/admin/privacy`);
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
        setContent(privacyPolicyContent);
        setUpdate(lastUpdated);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyContent();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7F5FF] to-[#D0D2E5] dark:from-[#1A1A2E] dark:to-[#1B1340] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#412D99] dark:text-[#4B39EF]"
        >
          Loading privacy policy...
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
          className="text-4xl/normal md:text-5xl/normal font-bold mb-8  bg-gradient-to-r from-[#412D99] dark:from-[#3AB5C6] to-[#F2188C] bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg"
          >
            Couldn't fetch updated policy. Showing static content.
          </motion.div>
        )}

        <div className="space-y-8">
          {content.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="pb-6 border-b border-[#D0D2E5]/30 dark:border-[#4B39EF]/30 last:border-0"
            >
              <h2 className="text-2xl font-semibold mb-3 text-[#412D99] dark:text-[#3AB5C6] flex items-center">
                <span className="mr-2">{section.id}.</span>
                <span className="relative">
                  {section.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3AB5C6] via-[#4B39EF] to-[#F2188C] rounded-full" />
                </span>
              </h2>
              <p className="text-base leading-relaxed">
                {section.title === "Contact Us" ? (
                  <>
                    Have questions or concerns? Reach out to us at{' '}
                    <a
                      href="mailto:support@proxytester.com"
                      className="text-[#412D99] dark:text-[#4B39EF] hover:underline"
                    >
                      support@proxytester.com
                    </a>
                    .
                  </>
                ) : (
                  section.text
                )}
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
