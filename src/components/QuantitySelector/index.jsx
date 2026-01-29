
import { useState } from "react";

const QuantitySelector = ({ stock, onChange }) => {
  const [qty, setQty] = useState(1);

  const update = (newQty) => {
    setQty(newQty);
    onChange(newQty);  // ← envía la cantidad al padre
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        className="w-8 h-8 bg-gray-100 border rounded hover:bg-gray-200 disabled:opacity-40"
        onClick={() => update(Math.max(qty - 1, 1))}
        disabled={qty <= 1}
      >
        -
      </button>

      <div className="w-12 text-center font-bold text-lg">
        {qty}
      </div>

      <button
        className="w-8 h-8 bg-gray-100 border rounded hover:bg-gray-200 disabled:opacity-40"
        onClick={() => update(Math.min(qty + 1, stock))}
        disabled={qty >= stock}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;