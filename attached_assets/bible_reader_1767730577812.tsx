import React, { useState, useEffect } from 'react';
import { Book, Bookmark, Search, Menu, X, ChevronRight, Sun, Moon, Share2, Facebook, Twitter, MessageCircle, Link2, Check, ChevronDown, Play, BookmarkPlus, Pause } from 'lucide-react';

const BibleReader = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // true por defecto en desktop
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState('Antiguo Testamento');
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [hoveredVerse, setHoveredVerse] = useState(null);
  const [verseMenuOpen, setVerseMenuOpen] = useState(null);
  const [verseShareMenuOpen, setVerseShareMenuOpen] = useState(false);
  const [playingVerse, setPlayingVerse] = useState(null);
  const [verseMenuPosition, setVerseMenuPosition] = useState({});
  const [chapterScrollPosition, setChapterScrollPosition] = useState(0);

  // Estructura de libros de la Biblia
  const bibleStructure = {
    'Antiguo Testamento': {
      'Pentateuco': [
        { id: 'genesis', name: 'Génesis', chapters: 50 },
        { id: 'exodo', name: 'Éxodo', chapters: 40 },
        { id: 'levitico', name: 'Levítico', chapters: 27 },
        { id: 'numeros', name: 'Números', chapters: 36 },
        { id: 'deuteronomio', name: 'Deuteronomio', chapters: 34 }
      ],
      'Históricos': [
        { id: 'josue', name: 'Josué', chapters: 24 },
        { id: 'jueces', name: 'Jueces', chapters: 21 },
        { id: 'rut', name: 'Rut', chapters: 4 },
        { id: '1samuel', name: '1 Samuel', chapters: 31 },
        { id: '2samuel', name: '2 Samuel', chapters: 24 }
      ],
      'Poéticos': [
        { id: 'job', name: 'Job', chapters: 42 },
        { id: 'salmos', name: 'Salmos', chapters: 150 },
        { id: 'proverbios', name: 'Proverbios', chapters: 31 },
        { id: 'eclesiastes', name: 'Eclesiastés', chapters: 12 },
        { id: 'cantares', name: 'Cantares', chapters: 8 }
      ],
      'Profetas Mayores': [
        { id: 'isaias', name: 'Isaías', chapters: 66 },
        { id: 'jeremias', name: 'Jeremías', chapters: 52 },
        { id: 'lamentaciones', name: 'Lamentaciones', chapters: 5 },
        { id: 'ezequiel', name: 'Ezequiel', chapters: 48 },
        { id: 'daniel', name: 'Daniel', chapters: 12 }
      ]
    },
    'Nuevo Testamento': {
      'Evangelios': [
        { id: 'mateo', name: 'Mateo', chapters: 28 },
        { id: 'marcos', name: 'Marcos', chapters: 16 },
        { id: 'lucas', name: 'Lucas', chapters: 24 },
        { id: 'juan', name: 'Juan', chapters: 21 }
      ],
      'Históricos': [
        { id: 'hechos', name: 'Hechos', chapters: 28 }
      ],
      'Cartas Paulinas': [
        { id: 'romanos', name: 'Romanos', chapters: 16 },
        { id: '1corintios', name: '1 Corintios', chapters: 16 },
        { id: '2corintios', name: '2 Corintios', chapters: 13 },
        { id: 'galatas', name: 'Gálatas', chapters: 6 },
        { id: 'efesios', name: 'Efesios', chapters: 6 },
        { id: 'filipenses', name: 'Filipenses', chapters: 4 },
        { id: 'colosenses', name: 'Colosenses', chapters: 4 }
      ],
      'Cartas Generales': [
        { id: 'hebreos', name: 'Hebreos', chapters: 13 },
        { id: 'santiago', name: 'Santiago', chapters: 5 },
        { id: '1pedro', name: '1 Pedro', chapters: 5 },
        { id: '2pedro', name: '2 Pedro', chapters: 3 },
        { id: '1juan', name: '1 Juan', chapters: 5 },
        { id: 'apocalipsis', name: 'Apocalipsis', chapters: 22 }
      ]
    }
  };

  // Contenido de ejemplo
  const bibleContent = {
    genesis: {
      1: [
        "En el principio creó Dios los cielos y la tierra.",
        "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.",
        "Y dijo Dios: Sea la luz; y fue la luz.",
        "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.",
        "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.",
        "Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.",
        "E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así.",
        "Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo."
      ]
    }
  };

  const addBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      book: selectedBook,
      chapter: selectedChapter,
      bookName: getBibleBook(selectedBook)?.name || selectedBook,
      timestamp: new Date().toLocaleString()
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  const addVerseBookmark = (verseIndex) => {
    const verseNumber = verseIndex + 1;
    const verseText = displayContent[verseIndex];
    
    // Verificar si ya existe
    const existingBookmark = bookmarks.find(
      b => b.book === selectedBook && 
           b.chapter === selectedChapter && 
           b.verse === verseNumber
    );
    
    if (existingBookmark) {
      // Si existe, eliminarlo (desmarcar)
      setBookmarks(bookmarks.filter(b => b.id !== existingBookmark.id));
    } else {
      // Si no existe, agregarlo
      const newBookmark = {
        id: Date.now(),
        book: selectedBook,
        chapter: selectedChapter,
        verse: verseNumber,
        verseText: verseText.substring(0, 100) + '...',
        bookName: getBibleBook(selectedBook)?.name || selectedBook,
        timestamp: new Date().toLocaleString()
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const goToBookmark = (book, chapter) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setShowBookmarks(false);
  };

  const playVerseAudio = (verseIndex) => {
    const verseNumber = verseIndex + 1;
    
    if (playingVerse === verseIndex) {
      setPlayingVerse(null);
      console.log(`Pausar audio: ${currentBook?.name} ${selectedChapter}:${verseNumber}`);
    } else {
      setPlayingVerse(verseIndex);
      console.log(`Reproducir audio: ${currentBook?.name} ${selectedChapter}:${verseNumber}`);
      
      setTimeout(() => {
        setPlayingVerse(null);
      }, 5000);
    }
  };

  const isVerseBookmarked = (verseIndex) => {
    const verseNumber = verseIndex + 1;
    return bookmarks.some(
      b => b.book === selectedBook && 
           b.chapter === selectedChapter && 
           b.verse === verseNumber
    );
  };

  const getBibleBook = (bookId) => {
    for (const testament in bibleStructure) {
      for (const category in bibleStructure[testament]) {
        const book = bibleStructure[testament][category].find(b => b.id === bookId);
        if (book) return book;
      }
    }
    return null;
  };

  const currentBook = getBibleBook(selectedBook);
  const currentContent = bibleContent[selectedBook]?.[selectedChapter] || [];
  
  const isContentArray = Array.isArray(currentContent);
  const displayContent = isContentArray ? currentContent : 
    [`[Aquí se mostrará el contenido de ${currentBook?.name} capítulo ${selectedChapter}.]`];

  const getShareUrl = () => {
    return window.location.href;
  };

  const getShareText = () => {
    if (selectedVerse !== null && isContentArray) {
      const verseText = displayContent[selectedVerse - 1];
      return `"${verseText}" - ${currentBook?.name} ${selectedChapter}:${selectedVerse}`;
    }
    const preview = isContentArray 
      ? displayContent.slice(0, 3).join(' ').substring(0, 200) + '...'
      : displayContent[0]?.substring(0, 200) + '...';
    return `${currentBook?.name} ${selectedChapter} - ${preview}`;
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    const quote = encodeURIComponent(getShareText());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
    setVerseShareMenuOpen(false);
    setSelectedVerse(null);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
    setVerseShareMenuOpen(false);
    setSelectedVerse(null);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShareMenu(false);
    setVerseShareMenuOpen(false);
    setSelectedVerse(null);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
        setShowShareMenu(false);
        setVerseShareMenuOpen(false);
        setSelectedVerse(null);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleVerseClick = (verseIndex, event) => {
    if (verseMenuOpen === verseIndex) {
      setVerseMenuOpen(null);
      setVerseShareMenuOpen(false);
    } else {
      // Obtener posición del elemento clickeado
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const spaceAbove = rect.top;
      
      // Si hay menos de 200px arriba, abrir hacia abajo
      const shouldOpenBelow = spaceAbove < 200;
      
      setVerseMenuPosition(prev => ({ ...prev, [verseIndex]: shouldOpenBelow }));
      setVerseMenuOpen(verseIndex);
      setVerseShareMenuOpen(false);
      setSelectedVerse(verseIndex + 1);
    }
  };

  const handleShareClick = () => {
    setVerseShareMenuOpen(!verseShareMenuOpen);
  };

  const scrollChapters = (direction) => {
    const carousel = document.querySelector('.chapters-carousel-desktop');
    if (carousel) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, chapterScrollPosition - scrollAmount)
        : chapterScrollPosition + scrollAmount;
      
      carousel.scrollTo({ left: newPosition, behavior: 'smooth' });
      setChapterScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu-container')) {
        setShowShareMenu(false);
        setSelectedVerse(null);
      }
      if (showBookmarks && !event.target.closest('.bookmarks-panel') && !event.target.closest('[data-bookmark-button]')) {
        setShowBookmarks(false);
      }
      if (verseMenuOpen !== null && !event.target.closest('.verse-menu') && !event.target.closest('.verse-text')) {
        setVerseMenuOpen(null);
        setVerseShareMenuOpen(false);
      }
      if (sidebarOpen && window.innerWidth < 768 && !event.target.closest('aside') && !event.target.closest('[data-sidebar-toggle]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu, showBookmarks, sidebarOpen, verseMenuOpen]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      const carousel = document.querySelector('.chapters-carousel');
      const selectedButton = document.querySelector('.chapter-selected');
      if (carousel && selectedButton) {
        const scrollLeft = selectedButton.offsetLeft - (carousel.clientWidth / 2) + (selectedButton.clientWidth / 2);
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

      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'} border-b shadow-lg`}>
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'} md:hidden`}
              data-sidebar-toggle
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Book className="text-amber-500" size={24} />
            <h1 className="text-lg sm:text-2xl font-bold">Santa Biblia</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'} relative`}
              data-bookmark-button
            >
              <Bookmark size={20} />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex overflow-x-hidden relative">
        {/* Overlay solo en móvil */}
        {sidebarOpen && window.innerWidth < 768 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} ${sidebarOpen ? 'fixed md:sticky' : ''} inset-y-0 left-0 md:relative transition-all duration-300 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'} border-r h-screen md:h-[calc(100vh-73px)] top-0 md:top-[73px] z-40`}>
          <div className="h-full w-80 overflow-y-auto scrollbar-hide">
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-amber-500">Índice</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Selector en móvil */}
              <div className="mb-4">
                <select
                  value={selectedTestament}
                  onChange={(e) => setSelectedTestament(e.target.value)}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-amber-50 border-amber-300'} border focus:outline-none focus:ring-2 focus:ring-amber-500`}
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
                            onClick={() => {
                              setSelectedBook(book.id);
                              setSelectedChapter(1);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                              selectedBook === book.id
                                ? 'bg-amber-500 text-white'
                                : darkMode
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-amber-100'
                            }`}
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
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
          <div className="mb-6 relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-4">
              {currentBook?.name} - Capítulo {selectedChapter}
            </h2>
            
            <div className="mb-4 relative">
              {/* Carrusel móvil */}
              <div className={`md:hidden w-full relative ${darkMode ? 'carousel-gradient-dark' : 'carousel-gradient-light'}`}>
                <div className="overflow-x-auto scrollbar-hide chapters-carousel">
                  <div className="flex gap-2 pb-2 px-1" style={{ scrollSnapType: 'x mandatory' }}>
                    {currentBook && Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(chapter => (
                      <button
                        key={chapter}
                        onClick={() => setSelectedChapter(chapter)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                          selectedChapter === chapter
                            ? 'bg-amber-500 text-white chapter-selected'
                            : darkMode
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-white hover:bg-amber-100 border border-amber-200'
                        }`}
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        {chapter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Carrusel escritorio con flechas */}
              <div className="hidden md:block w-full relative">
                {/* Flecha izquierda */}
                <button
                  onClick={() => scrollChapters('left')}
                  className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'} shadow-lg`}
                >
                  <ChevronRight size={20} className="rotate-180 text-amber-500" />
                </button>
                
                <div className={`relative ${darkMode ? 'carousel-gradient-dark' : 'carousel-gradient-light'}`}>
                  <div className="overflow-x-auto scrollbar-hide chapters-carousel-desktop px-12">
                    <div className="flex gap-2 pb-2">
                      {currentBook && Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(chapter => (
                        <button
                          key={chapter}
                          onClick={() => setSelectedChapter(chapter)}
                          className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors text-base ${
                            selectedChapter === chapter
                              ? 'bg-amber-500 text-white'
                              : darkMode
                              ? 'bg-gray-800 hover:bg-gray-700'
                              : 'bg-white hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Flecha derecha */}
                <button
                  onClick={() => scrollChapters('right')}
                  className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'} shadow-lg`}
                >
                  <ChevronRight size={20} className="text-amber-500" />
                </button>
              </div>
            </div>

            <button
              onClick={addBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'}`}
            >
              <Bookmark size={18} />
              Guardar marcador
            </button>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 sm:p-6 md:p-8 shadow-lg`}>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none" style={{ 
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
              fontSize: window.innerWidth >= 768 ? '1.125rem' : '1rem'
            }}>
              {displayContent.map((verse, idx) => (
                <div key={idx} className="relative">
                  <p 
                    className={`verse-text mb-3 sm:mb-4 transition-all cursor-pointer relative ${
                      verseMenuOpen === idx ? (darkMode ? 'bg-gray-700' : 'bg-amber-50') : hoveredVerse === idx ? (darkMode ? 'bg-gray-700' : 'bg-amber-50') : ''
                    } rounded px-2 py-1 text-base md:text-lg`}
                    onMouseEnter={() => setHoveredVerse(idx)}
                    onMouseLeave={() => setHoveredVerse(null)}
                    onClick={(e) => handleVerseClick(idx, e)}
                  >
                    <span className="font-bold text-amber-500 mr-2 select-none">{idx + 1}</span>
                    {verse}
                  </p>
                  
                  {verseMenuOpen === idx && (
                    <div className={`verse-menu absolute left-1/2 -translate-x-1/2 ${
                      verseMenuPosition[idx] ? 'top-full mt-2' : '-top-14'
                    } ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-2 z-20 flex gap-1`}>
                      <button
                        onClick={() => addVerseBookmark(idx)}
                        className={`p-3 rounded-full ${
                          isVerseBookmarked(idx) 
                            ? 'bg-amber-500 hover:bg-amber-600' 
                            : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'
                        } transition-colors`}
                        title="Guardar versículo"
                      >
                        {isVerseBookmarked(idx) ? (
                          <Bookmark size={20} className="text-white fill-white" />
                        ) : (
                          <BookmarkPlus size={20} className="text-amber-500" />
                        )}
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={handleShareClick}
                          className={`p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                          title="Compartir versículo"
                        >
                          <Share2 size={20} className="text-amber-500" />
                        </button>
                        
                        {verseShareMenuOpen && (
                          <div className={`absolute ${
                            verseMenuPosition[idx] ? 'top-full mt-2' : 'bottom-full mb-2'
                          } left-1/2 -translate-x-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-3 w-48`}>
                            <p className="text-xs text-amber-500 font-semibold mb-2">
                              {currentBook?.name} {selectedChapter}:{idx + 1}
                            </p>
                            <p className="text-xs font-semibold mb-2">Compartir en:</p>
                            <div className="space-y-1">
                              <button
                                onClick={shareOnFacebook}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors text-sm`}
                              >
                                <Facebook size={18} className="text-blue-600" />
                                <span>Facebook</span>
                              </button>
                              <button
                                onClick={shareOnTwitter}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors text-sm`}
                              >
                                <Twitter size={18} className="text-sky-500" />
                                <span>Twitter</span>
                              </button>
                              <button
                                onClick={shareOnWhatsApp}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors text-sm`}
                              >
                                <MessageCircle size={18} className="text-green-500" />
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={copyLink}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors text-sm`}
                              >
                                {copySuccess ? (
                                  <>
                                    <Check size={18} className="text-green-500" />
                                    <span className="text-green-500 text-xs">¡Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Link2 size={18} className="text-gray-500" />
                                    <span>Copiar</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => playVerseAudio(idx)}
                        className={`p-3 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                        title={playingVerse === idx ? "Pausar audio" : "Reproducir audio"}
                      >
                        {playingVerse === idx ? (
                          <Pause size={20} className="text-amber-500" />
                        ) : (
                          <Play size={20} className="text-amber-500" />
                        )}
                      </button>
                      
                      {/* Flecha del globo - cambia según posición */}
                      <div className={`absolute left-1/2 -translate-x-1/2 ${
                        verseMenuPosition[idx] ? 'top-0 -translate-y-full rotate-180' : 'top-full'
                      } w-0 h-0 border-l-8 border-r-8 border-t-8 ${darkMode ? 'border-t-gray-800' : 'border-t-white'} border-l-transparent border-r-transparent`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 mt-6 sm:mt-8 relative">
            <button
              onClick={() => selectedChapter > 1 && setSelectedChapter(selectedChapter - 1)}
              disabled={selectedChapter === 1}
              className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
                selectedChapter === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <ChevronRight size={20} className="rotate-180" />
              <span className="hidden sm:inline">Capítulo anterior</span>
            </button>

            <div className="relative share-menu-container">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-amber-100 border border-amber-200'}`}
              >
                <Share2 size={20} />
                <span className="hidden sm:inline">Compartir</span>
              </button>

              {showShareMenu && (
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-amber-200'} p-4 z-10 w-56`}>
                  {selectedVerse && (
                    <p className="text-xs text-amber-500 font-semibold mb-2">
                      Compartir {currentBook?.name} {selectedChapter}:{selectedVerse}
                    </p>
                  )}
                  <p className="text-sm font-semibold mb-3">Compartir en:</p>
                  <div className="space-y-2">
                    <button
                      onClick={shareOnFacebook}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                    >
                      <Facebook size={20} className="text-blue-600" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                    >
                      <Twitter size={20} className="text-sky-500" />
                      <span>Twitter / X</span>
                    </button>
                    <button
                      onClick={shareOnWhatsApp}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                    >
                      <MessageCircle size={20} className="text-green-500" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={copyLink}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'} transition-colors`}
                    >
                      {copySuccess ? (
                        <>
                          <Check size={20} className="text-green-500" />
                          <span className="text-green-500">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Link2 size={20} className="text-gray-500" />
                          <span>Copiar texto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => currentBook && selectedChapter < currentBook.chapters && setSelectedChapter(selectedChapter + 1)}
              disabled={!currentBook || selectedChapter === currentBook.chapters}
              className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
                !currentBook || selectedChapter === currentBook.chapters
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="hidden sm:inline">Capítulo siguiente</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </main>
      </div>

      {showBookmarks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowBookmarks(false)}>
          <div
            className={`bookmarks-panel ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-amber-500">Mis Marcadores</h3>
            {bookmarks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tienes marcadores guardados</p>
            ) : (
              <div className="space-y-3">
                {bookmarks.map(bookmark => (
                  <div
                    key={bookmark.id}
                    className={`${darkMode ? 'bg-gray-700' : 'bg-amber-50'} rounded-lg p-4`}
                  >
                    <div className="flex items-start justify-between">
                      <button
                        onClick={() => goToBookmark(bookmark.book, bookmark.chapter)}
                        className="flex-1 text-left"
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
                        onClick={() => removeBookmark(bookmark.id)}
                        className="text-red-500 hover:text-red-600 ml-2"
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
      )}
    </div>
  );
};

export default BibleReader;