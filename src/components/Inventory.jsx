function Inventory({ show, onClose, inventory, onUseItem, isSick }) {
  if (!show) return null;

  const items = [
    {
      id: "premium_food",
      name: "Premium Food",
      icon: "🍕",
      description: "Restores +25 hunger",
      canUse: true,
    },
    {
      id: "medicine",
      name: "Medicine",
      icon: "💊",
      description: "Instantly cure sickness",
      canUse: isSick,
    },
    {
      id: "energy_drink",
      name: "Energy Drink",
      icon: "⚡",
      description: "Restores +30 energy and boosts happiness",
      canUse: true,
    },
    {
      id: "birthday_cake",
      name: "Birthday Cake",
      icon: "🎂",
      description: "Huge happiness boost +40, gives 50 coins back!",
      canUse: true,
    },
  ];

  // Filter to only show items with count > 0
  const ownedItems = items.filter((item) => (inventory[item.id] || 0) > 0);

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🎒 Inventory</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shop-items">
          {ownedItems.length === 0 ? (
            <div className="empty-inventory" style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: 'center',
              padding: '3rem 2rem',
              color: '#999'
            }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</p>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your inventory is empty!</p>
              <p style={{ fontSize: '0.9rem' }}>Visit the shop to buy items 🛍️</p>
            </div>
          ) : (
            ownedItems.map((item) => {
              const count = inventory[item.id];

              return (
                <div key={item.id} className="shop-item">
                  <div className="shop-item-icon">{item.icon}</div>
                  <div className="shop-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="shop-item-footer">
                      <span className="shop-item-price">Owned: {count}</span>
                      <button
                        className="buy-btn"
                        onClick={() => onUseItem(item.id)}
                        disabled={!item.canUse}
                      >
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;