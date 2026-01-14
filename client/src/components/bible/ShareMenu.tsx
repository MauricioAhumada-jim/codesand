import { Facebook, Twitter, MessageCircle, Link2, Check } from 'lucide-react';

interface ShareMenuProps {
  darkMode: boolean;
  shareText: string;
  shareUrl: string;
  copySuccess: boolean;
  label?: string;
  onShareFacebook: () => void;
  onShareTwitter: () => void;
  onShareWhatsApp: () => void;
  onCopyLink: () => void;
  className?: string;
}

export function ShareMenu({
  darkMode,
  shareText,
  copySuccess,
  label,
  onShareFacebook,
  onShareTwitter,
  onShareWhatsApp,
  onCopyLink,
  className = ''
}: ShareMenuProps) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-4 ${className}`}>
      {label && (
        <p className="text-xs text-amber-500 font-semibold mb-2">
          {label}
        </p>
      )}
      <p className="text-sm font-semibold mb-3">Compartir en:</p>
      <div className="space-y-2">
        <button
          onClick={onShareFacebook}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
          data-testid="button-share-facebook"
        >
          <Facebook size={20} className="text-blue-600" />
          <span>Facebook</span>
        </button>
        <button
          onClick={onShareTwitter}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
          data-testid="button-share-twitter"
        >
          <Twitter size={20} className="text-sky-500" />
          <span>Twitter / X</span>
        </button>
        <button
          onClick={onShareWhatsApp}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
          data-testid="button-share-whatsapp"
        >
          <MessageCircle size={20} className="text-green-500" />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={onCopyLink}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
          data-testid="button-copy-link"
        >
          {copySuccess ? (
            <>
              <Check size={20} className="text-green-500" />
              <span className="text-green-500">¡Copiado!</span>
            </>
          ) : (
            <>
              <Link2 size={20} className="text-gray-500" />
              <span>Copiar texto</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
