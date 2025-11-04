import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { getAssetPath } from './utils/getAssetPath.js'

// 🧩 Set favicon dynamically before app renders
const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.href = getAssetPath('happy.png');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
