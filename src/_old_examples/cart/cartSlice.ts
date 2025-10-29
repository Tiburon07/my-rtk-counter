import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
 
interface CartItem { id: string; name: string; price: number }
interface CartState { items: CartItem[]; total: number }
 
const initialState: CartState = { items: [], total: 0 }
 
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload)
      state.total += action.payload.price
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((acc, item) => acc + item.price, 0)
    },
    clearCart() {
      return initialState
    }
  }
})
 
export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer