import React from "react";
import { Link } from "react-router-dom";

// Components
import HomeSlider from "../../components/HomeSlider";
import CategorySlider from "../../components/Header/CategorySlider";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import ProductsSlider from "../../components/ProductsSlider";
import BlogSlider from "../../components/BlogSlider";

// MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Data
import { MockCategories, MockItems } from "../../mocks";

// Helpers externos
import {
  normalize,
  filterByCategory,
  getTop5BestSellers,
  getTop5NewItems,
  getTop5Featured,
  getTop5LastAvailable,
} from "./homePage.helpers";

const HomePage = () => {
  const [value, setValue] = React.useState("Todos");
  const handleChangeMenuSlider = (_, newValue) => setValue(newValue);

  // → Filtrar por categoría y luego obtener top 5 más vendidos
  const filteredAndTop5 = React.useMemo(() => {
    const filtered = filterByCategory(MockItems, value);
    return getTop5BestSellers(filtered);
  }, [value]);

  // → Últimos productos
  const sortedByNew = React.useMemo(
    () => getTop5NewItems(MockItems),
    []
  );

  // → Destacados
  const featuredProducts = React.useMemo(
    () => getTop5Featured(MockItems),
    []
  );

  // → Últimos disponibles
  const lastAvailable5 = React.useMemo(
    () => getTop5LastAvailable(MockItems),
    []
  );

  return (
    <>
      <HomeSlider />
      <CategorySlider />

      {/* Sección – Más vendidos */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-[22px] font-semibold text-gray-900">
                  Productos más vendidos
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Descubrí nuestros productos más vendidos.
                </p>
              </div>

              <div className="md:w-[60%]">
                <Tabs
                  value={value}
                  onChange={handleChangeMenuSlider}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="Todos" label="Todos" />
                  {MockCategories.map((category) => (
                    <Tab key={category.id} value={category.name} label={category.name} />
                  ))}
                </Tabs>
              </div>
            </div>

            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={filteredAndTop5} />
            </div>
          </div>
        </div>
      </section>

      {/* Envío gratis */}
      <section className="py-10 bg-white flex flex-col gap-8">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center">
          <div className="EnvioBanner w-full rounded-xl bg-gray-50 ring-1 ring-black/5 shadow px-8 py-8 flex justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur flex items-center justify-center ring-1 ring-black/5 shadow-sm">
                <LocalShippingIcon className="text-gray-700 !text-[34px]" />
              </div>

              <div>
                <h3 className="text-[26px] font-semibold text-gray-900">
                  Envío gratis
                </h3>
                <p className="text-gray-600 text-[15px]">
                  En compras superiores a $100.000
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4">
              <Link to="/productListing">
                <button className="bg-black text-white font-semibold rounded-lg px-8 py-3 transition hover:bg-gray-900 hover:-translate-y-[1px] shadow">
                  Comprar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4">
          <AdsBannerSlider />
        </div>
      </section>

      {/* Nuevos ingresos */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">

            <div className="flex flex-col md:flex-row md:justify-between mb-4">
              <div>
                <h2 className="text-[22px] font-semibold text-gray-900">
                  Últimos ingresos
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Explorá los productos más recientes.
                </p>
              </div>
            </div>

            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={sortedByNew} />
            </div>

          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">

            <div className="mb-4">
              <h2 className="text-[22px] font-semibold text-gray-900">
                Productos Destacados
              </h2>
              <p className="text-gray-500 text-[14px]">
                Descubrí nuestros productos destacados.
              </p>
            </div>

            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={featuredProducts} />
            </div>

          </div>
        </div>
      </section>

      {/* Últimos disponibles */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">

            <div className="mb-4">
              <h2 className="text-[22px] font-semibold text-gray-900">
                Últimos disponibles
              </h2>
              <p className="text-gray-500 text-[14px]">
                Quedan pocas unidades.
              </p>
            </div>

            <div className="mt-2 -mx-2">
              <ProductsSlider MockItems={lastAvailable5} />
            </div>

          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">

          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">

            <div className="flex justify-between mb-4">
              <div className="w-[70%]">
                <h2 className="text-[22px] font-semibold text-gray-900">
                  Desde nuestro blog
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Leé los últimos artículos.
                </p>
              </div>

              <div className="flex justify-end w-[30%]">
                <Link to="/blog">
                  <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-900 hover:-translate-y-[1px] transition">
                    Ver blog
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-2 -mx-2">
              <BlogSlider />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;