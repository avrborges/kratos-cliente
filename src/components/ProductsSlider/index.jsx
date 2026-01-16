// Slider de productos destacados en la página de inicio
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ShareIcon from '@mui/icons-material/Share';

// Función para determinar si un producto es nuevo (agregado en los últimos 5 días)
const isNew = (date) => {
  const created = new Date(date);
  const today = new Date();
  const diffDays = (today - created) / (1000 * 60 * 60 * 24);
  return diffDays <= 5;
};


const ProductsSlider = ({ MockItems }) => {
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
              <div className='procuctItems overflow-hidden bg-white border-1 border-gray-300 shadow-lg'>
                  <div className="group imageWrapper border border-gray-200 bg-white w-[100%] h-[250px] overflow-hidden">
                      <img 
                          src={item.image}
                          alt={item.name} 
                          className='w-full object-cover object-top-right h-full hover:scale-110 transition-transform duration-300 ease-in-out'
                      />
                        {isNew(item.createdAt) && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Nuevo
                          </span>
                        )}
                        {item.discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {item.discount}% OFF
                          </span>
                        )}
                      <div className="actions absolute top-[-200px] right-3 z-50 items-center flex flex-col gap-2 p-2 !w-[40px] transition-all duration-300 group-hover:top-8">
                        <Button className='!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group'>
                          <ZoomOutMapIcon className='text-[18px] text-black' />
                        </Button>
                        <Button className='!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group'>
                          <FavoriteBorderIcon className='text-[18px] text-black' />
                        </Button>
                        <Button className='!w-[45px] !h-[45px] !min-w-[45px] !rounded-full !bg-white hover:!bg-gray-200 group'>
                          <ShareIcon className='text-[18px] text-black' />
                        </Button>
                      </div>
                  </div>
                  <div className="productInfo p-3 border-t border-gray-200 bg-[#f1f1f1]">
                      <h6 className='text-sm'>{item.brand}</h6>
                      <h3 className='text-[15px] font-semibold'>{item.description}</h3>
                      <Rating name="read-only" value={item.rating} readOnly size="small" />
                      {
                        item.stock <= 5 ? (
                          <div className="text-red-500 text-sm font-semibold">Últimos disponibles</div>
                        ) : null
                      }
                      <div className="priceInfo mt-2 flex items-center justify-between w-full">
                          <div>
                            {Number(item.discount) > 0 && (
                              <span className='text-sm line-through text-gray-500'>${item.price.toLocaleString('es-AR')}</span>
                            )}
                          </div>
                          <div>
                              <span className='text-lg font-bold text-primary'>${item.offerprice.toLocaleString('es-AR')}</span>
                          </div>  
                      </div>
                      <div className="btnWrapper mt-4 flex justify-center gap-2">
                          <button className='btn btn-secondary'>Agregar al carrito</button>
                      </div>
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default ProductsSlider