import { selectUser } from "../features/auth/authSlice"
import { useAppSelector } from "../hook"
import AdminToggle from "./AdminToggle"

 
export default function AdminPanel() {

  const user = useAppSelector(selectUser)
 
  return (
    <section style={card}>
      <h2 style={{ marginTop: 0 }}>Admin Panel</h2>
      <div style={row}>
        <strong>User:</strong>
        <span>{user ? `${user.name} (${user.isAdmin ? 'admin' : 'user'})` : 'anonimo'}</span>
      </div>
      <AdminToggle />
    </section>
  )
}
 
const card: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  marginTop: 24,  
  maxWidth: 560,
  display: 'flex',
  gap: 12,
  flexDirection: 'column',
}
 
const row: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
}
