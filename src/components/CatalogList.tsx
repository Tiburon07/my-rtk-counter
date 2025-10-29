import React, { useState } from 'react';
import { 
  removeItem, 
  toggleItem, 
  selectAllItems 
} from '../features/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import { selectIsAdmin } from '../features/auth/authSlice';


type FilterType = 'all' | 'active' | 'completed';

export const CatalogList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllItems);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [filter, setFilter] = useState<FilterType>('all');
  const [removeError, setRemoveError] = useState<string>('');
  
  const handleToggle = (id: string) => {
    dispatch(toggleItem(id));
  };
  
  const handleRemove = (id: string) => {
    
    if (!isAdmin) {
      setRemoveError(`⚠️ Solo gli admin possono rimuovere elementi!`);
      setTimeout(() => setRemoveError(''), 3000);
      return;
    }
    dispatch(removeItem(id));
  };
  
  // Filtra gli elementi in base al filtro selezionato
  const filteredItems = items.filter(item => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });
  
  // Statistiche
  const activeCount = items.filter(item => !item.completed).length;
  const completedCount = items.filter(item => item.completed).length;
  
  return (
    <div className="catalog-list">
      <h3>Lista Elementi</h3>
      
      {/* Filtri */}
      <div className="filters">
        <button 
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          Tutti ({items.length})
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        >
          Attivi ({activeCount})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          Completati ({completedCount})
        </button>
      </div>
      
      {removeError && (
        <div className="error-message">
          {removeError}
        </div>
      )}
      
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <p>
            {filter === 'all' 
              ? '📭 Nessun elemento nel catalogo' 
              : filter === 'active'
              ? '✨ Nessun elemento attivo'
              : '✅ Nessun elemento completato'}
          </p>
        </div>
      ) : (
        <ul className="items-list">
          {filteredItems.map(item => (
            <li key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
              <div className="item-content">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item.id)}
                  className="item-checkbox"
                />
                <span className="item-title">{item.title}</span>
              </div>
              <button 
                onClick={() => handleRemove(item.id)}
                className="btn btn-danger btn-small"
                title={isAdmin ? 'Rimuovi' : 'Solo admin'}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {/* Sommario */}
      {items.length > 0 && (
        <div className="summary">
          <span>📊 Totale: {items.length} elementi</span>
          <span>🔵 Attivi: {activeCount}</span>
          <span>✅ Completati: {completedCount}</span>
        </div>
      )}
    </div>
  );
};