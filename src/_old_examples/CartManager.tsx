import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from "./CartManager.module.css"
import { addItem, clearCart, removeItem } from "../features/cart/cartSlice"

interface CartItem {
  id: string
  name: string
  price: number
}

const CartManager: React.FC = () => {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state: any) => state.cart)

  const [newItem, setNewItem] = useState<{ name: string; price: number }>({
    name: "",
    price: 0,
  })

  const handleAddItem = () => {
    if (!newItem.name || newItem.price <= 0) return
    const item: CartItem = {
      id: crypto.randomUUID(),
      name: newItem.name,
      price: newItem.price,
    }
    dispatch(addItem(item))
    setNewItem({ name: "", price: 0 })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Il tuo carrello</h2>

      {items.length === 0 ? (
        <p className={styles.empty}>Nessun elemento nel carrello</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item:any) => (
            <li key={item.id} className={styles.item}>
              <div>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>€{item.price.toFixed(2)}</span>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(removeItem(item.id))}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.total}>
        Totale: <strong>€{total.toFixed(2)}</strong>
      </div>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Nome</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Prezzo</label>
          <input
            type="number"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: parseFloat(e.target.value) })
            }
          />
        </div>
        <button className={styles.addBtn} onClick={handleAddItem}>
          Aggiungi
        </button>
      </div>

      <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
        Svuota carrello
      </button>
    </div>
  )
}

export default CartManager
