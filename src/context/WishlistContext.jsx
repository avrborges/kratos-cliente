import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist debe usarse dentro de <WishlistProvider />");
  return ctx;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Persistencia simple en localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (Array.isArray(saved)) setWishlist(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const isInWishlist = (id) => wishlist.some((it) => it.id === id);

  const addToWishlist = (item) => {
    setWishlist((prev) => (prev.some((it) => it.id === item.id) ? prev : [...prev, item]));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((it) => it.id !== id));
  };

  const toggleWishlist = (item) => {
    setWishlist((prev) =>
      prev.some((it) => it.id === item.id)
        ? prev.filter((it) => it.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};