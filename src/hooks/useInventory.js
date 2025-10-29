import { useState, useEffect } from "react";

export function useInventory() {
  const [inventory, setInventory] = useState({
    premium_food: 0,
    medicine: 0,
  });
  const [ownedItems, setOwnedItems] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load inventory and owned items
  useEffect(() => {
    const savedOwned = localStorage.getItem("ownedItems");
    if (savedOwned) {
      setOwnedItems(JSON.parse(savedOwned));
    }

    const savedInventory = localStorage.getItem("inventory");
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }

    setDataLoaded(true);
  }, []);

  // Save owned items
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("ownedItems", JSON.stringify(ownedItems));
    }
  }, [ownedItems, dataLoaded]);

  // Save inventory
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory, dataLoaded]);

  return {
    inventory,
    setInventory,
    ownedItems,
    setOwnedItems,
  };
}