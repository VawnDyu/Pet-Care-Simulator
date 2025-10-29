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
  ];

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🎒 Inventory</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shop-items">
          {items.map((item) => {
            const count = inventory[item.id] || 0;

            return (
              <div key={item.id} className={`shop-item ${count === 0 ? 'owned' : ''}`}>
                <div className="shop-item-icon">{item.icon}</div>
                <div className="shop-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="shop-item-footer">
                    <span className="shop-item-price">Owned: {count}</span>
                    {count > 0 ? (
                      <button
                        className="buy-btn"
                        onClick={() => onUseItem(item.id)}
                        disabled={!item.canUse}
                      >
                        Use
                      </button>
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.9rem' }}>None owned</span>
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

export default Inventory;