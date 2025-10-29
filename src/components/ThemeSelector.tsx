import { useAppSelector, useAppDispatch } from '../hook'
import {  setTheme } from '../features/ui/uiSlice'

export default function ThemeSelector() {
  const theme = useAppSelector((state) => state.ui.theme)
  const dispatch = useAppDispatch()

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as 'light' | 'dark'))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label htmlFor="theme-select">Tema:</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange} style={{ padding: '10px', borderRadius: 4 }}>
        <option value="light">Chiaro</option>
        <option value="dark">Scuro</option>
      </select>
    </div>
  )
}
