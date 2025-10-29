import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
 
type AdminState = {
  executions: number
  lastJob?: { id: string; params: Record<string, unknown> }
}
 
const initialState: AdminState = {
  executions: 0,
}
 
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    runJob(state, action: PayloadAction<{ id: string; params?: Record<string, unknown> }>) {
      state.executions += 1
      state.lastJob = { id: action.payload.id, params: action.payload.params ?? {} }
    },
    reset(state) {
      state.executions = 0
      state.lastJob = undefined
    },
  },
})
 
export const { runJob, reset } = adminSlice.actions
export default adminSlice.reducer