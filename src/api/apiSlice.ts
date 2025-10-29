import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import type { Todo } from "../types";

 
export const apiSlice = createApi({
  // 1. Definiamo il reducerPath (nome univoco)
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
 
  // 2. Colleghiamo il nostro adattatore Axios come baseQuery
  baseQuery: axiosBaseQuery(),
 
  // 3. Definiamo i "tag" per l'invalidazione della cache
  tagTypes: ["Todos"],
 
  // 4. Definiamo gli endpoints
  endpoints: (builder) => ({
    // Query: Recupera tutti i todos
    // Tipo di Ritorno: Todo[] (array di Todo)
    // Tipo di Argomento: void (nessun argomento)
    getTodos: builder.query<Todo[], void>({
      query: () => ({ url: "todos", method: "GET" }),
      // Specifica quale tag viene "fornito" da questa query
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos" as const, id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),
 
    // Query con argomenti: Recupera i todos di un utente
    // Tipo di Ritorno: Todo[]
    // Tipo di Argomento: number (l'ID dell'utente)
    getUserTodos: builder.query<Todo[], number>({
      query: (userId) => ({
        url: "todos",
        method: "GET",
        // 'params' viene usato da Axios per creare l'URL query string
        params: { userId },
      }),
      providesTags: (userId) => [
        { type: "Todos", id: `USER-${userId}` },
      ],
    }),
 
    // Mutation: Aggiunge un nuovo todo
    // Tipo di Ritorno: Todo (il todo creato dall'API)
    // Tipo di Argomento: Partial<Todo> (un oggetto todo parziale)
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "todos",
        method: "POST",
        data: body, // 'data' viene usato da Axios come body della richiesta
      }),
      // Specifica quale tag viene "invalidato" (causando un refetch)
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});
 
// 5. Esportiamo gli Hooks auto-generati (tipizzati)
export const { useGetTodosQuery, useGetUserTodosQuery, useAddTodoMutation } =
  apiSlice;