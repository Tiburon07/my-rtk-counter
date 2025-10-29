import type { Middleware } from '@reduxjs/toolkit'
import { isAction } from '@reduxjs/toolkit'

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (!isAction(action)) return next(action)

  // Log selettivo: evita rumore stampando solo ciò che serve
  const shouldLog =
    action.type.startsWith('admin/') ||
    action.type.startsWith('auth/')
 
  if (shouldLog) {
    const prev = store.getState()
    console.group(`[LOGGER] ${action.type}`)
    console.log('Prev state:', prev)
    console.log('Action:', action)
    const result = next(action)
    console.log('Next state:', store.getState())
    console.groupEnd()
    return result
  }
 
  return next(action)
}