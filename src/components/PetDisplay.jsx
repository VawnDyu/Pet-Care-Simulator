import { useState, useEffect, useRef } from "react";
import Sparkles from "./Sparkles";
import { getAssetPath } from "../utils/getAssetPath";

function PetDisplay({ happiness, hunger, energy, onMoodChange, action, isSick }) {
  const [mood, setMood] = useState("neutral");
  const [message, setMessage] = useState("");
  const [showSparkles, setShowSparkles] = useState(false);
  const [sparkleTimestamp, setSparkleTimestamp] = useState(Date.now());
  const prevEnergy = useRef(null);
  const prevHunger = useRef(null);
  const prevHappiness = useRef(null);
  const isFirstRender = useRef(true);

  // 🔹 Update mood logic
  useEffect(() => {
    if (isSick) {
      setMood("sick");
      onMoodChange("sick");
      return;
    }

    let newMood = "neutral";
    if (happiness > 70 && hunger > 50 && energy > 50) {
      newMood = "happy";
    } else if (hunger < 30 || energy < 30) {
      newMood = "tired";
    }
    if (newMood !== mood) {
      setMood(newMood);
      onMoodChange(newMood);
    }
  }, [happiness, hunger, energy, onMoodChange, mood, isSick]);

  // 💬 Action messages (immediate)
  useEffect(() => {
    if (action?.id) {
      let newMessage = "";
      if (action.type === "feed") newMessage = isSick ? "Thanks... *cough*" : "Yum! Delicious!";
      else if (action.type === "play") newMessage = "That's fun!";
      else if (action.type === "rest") newMessage = isSick ? "*sleeping*" : "Zzz...";
      else if (action.type === "refuse") newMessage = action.message;
      else if (action.type === "recover") newMessage = "I feel better! 🎉";

      if (newMessage) {
        setMessage(newMessage);
        const timer = setTimeout(() => setMessage(""), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [action?.id, isSick]);

  // 💬 Status warnings (only when crossing threshold)
  useEffect(() => {
    if (isSick) return; // Don't show warnings when sick

    let newMessage = "";

    if (energy < 30 && prevEnergy.current !== null && prevEnergy.current >= 30) {
      newMessage = "I'm sleepy...";
    }
    else if (hunger < 30 && prevHunger.current !== null && prevHunger.current >= 30) {
      newMessage = "I'm hungry...";
    }

    if (newMessage) {
      setMessage(newMessage);
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [energy, hunger, isSick]);

  // ✨ Trigger sparkles when stats increase
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevHappiness.current = happiness;
      prevHunger.current = hunger;
      prevEnergy.current = energy;
      return;
    }

    const happinessIncreased = happiness > prevHappiness.current;
    const hungerIncreased = hunger > prevHunger.current;
    const energyIncreased = energy > prevEnergy.current;

    if (happinessIncreased || hungerIncreased || energyIncreased) {
      setShowSparkles(true);
      setSparkleTimestamp(Date.now());

      const timer = setTimeout(() => {
        setShowSparkles(false);
      }, 1500);

      prevHappiness.current = happiness;
      prevHunger.current = hunger;
      prevEnergy.current = energy;

      return () => clearTimeout(timer);
    }

    prevHappiness.current = happiness;
    prevHunger.current = hunger;
    prevEnergy.current = energy;
  }, [happiness, hunger, energy]);

  return (
    <div className="pet-display">
      {message && <div key={message} className="speech-bubble">{message}</div>}
      {!isSick && <Sparkles show={showSparkles} timestamp={sparkleTimestamp} />}
      <img
        src={getAssetPath(`${mood}.png`)}
        alt={`${mood} pet`}
        className={`pet-image ${mood}`}
      />
      <p>
        Current Mood: <strong>{mood}</strong>
      </p>
    </div>
  );
}

export default PetDisplay;