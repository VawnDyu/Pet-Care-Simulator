function Achievement({ achievement, isUnlocked }) {
  return (
    <div className={`achievement ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-info">
        <h4>{achievement.title}</h4>
        <p>{achievement.description}</p>
      </div>
      {isUnlocked && <span className="achievement-badge">✓</span>}
    </div>
  );
}

export default Achievement;