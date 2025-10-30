import { useEffect, useRef } from "react";
import { getAssetPath } from "../utils/getAssetPath";

const THEME_MUSIC = {
  default: "sounds/music-default.mp3",
  theme_sunset: "sounds/music-sunset.mp3",
  theme_ocean: "sounds/music-ocean.mp3",
  theme_forest: "sounds/music-forest.mp3",
};

export function useBackgroundMusic(currentTheme, isMuted) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;
    const musicSrc = getAssetPath(THEME_MUSIC[currentTheme] || THEME_MUSIC.default);

    if (audio.src !== musicSrc) {
      audio.src = musicSrc;
      if (!isMuted) {
        audio.play().catch(() => {});
      }
    }

    return () => {
      audio.pause();
    };
  }, [currentTheme]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  return null;
}