import { useEffect } from 'react';
import { X } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';
import { useBibleTheme } from '@/hooks/use-bible-theme';
import { showBannerAd, hideBannerAd } from '@/lib/monetization';
import { Capacitor } from '@capacitor/core';

interface AdBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AdBanner({ isVisible, onClose }: AdBannerProps) {
  const { isPremium, openPremiumModal } = usePremium();
  const { darkMode } = useBibleTheme();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      if (isVisible && !isPremium) {
        showBannerAd();
      } else {
        hideBannerAd();
      }
    }

    // Cleanup: esconder banner al desmontar el componente
    return () => {
      if (Capacitor.isNativePlatform()) {
        hideBannerAd();
      }
    };
  }, [isVisible, isPremium]);

  if (Capacitor.isNativePlatform()) {
    if (isPremium || !isVisible) return null;

    return (
      <button
        onClick={onClose}
        style={{ bottom: 'calc(56px + env(safe-area-inset-bottom))' }}
        className={`fixed right-3 p-1.5 rounded-full z-[100] shadow-lg transition-colors border ${
          darkMode 
            ? 'bg-gray-900/95 text-gray-400 hover:text-white border-gray-700' 
            : 'bg-white/95 text-gray-500 hover:text-gray-900 border-amber-200'
        }`}
        aria-label="Cerrar anuncio"
      >
        <X size={14} />
      </button>
    );
  }

  if (isPremium || !isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[60] w-full border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all ad-banner-container ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-amber-100'
    }`}>
      <div className="max-w-4xl mx-auto flex items-center p-2 sm:p-3 relative">
        
        {/* Ad Badge */}
        <div className="absolute top-0 left-0 bg-amber-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-br-lg z-10">
          Ad
        </div>

        {/* Close button that triggers premium pitch */}
         <button
            onClick={onClose}
            className={`absolute top-2 right-2 p-1.5 rounded-full z-10 transition-colors ${
              darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
            aria-label="Cerrar anuncio"
          >
            <X size={14} />
          </button>

        {/* Simulated Ad Content */}
        <div className="flex-1 flex items-center justify-center pl-6 pr-8">
          <div 
            onClick={openPremiumModal}
            className={`w-full max-w-sm h-12 flex items-center justify-center gap-3 rounded-lg border cursor-pointer group transition-colors ${
              darkMode ? 'border-amber-900/50 hover:bg-amber-900/20' : 'border-amber-200 hover:bg-amber-50'
            }`}
          >
             <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0 shadow-sm ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 3 14 9-14 9V3z"/></svg>
             </div>
             
             <div className="flex-1 text-left">
                <p className={`text-xs font-bold leading-tight ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  ¿Quieres más audios?
                </p>
                <p className={`text-[10px] leading-tight ${darkMode ? 'text-amber-400/80' : 'text-amber-600'}`}>
                  Actualiza a Premium hoy mismo.
                </p>
             </div>

             <div className={`px-3 py-1 mr-2 text-[10px] font-bold uppercase rounded transition-colors ${
                darkMode ? 'bg-amber-500 text-white group-hover:bg-amber-400' : 'bg-amber-500 text-white group-hover:bg-amber-600'
             }`}>
                Ver ofertas
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
