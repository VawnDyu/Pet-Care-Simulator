import { useState, useEffect, useCallback } from "react";

export function useCurrency() {
  const [coins, setCoins] = useState(0);
  const [recentEarning, setRecentEarning] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load coins from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("coins");
    if (saved) {
      setCoins(parseInt(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save coins to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("coins", coins.toString());
      console.log("💾 Saved coins:", coins);
    }
  }, [coins, isLoaded]);

  const earnCoins = useCallback((amount, reason) => {
    console.log(`💰 Earning ${amount} coins from ${reason}`);
    setCoins((prev) => prev + amount);
    setRecentEarning({ amount, reason });

    // Hide earning notification after 2 seconds
    setTimeout(() => setRecentEarning(null), 2000);
  }, []);

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
    earnCoins,
    spendCoins,
    recentEarning,
  };
}