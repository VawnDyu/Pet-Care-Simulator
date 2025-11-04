import { useEffect, useRef } from "react";
import { getAssetPath } from "../utils/getAssetPath";
import { THEME_MUSIC } from "../constants/gameConfig";

export function useBackgroundMusic(currentTheme, isMuted, hasStarted) {
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = THEME_MUSIC.volume;
    }

    const audio = audioRef.current;
    const musicSrc = getAssetPath(THEME_MUSIC[currentTheme] || THEME_MUSIC.default);

    if (audio.src !== musicSrc && musicSrc) {
      audio.src = musicSrc;

      // Try to play if game has started and not muted
      if (hasStarted && !isMuted) {
        audio.play().catch(() => {});
      }
    }
  }, [currentTheme, isMuted, hasStarted]);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current && hasStarted) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, hasStarted]);

  // Start music on first interaction (fallback if Start button didn't work)
  useEffect(() => {
    if (!hasStarted) return;

    const startMusicOnInteraction = () => {
      if (!isMuted && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    const events = ['click', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, startMusicOnInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startMusicOnInteraction);
      });
    };
  }, [isMuted, hasStarted]);

  return null;
}