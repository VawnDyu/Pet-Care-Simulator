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
import { useItemSystem } from "./hooks/useItemSystem";
import { useShopSystem } from "./hooks/useShopSystem";
import { useFurnitureSystem } from "./hooks/useFurnitureSystem";
import FurnitureDisplay from "./components/FurnitureDisplay";
import FurnitureManager from "./components/FurnitureManager";
import {
  createTrackedActions,
  createModalHandlers,
  getButtonAvailability,
  isCriticallyLow
} from "./utils/gameActions";
import { STAT_THRESHOLDS, ANIMATIONS, STORAGE_KEYS, ACTION_REWARDS } from "./constants/gameConfig";
import "./styles/App.css";
import { usePetSelection } from "./hooks/usePetSelection";
import PetSelector from "./components/PetSelector";
import { PET_SHOP_ITEMS } from "./constants/petConfig";

function App() {
  // ===== STATE & HOOKS =====
  const { happiness, hunger, energy, isLoaded, setHappiness, setHunger, setEnergy } = usePetStats();
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const {
    achievements,
    unlockedAchievements,
    newAchievement,
    trackAction,
    updatePetStats,
    trackPurchase,
    trackCoins,
    trackFurniture,
    trackTheme,
    trackItemUse,
  } = useAchievements();
  const { coins, earnCoins, spendCoins, setCoins, recentEarning } = useCurrency(trackCoins);
  const { currentTheme, setCurrentTheme, getThemeColor } = useTheme();
  const { inventory, setInventory, ownedItems, setOwnedItems } = useInventory();
  const { currentPet, ownedPets: ownedPetsList, switchPet } = usePetSelection(ownedItems);
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
    showFurnitureManager,
    setShowFurnitureManager,
    showPetSelector,
    setShowPetSelector,
  } = useModals();

  const [mood, setMood] = useState("neutral");
  const [shake, setShake] = useState(false);
  const [petName, setPetName] = useState("");
  const criticalTrackedRef = useRef(false);

  // ===== LOAD PREFERENCES =====
  useEffect(() => {
    const savedMute = localStorage.getItem(STORAGE_KEYS.SOUND_MUTED);
    if (savedMute === "true") setIsMuted(true);

    const savedStarted = localStorage.getItem(STORAGE_KEYS.HAS_STARTED);
    if (savedStarted === "true") setHasStarted(true);
  }, []);

  // ===== INITIALIZE SYSTEMS =====
  const { lastAction, withCooldown, createActions } = usePetActions(isMuted, currentPet);
  useBackgroundMusic(currentTheme, isMuted, hasStarted);
  const { playSound } = useSoundEffects(isMuted);
  const { isSick, setIsSick } = useSickness(happiness, hunger, energy, trackAction, earnCoins, setShowSickOverlay);

  const { handleFeed, handlePlay, handleRest } = createActions(
    setHappiness,
    setHunger,
    setEnergy,
    energy,
    hunger,
    isSick
  );

  // ===== CUSTOM SYSTEMS =====
  const { placedFurniture, placeFurniture, removeFurniture } = useFurnitureSystem(
    setHappiness,
    setEnergy,
    setHunger
  );

  const { handleUseItem } = useItemSystem(
    inventory,
    setInventory,
    isSick,
    setIsSick,
    setHunger,
    setEnergy,
    setHappiness,
    setCoins,
    earnCoins,
    playSound,
    trackItemUse
  );

  const { handlePurchase } = useShopSystem(
    spendCoins,
    playSound,
    setShowShopModal,
    setShowRenameModal,
    setInventory,
    ownedItems,
    setOwnedItems,
    trackPurchase,
    trackTheme
  );

  // ===== GAME ACTIONS =====
  const { trackFeed, trackPlay, trackRest } = createTrackedActions(
    withCooldown,
    { handleFeed, handlePlay, handleRest },
    trackAction,
    earnCoins,
    playSound
  );

  // ===== MODAL HANDLERS =====
  const { createModalHandler } = createModalHandlers(playSound);
  const openShop = createModalHandler(setShowShopModal, true);
  const closeShop = createModalHandler(setShowShopModal, false);
  const openInventory = createModalHandler(setShowInventory, true);
  const closeInventory = createModalHandler(setShowInventory, false);
  const openThemes = createModalHandler(setShowThemeSelector, true);
  const closeThemes = createModalHandler(setShowThemeSelector, false);
  const openFurniture = createModalHandler(setShowFurnitureManager, true);
  const closeFurniture = createModalHandler(setShowFurnitureManager, false);
  const openPets = createModalHandler(setShowPetSelector, true);
  const closePets = createModalHandler(setShowPetSelector, false);

  // ===== GAME HANDLERS =====
  const handleStartGame = () => {
    setHasStarted(true);
    localStorage.setItem(STORAGE_KEYS.HAS_STARTED, "true");
  };

  const handleNameSubmit = (name) => {
    setPetName(name);
    localStorage.setItem(STORAGE_KEYS.PET_NAME, name);
    setShowNameModal(false);
  };

  const handleRename = (newName) => {
    setPetName(newName);
    localStorage.setItem(STORAGE_KEYS.PET_NAME, newName);
    setShowRenameModal(false);
    alert(`Your pet is now named ${newName}!`);
  };

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
    trackTheme('change');
  };

  // ===== LOAD PET NAME =====
  useEffect(() => {
    const savedName = localStorage.getItem(STORAGE_KEYS.PET_NAME);
    if (savedName) {
      setPetName(savedName);
    } else if (isLoaded && hasStarted) {
      setShowNameModal(true);
    }
  }, [isLoaded, hasStarted, setShowNameModal]);

  // ===== ACHIEVEMENT EFFECTS =====
  useEffect(() => {
    if (newAchievement) {
      earnCoins(ACTION_REWARDS.ACHIEVEMENT, "Achievement");
      playSound("achievement");
    }
  }, [newAchievement, earnCoins, playSound]);

  useEffect(() => {
    updatePetStats(happiness, hunger, energy);
  }, [happiness, hunger, energy]);

  // ===== FURNITURE COUNT TRACKING ===== //
  useEffect(() => {
  trackFurniture(placedFurniture.length);
  }, [placedFurniture, trackFurniture]);

  // ===== CRITICAL STATS TRACKING =====
  useEffect(() => {
    const isCritical = happiness === 0 || hunger === 0 || energy === 0;
    const isHealthy = happiness > 0 && hunger > 0 && energy > 0;

    if (isCritical && !criticalTrackedRef.current) {
      trackAction("critical");
      criticalTrackedRef.current = true;
    }
    if (isHealthy) {
      criticalTrackedRef.current = false;
    }
  }, [happiness, hunger, energy, trackAction]);

  // ===== SHAKE EFFECT =====
  useEffect(() => {
    if (isCriticallyLow(happiness, hunger, energy, STAT_THRESHOLDS.CRITICAL)) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), ANIMATIONS.SHAKE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [happiness, hunger, energy]);

  // ===== COMPUTED VALUES =====
  const { canPlay, canRest, canFeed } = getButtonAvailability(isSick, energy, hunger);
  const backgroundColor = getThemeColor(isSick ? "sick" : mood);

  // ===== LOADING SCREEN =====
  if (!isLoaded) {
    return <div className="loading-screen">Loading your pet...</div>;
  }

  // ===== WELCOME SCREEN =====
  if (!hasStarted) {
    return (
      <div className="welcome-screen">
        <div className="welcome-content">
          <h1>🐾 Pet Simulator</h1>
          <p>Take care of your virtual pet!</p>
          <p className="welcome-subtitle">Feed, play, and rest to keep your pet happy and healthy</p>
          <button className="start-button" onClick={handleStartGame}>
            Start Game 🎮
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN GAME =====
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
        style={{ backgroundColor, transition: ANIMATIONS.BACKGROUND_TRANSITION }}
      >
        <FurnitureDisplay furniture={placedFurniture} onRemove={removeFurniture} />
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
        <FurnitureManager
          show={showFurnitureManager}
          onClose={closeFurniture}
          inventory={inventory}
          placedFurniture={placedFurniture}
          onPlace={placeFurniture}
          onRemove={removeFurniture}
        />
        <AchievementsPanel
          achievements={achievements}
          unlockedAchievements={unlockedAchievements}
          onOpen={() => playSound("openModal")}
          onClose={() => playSound("closeModal")}
        />
        <PetSelector
          show={showPetSelector}
          onClose={closePets}
          ownedPets={ownedPetsList}
          currentPet={currentPet}
          onSelectPet={switchPet}
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
        <button className="shop-toggle" onClick={openFurniture} style={{ top: '15rem' }}>
          🪑 Furniture
        </button>
        <button className="shop-toggle" onClick={openPets} style={{ top: '18.5rem' }}>
          🐾 Pets
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
          currentPetId={currentPet}
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