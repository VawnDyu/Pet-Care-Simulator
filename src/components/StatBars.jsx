function StatBars({ happiness, hunger, energy }) {
  return (
    <div className="stats">
      <div className={`stat ${happiness < 20 ? 'critical' : ''}`}>
        ❤️ Happiness
        <div className="bar">
          <div className="fill happiness" style={{ width: `${happiness}%` }}></div>
        </div>
      </div>

      <div className={`stat ${hunger < 20 ? 'critical' : ''}`}>
        🍖 Hunger
        <div className="bar">
          <div className="fill hunger" style={{ width: `${hunger}%` }}></div>
        </div>
      </div>

      <div className={`stat ${energy < 20 ? 'critical' : ''}`}>
        💤 Energy
        <div className="bar">
          <div className="fill energy" style={{ width: `${energy}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default StatBars;