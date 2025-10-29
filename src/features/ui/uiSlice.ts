import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UiState = {
  theme: 'light' | 'dark'
}

const initialState: UiState = {
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    resetAll() {
      return initialState
    }
  },
})

export const { setTheme, resetAll } = uiSlice.actions
export default uiSlice.reducer
