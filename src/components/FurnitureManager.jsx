import { FURNITURE_ITEMS } from '../constants/gameConfig';

function FurnitureManager({ show, onClose, inventory, placedFurniture, onPlace, onRemove }) {
  if (!show) return null;

  // Get furniture from inventory
  const furnitureInInventory = Object.entries(inventory)
    .filter(([itemId]) => itemId.startsWith('furniture_'))
    .map(([itemId, quantity]) => {
      // Find the furniture data from FURNITURE_ITEMS
      const furnitureData = FURNITURE_ITEMS.find(item => item.id === itemId);
      return { ...furnitureData, quantity };
    })
    .filter((item) => item.quantity > 0);

  const isPlaced = (itemId) => placedFurniture.some(item => item.id === itemId);

  const handlePlace = (furnitureData) => {
    console.log('Attempting to place:', furnitureData);
    onPlace(furnitureData);
  };

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🪑 Furniture Manager</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="furniture-tabs">
          <div className="furniture-tab active">
            Your Furniture ({furnitureInInventory.length})
          </div>
        </div>

        <div className="shop-items">
          {furnitureInInventory.length === 0 ? (
            <div className="empty-inventory" style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: 'center',
              padding: '3rem 2rem',
              color: '#999'
            }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪑</p>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No furniture yet!</p>
              <p style={{ fontSize: '0.9rem' }}>Buy furniture from the shop 🛍️</p>
            </div>
          ) : (
            furnitureInInventory.map((item) => {
              const placed = isPlaced(item.id);

              return (
                <div key={item.id} className={`shop-item ${placed ? 'owned' : ''}`}>
                  <div className="shop-item-icon">{item.icon}</div>
                  <div className="shop-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="shop-item-footer">
                      <span className="shop-item-price">
                        {placed ? '✓ Placed' : `Owned: ${item.quantity}`}
                      </span>
                      {placed ? (
                        <button
                          className="buy-btn"
                          onClick={() => onRemove(item.id)}
                          style={{ background: '#ff6b6b' }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="buy-btn"
                          onClick={() => handlePlace(item)}
                        >
                          Place
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{
          padding: '1rem',
          background: '#f0f0f0',
          borderRadius: '0.5rem',
          margin: '1rem',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          💡 <strong>Tip:</strong> Placed furniture gives passive stat boosts every minute!
          <br />
          📊 <strong>Currently placed:</strong> {placedFurniture.length} item(s)
        </div>
      </div>
    </div>
  );
}

export default FurnitureManager;