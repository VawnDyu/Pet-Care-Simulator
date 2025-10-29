function SickOverlay({ show, onNurse }) {
  if (!show) return null;

  return (
    <div className="sick-overlay">
      <div className="sick-message-box">
        <h2>😷 Your Pet is Sick!</h2>
        <p>Your pet needs care! Feed and give rest to help them recover.</p>
        <p className="recovery-hint">Get all stats above 30% to recover</p>
        <button onClick={onNurse} className="nurse-button">
          🏥 Start Nursing
        </button>
      </div>
    </div>
  );
}

export default SickOverlay;