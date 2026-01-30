import React, { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { MockItems } from "../../mocks";
import ProductItem from "../../components/ProductItem";
import ProductItemTable from "../../components/ProductItemTable";
import { Button } from "@mui/material";

import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";

const ProductListing = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  const itemsWithIndex = useMemo(
    () => MockItems.map((it, idx) => ({ ...it, __originalIndex: idx })),
    []
  );

  const sortedItems = useMemo(() => {
    const arr = [...itemsWithIndex];
    const toNumber = (v) => (typeof v === "number" ? v : Number(v ?? 0));
    const getOffer = (it) => toNumber(it.offerprice);
    const getCreated = (it) => new Date(it.createdAt).getTime();

    switch (sortBy) {
      case "price-asc":
        arr.sort((a, b) => getOffer(a) - getOffer(b));
        break;
      case "price-desc":
        arr.sort((a, b) => getOffer(b) - getOffer(a));
        break;
      case "rating-desc":
        arr.sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
        break;
      case "newest":
        arr.sort((a, b) => getCreated(b) - getCreated(a));
        break;
      default:
        arr.sort((a, b) => a.__originalIndex - b.__originalIndex);
        break;
    }

    return arr;
  }, [itemsWithIndex, sortBy]);

  return (
    <section className="bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-4 flex gap-8">

        {/* Sidebar */}
        <div className="w-[23%]">
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] p-5">
            <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3 mb-4">
              Filtros
            </h1>
            <Sidebar />
          </div>
        </div>

        {/* Products Area */}
        <div className="w-[77%]">

          {/* Header */}
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] p-5 mb-6">
            <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3">
              Productos
            </h1>

            {/* Toolbar: View mode + Sort */}
            <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 ring-1 ring-black/5 shadow-sm">

              {/* View Mode Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setViewMode("grid")}
                  className="!w-[34px] !h-[34px] !min-w-[34px] rounded-full transition-all duration-300"
                  sx={{
                    bgcolor: viewMode === "grid" ? "gray.300" : "white",
                    border: "1px solid",
                    borderColor:
                      viewMode === "grid" ? "gray.400" : "rgba(0,0,0,0.2)",
                    "&:hover": {
                      bgcolor: viewMode === "grid" ? "gray.400" : "gray.100",
                    },
                  }}
                >
                  <GridViewIcon
                    className={`!text-[16px] ${
                      viewMode === "grid" ? "text-black" : "text-gray-600"
                    }`}
                  />
                </Button>

                <Button
                  onClick={() => setViewMode("table")}
                  className="!w-[34px] !h-[34px] !min-w-[34px] rounded-full transition-all duration-300"
                  sx={{
                    bgcolor: viewMode === "table" ? "gray.300" : "white",
                    border: "1px solid",
                    borderColor:
                      viewMode === "table" ? "gray.400" : "rgba(0,0,0,0.2)",
                    "&:hover": {
                      bgcolor: viewMode === "table" ? "gray.400" : "gray.100",
                    },
                  }}
                >
                  <TableRowsIcon
                    className={`!text-[16px] ${
                      viewMode === "table" ? "text-black" : "text-gray-600"
                    }`}
                  />
                </Button>

                <div className="text-sm text-gray-600 ml-2">
                  Mostrando 1–{sortedItems.length} de {sortedItems.length} resultados
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select
                  className="p-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          </div>

          {/* Product Grid / Table */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
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
  );
};

export default ProductListing;