import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormSuscription from './NewsletterForm';


const Footer = () => {
  return (
    
    <footer className='pt-8 bg-white'>
        <div className="container">
            {/* Datos de contacto */}
            <div className="flex items-center justify-center gap-6 text-center mx-auto w-[100%] pb-12 border-b border-gray-300 ">
                <div className='col flex items-center justify-center flex-col group w-[30%]'>
                    <LocalShippingOutlinedIcon className='!text-[40px]'/>
                    <h3 className='text-[18px] font-bold'>
                        Envíos a todo el país
                    </h3>
                    <p className='text-[14px] font-[300]'>
                        Para todas las compras realizadas desde el sitio.
                    </p>
                </div>
                <div className='col flex items-center justify-center flex-col group w-[30%]'>
                    <WalletOutlinedIcon className='!text-[40px]'/>
                    <h3 className='text-[18px] font-bold'>
                        Elegí tu método de pago
                    </h3>
                    <p className='text-[14px] font-[300]'>
                        Podés pagar con tarjeta, débito, efectivo o transferencia.
                    </p>
                </div>
                <div className='col flex items-center justify-center flex-col group w-[30%]'>
                    <ShieldOutlinedIcon className='!text-[40px]'/>
                    <h3 className='text-[18px] font-bold'>
                        Tu compra es segura
                    </h3>
                    <p className='text-[14px] font-[300]'>
                        Todos los productos son enviados con seguridad y con garantía de calidad.
                    </p>
                </div>
            </div>

            <div className="flex mt-5 gap-8 items-center justify-between">
                {/* Links de interes */}
                <div className='col p-2 w-[30%]'>
                    <h3 className='text-[18px] font-bold'>
                        Contacto
                    </h3>
                    <p className='text-[14px] font-[300] mt-2'>
                        Si tienes alguna pregunta o necesitas ayuda, <br></br>no dudes en contactarnos.
                    </p>
                    <p className='text-[14px] font-[300] mt-2 flex items-center gap-2'>
                        <IoMdPin/> Av. Siempre Viva 1234, <br></br>
                        Ciudad Autonoma de Buenos Aires, Argentina
                    </p>
                    <p className='text-[14px] font-[300] mt-2 flex items-center gap-2'>
                        <MdAlternateEmail /> example@email.com
                    </p>
                    <Link to="https://wa.me/541112345678" target="_blank" className='text-[24px] font-semibold mt-2 flex items-center gap-2'>
                    <p className='text-[24px] font-semibold mt-2 flex items-center gap-2'>
                       <FaWhatsapp /> +54 11 1234-5678
                    </p>
                    </Link>
                </div>
                <div className='col p-2 w-[30%]'>
                    <h3 className='text-[18px] font-bold mb-2'>
                    Más información
                    </h3>
                    <ul className='list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Como comprar
                            </Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Política de privacidad
                            </Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Política de devoluciones
                            </Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Política de envio
                            </Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Quienes somos
                            </Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/">
                                Nuestro Blog
                            </Link>
                        </li>
                    </ul>

                </div>
                <div className='col p-2 w-[40%]'>
                    <h3 className='text-[18px] font-bold mb-2'>
                        Suscribite a nuestro Newsletter
                    </h3>
                    <p className='text-[14px] font-[300] mt-2'>
                        Recibe las últimas novedades, promociones y ofertas.
                    </p>

                    <div className='mt-4'>
                        {/* Formulario de Suscripcion a Newsletters */}
                        <FormSuscription />
                    </div>
                </div>
            </div>
            <div className='border-t border-gray-300 mt-5'>
                <div className="max-w-5xl mx-auto py-4 text-center">
                    <p className="text-sm text-gray-600 font-light">
                    © {new Date().getFullYear()} Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    </footer>
    

)
}

export default Footer