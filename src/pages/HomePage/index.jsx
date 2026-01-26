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
      <section className='py-5 bg-white mt-5'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection'>
              <h2 className='text-[22px] font-semibold'>Productos más vendidos</h2>
              <p className='text-gray-600'>Descubre nuestros productos más vendidos.</p>
            </div>
            <div className='rightSection w-[60%]'>
              <Tabs
                value={value}
                onChange={handleChangeMenuSlider}
                variant='scrollable'
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab value={"Todos"} label="Todos" />
                {MockCategories.map((category) => (
                  <Tab key={category.id} value={category.name} label={category.name} />
                ))}
              </Tabs>
            </div>
          </div>
          <ProductsSlider MockItems={filteredAndTop5} />
        </div>
      </section>
      
      {/* Sección de envío gratis */}
      <section className='py-2 bg-white flex flex-col gap-2'>
        <div className="container flex justify-center">
          <div className="EnvioBanner flex items-center justify-between w-[95%] bg-gray-100 p-4">
            <div className="col_1 flex items-center">
              <LocalShippingIcon className='text-primary !text-[50px] mr-4'/>
              <span>
                <h3 className='!text-[25px] font-semibold uppercase'>Envío gratis</h3>
                <p className='text-gray-600'>En compras superiores a $100.000</p>
              </span>
            </div>
            <div className="col_2">
            <Link to="/productListing">
              <button className='bg-black text-white py-3 px-6 rounded-sm hover:bg-gray-800 cursor-pointer transition-all'>
                Comprar ahora
              </button>
            </Link>
            </div>
          </div>
        </div>

        <AdsBannerSlider />
      
      
      </section>

      {/* Sección de nuevos productos */}
      <section className='py-5 bg-white'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection'>
              <h2 className='text-[22px] font-semibold'>Últimos ingresos</h2>
              <p className='text-gray-600'>Explora los productos más recientes en nuestra tienda.</p>
            </div>
            <div className='rightSection w-[60%]'>

            </div>
          </div>
          <ProductsSlider MockItems={sortedByNew} />
        </div>
      </section>

      {/* Sección de productos destacados */}  
      <section className='py-0 bg-white'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection'>
              <h2 className='text-[22px] font-semibold'>Productos Destacados</h2>
              <p className='text-gray-600'>Descubre nuestros productos más destacados.</p>
            </div>
            <div className='rightSection w-[60%]'>

            </div>
          </div>
          <ProductsSlider MockItems={featuredProducts} />
        </div>
      </section>

      {/* Sección de Ultimos disponibles */}  
      <section className='py-0 bg-white'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection'>
              <h2 className='text-[22px] font-semibold'>Últimos Disponibles</h2>
              <p className='text-gray-600'>Últimos productos disponibles en stock.</p>
            </div>
            <div className='rightSection w-[60%]'>

            </div>
          </div>
          <ProductsSlider MockItems={lastAvailable5} />
        </div>
      </section>
      
      {/* Seccion blog */}
      <section className='py-5 bg-white blogSection'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection w-[80%]'>
              <h2 className='text-[22px] font-semibold'>Desde nuestro blog</h2>
              <p className='text-gray-600'>Lee los últimos artículos y noticias.</p>
            </div>
            <div className='rightSection w-[20%] flex items-end justify-end'>
              <Link to="/blog">
                <button className='bg-black text-white py-3 px-6 rounded-sm hover:bg-gray-800 cursor-pointer transition-all'>
                  Ver blog
                </button>
              </Link>
            </div>
        </div>
        <BlogSlider />
        </div>
      </section>
    </>
  )
}

export default HomePage