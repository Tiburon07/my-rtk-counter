import React from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { selectIsAdmin, toggleAdmin } from '../features/auth/authSlice';



export const RoleToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  
  const handleToggle = () => {
    dispatch(toggleAdmin());
  };
  
  return (
    <div className="role-toggle">
      <h3>Gestione Ruolo</h3>
      <p className={`role-status ${isAdmin ? 'admin' : 'user'}`}>
        Sei Admin: <strong>{isAdmin ? 'Sì ✅' : 'No ❌'}</strong>
      </p>
      <button 
        onClick={handleToggle}
        className={`btn ${isAdmin ? 'btn-danger' : 'btn-primary'}`}
      >
        {isAdmin ? 'Esci da Admin' : 'Diventa Admin'}
      </button>
    </div>
  );
};