// Slider de categorías con iconos en la HomePage
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

// Mock Data
import { MockCategories } from "../../../mocks";

const CategorySlider = () => {
  return (
    <div className="categorySlider py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <Swiper
          modules={[Scrollbar, A11y, Pagination]}
          spaceBetween={20}
          slidesPerView={6}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 14 },
            480: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 18 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
          }}
          className="pb-8"
        >
          {MockCategories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to={category.link} className="block h-full">
                <div
                  className={[
                    "group h-full rounded-xl bg-white text-center",
                    "px-4 py-5 flex flex-col items-center justify-center",
                    "shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5",
                    "transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]",
                  ].join(" ")}
                >
                  {/* Icono dentro de chip circular */}
                  <div
                    className={[
                      "w-14 h-14 rounded-full flex items-center justify-center",
                      "bg-white/70 backdrop-blur shadow-[0_6px_18px_rgba(0,0,0,0.08)]",
                      "ring-1 ring-black/5 transition-transform duration-300",
                      "group-hover:scale-105",
                    ].join(" ")}
                  >
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-7 h-7 object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Nombre */}
                  <h3
                    className={[
                      "mt-3 text-[15px] font-semibold text-gray-900",
                      "truncate max-w-[160px] group-hover:text-gray-700 transition-colors",
                    ].join(" ")}
                    title={category.name}
                  >
                    {category.name}
                  </h3>

                  {/* Línea sutil de acento al hover */}
                  <span className="mt-2 h-[2px] w-0 bg-gray-900/80 rounded-full transition-all duration-300 group-hover:w-10" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Estilos de paginación Swiper (opcional si activás pagination) */}
      <style>
        {`
          .custom-bullet {
            width: 8px;
            height: 8px;
            background-color: #d1d5db; /* gray-300 */
            opacity: 1;
            border-radius: 9999px;
            margin: 0 4px !important;
            transition: all .25s ease;
          }
          .custom-bullet-active {
            background-color: #111827; /* gray-900 */
            width: 20px; /* pill */
            border-radius: 9999px;
          }
        `}
      </style>
    </div>
  );
};

export default CategorySlider;