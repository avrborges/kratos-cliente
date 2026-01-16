import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Link } from 'react-router-dom';

dayjs.locale('es');

const MockBlogPosts = [
    {
        id: 1,
        image: 'https://picsum.photos/200/150?random=1',
        title: "Cómo elegir el mejor producto para ti",
        description: "Descubre los factores clave para seleccionar productos que se adapten a tus necesidades y estilo de vida.",
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
        createAt:'2026-01-15T10:30:00Z',

    },
    {
        id: 2,
        image: 'https://picsum.photos/200/150?random=2',
        title: "Tendencias de consumo en 2024",
        description: "Explora las últimas tendencias en el mercado y cómo están cambiando los hábitos de compra de los consumidores.",
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
        createAt:'2023-08-15T10:30:00Z',
    },
    {   
        id: 3,
        image: 'https://picsum.photos/200/150?random=3',
        title: "Guía para aprovechar ofertas y descuentos",
        description: "Aprende estrategias efectivas para encontrar y aprovechar las mejores ofertas en tus compras diarias.",
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
        createAt:'2023-08-15T10:30:00Z',
    },
];


const BlogSlider = () => {
  return (
    <div className='blogSlider py-5'>
        <Swiper
            modules={[ Navigation, Pagination, Scrollbar, A11y ]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}    
            scrollbar={{ draggable: true, hide: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >   
          {MockBlogPosts.map((post) => (
            <SwiperSlide key={post.id}>
                <div className='blogItem overflow-hidden bg-white border-1 border-gray-300 h-[380px]'>
                    <div className="imageWrapper bg-white w-[100%] h-[150px] overflow-hidden mb-4">
                        <img 
                            src={post.image}
                            alt={post.title} 
                            className='w-full object-cover h-full hover:scale-110 transition-transform duration-300 ease-in-out'
                        />
                    </div>
                    <div>
                        <div className='flex items-center mb-2 gap-2 px-4'>
                            <AccessTimeIcon className='text-gray-500 text-sm' />
                            <p className='text-gray-500 text-sm'>
                                {dayjs(post.createAt).format('DD [de] MMMM [de] YYYY')}
                            </p>
                        </div>
                        <div className='flex flex-col text-left px-4'>
                            <h3 className='text-lg block w-full font-semibold mb-2'>{post.title}</h3>
                            <p className='text-gray-600 text-sm block w-full mb-4'>{post.description}</p>
                            <Link to={`/blog/${post.id}`} className='font-[500] text-sm font-bold hover:text-gray-500'>
                                    Leer más <KeyboardArrowRightIcon className='ml' />
                            </Link>
                        </div>                      
                    </div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default BlogSlider