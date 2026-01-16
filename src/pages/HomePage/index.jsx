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

const MockItems = [
  {
    id: 1,
    category: 'Hombres',
    brand: 'Soylent Green',
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    rating: 4,
    price: 19999,
    offerprice: 14999,
    discount: 20,
    totalSales: 150,
    stock: 50,
    featured: true,
    image: 'https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp',
    createdAt: '2024-06-01T10:00:00Z'
  },
  {
    id: 2,
    category: 'Mujeres',
    brand: 'Pantone',
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    rating: 5, 
    price: 29999,
    offerprice: 24999,
    discount: 25,
    totalSales: 200,
    stock: 75,
    featured: true,
    image: 'https://serviceapi.spicezgold.com/download/1742462733293_zoom_1-1673275603.webp',
    createdAt: '2024-06-05T12:00:00Z'
  },
  {
    id: 3,
    category: 'Niños',
    brand: 'Globex Corporation',
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    rating: 3,
    price: 39999, 
    offerprice: 34999,
    discount: 15,
    totalSales: 100,
    stock: 3,
    featured: false,
    image: 'https://serviceapi.spicezgold.com/download/1742462736761_zoom_1-1673275611.webp',
    createdAt: '2024-06-10T14:00:00Z'
  },
  {
    id: 4,
    category: 'Calzados',
    brand: 'Constantine',
    name: 'Producto 4',
    description: 'Descripción del producto 4',
    rating: 4,
    price: 49999, 
    offerprice: 44999,
    discount: 10,
    totalSales: 180,
    stock: 20,
    featured: false,
    image: 'https://serviceapi.spicezgold.com/download/1742462740123_zoom_1-1673275618.webp',
    createdAt: '2024-06-15T16:00:00Z'
  },
  {
    id: 5,
    category: 'Accesorios',
    brand: 'MegaCorp',
    name: 'Producto 5',
    description: 'Descripción del producto 5',
    rating: 2,
    price: 59999,
    offerprice: 54999,
    discount: 8,
    totalSales: 80,
    stock: 5,
    featured: false,
    image: 'https://serviceapi.spicezgold.com/download/1742462743461_zoom_1-1673275625.webp',
    createdAt: '2024-06-20T18:00:00Z'
  },
  {
    id: 6,
    category: 'Ofertas',
    brand: 'Nike',
    name: 'Producto 6',
    description: 'Descripción del producto 6',
    rating: 5,
    price: 79999,
    offerprice: 69999,
    discount: 0,
    totalSales: 250,
    stock: 30,
    featured: true,
    image: 'https://serviceapi.spicezgold.com/download/1742462746789_zoom_1-1673275632.webp',
    createdAt: '2026-01-15T11:00:00Z'
  },
  {
    id: 7,
    category: 'Calzados',
    brand: 'Adidas',
    name: 'Producto 7',
    description: 'Descripción del producto 7',
    rating: 4,
    price: 69999,
    offerprice: 64999,
    discount: 5,
    totalSales: 220,
    stock: 15,
    featured: true,
    image: 'https://serviceapi.spicezgold.com/download/1742462750123_zoom_1-1673275639.webp',
    createdAt: '2024-06-25T09:00:00Z'
  },
  {
    id: 8,
    category: 'Ofertas',
    brand: 'Puma',
    name: 'Producto 8',
    description: 'Descripción del producto 8',
    rating: 3,
    price: 59999,
    offerprice: 54999,
    discount: 10,
    totalSales: 160,
    stock: 8,
    featured: false,
    image: 'https://serviceapi.spicezgold.com/download/1742462753456_zoom_1-1673275646.webp',
    createdAt: '2024-06-28T13:00:00Z'
  },
  {
    id: 9,
    category: 'Niños',
    brand: 'Adidas',
    name: 'Producto 9',
    description: 'Descripción del producto 9',
    rating: 5,
    price: 89999,
    offerprice: 79999,
    discount: 15,
    totalSales: 300,
    stock: 25,
    featured: true,
    image: 'https://serviceapi.spicezgold.com/download/1742462756789_zoom_1-1673275653.webp',
    createdAt: '2024-06-30T15:00:00Z'
  },
  {
    id: 10,
    category: 'Accesorios',
    brand: 'Nike',
    name: 'Producto 10',
    description: 'Descripción del producto 10',
    rating: 4,
    price: 99999,
    offerprice: 89999,
    discount: 20,
    totalSales: 280,
    stock: 12,
    featured: false,
    image: 'https://serviceapi.spicezgold.com/download/1742462760123_zoom_1-1673275660.webp',
    createdAt: '2024-07-02T17:00:00Z'
  }
]

// Normaliza strings: quita acentos, trim y minúsculas
const normalize = (str) =>
  String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const HomePage = ({ MockCategories }) => {
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
      .slice(0, 5);
  }, [value]);

  // Filtror para nuevos productos (los más recientes)
  const sortedByNew = React.useMemo(() => {
    return [...MockItems]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5); // Top 10 nuevos
  }, []);

  // Filtrar productos destacados
  const featuredProducts = React.useMemo(() => {
    return [...MockItems]
      .filter(item => item.featured === true)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, []);

  // Filtrar últimos disponibles (stock bajo)
  const lastAvailable5 = React.useMemo(() => {
    return [...MockItems]
      .filter(item => Number(item.stock) <= 5)       // productos con poco stock
      .sort((a, b) => a.stock - b.stock)            // opcional: menor stock primero
      .slice(0, 5);                                 // Top 5 últimos disponibles
  }, []);

  return (
    <>
      {/* Slider principal de la página de inicio */}
      <HomeSlider />
      {/* Slider de categorías */}
      <CategorySlider MockCategories={MockCategories} />
      
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
      <section className='py-4 bg-white flex flex-col gap-2'>
        <div className="container flex justify-center">
          <div className="EnvioBanner flex items-center justify-between w-[80%] border border-primary p-6">
            <div className="col_1 flex items-center">
              <LocalShippingIcon className='text-primary text-[50px] mr-4'/>
              <span>
                <h3 className='text-[20px] font-semibold uppercase'>Envío gratis</h3>
                <p className='text-gray-600'>En compras superiores a $100.000</p>
              </span>
            </div>
            <div className="col_2">
            <Link to="/deals">
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