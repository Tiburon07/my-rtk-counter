import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, type AxiosRequestConfig } from "axios";

import type { BaseQueryArgs } from "../types";
import { axiosInstance } from "./axiosInstance";

 
// Definiamo il tipo BaseQueryFn con la nostra struttura
export const axiosBaseQuery =
  (): BaseQueryFn<
    BaseQueryArgs, // Tipo degli argomenti (url, method, data, params)
    unknown, // Tipo del risultato atteso (gestito da 'data' nel successo)
    { status: number | string; data: unknown } // Tipo dell'errore
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      } as AxiosRequestConfig); // Cast per coerenza tipi
 
      // Successo: RTK Query si aspetta un oggetto { data: ... }
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
 
      // Errore: RTK Query si aspetta un oggetto { error: ... }
      return {
        error: {
          status: err.response?.status ?? "UNKNOWN_ERROR",
          data: err.response?.data || err.message,
        },
      };
    }
  };