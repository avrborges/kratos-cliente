import React, { useState, useCallback } from "react";
import { MockCategories, MockFiltros } from "../../mocks";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse } from "react-collapse";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


/* ======================================================
   SUBCOMPONENTES OPTIMIZADOS (NO SE RECREAN)
====================================================== */
export const ColorDot = React.memo(({ color }) => (
  <Box
    component="span"
    sx={{
      width: 18,
      height: 18,
      borderRadius: "50%",
      bgcolor: color,
      border: "1px solid #ccc",
      display: "inline-block",
    }}
  />
));

export const CheckedDot = React.memo(({ color }) => (
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

export const SectionTitle = React.memo(({ title, isOpen, toggle }) => (
  <h3 className="mb-2 text-[16px] font-semibold flex items-center justify-between pr-3 text-gray-900">
    {title}

    <Button
      onClick={toggle}
      className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full"
      sx={{
        borderRadius: "50%",
        minWidth: 30,
        width: 30,
        height: 30,
        padding: 0,
        color: "#111",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.08)",
        },
      }}
    >
      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </Button>
  </h3>
));


/* ======================================================
   SIDEBAR PRINCIPAL OPTIMIZADO
====================================================== */
const Sidebar = () => {
  // Estado ÚNICO para todos los toggles
  const [open, setOpen] = useState({
    categories: true,
    stock: true,
    talle: true,
    color: true,
    precio: true,
    rating: true,
  });

  // toggle optimizado
  const toggle = useCallback(
    (key) => {
      setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  return (
    <aside className="sidebar space-y-5">

      {/* Categorías */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Categorías"
          isOpen={open.categories}
          toggle={() => toggle("categories")}
        />

        <Collapse isOpened={open.categories}>
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <FormGroup>
              {MockCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  label={category.name}
                  control={<Checkbox size="small" />}
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

      {/* Stock */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="En stock"
          isOpen={open.stock}
          toggle={() => toggle("stock")}
        />

        <Collapse isOpened={open.stock}>
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <FormGroup>
              {MockFiltros.stocks.map((s) => (
                <FormControlLabel key={s.id} label={s.label} control={<Checkbox size="small" />} />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

      {/* Talles */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Talles"
          isOpen={open.talle}
          toggle={() => toggle("talle")}
        />

        <Collapse isOpened={open.talle}>
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1,
            }}
          >
            {MockFiltros.sizes.map((sz) => (
              <FormControlLabel
                key={sz.id}
                label={sz.label}
                control={<Checkbox size="small" />}
              />
            ))}
          </FormGroup>
        </Collapse>
      </div>

      {/* Colores */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Colores"
          isOpen={open.color}
          toggle={() => toggle("color")}
        />

        <Collapse isOpened={open.color}>
          <div className="flex flex-wrap gap-3">
            {MockFiltros.colors.map((c) => (
              <FormControlLabel
                key={c.id}
                label=""
                control={
                  <Checkbox
                    icon={<ColorDot color={c.hex} />}
             checkedIcon={<CheckedDot color={c.hex} />}
                    sx={{ p: 0.4 }}
                  />
                }
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* Precio */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Precio"
          isOpen={open.precio}
          toggle={() => toggle("precio")}
        />

        <Collapse isOpened={open.precio}>
          <RangeSlider min={100} max={50000} />
          <div className="text-xs mt-3 flex justify-between text-gray-700">
            <span>Desde: <strong>$100</strong></span>
            <span>Hasta: <strong>$50.000</strong></span>
          </div>
        </Collapse>
      </div>

      {/* Rating */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Rating"
          isOpen={open.rating}
          toggle={() => toggle("rating")}
        />

        <Collapse isOpened={open.rating}>
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <FormGroup>
              {MockFiltros.rating.map((rate) => (
                <FormControlLabel
                  key={rate.id}
                  label={<Rating value={rate.value} readOnly size="small" />}
                  control={<Checkbox size="small" />}
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

    </aside>
  );
};

export default React.memo(Sidebar);