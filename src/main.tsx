import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UsuarioProvider } from "./store/UsuarioProvider";
import { NotificacaoProvider } from "./store/NotificacaoProvider";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      cacheTime: 300_000, // 5 min
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsuarioProvider>
        <NotificacaoProvider>
          <RouterProvider router={router} />
        </NotificacaoProvider>
      </UsuarioProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
