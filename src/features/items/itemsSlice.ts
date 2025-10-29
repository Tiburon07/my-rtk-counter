import { createSlice, createEntityAdapter, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';


export interface Item {
  id: string;
  title: string;
  note?: string;
  createdAt: number;
}

const itemsAdapter = createEntityAdapter<Item>({
  sortComparer: (a, b) => b.createdAt - a.createdAt, // più recenti in alto
});

const initialState = itemsAdapter.getInitialState();

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: {
      prepare: (title: string, note?: string) => ({
        payload: { id: nanoid(), title, note, createdAt: Date.now() } as Item,
      }),
      reducer: (state, action: PayloadAction<Item>) => {
        itemsAdapter.addOne(state, action.payload);
      },
    },
    updateItem: (state, action: PayloadAction<Pick<Item, 'id' | 'title' | 'note'>>) => {
      const { id, title, note } = action.payload;
      itemsAdapter.updateOne(state, { id, changes: { title, note } });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      itemsAdapter.removeOne(state, action.payload);
    },
    upsertMany: (state, action: PayloadAction<Item[]>) => {
      itemsAdapter.upsertMany(state, action.payload);
    },
  },
});

export const { addItem, updateItem, removeItem, upsertMany } = itemsSlice.actions;
export default itemsSlice.reducer;

// Selectors base
const selectors = itemsAdapter.getSelectors<RootState>((s) => s.items);
export const selectAllItems = selectors.selectAll;
export const selectItemById = selectors.selectById;
export const selectItemsIds = selectors.selectIds;