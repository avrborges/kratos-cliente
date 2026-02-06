import React, { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Tooltip,
  Rating,
  Chip,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Contextos
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// Tu selector de cantidad existente
import QuantitySelector from "../QuantitySelector";

/* -------- Helpers -------- */
const currencyAR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
    : null;

/**
 * QuickViewModal SIN SCROLL VERTICAL INTERNO
 * - Altura fija y responsiva
 * - Layout en 2 columnas; elementos compactados
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - item: {
 *     id, name, brand, images[], price, offerprice, discount, rating, reviews,
 *     stock, size[], colors[{name,hex}]
 *   }
 * - onAdded?: (cartItem) => void
 * - onGoToDetails?: (item) => void
 */
const QuickViewModal = ({ open, onClose, item, onAdded, onGoToDetails }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 🎯 Alturas objetivo (sin scroll)
  const HEADER_H = 56; // px
  const TARGET_HEIGHT_DESKTOP = 600; // ajustable (560–640 suelen ir bien)
  const TARGET_WIDTH_DESKTOP = 980;  // ajustable

  // Auth + Wishlist
  const { isLoggedIn } = useAuth();
  const { wishlist = [], addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite =
    !!item && Array.isArray(wishlist) && wishlist.some((w) => w.id === item.id);

  // Selecciones
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Precargar selecciones sugeridas al abrir
  useEffect(() => {
    if (!open || !item) return;
    setQuantity(1);
    setSelectedSize(
      Array.isArray(item?.size) && item.size.length > 0 ? item.size[0] : null
    );
    setSelectedColor(
      Array.isArray(item?.colors) && item.colors.length > 0
        ? item.colors[0]?.name
        : null
    );
  }, [open, item]);

  // Derivados
  const isOutOfStock = Number(item?.stock) === 0;
  const lowStock = Number(item?.stock) > 0 && Number(item?.stock) <= 5;
  const showDiscount = Number(item?.discount) > 0;
  const mainImage =
    Array.isArray(item?.images) && item.images.length > 0 ? item.images[0] : "";

  const originalPrice = Number(item?.price) || 0;
  const offerPrice = useMemo(() => {
    if (Number(item?.offerprice)) return Number(item.offerprice);
    if (showDiscount) return originalPrice * (1 - Number(item.discount) / 100);
    return originalPrice;
  }, [item, originalPrice, showDiscount]);

  const canAdd =
    isLoggedIn &&
    !isOutOfStock &&
    (Array.isArray(item?.size) ? !!selectedSize : true) &&
    (Array.isArray(item?.colors) ? !!selectedColor : true) &&
    Number(quantity) > 0;

  const tooltipText = !isLoggedIn
    ? "Iniciá sesión para agregar productos al carrito"
    : isOutOfStock
    ? "Sin stock"
    : Array.isArray(item?.size) && !selectedSize
    ? "Seleccioná talle"
    : Array.isArray(item?.colors) && !selectedColor
    ? "Seleccioná color"
    : "Agregar al carrito";

  // Handlers
  const handleToggleFavorite = () => {
    if (!item || !isLoggedIn) return;
    if (isFavorite) removeFromWishlist(item.id);
    else addToWishlist(item);
  };

  // Add Cart
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!canAdd || !item) return;
    const cartItem = {
      id: item.id,
      name: item.name,
      price: offerPrice,
      image: mainImage,
      size: selectedSize || null,
      color: selectedColor || null,
      quantity: Number(quantity) || 1,
    };
    // TODO: integrar con CartContext → addToCart(cartItem)
    console.log("AGREGADO AL CARRITO (QuickView):", cartItem);
    addToCart(cartItem);
    onClose?.();
  };

  const handleGoToDetails = () => {
    if (!item) return;
    onClose?.();
    if (onGoToDetails) onGoToDetails(item);
    else navigate(`/productdetails/${item?.id}`, { state: item });
  };

  if (!item) return null;



  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Importante: deshabilitar scroll dentro del papel del diálogo
      scroll="paper"
      PaperProps={{
        sx: {
          // Tamaño fijo por breakpoint para evitar scroll interno
          width: isMobile ? "100vw" : TARGET_WIDTH_DESKTOP,
          maxWidth: "96vw",
          height: isMobile ? "100vh" : TARGET_HEIGHT_DESKTOP,
          maxHeight: isMobile ? "100vh" : TARGET_HEIGHT_DESKTOP,
          overflow: "hidden",
          borderRadius: isMobile ? 0 : 3,
          bgcolor: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* HEADER (altura fija) */}
      <div
        className="flex items-center justify-between px-3 lg:px-4"
        style={{
          height: HEADER_H,
          borderBottom: "1px solid #e5e7eb",
          flex: "0 0 auto",
        }}
      >
        <div className="flex items-center gap-2">
          {item?.brand ? (
            <span className="text-xs tracking-wide text-gray-500 uppercase">
              {item.brand}
            </span>
          ) : (
            <span className="text-xs text-transparent select-none">.</span>
          )}

          {lowStock && (
            <span className="ml-2 inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
              Últimos disponibles
            </span>
          )}
          {showDiscount && (
            <span className="ml-2 inline-flex items-center rounded-full bg-rose-600/90 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
              {item.discount}% OFF
            </span>
          )}
        </div>

        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            "&:hover": { bgcolor: "grey.100" },
          }}
          aria-label="Cerrar"
        >
          <CloseIcon className="text-gray-700" />
        </IconButton>
      </div>

      {/* BODY: grilla SIN scroll, ocupa el resto exacto */}
      <DialogContent
        sx={{
          p: 0,
          flex: "1 1 auto",
          height: `calc(100% - ${HEADER_H}px)`,
          overflow: "hidden", // 🔒 evita scroll
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gridTemplateRows: "1fr",
          gap: 0,
        }}
      >
        {/* IZQUIERDA: Imagen ocupa toda la altura disponible de su columna */}
        <div
          className="border-r border-gray-100"
          style={{ overflow: "hidden", display: "flex", padding: isMobile ? 12 : 16 }}
        >
          <div
            className="rounded-xl ring-1 ring-gray-200 bg-gray-50 shadow-sm"
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {mainImage ? (
              <img
                src={mainImage}
                alt={item?.name || "Producto"}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#f3f4f6" }} />
            )}
          </div>
        </div>

        {/* DERECHA: Grilla compacta sin overflow */}
        <div
          style={{
            padding: isMobile ? 12 : 16,
            display: "grid",
            gridTemplateRows:
              // Secuencia: título + rating + precio + selects + qty + estado + CTAs
              "auto auto auto auto auto auto auto",
            rowGap: isMobile ? 8 : 10,
            overflow: "hidden",
          }}
        >
          {/* Título + Favorito */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[18px] lg:text-[20px] leading-tight font-semibold tracking-tight text-gray-900 line-clamp-2">
              {item?.name}
            </h2>

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
                  onClick={handleToggleFavorite}
                  disabled={!isLoggedIn}
                  className={`
                    w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center
                    rounded-full ring-1 ring-gray-200 bg-white
                    transition-all shadow-sm
                    ${
                      isLoggedIn
                        ? "hover:bg-gray-100 hover:shadow-md hover:-translate-y-[1px]"
                        : "opacity-50 cursor-not-allowed"
                    }
                  `}
                  aria-label="Favorito"
                >
                  {isFavorite ? (
                    <FavoriteIcon className="text-red-500" fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon className="text-gray-700" fontSize="small" />
                  )}
                </button>
              </span>
            </Tooltip>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Rating
              value={Number(item?.rating) || 0}
              readOnly
              size="small"
              precision={0.5}
            />
            <span className="text-[12px] text-gray-500">
              Reviews ({item?.reviews || 0})
            </span>
          </div>

          {/* Precios */}
          <div className="flex items-center gap-3">
            {showDiscount && currencyAR(originalPrice) ? (
              <span className="text-[14px] text-gray-500 line-through">
                {currencyAR(originalPrice)}
              </span>
            ) : null}
            <span className="text-[20px] lg:text-[22px] font-bold text-gray-900">
              {currencyAR(offerPrice)}
            </span>
          </div>

          {/* Selector de talles (fila compacta) */}
          <div>
            {Array.isArray(item?.size) && item.size.length > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] text-gray-800 font-semibold">Talle:</span>
                <div className="flex flex-wrap gap-1.5">
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
                          "px-2.5 py-1.5 text-[12px] font-semibold rounded-md border transition-all",
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
              </div>
            ) : (
              <span className="text-[12px] text-gray-500">No requiere talle</span>
            )}
          </div>

          {/* Selector de colores (fila compacta) */}
          <div>
            {Array.isArray(item?.colors) && item.colors.length > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] text-gray-800 font-semibold">Color:</span>
                <div className="flex flex-wrap gap-1.5">
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
                          "w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center",
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
              </div>
            ) : (
              <span className="text-[12px] text-gray-500">No requiere color</span>
            )}
          </div>

          {/* Cantidad (compacto) */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-800 font-semibold">Cantidad:</span>
            <QuantitySelector stock={item?.stock} onChange={(qty) => setQuantity(qty)} />
          </div>

          {/* Estado de stock */}
          <div>
            {lowStock ? (
              <Chip
                label="Últimos disponibles"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(245,158,11,0.12)",
                  color: "rgb(180,83,9)",
                  fontWeight: 600,
                  height: 26,
                }}
              />
            ) : isOutOfStock ? (
              <Chip
                label="Sin stock"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(229,231,235,0.7)",
                  color: "rgb(75,85,99)",
                  fontWeight: 600,
                  height: 26,
                }}
              />
            ) : (
              <Chip
                label="En stock"
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(16,185,129,0.12)",
                  color: "rgb(5,122,85)",
                  fontWeight: 600,
                  height: 26,
                }}
              />
            )}
          </div>

          {/* CTAs (alineados, sin overflow) */}
          <div className="flex flex-col gap-2">
            <Tooltip arrow title={tooltipText}>
              <span>
                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  disabled={!canAdd}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    height: 44,
                    bgcolor: !canAdd ? "grey.300" : "black",
                    color: !canAdd ? "text.disabled" : "white",
                    boxShadow: !canAdd ? "none" : "0 8px 20px rgba(0,0,0,0.25)",
                    "&:hover": !canAdd
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

            <Button
              variant="text"
              onClick={handleGoToDetails}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "text.primary",
                "&:hover": { bgcolor: "grey.100" },
                borderRadius: 2,
                height: 40,
              }}
              fullWidth
            >
              Ver detalles del producto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;