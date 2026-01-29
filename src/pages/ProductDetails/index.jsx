import React, { useState } from 'react'
import ProductZoom from '../../components/ProductZoom'
import ProductTabs from '../../components/ProductTabs'
import { useLocation } from 'react-router-dom'
import { Button, Rating } from '@mui/material'
import QuantitySelector from '../../components/QuantitySelector'

const ProductDetails = () => {

  const { state } = useLocation();
  const item = state;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  console.log('Product Item from state:', item);

// Manejar agregar al carrito
 const handleAddToCart = () => {
    const productToCart = {
      id: item.id,
      name: item.name,
      price: item.offerprice,
      image: item.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };
    console.log("AGREGADO AL CARRITO:", productToCart);
  };

  return (
    <section className="py-5 pb-8 bg-white">
      <div className='container flex gap-8'>
        <div className="productZoomContainer w-[40%] overflow-hidden">
          {item && (
            <ProductZoom images={item.images} />
          )}
        </div>
        <div className="productInfoContainer w-[60%]">
          {item ? (
            <>
              <h1 className="text-[25px] font-bold mb-2">{item.name}</h1>
              <div className="flex items-center gap-3">
                <span className='text-gray-500' >Marca: <span className='font-[700]'>{item.brand}</span></span>
                <Rating value={item.rating} readOnly size="small" precision={0.5} />
                <span className='text-[13px] cursor-pointer'>Reviews ( {item.reviews || 0} )</span>
              </div>
              <div className="flex items-center gap-4 my-4">
                <span className="text-[18px] line-through text-gray-500">${item.price}</span>
                <span className="text-[22px] font-bold text-red-600">${item.offerprice}</span>
                {item.stock <= 5 && item.stock > 0 && (
                  <span className="text-red-500 font-semibold">Últimos disponibles</span>
                )}
                {item.stock === 0 && (
                  <span className="text-gray-500 font-semibold">Sin stock</span>
                )}
                {item.stock > 5 && (
                  <span className="text-green-600 font-semibold">En stock</span>
                )}
              </div>
              <p className='text-[14px]'>{item.description}</p>
              <div className="flex items-center gap-2 mt-4 font-semibold">
                Talles:
                {item.size && item.size.length > 0 ? (
                  item.size.map((size, index) => (
                    <span key={index} className="px-2 py-1 rounded-md">
                      <button
                        key={index}
                        disabled={item.stock === 0}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          px-4 py-2 
                          rounded-md 
                          text-sm font-semibold
                          border transition-all duration-200
                          ${item.stock === 0 
                            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-60"
                            : selectedSize === size
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-gray-400 hover:bg-gray-200 cursor-pointer"
                          }
                        `}
                      >
                        {size}
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No hay talles disponibles</span>
                )}
              </div>              
              <div className="mt-6 flex items-center gap-4 font-semibold">
                Colores:
                {Array.isArray(item.colors) && item.colors.length > 0 ? (
                  <div className="flex gap-3">
                    {item.colors.map((color, index) => {
                      // color = { name: string, hex: string }
                      const isSelected = selectedColor === color.name; // o selectedColor === color.hex
                      const isDisabled = item.stock === 0;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => !isDisabled && setSelectedColor(color.name)} // o color.hex
                          disabled={isDisabled}
                          aria-label={color.name}
                          title={color.name}
                          className={[
                            "w-8 h-8 rounded-full border-2 transition-transform",
                            "flex items-center justify-center",
                            isDisabled
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer hover:scale-105",
                            isSelected ? "border-black scale-110" : "border-gray-400",
                          ].join(" ")}
                          style={{ backgroundColor: color.hex }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-500">No hay colores disponibles</span>
                )}
              </div>
            </>
          ) : (
            <p>Loading product details...</p>
          )}

          <div className="mt-6 flex items-center gap-6 w-full">

            <QuantitySelector
              stock={item.stock}
              onChange={(qty) => setQuantity(qty)}
            />

            <Button
              variant="contained"
              disabled={!selectedSize || !selectedColor || item.stock === 0}
              onClick={handleAddToCart}
              className={`
                !py-3 !px-6 !text-lg !font-semibold !transition-all !duration-200

                ${
                  !selectedSize || !selectedColor || item.stock === 0
                    ? "!bg-gray-300 !text-gray-500 !cursor-not-allowed !shadow-none !opacity-100"
                    : "!bg-black !text-white hover:!bg-gray-900 !cursor-pointer"
                }
              `}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
      <div className="container !mt-6">
        <ProductTabs 
          item={item} />
      </div>
    </section>
  )
}

export default ProductDetails