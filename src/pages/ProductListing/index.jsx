import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { MockItems } from "../../mocks";
import ProductItem from "../../components/ProductItem";
import ProductItemTable from "../../components/ProductItemTable";

import { Button, Pagination } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import {
  ITEMS_PER_PAGE,
  clamp,
  getSortedItems,
  paginateItems,
  getRangeLabel,
} from "../../helpers/productListing.helpers";

import { filterProducts } from "../../helpers/filterProducts.helpers";

/* ======================================================
   Drakos Premium UI wrappers
====================================================== */
const Container = ({ children }) => (
  <div className="max-w-[1400px] mx-auto px-4">{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl bg-white ring-1 ring-black/5 shadow ${className}`}>
    {children}
  </div>
);

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ======================================================
     1) LECTURA DESDE URL (source of truth)
  ====================================================== */
  const pageParam = useMemo(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p >= 1 ? p : 1;
  }, [searchParams]);

  const sortBy = useMemo(
    () => searchParams.get("sort") || "default",
    [searchParams]
  );

  const viewMode = useMemo(() => {
    const v = searchParams.get("view");
    return v === "table" ? "table" : "grid";
  }, [searchParams]);

  /* ======================================================
     2) FILTROS (estado React)
  ====================================================== */
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    rating: null,
    price: [1000, 150000],
  });

  /* ======================================================
     3) updateURL (MUY IMPORTANTE)
     - NO usa searchParams “capturado”
     - siempre parte del prev real
  ====================================================== */
  const updateURL = useCallback(
    (changes) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(changes).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "") {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  /* ======================================================
     4) Pipeline: withIndex -> filter -> sort -> paginate
  ====================================================== */
  const itemsWithIndex = useMemo(
    () => MockItems.map((it, idx) => ({ ...it, __originalIndex: idx })),
    []
  );

  const filteredItems = useMemo(
    () => filterProducts(itemsWithIndex, filters),
    [itemsWithIndex, filters]
  );

  const sortedItems = useMemo(
    () => getSortedItems(filteredItems, sortBy),
    [filteredItems, sortBy]
  );

  /* ======================================================
     5) Reset a page=1 SOLO cuando cambian filtros o sort
        y SOLO si pageParam != 1 (evita reescrituras)
  ====================================================== */
    useEffect(() => {
      // Solo resetear si NO estamos ya en la página 1
      if (pageParam !== 1) {
        updateURL({ page: 1 });
      }
    }, [filters, sortBy]); // 🚫 NO pageParam acá

  /* ======================================================
     6) TotalPages + clamp page
  ====================================================== */
  const totalPages = useMemo(() => {
    const tp = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
    return tp >= 1 ? tp : 1;
  }, [sortedItems.length]);

  const page = useMemo(
    () => clamp(pageParam, 1, totalPages),
    [pageParam, totalPages]
  );

  /* ======================================================
     7) Canonicalizar page inválida (ej: page=999)
        usando updateURL estable
  ====================================================== */
  useEffect(() => {
    if (page !== pageParam) {
      updateURL({ page });
    }
  }, [page, pageParam, updateURL]);

  /* ======================================================
     8) Paginación final
  ====================================================== */
  const { items: currentItems, start, end, totalItems } = useMemo(
    () => paginateItems(sortedItems, page),
    [sortedItems, page]
  );

  const rangeLabel = useMemo(
    () => getRangeLabel(start, end, totalItems),
    [start, end, totalItems]
  );

  /* ======================================================
     9) Handlers UI
  ====================================================== */
  const handleChangePage = useCallback(
    (_e, value) => {
      updateURL({ page: clamp(value, 1, totalPages) });
    },
    [totalPages, updateURL]
  );

  const handleChangeSort = useCallback(
    (value) => updateURL({ sort: value, page: 1 }),
    [updateURL]
  );

  const setGrid = useCallback(() => updateURL({ view: "grid" }), [updateURL]);
  const setTable = useCallback(() => updateURL({ view: "table" }), [updateURL]);

  const isGrid = viewMode === "grid";

  console.log("pageParam:", pageParam, "page:", page, "totalPages:", totalPages);
  /* ======================================================
     UI
  ====================================================== */
  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex gap-8">
          {/* SIDEBAR */}
          <div className="w-[23%]">
            <Card className="p-5">
              <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3 mb-4">
                Filtros
              </h1>
              <Sidebar filters={filters} setFilters={setFilters} />
            </Card>
          </div>

          {/* PRODUCTS */}
          <div className="w-[77%]">
            <Card className="p-5 mb-6">
              <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3">
                Productos
              </h1>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={setGrid}
                    className="!w-[34px] !h-[34px] !min-w-0 rounded-full"
                    sx={{
                      bgcolor: isGrid ? "grey.300" : "white",
                      border: "1px solid",
                      borderColor: "grey.300",
                    }}
                  >
                    <GridViewIcon className={isGrid ? "text-black" : "text-gray-600"} />
                  </Button>

                  <Button
                    onClick={setTable}
                    className="!w-[34px] !h-[34px] !min-w-0 rounded-full"
                    sx={{
                      bgcolor: !isGrid ? "grey.300" : "white",
                      border: "1px solid",
                      borderColor: "grey.300",
                    }}
                  >
                    <TableRowsIcon className={!isGrid ? "text-black" : "text-gray-600"} />
                  </Button>

                  <div className="text-sm text-gray-600 ml-3">
                    Mostrando {rangeLabel}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select
                    className="p-2 bg-white border border-gray-300 rounded-md text-sm"
                    value={sortBy}
                    onChange={(e) => handleChangeSort(e.target.value)}
                  >
                    <option value="default">Predeterminado</option>
                    <option value="price-asc">Precio: bajo a alto</option>
                    <option value="price-desc">Precio: alto a bajo</option>
                    <option value="rating-desc">Calificación</option>
                    <option value="newest">Novedades</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* LISTADO */}
            {currentItems.length === 0 ? (
              <Card className="p-12 text-center text-gray-600 w-full flex flex-col items-center justify-center gap-4">
                <SearchOffIcon sx={{ fontSize: 64, color: "rgba(0,0,0,0.3)" }} />
                <p className="text-base font-medium">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
                <p className="text-sm text-gray-500">
                  Probá ajustando o quitando algunos filtros.
                </p>
              </Card>
            ) : (
              <div
                className={
                  isGrid
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {isGrid
                  ? currentItems.map((item) => <ProductItem key={item.id} item={item} />)
                  : currentItems.map((item) => (
                      <ProductItemTable key={item.id} item={item} />
                    ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="mt-8 flex justify-center">
              <Pagination
                count={totalPages}
                shape="rounded"
                size="large"
                page={page}
                onChange={handleChangePage}
                color="primary"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}