import { useState } from "react";
import Achievement from "./Achievement";

function AchievementsPanel({ achievements, unlockedAchievements }) {
  const [isOpen, setIsOpen] = useState(false);

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;

  return (
    <>
      <button
        className="achievements-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Achievements"
      >
        🏆 {unlockedCount}/{totalCount}
      </button>

      {isOpen && (
        <div className="achievements-overlay" onClick={() => setIsOpen(false)}>
          <div className="achievements-panel" onClick={(e) => e.stopPropagation()}>
            <div className="achievements-header">
              <h2>🏆 Achievements</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <div className="achievements-progress">
              <p>{unlockedCount} of {totalCount} unlocked</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="achievements-list">
              {achievements.map((achievement) => (
                <Achievement
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={unlockedAchievements.includes(achievement.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AchievementsPanel;