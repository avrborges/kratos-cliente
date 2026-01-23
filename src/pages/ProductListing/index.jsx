import React from 'react'
import { useMemo } from 'react'
import Sidebar from '../../components/Sidebar'
import { MockItems } from '../../mocks'
import ProductItem from '../../components/ProductItem'
import { Button } from '@mui/material'

//Icons
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ProductItemTable from '../../components/ProductItemTable'

const ProductListing = () => {

  const [viewMode, setViewMode] = React.useState("grid");
  const [sortBy, setSortBy] = React.useState('default');
  
  const itemsWithIndex = useMemo(
    () => MockItems.map((it, idx) => ({ ...it, __originalIndex: idx })),
    []
  );

  const sortedItems = useMemo(() => {
    const arr = [...itemsWithIndex];

    const toNumber = (v) => (typeof v === 'number' ? v : Number(v ?? 0));

    const getOffer = (it) => {
      // Elegí qué precio usar para el sort:
      // return toNumber(it.price);         // si querés ordenar por price
      return toNumber(it.offerprice);      // ordenar por precio de oferta (recomendado)
    };

    const getCreated = (it) => new Date(it.createdAt).getTime();

    switch (sortBy) {
      case 'price-asc':
        arr.sort((a, b) => getOffer(a) - getOffer(b));
        break;
      case 'price-desc':
        arr.sort((a, b) => getOffer(b) - getOffer(a));
        break;
      case 'rating-desc':
        arr.sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
        break;
      case 'newest':
        arr.sort((a, b) => getCreated(b) - getCreated(a));
        break;
      case 'default':
      default:
        // Volver al orden original
        arr.sort((a, b) => a.__originalIndex - b.__originalIndex);
        break;
    }

    return arr;
  }, [itemsWithIndex, sortBy]);



  return (
    <section className='bg-white'>
      
        <div className="container flex gap-3">
            <div className="sidebarWrapper w-[20%] h-full bg-white p-3">
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

                    <Button
                      onClick={() => setViewMode("grid")}
                      className={`
                        !w-[30px] !h-[30px] !min-w-[30px] rounded-full 
                        transition-all duration-300 ease-in-out
                        hover:scale-105
                        ${viewMode === "grid" 
                          ? "!bg-gray-300 !text-black shadow-md"
                          : "!bg-white !text-[#807A79] hover:!bg-gray-200"
                        }
                      `}
                    >
                      <GridViewIcon 
                        className={`
                          !text-[16px] transition-all duration-300 
                          ${viewMode === "grid" ? "text-black" : "text-[#807A79]"}
                        `}
                      />
                    </Button>

                    <Button
                      onClick={() => setViewMode("table")}
                      className={`
                        !w-[30px] !h-[30px] !min-w-[30px] rounded-full 
                        transition-all duration-300 ease-in-out
                        hover:scale-105
                        ${viewMode === "table"
                          ? "!bg-gray-300 !text-black shadow-md"
                          : "!bg-white !text-[#807A79] hover:!bg-gray-200"
                        }
                      `}
                    >
                      <TableRowsIcon 
                        className={`
                          !text-[16px] transition-all duration-300
                          ${viewMode === "table" ? "text-black" : "text-[#807A79]"}
                        `}
                      />
                    </Button>

                    <div className='text-sm text-gray-600 ml-2'>
                      Mostrando 1–{sortedItems.length} de {sortedItems.length} resultados
                    </div>
                  </div>
                  <div className='col2 flex items-center'> 
                    <span className='text-sm text-gray-600 mr-2'>Ordenar por:</span>
                    <select 
                      className='p-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-sm'
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">Predeterminado</option>
                      <option value="price-asc">Precio: bajo a alto</option>
                      <option value="price-desc">Precio: alto a bajo</option>
                      <option value="rating-desc">Calificación</option>
                      <option value="newest">Novedades</option>
                    </select>
                  </div>
                </div>

                <div className={viewMode === "grid"
                      ? "grid grid-cols-4 md:grid-cols-4 gap-4 mt-4 mb-12"
                      : "flex flex-col mt-4 gap-4 mb-12"}>
                  {sortedItems.map((item) =>
                    viewMode === "grid" ? (
                      <ProductItem key={item.id} item={item} />
                    ) : (
                      <ProductItemTable key={item.id} item={item} />
                    )
                  )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductListing