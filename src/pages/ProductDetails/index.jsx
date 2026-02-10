import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI
import { Button, Rating, Chip } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Components
import ProductZoom from "../../components/ProductZoom";
import ProductTabs from "../../components/ProductTabs";
import QuantitySelector from "../../components/QuantitySelector";

// Context
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

// Helpers separados
import {
  currencyAR,
  computeOfferPrice,
  isOutOfStock,
  isLowStock,
  isItemInWishlist,
  buildCartItem,
} from "./productDetails.helpers";

const ProductDetails = () => {
  const { state } = useLocation();
  const item = state;

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Wishlist
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite = isItemInWishlist(wishlist, item);

  const { isLoggedIn } = useAuth();

  const offerPrice = useMemo(() => computeOfferPrice(item), [item]);

  const outOfStock = isOutOfStock(item);
  const lowStock = isLowStock(item);
  const showDiscount = Number(item?.discount) > 0;

  const handleToggleFavorite = () => {
    if (!item) return;
    if (isFavorite) removeFromWishlist(item.id);
    else addToWishlist(item);
  };

  const handleAddToCart = () => {
    if (!item) return;
    const newCartItem = buildCartItem(
      item,
      offerPrice,
      selectedSize,
      selectedColor,
      quantity
    );
    console.log("AGREGADO AL CARRITO:", newCartItem);
  };

  if (!item) {
    return (
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow">
            <p className="text-gray-700">Cargando detalles del producto…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Galería */}
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow overflow-hidden">
          {item.images?.length ? (
            <ProductZoom images={item.images} />
          ) : (
            <div className="aspect-[4/3] bg-gray-100" />
          )}
        </div>

        {/* Info */}
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow p-6 flex flex-col">

          {/* Marca + título */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              {item.brand && (
                <div className="text-xs text-gray-500 uppercase">
                  {item.brand}
                </div>
              )}
              <h1 className="text-[26px] font-semibold text-gray-900 mt-1">
                {item.name}
              </h1>
            </div>

            {/* Favorito */}
            <Tooltip
              arrow
              title={
                !isLoggedIn
                  ? "Iniciá sesión para agregar a favoritos"
                  : isFavorite
                  ? "Quitar de favoritos"
                  : "Agregar a favoritos"
              }
            >
              <span>
                <button
                  onClick={() => isLoggedIn && handleToggleFavorite()}
                  disabled={!isLoggedIn}
                  className="
                    w-10 h-10 flex items-center justify-center
                    rounded-full ring-1 ring-gray-200 bg-white
                    transition-all shadow-sm
                    hover:bg-gray-100 hover:shadow-md hover:-translate-y-[1px]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isFavorite ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon className="text-gray-700" />
                  )}
                </button>
              </span>
            </Tooltip>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-3">
            <Rating
              value={Number(item.rating) || 0}
              readOnly
              size="small"
              precision={0.5}
            />
            <span className="text-[13px] text-gray-600 cursor-pointer">
              Reviews ({item.reviews || 0})
            </span>
          </div>

          {/* Precios + Stock */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {showDiscount && (
              <span className="text-[16px] line-through text-gray-500">
                {currencyAR(Number(item.price))}
              </span>
            )}

            <span className="text-[24px] font-bold text-gray-900">
              {currencyAR(offerPrice)}
            </span>

            {showDiscount && (
              <Chip
                label={`${item.discount}% OFF`}
                size="small"
                sx={{
                  borderRadius: "9999px",
                  bgcolor: "rgba(225,29,72,0.1)",
                  color: "rgb(190,18,60)",
                  fontWeight: 600,
                }}
              />
            )}

            {lowStock && (
              <Chip
                label="Últimos disponibles"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(245,158,11,0.12)",
                  color: "rgb(180,83,9)",
                  fontWeight: 600,
                }}
              />
            )}

            {outOfStock && (
              <Chip
                label="Sin stock"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(229,231,235,0.7)",
                  color: "rgb(75,85,99)",
                  fontWeight: 600,
                }}
              />
            )}
          </div>

          {/* Descripción */}
          {item.description && (
            <p className="text-[14px] text-gray-700 mb-5 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Talles */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[14px] text-gray-800 font-semibold">Talles:</span>

            {item.size?.length ? (
              item.size.map((size, i) => {
                const selected = selectedSize === size;
                return (
                  <button
                    key={i}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    className={`
                      px-3 py-2 text-sm rounded-lg border 
                      transition-all
                      ${
                        outOfStock
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : selected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })
            ) : (
              <span className="text-gray-500 text-[14px]">
                No hay talles disponibles
              </span>
            )}
          </div>

          {/* Colores */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[14px] text-gray-800 font-semibold">Colores:</span>

            {item.colors?.length ? (
              item.colors.map((color, i) => {
                const selected = selectedColor === color.name;
                return (
                  <button
                    key={i}
                    onClick={() => !outOfStock && setSelectedColor(color.name)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition 
                      ${outOfStock ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
                      ${selected ? "border-gray-900 scale-110" : "border-gray-300"}
                    `}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })
            ) : (
              <span className="text-gray-500 text-[14px]">
                No hay colores disponibles
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-4">
            <QuantitySelector
              stock={item.stock}
              onChange={(qty) => setQuantity(qty)}
            />

            <Tooltip
              arrow
              title={
                !isLoggedIn
                  ? "Iniciá sesión para comprar"
                  : outOfStock
                  ? "Sin stock"
                  : !selectedSize || !selectedColor
                  ? "Seleccioná talle y color"
                  : "Agregar al carrito"
              }
            >
              <span>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={
                    !isLoggedIn || outOfStock || !selectedSize || !selectedColor
                  }
                  onClick={handleAddToCart}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    bgcolor: outOfStock ? "grey.300" : "black",
                    color: outOfStock ? "text.disabled" : "white",
                    "&:hover": outOfStock
                      ? {}
                      : { bgcolor: "grey.900", transform: "translateY(-1px)" },
                  }}
                >
                  {!isLoggedIn
                    ? "Iniciá sesión"
                    : outOfStock
                    ? "Sin stock"
                    : "Agregar al carrito"}
                </Button>
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Tabs de producto */}
      <div className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow p-4">
          <ProductTabs item={item} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;