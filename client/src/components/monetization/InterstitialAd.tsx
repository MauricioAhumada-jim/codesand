import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';
import { useBibleTheme } from '@/hooks/use-bible-theme';

export function InterstitialAd() {
  const { isPremium, hasSeenInterstitial, markInterstitialAsSeen, openPremiumModal } = usePremium();
  const { darkMode } = useBibleTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Only show if not premium and hasn't seen it this session yet
    // Add a small delay so it doesn't pop immediately on load
    if (!isPremium && !hasSeenInterstitial) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        markInterstitialAsSeen();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPremium, hasSeenInterstitial, markInterstitialAsSeen]);

  // Handle countdown for close button
  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setCanClose(true);
    }
  }, [isVisible, countdown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-20 ${
        darkMode ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'
      }`}>
        <span className={`text-xs font-semibold px-2 py-1 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30`}>
          Anuncio
        </span>

        {canClose ? (
          <button
            onClick={() => setIsVisible(false)}
            className={`p-2 rounded-full transition-colors ${
              darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-200 text-gray-600 hover:text-black'
            }`}
            aria-label="Cerrar anuncio"
          >
            <X size={20} />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin flex items-center justify-center">
             <span className="text-[10px] font-bold text-amber-500 animate-none">{countdown}</span>
          </div>
        )}
      </div>

      {/* Ad Content (Simulated Partner or Own App Promo) */}
      <div className="relative w-full h-full flex flex-col pt-14 pb-20">
        
        <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${
           darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'
        }`}>
          
          <div className="w-32 h-32 mb-8 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M12 9h4"></path><path d="M12 13h4"></path></svg>
          </div>

          <h1 className={`text-3xl font-black tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            La Palabra de Dios, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Narrada para ti.</span>
          </h1>

          <p className={`text-lg mb-8 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Disfruta de la Biblia completa en audio de alta calidad. Escucha en el auto, mientras caminas o antes de dormir.
          </p>

          {/* Call to action */}
          <button
             onClick={() => {
                setIsVisible(false); // Close Ad
                openPremiumModal();  // Open Real offer
             }}
             className="w-full max-w-sm py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-amber-500/30 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
             <span>Obtener Premium Ahora</span>
             <ExternalLink size={20} />
          </button>
          
          <p className="mt-4 text-xs text-gray-500">
             (Este es un anuncio simulado. En Android real, aquí cargaría AdMob).
          </p>
        </div>
      </div>
    </div>
  );
}
