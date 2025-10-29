import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { addItem, removeItem, selectAllItems } from '../features/items/itemsSlice';


export default function ItemsListPage() {
  const items = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const action = dispatch(addItem(title.trim(), note.trim() || undefined));
    // opzionale: nav al nuovo item
    navigate(`/items/${action.payload.id}`);
  };

  return (
    <section style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Items</h1>
        <Link to="/items/new">+ Nuovo</Link>
      </header>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '.5rem', margin: '1rem 0' }}>
        <input
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Nota (opzionale)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        <button type="submit">Aggiungi e vai al dettaglio</button>
      </form>

      <ul style={{ display: 'grid', gap: '.5rem' }}>
        {items.map((it) => (
          <li key={it.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #e5e7eb', padding: '.75rem', borderRadius: 8 }}>
            <div>
              <Link to={`/items/${it.id}`} style={{ fontWeight: 600 }}>{it.title}</Link>
              {it.note && <p style={{ margin: '.25rem 0 0', color: '#4b5563' }}>{it.note}</p>}
            </div>
            <button onClick={() => dispatch(removeItem(it.id))}>Elimina</button>
          </li>
        ))}
        {items.length === 0 && <p>Nessun elemento. Aggiungi il primo sopra.</p>}
      </ul>
    </section>
  );
}