export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
   
  // Interfaccia per la struttura della richiesta che l'endpoint passerà alla baseQuery
  export interface BaseQueryArgs {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: unknown; // Dati per POST/PUT/PATCH (body)
    params?: unknown; // Parametri di query URL (es. ?userId=1)
  }
