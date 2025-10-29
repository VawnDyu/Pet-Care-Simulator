import { useState, useEffect } from "react";

function ThemeEffects({ theme }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (theme === "theme_forest") {
      setParticles(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: -Math.random() * 12,
          emoji: "🍃",
          duration: 12,
        }))
      );
    } else if (theme === "theme_ocean") {
      setParticles(
        Array.from({ length: 15 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: -Math.random() * 10,
          emoji: "🫧",
          duration: 10,
        }))
      );
    } else if (theme === "theme_sunset") {
      setParticles(
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          top: 10 + Math.random() * 40,
          delay: -Math.random() * 25,
          emoji: "☁️",
          duration: 25,
        }))
      );
    } else {
      setParticles(
        Array.from({ length: 18 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: -Math.random() * 5,
          emoji: "✨",
          duration: 5,
        }))
      );
    }
  }, [theme]);

  // Randomize particle position when animation ends
  const handleAnimationIteration = (particleId) => {
    setParticles((prev) =>
      prev.map((p) =>
        p.id === particleId
          ? {
              ...p,
              left: theme === "theme_sunset" ? p.left : Math.random() * 100,
              top: theme === "default" ? Math.random() * 100 : theme === "theme_sunset" ? 10 + Math.random() * 40 : p.top,
            }
          : p
      )
    );
  };

  if (theme === "theme_forest") {
    return (
      <div className="theme-effects">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="falling-leaf"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
            onAnimationIteration={() => handleAnimationIteration(particle.id)}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    );
  }

  if (theme === "theme_ocean") {
    return (
      <div className="theme-effects">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="floating-bubble"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
            onAnimationIteration={() => handleAnimationIteration(particle.id)}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    );
  }

  if (theme === "theme_sunset") {
    return (
      <div className="theme-effects">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="floating-cloud"
            style={{
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
            onAnimationIteration={() => handleAnimationIteration(particle.id)}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    );
  }

  // Default theme
  return (
    <div className="theme-effects">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="twinkling-star"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}

export default ThemeEffects;