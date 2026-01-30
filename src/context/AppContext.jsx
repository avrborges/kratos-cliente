
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AppContext = createContext(null);
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext debe usarse dentro de <AppProvider />");
  }
  return ctx;
};
