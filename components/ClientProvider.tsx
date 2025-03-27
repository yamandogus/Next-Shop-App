"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { hydrate } from "@/store/features/productSlice";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const storedState = localStorage.getItem("cartState");
      if (storedState) {
        store.dispatch(hydrate(JSON.parse(storedState)));
      }
    } catch (err) {
      console.error("Error hydrating state:", err);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
