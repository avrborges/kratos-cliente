// Sidebar.jsx
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MockCategories, MockFiltros } from "../../mocks";

import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Chip,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Collapse } from "react-collapse";

/* ======================================================
   CONSTS
====================================================== */
const PRICE_MIN = 1000;
const PRICE_MAX = 150000;

const INITIAL_OPEN = Object.freeze({
  categories: true,
  stock: true,
  talle: true,
  color: true,
  precio: true,
  rating: true,
});

/* ======================================================
   SUBCOMPONENTES (solo UI)
====================================================== */
const ColorDot = React.memo(({ color }) => (
  <Box
    component="span"
    sx={{
      width: 16,
      height: 16,
      borderRadius: "50%",
      bgcolor: color,
      border: "1px solid #ccc",
      display: "inline-block",
    }}
  />
));

const CheckedDot = React.memo(({ color }) => (
  <Box sx={{ position: "relative", lineHeight: 0 }}>
    <ColorDot color={color} />
    <Box
      sx={{
        position: "absolute",
        inset: -2,
        borderRadius: "50%",
        border: "2px solid black",
        pointerEvents: "none",
      }}
    />
  </Box>
));

const SectionTitle = React.memo(({ title, isOpen, onToggle }) => (
  <h3 className="mb-2 text-[15px] font-semibold flex items-center justify-between pr-2 text-gray-900">
    {title}
    <Button
      onClick={onToggle}
      className="!w-[28px] !h-[28px] !min-w-[28px]"
      sx={{ borderRadius: "50%" }}
      aria-label={isOpen ? `Colapsar ${title}` : `Expandir ${title}`}
    >
      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </Button>
  </h3>
));

const FilterSection = React.memo(({ title, open, onToggle, children }) => (
  <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 p-4 shadow">
    <SectionTitle title={title} isOpen={open} onToggle={onToggle} />
    <Collapse isOpened={open}>{children}</Collapse>
  </div>
));

/* ======================================================
   SIDEBAR
   - NO tiene estado propio de filtros globales
   - Recibe {filters, setFilters} desde ProductListing
====================================================== */
const Sidebar = ({ filters, setFilters }) => {
  /* -------- UI toggles -------- */
  const [open, setOpen] = useState(INITIAL_OPEN);

  const toggleOpen = useCallback((key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /* ======================================================
     HELPERS PARA MODIFICAR FILTROS
  ====================================================== */

  const toggleArrayValue = useCallback(
    (key, value) => {
      setFilters((prev) => {
        const current = prev[key];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

        return { ...prev, [key]: next };
      });
    },
    [setFilters]
  );

  const setRating = useCallback(
    (value) => {
      setFilters((p) => ({ ...p, rating: p.rating === value ? null : value }));
    },
    [setFilters]
  );

  const clearAll = useCallback(() => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      rating: null,
      price: [PRICE_MIN, PRICE_MAX],
    });
  }, [setFilters]);

  /* -------- Chips activos -------- */
  const activeChips = useMemo(() => {
    const chips = [];

    filters.categories.forEach((c) =>
      chips.push({ key: `cat-${c}`, label: c, type: "categories", value: c })
    );

    filters.sizes.forEach((s) =>
      chips.push({ key: `size-${s}`, label: `Talle ${s}`, type: "sizes", value: s })
    );

    filters.colors.forEach((c) =>
      chips.push({
        key: `color-${c}`,
        label: "Color",
        type: "colors",
        value: c,
        avatarColor: c,
      })
    );

    if (filters.rating) {
      chips.push({
        key: "rating",
        label: `${filters.rating}★ o más`,
        type: "rating",
        value: filters.rating,
      });
    }

    // (Opcional) podrías agregar chip para precio si querés:
    // chips.push({ key: "price", label: `$${filters.price[0]} - $${filters.price[1]}`, type: "price" });

    return chips;
  }, [filters]);

  const handleDeleteChip = useCallback(
    (chip) => {
      if (chip.type === "rating") {
        setFilters((p) => ({ ...p, rating: null }));
        return;
      }
      toggleArrayValue(chip.type, chip.value);
    },
    [toggleArrayValue, setFilters]
  );

  /* ======================================================
     PRECIO CON BOTÓN "APLICAR"
     - Creamos un "draft" local (lo que escribe el usuario)
     - Solo cuando toca "Aplicar" actualizamos filters.price
  ====================================================== */

  // 1) Draft local (lo que el usuario tipea)
  const [minDraft, setMinDraft] = useState(filters.price[0]);
  const [maxDraft, setMaxDraft] = useState(filters.price[1]);

  // 2) Si el precio cambia desde afuera (por ejemplo: "Limpiar todo"),
  //    sincronizamos los drafts con filters.price
  useEffect(() => {
    setMinDraft(filters.price[0]);
    setMaxDraft(filters.price[1]);
  }, [filters.price]);

  // 3) Validación simple para habilitar/deshabilitar el botón Aplicar
  const priceError = useMemo(() => {
    const min = Number(minDraft);
    const max = Number(maxDraft);

    if (!Number.isFinite(min) || !Number.isFinite(max)) return "Ingresá números válidos.";
    if (min < PRICE_MIN) return `El mínimo no puede ser menor a ${PRICE_MIN}.`;
    if (max > PRICE_MAX) return `El máximo no puede ser mayor a ${PRICE_MAX}.`;
    if (min > max) return "El mínimo no puede ser mayor que el máximo.";
    return null;
  }, [minDraft, maxDraft]);

  const applyPrice = useCallback(() => {
    // Si hay error, no aplicamos
    if (priceError) return;

    const min = Number(minDraft);
    const max = Number(maxDraft);

    setFilters((prev) => ({
      ...prev,
      price: [min, max],
    }));
  }, [minDraft, maxDraft, priceError, setFilters]);

  const resetPriceDraft = useCallback(() => {
    // Esto solo resetea los inputs, no toca otros filtros
    setMinDraft(PRICE_MIN);
    setMaxDraft(PRICE_MAX);
  }, []);

  return (
    <aside className="sidebar space-y-4">
      {/* ================= CHIPS ACTIVOS ================= */}
      {activeChips.length > 0 && (
        <div className="rounded-xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-sm p-4">
          <Stack direction="row" spacing={1.5} rowGap={2} flexWrap="wrap">
            {activeChips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={() => handleDeleteChip(chip)}
                avatar={chip.avatarColor ? <ColorDot color={chip.avatarColor} /> : undefined}
                size="small"
                sx={{
                  bgcolor: "rgba(0,0,0,0.04)",
                  color: "rgb(55,65,81)",
                  fontSize: "13px",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  height: 30,
                }}
              />
            ))}

            <Chip
              label="Limpiar todo"
              size="small"
              onClick={clearAll}
              sx={{
                bgcolor: "rgba(0,0,0,0.85)",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "12px",
                height: 30,
                px: 1,
              }}
            />
          </Stack>
        </div>
      )}

      {/* ================= CATEGORÍAS ================= */}
      <FilterSection title="Categorías" open={open.categories} onToggle={() => toggleOpen("categories")}>
        <FormGroup>
          {MockCategories.map((cat) => (
            <FormControlLabel
              key={cat.id}
              label={cat.name}
              control={
                <Checkbox
                  size="small"
                  checked={filters.categories.includes(cat.name)}
                  onChange={() => toggleArrayValue("categories", cat.name)}
                />
              }
            />
          ))}
        </FormGroup>
      </FilterSection>

      {/* ================= TALLES ================= */}
      <FilterSection title="Talles" open={open.talle} onToggle={() => toggleOpen("talle")}>
        <FormGroup sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {MockFiltros.sizes.map((s) => (
            <FormControlLabel
              key={s.id}
              label={s.label}
              control={
                <Checkbox
                  size="small"
                  checked={filters.sizes.includes(s.label)}
                  onChange={() => toggleArrayValue("sizes", s.label)}
                />
              }
            />
          ))}
        </FormGroup>
      </FilterSection>

      {/* ================= COLORES ================= */}
      <FilterSection title="Colores" open={open.color} onToggle={() => toggleOpen("color")}>
        <div className="flex flex-wrap gap-2">
          {MockFiltros.colors.map((c) => (
            <Checkbox
              key={c.id}
              icon={<ColorDot color={c.hex} />}
              checkedIcon={<CheckedDot color={c.hex} />}
              checked={filters.colors.includes(c.hex)}
              onChange={() => toggleArrayValue("colors", c.hex)}
            />
          ))}
        </div>
      </FilterSection>

      {/* ================= RATING ================= */}
      <FilterSection title="Rating" open={open.rating} onToggle={() => toggleOpen("rating")}>
        <FormGroup>
          {MockFiltros.rating.map((r) => (
            <FormControlLabel
              key={r.id}
              label={<Rating value={r.value} readOnly size="small" />}
              control={
                <Checkbox
                  size="small"
                  checked={filters.rating === r.value}
                  onChange={() => setRating(r.value)}
                />
              }
            />
          ))}
        </FormGroup>
      </FilterSection>

      {/* ================= PRECIO (INPUTS + APLICAR) ================= */}
      <FilterSection title="Precio" open={open.precio} onToggle={() => toggleOpen("precio")}>
        <div className="flex gap-3">
          {/* MIN */}
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-xs text-gray-600">Mínimo</label>
            <input
              type="number"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={minDraft}
              step={1000}
              onChange={(e) => setMinDraft(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* MAX */}
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-xs text-gray-600">Máximo</label>
            <input
              type="number"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={maxDraft}
              step={1000}
              onChange={(e) => setMaxDraft(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>

        {/* Mensaje de error simple */}
        {priceError && (
          <p className="mt-2 text-xs text-red-600">{priceError}</p>
        )}

        {/* Botones */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={applyPrice}
            disabled={!!priceError}
            className={`
              flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition
              ${priceError
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900 shadow-sm"}
            `}
          >
            Aplicar
          </button>

          <button
            type="button"
            onClick={resetPriceDraft}
            className="
              flex-1 rounded-lg px-4 py-2 text-sm font-semibold
              border border-gray-300 bg-white text-gray-800
              hover:bg-gray-50 transition
            "
          >
            Restablecer
          </button>
        </div>

        {/* Ayuda visual del rango actual escrito
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>${minDraft}</span>
          <span>${maxDraft}</span>
        </div> */}
      </FilterSection>
    </aside>
  );
};

export default React.memo(Sidebar);