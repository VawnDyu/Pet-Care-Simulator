import { useState } from "react";

export function useModals() {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showSickOverlay, setShowSickOverlay] = useState(false);

  return {
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
  };
}