
import { decrement, increment, reset, selectCount } from '../features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../hook'
 
export default function CounterB() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
 
  const parity = count % 2 === 0 ? 'pari' : 'dispari'
 
  return (
    <section style={cardStyle}>
      <h2 style={{ margin: 0 }}>Counter B</h2>
      <p style={countStyle}>{count}</p>
      <p style={{ marginTop: -8, opacity: 0.8 }}>Il numero è {parity}</p>
 
      <div style={rowStyle}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
 
      <small>
        Anche questo componente osserva e modifica lo stesso stato, senza props drilling.
      </small>
    </section>
  )
}
 
const cardStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  width: 280,
  display: 'flex',
  gap: 12,
  flexDirection: 'column',
}
 
const rowStyle: React.CSSProperties = { display: 'flex', gap: 8, flexWrap: 'wrap' }
const countStyle: React.CSSProperties = { fontSize: 40, margin: '8px 0' }