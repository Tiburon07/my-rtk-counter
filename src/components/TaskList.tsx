import { useDispatch, useSelector } from 'react-redux'
import { selectAllTasks, addTask, toggleTask, removeTask } from '../features/tasks/tasksSlice'
import { resetAll } from '../features/ui/uiSlice'
import type { RootState } from '../store'

 
export function TaskList() {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => selectAllTasks(state))
 
  return (
    <div style={{ padding: 20 }}>
      <h2> Task List</h2>
 
      <button
        onClick={() =>
          dispatch(addTask({ id: Date.now().toString(), title: 'Nuovo task', completed: false }))
        }
      >
        ➕ Aggiungi Task
      </button>
 
      <button style={{ marginLeft: 8 }} onClick={() => dispatch(resetAll())}>
         Reset Tutto
      </button>
 
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            {task.title}
            <button style={{ marginLeft: 8 }} onClick={() => dispatch(removeTask(task.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}