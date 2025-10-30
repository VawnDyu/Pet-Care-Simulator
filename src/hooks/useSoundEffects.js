import { useRef, useEffect, useCallback } from "react";
import { getAssetPath } from "../utils/getAssetPath";

export function useSoundEffects(isMuted) {
  const soundsRef = useRef({});

  useEffect(() => {
    soundsRef.current = {
      openModal: new Audio(getAssetPath("sounds/open.mp3")),
      closeModal: new Audio(getAssetPath("sounds/close.mp3")),
      purchase: new Audio(getAssetPath("sounds/purchase.mp3")),
      achievement: new Audio(getAssetPath("sounds/achievement.mp3")),
      coin: new Audio(getAssetPath("sounds/coin.mp3")),
    };

    Object.values(soundsRef.current).forEach((audio) => {
      audio.volume = 0.5;
    });
  }, []);

  const playSound = useCallback((soundName) => {
    if (isMuted || !soundsRef.current[soundName]) return;

    const sound = soundsRef.current[soundName];
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }, [isMuted]);

  return { playSound };
}