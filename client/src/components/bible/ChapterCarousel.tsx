import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface ChapterCarouselProps {
  darkMode: boolean;
  totalChapters: number;
  selectedChapter: number;
  onChapterSelect: (chapter: number) => void;
}

export function ChapterCarousel({
  darkMode,
  totalChapters,
  selectedChapter,
  onChapterSelect
}: ChapterCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollChapters = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="mb-4 relative w-full">
      <div className={`md:hidden w-full relative ${darkMode ? 'carousel-gradient-dark' : 'carousel-gradient-light'}`}>
        <div className="overflow-x-auto scrollbar-hide chapters-carousel">
          <div className="flex gap-2 pb-2 px-1" style={{ scrollSnapType: 'x mandatory' }}>
            {chapters.map(chapter => (
              <button
                key={chapter}
                onClick={() => onChapterSelect(chapter)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedChapter === chapter
                    ? 'bg-amber-500 text-white chapter-selected'
                    : darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-amber-100 border border-amber-200'
                }`}
                style={{ scrollSnapAlign: 'start' }}
                data-testid={`button-chapter-mobile-${chapter}`}
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex w-full items-center gap-2 max-w-full overflow-hidden">
        <button
          onClick={() => scrollChapters('left')}
          className={`flex-shrink-0 p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'} shadow-lg`}
          data-testid="button-scroll-chapters-left"
        >
          <ChevronRight size={20} className="rotate-180 text-amber-500" />
        </button>
        
        <div className={`relative flex-1 min-w-0 ${darkMode ? 'carousel-gradient-dark' : 'carousel-gradient-light'}`}>
          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide chapters-carousel-desktop"
          >
            <div className="flex gap-2 py-1">
              {chapters.map(chapter => (
                <button
                  key={chapter}
                  onClick={() => onChapterSelect(chapter)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors text-base ${
                    selectedChapter === chapter
                      ? 'bg-amber-500 text-white'
                      : darkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-white hover:bg-amber-100 border border-amber-200'
                  }`}
                  data-testid={`button-chapter-${chapter}`}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => scrollChapters('right')}
          className={`flex-shrink-0 p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'} shadow-lg`}
          data-testid="button-scroll-chapters-right"
        >
          <ChevronRight size={20} className="text-amber-500" />
        </button>
      </div>
    </div>
  );
}
