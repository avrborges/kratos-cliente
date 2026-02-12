import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";

// Icons
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Helpers externos
import {
  formatCurrency,
  getThumbnail,
  getPriceInfo,
} from "../../helpers/wishlist.helpers";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleGoToDetails = (item) => {
    navigate(`/productdetails/${item.id}`, { state: item });
  };

  return (
    <section className="py-10 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 flex items-center gap-2">
            <FavoriteBorderIcon className="text-gray-700" />
            Tus Favoritos
          </h1>
          {wishlist.length > 0 && (
            <span className="text-sm text-gray-500">
              {wishlist.length} productos
            </span>
          )}
        </div>

        {/* LISTA */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-50 ring-1 ring-gray-200 mb-4">
              <FavoriteBorderIcon className="text-gray-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              No hay productos en tus favoritos
            </h2>
            <p className="text-gray-500 mt-1">
              Agregá productos desde la tienda para verlos acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => {
              const thumb = getThumbnail(item); // { src, alt } | null
              const { price, offer } = getPriceInfo(item);

              return (
                <div
                  key={item.id}
                  className="
                    rounded-xl ring-1 ring-gray-200 bg-white shadow-sm
                    hover:shadow-md hover:-translate-y-[2px] transition-all
                    p-4 flex flex-col
                  "
                >
                {/* IMAGEN */}
                <div
                  onClick={() => handleGoToDetails(item)}
                  className="cursor-pointer"
                >
                  {thumb ? (
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      className="w-full h-56 object-cover rounded-lg ring-1 ring-gray-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-56 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      sin imagen
                    </div>
                  )}
                </div>

                  {/* INFO */}
                  <div className="mt-4 flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
                      onClick={() => handleGoToDetails(item)}
                    >
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.brand} • {item.category}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      {offer ? (
                        <>
                          <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(offer)}
                          </span>
                          <span className="text-sm line-through text-gray-400">
                            {formatCurrency(price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">
                          {formatCurrency(price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACCIONES */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="
                        text-red-600 hover:text-red-700
                        flex items-center gap-1 text-sm
                      "
                    >
                      <HighlightOffIcon fontSize="small" />
                      Quitar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;