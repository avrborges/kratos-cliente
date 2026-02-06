import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agrupa por id+color+talle
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
      );
      if (found) {
        return prev.map((i) =>
          i === found ? { ...i, quantity: Number(i.quantity || 1) + Number(item.quantity || 1) } : i
        );
      }
      return [...prev, { ...item, quantity: Number(item.quantity) || 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => setCart([]);

  // ⬇️ NUEVO: setear cantidad exacta
  const setItemQuantity = (index, qty) => {
    const q = Math.max(1, Number(qty) || 1);
    setCart((prev) =>
      prev.map((i, idx) => (idx === index ? { ...i, quantity: q } : i))
    );
  };

  // ⬇️ NUEVO: incrementar cantidad
  const incrementItem = (index) => {
    setCart((prev) =>
      prev.map((i, idx) => {
        if (idx !== index) return i;
        const current = Number(i.quantity || 1);
        const max = Number(i.stock ?? Infinity);
        const next = Math.min(current + 1, max);
        return { ...i, quantity: next };
      })
    );
  };

  // ⬇️ NUEVO: decrementar cantidad (si queda en 0, elimina el ítem)
  const decrementItem = (index) => {
    setCart((prev) =>
      prev.flatMap((i, idx) => {
        if (idx !== index) return [i];
        const current = Number(i.quantity || 1);
        if (current <= 1) return []; // si baja de 1, lo removemos
        return [{ ...i, quantity: current - 1 }];
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        setItemQuantity,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};