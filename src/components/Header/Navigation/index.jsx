import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import CategoryPanel from "./CategoryPanel";
import { useCallback, useState } from "react";

// Mock Data
import { MockCategories } from "../../../mocks";

const Navigation = () => {
  const [openCategoryPanel, setOpenCategoryPanel] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenCategoryPanel(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenCategoryPanel(false);
  }, []);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">

          {/* === COL 1: Botón de categorías === */}
          <div className="w-[30%]">
            <Button
              onClick={handleOpen}
              variant="outlined"
              aria-haspopup="true"
              aria-expanded={openCategoryPanel ? "true" : "false"}
              aria-controls="category-drawer"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                color: "black",
                borderColor: "rgba(0,0,0,0.20)",
                borderRadius: "10px",
                padding: "6px 14px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  borderColor: "rgba(0,0,0,0.30)",
                },
              }}
            >
              <MenuIcon className="text-[18px]" />
              Categorías
              <KeyboardArrowDownIcon className="text-[16px] ml-1" />
            </Button>
          </div>

          {/* === COL 2: Navegación principal === */}
          <div className="w-[55%]">
            <ul className="flex items-center gap-6">
              <li className="list-none">
                <Link
                  to="/"
                  className="text-[14px] text-gray-800 font-medium hover:text-gray-600 transition-colors relative 
                             after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-800
                             after:transition-all hover:after:w-full"
                >
                  Inicio
                </Link>
              </li>

              {MockCategories.map((category) => (
                <li key={category.id} className="list-none">
                  <Link
                    to={`/productlisting?categories=${encodeURIComponent(
                      category.name
                    )}&page=1`}
                    className="text-[14px] text-gray-800 font-medium hover:text-gray-600 transition-colors relative 
                               after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-800
                               after:transition-all hover:after:w-full"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === COL 3: Envíos === */}
          <div className="w-[20%] flex justify-end items-center gap-2">
            <LocalShippingIcon className="text-gray-700 !text-[18px]" />
            <p className="text-[14px] text-gray-700 font-medium">
              Envíos a todo el país
            </p>
          </div>
        </div>
      </nav>

      {/* Panel lateral de categorías */}
      <CategoryPanel
        open={openCategoryPanel}
        onClose={handleClose}
        MockCategories={MockCategories}
      />
    </>
  );
};

export default Navigation;