import { ChevronRight, Play, Pause } from 'lucide-react';
import { type BibleBook, getPreviousBook, getNextBook } from '@/lib/bible-data';

interface ChapterNavigationProps {
  darkMode: boolean;
  selectedChapter: number;
  currentBook: BibleBook | null;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  isPlaying?: boolean;
  onPlayChapter?: () => void;
  isAdVisible?: boolean;
}

export function ChapterNavigation({
  darkMode,
  selectedChapter,
  currentBook,
  onPreviousChapter,
  onNextChapter,
  isPlaying = false,
  onPlayChapter,
  isAdVisible = false
}: ChapterNavigationProps) {
  const hasPreviousBook = currentBook ? getPreviousBook(currentBook.id) !== null : false;
  const hasNextBook = currentBook ? getNextBook(currentBook.id) !== null : false;

  const canGoPrevious = selectedChapter > 1 || hasPreviousBook;
  const canGoNext = currentBook ? (selectedChapter < currentBook.chapters || hasNextBook) : false;

  return (
    <div className={`fixed ${isAdVisible ? 'ad-visible' : ''} chapter-nav-container transition-all left-1/2 -translate-x-1/2 z-40 flex flex-row items-center gap-2 sm:gap-3 bg-amber-500 p-2 sm:p-3 rounded-full shadow-2xl border border-amber-400 backdrop-blur-md`}>
      <button
        onClick={onPreviousChapter}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 rounded-full font-bold text-black transition-all active:scale-95 ${!canGoPrevious
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-amber-400 shadow-sm hover:shadow-md'
          }`}
        data-testid="button-previous-chapter"
        title="Capítulo anterior"
      >
        <ChevronRight size={22} className="rotate-180" />
        <span className="hidden sm:inline ml-1">Anterior</span>
      </button>

      <button
        onClick={onPlayChapter}
        className={`flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-black text-black bg-white/30 hover:bg-white/40 border border-white/50 backdrop-blur-sm transition-all shadow-lg active:scale-95`}
        data-testid="button-play-chapter"
        title={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isPlaying ? (
          <Pause size={24} className="fill-black" />
        ) : (
          <Play size={24} className="fill-black" />
        )}
      </button>

      <button
        onClick={onNextChapter}
        disabled={!canGoNext}
        className={`flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 rounded-full font-bold text-black transition-all active:scale-95 ${!canGoNext
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-amber-400 shadow-sm hover:shadow-md'
          }`}
        data-testid="button-next-chapter"
        title="Capítulo siguiente"
      >
        <span className="hidden sm:inline mr-1">Siguiente</span>
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
