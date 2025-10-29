import { useAppSelector, useAppDispatch } from '../hook'
import { selectIsAdmin, setAdmin } from '../features/auth/authSlice'
import styles from './AdminToggle.module.css'

export default function AdminToggle() {

  const isAdmin = useAppSelector(selectIsAdmin)
  const dispatch = useAppDispatch()

  const handleToggle = () => {
    dispatch(setAdmin(!isAdmin))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0' }}>
      <label>Modalità Admin:</label>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={handleToggle}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <span style={{ fontWeight: 'bold', color: isAdmin ? '#28a745' : '#dc3545' }}>
        {isAdmin ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}
