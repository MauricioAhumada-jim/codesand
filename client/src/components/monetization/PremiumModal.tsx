import { X, Crown, AudioLines, CheckCircle2, Loader2 } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';
import { useBibleTheme } from '@/hooks/use-bible-theme';

export function PremiumModal() {
  const { isPremium, showPremiumModal, closePremiumModal, upgradeToPremium, restorePurchases, offerings, isNative } = usePremium();
  const { darkMode } = useBibleTheme();

  if (!showPremiumModal || isPremium) return null;

  const currentOffering = offerings?.current;
  const packages = currentOffering?.availablePackages || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl transition-all ${
          darkMode ? 'bg-gray-900 border border-amber-900/30' : 'bg-white border border-amber-100'
        }`}
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        <button
          onClick={closePremiumModal}
          className={`absolute top-4 right-4 p-2 rounded-full z-50 pointer-events-auto transition-colors ${
            darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8 text-center relative z-10 max-h-[90vh] overflow-y-auto hidden-scrollbar">
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Obtén la Experiencia Completa
          </h2>
          
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Lleva tu estudio bíblico al siguiente nivel con audios narrados ilimitados y sin distracciones.
          </p>

          <div className="space-y-3 mb-6 text-left">
            <div className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-amber-50/50'}`}>
              <AudioLines className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Audio de toda la Biblia
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Escucha todos los libros desde el Éxodo hasta el Apocalipsis. (Génesis es gratis para siempre).
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-amber-50/50'}`}>
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Sin Anuncios
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Lee concentrado sin banners ni interrupciones visuales.
                </p>
              </div>
            </div>
            
             <div className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-amber-50/50'}`}>
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Apoya el Proyecto
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tu aporte nos ayuda a mantener y mejorar esta herramienta para todos.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {!isNative ? (
               <button
                 onClick={() => upgradeToPremium()}
                 className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-500/30 transform transition-all active:scale-[0.98] flex flex-col items-center justify-center gap-1"
               >
                 <span>Desbloquear Todo</span>
                 <span className="text-xs font-normal opacity-80">(Modo Web: Simulación)</span>
               </button>
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <button
                  key={pkg.identifier}
                  onClick={() => upgradeToPremium(pkg)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-500/30 transform transition-all active:scale-[0.98] flex flex-col items-center justify-center gap-1"
                >
                  <span>{pkg.product.title.replace(/\(.*\)/, '') || 'Desbloquear Todo'}</span>
                  <span className="text-sm font-normal opacity-90">{pkg.product.priceString}</span>
                </button>
              ))
            ) : (
               <div className="py-4 flex flex-col items-center justify-center text-amber-500">
                  <Loader2 className="w-6 h-6 animate-spin mb-2" />
                  <span className="text-sm">Cargando paquetes...</span>
               </div>
            )}
          </div>
          
          <button
            onClick={restorePurchases}
            className={`mt-6 text-sm underline-offset-2 hover:underline transition-colors ${
              darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Restaurar compras
          </button>
        </div>
      </div>
    </div>
  );
}
