import type { Middleware } from '@reduxjs/toolkit'
import { isAction } from '@reduxjs/toolkit'

export const performanceMiddleware: Middleware = () => (next) => (action) => {
  if (!isAction(action)) return next(action)

  const start = performance.now()
  const result = next(action)
  const duration = performance.now() - start
  console.log(`[PERF] ${action.type} in ${duration.toFixed(2)}ms`)
  return result
}