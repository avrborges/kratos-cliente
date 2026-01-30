import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import ScrollToTop from './components/ScrollToTop'
import { createContext } from 'react'

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
      </Routes>
      <Footer />
    </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
