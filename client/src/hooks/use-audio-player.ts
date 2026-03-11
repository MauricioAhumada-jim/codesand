import { useState, useRef, useCallback, useEffect } from 'react';
import { getVerseAudioUrl, getNextBook, getBibleBook, getMusicAudioUrl, type VerseContent } from '@/lib/bible-data';

interface AudioPlayerState {
  isPlaying: boolean;
  currentVerseIndex: number | null;
  isChapterMode: boolean;
}

interface UseAudioPlayerProps {
  bookId: string;
  chapter: number;
  verses: VerseContent[];
  onVerseChange?: (verseIndex: number) => void;
  onBookChange?: (bookId: string, chapter: number) => void;
}

export function useAudioPlayer({
  bookId,
  chapter,
  verses,
  onVerseChange,
  onBookChange
}: UseAudioPlayerProps) {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentVerseIndex: null,
    isChapterMode: false
  });

  const [isMusicEnabled, setIsMusicEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bible-music-enabled');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [musicVolume, setMusicVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bible-music-volume');
      return saved ? parseFloat(saved) : 0.3;
    }
    return 0.3;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentBookRef = useRef(bookId);
  const currentChapterRef = useRef(chapter);

  currentBookRef.current = bookId;
  currentChapterRef.current = chapter;

  useEffect(() => {
    localStorage.setItem('bible-music-enabled', JSON.stringify(isMusicEnabled));
    if (isMusicEnabled && state.isPlaying && backgroundAudioRef.current) {
      backgroundAudioRef.current.play().catch(console.error);
    } else if (!isMusicEnabled && backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
  }, [isMusicEnabled, state.isPlaying]);

  useEffect(() => {
    localStorage.setItem('bible-music-volume', musicVolume.toString());
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !backgroundAudioRef.current) {
      const audio = new Audio(getMusicAudioUrl());
      audio.loop = true;
      audio.volume = musicVolume;
      backgroundAudioRef.current = audio;
    }
  }, [musicVolume]);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
    setState({
      isPlaying: false,
      currentVerseIndex: null,
      isChapterMode: false
    });
  }, []);

  const playVerseAtIndex = useCallback((verseIndex: number, isChapterMode: boolean) => {
    const verseNumber = verseIndex + 1;
    const audioUrl = getVerseAudioUrl(bookId, chapter, verseNumber);

    if (!audioUrl) {
      if (isChapterMode && verseIndex + 1 < verses.length) {
        playVerseAtIndex(verseIndex + 1, true);
      } else {
        stopPlayback();
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.error);
    }

    setState({
      isPlaying: true,
      currentVerseIndex: verseIndex,
      isChapterMode
    });

    onVerseChange?.(verseIndex);
  }, [verses, onVerseChange, stopPlayback, bookId, chapter]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleEnded = () => {
      setState(prevState => {
        if (prevState.isChapterMode && prevState.currentVerseIndex !== null) {
          const nextVerseIndex = prevState.currentVerseIndex + 1;

          if (nextVerseIndex < verses.length) {
            const nextVerseNumber = nextVerseIndex + 1;
            const nextAudioUrl = getVerseAudioUrl(currentBookRef.current, currentChapterRef.current, nextVerseNumber);

            if (nextAudioUrl && audioRef.current) {
              audioRef.current.src = nextAudioUrl;
              audioRef.current.play().catch(console.error);
              onVerseChange?.(nextVerseIndex);
              return {
                isPlaying: true,
                currentVerseIndex: nextVerseIndex,
                isChapterMode: true
              };
            }
          }

          const nextChapter = currentChapterRef.current + 1;
          const currentBook = getBibleBook(currentBookRef.current);

          if (currentBook && nextChapter <= currentBook.chapters) {
            onBookChange?.(currentBookRef.current, nextChapter);
            return prevState;
          }

          const nextBook = getNextBook(currentBookRef.current);
          if (nextBook) {
            onBookChange?.(nextBook.id, 1);
            return prevState;
          }
        }

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return {
          isPlaying: false,
          currentVerseIndex: null,
          isChapterMode: false
        };
      });
    };

    const handleError = () => {
      console.error('Error loading audio');
      setState(prevState => {
        if (prevState.isChapterMode && prevState.currentVerseIndex !== null) {
          const nextVerseIndex = prevState.currentVerseIndex + 1;
          if (nextVerseIndex < verses.length) {
            const nextVerseNumber = nextVerseIndex + 1;
            const nextAudioUrl = getVerseAudioUrl(currentBookRef.current, currentChapterRef.current, nextVerseNumber);

            if (nextAudioUrl && audioRef.current) {
              audioRef.current.src = nextAudioUrl;
              audioRef.current.play().catch(console.error);
              onVerseChange?.(nextVerseIndex);
              return {
                isPlaying: true,
                currentVerseIndex: nextVerseIndex,
                isChapterMode: true
              };
            }
          }
        }

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return {
          isPlaying: false,
          currentVerseIndex: null,
          isChapterMode: false
        };
      });
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [verses, onBookChange, onVerseChange]);

  const playSingleVerse = useCallback((verseIndex: number) => {
    playVerseAtIndex(verseIndex, false);
  }, [playVerseAtIndex]);

  const playChapterFromVerse = useCallback((startVerseIndex: number) => {
    playVerseAtIndex(startVerseIndex, true);
  }, [playVerseAtIndex]);

  const togglePlayback = useCallback(() => {
    if (state.isPlaying && audioRef.current) {
      audioRef.current.pause();
      if (backgroundAudioRef.current) backgroundAudioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    } else if (audioRef.current && state.currentVerseIndex !== null) {
      audioRef.current.play().catch(console.error);
      if (isMusicEnabled && backgroundAudioRef.current) backgroundAudioRef.current.play().catch(console.error);
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isPlaying, state.currentVerseIndex, isMusicEnabled]);

  const prevParamsRef = useRef({ bookId, chapter });

  useEffect(() => {
    const prev = prevParamsRef.current;
    if (bookId !== prev.bookId || chapter !== prev.chapter) {
      if (state.isPlaying && state.isChapterMode) {
        playVerseAtIndex(0, true);
      }
      prevParamsRef.current = { bookId, chapter };
    }
  }, [bookId, chapter, state.isPlaying, state.isChapterMode, playVerseAtIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current = null;
      }
    };
  }, []);

  const toggleMusicEnabled = useCallback(() => {
    setIsMusicEnabled((prev: boolean) => !prev);
  }, []);

  return {
    isPlaying: state.isPlaying,
    currentVerseIndex: state.currentVerseIndex,
    isChapterMode: state.isChapterMode,
    isMusicEnabled,
    musicVolume,
    playSingleVerse,
    playChapterFromVerse,
    stopPlayback,
    togglePlayback,
    toggleMusicEnabled,
    setMusicVolume
  };
}
