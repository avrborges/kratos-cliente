
// CategoryPanel.jsx
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const CategoryPanel = ({ open, onClose, MockCategories }) => {
  const list = (
    <div
      className="w-[280px] pl-4 pt-2" // ancho del panel (Tailwind opcional)
      role="presentation"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div className="px-4 py-3 font-semibold text-gray-800">
        <h1 className='text-[25px] uppercase font-bold'>Kratos</h1>
        <h2>Categorías</h2>
      </div>
      <Divider />

      <List>
        <ListItemButton
          onClick={onClose}
          component={Link}
          to="/"
          className="hover:bg-gray-100"
        >
          <ListItemText
            primary="Inicio"
            primaryTypographyProps={{ className: 'text-gray-800' }}
          />
        </ListItemButton>
        {MockCategories.map((category) => (
          <ListItemButton
            key={category.name}
            onClick={onClose}
            component={Link}
            to={category.link}
            className="hover:bg-gray-100"
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{ className: 'text-gray-800' }}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      id="category-drawer"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }} // mejora performance en mobile
      PaperProps={{
        sx: { borderRight: '1px solid #e5e7eb' } // borde sutil (gray-200)
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
