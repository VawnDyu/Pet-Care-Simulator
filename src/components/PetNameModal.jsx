import { useState } from "react";

function PetNameModal({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="pet-name-overlay">
      <div className="pet-name-modal">
        <h2>🐱 Welcome to Pet Sim!</h2>
        <p>What would you like to name your pet?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter pet name..."
            maxLength={20}
            autoFocus
            className="pet-name-input"
          />
          <button type="submit" disabled={!name.trim()} className="pet-name-submit">
            Start Adventure! 🎉
          </button>
        </form>
      </div>
    </div>
  );
}

export default PetNameModal;