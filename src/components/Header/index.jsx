import { Link } from 'react-router-dom'
import Search from '../Search'
import Navigation from './Navigation';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareIcon from '@mui/icons-material/Compare';
import Tooltip from '@mui/material/Tooltip';

import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

import logo from '../../assets/DRAKOS.png'


const Header = () => {
  return (
    <header>
        {/* Top Strip */}
        <div className='top-strip py-1 border-b border-gray-300 bg-white'>
            <div className='container'>
                <div className='flex justify-between items-center'>
                    <div className='col1 w-[50%]'>
                        <p className='text-[12px]'>Envío gratis en compras superiores a $100.000 y cambios sin cargo</p>
                    </div>
                        <div className="col2 flex items-center justify-end">
                        <ul className="flex items-center gap-4">
                            <li className="list-none">
                            <Link
                                to="/"
                                className="flex items-center gap-1 text-[14px] link transition"
                            >
                                <FaWhatsapp className="text-[22px]" />
                                +54 11 2134-5678
                            </Link>
                            </li>

                            <li className="list-none">
                            <Link to="/" className="text-[22px] link transition">
                                <CiFacebook />
                            </Link>
                            </li>

                            <li className="list-none">
                            <Link to="/" className="text-[22px] link transition">
                                <AiFillInstagram />
                            </Link>
                            </li>

                            <li className="list-none">
                            <Link to="/" className="text-[22px] link transition">
                                <AiFillTwitterCircle />
                            </Link>
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
            <Link to='/' className='text-[24px] font-bold'>
                <img src={logo} alt='DRAKOS Logo' className='w-[200px] h-auto' />
            </Link>
            </div>

            {/* Buscador */}
            <div className='col2 w-[45%]'>
            <Search />
            </div>

            {/* Login & Registro centrados / Iconos a la derecha */}
            <div className="col3 w-[30%] relative flex items-center">
            {/* Links centrados absolutamente dentro de col3 */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <ul className="flex items-center gap-2">
                <li>
                    <Link to="/" className="text-[14px] link transition">Login</Link>
                </li>
                <li className="text-gray-300">|</li>
                <li>
                    <Link to="/" className="text-[14px] link transition">Registro</Link>
                </li>
                </ul>
            </div>

            {/* Grupo de iconos pegado a la derecha */}
            <div className="ml-auto flex items-center gap-2">
                <Tooltip title="Favoritos">
                <IconButton size="small">
                    <Badge badgeContent={2} color="primary">
                    <FavoriteBorderIcon />
                    </Badge>
                </IconButton>
                </Tooltip>

                <Tooltip title="Carrito de Compras">
                <IconButton size="small">
                    <Badge badgeContent={2} color="primary">
                    <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                </Tooltip>
            </div>
            </div>
        </div>
        </div>
        <Navigation />
    </header>
  )
}

export default Header