import React from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ShareIcon from '@mui/icons-material/Share';
// Si vas a linkear a detalle, descomentá la siguiente línea y usá el prop `to`
// import { Link } from 'react-router-dom';

// Determina si un producto es “Nuevo” (últimos 5 días)
const isNew = (date) => {
  const created = new Date(date);
  const today = new Date();
  const diffDays = (today - created) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
};

/**
 * ProductItem
 * Props:
 * - item: {
 *    id, image, name, brand, description, rating, stock,
 *    price, offerprice, discount, createdAt
 *   }
 * - onAddToCart?: (item) => void
 * - onQuickView?: (item) => void
 * - onWishlist?: (item) => void
 * - onShare?: (item) => void
 * - to?: string  // (opcional) ruta al detalle del producto
 */
const ProductItem = ({
  item,
  onAddToCart = () => {},
  onQuickView = () => {},
  onWishlist = () => {},
  onShare = () => {},
  to, // opcional: si pasás una ruta, podés envolver la imagen o el título con Link
}) => {
  const showNew = isNew(item.createdAt);
  const showDiscount = Number(item.discount) > 0;

  // En caso de que quieras envolver la imagen o título en Link:
  // const Wrapper = to ? Link : React.Fragment;
  // const wrapperProps = to ? { to } : {};

  return (
    <div className="productItem overflow-hidden bg-white border-1 border-gray-300 shadow-lg ">
      {/* Imagen + Badges + Actions */}
      <div className="group relative imageWrapper border border-gray-200 bg-white w-[100%] h-[250px] overflow-hidden">
        {/* <Wrapper {...wrapperProps}> */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full object-cover object-top-right h-full hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        {/* </Wrapper> */}

        {showNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Nuevo
          </span>
        )}

        {showDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.discount}% OFF
          </span>
        )}

        {/* Acciones sobre la imagen (aparecen al hover) */}
        <div className="actions absolute top-[-200px] right-3 z-50 items-center flex flex-col gap-2 p-2 !w-[40px] transition-all duration-300 group-hover:top-8">
          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group"
            onClick={() => onQuickView(item)}
          >
            <ZoomOutMapIcon className="text-[18px] text-black" />
          </Button>
          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group"
            onClick={() => onWishlist(item)}
          >
            <FavoriteBorderIcon className="text-[18px] text-black" />
          </Button>
          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group"
            onClick={() => onShare(item)}
          >
            <ShareIcon className="text-[18px] text-black" />
          </Button>
        </div>
      </div>

      {/* Info del producto */}
      <div className="productInfo p-3 border-t border-gray-200 bg-[#f1f1f1] h-[210px] flex flex-col justify-between">
        <h6 className="text-sm">{item.brand}</h6>
        {/* <Wrapper {...wrapperProps}> */}
          <h3 className="text-[15px] font-semibold">{item.description}</h3>
        {/* </Wrapper> */}

        <Rating name="read-only" value={item.rating} readOnly size="small" />

        {item.stock <= 5 && (
          <div className="text-red-500 text-sm font-semibold">Últimos disponibles</div>
        )}

        <div className="priceInfo mt-2 flex items-center justify-between w-full">
          <div>
            {showDiscount && (
              <span className="text-sm line-through text-gray-500">
                ${item.price.toLocaleString('es-AR')}
              </span>
            )}
          </div>
          <div>
            <span className="text-lg font-bold text-primary">
              ${item.offerprice.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        <div className="btnWrapper mt-4 flex justify-center gap-2">
          <button className="btn btn-secondary" onClick={() => onAddToCart(item)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
