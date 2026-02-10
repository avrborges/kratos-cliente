import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { MockItems } from "../../mocks";
import ProductItem from "../../components/ProductItem";
import ProductItemTable from "../../components/ProductItemTable";

import { Button, Pagination } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";

import {
  ITEMS_PER_PAGE,
  clamp,
  getSortedItems,
  paginateItems,
  getRangeLabel,
  updateURLParams
} from "./productListing.helpers";

export default function ProductListing() {
  /* -----------------------------------------
   * URL Search Params
   * ----------------------------------------- */
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado inicial sincronizado con URL
  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p >= 1 ? p : 1;
  });

  const [sortBy, setSortBy] = useState(() => {
    return searchParams.get("sort") || "default";
  });

  const [viewMode, setViewMode] = useState(() => {
    return searchParams.get("view") || "grid";
  });

  // Actualizar estado si usuario cambia la URL manualmente
  useEffect(() => {
    const p = Number(searchParams.get("page"));
    if (Number.isFinite(p) && p >= 1) setPage(p);

    const s = searchParams.get("sort");
    if (s) setSortBy(s);

    const v = searchParams.get("view");
    if (v) setViewMode(v);
  }, [searchParams]);

  /* -----------------------------------------
   * Items + Ordenamiento
   * ----------------------------------------- */
  const itemsWithIndex = useMemo(
    () => MockItems.map((it, idx) => ({ ...it, __originalIndex: idx })),
    []
  );

  const sortedItems = useMemo(
    () => getSortedItems(itemsWithIndex, sortBy),
    [itemsWithIndex, sortBy]
  );

  /* -----------------------------------------
   * Paginación
   * ----------------------------------------- */
  const {
    items: currentItems,
    start,
    end,
    totalItems,
    totalPages
  } = useMemo(
    () => paginateItems(sortedItems, page),
    [sortedItems, page]
  );

  const rangeLabel = useMemo(
    () => getRangeLabel(start, end, totalItems),
    [start, end, totalItems]
  );

  // Si el page es inválido, ajustarlo
  useEffect(() => {
    if (page > totalPages) {
      const fixed = totalPages;
      setPage(fixed);
      updateURLParams(searchParams, setSearchParams, { page: fixed });
    }
  }, [page, totalPages]);

  /* -----------------------------------------
   * Handlers
   * ----------------------------------------- */
  const updateURL = useCallback(
    (changes) => updateURLParams(searchParams, setSearchParams, changes),
    [searchParams, setSearchParams]
  );

  const handleChangePage = useCallback(
    (_e, value) => {
      const fixed = clamp(value, 1, totalPages);
      setPage(fixed);
      updateURL({ page: fixed });
    },
    [totalPages, updateURL]
  );

  const handleChangeSort = useCallback(
    (value) => {
      setSortBy(value);
      setPage(1);
      updateURL({ sort: value, page: 1 });
    },
    [updateURL]
  );

  const handleChangeViewMode = useCallback(
    (mode) => {
      setViewMode(mode);
      updateURL({ view: mode });
    },
    [updateURL]
  );

  /* -----------------------------------------
   * UI
   * ----------------------------------------- */
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-4 flex gap-8">
        
        {/* Sidebar */}
        <div className="w-[23%]">
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow p-5">
            <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3 mb-4">
              Filtros
            </h1>
            <Sidebar />
          </div>
        </div>

        {/* Products */}
        <div className="w-[77%]">

          {/* Header */}
          <div className="rounded-xl bg-white ring-1 ring-black/5 shadow p-5 mb-6">
            <h1 className="text-[18px] font-semibold uppercase tracking-tight border-b border-gray-200 pb-3">
              Productos
            </h1>

            {/* Toolbar */}
            <div className="mt-4 flex items-center justify-between rounded-lg px-2 py-1">
              
              {/* View Mode */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleChangeViewMode("grid")}
                  className="!w-[34px] !h-[34px] rounded-full"
                  sx={{
                    bgcolor: viewMode === "grid" ? "gray.300" : "white",
                    border: "1px solid",
                  }}
                >
                  <GridViewIcon
                    className={viewMode === "grid" ? "text-black" : "text-gray-600"}
                  />
                </Button>

                <Button
                  onClick={() => handleChangeViewMode("table")}
                  className="!w-[34px] !h-[34px] rounded-full"
                  sx={{
                    bgcolor: viewMode === "table" ? "gray.300" : "white",
                    border: "1px solid",
                  }}
                >
                  <TableRowsIcon
                    className={viewMode === "table" ? "text-black" : "text-gray-600"}
                  />
                </Button>

                <div className="text-sm text-gray-600 ml-3">
                  Mostrando {rangeLabel}
                </div>
              </div>

              {/* Sort */}
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
          </div>

          {/* Grid / Table */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {currentItems.map((item) =>
              viewMode === "grid" ? (
                <ProductItem key={item.id} item={item} />
              ) : (
                <ProductItemTable key={item.id} item={item} />
              )
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              count={totalPages}
              shape="rounded"
              size="large"
              page={clamp(page, 1, totalPages)}
              onChange={handleChangePage}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
              showfirstButton
              showLastButton
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}