import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { applyThemeSelection, loadStoredThemeSelection } from './theme'
import './index.css'

applyThemeSelection(loadStoredThemeSelection())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
