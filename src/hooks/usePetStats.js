import { useState, useEffect } from "react";
import { PET_STAT_DECAY } from "../constants/gameConfig";

export function usePetStats() {
  const [happiness, setHappiness] = useState(80);
  const [hunger, setHunger] = useState(80);
  const [energy, setEnergy] = useState(80);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto decrease stats
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness((prev) => Math.max(prev - PET_STAT_DECAY.HAPPINESS, 0));
      setHunger((prev) => Math.max(prev - PET_STAT_DECAY.HUNGER, 0));
      setEnergy((prev) => Math.max(prev - PET_STAT_DECAY.ENERGY, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save stats
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "petStats",
        JSON.stringify({ happiness, hunger, energy })
      );
    }
  }, [happiness, hunger, energy, isLoaded]);

  // Load saved stats on start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petStats"));
    if (saved) {
      setHappiness(saved.happiness);
      setHunger(saved.hunger);
      setEnergy(saved.energy);
    }
    setIsLoaded(true);
  }, []);

  return {
    happiness,
    hunger,
    energy,
    isLoaded,
    setHappiness,
    setHunger,
    setEnergy,
  };
}