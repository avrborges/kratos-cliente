import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "../Search";
import Navigation from "./Navigation";
import CartDrawer from "../CartDrawer";
import WishlistDrawer from "../WishlistDrawer";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
// Iconoos
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
// Logo
import logo from "../../assets/DRAKOS.png";
// Context
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { isLoggedIn } = useAuth();
  const { cart } = useCart();

  return (
    <header className="w-full bg-white shadow-sm ring-1 ring-black/5">

      {/* ========================= TOP STRIP ========================= */}
      <div className="bg-white border-b border-gray-200 text-gray-700">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between text-[13px]">

          {/* Mensaje */}
          <p className="text-gray-600">
            Envío gratis en compras superiores a $100.000 · Cambios sin cargo
          </p>

          {/* Redes */}
          <ul className="flex items-center gap-4 text-[20px] text-gray-700">

            <li>
              <Link to="/" className="flex items-center gap-1 text-[14px] hover:text-gray-500 transition">
                <FaWhatsapp className="text-[20px]" /> +54 11 2134‑5678
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-gray-500 transition">
                <CiFacebook />
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-gray-500 transition">
                <AiFillInstagram />
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-gray-500 transition">
                <AiFillTwitterCircle />
              </Link>
            </li>
          </ul>

        </div>
      </div>

      {/* ========================= MAIN HEADER ========================= */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-5 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="w-[25%]">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="DRAKOS Logo" className="w-[180px] h-auto" />
            </Link>
          </div>

          {/* Buscador */}
          <div className="w-[45%]">
            <Search />
          </div>

          {/* LOGIN - REGISTRO + ICONOS */}
          <div className="w-[30%] relative flex items-center">

            {/* Login / Registro */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <ul className="flex items-center gap-2 text-[14px] text-gray-700">
                <li>
                  <Link to="/login" className="hover:text-gray-500 transition font-medium">
                    Login
                  </Link>
                </li>
                <li className="text-gray-300">|</li>
                <li>
                  <Link to="/registro" className="hover:text-gray-500 transition font-medium">
                    Registro
                  </Link>
                </li>
              </ul>
            </div>

            {/* ICONOS DERECHA */}
            <div className="ml-auto flex items-center gap-3">

              {/* Favoritos */}
              <Tooltip title={isLoggedIn ? "Favoritos" : "Iniciá sesión para ver tus favoritos"}>
                <span>
                  <IconButton
                    size="small"
                    onClick={() => isLoggedIn && setWishlistOpen(true)}
                    disabled={!isLoggedIn}
                    sx={{
                      bgcolor: "white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
                      borderRadius: "50%",
                      opacity: isLoggedIn ? 1 : 0.5,
                      "&:hover": {
                        bgcolor: isLoggedIn ? "gray.100" : "white",
                      },
                    }}
                  >
                    <Badge badgeContent={isLoggedIn ? wishlist.length : 0} color="primary">
                      <FavoriteBorderIcon className="text-gray-700" />
                    </Badge>
                  </IconButton>
                </span>
              </Tooltip>

              {/* Carrito */}
              <Tooltip title={isLoggedIn ? "Carrito de compras" : "Iniciá sesión para ver tu carrito"}>
                <span>
                  <IconButton
                    size="small"
                    onClick={() => isLoggedIn && setCartOpen(true)}
                    disabled={!isLoggedIn}
                    sx={{
                      bgcolor: "white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
                      borderRadius: "50%",
                      opacity: isLoggedIn ? 1 : 0.5,
                      "&:hover": {
                        bgcolor: isLoggedIn ? "gray.100" : "white",
                      },
                    }}
                  >
                    <Badge badgeContent={isLoggedIn ? cart.length : 0} color="primary">
                      <ShoppingCartIcon className="text-gray-700" />
                    </Badge>
                  </IconButton>
                </span>
              </Tooltip>

            </div>
          </div>

        </div>
      </div>

      {/* ========================= NAVIGATION ========================= */}
      <Navigation />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </header>
  );
};

export default Header;