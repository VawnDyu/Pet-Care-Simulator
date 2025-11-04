import { useCallback } from 'react';
import { ITEM_EFFECTS, ACTION_REWARDS } from '../constants/gameConfig';

export function useItemSystem(
  inventory,
  setInventory,
  isSick,
  setIsSick,
  setHunger,
  setEnergy,
  setHappiness,
  setCoins,
  earnCoins,
  playSound,
  trackItemUse
) {
  const { PREMIUM_FOOD, ENERGY_DRINK, BIRTHDAY_CAKE } = ITEM_EFFECTS;
  const handleUseItem = useCallback((itemId) => {
    if (inventory[itemId] <= 0) return;

    // Define item effects
    const itemEffects = {
      medicine: () => {
        if (isSick) {
          setIsSick(false);
          playSound("medicine");
          return true;
        } else {
          alert("Your pet is not sick!");
          return false;
        }
      },
      premium_food: () => {
        setHunger((prev) => Math.min(prev + PREMIUM_FOOD.hunger, 100));
        earnCoins(ACTION_REWARDS.PREMIUM_FOOD, "Premium Food");
        playSound("feed");
        playSound("coin");
        return true;
      },
      energy_drink: () => {
        setEnergy((prev) => Math.min(prev + ENERGY_DRINK.energy, 100));
        setHappiness((prev) => Math.min(prev + ENERGY_DRINK.happiness, 100));
        earnCoins(ACTION_REWARDS.ENERGY_DRINK, "Energy Boost");
        playSound("feed");
        playSound("coin");
        return true;
      },
      birthday_cake: () => {
        setHappiness((prev) => Math.min(prev + BIRTHDAY_CAKE.happiness, 100));
        setHunger((prev) => Math.min(prev + BIRTHDAY_CAKE.hunger, 100));
        setCoins((prev) => prev + ACTION_REWARDS.BIRTHDAY_CAKE);
        playSound("feed");
        playSound("coin");
        return true;
      },
    };

    // Execute the item effect
    const effect = itemEffects[itemId];
    if (effect && effect()) {
      // Track item usage
      if (trackItemUse) {
        trackItemUse(itemId);
      }

      // Only reduce inventory if effect was successful
      setInventory((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  }, [inventory, isSick, setIsSick, setHunger, setEnergy, setHappiness, setCoins, earnCoins, playSound, setInventory, trackItemUse]);

  return { handleUseItem };
}

export default useItemSystem;