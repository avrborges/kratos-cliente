import React from "react";
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


/* -----------------------------------------------------
   COMPONENTES ESTÁTICOS (DEBEN ESTAR FUERA DEL SIDEBAR)
----------------------------------------------------- */

// ● Color simples
export const ColorDot = ({ color }) => (
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
);

// ● Color con borde seleccionado
export const CheckedDot = ({ color }) => (
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
);

// ● Título de cada sección (ya no está dentro del render)
export const SectionTitle = ({ title, isOpen, toggle }) => (
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
);


/* -----------------------------------------------------
   COMPONENTE PRINCIPAL: SIDEBAR (YA LIMPIO)
----------------------------------------------------- */

const Sidebar = () => {
  const [isOpenCategories, setIsOpenCategories] = React.useState(true);
  const [isOpenStock, setIsOpenStock] = React.useState(true);
  const [isOpenTalle, setIsOpenTalle] = React.useState(true);
  const [isOpenColor, setIsOpenColor] = React.useState(true);
  const [isOpenPrecio, setIsOpenPrecio] = React.useState(true);
  const [isOpenRating, setIsOpenRating] = React.useState(true);

  return (
    <aside className="sidebar space-y-5">

      {/* ✦ Categorías */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Categorías"
          isOpen={isOpenCategories}
          toggle={() => setIsOpenCategories(!isOpenCategories)}
        />

        <Collapse isOpened={isOpenCategories}>
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <FormGroup>
              {MockCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  label={category.name}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: 14,
                      color: "gray.800",
                    },
                  }}
                  control={<Checkbox size="small" />}
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

      {/* ✦ Stock */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="En stock"
          isOpen={isOpenStock}
          toggle={() => setIsOpenStock(!isOpenStock)}
        />

        <Collapse isOpened={isOpenStock}>
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <FormGroup>
              {MockFiltros.stocks.map((stock) => (
                <FormControlLabel
                  key={stock.id}
                  label={stock.label}
                  control={<Checkbox size="small" />}
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

      {/* ✦ Talles */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Talles"
          isOpen={isOpenTalle}
          toggle={() => setIsOpenTalle(!isOpenTalle)}
        />

        <Collapse isOpened={isOpenTalle}>
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1,
            }}
          >
            {MockFiltros.sizes.map((size) => (
              <FormControlLabel
                key={size.id}
                label={size.label}
                control={<Checkbox size="small" />}
              />
            ))}
          </FormGroup>
        </Collapse>
      </div>

      {/* ✦ Colores */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Colores"
          isOpen={isOpenColor}
          toggle={() => setIsOpenColor(!isOpenColor)}
        />

        <Collapse isOpened={isOpenColor}>
          <div className="flex flex-wrap gap-3 mt-2">
            {MockFiltros.colors.map((color) => (
              <FormControlLabel
                key={color.id}
                label=""
                control={
                  <Checkbox
                    icon={<ColorDot color={color.hex} />}
                    checkedIcon={<CheckedDot color={color.hex} />}
                    sx={{ p: 0.4 }}
                  />
                }
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* ✦ Precio */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Precio"
          isOpen={isOpenPrecio}
          toggle={() => setIsOpenPrecio(!isOpenPrecio)}
        />

        <Collapse isOpened={isOpenPrecio}>
          <div className="mt-3">
            <RangeSlider min={100} max={50000} />
            <div className="flex justify-between text-xs mt-3 text-gray-700">
              <span>Desde: <strong>$100</strong></span>
              <span>Hasta: <strong>$50.000</strong></span>
            </div>
          </div>
        </Collapse>
      </div>

      {/* ✦ Rating */}
      <div className="bg-gray-50 rounded-xl ring-1 ring-black/5 shadow p-4">
        <SectionTitle
          title="Rating"
          isOpen={isOpenRating}
          toggle={() => setIsOpenRating(!isOpenRating)}
        />

        <Collapse isOpened={isOpenRating}>
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

export default Sidebar;