import { useState, useRef, useEffect } from "react";
import { getAssetPath } from "../utils/getAssetPath";
import { PET_ACTION_EFFECTS, SOUND_EFFECTS as SFX } from "../constants/gameConfig";

export function usePetActions(isMuted, currentPetId = 'cat') {
  const [lastAction, setLastAction] = useState({ type: null, id: 0 });
  const [canClick, setCanClick] = useState(true);
  const { FEED, PLAY, REST } = PET_ACTION_EFFECTS;
  const { PET: PET_SFX } = SFX;

  // Store multiple play sounds
  const feedSoundRefs = useRef({});
  const playSoundRefs = useRef({});
  const restSoundRefs = useRef({});

  // Initialize sound instances once
  useEffect(() => {
    // Feed sounds (different for each pet)
    Object.keys(PET_SFX.FEED).forEach((petType) => {
      const soundConfig = PET_SFX.FEED[petType];
      feedSoundRefs.current[petType] = new Audio(getAssetPath(soundConfig.src));
      feedSoundRefs.current[petType].volume = soundConfig.volume;
    });

    // Rest sounds (different for each pet)
    Object.keys(PET_SFX.REST).forEach((petType) => {
      const soundConfig = PET_SFX.REST[petType];
      restSoundRefs.current[petType] = new Audio(getAssetPath(soundConfig.src));
      restSoundRefs.current[petType].volume = soundConfig.volume;
    });

    // Play sounds (different for each pet)
    Object.keys(PET_SFX.PLAY).forEach((petType) => {
      const soundConfig = PET_SFX.PLAY[petType];
      playSoundRefs.current[petType] = new Audio(getAssetPath(soundConfig.src));
      playSoundRefs.current[petType].volume = soundConfig.volume;
    });
    console.log('🔊 Loaded play sounds for:', Object.keys(feedSoundRefs.current));
    console.log('🔊 Loaded play sounds for:', Object.keys(playSoundRefs.current));
  }, []);

  const playSound = (audioRef) => {
    if (!audioRef || isMuted) return;
    audioRef.pause();
    audioRef.currentTime = 0;
    audioRef.play().catch(() => {});
  };

  //Get the correct feed sound for current pet
  const getFeedSound = () => {
    const petSound = feedSoundRefs.current[currentPetId];
    if (petSound) {
      console.log('🔊 Playing sound for:', currentPetId);
      return petSound;
    }
    console.log('🔊 Using default sound for:', currentPetId);
    return feedSoundRefs.current['default'];
  };

  //Get the correct feed sound for current pet
  const getRestSound = () => {
    const petSound = restSoundRefs.current[currentPetId];
    if (petSound) {
      console.log('🔊 Playing sound for:', currentPetId);
      return petSound;
    }
    console.log('🔊 Using default sound for:', currentPetId);
    return restSoundRefs.current['default'];
  };

  // Get the correct play sound for current pet
  const getPlaySound = () => {
    const petSound = playSoundRefs.current[currentPetId];
    if (petSound) {
      console.log('🔊 Playing sound for:', currentPetId);
      return petSound;
    }
    console.log('🔊 Using default sound for:', currentPetId);
    return playSoundRefs.current['default'];
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

      playSound(getFeedSound());
      setHunger((prev) => Math.min(prev + FEED.HUNGER_GAIN, 100));

      if (isSick) {
        setHappiness((prev) => Math.min(prev + FEED.HAPPINESS_GAIN_WHEN_SICK, 100));
      } else {
        setEnergy((prev) => Math.max(prev - FEED.ENERGY_LOSS, 0));
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

      // Play pet-specific sound
      playSound(getPlaySound());

      setHappiness((prev) => Math.min(prev + PLAY.HAPPINESS_GAIN, 100));
      setEnergy((prev) => Math.max(prev - PLAY.ENERGY_LOSS, 0));
      setHunger((prev) => Math.max(prev - PLAY.HUNGER_LOSS, 0));
      setLastAction({ type: "play", id: Date.now() });
    };

    const handleRest = () => {
      if (!isSick && energy >= 90) {
        setLastAction({ type: "refuse", id: Date.now(), message: "Not tired!" });
        return;
      }

      playSound(getRestSound());
      setEnergy((prev) => Math.min(prev + REST.ENERGY_GAIN, 100));

      if (isSick) {
        setHappiness((prev) => Math.min(prev + REST.HAPPINESS_GAIN_WHEN_SICK, 100));
      } else {
        setHappiness((prev) => Math.max(prev - REST.HAPPINESS_LOSS_WHEN_HEALTHY, 0));
      }

      setLastAction({ type: "rest", id: Date.now() });
    };

    return { handleFeed, handlePlay, handleRest };
  };

  return {
    lastAction,
    withCooldown,
    createActions,
  };
}