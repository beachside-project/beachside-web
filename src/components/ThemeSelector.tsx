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

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`テーマ切り替え: ${value}`}
      title={`テーマ: ${value}`}
      onClick={() => onChange(nextSelection(value))}
    >
      <Icon aria-hidden="true" focusable="false" />
      <span className="sr-only">テーマ: {value}</span>
    </button>
  )
}

export default ThemeSelector
