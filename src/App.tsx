
import {
  useGetTodosQuery,
  useAddTodoMutation
} from "./api/apiSlice"; // Importiamo gli hooks
import { LoginForm } from "./components/LoginForm";
 
function App() {
  // 1. Chiamiamo l'hook per la query
  const { data: todos, error, isLoading, isFetching } = useGetTodosQuery();
 
  // 2. Chiamiamo l'hook per la mutation
  const [addTodo, { isLoading: isAddingTodo }] = useAddTodoMutation();
 
  const handleAddTodo = async () => {
    try {
      const newTodo = { title: "Nuovo Todo", userId: 1, completed: false };
      await addTodo(newTodo).unwrap();
      // .unwrap() gestisce il "disincartamento" della promise
      // e lancia un errore in caso di fallimento
    } catch (err) {
      console.error("Fallimento aggiunta todo:", err);
    }
  };
 
  // 3. Gestiamo gli stati di caricamento ed errore
  if (isLoading) {
    return <div>Caricamento iniziale...</div>;
  }
 
  if (error) {
    // L'oggetto 'error' avrà la struttura { status: ..., data: ... }
    // che abbiamo definito in axiosBaseQuery
    return <div>Errore nel caricamento dei dati.</div>;
  }
 
  return (
    <div>
      <LoginForm />
      <h1>Lista Todos (RTK Query + Axios)</h1>
      {isFetching && <span>Aggiornamento...</span>}
     
      <button onClick={handleAddTodo} disabled={isAddingTodo}>
        {isAddingTodo ? "Aggiungo..." : "Aggiungi Todo"}
      </button>
 
      {/* 4. Renderizziamo i dati (TypeScript ci dà l'autocomplete!) */}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completato" : "Da fare"}
          </li>
        ))}
      </ul>

      
    </div>
  );
}
 
export default App;