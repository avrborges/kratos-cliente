// Panel lateral deslizante para categorías de productos (Versión PRO)

import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import logo from "../../../assets/DRAKOS.png";
import { MockCategories } from "../../../mocks";

const CategoryPanel = ({ open, onClose }) => {
  const list = (
    <div
      className="w-[300px] bg-white h-full flex flex-col"
      role="presentation"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Header */}
      <div className="px-5 py-6 flex flex-col gap-3 border-b border-gray-200">
        <img src={logo} alt="logo" className="w-[170px] mx-auto" />
        <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight text-center">
          Categorías
        </h2>
      </div>

      {/* Listado */}
      <List className="flex-1 py-2">
        {/* Inicio */}
        <ListItemButton
          onClick={onClose}
          component={Link}
          to="/"
          sx={{
            px: 3,
            borderRadius: "12px",
            mx: 2,
            my: 0.5,
            transition: "all .25s ease",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
              transform: "translateX(3px)",
            },
          }}
        >
          <ListItemText
            primary="Inicio"
            primaryTypographyProps={{
              className: "text-gray-800 text-[15px] font-medium",
            }}
          />
        </ListItemButton>

        <Divider className="my-2" />

        {/* Categorías dinámicas */}
        {MockCategories.map((category) => (
          <ListItemButton
            key={category.name}
            onClick={onClose}
            component={Link}
            to={category.link}
            sx={{
              px: 3,
              borderRadius: "12px",
              mx: 2,
              my: 0.5,
              transition: "all .25s ease",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
                transform: "translateX(3px)",
              },
            }}
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{
                className: "text-gray-800 text-[15px] font-medium tracking-tight",
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Footer opcional */}
      <div className="px-5 py-4 border-t border-gray-200 text-center text-gray-500 text-[13px]">
        © {new Date().getFullYear()} Drakos Store
      </div>
    </div>
  );

  return (
    <Drawer
      id="category-drawer"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          backgroundColor: "white",
          width: 300,
          borderRight: "1px solid #e5e7eb",
          boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
        },
      }}
    >
      {list}
    </Drawer>
  );
};

CategoryPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CategoryPanel;