import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import ScrollToTop from './components/ScrollToTop'
import { createContext } from 'react'
import Login from './pages/Login'
import Register from './pages/Registro'
import TermsAndConditions from './pages/TerminosCondiciones'
import PoliticaDePrivacidad from './pages/Privacidad'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

const AppContext = createContext();
function App() {

  return (
    <>
    <AppContext.Provider>
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/productlisting' element={<ProductListing />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/terminos' element={ <TermsAndConditions />} />
        <Route path='/privacidad' element={ <PoliticaDePrivacidad />} />
        <Route path='/cart' element={ <Cart />} />
        <Route path='/wishlist' element={ <Wishlist />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
