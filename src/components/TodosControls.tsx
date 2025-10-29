import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import { addTodo } from '../features/todos/todosSlice'
import { selectIsAdmin } from '../features/auth/authSlice'

export default function TodosControls() {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')
  const isAdmin = useAppSelector(selectIsAdmin)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo({ text }))
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nuovo todo..."
        style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: isAdmin ? '#007bff' : '#6c757d', color: 'white', cursor: isAdmin ? 'pointer' : 'not-allowed' }} disabled={!isAdmin}>
        Aggiungi
      </button>
      {!isAdmin && <small style={{color: '#dc3545'}}>Solo gli admin possono aggiungere todo.</small>}
    </form>
  )
}
