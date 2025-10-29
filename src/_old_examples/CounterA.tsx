import { useState } from 'react'

import { decrement, increment, incrementByAmount, selectCount } from '../features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../hook'
 
export default function CounterA() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [step, setStep] = useState<number>(5)
 
  return (
    <section style={cardStyle}>
      <h2 style={{ margin: 0 }}>Counter A</h2>
      <p aria-label="current count" style={countStyle}>{count}</p>
 
      <div style={rowStyle}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
      </div>
 
      <div style={rowStyle}>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ width: 80 }}
        />
        <button onClick={() => dispatch(incrementByAmount(step))}>
          +{step}
        </button>
      </div>
 
      <small>Questo componente legge e aggiorna lo stesso store globale.</small>
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
 
const rowStyle: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' }
const countStyle: React.CSSProperties = { fontSize: 40, margin: '8px 0' }