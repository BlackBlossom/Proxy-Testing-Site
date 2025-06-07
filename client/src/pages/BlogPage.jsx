
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

// Dynamic blog content (expanded and refined)
const blogContent = {
  title: "What is a Proxy?",
  subtitle: "Discover how proxies work, why they’re used, and how they keep your online activities secure and efficient.",
  featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
  sections: [
    {
      title: "Understanding Proxies",
      content: "A proxy server acts as an intermediary between your device and the internet. When you use a proxy, your web requests are routed through the proxy server, which then forwards them to the intended destination on your behalf. This process conceals your real IP address from websites and services, enhancing privacy and security."
    },
    {
      title: "Why Use a Proxy?",
      content: "Proxies are widely used for several important reasons:",
      isList: true,
      items: [
        "Privacy: By masking your IP address, proxies make it difficult for websites to track your location or identify your device, helping you browse the internet more anonymously.",
        "Security: Proxies can filter out malicious traffic, block access to harmful websites, and protect your network from cyber threats. This is especially valuable for organizations managing sensitive data.",
        "Access Control: Proxies allow organizations to restrict access to certain websites or content, ensuring compliance with corporate policies and regulations.",
        "Performance: Some proxies cache frequently accessed content, reducing bandwidth usage and speeding up load times for users.",
        "Bypassing Restrictions: Proxies enable users to access geo-restricted or blocked content by routing traffic through servers in different locations."
      ]
    },
    {
      title: "Types of Proxies",
      content: "There are several types of proxies, each suited to different needs and use cases:",
      isGrid: true,
      items: [
        {
          title: "HTTP Proxies",
          content: "Designed for web traffic, HTTP proxies are commonly used for web browsing, accessing geo-restricted content, and filtering web requests. They are ideal for general internet use and are widely supported by most browsers and applications."
        },
        {
          title: "SOCKS Proxies",
          content: "SOCKS proxies can handle any type of internet traffic, including email, file transfers, and streaming. They are often used for applications that require flexibility, such as gaming, torrenting, and video streaming."
        },
        {
          title: "Residential Proxies",
          content: "Residential proxies use IP addresses assigned by Internet Service Providers (ISPs) to real users. These proxies are highly effective for bypassing anti-bot protections and accessing content that is restricted by location, making them popular for web scraping, market research, and ad verification."
        },
        {
          title: "Datacenter Proxies",
          content: "Datacenter proxies use IP addresses from data centers rather than residential networks. They are faster and cheaper but are more easily detected and blocked by websites."
        }
      ]
    },
    {
      title: "How Do Proxies Work?",
      content: "When you connect to the internet through a proxy server, your device sends a request to the proxy, which then forwards it to the target website. The website responds to the proxy, which then sends the data back to you. This process hides your real IP address and can add a layer of security and control to your internet connection.\n\nProxy servers can also filter content, block malicious websites, and cache data to improve performance. They are commonly used by businesses, schools, and organizations to manage internet access and protect users from online threats."
    },
    {
      title: "Proxy vs. VPN",
      content: "Both proxies and VPNs route your internet traffic through a remote server, but there are key differences:\n\nEncryption: VPNs encrypt all your internet traffic, providing a higher level of security and privacy. Proxies do not encrypt your data, so your information is more vulnerable to interception.\n\nScope: VPNs protect all your internet activity at the operating system level, while proxies typically only handle web traffic from specific applications.\n\nUse Cases: Proxies are ideal for tasks that require speed and flexibility, such as web scraping or bypassing geo-restrictions. VPNs are better suited for situations where security and privacy are top priorities, such as using public Wi-Fi or accessing sensitive information."
    },
    {
      title: "Common Use Cases for Proxies",
      content: "Proxies are used in a variety of scenarios across industries:",
      isList: true,
      items: [
        "Web Scraping: Proxies allow businesses to collect large amounts of data from websites without being blocked. Residential proxies are especially effective for this purpose.",
        "Ad Verification: Companies use proxies to check if ads are displayed correctly in different locations and to prevent ad fraud.",
        "Market Research: Proxies enable businesses to monitor competitor prices, track product availability, and analyze consumer behavior in different regions.",
        "Testing and Quality Assurance: Developers use proxies to test how websites and applications perform from different locations and devices.",
        "Accessing Restricted Content: Proxies help users bypass censorship and access blocked websites or services, making them valuable tools for journalists, activists, and businesses operating in restrictive environments."
      ]
    }
  ],
  cta: {
    title: "Ready to test your proxies?",
    buttonText: "Test Proxies Now"
  }
};


// Glassmorphic Card with Gradient Accents (shadcn/Aceternity/React-Bits inspired)
const ModernCard = ({ title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className="group relative bg-white/80 dark:bg-[#1B1340]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#D0D2E5]/30 dark:border-[#4B39EF]/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    {/* Gradient accent at the top */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3AB5C6] via-[#4B39EF] to-[#F2188C] opacity-80" />
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3AB5C6]/10 to-[#F2188C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    {/* Content */}
    <h3 className="text-xl font-semibold mb-3 text-[#412D99] dark:text-[#3AB5C6]">
      {title}
    </h3>
    <p className="text-base text-[#1C1641] dark:text-[#D0D2E5] mb-4">
      {content}
    </p>
  </motion.div>
);

export default function BlogPage() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // CSS for animated gradient underline
  const underlineStyle = `
    .section-title {
      position: relative;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .section-title::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, #3AB5C6, #4B39EF, #F2188C);
      transform-origin: left;
      transform: scaleX(1);
      transition: transform 0.3s ease;
    }
    @media (prefers-reduced-motion) {
      .section-title::after {
        transition: none;
      }
    }
  `;

  return (
    <>
      {/* Inline CSS for the underline */}
      <style>{underlineStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#F7F5FF] to-[#D0D2E5] dark:from-[#1A1A2E] dark:to-[#1B1340] text-[#1C1641] dark:text-[#D0D2E5] px-6 py-20 font-arpona">
        <div className="max-w-4xl mt-4 mx-auto">
          {/* Hero Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl/normal md:text-5xl/normal font-bold mb-4 bg-gradient-to-r from-[#412D99] to-[#F2188C] bg-clip-text text-transparent">
              {blogContent.title}
            </h1>
            <p className="text-lg md:text-xl text-[#372580] dark:text-[#D0D2E5] max-w-2xl mx-auto">
              {blogContent.subtitle}
            </p>
          </motion.header>

          {/* Blog Content */}
          <article className="space-y-14">
            {blogContent.sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-[#412D99] dark:text-[#3AB5C6] section-title">
                  {section.title}
                </h2>
                
                {section.isList ? (
                  <>
                    <p className="text-lg leading-relaxed">{section.content}</p>
                    <ul className="space-y-3 list-disc list-inside text-lg">
                      {section.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                ) : section.isGrid ? (
                  <>
                    <p className="text-lg leading-relaxed">{section.content}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      {section.items.map((item, idx) => (
                        <ModernCard
                          key={idx}
                          title={item.title}
                          content={item.content}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-lg leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </article>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold mb-6 text-[#372580] dark:text-[#3AB5C6]">
              {blogContent.cta.title}
            </h3>
            <Link
              to="/test"
              className="inline-flex items-center bg-gradient-to-r from-[#4B39EF] to-[#F2188C] hover:from-[#372580] hover:to-[#F2188C]/90 text-white font-medium py-3 px-8 rounded-full transition-all"
            >
              {blogContent.cta.buttonText}
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}