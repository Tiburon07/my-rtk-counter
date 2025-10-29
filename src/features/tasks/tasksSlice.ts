import { createSlice, createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit'
import { resetAll } from '../ui/uiSlice' 


export type Task = {
  id: string
  title: string
  completed: boolean
}
 
// 1. Adapter per la gestione normalizzata
const tasksAdapter = createEntityAdapter<Task>({
  // selectId omesso perché il campo si chiama già 'id' (default)
  sortComparer: (a, b) => a.title.localeCompare(b.title) // opzionale: ordina per titolo
})
 
// 2. Stato iniziale
const initialState = tasksAdapter.getInitialState()
 
// 3. Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      tasksAdapter.addOne(state, action.payload)
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.entities[action.payload]
      if (task) task.completed = !task.completed
    },
    removeTask: (state, action: PayloadAction<string>) => {
      tasksAdapter.removeOne(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    // Reagisce a un'azione di un altro slice
    builder.addCase(resetAll, () => tasksAdapter.getInitialState())
  }
})
 
export const { addTask, toggleTask, removeTask } = tasksSlice.actions
 
// 4. Selettori pronti forniti da adapter
export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds
} = tasksAdapter.getSelectors((state: { tasks: ReturnType<typeof tasksSlice.reducer> }) => state.tasks)
 
export default tasksSlice.reducer