import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';
 
type User = {name: string; isAdmin: boolean }

type AuthState = {
  user: User
}
 
const initialState: AuthState = {
  user: {name: 'Tib', isAdmin: false },
}
 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<boolean>) {
      state.user.isAdmin = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.user.name = action.payload
    },
    toggleAdmin(state) {
      state.user.isAdmin = !state.user.isAdmin
    }
  },
})
 

export const { setAdmin, setName, toggleAdmin } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAdmin = (state: RootState) => state.auth.user.isAdmin
export default authSlice.reducer