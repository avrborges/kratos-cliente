import React from 'react'
import HomeSlider from '../../components/HomeSlider'
import CategorySlider from '../../components/Header/CategorySlider'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';


const HomePage = ({ MockCategories }) => {

  const [value, setValue] = React.useState(0);
  const handleChangeMenuSlider = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <CategorySlider MockCategories={MockCategories} />

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
                <Tab value={0} label="Todos" />
                {MockCategories.map((category) => (
                  <Tab key={category.id} value={category.id} label={category.name} />
                ))}
              </Tabs>
            </div>
          </div>
          <ProductsSlider />
        </div>
      </section>

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

      <section className='py-5 bg-white'>
        <div className="container mt-10">
          <div className='flex items-center justify-between'>
            <div className='leftSection'>
              <h2 className='text-[22px] font-semibold'>Nuevos Productos</h2>
              <p className='text-gray-600'>Explora los productos más recientes en nuestra tienda.</p>
            </div>
            <div className='rightSection w-[60%]'>

            </div>
          </div>
          <ProductsSlider />
        </div>
      </section>

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
          <ProductsSlider />
        </div>
      </section>

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>

    </>
  )
}

export default HomePage