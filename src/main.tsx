import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BooleanProvider } from "./routes/BooleanContext";


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
      <BooleanProvider>
        <RouterProvider router={router} />
      </BooleanProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
