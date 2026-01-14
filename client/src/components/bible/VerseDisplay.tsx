import { useState, useEffect, type MouseEvent } from 'react';
import { Bookmark, BookmarkPlus, Share2, Play, Pause, Facebook, MessageCircle, Link2, Check } from 'lucide-react';
import { SiX } from 'react-icons/si';
import type { BibleBook, Bookmark as BookmarkType } from '@/lib/bible-data';

interface VerseDisplayProps {
  darkMode: boolean;
  verses: string[];
  currentBook: BibleBook | null;
  selectedChapter: number;
  bookmarks: BookmarkType[];
  onAddVerseBookmark: (verseIndex: number) => void;
  onShareVerse: (verseIndex: number) => void;
  onVerseClick?: (verseIndex: number) => void;
  onPlayVerse?: (verseIndex: number) => void;
  playingVerseIndex?: number | null;
  isPlaying?: boolean;
}

export function VerseDisplay({
  darkMode,
  verses,
  currentBook,
  selectedChapter,
  bookmarks,
  onAddVerseBookmark,
  onVerseClick,
  onPlayVerse,
  playingVerseIndex,
  isPlaying = false,
}: VerseDisplayProps) {
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [verseMenuOpen, setVerseMenuOpen] = useState<number | null>(null);
  const [verseShareMenuOpen, setVerseShareMenuOpen] = useState(false);
  const [verseMenuPosition, setVerseMenuPosition] = useState<{ [key: number]: boolean }>({});
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (verseMenuOpen !== null && !target.closest('.verse-menu') && !target.closest('.verse-text')) {
        setVerseMenuOpen(null);
        setVerseShareMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [verseMenuOpen]);

  const isVerseBookmarked = (verseIndex: number) => {
    const verseNumber = verseIndex + 1;
    return bookmarks.some(
      b => b.book === currentBook?.id && 
           b.chapter === selectedChapter && 
           b.verse === verseNumber
    );
  };

  const handleVerseClick = (verseIndex: number, event: MouseEvent<HTMLParagraphElement>) => {
    onVerseClick?.(verseIndex);
    
    if (verseMenuOpen === verseIndex) {
      setVerseMenuOpen(null);
      setVerseShareMenuOpen(false);
    } else {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + (rect.height / 2);
      const shouldOpenBelow = elementCenter < viewportHeight / 2;
      
      setVerseMenuPosition(prev => ({ ...prev, [verseIndex]: shouldOpenBelow }));
      setVerseMenuOpen(verseIndex);
      setVerseShareMenuOpen(false);
    }
  };

  const playVerseAudio = (verseIndex: number) => {
    onPlayVerse?.(verseIndex);
    setVerseMenuOpen(null);
  };

  const getVerseShareText = (verseIndex: number, includeUrl = false) => {
    const verseText = verses[verseIndex];
    const baseText = `"${verseText}" - ${currentBook?.name} ${selectedChapter}:${verseIndex + 1}`;
    if (includeUrl) {
      return `${baseText}\n${window.location.href}`;
    }
    return baseText;
  };

  const shareOnFacebook = (verseIndex: number) => {
    const text = encodeURIComponent(getVerseShareText(verseIndex));
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
    setVerseMenuOpen(null);
    setVerseShareMenuOpen(false);
  };

  const shareOnTwitter = (verseIndex: number) => {
    const text = encodeURIComponent(getVerseShareText(verseIndex));
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    setVerseMenuOpen(null);
    setVerseShareMenuOpen(false);
  };

  const shareOnWhatsApp = (verseIndex: number) => {
    const text = encodeURIComponent(getVerseShareText(verseIndex, true));
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setVerseMenuOpen(null);
    setVerseShareMenuOpen(false);
  };

  const copyVerseText = async (verseIndex: number) => {
    try {
      await navigator.clipboard.writeText(getVerseShareText(verseIndex));
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
        setVerseMenuOpen(null);
        setVerseShareMenuOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 sm:p-6 md:p-8 shadow-lg`}>
      <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none" style={{ 
        fontFamily: 'Georgia, serif',
        lineHeight: '1.8',
      }}>
        {verses.map((verse, idx) => (
          <div key={idx} className="relative">
            <p 
              className={`verse-text mb-3 sm:mb-4 transition-all cursor-pointer relative ${
                verseMenuOpen === idx ? (darkMode ? 'bg-gray-700' : 'bg-amber-50') : hoveredVerse === idx ? (darkMode ? 'bg-gray-700' : 'bg-amber-50') : ''
              } rounded px-2 py-1 text-base md:text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
              onMouseEnter={() => setHoveredVerse(idx)}
              onMouseLeave={() => setHoveredVerse(null)}
              onClick={(e) => handleVerseClick(idx, e)}
              data-testid={`verse-${idx + 1}`}
            >
              <span className="font-bold text-amber-500 mr-2 select-none">{idx + 1}</span>
              {verse}
            </p>
            
            {verseMenuOpen === idx && (
              <div className={`verse-menu absolute left-1/2 -translate-x-1/2 ${
                verseMenuPosition[idx] ? 'top-full mt-2' : '-top-14'
              } ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-2 z-20 flex gap-1`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddVerseBookmark(idx);
                  }}
                  className={`p-3 rounded-full ${
                    isVerseBookmarked(idx) 
                      ? 'bg-amber-500 hover:bg-amber-600' 
                      : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'
                  } transition-colors`}
                  title="Guardar versículo"
                  data-testid={`button-bookmark-verse-${idx + 1}`}
                >
                  {isVerseBookmarked(idx) ? (
                    <Bookmark size={20} className="text-white fill-white" />
                  ) : (
                    <BookmarkPlus size={20} className="text-amber-500" />
                  )}
                </button>
                
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setVerseShareMenuOpen(!verseShareMenuOpen);
                    }}
                    className={`p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                    title="Compartir versículo"
                    data-testid={`button-share-verse-${idx + 1}`}
                  >
                    <Share2 size={20} className="text-amber-500" />
                  </button>
                  
                  {verseShareMenuOpen && (
                    <div 
                      className={`absolute ${
                        verseMenuPosition[idx] ? 'top-full mt-2' : 'bottom-full mb-2'
                      } left-1/2 -translate-x-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-3 w-48`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-xs text-amber-500 font-semibold mb-2">
                        {currentBook?.name} {selectedChapter}:{idx + 1}
                      </p>
                      <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Compartir en:</p>
                      <div className="space-y-1">
                        <button
                          onClick={() => shareOnFacebook(idx)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-amber-50 text-gray-700'} transition-colors text-sm`}
                        >
                          <Facebook size={18} className="text-blue-600" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => shareOnTwitter(idx)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-amber-50 text-gray-700'} transition-colors text-sm`}
                        >
                          <SiX size={18} className={darkMode ? 'text-gray-200' : 'text-gray-800'} />
                          <span>X</span>
                        </button>
                        <button
                          onClick={() => shareOnWhatsApp(idx)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-amber-50 text-gray-700'} transition-colors text-sm`}
                        >
                          <MessageCircle size={18} className="text-green-500" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => copyVerseText(idx)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-amber-50 text-gray-700'} transition-colors text-sm`}
                        >
                          {copySuccess ? (
                            <>
                              <Check size={18} className="text-green-500" />
                              <span className="text-green-500 text-xs">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Link2 size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playVerseAudio(idx);
                  }}
                  className={`p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                  title={isPlaying && playingVerseIndex === idx ? "Pausar audio" : "Reproducir audio"}
                  data-testid={`button-play-verse-${idx + 1}`}
                >
                  {isPlaying && playingVerseIndex === idx ? (
                    <Pause size={20} className="text-amber-500" />
                  ) : (
                    <Play size={20} className="text-amber-500" />
                  )}
                </button>
                
                <div className={`absolute left-1/2 -translate-x-1/2 ${
                  verseMenuPosition[idx] ? 'top-0 -translate-y-full rotate-180' : 'top-full'
                } w-0 h-0 border-l-8 border-r-8 border-t-8 ${darkMode ? 'border-t-gray-800' : 'border-t-white'} border-l-transparent border-r-transparent`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
