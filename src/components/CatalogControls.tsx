import React, { useState } from 'react';
import { addItem } from '../features/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import { selectIsAdmin } from '../features/auth/authSlice';
import { resetAll } from '../features/ui/uiSlice';


export const CatalogControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  
  const handleAdd = () => {
    if (title.trim()) {
      if (isAdmin) {
        setTitle('');
        setError('');
        dispatch(addItem({ title: title.trim() }));
      } else {
        setError('⚠️ Solo gli admin possono aggiungere elementi!');
        setTimeout(() => setError(''), 3000);
      }
    }
  };
  
  const handleReset = () => {
    if (confirm('Sei sicuro di voler resettare tutto il catalogo?')) {
      dispatch(resetAll());
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };
  
  return (
    <div className="catalog-controls">
      <h3>Controlli Catalogo</h3>
      
      <div className="add-item-section">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Titolo elemento..."
          className="input-text"
        />
        <button 
          onClick={handleAdd}
          disabled={!title.trim()}
          className="btn btn-primary"
        >
          Aggiungi Elemento
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <button 
        onClick={handleReset}
        className="btn btn-warning"
      >
        🔄 Reset Catalogo
      </button>
    </div>
  );
};