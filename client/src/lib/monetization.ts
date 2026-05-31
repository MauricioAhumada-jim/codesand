import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';

// ==========================================
// 1. REVENUECAT (GOOGLE PLAY BILLING) CONFIG
// ==========================================
// REEMPLAZA ESTE VALOR CON TU "PUBLIC API KEY" DE ANDROID EN REVENUECAT
const REVENUECAT_PUBLIC_GOOGLE_API_KEY: string = "goog_SWoiDFxPPxmtrGVZnTqrbSAVsmG";


// ==========================================
// 2. GOOGLE ADMOB CONFIG
// ==========================================
// REEMPLAZA ESTOS VALORES CON TUS IDs DE BLOQUES DE ANUNCIOS DE ADMOB

// ESTOS SON IDs DE PRUEBA OFICIALES DE GOOGLE. 
// ¡Cámbialos a los tuyos antes de publicar en la Play Store!
const BANNER_AD_UNIT_ID = "ca-app-pub-3034050578955042/8610143094"; 
const INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3034050578955042/1328607698"; 


/**
 * Inicializa RevenueCat y AdMob.
 * Llama a esta función al inicio de tu aplicación (ej. en App.tsx).
 */
export async function initializeMonetization() {
  if (Capacitor.isNativePlatform()) {
    try {
      // 1. Iniciar RevenueCat
      if (REVENUECAT_PUBLIC_GOOGLE_API_KEY !== "goog_COLOCA_TU_API_KEY_AQUI") {
        await Purchases.configure({ apiKey: REVENUECAT_PUBLIC_GOOGLE_API_KEY });
        console.log("✅ RevenueCat: Configurado correctamente");
      } else {
        console.warn("⚠️ RevenueCat: No configurado. Falta la API Key en monetization.ts");
      }

      // 2. Iniciar AdMob
      await AdMob.initialize();
      console.log("✅ AdMob: Inicializado correctamente");

    } catch (error) {
      console.error("❌ Error inicializando monetización:", error);
    }
  } else {
    console.log("ℹ️ Monetización ignorada (No estamos en dispositivo móvil/APK)");
  }
}

/**
 * Muestra un anuncio de Banner en la parte inferior de la pantalla.
 */
export async function showBannerAd() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.showBanner({
      adId: BANNER_AD_UNIT_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false // Pon en falso cuando vayas a producción
    });
    console.log("✅ AdMob: Banner mostrado");
  } catch (error) {
    console.error("❌ Error mostrando banner AdMob:", error);
  }
}

/**
 * Oculta el anuncio de Banner de la pantalla.
 */
export async function hideBannerAd() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.error("❌ Error ocultando banner AdMob:", error);
  }
}

/**
 * Muestra un anuncio Intersticial (pantalla completa).
 */
export async function showInterstitialAd() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_UNIT_ID,
      isTesting: false // Pon en falso cuando vayas a producción
    });
    await AdMob.showInterstitial();
    console.log("✅ AdMob: Intersticial mostrado");
  } catch (error) {
    console.error("❌ Error mostrando intersticial AdMob:", error);
  }
}
