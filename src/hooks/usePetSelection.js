import { useState, useEffect } from 'react';
import { PET_TYPES } from '../constants/petConfig';

/**
 * Hook to manage pet selection and ownership
 * Now syncs with ownedItems from shop
 */
export function usePetSelection(shopOwnedItems = []) {
  const [currentPet, setCurrentPet] = useState(PET_TYPES.CAT.id);
  const [ownedPets, setOwnedPets] = useState([PET_TYPES.CAT.id]); // Cat is free
  const [isLoaded, setIsLoaded] = useState(false);

  // Load current pet from localStorage ONCE
  useEffect(() => {
    const savedPet = localStorage.getItem('currentPet');
    if (savedPet) {
      console.log('✅ Loaded current pet:', savedPet);
      setCurrentPet(savedPet);
    }
    setIsLoaded(true);
  }, []);

  // Save current pet whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('currentPet', currentPet);
      console.log('💾 Saved current pet:', currentPet);
    }
  }, [currentPet, isLoaded]);

  // Sync owned pets with shop's ownedItems
  useEffect(() => {
    // Get pet IDs from shop (they're prefixed with 'pet_')
    const petItemsFromShop = shopOwnedItems
      .filter(itemId => itemId.startsWith('pet_'))
      .map(itemId => itemId.replace('pet_', '')); // Remove 'pet_' prefix

    // Merge with default cat
    const allOwnedPets = ['cat', ...petItemsFromShop];

    // Remove duplicates
    const uniquePets = [...new Set(allOwnedPets)];

    setOwnedPets(uniquePets);
    console.log('✅ Owned pets updated:', uniquePets);
  }, [shopOwnedItems]);

  // Switch to a different pet
  const switchPet = (petId) => {
    if (ownedPets.includes(petId)) {
      setCurrentPet(petId);
      console.log('✅ Switched to pet:', petId);
      return true;
    }
    console.log('❌ Pet not owned:', petId);
    return false;
  };

  return {
    currentPet,
    ownedPets,
    switchPet,
  };
}