import { useState } from "react";
import { FURNITURE_ITEMS } from '../constants/gameConfig';
import { PET_SHOP_ITEMS } from "../constants/petConfig";

const SHOP_ITEMS = [
  {
    id: "rename",
    name: "Change Pet Name",
    description: "Give your pet a new name",
    icon: "✏️",
    price: 100,
    type: "service",
  },
  {
    id: "premium_food",
    name: "Premium Food",
    description: "Restores +25 hunger (instead of +15)",
    icon: "🍕",
    price: 50,
    type: "consumable",
  },
  {
    id: "energy_drink",
    name: "Energy Drink",
    description: "Restores +30 energy and boosts happiness",
    icon: "⚡",
    price: 75,
    type: "consumable",
  },
  {
    id: "birthday_cake",
    name: "Birthday Cake",
    description: "Huge happiness boost +40, gives 50 coins back!",
    icon: "🎂",
    price: 300,
    type: "consumable",
  },
  {
    id: "medicine",
    name: "Medicine",
    description: "Instantly cure your sick pet",
    icon: "💊",
    price: 200,
    type: "consumable",
  },
  {
    id: "theme_sunset",
    name: "Sunset Theme",
    description: "Beautiful orange and pink sunset background",
    icon: "🌅",
    price: 150,
    type: "theme",
  },
  {
    id: "theme_ocean",
    name: "Ocean Theme",
    description: "Calm blue ocean background",
    icon: "🌊",
    price: 150,
    type: "theme",
  },
  {
    id: "theme_forest",
    name: "Forest Theme",
    description: "Green forest background",
    icon: "🌲",
    price: 150,
    type: "theme",
  },
  {
    id: "theme_halloween",
    name: "Halloween Theme",
    description: "Spooky pumpkins, bats, and ghosts",
    icon: "🎃",
    price: 200,
    type: "theme",
  },
  {
    id: "theme_christmas",
    name: "Christmas Theme",
    description: "Festive snowflakes and ornaments",
    icon: "🎄",
    price: 200,
    type: "theme",
  },
  ...FURNITURE_ITEMS,
  ...PET_SHOP_ITEMS,
];

function ShopModal({ show, onClose, coins, onPurchase, ownedItems }) {
  const [selectedTab, setSelectedTab] = useState("all");

  if (!show) return null;

  const filteredItems = SHOP_ITEMS.filter((item) => {
    if (selectedTab === "all") return true;
    return item.type === selectedTab;
  });

  const handlePurchase = (item) => {
    if (coins >= item.price) {
      if (window.confirm(`Buy ${item.name} for ${item.price} coins?`)) {
        onPurchase(item);
      }
    } else {
      alert(`Not enough coins! You need ${item.price - coins} more coins.`);
    }
  };

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🛍️ Shop</h2>
          <div className="shop-balance">
            <span>Your Balance:</span>
            <span className="shop-coins">💰 {coins}</span>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shop-tabs">
          <button
            className={selectedTab === "all" ? "active" : ""}
            onClick={() => setSelectedTab("all")}
          >
            All
          </button>
          <button
            className={selectedTab === "service" ? "active" : ""}
            onClick={() => setSelectedTab("service")}
          >
            Services
          </button>
          <button
            className={selectedTab === "consumable" ? "active" : ""}
            onClick={() => setSelectedTab("consumable")}
          >
            Items
          </button>
          <button
            className={selectedTab === "theme" ? "active" : ""}
            onClick={() => setSelectedTab("theme")}
          >
            Themes
          </button>
          <button
            className={selectedTab === "furniture" ? "active" : ""}
            onClick={() => setSelectedTab("furniture")}
          >
            Furniture
          </button>
          <button
            className={selectedTab === "pet" ? "active" : ""}
            onClick={() => setSelectedTab("pet")}
          >
            Pet
          </button>
        </div>

        <div className="shop-items">
{filteredItems.map((item) => {
  // For furniture, check both inventory and ownedItems
  const isOwned = item.type === 'furniture'
    ? ownedItems.includes(item.id)
    : ownedItems.includes(item.id);
  const canAfford = coins >= item.price;

  return (
    <div key={item.id} className={`shop-item ${isOwned ? "owned" : ""}`}>
      <div className="shop-item-icon">{item.icon}</div>
      <div className="shop-item-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="shop-item-footer">
          <span className="shop-item-price">💰 {item.price}</span>
          {isOwned && item.type === 'furniture' ? (
            <span className="owned-badge">✓ Owned</span>
          ) : isOwned ? (
            <span className="owned-badge">✓ Owned</span>
          ) : (
            <button
              className="buy-btn"
              onClick={() => handlePurchase(item)}
              disabled={!canAfford}
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
})}
        </div>
      </div>
    </div>
  );
}

export default ShopModal;