import React from 'react'
import ProductZoom from '../../components/ProductZoom'
import { useLocation } from 'react-router-dom'

const ProductDetails = () => {

  const { state } = useLocation();
  const item = state;

  console.log('Product Item from state:', item);

  return (
    <div className="py-5 pb-8 bg-white">
      <div className='container flex gap-4'>
        <div className="productZoomContainer w-[40%] overflow-hidden">
    
          {item && (
            <ProductZoom images={item.images} />
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductDetails