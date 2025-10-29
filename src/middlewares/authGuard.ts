import { type Middleware, isAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const authGuardMiddleware: Middleware = (store) => (next) => (action) => {
  if (!isAction(action)) return next(action)

  const { type } = action

  // Azioni che richiedono privilegi admin
  const requiresAdmin =
    type === 'catalog/addItem' ||
    type === 'catalog/removeItem'

  if (requiresAdmin) {
    const state = store.getState() as RootState
    const { isAdmin } = state.auth.user

    if (!isAdmin) {
      console.warn(`🚫 [AUTH GUARD] Azione bloccata: ${type}. L'utente non è un admin.`)
      return // Blocca l'azione
    }
  }

  return next(action)
}