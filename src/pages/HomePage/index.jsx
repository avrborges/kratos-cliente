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

// Helpers
import {
  filterByCategory,
  getTop5BestSellers,
  getTop5NewItems,
  getTop5Featured,
  getTop5LastAvailable,
} from "../../helpers/homePage.helpers";

/** UI helpers (Drakos Premium UI) */
const Container = ({ children }) => (
  <div className="max-w-[1400px] mx-auto px-4">{children}</div>
);

const Card = ({ children }) => (
  <div className="rounded-xl bg-white ring-1 ring-black/5 shadow px-6 pt-6 pb-2">
    {children}
  </div>
);

const SectionCard = React.memo(function SectionCard({
  title,
  subtitle,
  rightSlot,
  children,
}) {
  return (
    <section className="py-10 bg-white">
      <Container>
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="min-w-0">
              <h2 className="text-[22px] font-semibold text-gray-900">{title}</h2>
              {subtitle ? (
                <p className="text-gray-500 text-[14px]">{subtitle}</p>
              ) : null}
            </div>

            {rightSlot ? <div className="md:w-[60%]">{rightSlot}</div> : null}
          </div>

          <div className="mt-2 -mx-2">{children}</div>
        </Card>
      </Container>
    </section>
  );
});

const HomePage = () => {
  const [category, setCategory] = React.useState("Todos");

  const handleChangeCategory = React.useCallback((_, newValue) => {
    setCategory(newValue);
  }, []);

  /** Tabs memo: estable */
  const categoryTabs = React.useMemo(() => {
    return [
      { key: "Todos", value: "Todos", label: "Todos" },
      ...MockCategories.map((c) => ({
        key: c.id,
        value: c.name,
        label: c.name,
      })),
    ];
  }, []);

  /**
   * Un solo memo: evita múltiples pasadas y deja claro qué depende de qué.
   * Si mañana MockItems viene de props/estado, cambiás MockItems por items y listo.
   */
  const computed = React.useMemo(() => {
    const bestSellers = getTop5BestSellers(filterByCategory(MockItems, category));
    const newItems = getTop5NewItems(MockItems);
    const featured = getTop5Featured(MockItems);
    const lastAvailable = getTop5LastAvailable(MockItems);

    return { bestSellers, newItems, featured, lastAvailable };
  }, [category]);

  const tabsUI = (
    <Tabs
      value={category}
      onChange={handleChangeCategory}
      variant="scrollable"
      scrollButtons="auto"
    >
      {categoryTabs.map((t) => (
        <Tab key={t.key} value={t.value} label={t.label} />
      ))}
    </Tabs>
  );

  return (
    <>
      <HomeSlider />
      <CategorySlider />

      {/* Más vendidos */}
      <SectionCard
        title="Productos más vendidos"
        subtitle="Descubrí nuestros productos más vendidos."
        rightSlot={tabsUI}
      >
        <ProductsSlider MockItems={computed.bestSellers} />
      </SectionCard>

      {/* Envío gratis + Ads */}
      <section className="py-10 bg-white flex flex-col gap-8">
        <Container>
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
        </Container>

        <Container>
          <AdsBannerSlider />
        </Container>
      </section>

      {/* Nuevos ingresos */}
      <SectionCard
        title="Últimos ingresos"
        subtitle="Explorá los productos más recientes."
      >
        <ProductsSlider MockItems={computed.newItems} />
      </SectionCard>

      {/* Destacados */}
      <SectionCard
        title="Productos Destacados"
        subtitle="Descubrí nuestros productos destacados."
      >
        <ProductsSlider MockItems={computed.featured} />
      </SectionCard>

      {/* Últimos disponibles */}
      <SectionCard
        title="Últimos disponibles"
        subtitle="Quedan pocas unidades."
      >
        <ProductsSlider MockItems={computed.lastAvailable} />
      </SectionCard>

      {/* Blog */}
      <section className="py-10 bg-white">
        <Container>
          <Card>
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
          </Card>
        </Container>
      </section>
    </>
  );
};

export default HomePage;