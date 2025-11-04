import { useState, useEffect, useRef, useCallback } from "react";

const ACHIEVEMENTS = [
  {
    id: "first_feed",
    title: "First Meal",
    description: "Feed your pet for the first time",
    icon: "🍖",
    check: (stats) => stats.feedCount >= 1,
  },
  {
    id: "feed_master",
    title: "Master Chef",
    description: "Feed your pet 10 times",
    icon: "👨‍🍳",
    check: (stats) => stats.feedCount >= 10,
  },
  {
    id: "feed_legend",
    title: "Feeding Legend",
    description: "Feed your pet 50 times",
    icon: "🍽️",
    check: (stats) => stats.feedCount >= 50,
  },
  {
    id: "first_play",
    title: "Playtime!",
    description: "Play with your pet for the first time",
    icon: "🎮",
    check: (stats) => stats.playCount >= 1,
  },
  {
    id: "play_master",
    title: "Play Master",
    description: "Play with your pet 10 times",
    icon: "🎯",
    check: (stats) => stats.playCount >= 10,
  },
  {
    id: "first_rest",
    title: "Sweet Dreams",
    description: "Let your pet rest for the first time",
    icon: "💤",
    check: (stats) => stats.restCount >= 1,
  },
  {
    id: "perfect_stats",
    title: "Outstanding Care",
    description: "Reach 90% or higher in all stats",
    icon: "⭐",
    check: (stats) => stats.happiness >= 90 && stats.hunger >= 90 && stats.energy >= 90,
  },
  {
    id: "happy_5min",
    title: "Happy Pet",
    description: "Keep pet happy (>70%) for 5 minutes",
    icon: "😊",
    check: (stats) => stats.happyTime >= 300,
  },
  {
    id: "survivor_10min",
    title: "Pet Parent",
    description: "Keep your pet alive for 10 minutes",
    icon: "❤️",
    check: (stats) => stats.aliveTime >= 600,
  },
  {
    id: "recovered",
    title: "Doctor",
    description: "Nurse your pet back to health",
    icon: "🏥",
    check: (stats) => stats.recoveryCount >= 1,
  },
  {
    id: "close_call",
    title: "Close Call",
    description: "Let any stat drop to 0",
    icon: "😰",
    check: (stats) => stats.criticalCount >= 1,
  },
  {
    id: "balanced",
    title: "Balanced Care",
    description: "Keep all stats above 50% for 3 minutes",
    icon: "⚖️",
    check: (stats) => stats.balancedTime >= 180,
  },
  // Currency & Shop Achievements
  {
    id: "first_purchase",
    title: "First Purchase",
    description: "Buy something from the shop",
    icon: "🛒",
    check: (stats) => stats.purchaseCount >= 1,
  },
  {
    id: "big_spender",
    title: "Big Spender",
    description: "Spend 1000 coins total",
    icon: "💸",
    check: (stats) => stats.coinsSpent >= 1000,
  },
  {
    id: "coin_collector",
    title: "Coin Collector",
    description: "Earn 500 coins",
    icon: "💰",
    check: (stats) => stats.coinsEarned >= 500,
  },
  {
    id: "millionaire",
    title: "Millionaire",
    description: "Have 5000 coins at once",
    icon: "🤑",
    check: (stats) => stats.currentCoins >= 5000,
  },
  // Furniture Achievements
  {
    id: "first_furniture",
    title: "Interior Designer",
    description: "Place your first furniture",
    icon: "🪑",
    check: (stats) => stats.furniturePlaced >= 1,
  },
  {
    id: "fully_furnished",
    title: "Fully Furnished",
    description: "Place 5 furniture items",
    icon: "🏠",
    check: (stats) => stats.furniturePlaced >= 5,
  },
  {
    id: "cozy_home",
    title: "Cozy Home",
    description: "Keep furniture placed for 10 minutes",
    icon: "🛋️",
    check: (stats) => stats.furnishedTime >= 600,
  },
  // Theme Achievements
  {
    id: "theme_collector",
    title: "Theme Collector",
    description: "Unlock 3 different themes",
    icon: "🎨",
    check: (stats) => stats.themesUnlocked >= 3,
  },
  {
    id: "fashionista",
    title: "Fashionista",
    description: "Change themes 5 times",
    icon: "✨",
    check: (stats) => stats.themeChanges >= 5,
  },
  // Item Usage Achievements
  {
    id: "premium_taste",
    title: "Premium Taste",
    description: "Use premium food 5 times",
    icon: "🍕",
    check: (stats) => stats.premiumFoodUsed >= 5,
  },
  {
    id: "medicine_man",
    title: "Pharmacist",
    description: "Use medicine 3 times",
    icon: "💊",
    check: (stats) => stats.medicineUsed >= 3,
  },
  {
    id: "party_animal",
    title: "Party Animal",
    description: "Use birthday cake",
    icon: "🎂",
    check: (stats) => stats.cakeUsed >= 1,
  },
  {
    id: "energy_boost",
    title: "Energy Enthusiast",
    description: "Use energy drink 3 times",
    icon: "⚡",
    check: (stats) => stats.energyDrinkUsed >= 3,
  },
  // Dedication Achievements
  {
    id: "dedicated_owner",
    title: "Dedicated Owner",
    description: "Keep pet alive for 30 minutes",
    icon: "🏆",
    check: (stats) => stats.aliveTime >= 1800,
  },
  {
    id: "marathon",
    title: "Marathon Caretaker",
    description: "Keep pet alive for 1 hour",
    icon: "⏰",
    check: (stats) => stats.aliveTime >= 3600,
  },
  // Stat Perfection Achievements
  {
    id: "full_energy",
    title: "Fully Charged",
    description: "Reach 100% energy",
    icon: "⚡",
    check: (stats) => stats.energy >= 100,
  },
  {
    id: "never_hungry",
    title: "Well Fed",
    description: "Maintain hunger above 80% for 5 minutes",
    icon: "🍖",
    check: (stats) => stats.wellFedTime >= 300,
  },
  {
    id: "overachiever",
    title: "Overachiever",
    description: "Keep all stats at 100% simultaneously",
    icon: "💯",
    check: (stats) => stats.happiness === 100 && stats.hunger === 100 && stats.energy === 100,
  },
  // Action Combo Achievements
  {
    id: "action_hero",
    title: "Action Hero",
    description: "Perform 100 total actions",
    icon: "🦸",
    check: (stats) => (stats.feedCount + stats.playCount + stats.restCount) >= 100,
  },
  {
    id: "centurion",
    title: "Centurion",
    description: "Perform 200 total actions",
    icon: "👑",
    check: (stats) => (stats.feedCount + stats.playCount + stats.restCount) >= 200,
  },
];

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    feedCount: 0,
    playCount: 0,
    restCount: 0,
    happyTime: 0,
    aliveTime: 0,
    recoveryCount: 0,
    criticalCount: 0,
    balancedTime: 0,
    happiness: 0,
    hunger: 0,
    energy: 0,
    purchaseCount: 0, // Currency & Shop
    coinsSpent: 0,
    coinsEarned: 0,
    currentCoins: 0,
    furniturePlaced: 0, // Furniture
    furnishedTime: 0,
    themesUnlocked: 0, // Themes
    themeChanges: 0,
    premiumFoodUsed: 0, // Items
    medicineUsed: 0,
    cakeUsed: 0,
    energyDrinkUsed: 0,
    wellFedTime: 0, // Time trackers
  });

  const happyTimerRef = useRef(null);
  const aliveTimerRef = useRef(null);
  const balancedTimerRef = useRef(null);
  const wellFedTimerRef = useRef(null);
  const furnishedTimerRef = useRef(null);
  const currentStatsRef = useRef(stats); // Track current stats

  // Keep ref updated with latest stats
  useEffect(() => {
    currentStatsRef.current = stats;
  }, [stats]);

  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("achievements");
    if (saved) {
      try {
        const parsedAchievements = JSON.parse(saved);
        console.log('✅ Loaded achievements:', parsedAchievements);
        setUnlockedAchievements(parsedAchievements);
      } catch (error) {
        console.error('❌ Failed to load achievements:', error);
      }
    }

    const savedStats = localStorage.getItem("achievementStats");
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        console.log('✅ Loaded achievement stats:', parsedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('❌ Failed to load achievement stats:', error);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save achievements to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("achievements", JSON.stringify(unlockedAchievements));
      console.log('💾 Saved achievements:', unlockedAchievements.length);
    }
  }, [unlockedAchievements, isLoaded]);

  // Save stats to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("achievementStats", JSON.stringify(stats));
      console.log('💾 Saved stats - feedCount:', stats.feedCount, 'playCount:', stats.playCount);
    }
  }, [stats, isLoaded]);

  // Check for new achievements
  useEffect(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.check(stats)) {
        unlockAchievement(achievement.id);
      }
    });
  }, [stats, unlockedAchievements]);

  // Alive time tracker (only start after loaded)
  useEffect(() => {
    if (!isLoaded) return;

    aliveTimerRef.current = setInterval(() => {
      setStats((prev) => {
        return { ...prev, aliveTime: prev.aliveTime + 1 };
      });
    }, 1000);

    return () => {
      if (aliveTimerRef.current) {
        clearInterval(aliveTimerRef.current);
      }
    };
  }, [isLoaded]);

  // Happy time tracker
  useEffect(() => {
    const checkHappyTime = () => {
      const currentHappiness = currentStatsRef.current.happiness;

      if (currentHappiness > 70) {
        if (!happyTimerRef.current) {
          console.log('Starting happy timer');
          happyTimerRef.current = setInterval(() => {
            setStats((prev) => {
              console.log('Happy time:', prev.happyTime + 1);
              return { ...prev, happyTime: prev.happyTime + 1 };
            });
          }, 1000);
        }
      } else {
        if (happyTimerRef.current) {
          console.log('Stopping happy timer');
          clearInterval(happyTimerRef.current);
          happyTimerRef.current = null;
        }
      }
    };

    const checkInterval = setInterval(checkHappyTime, 1000); // Check every second

    return () => {
      clearInterval(checkInterval);
      if (happyTimerRef.current) {
        clearInterval(happyTimerRef.current);
        happyTimerRef.current = null;
      }
    };
  }, []);

  // Balanced time tracker
  useEffect(() => {
    const checkBalancedTime = () => {
      const current = currentStatsRef.current;

      if (current.happiness > 50 && current.hunger > 50 && current.energy > 50) {
        if (!balancedTimerRef.current) {
          console.log('Starting balanced timer');
          balancedTimerRef.current = setInterval(() => {
            setStats((prev) => {
              console.log('Balanced time:', prev.balancedTime + 1);
              return { ...prev, balancedTime: prev.balancedTime + 1 };
            });
          }, 1000);
        }
      } else {
        if (balancedTimerRef.current) {
          console.log('Stopping balanced timer');
          clearInterval(balancedTimerRef.current);
          balancedTimerRef.current = null;
        }
      }
    };

    const checkInterval = setInterval(checkBalancedTime, 1000); // Check every second

    return () => {
      clearInterval(checkInterval);
      if (balancedTimerRef.current) {
        clearInterval(balancedTimerRef.current);
        balancedTimerRef.current = null;
      }
    };
  }, []);

  // Well fed time tracker (hunger > 80%)
  useEffect(() => {
    const checkWellFedTime = () => {
      const currentHunger = currentStatsRef.current.hunger;

      if (currentHunger > 80) {
        if (!wellFedTimerRef.current) {
          console.log('Starting well fed timer');
          wellFedTimerRef.current = setInterval(() => {
            setStats((prev) => {
              console.log('Well fed time:', prev.wellFedTime + 1);
              return { ...prev, wellFedTime: prev.wellFedTime + 1 };
            });
          }, 1000);
        }
      } else {
        if (wellFedTimerRef.current) {
          console.log('Stopping well fed timer');
          clearInterval(wellFedTimerRef.current);
          wellFedTimerRef.current = null;
        }
      }
    };

    const checkInterval = setInterval(checkWellFedTime, 1000); // Check every second

    return () => {
      clearInterval(checkInterval);
      if (wellFedTimerRef.current) {
        clearInterval(wellFedTimerRef.current);
        wellFedTimerRef.current = null;
      }
    };
  }, []);

  // Furnished time tracker (when furniture is placed)
  useEffect(() => {
    const checkFurnishedTime = () => {
      const furniturePlaced = currentStatsRef.current.furniturePlaced;

      if (furniturePlaced > 0) {
        if (!furnishedTimerRef.current) {
          console.log('Starting furnished timer');
          furnishedTimerRef.current = setInterval(() => {
            setStats((prev) => {
              console.log('Furnished time:', prev.furnishedTime + 1);
              return { ...prev, furnishedTime: prev.furnishedTime + 1 };
            });
          }, 1000);
        }
      } else {
        if (furnishedTimerRef.current) {
          console.log('Stopping furnished timer');
          clearInterval(furnishedTimerRef.current);
          furnishedTimerRef.current = null;
        }
      }
    };

    const checkInterval = setInterval(checkFurnishedTime, 1000);

    return () => {
      clearInterval(checkInterval);
      if (furnishedTimerRef.current) {
        clearInterval(furnishedTimerRef.current);
        furnishedTimerRef.current = null;
      }
    };
  }, []);

  const unlockAchievement = (id) => {
    setUnlockedAchievements((prev) => [...prev, id]);
    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    setNewAchievement(achievement);

    setTimeout(() => setNewAchievement(null), 4000);
  };

  const trackAction = useCallback((action) => {
    setStats((prev) => ({
      ...prev,
      feedCount: action === "feed" ? prev.feedCount + 1 : prev.feedCount,
      playCount: action === "play" ? prev.playCount + 1 : prev.playCount,
      restCount: action === "rest" ? prev.restCount + 1 : prev.restCount,
      recoveryCount: action === "recover" ? prev.recoveryCount + 1 : prev.recoveryCount,
      criticalCount: action === "critical" ? prev.criticalCount + 1 : prev.criticalCount,
    }));
  }, []);

  const updatePetStats = useCallback((happiness, hunger, energy) => {
    setStats((prev) => ({ ...prev, happiness, hunger, energy }));
  }, []);

  // Track purchases
  const trackPurchase = useCallback((price) => {
    setStats((prev) => ({
      ...prev,
      purchaseCount: prev.purchaseCount + 1,
      coinsSpent: prev.coinsSpent + price,
    }));
  }, []);

  // Track coins
  const trackCoins = useCallback((earned, current) => {
    if (earned > 0) {
      setStats((prev) => ({
        ...prev,
        coinsEarned: prev.coinsEarned + earned,
        currentCoins: current,
      }));
    } else {
      // Just update current coins without adding to earned
      setStats((prev) => ({
        ...prev,
        currentCoins: current,
      }));
    }
  }, []);

  // Track furniture
  const trackFurniture = useCallback((count) => {
    setStats((prev) => ({
      ...prev,
      furniturePlaced: count,
    }));
  }, []);

  // Track themes
  const trackTheme = useCallback((action) => {
    setStats((prev) => ({
      ...prev,
      themesUnlocked: action === "unlock" ? prev.themesUnlocked + 1 : prev.themesUnlocked,
      themeChanges: action === "change" ? prev.themeChanges + 1 : prev.themeChanges,
    }));
  }, []);

  // Track item usage
  const trackItemUse = useCallback((itemId) => {
    setStats((prev) => ({
      ...prev,
      premiumFoodUsed: itemId === "premium_food" ? prev.premiumFoodUsed + 1 : prev.premiumFoodUsed,
      medicineUsed: itemId === "medicine" ? prev.medicineUsed + 1 : prev.medicineUsed,
      cakeUsed: itemId === "birthday_cake" ? prev.cakeUsed + 1 : prev.cakeUsed,
      energyDrinkUsed: itemId === "energy_drink" ? prev.energyDrinkUsed + 1 : prev.energyDrinkUsed,
    }));
  }, []);

  return {
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    newAchievement,
    trackAction,
    updatePetStats,
    trackPurchase,
    trackCoins,
    trackFurniture,
    trackTheme,
    trackItemUse,
  };
}