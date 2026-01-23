import React from 'react'
import Sidebar from '../../components/Sidebar'
import { MockItems } from '../../mocks'
import ProductItem from '../../components/ProductItem'
import { Button } from '@mui/material'

//Icons
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';

const ProductListing = () => {
  return (
    <section className='bg-white'>
      
        <div className="container flex gap-3">
            <div className="sidebarWrapper w-[20%] h-full bg-white p-3 shadow-[2px_0_4px_rgba(0,0,0,0.08)]">
                <h1 className='text-[18px] font-[800] uppercase w-full border-b border-gray-200 pb-3'>
                  Filtros
                </h1>
                <Sidebar />
            </div>
            <div className="productsWrapper w-[80%] p-3">
                <h1 className='text-[18px] font-[800] uppercase w-full border-b border-gray-200 pb-3'>
                  Productos
                </h1>
                <div className="bg-[#f1f1f1] p-2 w-full mb-3 flex items-center justify-between">
                  <div className=' col1 flex items-center gap-2'>
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] rounded-full !text-[#807A79]'>
                      <GridViewIcon className='text-black !text-[16px]' />
                    </Button>
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] rounded-full !text-[#807A79]'>
                      <TableRowsIcon className='text-black !text-[16px]' />
                    </Button>
                    <div className='text-sm text-gray-600 ml-2'>
                      Mostrando 1-24 de 200 resultados
                    </div>
                  </div>
                  <div className='col2 flex items-center'> 
                    <span className='text-sm text-gray-600 mr-2'>Ordenar por:</span>
                    <select className='p-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-sm'>
                      <option value="default">Predeterminado</option>
                      <option value="price-asc">Precio: bajo a alto</option>
                      <option value="price-desc">Precio: alto a bajo</option>
                      <option value="rating-desc">Calificación</option>
                      <option value="newest">Novedades</option>
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-4 md:grid-cols-4 gap-4 mt-4'>
                  {MockItems.map((item) => (
                    <ProductItem item={item} 
                    />
                  ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductListing