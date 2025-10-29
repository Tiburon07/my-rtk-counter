

import { setTheme, setLocale } from '../features/profile/profileSlice'
import { selectLocale, selectTheme } from '../features/profile/selector'
import { useAppDispatch, useAppSelector } from '../hook'
 
export default function ProfileSettings() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const locale = useAppSelector(selectLocale)
 
  // Cambia dinamicamente il background in base al tema selezionato
  const containerStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    transition: 'background 0.3s ease',
    background: theme === 'dark' ? '#1f2937' : '#f9fafb', // sfondo scuro o chiaro
    color: theme === 'dark' ? '#f9fafb' : '#111827',       // testo chiaro/scuro leggibile
  }
 
  return (
    <section style={containerStyle}>
      <h3 style={{ marginTop: 0 }}>Impostazioni</h3>
 
      <div style={row}>
        <label>Theme</label>
        <select
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value as 'light' | 'dark'))}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </div>
 
      <div style={row}>
        <label>Locale</label>
        <select
          value={locale}
          onChange={(e) => dispatch(setLocale(e.target.value as 'it' | 'en'))}
        >
          <option value="it">it</option>
          <option value="en">en</option>
        </select>
      </div>
 
      <p style={{ marginTop: 16, fontStyle: 'italic', opacity: 0.8 }}>
        Tema attuale: <strong>{theme}</strong>
      </p>
    </section>
  )
}
 
const row: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  marginBottom: 8,
}