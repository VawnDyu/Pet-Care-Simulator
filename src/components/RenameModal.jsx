import { useState } from "react";

function RenameModal({ show, currentName, onSubmit, onClose }) {
  const [name, setName] = useState(currentName);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && name.trim() !== currentName) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="pet-name-overlay">
      <div className="pet-name-modal">
        <h2>✏️ Rename Your Pet</h2>
        <p>Current name: <strong>{currentName}</strong></p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name..."
            maxLength={20}
            autoFocus
            className="pet-name-input"
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={onClose}
              className="pet-name-submit"
              style={{ background: "#ccc" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || name.trim() === currentName}
              className="pet-name-submit"
            >
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RenameModal;