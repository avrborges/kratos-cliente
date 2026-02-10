// Swiper
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Iconos
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Librerías
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Mock data (debe ser puro: solo arrays/objetos)
import { MockBlogPosts } from "../../mocks";

export default function BlogSlider() {
  // ✅ Evitar side-effect a nivel de módulo
  useEffect(() => {
    dayjs.locale("es");
  }, []);

  // ✅ Mantener referencia estable para evitar reconfiguración de Swiper
  const swiperModules = useMemo(
    () => [Navigation, Pagination, Scrollbar, A11y],
    []
  );

  return (
    <div className="blogSlider py-10">
      <Swiper
        modules={swiperModules}
        spaceBetween={24}
        slidesPerView={3}
        navigation
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        scrollbar={{ draggable: true }}
        className="pb-10"
      >
        {MockBlogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div
              className={[
                "group rounded-xl overflow-hidden bg-white h-[420px]",
                "shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5",
                "transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]",
                "flex flex-col",
              ].join(" ")}
            >
              {/* Imagen */}
              <div className="w-full aspect-[4/2.2] overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-1">
                {/* Fecha */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <AccessTimeIcon fontSize="small" className="text-gray-500" />
                  <span>
                    {dayjs(post.createdAt ?? post.createAt).format(
                      "DD [de] MMMM [de] YYYY"
                    )}
                  </span>
                </div>

                {/* Título */}
                <h3
                  className="text-[17px] font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px]"
                  title={post.title}
                >
                  {post.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
                  {post.description}
                </p>

                {/* Leer más */}
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-auto text-sm font-medium flex items-center gap-1 text-gray-800 hover:text-gray-500 transition-colors"
                  aria-label={`Leer más sobre ${post.title}`}
                >
                  Leer más
                  <KeyboardArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ⚠️ Recomendación: mover este bloque a un archivo CSS/global para mayor estabilidad en HMR */}
      <style>
        {`
          .custom-bullet {
            width: 10px;
            height: 10px;
            background-color: #d1d5db;
            opacity: 1;
            border-radius: 50%;
            margin: 0 4px !important;
            transition: all 0.3s ease;
          }
          .custom-bullet-active {
            background-color: #111827;
            width: 12px;
            height: 12px;
          }
        `}
      </style>
    </div>
  );
}