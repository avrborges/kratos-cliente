// Slider de productos destacados en la página de inicio
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import ProductItem from '../../components/ProductItem';

// Función para determinar si un producto es nuevo (agregado en los últimos 5 días)


const ProductsSlider = ({MockItems}) => {
  return (
    <div className='productsSlider py-5'>
        <Swiper
            modules={[ Navigation, Pagination, Scrollbar, A11y ]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}    
            scrollbar={{ draggable: true, hide: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >   
          {MockItems.map((item) => (
            <SwiperSlide key={item.id}>
              {/* Product Item */}
              <ProductItem 
                  item={item}
                  onAddToCart={(it) => console.log('Agregar al carrito:', it)}
                  onQuickView={(it) => console.log('Quick view:', it)}
                  onWishlist={(it) => console.log('Wishlist:', it)}
                  onShare={(it) => console.log('Compartir:', it)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default ProductsSlider