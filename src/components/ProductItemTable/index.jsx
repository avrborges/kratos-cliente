import React, { memo } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ShareIcon from "@mui/icons-material/Share";
import { Link, useNavigate } from "react-router-dom";

/* ---------- Helpers ---------- */
const isNew = (date) => {
  if (!date) return false;
  const created = new Date(date);
  const today = new Date();
  const diffDays = (today - created) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
};

const currencyAR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
    : null;

/* ---------- Componente ---------- */
const ProductItemTable = ({
  item,
  onAddToCart = () => {},
  onQuickView = () => {},
  onWishlist = () => {},
  onShare = () => {},
}) => {
  const navigate = useNavigate();

  const showNew = isNew(item?.createdAt);
  const showDiscount = Number(item?.discount) > 0;
  const isOutOfStock = Number(item?.stock) === 0;
  const lowStock = Number(item?.stock) > 0 && Number(item?.stock) <= 5;

  const originalPrice = Number(item?.price);
  const offerPrice =
    Number(item?.offerprice) ||
    (showDiscount && !isNaN(originalPrice)
      ? originalPrice * (1 - Number(item?.discount) / 100)
      : originalPrice);

  return (
    <div
      className={[
        "productItem flex gap-4 bg-white p-3 relative rounded-xl border border-gray-200",
        "shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)] transition-shadow",
      ].join(" ")}
    >
      {/* ---------- Imagen izquierda (altura consistente) ---------- */}
      <div className="relative w-[180px] h-[180px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
        {item?.images?.[0] ? (
          <img
            src={item.images[0]}
            alt={item?.name || "Producto"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {showDiscount && (
            <span className="inline-flex items-center rounded-full bg-rose-600/90 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
              {item.discount}% OFF
            </span>
          )}
          {showNew && (
            <span className="inline-flex items-center rounded-full bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
              Nuevo
            </span>
          )}
        </div>
      </div>

      {/* ---------- Columna derecha (slots con alturas fijas) ---------- */}
      <div className="flex flex-col w-full">
        {/* Marca */}
        {item?.brand && (
          <div className="text-xs tracking-wide text-gray-500 uppercase">
            {item.brand}
          </div>
        )}

        {/* Título (slot fijo) */}
        <Link to={`/productdetails/${item?.id}`} state={item}>
          <h3
            className="text-[16px] font-semibold leading-tight text-gray-900 hover:text-gray-700 transition-colors line-clamp-2 min-h-[40px]"
            title={item?.name}
          >
            {item?.name}
          </h3>
        </Link>

        {/* Descripción (slot fijo y clamped) */}
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
          {item?.description || ""}
        </p>

        {/* Rating (slot fijo) */}
        <div className="flex items-center gap-2 min-h-[24px]">
          <Rating
            name="read-only"
            value={Number(item?.rating) || 0}
            readOnly
            size="small"
          />
          {item?.ratingCount ? (
            <span className="text-xs text-gray-500">({item.ratingCount})</span>
          ) : (
            <span className="text-xs text-transparent select-none">.</span>
          )}
        </div>

        {/* Mensajes de stock (slot fijo) */}
        <div className="min-h-[24px] flex items-center">
          {lowStock ? (
            <div className="inline-flex w-fit items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
              Últimos disponibles
            </div>
          ) : isOutOfStock ? (
            <div className="inline-flex w-fit items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 ring-1 ring-gray-200">
              Sin stock
            </div>
          ) : (
            <div className="text-[11px] opacity-0 select-none">.</div>
          )}
        </div>

        {/* Precios (slot fijo) */}
        <div className="mt-1 min-h-[44px] flex items-end justify-between">
          <div className="flex flex-col">
            {showDiscount && currencyAR(originalPrice) ? (
              <span className="text-sm text-gray-500 line-through">
                {currencyAR(originalPrice)}
              </span>
            ) : (
              <span className="text-sm text-transparent select-none leading-4">.</span>
            )}

            {currencyAR(offerPrice) ? (
              <span className="text-xl font-bold text-gray-900">
                {currencyAR(offerPrice)}
              </span>
            ) : (
              <span className="text-xl font-bold text-transparent select-none">.</span>
            )}
          </div>

          {/* Acciones (consistencia de alto con botones circulares) */}
          <div className="flex gap-2 self-end">
            <Tooltip title="Vista rápida" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(item);
                  navigate(`/productdetails/${item?.id}`, { state: item });
                }}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  p: 0,
                  borderRadius: "9999px",
                  bgcolor: "rgba(255,255,255,0.85)",
                  color: "text.primary",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  backdropFilter: "blur(6px)",
                  "&:hover": {
                    bgcolor: "rgba(243,244,246,0.95)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ZoomOutMapIcon fontSize="small" />
              </Button>
            </Tooltip>

            <Tooltip title="Favorito" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => onWishlist(item)}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  p: 0,
                  borderRadius: "9999px",
                  bgcolor: "rgba(255,255,255,0.85)",
                  color: "text.primary",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  backdropFilter: "blur(6px)",
                  "&:hover": {
                    bgcolor: "rgba(243,244,246,0.95)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <FavoriteBorderIcon fontSize="small" />
              </Button>
            </Tooltip>

            <Tooltip title="Compartir" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => onShare(item)}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  p: 0,
                  borderRadius: "9999px",
                  bgcolor: "rgba(255,255,255,0.85)",
                  color: "text.primary",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  backdropFilter: "blur(6px)",
                  "&:hover": {
                    bgcolor: "rgba(243,244,246,0.95)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ShareIcon fontSize="small" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* CTA: botón minimalista, siempre en la misma posición */}
        <div className="mt-3">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onAddToCart(item)}
            disabled={isOutOfStock}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              height: 40,
              borderColor: "grey.300",
              color: isOutOfStock ? "text.disabled" : "text.primary",
              bgcolor: "transparent",
              boxShadow: "none",
              "&:hover": isOutOfStock
                ? {}
                : { borderColor: "grey.400", bgcolor: "rgba(0,0,0,0.02)" },
            }}
          >
            {isOutOfStock ? "Sin stock" : "Agregar al carrito"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItemTable);