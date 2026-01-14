import { X } from 'lucide-react';
import type { Bookmark } from '@/lib/bible-data';

interface BookmarksPanelProps {
  darkMode: boolean;
  bookmarks: Bookmark[];
  onClose: () => void;
  onGoToBookmark: (book: string, chapter: number) => void;
  onRemoveBookmark: (id: number) => void;
}

export function BookmarksPanel({
  darkMode,
  bookmarks,
  onClose,
  onGoToBookmark,
  onRemoveBookmark
}: BookmarksPanelProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div
        className={`bookmarks-panel ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        data-testid="bookmarks-panel"
      >
        <h3 className="text-2xl font-bold mb-4 text-amber-500">Mis Marcadores</h3>
        {bookmarks.length === 0 ? (
          <p className="text-gray-500 text-center py-8" data-testid="text-no-bookmarks">
            No tienes marcadores guardados
          </p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className={`${darkMode ? 'bg-gray-700' : 'bg-amber-50'} rounded-lg p-4`}
                data-testid={`bookmark-${bookmark.id}`}
              >
                <div className="flex items-start justify-between">
                  <button
                    onClick={() => onGoToBookmark(bookmark.book, bookmark.chapter)}
                    className="flex-1 text-left"
                    data-testid={`button-goto-bookmark-${bookmark.id}`}
                  >
                    <p className="font-semibold">
                      {bookmark.bookName} {bookmark.chapter}
                      {bookmark.verse && `:${bookmark.verse}`}
                    </p>
                    {bookmark.verseText && (
                      <p className="text-xs text-gray-400 mt-1 italic">{bookmark.verseText}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">{bookmark.timestamp}</p>
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(bookmark.id)}
                    className="text-red-500 hover:text-red-600 ml-2"
                    data-testid={`button-remove-bookmark-${bookmark.id}`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
