// src/features/profile/selectors.ts
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
 
 
export const selectProfile = (s: RootState) => s.profile
export const selectName = (s: RootState) => s.profile.name
export const selectEmail = (s: RootState) => s.profile.email
export const selectPreferences = (s: RootState) => s.profile.preferences
export const selectTheme = (s: RootState) => s.profile.preferences.theme
export const selectLocale = (s: RootState) => s.profile.preferences.locale
 
// Esempio di derivazione memoizzata
export const selectDisplayLabel = createSelector(
  [selectName, selectEmail, selectLocale],
  (name, email, locale) => {
    const domain = email.split('@')[1] ?? ''
    return locale === 'it' ? `${name} – ${domain}` : `${name} – ${domain.toUpperCase()}`
  }
)