import { useState, useMemo } from 'react';
import { Bookmark as BookmarkIcon, X } from 'lucide-react';
import type { Bookmark as BookmarkType } from '@/lib/bible-data';
import { MOOD_COLORS } from '@/lib/bible-data';
import { ChapterCarousel } from './ChapterCarousel';

interface BookmarksViewProps {
    darkMode: boolean;
    bookmarks: BookmarkType[];
    selectedMood: string | 'all';
    onGoToBookmark: (book: string, chapter: number, verseNumber?: number) => void;
    onRemoveBookmark: (id: number) => void;
}

export function BookmarksView({
    darkMode,
    bookmarks,
    selectedMood,
    onGoToBookmark,
    onRemoveBookmark,
}: BookmarksViewProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    // Filter bookmarks by mood
    const filteredBookmarks = useMemo(() => {
        return bookmarks
            .filter((b) => selectedMood === 'all' || b.moodId === selectedMood)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [bookmarks, selectedMood]);

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE));

    // Get current page bookmarks
    const currentBookmarks = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBookmarks.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBookmarks, currentPage]);

    // Get current mood name
    const moodName = selectedMood === 'all'
        ? 'Todos los Marcadores'
        : MOOD_COLORS.find(m => m.id === selectedMood)?.name || 'Todos los Marcadores';

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            <div className="mb-6 relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4 flex items-center gap-2" data-testid="bookmarks-view-title">
                    <BookmarkIcon size={28} />
                    {moodName} ({filteredBookmarks.length})
                </h2>

                {totalPages > 1 && (
                    <ChapterCarousel
                        darkMode={darkMode}
                        totalChapters={totalPages}
                        selectedChapter={currentPage}
                        onChapterSelect={setCurrentPage}
                    />
                )}
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 sm:p-6 md:p-8 shadow-lg min-h-[50vh]`}>
                {currentBookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <BookmarkIcon size={48} className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-amber-200'}`} />
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No tienes marcadores guardados en esta categoría.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentBookmarks.map((bookmark) => {
                            const mood = bookmark.moodId ? MOOD_COLORS.find(m => m.id === bookmark.moodId) : null;

                            return (
                                <div
                                    key={bookmark.id}
                                    className={`
                    group relative rounded-lg p-4 transition-all duration-200 
                    ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-amber-50/50 hover:bg-amber-50'}
                    ${mood ? (darkMode ? `border-l-4 ${mood.borderDark} ${mood.bgDark}` : `border-l-4 ${mood.borderLight} ${mood.bgLight}`) : 'border-l-4 border-transparent'}
                  `}
                                >
                                    <div className="flex items-start justify-between pr-8">
                                        <button
                                            onClick={() => onGoToBookmark(bookmark.book, bookmark.chapter, bookmark.verse)}
                                            className="flex-1 text-left text-base sm:text-lg"
                                        >
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h4 className="font-bold text-amber-600 dark:text-amber-400">
                                                    {bookmark.bookName} {bookmark.chapter}{bookmark.verse ? `:${bookmark.verse}` : ''}
                                                </h4>
                                                {mood && (
                                                    <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border ${darkMode ? mood.borderDark : mood.borderLight}`}>
                                                        {mood.name}
                                                    </span>
                                                )}
                                            </div>

                                            {bookmark.verseText && (
                                                <p className={`italic mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                                    "{bookmark.verseText}"
                                                </p>
                                            )}

                                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                Guardado el: {bookmark.timestamp}
                                            </p>
                                        </button>

                                        <button
                                            onClick={() => onRemoveBookmark(bookmark.id)}
                                            className={`
                        absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                        ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' : 'text-gray-400 hover:text-red-500 hover:bg-white'}
                      `}
                                            title="Eliminar marcador"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
