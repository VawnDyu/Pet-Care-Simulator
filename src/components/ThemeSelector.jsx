function ThemeSelector({ show, onClose, ownedThemes, currentTheme, onSelectTheme }) {
  if (!show) return null;

  const themes = [
    {
      id: "default",
      name: "Default",
      icon: "🌸",
      colors: {
        happy: "#ffe1ed",
        neutral: "#f8f9ff",
        tired: "#d8d5f8",
        sick: "#e8f5e9",
      },
    },
    {
      id: "theme_sunset",
      name: "Sunset",
      icon: "🌅",
      colors: {
        happy: "#ffe4b5",
        neutral: "#ffd4a3",
        tired: "#ffb88c",
        sick: "#ffd9b3",
      },
    },
    {
      id: "theme_ocean",
      name: "Ocean",
      icon: "🌊",
      colors: {
        happy: "#b3e5fc",
        neutral: "#e1f5fe",
        tired: "#81d4fa",
        sick: "#b2ebf2",
      },
    },
    {
      id: "theme_forest",
      name: "Forest",
      icon: "🌲",
      colors: {
        happy: "#c8e6c9",
        neutral: "#e8f5e9",
        tired: "#a5d6a7",
        sick: "#dcedc8",
      },
    },
    {
      id: "theme_halloween",
      name: "Halloween",
      icon: "🎃",
      colors: {
        happy: "#ff9500",
        neutral: "#2d2d2d",
        tired: "#4a0e4e",
        sick: "#3d3d3d",
      },
    },
    {
      id: "theme_christmas",
      name: "Christmas",
      icon: "⛄",
      colors: {
        happy: "#ff4444",
        neutral: "#e8f5f0",
        tired: "#2d5f3f",
        sick: "#f0e6e6",
      },
    },
  ];

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🎨 Select Theme</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="shop-items">
          {themes.map((theme) => {
            const isOwned = theme.id === "default" || ownedThemes.includes(theme.id);
            const isActive = currentTheme === theme.id;

            return (
              <div
                key={theme.id}
                className={`shop-item ${isActive ? "owned" : ""}`}
                style={{ cursor: isOwned ? "pointer" : "default" }}
                onClick={() => isOwned && onSelectTheme(theme.id)}
              >
                <div className="shop-item-icon">{theme.icon}</div>
                <div className="shop-item-info">
                  <h3>{theme.name}</h3>
                  <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
                    {Object.values(theme.colors).map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: "30px",
                          height: "30px",
                          background: color,
                          borderRadius: "0.5rem",
                          border: "2px solid #ddd",
                        }}
                      />
                    ))}
                  </div>
                  <div className="shop-item-footer">
                    {!isOwned ? (
                      <span style={{ color: "#999" }}>Not owned</span>
                    ) : isActive ? (
                      <span className="owned-badge">✓ Active</span>
                    ) : (
                      <button className="buy-btn">Apply</button>
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

export default ThemeSelector;