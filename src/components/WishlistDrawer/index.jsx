import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const WishlistDrawer = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleViewAll = () => {
        if (onClose) onClose();
        navigate("/wishlist");
    }
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
        </div>

        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "gray.100" },
          }}
        >
          <CloseIcon className="text-gray-700" />
        </IconButton>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* EJEMPLO: acá luego irán items reales */}
        <p className="text-gray-500 text-sm">
          Aún no agregaste productos a tu lista de favoritos.
        </p>
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