import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import adminReducer from './features/admin/adminSlice'
import todosReducer from './features/todos/todosSlice'
import uiReducer from './features/ui/uiSlice'
import { loggerMiddleware } from './middlewares/logger'
import { performanceMiddleware } from './middlewares/performance'
import { authGuardMiddleware } from './middlewares/authGuard'
import tasksReducer from './features/tasks/tasksSlice'
import catalogReducer from './features/catalog/catalogSlice'
import itemsReducer from './features/items/itemsSlice'


import { apiSlice } from "./api/apiSlice"; // Importiamo l'apiSlice
import { setupListeners } from '@reduxjs/toolkit/query'
 
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    admin: adminReducer,
    todos: todosReducer,
    ui: uiReducer,
    tasks: tasksReducer,
    catalog: catalogReducer,
    items: itemsReducer,
  },
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false })
      .concat(authGuardMiddleware)
      .concat(loggerMiddleware)
      .concat(performanceMiddleware)
      .concat(apiSlice.middleware),
})


setupListeners(store.dispatch);
 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch