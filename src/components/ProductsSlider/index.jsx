import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
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

const MockItems = [
  {
    id: 1,
    category: 'hombre',
    brand: 'Soylent Green',
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    rating: 4,
    price: 19999,
    offerprice: 14999,
    discount: 20,
    image: 'https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp'
  },
  {
    id: 2,
    category: 'Mujer',
    brand: 'Pantone',
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    rating: 5, 
    price: 29999,
    offerprice: 24999,
    discount: 25,
    image: 'https://serviceapi.spicezgold.com/download/1742462733293_zoom_1-1673275603.webp'
  },
  {
    id: 3,
    category: 'niño',
    brand: 'Globex Corporation',
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    rating: 3,
    price: 39999, 
    offerprice: 34999,
    discount: 15,
    image: 'https://serviceapi.spicezgold.com/download/1742462736761_zoom_1-1673275611.webp'
  },
  {
    id: 4,
    category: 'Calzado',
    brand: 'Constantine',
    name: 'Producto 4',
    description: 'Descripción del producto 4',
    rating: 4,
    price: 49999, 
    offerprice: 44999,
    discount: 10,
    image: 'https://serviceapi.spicezgold.com/download/1742462740123_zoom_1-1673275618.webp'
  },
  {
    id: 5,
    category: 'Accesorio',
    brand: 'MegaCorp',
    name: 'Producto 5',
    description: 'Descripción del producto 5',
    rating: 2,
    price: 59999,
    offerprice: 54999,
    discount: 8,
    image: 'https://serviceapi.spicezgold.com/download/1742462743461_zoom_1-1673275625.webp'
  }
]
const ProductsSlider = () => {
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
                      <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                        {item.discount}% OFF
                      </span>
                      <div className="actions absolute top-[-200px] right-3 z-50 items-center flex flex-col gap-2 p-2 !w-[40px] transition-all duration-300 group-hover:top-3">
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
                      <div className="priceInfo mt-2 flex items-center gap-2">
                          <span className='text-lg font-bold text-primary'>${item.offerprice.toLocaleString('es-AR')}</span>
                          <span className='text-sm line-through text-gray-500'>${item.price.toLocaleString('es-AR')}</span>
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