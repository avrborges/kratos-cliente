import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const currency = (v) =>
  typeof v === "number"
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(v)
    : "";

const WishlistDrawer = ({ open, onClose }) => {
  const { wishlist = [], removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleViewAll = () => {
    onClose?.();
    navigate("/wishlist");
  };

  // 🚀 Navegar al detalle pasando también el state
  const handleGoToDetails = (item) => {
    if (!item || (item.id === undefined || item.id === null)) return;
    onClose?.();
    navigate(`/productdetails/${item.id}`, { state: item });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 380,
          maxWidth: "90vw",
          bgcolor: "white",
          borderLeft: "1px solid #e5e7eb",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          display: "flex",
        },
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FavoriteBorderIcon className="text-gray-700" />
          <h2 className="text-[18px] font-semibold tracking-tight text-gray-900">
            Favoritos
          </h2>
          {Array.isArray(wishlist) && wishlist.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">({wishlist.length})</span>
          )}
        </div>

        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "grey.100" },
          }}
          aria-label="Cerrar"
        >
          <CloseIcon className="text-gray-700" />
        </IconButton>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {Array.isArray(wishlist) && wishlist.length > 0 ? (
          wishlist.map((item) => {
            const key = item?.id ?? item?.name ?? JSON.stringify(item);
            const thumb =
              Array.isArray(item?.images) && item.images.length > 0 ? item.images[0] : "";
            const price = currency(item?.offerprice ?? item?.price);

            return (
              <div
                key={key}
                className="
                  flex items-center justify-between gap-4 p-3
                  rounded-xl ring-1 ring-gray-200 bg-white shadow-sm
                  hover:shadow-md hover:-translate-y-[1px] transition-all
                "
              >
                {/* 🔗 Área clickeable para ir al detalle */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleGoToDetails(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleGoToDetails(item);
                    }
                  }}
                  className="flex items-center gap-4 outline-none focus:ring-2 focus:ring-black rounded-lg"
                  aria-label={`Ver detalles de ${item?.name ?? "producto"}`}
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item?.name ?? "Producto"}
                      className="w-16 h-16 object-cover rounded-lg ring-1 ring-gray-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg ring-1 ring-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                      sin imagen
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item?.name ?? "Producto"}
                    </h3>

                    <p className="text-xs text-gray-500 truncate">
                      {(item?.brand ?? "—") + " • " + (item?.category ?? "—")}
                    </p>

                    {typeof (item?.offerprice ?? item?.price) === "number" ? (
                      <div className="flex items-center gap-2 mt-1">
                        {typeof item?.offerprice === "number" ? (
                          <>
                            <span className="text-sm text-gray-900 font-semibold">
                              {currency(item.offerprice)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {currency(item.price)}
                            </span>
                            {typeof item?.discount === "number" && (
                              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                -{item.discount}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-gray-900 font-semibold">
                            {price}
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Precio no disponible</p>
                    )}
                  </div>
                </div>

                {/* Acción secundaria: Quitar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita disparar la navegación
                    removeFromWishlist(item?.id);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                  aria-label={`Quitar ${item?.name ?? "producto"} de favoritos`}
                >
                  <HighlightOffIcon />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            No hay productos en tus favoritos.
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        <button
          onClick={handleViewAll}
          className="
            w-full bg-black text-white py-3 rounded-lg
            font-semibold tracking-tight
            hover:bg-gray-900 hover:-translate-y-[1px] transition-all
            shadow-[0_4px_15px_rgba(0,0,0,0.25)]
          "
        >
          Ver todos los productos
        </button>
      </div>
    </Drawer>
  );
};

export default WishlistDrawer;