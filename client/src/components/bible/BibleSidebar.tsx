import { Search, X, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { bibleStructure } from '@/lib/bible-data';

interface BibleSidebarProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  searchTerm: string;
  selectedTestament: string;
  selectedBook: string;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onTestamentChange: (value: string) => void;
  onBookSelect: (bookId: string) => void;
}

export function BibleSidebar({
  darkMode,
  sidebarOpen,
  searchTerm,
  selectedTestament,
  selectedBook,
  onClose,
  onSearchChange,
  onTestamentChange,
  onBookSelect
}: BibleSidebarProps) {
  return (
    <aside 
      className={`${sidebarOpen ? 'w-80' : 'w-0'} fixed lg:relative inset-y-0 left-0 transition-all duration-300 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'} border-r h-screen lg:h-auto top-0 z-40`}
      data-testid="sidebar"
    >
      <div className="h-full w-80 overflow-y-auto lg:overflow-visible scrollbar-hide pt-16 lg:pt-0">
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-amber-200'}`}>
          <h2 className="text-lg font-bold text-amber-500">Índice</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            data-testid="button-close-sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <select
              value={selectedTestament}
              onChange={(e) => onTestamentChange(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg font-semibold text-lg ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-amber-500' 
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              } border focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
              data-testid="select-testament"
            >
              <option value="Antiguo Testamento">Antiguo Testamento</option>
              <option value="Nuevo Testamento">Nuevo Testamento</option>
            </select>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar libro..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-amber-50 border-amber-300'} border focus:outline-none focus:ring-2 focus:ring-amber-500`}
                data-testid="input-search-book"
              />
            </div>
          </div>

          {Object.entries(bibleStructure)
            .filter(([testament]) => testament === selectedTestament)
            .map(([testament, categories]) => (
            <div key={testament}>
              {Object.entries(categories).map(([category, books]) => (
                <div key={category} className="mb-4">
                  <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {category}
                  </h3>
                  {books
                    .filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(book => (
                      <button
                        key={book.id}
                        onClick={() => onBookSelect(book.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                          selectedBook === book.id
                            ? 'bg-amber-500 text-white'
                            : darkMode
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-amber-100'
                        }`}
                        data-testid={`button-book-${book.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{book.name}</span>
                          <span className={`text-xs ${selectedBook === book.id ? 'text-amber-100' : 'text-gray-500'}`}>
                            {book.chapters} cap.
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={`p-4 mt-auto border-t ${darkMode ? 'border-gray-700' : 'border-amber-200'}`}>
          <div className="text-center space-y-2">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-foreground transition-colors block" data-testid="link-terms">
              Términos y Condiciones
            </Link>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              Hecho con <Heart size={14} className="text-red-500 fill-red-500" /> por{' '}
              <a 
                href="https://estampalos.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-600 transition-colors"
                data-testid="link-estampalos"
              >
                Estampalos
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
