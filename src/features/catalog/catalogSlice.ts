import { createSlice, createEntityAdapter, type PayloadAction, type EntityState} from '@reduxjs/toolkit';
import type { RootState } from '../../store';


// Tipo per gli elementi del catalogo
export interface CatalogItem {
  id: string;
  title: string;
  completed: boolean;
}

// Creo l'entity adapter con ordinamento per title
const catalogAdapter = createEntityAdapter<CatalogItem>({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

// Stato iniziale con alcuni elementi di esempio (opzionale)
const initialState: EntityState<CatalogItem, string> = catalogAdapter.getInitialState();

// Slice del catalogo
const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Aggiungi un elemento
    addItem: (state, action: PayloadAction<{ title: string }>) => {
      const newItem: CatalogItem = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: false
      };
      catalogAdapter.addOne(state, newItem);
    },
    
    // Rimuovi un elemento
    removeItem: (state, action: PayloadAction<string>) => {
      catalogAdapter.removeOne(state, action.payload);
    },
    
    // Toggle completed
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.entities[action.payload];
      if (item) {
        item.completed = !item.completed;
      }
    },
    
    // Set tutti gli elementi (utile per inizializzazione)
    setItems: (state, action: PayloadAction<CatalogItem[]>) => {
      catalogAdapter.setAll(state, action.payload);
    }
  },
  
  // Extra reducers per rispondere ad azioni esterne
  extraReducers: (builder) => {
    // Risponde all'azione resetAll del system slice
    builder.addCase('ui/resetAll', (state) => {
      catalogAdapter.removeAll(state);
    });
  }
});

// Export delle azioni
export const { addItem, removeItem, toggleItem, setItems } = catalogSlice.actions;

// Export del reducer
export default catalogSlice.reducer;

// Selectors
export const catalogSelectors = catalogAdapter.getSelectors<RootState>(
  (state: RootState) => state.catalog
);

// Selectors custom
export const selectAllItems = (state: RootState) => catalogSelectors.selectAll(state);
export const selectItemById = (state: RootState, id: string) => catalogSelectors.selectById(state, id);
export const selectTotalItems = (state: RootState) => catalogSelectors.selectTotal(state);