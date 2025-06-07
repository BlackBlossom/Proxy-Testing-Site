import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSite } from '../contexts/SiteContext';

export default function Navbar() {
  const {siteData, loading, error} = useSite();
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/70 dark:bg-[#1b1340]/70 backdrop-blur-lg border border-[#D0D2E5] dark:border-[#372580] rounded-xl shadow-lg px-4 py-3 transition-all duration-300 font-arpona">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#412D99] dark:text-[#3AB5C6]">
          {siteData?.name || "ProxyTester"}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex dark:text-[#f5f7ff] items-center gap-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/blog" label="What is Proxy?" />
          <NavLink to="/test" label="Test Tool" />
          <NavLink to="/privacy-policy" label="Privacy" />
          <NavLink to="/terms-and-conditions" label="Terms" />
          <button onClick={toggleTheme} className="text-xl hover:text-[#6D4AFF] dark:hover:text-[#F2188C] transition-colors">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex dark:text-[#f5f7ff] items-center gap-4">
          <button onClick={toggleTheme} className="text-xl">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
          <button onClick={toggleMenu} className="text-xl">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-4 dark:text-[#F7F5FF] flex flex-col gap-4 text-center">
          <NavLink to="/" label="Home" onClick={toggleMenu} />
          <NavLink to="/test" label="Test Tool" onClick={toggleMenu} />
          <NavLink to="/privacy-policy" label="Privacy" onClick={toggleMenu} />
          <NavLink to="/terms-and-conditions" label="Terms" onClick={toggleMenu} />
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="hover:text-[#6D4AFF] dark:hover:text-[#F2188C] transition-colors font-medium"
    >
      {label}
    </Link>
  );
}
