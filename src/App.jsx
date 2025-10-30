import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import PetDisplay from "./components/PetDisplay";
import StatBars from "./components/StatBars";
import ActionButtons from "./components/ActionButtons";
import SoundToggle from "./components/SoundToggle";
import SickOverlay from "./components/SickOverlay";
import AchievementsPanel from "./components/AchievementsPanel";
import AchievementNotification from "./components/AchievementNotification";
import PetNameModal from "./components/PetNameModal";
import CoinDisplay from "./components/CoinDisplay";
import ShopModal from "./components/ShopModal";
import RenameModal from "./components/RenameModal";
import Inventory from "./components/Inventory";
import ThemeSelector from "./components/ThemeSelector";
import ThemeEffects from "./components/ThemeEffects";
import { usePetStats } from "./hooks/usePetStats";
import { usePetActions } from "./hooks/usePetActions";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useAchievements } from "./hooks/useAchievements";
import { useCurrency } from "./hooks/useCurrency";
import { useTheme } from "./hooks/useTheme";
import { useModals } from "./hooks/useModals";
import { useInventory } from "./hooks/useInventory";
import { useSickness } from "./hooks/useSickness";
import "./styles/App.css";

function App() {
  const { happiness, hunger, energy, isLoaded, setHappiness, setHunger, setEnergy } = usePetStats();
  const [isMuted, setIsMuted] = useState(false);
  const { achievements, unlockedAchievements, newAchievement, trackAction, updatePetStats } = useAchievements();
  const { coins, earnCoins, spendCoins, recentEarning } = useCurrency();
  const { currentTheme, setCurrentTheme, getThemeColor } = useTheme();
  const { inventory, setInventory, ownedItems, setOwnedItems } = useInventory();
  const {
    showNameModal,
    setShowNameModal,
    showShopModal,
    setShowShopModal,
    showRenameModal,
    setShowRenameModal,
    showInventory,
    setShowInventory,
    showThemeSelector,
    setShowThemeSelector,
    showSickOverlay,
    setShowSickOverlay,
  } = useModals();

  const [mood, setMood] = useState("neutral");
  const [shake, setShake] = useState(false);
  const [petName, setPetName] = useState("");
  const criticalTrackedRef = useRef(false);

  // Load mute preference FIRST
  useEffect(() => {
    const savedMute = localStorage.getItem("soundMuted");
    if (savedMute === "true") {
      setIsMuted(true);
    }
  }, []);

  // Initialize all sound systems AFTER isMuted is set
  const { lastAction, withCooldown, createActions } = usePetActions(isMuted);
  useBackgroundMusic(currentTheme, isMuted);
  const { playSound } = useSoundEffects(isMuted);

  const { isSick, setIsSick } = useSickness(happiness, hunger, energy, trackAction, earnCoins, setShowSickOverlay);

  // NOW we can call createActions
  const { handleFeed, handlePlay, handleRest } = createActions(
    setHappiness,
    setHunger,
    setEnergy,
    energy,
    hunger,
    isSick
  );

  // Load pet name on start
  useEffect(() => {
    const savedName = localStorage.getItem("petName");
    if (savedName) {
      setPetName(savedName);
    } else if (isLoaded) {
      setShowNameModal(true);
    }
  }, [isLoaded, setShowNameModal]);

  const handleNameSubmit = (name) => {
    setPetName(name);
    localStorage.setItem("petName", name);
    setShowNameModal(false);
  };

  // Track actions for achievements AND earn coins
  const trackFeed = () => {
    withCooldown(handleFeed);
    trackAction("feed");
    earnCoins(5, "Feed");
    playSound("coin");
  };

  const trackPlay = () => {
    withCooldown(handlePlay);
    trackAction("play");
    earnCoins(10, "Play");
    playSound("coin");
  };

  const trackRest = () => {
    withCooldown(handleRest);
    trackAction("rest");
    earnCoins(3, "Rest");
    playSound("coin");
  };

  // Achievement sound (REMOVED DUPLICATE)
  useEffect(() => {
    if (newAchievement) {
      earnCoins(50, "Achievement");
      playSound("achievement");
    }
  }, [newAchievement, earnCoins, playSound]);

  // Handle shop purchases
  const handlePurchase = (item) => {
    if (spendCoins(item.price)) {
      playSound("purchase");
      if (item.id === "rename") {
        setShowShopModal(false);
        setShowRenameModal(true);
      } else if (item.type === "consumable") {
        setInventory((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] || 0) + 1,
        }));
        alert(`${item.name} added to your inventory!`);
      } else if (item.type === "theme") {
        if (!ownedItems.includes(item.id)) {
          setOwnedItems((prev) => [...prev, item.id]);
          alert(`${item.name} unlocked! Go to Themes to apply it.`);
        } else {
          alert("You already own this theme!");
        }
      }
    }
  };

  // Handle rename
  const handleRename = (newName) => {
    setPetName(newName);
    localStorage.setItem("petName", newName);
    setShowRenameModal(false);
    alert(`Your pet is now named ${newName}!`);
  };

  // Handle theme selection
  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
    alert("Theme applied! ✨");
  };

  // Use items from inventory
  const handleUseItem = (itemId) => {
    if (inventory[itemId] > 0) {
      if (itemId === "medicine") {
        if (isSick) {
          setIsSick(false);
          setInventory((prev) => ({
            ...prev,
            medicine: prev.medicine - 1,
          }));
          playSound("purchase"); // Medicine use sound
          alert("Your pet is cured! 💊");
        } else {
          alert("Your pet is not sick!");
        }
      } else if (itemId === "premium_food") {
        setHunger((prev) => Math.min(prev + 25, 100));
        setInventory((prev) => ({
          ...prev,
          premium_food: prev.premium_food - 1,
        }));
        earnCoins(5, "Premium Food");
        playSound("coin");
        alert("Fed your pet premium food! +25 hunger 🍕");
      }
    }
  };

  // Modal handlers with sounds
  const openShop = () => {
    playSound("openModal");
    setShowShopModal(true);
  };

  const closeShop = () => {
    playSound("closeModal");
    setShowShopModal(false);
  };

  const openInventory = () => {
    playSound("openModal");
    setShowInventory(true);
  };

  const closeInventory = () => {
    playSound("closeModal");
    setShowInventory(false);
  };

  const openThemes = () => {
    playSound("openModal");
    setShowThemeSelector(true);
  };

  const closeThemes = () => {
    playSound("closeModal");
    setShowThemeSelector(false);
  };

  // Update achievement stats
  useEffect(() => {
    updatePetStats(happiness, hunger, energy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [happiness, hunger, energy]);

  // Track critical stats for achievement
  useEffect(() => {
    if ((happiness === 0 || hunger === 0 || energy === 0) && !criticalTrackedRef.current) {
      trackAction("critical");
      criticalTrackedRef.current = true;
    }
    if (happiness > 0 && hunger > 0 && energy > 0) {
      criticalTrackedRef.current = false;
    }
  }, [happiness, hunger, energy, trackAction]);

  // Button availability logic
  const canPlay = !isSick && energy >= 30 && hunger >= 30;
  const canRest = isSick || energy < 90;
  const canFeed = isSick || hunger < 90;

  // Trigger shake when any stat is critically low
  useEffect(() => {
    if (happiness < 15 || hunger < 15 || energy < 15) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [happiness, hunger, energy]);

  const backgroundColor = getThemeColor(isSick ? "sick" : mood);

  if (!isLoaded) {
    return <div className="loading-screen">Loading your pet...</div>;
  }

  return (
    <>
      {showNameModal && <PetNameModal onSubmit={handleNameSubmit} />}
      {showRenameModal && (
        <RenameModal
          show={showRenameModal}
          currentName={petName}
          onSubmit={handleRename}
          onClose={() => setShowRenameModal(false)}
        />
      )}

      <div
        className={`game-container ${shake ? 'shake' : ''}`}
        style={{ backgroundColor, transition: 'background-color 0.8s ease' }}
      >
        <ThemeEffects theme={currentTheme} />
        <SickOverlay show={showSickOverlay} onNurse={() => setShowSickOverlay(false)} />
        <ShopModal
          show={showShopModal}
          onClose={closeShop}
          coins={coins}
          onPurchase={handlePurchase}
          ownedItems={ownedItems}
        />
        <Inventory
          show={showInventory}
          onClose={closeInventory}
          inventory={inventory}
          onUseItem={handleUseItem}
          isSick={isSick}
        />
        <ThemeSelector
          show={showThemeSelector}
          onClose={closeThemes}
          ownedThemes={ownedItems}
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
        />
        <AchievementsPanel
          achievements={achievements}
          unlockedAchievements={unlockedAchievements}
          onOpen={() => playSound("openModal")}
          onClose={() => playSound("closeModal")}
        />
        <button className="shop-toggle" onClick={openShop}>
          🛍️ Shop
        </button>
        <button className="shop-toggle" onClick={openInventory} style={{ top: '8rem' }}>
          🎒 Inventory
        </button>
        <button className="shop-toggle" onClick={openThemes} style={{ top: '11.5rem' }}>
          🎨 Themes
        </button>
        <CoinDisplay coins={coins} recentEarning={recentEarning} />
        <SoundToggle onToggle={setIsMuted} isMuted={isMuted} />
        <AchievementNotification achievement={newAchievement} />
        <Header petName={petName} />
        <PetDisplay
          happiness={happiness}
          hunger={hunger}
          energy={energy}
          onMoodChange={setMood}
          action={lastAction}
          isSick={isSick}
        />
        <StatBars happiness={happiness} hunger={hunger} energy={energy} />
        <ActionButtons
          onFeed={trackFeed}
          onPlay={trackPlay}
          onRest={trackRest}
          canPlay={canPlay}
          canRest={canRest}
          canFeed={canFeed}
        />
        {isSick && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ff6b6b',
            color: 'white',
            padding: '0.8rem 1.5rem',
            borderRadius: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
            zIndex: 100,
            textAlign: 'center'
          }}>
            🏥 Pet is sick! Feed and rest to recover (get all stats above 30%)
            <br />
            <small>Or use medicine from inventory</small>
          </div>
        )}
      </div>
    </>
  );
}

export default App;