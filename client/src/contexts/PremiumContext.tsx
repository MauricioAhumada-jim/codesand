import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Purchases, PurchasesOfferings, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

interface PremiumContextType {
  isPremium: boolean;
  showPremiumModal: boolean;
  hasSeenInterstitial: boolean;
  offerings: PurchasesOfferings | null;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  upgradeToPremium: (packageToBuy?: any) => Promise<void>;
  restorePurchases: () => Promise<void>;
  markInterstitialAsSeen: () => void;
  isNative: boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bible-is-premium');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const isNative = Capacitor.isNativePlatform();
  
  // Track if they've seen the full screen ad this session
  const [hasSeenInterstitial, setHasSeenInterstitial] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('bible-has-seen-interstitial');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('bible-is-premium', JSON.stringify(isPremium));
  }, [isPremium]);

  useEffect(() => {
    sessionStorage.setItem('bible-has-seen-interstitial', JSON.stringify(hasSeenInterstitial));
  }, [hasSeenInterstitial]);

  // Initialize RevenueCat
  useEffect(() => {
    const initRevenueCat = async () => {
      if (!isNative) return; // RevenueCat solo corre nativamente

      try {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

        const appleKey = "goog_SWoiDFxPPxmtrGVZnTqrbSAVsmG"; // Puedes cambiarla después si haces versión iOS
        const googleKey = "goog_SWoiDFxPPxmtrGVZnTqrbSAVsmG";

        if (Capacitor.getPlatform() === 'ios' && appleKey) {
          await Purchases.configure({ apiKey: appleKey });
        } else if (Capacitor.getPlatform() === 'android' && googleKey) {
          await Purchases.configure({ apiKey: googleKey });
        } else {
          console.warn("⚠️ RevenueCat: Faltan las API keys en .env, saltando inicialización para evitar crash.");
          return;
        }

        // Obtener el estado del cliente inicial
        const info = await Purchases.getCustomerInfo();
        if (typeof info.customerInfo.entitlements.active['Premium'] !== 'undefined') {
          setIsPremium(true);
        }

        // Escuchar cambios futuros
        Purchases.addCustomerInfoUpdateListener((customerInfo) => {
          if (typeof customerInfo.entitlements.active['Premium'] !== 'undefined') {
            setIsPremium(true);
          } else {
            setIsPremium(false);
          }
        });

        // Obtener paquetes (offerings)
        const currentOfferings = await Purchases.getOfferings();
        setOfferings(currentOfferings);

      } catch (error) {
        console.error('Error inicializando RevenueCat:', error);
      }
    };

    initRevenueCat();
  }, [isNative]);

  const openPremiumModal = () => setShowPremiumModal(true);
  const closePremiumModal = () => setShowPremiumModal(false);
  
  const upgradeToPremium = async (packageToBuy?: any) => {
    if (!isNative) {
      // Simulación en la versión web
      setIsPremium(true);
      closePremiumModal();
      return;
    }

    if (!packageToBuy) return;

    try {
      const result = await Purchases.purchasePackage({ aPackage: packageToBuy });
      if (typeof result.customerInfo.entitlements.active['Premium'] !== 'undefined') {
        setIsPremium(true);
        closePremiumModal();
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Error en la compra', e);
        alert('Hubo un error al procesar tu compra. Por favor, intenta de nuevo.');
      }
    }
  };

  const restorePurchases = async () => {
    if (!isNative) {
      alert('Las compras reales solo se pueden restaurar desde la app móvil.');
      return;
    }

    try {
      const result = await Purchases.restorePurchases();
      if (typeof result.customerInfo.entitlements.active['Premium'] !== 'undefined') {
        setIsPremium(true);
        alert('Tus compras han sido restauradas con éxito.');
        closePremiumModal();
      } else {
        alert('No se encontraron compras previas activas asociadas a esta cuenta.');
      }
    } catch (e: any) {
      console.error('Error restaurando compras', e);
      alert('Hubo un error al restaurar tus compras.');
    }
  };

  const markInterstitialAsSeen = () => {
    setHasSeenInterstitial(true);
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      showPremiumModal,
      hasSeenInterstitial,
      offerings,
      openPremiumModal,
      closePremiumModal,
      upgradeToPremium,
      restorePurchases,
      markInterstitialAsSeen,
      isNative
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}
