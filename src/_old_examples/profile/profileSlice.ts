import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
 
type Preferences = {
  theme: 'light' | 'dark'
  locale: 'it' | 'en'
}
 
type ProfileState = {
  id: string
  name: string
  email: string
  preferences: Preferences
}
 
const initialState: ProfileState = {
  id: 'u1',
  name: 'Alice',
  email: 'alice@example.com',
  preferences: { theme: 'light', locale: 'it' },
}
 
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    rename(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      // Cambia SOLO preferences.theme → structural sharing:
      // - newState !== prevState
      // - newState.preferences !== prevState.preferences
      // - ma newState.email === prevState.email (stesso riferimento)
      state.preferences.theme = action.payload
    },
    setLocale(state, action: PayloadAction<'it' | 'en'>) {
      state.preferences.locale = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
  },
})
 
export const { rename, setTheme, setLocale, setEmail } = profileSlice.actions
export default profileSlice.reducer