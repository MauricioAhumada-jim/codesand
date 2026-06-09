import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// ==========================================
// 1. GOOGLE ADMOB CONFIG
// ==========================================
// REEMPLAZA ESTOS VALORES CON TUS IDs DE BLOQUES DE ANUNCIOS DE ADMOB

// ESTOS SON IDs DE PRUEBA OFICIALES DE GOOGLE. 
// ¡Cámbialos a los tuyos antes de publicar en la Play Store!
const BANNER_AD_UNIT_ID = "ca-app-pub-3034050578955042/8610143094"; 
const INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3034050578955042/1328607698"; 

// Variables de estado de inicialización para evitar condiciones de carrera
let isAdMobInitialized = false;
let adMobInitPromise: Promise<void> | null = null;

/**
 * Inicializa AdMob garantizando una única ejecución concurrente.
 * Retorna la promesa de inicialización para ser esperada por otros métodos.
 */
export async function initializeMonetization(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  if (isAdMobInitialized) return;
  if (adMobInitPromise) return adMobInitPromise;

  adMobInitPromise = (async () => {
    try {
      console.log("⏳ AdMob: Iniciando inicialización...");
      await AdMob.initialize();
      isAdMobInitialized = true;
      console.log("✅ AdMob: Inicializado correctamente");
    } catch (error) {
      console.error("❌ Error inicializando AdMob:", error);
      // Permitir reintentos futuros limpiando la promesa si falla
      adMobInitPromise = null;
    }
  })();

  return adMobInitPromise;
}

/**
 * Muestra un anuncio de Banner en la parte inferior de la pantalla.
 */
export async function showBannerAd() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    // Asegurar que AdMob está completamente inicializado antes de mostrar
    await initializeMonetization();
    if (!isAdMobInitialized) {
      console.warn("⚠️ AdMob no está inicializado. No se puede mostrar el banner.");
      return;
    }

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
    // Asegurar que AdMob está completamente inicializado antes de ocultar
    await initializeMonetization();
    if (!isAdMobInitialized) {
      console.warn("⚠️ AdMob no está inicializado. No se puede ocultar el banner.");
      return;
    }

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
    // Asegurar que AdMob está completamente inicializado antes de preparar
    await initializeMonetization();
    if (!isAdMobInitialized) {
      console.warn("⚠️ AdMob no está inicializado. No se puede mostrar el intersticial.");
      return;
    }

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

