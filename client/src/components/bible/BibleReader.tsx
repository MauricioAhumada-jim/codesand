import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useBibleTheme } from '@/hooks/use-bible-theme';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { bibleContent, getBibleBook, getNextBook, getPreviousBook, getVerseText, type Bookmark as BookmarkType, type VerseContent } from '@/lib/bible-data';
import { BibleHeader } from './BibleHeader';
import { BibleSidebar } from './BibleSidebar';
import { ChapterCarousel } from './ChapterCarousel';
import { VerseDisplay } from './VerseDisplay';
import { BookmarksPanel } from './BookmarksPanel';
import { ChapterNavigation } from './ChapterNavigation';

export function BibleReader() {
  const { darkMode, toggleDarkMode } = useBibleTheme();
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
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState('Antiguo Testamento');
  const [lastClickedVerse, setLastClickedVerse] = useState<number>(0);

  const currentBook = getBibleBook(selectedBook);
  const currentContent = bibleContent[selectedBook]?.[selectedChapter] || [];
  
  const isContentArray = Array.isArray(currentContent);
  const verseContent: VerseContent[] = isContentArray ? currentContent : 
    [{ text: `[Aquí se mostrará el contenido de ${currentBook?.name} capítulo ${selectedChapter}.]`, audioUrl: '' }];
  
  const displayContent = verseContent.map(v => getVerseText(v));

  const audioPlayer = useAudioPlayer({
    bookId: selectedBook,
    chapter: selectedChapter,
    verses: verseContent,
    onVerseChange: (verseIndex) => setLastClickedVerse(verseIndex),
    onBookChange: (bookId, chapter) => {
      setSelectedBook(bookId);
      setSelectedChapter(chapter);
    }
  });

  useEffect(() => {
    localStorage.setItem('bible-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  const addVerseBookmark = (verseIndex: number) => {
    const verseNumber = verseIndex + 1;
    const verseText = displayContent[verseIndex];
    
    const existingBookmark = bookmarks.find(
      b => b.book === selectedBook && 
           b.chapter === selectedChapter && 
           b.verse === verseNumber
    );
    
    if (existingBookmark) {
      setBookmarks(bookmarks.filter(b => b.id !== existingBookmark.id));
    } else {
      const newBookmark: BookmarkType = {
        id: Date.now(),
        book: selectedBook,
        chapter: selectedChapter,
        verse: verseNumber,
        verseText: verseText.substring(0, 100) + '...',
        bookName: currentBook?.name || selectedBook,
        timestamp: new Date().toLocaleString()
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const goToBookmark = (book: string, chapter: number) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setShowBookmarks(false);
  };

  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setSelectedChapter(1);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showBookmarks && !target.closest('.bookmarks-panel') && !target.closest('[data-bookmark-button]')) {
        setShowBookmarks(false);
      }
      if (sidebarOpen && !target.closest('aside') && !target.closest('[data-sidebar-toggle]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBookmarks, sidebarOpen]);

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

      <BibleHeader
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        bookmarksCount={bookmarks.length}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        onToggleDarkMode={toggleDarkMode}
      />

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
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
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
            onShareVerse={() => {}}
            onVerseClick={(verseIndex) => setLastClickedVerse(verseIndex)}
            onPlayVerse={audioPlayer.playSingleVerse}
            playingVerseIndex={audioPlayer.currentVerseIndex}
            isPlaying={audioPlayer.isPlaying}
          />

          <ChapterNavigation
            darkMode={darkMode}
            selectedChapter={selectedChapter}
            currentBook={currentBook}
            onPreviousChapter={() => {
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
          />
        </main>
      </div>

      {showBookmarks && (
        <BookmarksPanel
          darkMode={darkMode}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onGoToBookmark={goToBookmark}
          onRemoveBookmark={removeBookmark}
        />
      )}
    </div>
  );
}

export default BibleReader;
