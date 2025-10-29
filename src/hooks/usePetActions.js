import { useState, useRef, useEffect } from "react";

export function usePetActions() {
  const [lastAction, setLastAction] = useState({ type: null, id: 0 });
  const [canClick, setCanClick] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const feedSoundRef = useRef(null);
  const playSoundRef = useRef(null);
  const restSoundRef = useRef(null);

  // Initialize sound instances once
  useEffect(() => {
    feedSoundRef.current = new Audio("/sounds/feed.mp3");
    playSoundRef.current = new Audio("/sounds/play.mp3");
    restSoundRef.current = new Audio("/sounds/rest.mp3");

    feedSoundRef.current.volume = 1.0;
    playSoundRef.current.volume = 0.5;
    restSoundRef.current.volume = 0.5;
  }, []);

  const playSound = (audioRef) => {
    if (!audioRef.current || isMuted) return;
    const sound = audioRef.current;
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  const withCooldown = (callback, delay = 300) => {
    if (!canClick) return;
    setCanClick(false);
    callback();
    setTimeout(() => setCanClick(true), delay);
  };

  const createActions = (setHappiness, setHunger, setEnergy, energy, hunger, isSick) => {
    const handleFeed = () => {
      if (!isSick && hunger >= 90) {
        setLastAction({ type: "refuse", id: Date.now(), message: "Not hungry!" });
        return;
      }

      playSound(feedSoundRef);
      setHunger((prev) => Math.min(prev + 15, 100));

      // When sick, feeding also increases happiness a bit!
      if (isSick) {
        setHappiness((prev) => Math.min(prev + 10, 100));
      } else {
        setEnergy((prev) => Math.max(prev - 5, 0));
      }

      setLastAction({ type: "feed", id: Date.now() });
    };

    const handlePlay = () => {
      if (energy < 30) {
        setLastAction({ type: "refuse", id: Date.now(), message: "Too sleepy to play..." });
        return;
      }
      if (hunger < 30) {
        setLastAction({ type: "refuse", id: Date.now(), message: "Too hungry to play..." });
        return;
      }

      playSound(playSoundRef);
      setHappiness((prev) => Math.min(prev + 15, 100));
      setEnergy((prev) => Math.max(prev - 10, 0));
      setHunger((prev) => Math.max(prev - 5, 0));
      setLastAction({ type: "play", id: Date.now() });
    };

    const handleRest = () => {
      if (!isSick && energy >= 90) {
        setLastAction({ type: "refuse", id: Date.now(), message: "Not tired!" });
        return;
      }

      playSound(restSoundRef);
      setEnergy((prev) => Math.min(prev + 20, 100));

      // When sick, resting also increases happiness a bit!
      if (isSick) {
        setHappiness((prev) => Math.min(prev + 10, 100));
      } else {
        setHappiness((prev) => Math.max(prev - 5, 0));
      }

      setLastAction({ type: "rest", id: Date.now() });
    };

    return { handleFeed, handlePlay, handleRest };
  };

  return {
    lastAction,
    withCooldown,
    createActions,
    setIsMuted,
  };
}