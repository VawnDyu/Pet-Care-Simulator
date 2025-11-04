import { useState, useEffect, useCallback } from "react";

export function useCurrency(trackCoins) {
  const [coins, setCoins] = useState(0);
  const [recentEarning, setRecentEarning] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load coins from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("coins");
    if (saved) {
      const loadedCoins = parseInt(saved);
      setCoins(loadedCoins);

      // Track initial coins after loading
      if (trackCoins) {
        trackCoins(0, loadedCoins);
      }
    }
    setIsLoaded(true);
  }, [trackCoins]);

  // Save coins to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("coins", coins.toString());
      console.log("💾 Saved coins:", coins);
    }
  }, [coins, isLoaded]);

  const earnCoins = useCallback((amount, reason) => {
    console.log(`💰 Earning ${amount} coins from ${reason}`);
    setCoins((prev) => {
      const newTotal = prev + amount;

      // Track earned coins
      if (trackCoins) {
        trackCoins(amount, newTotal);
      }

      return newTotal;
    });
    setRecentEarning({ amount, reason });

    // Hide earning notification after 2 seconds
    setTimeout(() => setRecentEarning(null), 2000);
  }, [trackCoins]);

  const spendCoins = useCallback((amount) => {
    if (coins >= amount) {
      console.log(`💸 Spending ${amount} coins`);
      setCoins((prev) => prev - amount);
      return true;
    }
    console.log(`❌ Not enough coins! Need ${amount}, have ${coins}`);
    return false;
  }, [coins]);

  return {
    coins,
    setCoins,
    earnCoins,
    spendCoins,
    recentEarning,
  };
}