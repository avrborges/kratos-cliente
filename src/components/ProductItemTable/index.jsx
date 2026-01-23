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
const ProductItemTable = ({
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

<div className="productItem flex bg-white border border-gray-300 p-3 gap-4 relative">

  {/* Imagen a la izquierda */}
  <div className="relative w-[180px] h-[180px] flex-shrink-0 overflow-hidden rounded-md">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
    />

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
  </div>

  {/* Datos del producto a la derecha */}
  <div className="flex flex-col w-full justify-between">

    {/* Títulos */}
    <div>
      <h6 className="text-sm">{item.brand}</h6>
      <h3 className="text-[16px] font-semibold leading-tight">{item.description}</h3>
    </div>

    {/* Rating */}
    <Rating name="read-only" value={item.rating} readOnly size="small" />

    {/* Stock */}
    {item.stock <= 5 && (
      <div className="text-red-500 text-sm font-semibold">Últimos disponibles</div>
    )}

    {/* Precios */}
    <div className="flex items-center justify-between mt-2">
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

    {/* Botones abajo */}
    <div className="flex items-center justify-between mt-3">

      <button
        className="btn btn-secondary"
        onClick={() => onAddToCart(item)}
      >
        Agregar al carrito
      </button>

      {/* Acciones a la derecha */}
      <div className="flex gap-2">

        <Button
          className="!w-[40px] !h-[40px] !rounded-full !bg-white hover:!bg-gray-200"
          onClick={() => onQuickView(item)}
        >
          <ZoomOutMapIcon className="text-[18px] text-black" />
        </Button>

        <Button
          className="!w-[40px] !h-[40px] !rounded-full !bg-white hover:!bg-gray-200"
          onClick={() => onWishlist(item)}
        >
          <FavoriteBorderIcon className="text-[18px] text-black" />
        </Button>

        <Button
          className="!w-[40px] !h-[40px] !rounded-full !bg-white hover:!bg-gray-200"
          onClick={() => onShare(item)}
        >
          <ShareIcon className="text-[18px] text-black" />
        </Button>

      </div>

    </div>

  </div>
</div>
  );
};

export default React.memo(ProductItemTable);
