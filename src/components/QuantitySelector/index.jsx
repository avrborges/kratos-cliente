import { useState } from "react";

const QuantitySelector = ({ stock, onChange }) => {
  const [qty, setQty] = useState(1);

  const update = (newQty) => {
    setQty(newQty);
    onChange(newQty);
  };

  const disabledDecrement = qty <= 1;
  const disabledIncrement = qty >= stock;

  return (
    <div className="flex items-center gap-4">

      {/* Botón - */}
      <button
        onClick={() => update(Math.max(qty - 1, 1))}
        disabled={disabledDecrement}
        className={[
          "w-10 h-10 flex items-center justify-center rounded-full",
          "bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-sm",
          "transition-all duration-200",
          disabledDecrement
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100 hover:scale-[1.05] cursor-pointer",
        ].join(" ")}
      >
        <span className="text-[20px] font-semibold text-gray-800">−</span>
      </button>

      {/* Cantidad */}
      <div
        className="
          min-w-[48px] text-center text-[18px] 
          font-semibold text-gray-900
        "
      >
        {qty}
      </div>

      {/* Botón + */}
      <button
        onClick={() => update(Math.min(qty + 1, stock))}
        disabled={disabledIncrement}
        className={[
          "w-10 h-10 flex items-center justify-center rounded-full",
          "bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-sm",
          "transition-all duration-200",
          disabledIncrement
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100 hover:scale-[1.05] cursor-pointer",
        ].join(" ")}
      >
        <span className="text-[20px] font-semibold text-gray-800">+</span>
      </button>
    </div>
  );
};

export default QuantitySelector;