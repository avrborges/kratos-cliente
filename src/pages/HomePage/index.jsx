// Home Page con sliders de productos y banners
import React from 'react'
import HomeSlider from '../../components/HomeSlider'
import CategorySlider from '../../components/Header/CategorySlider'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';
import BlogSlider from '../../components/BlogSlider';

// Mock Data
import { MockCategories } from '../../mocks';
import { MockItems } from '../../mocks';


// Normaliza strings: quita acentos, trim y minúsculas
const normalize = (str) =>
  String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const HomePage = () => {
  const [value, setValue] = React.useState("Todos");
  const handleChangeMenuSlider = (event, newValue) => setValue(newValue);

  // Filtra y obtiene los 5 productos más vendidos según la categoría seleccionada
  const filteredAndTop5 = React.useMemo(() => {
    let filteredItems = MockItems;
    if (value !== "Todos") {
      const tabKey = normalize(value);
      // Si querés que "Ofertas" sea una regla especial (descuento > 0), dejá este if:
      if (tabKey === 'ofertas') {
        filteredItems = MockItems.filter(item => Number(item.discount) > 0);
      } else {
        // Resto de categorías: match por nombre
        filteredItems = MockItems.filter(
          (item) => normalize(item.category) === tabKey
        );
      }
    }
    // Clonar antes de ordenar para no mutar MockItems
    return [...filteredItems]
      .sort((a, b) => {
        if (b.totalSales !== a.totalSales) return b.totalSales - a.totalSales;
        // Desempate (opcional): más reciente primero
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .filter(item => Number(item.stock) > 0) // solo con stock

      .slice(0, 5);
  }, [value]);

  // Filtror para nuevos productos (los más recientes)
  const sortedByNew = React.useMemo(() => {
    return [...MockItems]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter(item => Number(item.stock) > 0) // solo con stock
      .slice(0, 5); // Top 5 nuevos
  }, []);

  // Filtrar productos destacados
  const featuredProducts = React.useMemo(() => {
    return [...MockItems]
      .filter(item => item.featured === true && Number(item.stock) > 0) // solo destacados con stock  
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5); // Top 5 destacados
  }, []);

  // Filtrar últimos disponibles (stock bajo)
  const lastAvailable5 = React.useMemo(() => {
    return [...MockItems]
      .filter(item => Number(item.stock) <= 5 && Number(item.stock) > 0)       // productos con poco stock
      .sort((a, b) => a.stock - b.stock)            // opcional: menor stock primero
      .slice(0, 5);                                 // Top 5 últimos disponibles
  }, []);

  return (
    <>
      {/* Slider principal de la página de inicio */}
      <HomeSlider />
      {/* Slider de categorías */}
      <CategorySlider />
      
      {/* Sección de productos más vendidos */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* CARD UNIFICADA (Tabs + Slider juntos) */}
          <div
            className="
              rounded-xl bg-white ring-1 ring-black/5
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-6 pt-6 pb-2
            "
          >
            {/* Header superior */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
                  Productos más vendidos
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Descubrí nuestros productos más vendidos.
                </p>
              </div>

              {/* Tabs MUI estilizados */}
              <div className="md:w-[60%]">
                <Tabs
                  value={value}
                  onChange={handleChangeMenuSlider}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="tabs productos más vendidos"
                  sx={{
                    minHeight: 0,
                    '& .MuiTabs-flexContainer': { gap: 0.5 },
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      minHeight: 0,
                      height: 36,
                      borderRadius: '9999px',
                      px: 1.5,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                    },
                    '& .MuiTab-root.Mui-selected': {
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: 'text.primary',
                    },
                    '& .MuiTabs-indicator': { display: 'none' },
                  }}
                >
                  <Tab value="Todos" label="Todos" />
                  {MockCategories.map((category) => (
                    <Tab key={category.id} value={category.name} label={category.name} />
                  ))}
                </Tabs>
              </div>
            </div>

            {/* SLIDER PEGADO DIRECTAMENTE (sin separación extra) */}
            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={filteredAndTop5} />
            </div>
          </div>
        </div>
      </section>
            
      {/* Sección de envío gratis */}
      <section className="py-10 bg-white flex flex-col gap-8">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center">

          <div
            className="
              EnvioBanner w-full rounded-xl 
              bg-gray-50 ring-1 ring-black/5 
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-8 py-8 
              flex items-center justify-between
              gap-10
            "
          >
            {/* Columna izquierda */}
            <div className="flex items-center gap-6">
              <div
                className="
                  w-16 h-16 rounded-full bg-white/70 
                  backdrop-blur flex items-center justify-center 
                  ring-1 ring-black/5 shadow-sm
                "
              >
                <LocalShippingIcon className="text-gray-700 !text-[34px]" />
              </div>

              <div>
                <h3 className="text-[26px] font-semibold tracking-tight text-gray-900">
                  Envío gratis
                </h3>
                <p className="text-gray-600 text-[15px]">
                  En compras superiores a $100.000
                </p>
              </div>
            </div>

            {/* Columna derecha: CTA con separación */}
            <div className="flex-shrink-0 ml-4">
              <Link to="/productListing">
                <button
                  className="
                    bg-black text-white font-semibold tracking-tight 
                    rounded-lg px-8 py-3 
                    transition-all duration-300
                    hover:bg-gray-900 hover:translate-y-[-1px]
                    shadow-[0_4px_15px_rgba(0,0,0,0.25)]
                  "
                >
                  Comprar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Ads Banner */}
        <div className="max-w-[1400px] mx-auto px-4">
          <AdsBannerSlider />
        </div>
      </section>

      {/* Sección de nuevos productos */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* CARD UNIFICADA (Header + Slider) */}
          <div
            className="
              rounded-xl bg-white ring-1 ring-black/5
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-6 pt-6 pb-2
            "
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
                  Últimos ingresos
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Explorá los productos más recientes en nuestra tienda.
                </p>
              </div>

              {/* No hay Tabs en esta sección, pero se deja espacio reservado por consistencia */}
              <div className="md:w-[40%]"></div>
            </div>

            {/* SLIDER PEGADO, SIN ESPACIO */}
            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={sortedByNew} />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* CARD UNIFICADA (Header + Slider) */}
          <div
            className="
              rounded-xl bg-white ring-1 ring-black/5
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-6 pt-6 pb-2
            "
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

              <div>
                <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
                  Productos Destacados
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Descubrí nuestros productos más destacados.
                </p>
              </div>

              {/* Columna derecha vacía para mantener coherencia del layout */}
              <div className="md:w-[40%]"></div>
            </div>

            {/* SLIDER PEGADO — sin espacio extra */}
            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={featuredProducts} />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Últimos Disponibles */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* CARD UNIFICADA (Header + Slider) */}
          <div
            className="
              rounded-xl bg-white ring-1 ring-black/5
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-6 pt-6 pb-2
            "
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
                  Últimos disponibles
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Últimos productos disponibles en stock.
                </p>
              </div>

              {/* Col derecha (vacía pero mantenida para consistencia de layout) */}
              <div className="md:w-[40%]"></div>
            </div>

            {/* SLIDER PEGADO — sin espacio extra */}
            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={lastAvailable5} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección Blog */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* CARD UNIFICADA (Header + Slider) */}
          <div
            className="
              rounded-xl bg-white ring-1 ring-black/5
              shadow-[0_6px_24px_rgba(0,0,0,0.06)]
              px-6 pt-6 pb-2
            "
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

              <div className="w-full md:w-[70%]">
                <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
                  Desde nuestro blog
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Lee los últimos artículos y noticias.
                </p>
              </div>

              {/* CTA en estilo Drakos Premium */}
              <div className="w-full md:w-[30%] flex md:justify-end">
                <Link to="/blog">
                  <button
                    className="
                      bg-black text-white font-semibold tracking-tight
                      rounded-lg px-6 py-3
                      transition-all duration-300
                      hover:bg-gray-900 hover:translate-y-[-1px]
                      shadow-[0_4px_15px_rgba(0,0,0,0.25)]
                    "
                  >
                    Ver blog
                  </button>
                </Link>
              </div>
            </div>

            {/* BLOG SLIDER PEGADO — SIN ESPACIO EXTRA */}
            <div className="mt-2 -mx-2">
              <BlogSlider />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage