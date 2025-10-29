import { useState, useEffect } from "react";

function SoundToggle({ onToggle }) {
  const [isMuted, setIsMuted] = useState(false);

  // Load saved preference
  useEffect(() => {
    const savedMute = localStorage.getItem("soundMuted");
    if (savedMute === "true") {
      setIsMuted(true);
      onToggle(true);
    }
  }, [onToggle]);

  const toggleSound = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onToggle(newMutedState);
    localStorage.setItem("soundMuted", newMutedState);
  };

  return (
    <button className="sound-toggle" onClick={toggleSound} title={isMuted ? "Unmute" : "Mute"}>
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}

export default SoundToggle;