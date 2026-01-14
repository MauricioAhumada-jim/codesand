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
}

export function ChapterNavigation({
  darkMode,
  selectedChapter,
  currentBook,
  onPreviousChapter,
  onNextChapter,
  isPlaying = false,
  onPlayChapter
}: ChapterNavigationProps) {
  const hasPreviousBook = currentBook ? getPreviousBook(currentBook.id) !== null : false;
  const hasNextBook = currentBook ? getNextBook(currentBook.id) !== null : false;
  
  const canGoPrevious = selectedChapter > 1 || hasPreviousBook;
  const canGoNext = currentBook ? (selectedChapter < currentBook.chapters || hasNextBook) : false;

  return (
    <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
      <button
        onClick={onPreviousChapter}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
          !canGoPrevious
            ? 'opacity-50 cursor-not-allowed'
            : darkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-amber-100 border border-amber-200'
        }`}
        data-testid="button-previous-chapter"
      >
        <ChevronRight size={20} className="rotate-180" />
        <span className="hidden sm:inline">Capítulo anterior</span>
      </button>

      <button
        onClick={onPlayChapter}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
          darkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-amber-100 border border-amber-200'
        }`}
        data-testid="button-play-chapter"
      >
        {isPlaying ? (
          <Pause size={20} className="text-amber-500" />
        ) : (
          <Play size={20} className="text-amber-500" />
        )}
        <span className="hidden sm:inline">{isPlaying ? 'Pausar' : 'Reproducir'}</span>
      </button>

      <button
        onClick={onNextChapter}
        disabled={!canGoNext}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
          !canGoNext
            ? 'opacity-50 cursor-not-allowed'
            : darkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-amber-100 border border-amber-200'
        }`}
        data-testid="button-next-chapter"
      >
        <span className="hidden sm:inline">Capítulo siguiente</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
