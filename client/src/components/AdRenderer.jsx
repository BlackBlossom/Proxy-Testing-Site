// components/AdRenderer.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAds } from '../hooks/useAds';

export default function AdRenderer({ 
  placement, 
  variant = 'standard', 
  className = '',
  priority = 'auto'
}) {
  const containerRef = useRef();
  const [isInView, setIsInView] = useState(priority === 'high');
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const { ads, isLoading, error } = useAds(isInView ? placement : null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority === 'high' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Popup management
  const handleClosePopup = useCallback(() => {
    setIsPopupClosed(true);
    sessionStorage.setItem(`adClosed_${placement}`, 'true');
  }, [placement]);

  if (!isInView || error || isLoading || ads.length === 0) {
    return null;
    // (
    //   <div ref={containerRef} className={className}>
    //     {isLoading && (
    //       <div className="animate-pulse bg-gray-100 rounded-lg h-24" />
    //     )}
    //     {error && (
    //       <div className="bg-red-50 border-l-4 border-red-400 p-4">
    //         <p className="text-sm text-red-700">Ad error: {error}</p>
    //       </div>
    //     )}
    //   </div>
    // );
  }

  return (
    <div ref={containerRef} className={className}>
      <AnimatePresence>
        {variant === 'popup' && !isPopupClosed && (
          <motion.div
            key={`popup-${placement}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-[90vw] relative shadow-xl"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close ad"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              {ads.map(ad => (
                <div 
                  key={ad._id}
                  className="animate-fadeIn"
                  dangerouslySetInnerHTML={{ __html: ad.adCode }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {variant !== 'popup' && ads.map(ad => (
          <motion.div
            key={ad._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="ad-content"
              dangerouslySetInnerHTML={{ __html: ad.adCode }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
