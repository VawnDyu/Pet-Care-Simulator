import { FURNITURE_POSITIONS } from '../constants/furniturePositions';

function FurnitureDisplay({ furniture, onRemove }) {
  if (!furniture || furniture.length === 0) return null;

  return (
    <div className="furniture-container">
      {furniture.map((item, index) => {
        // Get predefined position for this furniture
        const position = FURNITURE_POSITIONS[index] || FURNITURE_POSITIONS[0];

        return (
          <div
            key={`${item.id}-${index}`}
            className="furniture-item"
            style={{
              left: position.left,
              bottom: position.bottom,
            }}
            title={`${item.name} - ${item.description}`}
          >
            <div className="furniture-icon">{item.icon}</div>
            <button
              className="furniture-remove"
              onClick={() => onRemove(item.id)}
              title="Remove furniture"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FurnitureDisplay;