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
];

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);
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
  });

  const happyTimerRef = useRef(null);
  const aliveTimerRef = useRef(null);
  const balancedTimerRef = useRef(null);

  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("achievements");
    if (saved) {
      setUnlockedAchievements(JSON.parse(saved));
    }

    const savedStats = localStorage.getItem("achievementStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save achievements to localStorage
  useEffect(() => {
    if (unlockedAchievements.length > 0) {
      localStorage.setItem("achievements", JSON.stringify(unlockedAchievements));
    }
  }, [unlockedAchievements]);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem("achievementStats", JSON.stringify(stats));
  }, [stats]);

  // Check for new achievements
  useEffect(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.check(stats)) {
        unlockAchievement(achievement.id);
      }
    });
  }, [stats, unlockedAchievements]);

  // Alive time tracker
  useEffect(() => {
    aliveTimerRef.current = setInterval(() => {
      setStats((prev) => ({ ...prev, aliveTime: prev.aliveTime + 1 }));
    }, 1000);

    return () => clearInterval(aliveTimerRef.current);
  }, []);

  // Happy time tracker
  useEffect(() => {
    if (stats.happiness > 70) {
      if (!happyTimerRef.current) {
        happyTimerRef.current = setInterval(() => {
          setStats((prev) => ({ ...prev, happyTime: prev.happyTime + 1 }));
        }, 1000);
      }
    } else {
      if (happyTimerRef.current) {
        clearInterval(happyTimerRef.current);
        happyTimerRef.current = null;
      }
    }

    return () => {
      if (happyTimerRef.current) {
        clearInterval(happyTimerRef.current);
      }
    };
  }, [stats.happiness]);

  // Balanced time tracker
  useEffect(() => {
    if (stats.happiness > 50 && stats.hunger > 50 && stats.energy > 50) {
      if (!balancedTimerRef.current) {
        balancedTimerRef.current = setInterval(() => {
          setStats((prev) => ({ ...prev, balancedTime: prev.balancedTime + 1 }));
        }, 1000);
      }
    } else {
      if (balancedTimerRef.current) {
        clearInterval(balancedTimerRef.current);
        balancedTimerRef.current = null;
      }
    }

    return () => {
      if (balancedTimerRef.current) {
        clearInterval(balancedTimerRef.current);
      }
    };
  }, [stats.happiness, stats.hunger, stats.energy]);

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

  return {
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    newAchievement,
    trackAction,
    updatePetStats,
  };
}