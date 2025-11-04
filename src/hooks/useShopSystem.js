import { useCallback } from 'react';

export function useShopSystem(
  spendCoins,
  playSound,
  setShowShopModal,
  setShowRenameModal,
  setInventory,
  ownedItems,
  setOwnedItems,
  trackPurchase,
  trackTheme
) {
  const handlePurchase = useCallback((item) => {
    if (!spendCoins(item.price)) return;

    playSound("purchase");

    // Track purchase
    if (trackPurchase) {
      trackPurchase(item.price);
    }

    const purchaseActions = {
      rename: () => {
        setShowShopModal(false);
        setShowRenameModal(true);
      },
      consumable: () => {
        setInventory((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] || 0) + 1,
        }));
        alert(`${item.name} added to your inventory!`);
      },
      furniture: () => {
        // Check if already owned
        if (ownedItems.includes(item.id)) {
          alert("You already own this furniture!");
          return;
        }

        setInventory((prev) => ({
          ...prev,
          [item.id]: 1, // Always set to 1, not increment
        }));
        setOwnedItems((prev) => [...prev, item.id]);
        alert(`${item.name} added to your inventory! Go to Furniture Manager to place it.`);
      },
      theme: () => {
        if (!ownedItems.includes(item.id)) {
          setOwnedItems((prev) => [...prev, item.id]);

          // Track theme unlock
          if (trackTheme) {
            trackTheme('unlock');
          }

          alert(`${item.name} unlocked! Go to Themes to apply it.`);
        } else {
          alert("You already own this theme!");
        }
      },
      pet: () => {
        const petId = item.id.replace('pet_', ''); // Remove 'pet_' prefix

        if (ownedItems.includes(item.id)) {
          alert("You already own this pet!");
          return;
        }

        // Add to owned items
        setOwnedItems((prev) => [...prev, item.id]);

        // Call addPet if you have access to it
        alert(`${item.name} unlocked! Go to Pets to select it.`);
      },
    };

    const action = item.id === "rename" ? purchaseActions.rename : purchaseActions[item.type];
    if (action) action();
  }, [spendCoins, playSound, setShowShopModal, setShowRenameModal, setInventory, ownedItems, setOwnedItems, trackPurchase, trackTheme]);

  return { handlePurchase };
}

export default useShopSystem;