// Menú de navegación superior con categorías y enlaces
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';
import { useCallback, useState } from 'react';

const Navigation = ({ MockCategories }) => {

    const [openCategoryPanel, setOpenCategoryPanel] = useState(false);

    const handleOpen = useCallback(() => {
        setOpenCategoryPanel(true);
    }
    , []);

    const handleClose = useCallback(() => {
        setOpenCategoryPanel(false);
    }
    , []);

  return (
    <>
        <nav className='py-2 border-b border-gray-300 bg-white'>
        <div className="container py-3 flex items-center justify-start">
            <div className="col_1 w-[30%]">
                <Button 
                    className='capitalize font-bold gap-2' 
                    onClick={handleOpen} 
                    variant="text" 
                    style={{color:'black', fontWeight:'bold'}}
                    aria-haspopup="true"
                    aria-expanded={openCategoryPanel ? 'true' : 'false'}
                    aria-controls='category-drawer'
                >
                    <MenuIcon className='text-[18px]' /> Categorias <KeyboardArrowDownIcon className='text-[12px] ml-auto' />
                </Button>
            </div>
            <div className="col_2 w-[55%]">
                <ul className='flex items-center gap-6'>
                    <li className='list-none'>
                        <Link to='/' className='text-[14px] link transition font-[1500]'>Inicio</Link>
                    </li>
                    {MockCategories.map((category) => (
                        <li key={category.id} className='list-none'>
                            <Link to={category.link} className='text-[14px] link transition font-[1500]'>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col_3 w-[20%] flex justify-end items-end gap-2">
                <LocalShippingIcon className='text-[14px]' />
                <p className='text-[14px] font-[500]'>
                    Envíos a todo el país
                </p>
            </div>
        </div>
    </nav>

    {/* <Category Panel Component /> */}
    <CategoryPanel
        open={openCategoryPanel}
        onClose={handleClose}
        MockCategories={MockCategories}
    />
    </>
    )
}

export default Navigation