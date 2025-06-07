import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

export default function Footer() {
  const { siteData, loading, error } = useSite();
  return (
    <footer className="bg-[#1B1340] font-arpona text-[#D0D2E5]">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col sm:flex-row gap-10 border-t border-[#372580]">
        {/* Brand Info (left) */}
        <div className="sm:w-1/3">
          <h2 className="text-3xl font-bold text-[#F7F5FF] mb-4">
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-[#3AB5C6]">
              {siteData?.name || "ProxyTester"}
            </Link>
          </h2>
          <p className="text-[16px] leading-relaxed">
            {siteData?.desc
              || "Check proxies fast and securely with real-time results. No storage. No logs."
            }
          </p>
        </div>

        <div className="hidden sm:grid sm:w-1/3 grid-cols-1 sm:grid-cols-2 gap-10"></div>

        {/* Explore & Contact (right) */}
        <div className="sm:w-1/3 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Explore */}
          <div>
            <h3 className="text-[24px] font-semibold text-[#6D4AFF] mb-3">Explore</h3>
            <ul className="space-y-2 text-[16px]">
              <li><Link to="/" className="hover:text-[#3AB5C6] transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-[#3AB5C6] transition-colors">What is Proxy?</Link></li>
              <li><Link to="/test" className="hover:text-[#3AB5C6] transition-colors">Test Tool</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#3AB5C6] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#3AB5C6] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-[24px] font-semibold text-[#6D4AFF] mb-3">Contact</h3>
            <p className="text-[16px]">support@proxytester.com</p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-6 border-t border-[#372580] text-[#D0D2E5]">
        © {new Date().getFullYear()} ProxyTester — All rights reserved.
      </div>
    </footer>
  );
}
