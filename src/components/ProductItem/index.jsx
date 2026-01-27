
import React from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ShareIcon from '@mui/icons-material/Share';
import { Link, useNavigate } from 'react-router-dom';

const isNew = (date) => {
  const created = new Date(date);
  const today = new Date();
  const diffDays = (today - created) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
};

const ProductItem = ({
  item,
  onAddToCart = () => {},
  onQuickView = () => {},
  onWishlist = () => {},
  onShare = () => {}
}) => {
  const showNew = isNew(item.createdAt);
  const showDiscount = Number(item.discount) > 0;
  const navigate = useNavigate();

  return (
    <div className="productItem overflow-hidden bg-white border-1 border-gray-300">
      
      <div className="group relative imageWrapper border border-gray-200 bg-white w-[100%] h-[250px] overflow-hidden">
        
        <img
          src={item.images?.[0] || "/placeholder.jpg"}
          alt={item.name}
          className="w-full object-cover object-top-right h-full hover:scale-110 transition-transform duration-300 ease-in-out"
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

        <div className="actions absolute top-[-200px] right-3 z-50 
                        items-center flex flex-col gap-2 p-2 !w-[40px] 
                        transition-all duration-300 group-hover:top-8 
                        pointer-events-none">

          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full 
                       !bg-white hover:!bg-gray-200 group pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(item);
              navigate(`/productdetails/${item.id}`, { state: item });
            }}
          >
            <ZoomOutMapIcon className="text-[18px] text-black" />
          </Button>

          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full 
                       !bg-white hover:!bg-gray-200 group pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onWishlist(item);
            }}
          >
            <FavoriteBorderIcon className="text-[18px] text-black" />
          </Button>

          <Button
            className="!w-[45px] !h-[45px] !min-w-[45px] !rounded-full 
                       !bg-white hover:!bg-gray-200 group pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onShare(item);
            }}
          >
            <ShareIcon className="text-[18px] text-black" />
          </Button>

        </div>
      </div>

      <div className="productInfo p-3 border-t border-gray-200 bg-[#f1f1f1] h-[210px] flex flex-col justify-between">
        
        <h6 className="text-sm">{item.brand}</h6>

        <Link 
          to={`/productdetails/${item.id}`}
          state={item}
        >
          <h3 className="text-[15px] font-semibold hover:underline cursor-pointer">
            {item.name}
          </h3>
        </Link>

        <Rating name="read-only" value={item.rating} readOnly size="small" />

        {item.stock <= 5 && item.stock > 0 && (
          <div className="text-red-500 text-sm font-semibold">Últimos disponibles</div>
        )}

        {item.stock === 0 && (
          <div className="text-gray-500 text-sm font-semibold">Sin stock</div>
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
          <Button
            className="btn btn-secondary"
            onClick={() => onAddToCart(item)}
            disabled={item.stock === 0}
          >
            {item.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ProductItem;