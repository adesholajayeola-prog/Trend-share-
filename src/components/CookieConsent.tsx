import React, { useState, useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a selection
    const consent = localStorage.getItem('trendsphere_cookie_consent');
    if (!consent) {
      // Small trigger delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('trendsphere_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('trendsphere_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-50 animate-slideUp"
      id="cookie-consent-container"
    >
      <div className="glass-panel text-left p-5 rounded-2xl border border-gray-250 dark:border-gray-800 shadow-xl space-y-3">
        <div className="flex gap-2.5 items-start">
          <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Consent & Privacy Alignment
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              We use standard local storage configurations and sandboxed context signals to customize promotional blocks. Declining does not block access, but standard ads will stay generic rather than themed to Tech or Cryptocurrencies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 bg-sky-500 text-white font-semibold text-[10px] rounded-lg cursor-pointer hover:bg-sky-600 transition-colors focus:outline-none"
            id="cookie-accept-all"
          >
            Accept Cookies
          </button>
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold text-[10px] rounded-lg cursor-pointer transition-colors focus:outline-none"
            id="cookie-decline"
          >
            Decline
          </button>
          <button
            onClick={() => setVisible(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-auto focus:outline-none cursor-pointer"
            id="cookie-dismiss-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
