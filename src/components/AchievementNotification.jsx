function AchievementNotification({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className="achievement-notification">
      <div className="notification-content">
        <div className="notification-icon">🎉</div>
        <div className="notification-text">
          <h3>Achievement Unlocked!</h3>
          <div className="notification-achievement">
            <span className="notification-emoji">{achievement.icon}</span>
            <span className="notification-title">{achievement.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementNotification;