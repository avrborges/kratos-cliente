// Slider de imágenes en la página de inicio
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Mock Data
import { MockSlides } from '../../mocks';

const HomeSlider = () => {
  return (
    <div className='HomeSlider'>
    <Swiper
        modules={[Pagination, A11y, Autoplay ]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        >
        {MockSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
                <div className='slideItem flex items-center justify-center h-[300px] overflow-hidden'>
                    <img src={slide.image} alt={slide.content} className='w-full h-full object-cover'/>
                </div>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
);  
}

export default HomeSlider