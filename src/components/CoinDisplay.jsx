function CoinDisplay({ coins, recentEarning }) {
  return (
    <div className="coin-display">
      <span className="coin-icon">💰</span>
      <span className="coin-amount">{coins}</span>

      {recentEarning && (
        <div className="coin-earned">
          +{recentEarning.amount} 💰
        </div>
      )}
    </div>
  );
}

export default CoinDisplay;