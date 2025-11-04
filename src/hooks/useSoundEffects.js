import { useRef, useEffect, useCallback } from "react";
import { getAssetPath } from "../utils/getAssetPath";
import { SOUND_EFFECTS as SFX } from "../constants/gameConfig";

export function useSoundEffects(isMuted) {
  const soundsRef = useRef({});
  const {PET: PET_SFX, UI: UI_SFX } = SFX;

  useEffect(() => {
    soundsRef.current = {
      openModal: new Audio(getAssetPath(UI_SFX.OPEN_MODAL.src)),
      closeModal: new Audio(getAssetPath(UI_SFX.CLOSE_MODAL.src)),
      purchase: new Audio(getAssetPath(UI_SFX.PURCHASE.src)),
      achievement: new Audio(getAssetPath(UI_SFX.ACHIEVEMENT.src)),
      coin: new Audio(getAssetPath(UI_SFX.COIN.src)),
      medicine: new Audio(getAssetPath(PET_SFX.MEDICINE.src)),
      feed: new Audio(getAssetPath(PET_SFX.FEED.src)),
    };

    Object.values(soundsRef.current).forEach((audio) => {
      audio.volume = SFX.VOLUME;
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