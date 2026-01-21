import React from 'react'
import Sidebar from '../../components/Sidebar'

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
        </div>
    </section>
  )
}

export default ProductListing