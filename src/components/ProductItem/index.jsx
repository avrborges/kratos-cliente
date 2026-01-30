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
const ProductItem = ({
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
        "group relative rounded-xl overflow-hidden bg-white h-full",
        "shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5",
        "transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]",
        "flex flex-col",
      ].join(" ")}
    >
      {/* ---------- Imagen ---------- */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full aspect-[4/3]">
          {item?.images?.[0] ? (
            <img
              src={item.images[0]}
              alt={item?.name || "Producto"}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
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

        {/* Acciones flotantes */}
        <div
          className={[
            "pointer-events-none absolute right-3 top-3 flex flex-col gap-2",
            "translate-y-[-14px] opacity-0 transition-all duration-300",
            "group-hover:translate-y-0 group-hover:opacity-100",
          ].join(" ")}
        >
          <Tooltip title="Vista rápida" arrow>
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(item);
                navigate(`/productdetails/${item?.id}`, { state: item });
              }}
              className="pointer-events-auto"
              sx={{
                minWidth: 42,
                width: 42,
                height: 42,
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
              onClick={(e) => {
                e.stopPropagation();
                onWishlist(item);
              }}
              className="pointer-events-auto"
              sx={{
                minWidth: 42,
                width: 42,
                height: 42,
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
              onClick={(e) => {
                e.stopPropagation();
                onShare(item);
              }}
              className="pointer-events-auto"
              sx={{
                minWidth: 42,
                width: 42,
                height: 42,
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

      {/* ---------- Info (altura consistente) ---------- */}
      <div className="flex flex-col gap-2 px-4 py-4 bg-white flex-1">
        {/* Marca */}
        {item?.brand && (
          <div className="text-xs tracking-wide text-gray-500 uppercase">
            {item.brand}
          </div>
        )}

        {/* Título (slot fijo) */}
        <Link to={`/productdetails/${item?.id}`} state={item}>
          <h3
            className="text-[15px] font-semibold text-gray-900 hover:text-gray-700 transition-colors line-clamp-2 min-h-[40px]"
            title={item?.name}
          >
            {item?.name}
          </h3>
        </Link>

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
            // placeholder invisible para conservar altura
            <div className="text-[11px] opacity-0 select-none">.</div>
          )}
        </div>

        {/* Precios (slot fijo) */}
        <div className="mt-1 min-h-[44px] flex items-end justify-between">
          <div className="flex flex-col">
            {showDiscount && currencyAR(originalPrice) ? (
              <span className="text-xs text-gray-500 line-through">
                {currencyAR(originalPrice)}
              </span>
            ) : (
              // Mantener línea de precio original aunque no exista descuento
              <span className="text-xs text-transparent select-none leading-4">.</span>
            )}

            {currencyAR(offerPrice) ? (
              <span className="text-xl font-bold text-gray-900">
                {currencyAR(offerPrice)}
              </span>
            ) : (
              // Si no hay precio, mantener espacio
              <span className="text-xl font-bold text-transparent select-none">
                .
              </span>
            )}
          </div>

          {/* espacio complementario para mantener layout simétrico */}
          <div className="w-8 h-4" />
        </div>

        {/* Botón minimalista debajo del precio (slot fijo por padding inferior) */}
        <div className="mt-2">
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

export default memo(ProductItem);