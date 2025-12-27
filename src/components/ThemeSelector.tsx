import React from 'react'
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi'
import { ThemeSelection } from '../theme'

type ThemeSelectorProps = {
  value: ThemeSelection
  onChange: (value: ThemeSelection) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => {
  const nextSelection = (current: ThemeSelection): ThemeSelection => {
    switch (current) {
      case 'system':
        return 'light'
      case 'light':
        return 'dark'
      case 'dark':
      default:
        return 'system'
    }
  }

  const Icon = value === 'light' ? FiSun : value === 'dark' ? FiMoon : FiMonitor
  const themeLabels: Record<ThemeSelection, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  }
  const currentThemeLabel = themeLabels[value] ?? String(value)

  return (
    <button
      type="button"

      aria-label={`Toggle theme (current: ${currentThemeLabel})`}
      title={`Theme: ${currentThemeLabel}`}
      onClick={() => onChange(nextSelection(value))}
    >
      <Icon aria-hidden="true" focusable="false" />
      <span className="sr-only">Theme: {currentThemeLabel}</span>
    </button>
  )
}

export default ThemeSelector
