import { ALL_PETS } from '../constants/petConfig';

function PetSelector({ show, onClose, ownedPets, currentPet, onSelectPet }) {
  if (!show) return null;

  const handleSelect = (petId) => {
    if (ownedPets.includes(petId)) {
      onSelectPet(petId);
      onClose();
    } else {
      alert('You don\'t own this pet yet! Buy it from the shop.');
    }
  };

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🐾 Select Your Pet</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shop-items">
          {ALL_PETS.map((pet) => {
            const isOwned = ownedPets.includes(pet.id);
            const isCurrent = currentPet === pet.id;

            return (
              <div
                key={pet.id}
                className={`shop-item ${isCurrent ? 'current-pet' : ''} ${!isOwned ? 'locked-pet' : ''}`}
              >
                <div className="shop-item-icon" style={{ fontSize: '3rem' }}>
                  {pet.icon}
                </div>
                <div className="shop-item-info">
                  <h3>{pet.displayName}</h3>
                  <p>{pet.description}</p>
                  <div className="shop-item-footer">
                    {isCurrent ? (
                      <span className="current-badge">✓ Active</span>
                    ) : isOwned ? (
                      <button
                        className="buy-btn"
                        onClick={() => handleSelect(pet.id)}
                      >
                        Select
                      </button>
                    ) : (
                      <span className="locked-badge">
                        🔒 {pet.price === 0 ? 'Free' : `${pet.price} coins`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          padding: '1rem',
          background: '#f0f0f0',
          borderRadius: '0.5rem',
          margin: '1rem',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          💡 <strong>Tip:</strong> Buy new pets from the shop to unlock them!
        </div>
      </div>
    </div>
  );
}

export default PetSelector;