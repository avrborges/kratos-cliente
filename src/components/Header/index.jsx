import { Link } from 'react-router-dom'
import Search from '../Search'
import Navigation from './Navigation';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareIcon from '@mui/icons-material/Compare';
import Tooltip from '@mui/material/Tooltip';


const Header = ({ MockCategories }) => {
  return (
    <header>
        {/* Top Strip */}
        <div className='top-strip py-1 border-b border-gray-300 bg-white'>
            <div className='container'>
                <div className='flex justify-between items-center'>
                    <div className='col1 w-[50%]'>
                        <p className='text-[12px]'>Envío gratis en compras superiores a $100.000 y cambios sin cargo</p>
                    </div>
                    <div className='col2 flex items-center justify-end'>
                        <ul className='flex items-center gap-3'>
                            <li className='list-none'>
                                <Link to='/' className='text-[12px] link transition'>Contacto</Link>
                            </li>
                            <li className='list-none'>
                                <Link to='/' className='text-[12px] link transition'>Seguimiento</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {/* Main Header */} 
        <div className='header border-b border-gray-300 py-4 bg-white'>
            <div className='container flex justify-between items-center p-2'>
                {/* Logo */}
                <div className='col1 w-[25%]'>
                    <Link to='/' className='text-[24px] font-bold'>KRATOS</Link>
                </div>
                {/* Buscador */}
                <div className='col2 w-[45%]'>
                    <Search />
                </div>
                {/* Login & Registro */}
                <div className='col3 w-[30%] flex items-center justify-center gap-4'>
                    <ul className='flex items-center gap-2'>
                        <li className='flex items-start gap-2 justify-start'>
                        <Link to='/' className='text-[14px] link transition'>Login</Link>|
                        <Link to='/' className='text-[14px] link transition'>Registro</Link>
                        </li>
                        {/* Iconos de usuario */}
                        <li className='ml-4'>
                        <Tooltip title="Comparar Productos">
                            <IconButton>
                                <Badge badgeContent={2} color="primary">
                                    <CompareIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        </li>     
                        <li>
                        <Tooltip title="Favoritos">
                            <IconButton>
                                <Badge badgeContent={2} color="primary">
                                    <FavoriteBorderIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        </li>
                        <li>
                        <Tooltip title="Carrito de Compras">
                            <IconButton>
                                <Badge badgeContent={2} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        </li>                      
                    </ul>
                </div>
            </div>
        </div>

        <Navigation MockCategories={MockCategories} />
    </header>
  )
}

export default Header