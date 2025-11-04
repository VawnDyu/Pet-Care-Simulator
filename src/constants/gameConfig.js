// Passive stat decay per second
export const PET_STAT_DECAY = {
  HAPPINESS: 0.5,
  HUNGER: 0.8,
  ENERGY: 0.3,
};

// Pet action effects (user-triggered events)
export const PET_ACTION_EFFECTS = {
  FEED: {
    HUNGER_GAIN: 20,               // How much hunger is restored when fed
    ENERGY_LOSS: 5,                // Feeding costs a little energy
    HAPPINESS_GAIN_WHEN_SICK: 10,  // Feeding comforts sick pets
  },
  PLAY: {
    HAPPINESS_GAIN: 15,            // Playing increases happiness
    ENERGY_LOSS: 10,               // But costs energy
    HUNGER_LOSS: 5,                // Playing also makes them hungry
  },
  REST: {
    ENERGY_GAIN: 20,               // Resting restores energy
    HAPPINESS_GAIN_WHEN_SICK: 10,  // Being cared for while sick helps mood
    HAPPINESS_LOSS_WHEN_HEALTHY: 5,// But too much rest makes boredom
  },
};

// Sound effects
export const SOUND_EFFECTS = {
  PET: {
    FEED: {
      cat: { src: 'sounds/cat-eat.mp3', volume: 0.5 },
      dog: { src: 'sounds/dog-eat.mp3', volume: 0.3 },
      bunny: { src: 'sounds/bunny-eat.mp3', volume: 1.0 },
      hamster: { src: 'sounds/hamster-eat.mp3', volume: 0.9},
      bird: { src: 'sounds/bird-eat.mp3', volume: 0.4},
      default: { src: 'sounds/feed.mp3', volume: 1.0 }, // Fallback
    },
    REST: {
      cat: { src: 'sounds/cat-sleep.mp3', volume: 0.3 },
      dog: { src: 'sounds/dog-sleep.mp3', volume: 0.3 },
      bunny: { src: 'sounds/bunny-sleep.mp3', volume: 0.3 },
      hamster: { src: 'sounds/hamster-sleep.mp3', volume: 0.6},
      bird: { src: 'sounds/bird-sleep.mp3', volume: 0.2},
      default: { src: 'sounds/rest.mp3', volume: 0.3 }, // Fallback
    },
    PLAY: {
      cat: { src: 'sounds/cat-meow.mp3', volume: 0.5 },
      dog: { src: 'sounds/dog-bark.mp3', volume: 0.3 },
      bunny: { src: 'sounds/bunny-squeak.mp3', volume: 0.3 },
      hamster: { src: 'sounds/hamster-squeak.mp3', volume: 0.2 },
      bird: { src: 'sounds/bird-chirp.mp3', volume: 0.2 },
      default: { src: 'sounds/play.mp3', volume: 0.3 }, // Fallback
    },

    MEDICINE: { src: "sounds/medicine.mp3" },
  },
  UI: {
    OPEN_MODAL: { src: "sounds/open.mp3" },
    CLOSE_MODAL: { src: "sounds/close.mp3" },
    PURCHASE: { src: "sounds/purchase.mp3" },
    ACHIEVEMENT: { src: "sounds/achievement.mp3" },
    COIN: { src: "sounds/coin.mp3" },
  },
  VOLUME: 0.5,
};

// Stat thresholds
export const STAT_THRESHOLDS = {
  CRITICAL: 15,
  LOW_ENERGY: 30,
  LOW_HUNGER: 30,
  HIGH_STAT: 90,
};

// Action rewards (Get Coins)
export const ACTION_REWARDS = {
  FEED: 5,
  PLAY: 10,
  REST: 3,
  RECOVER: 20,
  ACHIEVEMENT: 50,
  PREMIUM_FOOD: 5,
  ENERGY_DRINK: 3,
  BIRTHDAY_CAKE: 50,
};

// Item effects
export const ITEM_EFFECTS = {
  PREMIUM_FOOD: {
    hunger: 25,
    coins: 5,
  },
  ENERGY_DRINK: {
    energy: 30,
    happiness: 5,
    coins: 3,
  },
  BIRTHDAY_CAKE: {
    happiness: 40,
    hunger: 20,
    coinsBack: 50,
  },
};

// Animation durations
export const ANIMATIONS = {
  SHAKE_DURATION: 400,
  BACKGROUND_TRANSITION: '0.8s ease',
};

// Local storage keys
export const STORAGE_KEYS = {
  SOUND_MUTED: 'soundMuted',
  HAS_STARTED: 'hasStarted',
  PET_NAME: 'petName',
};

//Theme music
export const THEME_MUSIC = {
  volume: 0.3,
  default: "sounds/music-default.mp3",
  theme_sunset: "sounds/music-sunset.mp3",
  theme_ocean: "sounds/music-ocean.mp3",
  theme_forest: "sounds/music-forest.mp3",
  theme_halloween: "sounds/music-halloween.mp3",
  theme_christmas: "sounds/music-christmas.mp3",
}

//Theme colors
export const THEME_COLORS = {
  default: {
    happy: "#ffe1ed",
    neutral: "#f8f9ff",
    tired: "#d8d5f8",
    sick: "#e8f5e9",
  },
  theme_sunset: {
    happy: "#ffe4b5",
    neutral: "#ffd4a3",
    tired: "#ffb88c",
    sick: "#ffd9b3",
  },
  theme_ocean: {
    happy: "#b3e5fc",
    neutral: "#e1f5fe",
    tired: "#81d4fa",
    sick: "#b2ebf2",
  },
  theme_forest: {
    happy: "#c8e6c9",
    neutral: "#e8f5e9",
    tired: "#a5d6a7",
    sick: "#dcedc8",
  },
  theme_halloween: {
  happy: "#ff9500",
  neutral: "#2d2d2d",
  tired: "#4a0e4e",
  sick: "#3d3d3d",
  },
  theme_christmas: {
  happy: "#ff4444",
  neutral: "#e8f5f0",
  tired: "#2d5f3f",
  sick: "#f0e6e6",
  },
};

// Furniture items
export const FURNITURE_ITEMS = [
  // 🌿 Basic Tier
  {
    id: 'furniture_plant',
    name: 'House Plant',
    description: '+3 happiness every minute (adds a bit of calm)',
    icon: '🪴',
    price: 250,
    type: 'furniture',
    effects: { happiness: 3 },
  },
  {
    id: 'furniture_couch',
    name: 'Cozy Couch',
    description: '+6 happiness every minute',
    icon: '🛋️',
    price: 400,
    type: 'furniture',
    effects: { happiness: 6 },
  },
  {
    id: 'furniture_bed',
    name: 'Comfy Bed',
    description: '+5 energy every minute',
    icon: '🛏️',
    price: 500,
    type: 'furniture',
    effects: { energy: 5 },
  },

  // 🍽️ Food & Kitchen Tier
  {
    id: 'furniture_fridge',
    name: 'Mini Fridge',
    description: '+6 hunger every minute',
    icon: '🧊',
    price: 700,
    type: 'furniture',
    effects: { hunger: 6 },
  },
  {
    id: 'furniture_feeder',
    name: 'Auto Feeder',
    description: '+8 hunger every minute',
    icon: '🍖',
    price: 900,
    type: 'furniture',
    effects: { hunger: 8 },
  },
  {
    id: 'furniture_water_bowl',
    name: 'Filtered Water Bowl',
    description: '+3 hunger and +2 happiness every minute',
    icon: '💧',
    price: 600,
    type: 'furniture',
    effects: { hunger: 3, happiness: 2 },
  },
  {
    id: 'furniture_snack_cabinet',
    name: 'Snack Cabinet',
    description: '+6 hunger, -2 energy every minute (too many snacks!)',
    icon: '🍪',
    price: 850,
    type: 'furniture',
    effects: { hunger: 6, energy: -2 },
  },

  // 🎮 Fun & Relax Tier
  {
    id: 'furniture_tv',
    name: 'Television',
    description: '+7 happiness, -2 energy every minute (fun but tiring)',
    icon: '📺',
    price: 650,
    type: 'furniture',
    effects: { happiness: 7, energy: -2 },
  },
  {
    id: 'furniture_toy_box',
    name: 'Toy Box',
    description: '+8 happiness every minute',
    icon: '🧸',
    price: 900,
    type: 'furniture',
    effects: { happiness: 8 },
  },
  {
    id: 'furniture_scratching_post',
    name: 'Scratching Post',
    description: '+6 happiness, +2 energy every minute',
    icon: '🐾',
    price: 850,
    type: 'furniture',
    effects: { happiness: 6, energy: 2 },
  },
  {
    id: 'furniture_bookshelf',
    name: 'Bookshelf',
    description: '+4 happiness, +3 energy every minute',
    icon: '📚',
    price: 600,
    type: 'furniture',
    effects: { happiness: 4, energy: 3 },
  },
  {
    id: 'furniture_aquarium',
    name: 'Colorful Aquarium',
    description: '+4 happiness every minute (relaxing to watch)',
    icon: '🐠',
    price: 950,
    type: 'furniture',
    effects: { happiness: 4 },
  },

  // 💤 Rest & Comfort Tier
  {
    id: 'furniture_cozy_bed',
    name: 'Cozy Pet Bed',
    description: '+8 energy every minute',
    icon: '🛏️',
    price: 700,
    type: 'furniture',
    effects: { energy: 8 },
  },
  {
    id: 'furniture_blanket_fort',
    name: 'Blanket Fort',
    description: '+6 energy and +4 happiness every minute',
    icon: '🪩',
    price: 1000,
    type: 'furniture',
    effects: { energy: 6, happiness: 4 },
  },
  {
    id: 'furniture_sun_spot',
    name: 'Sunny Window Spot',
    description: '+5 energy and +3 happiness every minute',
    icon: '🌞',
    price: 850,
    type: 'furniture',
    effects: { energy: 5, happiness: 3 },
  },

  // 🌿 Environment / Special
  {
    id: 'furniture_air_purifier',
    name: 'Air Purifier',
    description: '+3 energy and +3 happiness every minute',
    icon: '🌬️',
    price: 1100,
    type: 'furniture',
    effects: { energy: 3, happiness: 3 },
  },
  {
    id: 'furniture_fountain',
    name: 'Mini Fountain',
    description: '+4 happiness and +2 energy every minute',
    icon: '⛲',
    price: 1000,
    type: 'furniture',
    effects: { happiness: 4, energy: 2 },
  },

  // 🌟 Deluxe / All-in-One
  {
    id: 'furniture_deluxe_set',
    name: 'Deluxe Living Set',
    description: '+4 hunger, +4 happiness, +4 energy every minute (well-rounded comfort)',
    icon: '🏡',
    price: 1500,
    type: 'furniture',
    effects: { hunger: 4, happiness: 4, energy: 4 },
  },
];
