import { ACTION_REWARDS } from "../constants/gameConfig";

export function createTrackedActions(withCooldown, actions, trackAction, earnCoins, playSound) {
  return {
    trackFeed: () => {
      withCooldown(actions.handleFeed);
      trackAction("feed");
      earnCoins(ACTION_REWARDS.FEED, "Feed");
      playSound("coin");
    },
    trackPlay: () => {
      withCooldown(actions.handlePlay);
      trackAction("play");
      earnCoins(ACTION_REWARDS.PLAY, "Play");
      playSound("coin");
    },
    trackRest: () => {
      withCooldown(actions.handleRest);
      trackAction("rest");
      earnCoins(ACTION_REWARDS.REST, "Rest");
      playSound("coin");
    },
  };
}

export function createModalHandlers(playSound) {
  return {
    createModalHandler: (setModalState, state) => () => {
      playSound(state ? "openModal" : "closeModal");
      setModalState(state);
    },
  };
}

export function getButtonAvailability(isSick, energy, hunger) {
  return {
    canPlay: !isSick && energy >= 30 && hunger >= 30,
    canRest: isSick || energy < 90,
    canFeed: isSick || hunger < 90,
  };
}

export function isCriticallyLow(happiness, hunger, energy, threshold = 15) {
  return happiness < threshold || hunger < threshold || energy < threshold;
}