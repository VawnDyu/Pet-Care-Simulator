/**
 * Pet types configuration
 */

export const PET_TYPES = {
  CAT: {
    id: 'cat',
    name: 'Cat',
    displayName: '🐱 Cat',
    icon: '🐱',
    price: 0, // Free starter pet
    moods: {
      happy: 'pets/cat-happy.png',
      neutral: 'pets/cat-neutral.png',
      tired: 'pets/cat-tired.png',
      sick: 'pets/cat-sick.png',
    },
    description: 'A playful and independent companion',
  },
  DOG: {
    id: 'dog',
    name: 'Dog',
    displayName: '🐶 Dog',
    icon: '🐶',
    price: 500,
    moods: {
      happy: 'pets/dog-happy.png',
      neutral: 'pets/dog-neutral.png',
      tired: 'pets/dog-tired.png',
      sick: 'pets/dog-sick.png',
    },
    description: 'A loyal and energetic friend',
  },
  BUNNY: {
    id: 'bunny',
    name: 'Bunny',
    displayName: '🐰 Bunny',
    icon: '🐰',
    price: 300,
    moods: {
      happy: 'pets/bunny-happy.png',
      neutral: 'pets/bunny-neutral.png',
      tired: 'pets/bunny-tired.png',
      sick: 'pets/bunny-sick.png',
    },
    description: 'A cute and gentle hopper',
  },
  HAMSTER: {
    id: 'hamster',
    name: 'Hamster',
    displayName: '🐹 Hamster',
    icon: '🐹',
    price: 200,
    moods: {
      happy: 'pets/hamster-happy.png',
      neutral: 'pets/hamster-neutral.png',
      tired: 'pets/hamster-tired.png',
      sick: 'pets/hamster-sick.png',
    },
    description: 'A tiny ball of energy',
  },
  BIRD: {
    id: 'bird',
    name: 'Bird',
    displayName: '🐦 Bird',
    icon: '🐦',
    price: 400,
    moods: {
      happy: 'pets/bird-happy.png',
      neutral: 'pets/bird-neutral.png',
      tired: 'pets/bird-tired.png',
      sick: 'pets/bird-sick.png',
    },
    description: 'A chirpy and colorful friend',
  },
};

// Array of all pets for easy iteration
export const ALL_PETS = Object.values(PET_TYPES);

// Get pet by ID
export const getPetById = (petId) => {
  return ALL_PETS.find(pet => pet.id === petId) || PET_TYPES.CAT;
};

// Shop items for pets (to add to ShopModal)
export const PET_SHOP_ITEMS = ALL_PETS
  .filter(pet => pet.price > 0) // Exclude free pets
  .map(pet => ({
    id: `pet_${pet.id}`,
    name: pet.name,
    description: pet.description,
    icon: pet.icon,
    price: pet.price,
    type: 'pet',
  }));