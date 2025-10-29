import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

export type Todo = { id: string; text: string; completed: boolean }
type TodosState = { items: Todo[] }

const initialState: TodosState = {
  items: [
    { id: '1', text: 'Fare la spesa', completed: false },
    { id: '2', text: 'Pulire casa', completed: true },
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Omit<Todo, 'id' | 'completed'>>) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...action.payload,
        completed: false,
      }
      state.items.push(newTodo)
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.items
export default todosSlice.reducer
