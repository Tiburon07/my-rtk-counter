import { useParams, useNavigate, Link } from 'react-router-dom';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { removeItem, selectItemById, updateItem } from '../features/items/itemsSlice';

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const item = useAppSelector((s) => (id ? selectItemById(s, id) : undefined));

  useEffect(() => {
    if (!id) navigate('/items'); // id mancante, rientra in lista
  }, [id, navigate]);

  const [title, setTitle] = useState(item?.title ?? '');
  const [note, setNote] = useState(item?.note ?? '');

  // Sync form quando cambia item (es. hard refresh o nav)
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNote(item.note ?? '');
    }
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const createdAt = useMemo(
    () => (item ? new Date(item.createdAt).toLocaleString() : ''),
    [item?.createdAt]
  );

  if (!item) {
    return (
      <section style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
        <h1>Elemento non trovato</h1>
        <Link to="/items">Torna alla lista</Link>
      </section>
    );
  }

  const onSave = () => {
    if (!title.trim()) return;
    dispatch(updateItem({ id: item.id, title: title.trim(), note: note.trim() || undefined }));
  };

  const onDelete = () => {
    dispatch(removeItem(item.id));
    navigate('/items');
  };

  return (
    <section style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/items">← Torna alla lista</Link>
      </nav>

      <h1>Dettaglio</h1>
      <p style={{ color: '#6b7280' }}>Creato: {createdAt}</p>

      <div style={{ display: 'grid', gap: '.5rem', marginTop: '1rem' }}>
        <label>
          Titolo
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Nota
          <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
          <button onClick={onSave}>Salva</button>
          <button onClick={onDelete}>Elimina</button>
        </div>
      </div>
    </section>
  );
}