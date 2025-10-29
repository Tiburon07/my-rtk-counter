import TodosControls from './TodosControls'
import TodosList from './TodosList'

export default function TodosPanel() {
  return (
    <section style={card}>
      <h2 style={{ marginTop: 0 }}>Todo List</h2>
      <TodosControls />
      <TodosList />
    </section>
  )
}

const card: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  maxWidth: 560,
  display: 'flex',
  gap: 12,
  flexDirection: 'column',
  marginTop: 24,
}
