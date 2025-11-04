import { useState, useEffect, useRef } from "react";
import { ACTION_REWARDS } from "../constants/gameConfig";

export function useSickness(happiness, hunger, energy, trackAction, earnCoins, setShowSickOverlay) {
  const [isSick, setIsSick] = useState(false);
  const sickTimerRef = useRef(null);

  // Check if pet should get sick
  useEffect(() => {
    if (isSick) return;

    if (happiness === 0 || hunger === 0 || energy === 0) {
      if (!sickTimerRef.current) {
        sickTimerRef.current = setTimeout(() => {
          setIsSick(true);
          setShowSickOverlay(true);
          sickTimerRef.current = null;
        }, 10000);
      }
    } else {
      if (sickTimerRef.current) {
        clearTimeout(sickTimerRef.current);
        sickTimerRef.current = null;
      }
    }

    return () => {
      if (sickTimerRef.current) {
        clearTimeout(sickTimerRef.current);
        sickTimerRef.current = null;
      }
    };
  }, [happiness, hunger, energy, isSick, setShowSickOverlay]);

  // Check for recovery
  useEffect(() => {
    if (isSick && happiness > 30 && hunger > 30 && energy > 30) {
      setIsSick(false);
      trackAction("recover");
      earnCoins(ACTION_REWARDS.RECOVER, "Recovery");
    }
  }, [isSick, happiness, hunger, energy, trackAction, earnCoins]);

  return { isSick, setIsSick };
}