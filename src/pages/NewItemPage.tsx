import { type FormEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hook';
import { addItem } from '../features/items/itemsSlice';

export default function NewItemPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const action = dispatch(addItem(title.trim(), note.trim() || undefined));
    navigate(`/items/${action.payload.id}`);
  };

  return (
    <section style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/items">← Torna alla lista</Link>
      </nav>
      <h1>Nuovo elemento</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '.5rem', marginTop: '1rem' }}>
        <input placeholder="Titolo" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Nota (opzionale)" rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="submit">Crea</button>
      </form>
    </section>
  );
}