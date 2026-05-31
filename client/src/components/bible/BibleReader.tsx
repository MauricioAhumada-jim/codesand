import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useBibleTheme } from '@/hooks/use-bible-theme';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { fetchBookContent, getBibleBook, getNextBook, getPreviousBook, getVerseText, type Bookmark as BookmarkType, type VerseContent, type BibleContentChapter } from '@/lib/bible-data';
import { BibleSidebar } from './BibleSidebar';
import { ChapterCarousel } from './ChapterCarousel';
import { VerseDisplay } from './VerseDisplay';
import { ChapterNavigation } from './ChapterNavigation';
import { BookmarksView } from './BookmarksView';
import { AdBanner } from '@/components/monetization/AdBanner';
import { usePremium } from '@/contexts/PremiumContext';

export function BibleReader() {
  const { darkMode, toggleDarkMode } = useBibleTheme();
  const { isPremium } = usePremium();
  const [isAdVisible, setIsAdVisible] = useState(!isPremium);
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bible-bookmarks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [selectedBook, setSelectedBook] = useState('genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [viewMode, setViewMode] = useState<'reader' | 'bookmarks'>('reader');
  const [selectedMood, setSelectedMood] = useState<'all' | string>('all');
  const [selectedTestament, setSelectedTestament] = useState('Antiguo Testamento');
  const [lastClickedVerse, setLastClickedVerse] = useState<number>(0);
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bible-font-size');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const fontSizeClasses = [
    'text-sm sm:text-base md:text-lg',   // 0: Normal
    'text-base sm:text-lg md:text-xl',   // 1: Grande
    'text-lg sm:text-xl md:text-2xl',    // 2: Muy Grande
    'text-xl sm:text-2xl md:text-3xl',   // 3: Enorme
    'text-2xl sm:text-3xl md:text-4xl'   // 4: Gigante
  ];

  const currentBook = getBibleBook(selectedBook);
  const [bookContent, setBookContent] = useState<BibleContentChapter | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setBookContent(null);

    fetchBookContent(selectedBook).then(content => {
      if (active) {
        setBookContent(content);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, [selectedBook]);

  const currentContent = bookContent?.[selectedChapter] || [];

  const isContentArray = Array.isArray(currentContent) && currentContent.length > 0;
  const verseContent: VerseContent[] = isContentArray ? currentContent :
    [{ text: isLoading ? "Cargando..." : `[Aquí se mostrará el contenido de ${currentBook?.name} capítulo ${selectedChapter}.]`, audioUrl: '' }];

  const displayContent = verseContent.map(v => getVerseText(v));

  const audioPlayer = useAudioPlayer({
    bookId: selectedBook,
    chapter: selectedChapter,
    verses: verseContent,
    onVerseChange: (verseIndex) => setLastClickedVerse(verseIndex),
    onBookChange: (bookId, chapter) => {
      setSelectedBook(bookId);
      setSelectedChapter(chapter);
      setLastClickedVerse(0);
    }
  });

  useEffect(() => {
    localStorage.setItem('bible-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('bible-font-size', fontSizeIndex.toString());
  }, [fontSizeIndex]);

  const addBookmark = () => {
    const newBookmark: BookmarkType = {
      id: Date.now(),
      book: selectedBook,
      chapter: selectedChapter,
      bookName: currentBook?.name || selectedBook,
      timestamp: new Date().toLocaleString()
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  const addVerseBookmark = (verseIndex: number, colorCode?: string, moodId?: string) => {
    const verseNumber = verseIndex + 1;
    const verseText = displayContent[verseIndex];

    const existingBookmarkIndex = bookmarks.findIndex(
      b => b.book === selectedBook &&
        b.chapter === selectedChapter &&
        b.verse === verseNumber
    );

    if (existingBookmarkIndex >= 0) {
      if (colorCode) {
        const updatedBookmarks = [...bookmarks];
        updatedBookmarks[existingBookmarkIndex] = {
          ...updatedBookmarks[existingBookmarkIndex],
          colorCode,
          moodId,
          timestamp: new Date().toLocaleString()
        };
        setBookmarks(updatedBookmarks);
      } else {
        setBookmarks(bookmarks.filter((_, i) => i !== existingBookmarkIndex));
      }
    } else {
      const newBookmark: BookmarkType = {
        id: Date.now(),
        book: selectedBook,
        chapter: selectedChapter,
        verse: verseNumber,
        verseText: verseText.substring(0, 100) + '...',
        bookName: currentBook?.name || selectedBook,
        timestamp: new Date().toLocaleString(),
        colorCode,
        moodId
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const goToBookmark = (book: string, chapter: number, verseNumber?: number) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setViewMode('reader');

    if (verseNumber) {
      setLastClickedVerse(verseNumber - 1);
      setTimeout(() => {
        const verseEl = document.querySelector(`[data-testid="verse-${verseNumber}"]`);
        if (verseEl) {
          verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500); // Wait for render
    } else {
      setLastClickedVerse(0);
    }
  };

  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setSelectedChapter(1);
    setLastClickedVerse(0);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sidebarOpen && !target.closest('aside') && !target.closest('[data-sidebar-toggle]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleToggleTheme = () => {
      toggleDarkMode();
    };

    window.addEventListener('toggle-theme', handleToggleTheme);
    return () => {
      window.removeEventListener('toggle-theme', handleToggleTheme);
    };
  }, [toggleDarkMode]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      const carousel = document.querySelector('.chapters-carousel');
      const selectedButton = document.querySelector('.chapter-selected');
      if (carousel && selectedButton) {
        const htmlElement = selectedButton as HTMLElement;
        const scrollLeft = htmlElement.offsetLeft - (carousel.clientWidth / 2) + (htmlElement.clientWidth / 2);
        carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedChapter]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-amber-50 text-gray-900'} overflow-x-hidden`}>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .carousel-gradient-dark::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 40px;
          background: linear-gradient(to right, rgb(17, 24, 39), transparent);
          pointer-events: none;
          z-index: 10;
        }
        .carousel-gradient-dark::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 40px;
          background: linear-gradient(to left, rgb(17, 24, 39), transparent);
          pointer-events: none;
          z-index: 10;
        }
        .carousel-gradient-light::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 40px;
          background: linear-gradient(to right, rgb(255, 251, 235), transparent);
          pointer-events: none;
          z-index: 10;
        }
        .carousel-gradient-light::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 40px;
          background: linear-gradient(to left, rgb(255, 251, 235), transparent);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
      <div className="flex overflow-x-hidden relative">
        <BibleSidebar
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          searchTerm={searchTerm}
          selectedTestament={selectedTestament}
          selectedBook={selectedBook}
          onClose={() => setSidebarOpen(false)}
          onSearchChange={setSearchTerm}
          onTestamentChange={setSelectedTestament}
          onBookSelect={handleBookSelect}
          bookmarksCount={bookmarks.length}
          onViewBookmarks={() => {
            setViewMode('bookmarks');
            if (window.innerWidth < 1024) setSidebarOpen(false);
          }}
          viewMode={viewMode}
          selectedMood={selectedMood}
          onMoodSelect={(moodId) => setSelectedMood(moodId)}
          onViewReader={() => {
            setViewMode('reader');
            if (window.innerWidth < 1024) setSidebarOpen(false);
          }}
          isMusicEnabled={audioPlayer.isMusicEnabled}
          musicVolume={audioPlayer.musicVolume}
          onToggleMusic={audioPlayer.toggleMusicEnabled}
          onVolumeChange={audioPlayer.setMusicVolume}
          fontSizeIndex={fontSizeIndex}
          onIncreaseFontSize={() => setFontSizeIndex(prev => Math.min(prev + 1, 4))}
          onDecreaseFontSize={() => setFontSizeIndex(prev => Math.max(prev - 1, 0))}
        />

        {viewMode === 'reader' ? (
          <>
            <main className={`flex-1 p-4 sm:p-6 md:p-8 ${isAdVisible && !isPremium ? 'pb-40 lg:pb-48' : 'pb-32 lg:pb-36'} max-w-4xl mx-auto w-full relative bible-reader-main transition-all`}>
              {/* Controles Menú Superior (Solo Lector) */}
              {!sidebarOpen && (
                <div className="absolute safe-hamburger left-4 lg:-left-4 xl:-left-12 z-10 transition-all duration-300">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`p-2 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-amber-500 border-gray-700 hover:bg-gray-700' : 'bg-white text-amber-500 border-amber-200 hover:bg-amber-50'} border transition-opacity`}
                    data-sidebar-toggle
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                  </button>
                </div>
              )}
              {/* Removed absolute left old hamburger */}

              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Removed Mobile Theme Toggle directly from reader */}
              </div>

              <div className="mb-6 relative">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4"
                  data-testid="text-chapter-title"
                >
                  {currentBook?.name} - Capítulo {selectedChapter}
                </h2>

                <ChapterCarousel
                  darkMode={darkMode}
                  totalChapters={currentBook?.chapters || 1}
                  selectedChapter={selectedChapter}
                  onChapterSelect={setSelectedChapter}
                />
              </div>

              <VerseDisplay
                darkMode={darkMode}
                verses={displayContent}
                currentBook={currentBook}
                selectedChapter={selectedChapter}
                bookmarks={bookmarks}
                onAddVerseBookmark={addVerseBookmark}
                onShareVerse={() => { }}
                onVerseClick={(verseIndex) => setLastClickedVerse(verseIndex)}
                onPlayVerse={audioPlayer.playChapterFromVerse}
                playingVerseIndex={audioPlayer.currentVerseIndex}
                isPlaying={audioPlayer.isPlaying}
                fontSizeClass={fontSizeClasses[fontSizeIndex]}
              />

              <div className={sidebarOpen ? "hidden lg:block" : ""}>
                <ChapterNavigation
                  darkMode={darkMode}
                  selectedChapter={selectedChapter}
                  currentBook={currentBook}
                  onPreviousChapter={() => {
                    setLastClickedVerse(0);
                    audioPlayer.stopPlayback();
                    if (selectedChapter > 1) {
                      setSelectedChapter(selectedChapter - 1);
                    } else {
                      const prevBook = getPreviousBook(selectedBook);
                      if (prevBook) {
                        setSelectedBook(prevBook.id);
                        setSelectedChapter(prevBook.chapters);
                      }
                    }
                  }}
                  onNextChapter={() => {
                    setLastClickedVerse(0);
                    audioPlayer.stopPlayback();
                    if (currentBook && selectedChapter < currentBook.chapters) {
                      setSelectedChapter(selectedChapter + 1);
                    } else {
                      const nextBook = getNextBook(selectedBook);
                      if (nextBook) {
                        setSelectedBook(nextBook.id);
                        setSelectedChapter(1);
                      }
                    }
                  }}
                  isPlaying={audioPlayer.isPlaying && audioPlayer.isChapterMode}
                  onPlayChapter={() => {
                    if (audioPlayer.isPlaying && audioPlayer.isChapterMode) {
                      audioPlayer.stopPlayback();
                    } else {
                      audioPlayer.playChapterFromVerse(lastClickedVerse);
                    }
                  }}
                  isAdVisible={isAdVisible && !isPremium}
                />
              </div>
            </main>
          </>
        ) : (
          <>
            <div className="flex-1 relative bible-reader-main">
              {/* Controles Menú Superior (Solo Lector) */}
              {!sidebarOpen && (
                <div className="absolute safe-hamburger left-4 lg:-left-4 xl:-left-12 z-10 transition-all duration-300">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`p-2 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-amber-500 border-gray-700 hover:bg-gray-700' : 'bg-white text-amber-500 border-amber-200 hover:bg-amber-50'} border transition-opacity`}
                    data-sidebar-toggle
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                  </button>
                </div>
              )}

              <BookmarksView
                darkMode={darkMode}
                bookmarks={bookmarks}
                selectedMood={selectedMood}
                onGoToBookmark={goToBookmark}
                onRemoveBookmark={removeBookmark}
              />
            </div>
          </>
        )}
      </div>
      <AdBanner isVisible={isAdVisible} onClose={() => setIsAdVisible(false)} />
    </div>
  );
}

export default BibleReader;
