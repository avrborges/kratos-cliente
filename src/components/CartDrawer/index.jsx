// src/components/CartDrawer.jsx
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ open, onClose, items = [] }) => {
  const navigate = useNavigate();

  // Subtotal dinámico
  const subtotal = items.reduce((acc, item) => {
    const price = Number(item.offerprice || item.price || 0);
    const qty = Number(item.quantity || 1);
    return acc + price * qty;
  }, 0);

  // Envío (gratis si supera 100k)
  const shippingCost = subtotal > 100000 ? 0 : 3500;

  // Total final
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    onClose?.();
    navigate("/checkout");
  };

  const handleGoToCartPage = () => {
    onClose?.();
    navigate("/cart");
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
        },
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="text-gray-700" />
          <h2 className="text-[18px] font-semibold tracking-tight text-gray-900">
            Tu carrito
          </h2>
        </div>

        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            "&:hover": { bgcolor: "gray.100" },
          }}
        >
          <CloseIcon className="text-gray-700" />
        </IconButton>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">El carrito está vacío por ahora.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="
                flex gap-3 p-3 rounded-lg bg-gray-50/60 
                ring-1 ring-black/5 shadow-sm
              "
            >
              <img
                src={item.image || item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <h4 className="text-[15px] font-semibold text-gray-900">
                  {item.name}
                </h4>

                <p className="text-gray-600 text-[14px]">
                  Cantidad: {item.quantity}
                </p>

                <p className="text-gray-800 font-semibold mt-1">
                  ${(item.offerprice || item.price).toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        {/* SUBTOTAL */}
        <div className="flex justify-between text-gray-700 text-[15px] font-medium">
          <span>Subtotal:</span>
          <span className="font-semibold text-gray-900">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>

        {/* ENVÍO */}
        <div className="flex justify-between text-gray-700 text-[15px] font-medium">
          <span>Envío:</span>
          <span
            className={`font-semibold ${
              shippingCost === 0 ? "text-emerald-600" : "text-gray-900"
            }`}
          >
            {shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-AR")}`}
          </span>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-gray-700 text-[16px] font-semibold border-t pt-2">
          <span>Total:</span>
          <span className="text-gray-900">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>

        {/* BOTONES */}
        <div className="flex gap-3 pt-3">
          {/* Ir al carrito */}
          <button
            onClick={handleGoToCartPage}
            className="
              flex-1 py-3 rounded-lg font-semibold tracking-tight
              bg-white text-gray-900 border border-gray-300
              hover:bg-gray-100 transition-all
            "
          >
            Ver carrito
          </button>

          {/* Finalizar compra */}
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`
              flex-1 py-3 rounded-lg font-semibold tracking-tight transition-all
              ${
                items.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 hover:-translate-y-[1px] shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
              }
            `}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;