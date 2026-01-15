// Slider de imágenes en la página de inicio

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MockSlides = [
  {
    id: 1,
    image: 'https://picsum.photos/1200/300?random=1',
    content: 'Slide 1 Content'
  },
  {
    id: 2,
    image:'https://picsum.photos/1200/300?random=2',
    content: 'Slide 2 Content'
  },
  {
    id: 3,
    image:'https://picsum.photos/1200/300?random=3',
    content: 'Slide 3 Content'
  },
  {
    id: 4,
    image:'https://picsum.photos/1200/300?random=4',
    content: 'Slide 4 Content'
  }
]

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
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
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