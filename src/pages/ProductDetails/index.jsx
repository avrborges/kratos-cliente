import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Rating, Chip } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from "@mui/icons-material/Check";
import ProductZoom from "../../components/ProductZoom";
import ProductTabs from "../../components/ProductTabs";
import QuantitySelector from "../../components/QuantitySelector";
// Context
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

/* -------- Helpers -------- */
const currencyAR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
    : null;

const ProductDetails = () => {
  const { state } = useLocation();
  const item = state; // se espera que venga desde ProductListing/ProductItem o WishlistDrawer

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // ---- Wishlist ----
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite =
    !!item && Array.isArray(wishlist) && wishlist.some((w) => w.id === item.id);

  // Auth
  const { isLoggedIn } = useAuth();

  const handleToggleFavorite = () => {
    if (!item) return;
    if (isFavorite) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const isOutOfStock = Number(item?.stock) === 0;
  const lowStock = Number(item?.stock) > 0 && Number(item?.stock) <= 5;
  const showDiscount = Number(item?.discount) > 0;

  const originalPrice = Number(item?.price) || 0;
  const offerPrice = useMemo(() => {
    if (Number(item?.offerprice)) return Number(item.offerprice);
    if (showDiscount) return originalPrice * (1 - Number(item.discount) / 100);
    return originalPrice;
  }, [item, originalPrice, showDiscount]);

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    if (!item) return;
    const productToCart = {
      id: item.id,
      name: item.name,
      price: offerPrice,
      image: item?.images?.[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };
    console.log("AGREGADO AL CARRITO:", productToCart);
  };

  // /* ========== Compartir (Web Share API + Fallback) ========== */
  // const [copied, setCopied] = useState(false);

  // const buildShareData = () => {
  //   // armamos título/texto y URL del producto
  //   const url = window.location.origin + `/productdetails/${item?.id}`;
  //   return {
  //     title: item?.name || "Producto",
  //     text: item?.description
  //       ? item.description.slice(0, 120) + (item.description.length > 120 ? "..." : "")
  //       : "Mirá este producto",
  //     url,
  //   };
  // };

  // const handleShare = async () => {
  //   if (!item) return;
  //   const shareData = buildShareData();

  //   // 1) Web Share API si está disponible
  //   if (navigator.share) {
  //     try {
  //       await navigator.share(shareData);
  //       return;
  //     } catch (err) {
  //       // Si cancela o falla, continuamos al fallback de clipboard
  //       console.warn("navigator.share falló o se canceló. Fallback al portapapeles.", err);
  //     }
  //   }

  //   // 2) Fallback: copiar al portapapeles
  //   try {
  //     await navigator.clipboard.writeText(shareData.url);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 1600);
  //   } catch (err) {
  //     console.error("No se pudo copiar la URL al portapapeles", err);
  //   }
  // };

  if (!item) {
    return (
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
            <p className="text-gray-700">Cargando detalles del producto…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* -------- Galería -------- */}
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          {Array.isArray(item.images) && item.images.length > 0 ? (
            <ProductZoom images={item.images} />
          ) : (
            <div className="aspect-[4/3] bg-gray-100" />
          )}
        </div>

        {/* -------- Info -------- */}
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-6 flex flex-col">
          {/* Marca + título + acciones (favorito + compartir) */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              {item.brand ? (
                <div className="text-xs tracking-wide text-gray-500 uppercase">
                  {item.brand}
                </div>
              ) : null}
              <h1 className="text-[26px] leading-tight font-semibold tracking-tight text-gray-900 mt-1">
                {item.name}
              </h1>
            </div>

            {/* Acciones lado derecho */}
            <div className="flex items-center gap-2">
              {/* ❤️ Favorito */}
              <Tooltip
                arrow
                title={
                  !isLoggedIn
                    ? "Iniciá sesión para ver tus favoritos"
                    : isFavorite
                    ? "Quitar de favoritos"
                    : "Agregar a favoritos"
                }
              >
                <span>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) return; // Evita acción si no hay sesión
                      handleToggleFavorite();
                    }}
                    disabled={!isLoggedIn}
                    aria-label={
                      isLoggedIn
                        ? isFavorite
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                        : "Iniciá sesión para ver tus favoritos"
                    }
                    className={`
                      w-10 h-10 flex items-center justify-center
                      rounded-full ring-1 ring-gray-200 bg-white
                      transition-all shadow-sm
                      ${
                        isLoggedIn
                          ? "hover:bg-gray-100 hover:shadow-md hover:-translate-y-[1px]"
                          : "opacity-50 cursor-not-allowed"
                      }
                    `}
                  >
                    {isFavorite ? (
                      <FavoriteIcon className="text-red-500" />
                    ) : (
                      <FavoriteBorderIcon className="text-gray-700" />
                    )}
                  </button>
                </span>
              </Tooltip>

              {/* 🔗 Compartir */}
              {/* <Tooltip
                arrow
                title={
                  navigator.share
                    ? "Compartir"
                    : copied
                    ? "¡Enlace copiado!"
                    : "Copiar enlace"
                }
              >
                <button
                  // onClick={handleShare}
                  aria-label="Compartir producto"
                  className="
                    w-10 h-10 flex items-center justify-center
                    rounded-full ring-1 ring-gray-200 bg-white
                    hover:bg-gray-100 transition-all
                    shadow-sm hover:shadow-md hover:-translate-y-[1px]
                  "
                >
                  {copied ? (
                    <CheckIcon className="text-emerald-600" />
                  ) : (
                    <ShareIcon className="text-gray-700" />
                  )}
                </button>
              </Tooltip> */}
            </div>
          </div>

          {/* Rating + reviews */}
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

          {/* Precios + badges */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {showDiscount && currencyAR(originalPrice) ? (
              <span className="text-[16px] text-gray-500 line-through">
                {currencyAR(originalPrice)}
              </span>
            ) : null}
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
            {isOutOfStock && (
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
            {!isOutOfStock && !lowStock && (
              <Chip
                label="En stock"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(16,185,129,0.12)",
                  color: "rgb(5,122,85)",
                  fontWeight: 600,
                }}
              />
            )}
          </div>

          {/* Descripción corta */}
          {item.description ? (
            <p className="text-[14px] text-gray-700 mb-5 leading-relaxed">
              {item.description}
            </p>
          ) : null}

          {/* Talles */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className="text-[14px] text-gray-800 font-semibold">
              Talles:
            </span>
            {Array.isArray(item.size) && item.size.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.size.map((size, idx) => {
                  const selected = selectedSize === size;
                  const disabled = isOutOfStock;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && setSelectedSize(size)}
                      className={[
                        "px-3 py-2 text-sm font-semibold rounded-lg border transition-all",
                        disabled
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : selected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-500 text-[14px]">
                No hay talles disponibles
              </span>
            )}
          </div>

          {/* Colores */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="text-[14px] text-gray-800 font-semibold">
              Colores:
            </span>
            {Array.isArray(item.colors) && item.colors.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.colors.map((color, idx) => {
                  const isSelected = selectedColor === color.name;
                  const disabled = isOutOfStock;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => !disabled && setSelectedColor(color.name)}
                      disabled={disabled}
                      aria-label={color.name}
                      title={color.name}
                      className={[
                        "w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center",
                        disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer hover:scale-105",
                        isSelected ? "border-gray-900 scale-110" : "border-gray-300",
                      ].join(" ")}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-500 text-[14px]">
                No hay colores disponibles
              </span>
            )}
          </div>

          {/* Cantidad + CTA */}
          <div className="mt-auto flex items-center gap-4 w-full">
            <QuantitySelector
              stock={item.stock}
              onChange={(qty) => setQuantity(qty)}
            />
            <Tooltip
              arrow
              title={
                !isLoggedIn
                  ? "Iniciá sesión para agregar productos al carrito"
                  : isOutOfStock
                  ? "Sin stock"
                  : !selectedSize || !selectedColor
                  ? "Seleccioná talle y color"
                  : "Agregar al carrito"
              }
            >
              <span>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (!isLoggedIn) return;
                    if (isOutOfStock || !selectedSize || !selectedColor) return;
                    handleAddToCart();
                  }}
                  disabled={
                    !isLoggedIn || !selectedSize || !selectedColor || isOutOfStock
                  }
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    bgcolor:
                      !isLoggedIn ||
                      !selectedSize ||
                      !selectedColor ||
                      isOutOfStock
                        ? "grey.300"
                        : "black",
                    color:
                      !isLoggedIn ||
                      !selectedSize ||
                      !selectedColor ||
                      isOutOfStock
                        ? "text.disabled"
                        : "white",
                    boxShadow:
                      !isLoggedIn ||
                      !selectedSize ||
                      !selectedColor ||
                      isOutOfStock
                        ? "none"
                        : "0 8px 20px rgba(0,0,0,0.25)",
                    opacity: !isLoggedIn ? 0.5 : 1,
                    "&:hover":
                      !isLoggedIn ||
                      !selectedSize ||
                      !selectedColor ||
                      isOutOfStock
                        ? {}
                        : { bgcolor: "grey.900", transform: "translateY(-1px)" },
                  }}
                  fullWidth
                >
                  {!isLoggedIn
                    ? "Iniciá sesión"
                    : isOutOfStock
                    ? "Sin stock"
                    : "Agregar al carrito"}
                </Button>
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* -------- Tabs de producto -------- */}
      <div className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-4">
          <ProductTabs item={item} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;