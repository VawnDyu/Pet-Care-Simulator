import { useState, useEffect, useCallback } from 'react';
import { MAX_FURNITURE } from '../constants/furniturePositions';

/**
 * Custom hook to manage furniture placement and passive effects
 */
export function useFurnitureSystem(setHappiness, setEnergy, setHunger) {
  const [placedFurniture, setPlacedFurniture] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load placed furniture from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('placedFurniture');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('✅ Loaded furniture from localStorage:', parsed);
        setPlacedFurniture(parsed);
      } catch (error) {
        console.error('❌ Failed to load furniture:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save placed furniture to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('placedFurniture', JSON.stringify(placedFurniture));
      console.log('💾 Saved furniture to localStorage:', placedFurniture);
    }
  }, [placedFurniture, isLoaded]);

  // Place furniture in the room
  const placeFurniture = useCallback((furnitureItem) => {
    setPlacedFurniture((prev) => {
      // Check furniture limit
      if (prev.length >= MAX_FURNITURE) {
        alert(`Maximum furniture limit reached! (${MAX_FURNITURE} items)`);
        return prev;
      }

      // Check if furniture already placed (by checking if same id exists)
      const alreadyPlaced = prev.find(item => item.id === furnitureItem.id);
      if (alreadyPlaced) {
        alert('This furniture is already placed!');
        return prev;
      }

      // Add the new furniture with a unique timestamp
      const furnitureWithTimestamp = {
        ...furnitureItem,
        placedAt: Date.now(),
      };

      console.log('✅ Placing furniture:', furnitureWithTimestamp);
      return [...prev, furnitureWithTimestamp];
    });
  }, []);

  // Remove furniture from the room
  const removeFurniture = useCallback((furnitureId) => {
    console.log('🗑️ Attempting to remove furniture:', furnitureId);
    setPlacedFurniture((prev) => {
      const newFurniture = prev.filter(item => item.id !== furnitureId);
      console.log('✅ Furniture after removal:', newFurniture);
      return newFurniture;
    });
  }, []);

  // Apply passive effects from furniture (every minute)
  useEffect(() => {
    if (!isLoaded || placedFurniture.length === 0) return;

    console.log('🪑 Furniture passive effects active for:', placedFurniture.length, 'items');

    const interval = setInterval(() => {
      console.log('⏰ Applying furniture effects...');
      placedFurniture.forEach((item) => {
        if (item.effects) {
          if (item.effects.happiness) {
            setHappiness((prev) => Math.min(prev + item.effects.happiness, 100));
            console.log(`+${item.effects.happiness} happiness from ${item.name}`);
          }
          if (item.effects.energy) {
            setEnergy((prev) => Math.min(prev + item.effects.energy, 100));
            console.log(`+${item.effects.energy} energy from ${item.name}`);
          }
          if (item.effects.hunger) {
            setHunger((prev) => Math.min(prev + item.effects.hunger, 100));
            console.log(`+${item.effects.hunger} hunger from ${item.name}`);
          }
        }
      });
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, [placedFurniture, setHappiness, setEnergy, setHunger, isLoaded]);

  return {
    placedFurniture,
    placeFurniture,
    removeFurniture,
  };
}

export default useFurnitureSystem;