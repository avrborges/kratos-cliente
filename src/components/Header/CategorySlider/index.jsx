import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


const CategorySlider = ({ MockCategories }) => {
  return (
    <div className='categorySlider'>
        <div className='container'>
            <Swiper
                modules={[ Scrollbar, A11y ]}
                spaceBetween={20}
                slidesPerView={6}
                scrollbar={{ draggable: true, hide: false }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                {MockCategories.map(category => (
                    <SwiperSlide key={category.id}>
                        <Link to={category.link}>
                            <div className="item py-4 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src={category.icon} className='w-[20px] transition-all'/>
                                <h3 className='text-[15px] font-[500] mt-3'>{category.name}</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
  )
}

export default CategorySlider