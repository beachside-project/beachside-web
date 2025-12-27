export type ThemeSelection = 'system' | 'light' | 'dark'
export type EffectiveTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'beachside.theme'

export function isThemeSelection(value: unknown): value is ThemeSelection {
  return value === 'system' || value === 'light' || value === 'dark'
}

export function getSystemTheme(): EffectiveTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveEffectiveTheme(selection: ThemeSelection): EffectiveTheme {
  if (selection === 'dark') return 'dark'
  if (selection === 'light') return 'light'
  return getSystemTheme()
}

export function applyEffectiveThemeToDocument(theme: EffectiveTheme): void {
  document.documentElement.dataset.theme = theme
}

export function applyThemeSelection(selection: ThemeSelection): EffectiveTheme {
  const effective = resolveEffectiveTheme(selection)
  applyEffectiveThemeToDocument(effective)
  return effective
}

export function loadStoredThemeSelection(): ThemeSelection {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeSelection(raw)) return raw
  } catch {
    // ignore
  }

  return 'system'
}

export function storeThemeSelection(selection: ThemeSelection): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, selection)
  } catch {
    // ignore
  }
}

export function subscribeToSystemThemeChanges(onChange: () => void): () => void {
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', onChange)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }

  // Safari (older)
  const legacy = mediaQueryList as MediaQueryList & {
    addListener?: (listener: (event: MediaQueryListEvent) => void) => void
    removeListener?: (listener: (event: MediaQueryListEvent) => void) => void
  }

  const handler = () => {
    onChange()
  }

  if (typeof legacy.addListener === 'function') {
    legacy.addListener(handler)
    return () => legacy.removeListener?.(handler)
  }

  return () => {}
}
