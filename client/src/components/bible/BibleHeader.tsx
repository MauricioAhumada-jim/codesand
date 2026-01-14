import { Book, Bookmark, Sun, Moon, Menu, X } from 'lucide-react';

interface BibleHeaderProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  bookmarksCount: number;
  onToggleSidebar: () => void;
  onToggleBookmarks: () => void;
  onToggleDarkMode: () => void;
}

export function BibleHeader({
  darkMode,
  sidebarOpen,
  bookmarksCount,
  onToggleSidebar,
  onToggleBookmarks,
  onToggleDarkMode
}: BibleHeaderProps) {
  return (
    <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'} border-b shadow-lg`}>
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            data-sidebar-toggle
            data-testid="button-sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Book className="text-amber-500" size={24} />
          <h1 className="text-lg sm:text-2xl font-bold">Santa Biblia</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleBookmarks}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'} relative`}
            data-bookmark-button
            data-testid="button-bookmarks"
          >
            <Bookmark size={20} />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            data-testid="button-theme-toggle"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
