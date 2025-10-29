import { useAppSelector, useAppDispatch } from '../hook'
import { removeTodo, selectTodos, toggleTodo, type Todo } from '../features/todos/todosSlice'
import { selectIsAdmin } from '../features/auth/authSlice'

export default function TodosList() {
  const todos = useAppSelector(selectTodos)
  const isAdmin = useAppSelector(selectIsAdmin)
  const dispatch = useAppDispatch()

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {todos.map((todo: Todo) => (
        <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9f9f9', borderRadius: 8 }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', opacity: todo.completed ? 0.6 : 1 }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch(removeTodo(todo.id))} style={{ padding: '4px 8px', borderRadius: 6, border: 'none', background: isAdmin ? '#dc3545' : '#6c757d', color: 'white', cursor: isAdmin ? 'pointer' : 'not-allowed' }} disabled={!isAdmin}>
            Rimuovi
          </button>
        </li>
      ))}
      {!isAdmin && <small style={{color: '#dc3545'}}>Solo gli admin possono rimuovere todo.</small>}
    </ul>
  )
}
