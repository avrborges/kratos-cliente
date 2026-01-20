import React from 'react'
import Sidebar from '../../components/Sidebar'

const ProductListing = ({MockCategories}) => {
  return (
    <section className='py-8 bg-white'>
        <div className="container flex gap-3">
            <div className="sidebarWrapper w-[20%] h-full bg-white p-3">
                <Sidebar MockCategories={MockCategories} />
            </div>
        </div>
    </section>
  )
}

export default ProductListing