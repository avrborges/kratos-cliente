import React from 'react'
// Mock Data
import { MockCategories } from '../../mocks'
import { MockFiltros } from '../../mocks';
// Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Tooltip } from '@mui/material';
// Iconos
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//Librerias
import {Collapse} from 'react-collapse';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Sidebar = () => {

  const [isOpenCategories, setIsOpenCategories] = React.useState(true);
  const [isOpenStock, setIsOpenStock] = React.useState(true);
  const [isOpenTalle, setIsOpenTalle] = React.useState(true);
  const [isOpenColor, setIsOpenColor] = React.useState(true);
  const [isOpenPrecio, setIsOpenPrecio] = React.useState(true);
  const [isOpenRating, setIsOpenRating] = React.useState(true);

  
// Componente “punto de color”
const ColorDot = ({ color }) => (
  <Box
    component="span"
    sx={(theme) => ({
      width: 16,
      height: 16,
      borderRadius: '50%',
      bgcolor: color,
      // Borde visible también para colores claros (e.g., blanco)
      border: '1px solid',
      borderColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
      display: 'inline-block',
    })}
  />
);

// Versión con aro cuando está seleccionado
const CheckedDot = ({ color }) => (
  <Box sx={{ position: 'relative', lineHeight: 0 }}>
    <ColorDot color={color} />
    <Box
      sx={{
        position: 'absolute',
        inset: -2, // aro alrededor
        borderRadius: '50%',
        border: '2px solid',
        borderColor: 'primary.main',
        pointerEvents: 'none',
      }}
    />
  </Box>
);


  return (
    <aside className='sidebar py-1'>
        {/* Filtro por categoría */}
        <div className="box mb-2 mt-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                Categorías
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenCategories(!isOpenCategories) }>
                    {
                        isOpenCategories ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenCategories}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                <FormGroup>
                  {MockCategories.map((category, index) => (
                    <FormControlLabel
                      key={index}
                      className="w-full"
                      label={category.name}
                      sx={{
                        m: 0,
                        '& .MuiFormControlLabel-label': { 
                          fontSize: 14, 
                          lineHeight: 1.3 
                        },
                        gap: 0.7,
                      }}
                      control={
                        <Checkbox
                          checked={category.checked}
                          onChange={() => {}}
                          size="small"
                          sx={{
                            p: 0.5,
                            '& .MuiSvgIcon-root': { fontSize: 18 },
                          }}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            </Collapse>
        </div>
        {/* Filtro por stock */}
        <div className="box mb-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                En Stock
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenStock(!isOpenStock) }>
                    {
                        isOpenStock ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenStock}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                <FormGroup>
                  {MockFiltros.stocks.map((stock) => (
                    <FormControlLabel
                      key={stock.id}
                      className="w-full"
                      label={stock.label}
                      sx={{
                        m: 0,
                        '& .MuiFormControlLabel-label': { 
                          fontSize: 14,
                          lineHeight: 1.3
                        },
                        gap: 0.7,
                      }}
                      control={
                        <Checkbox
                          checked={stock.checked}
                          onChange={() => {}}
                          size="small"
                          sx={{
                            p: 0.5,
                            '& .MuiSvgIcon-root': { fontSize: 18 },
                          }}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            </Collapse>
        </div>
        {/* Filtro por talle */}
        <div className="box mb-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                Talles
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenTalle(!isOpenTalle) }>
                    {
                        isOpenTalle ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenTalle}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                <FormGroup
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    columnGap: 2,  // theme.spacing(2)
                    rowGap: 0.25,   // theme.spacing(1.5)
                  }}
                >
                  {MockFiltros.sizes.map((size) => (
                    <FormControlLabel
                      key={size.id}
                      sx={{
                        m: 0,
                        width: '100%',
                        '& .MuiFormControlLabel-label': { fontSize: 14, lineHeight: 1.3 },
                        gap: 0.7,
                      }}
                      label={size.label}
                      control={
                        <Checkbox
                          checked={size.checked}
                          onChange={() => {}}
                          size="small"
                          sx={{ p: 0.5, '& .MuiSvgIcon-root': { fontSize: 18 } }}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            </Collapse>
        </div>
        {/* Filtro por color */}
        <div className="box mb-2">
          <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
            Colores
            <Button
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]"
              onClick={() => setIsOpenColor(!isOpenColor)}
            >
              {isOpenColor ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </Button>
          </h3>

          <Collapse isOpened={isOpenColor}>
            <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">

              <FormGroup row sx={{ gap: 1, flexWrap: "wrap" }}>
                {MockFiltros.colors.map((color) => (
                  <FormControlLabel
                    key={color.id}
                    // 🔹 Eliminamos w-full → permite alinear horizontal
                    className=""
                    label={
                      <Tooltip title={color.label} enterDelay={300}>
                        <span style={{ display: "inline-block", width: 0, height: 0 }} />
                      </Tooltip>
                    }
                    sx={{
                      m: 0,
                      display: "flex",
                      alignItems: "center",
                      '& .MuiFormControlLabel-label': {
                        fontSize: 0,
                        lineHeight: 0,
                      },
                    }}
                    control={
                      <Checkbox
                        checked={color.checked}
                        onChange={() => {}}
                        size="small"
                        icon={
                          <Box
                            sx={(theme) => ({
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              bgcolor: color.hex,
                              border: "1px solid",
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "grey.700"
                                  : "grey.300",
                            })}
                          />
                        }
                        checkedIcon={
                          <Box sx={{ position: "relative" }}>
                            <Box
                              sx={(theme) => ({
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                bgcolor: color.hex,
                                border: "1px solid",
                                borderColor:
                                  theme.palette.mode === "dark"
                                    ? "grey.700"
                                    : "grey.300",
                              })}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                inset: -2,
                                borderRadius: "50%",
                                border: "2px solid",
                                borderColor: "primary.main",
                                pointerEvents: "none",
                              }}
                            />
                          </Box>
                        }
                        inputProps={{ "aria-label": color.label }}
                        sx={{ p: 0.5 }}
                      />
                    }
                  />
                ))}
              </FormGroup>

            </div>
          </Collapse>
        </div>
        {/* Filtro por precios */}
        <div className="box mb-2">
            <h3 className="mb-4 text-[16px] font-[600] flex items-center justify-between pr-3">
                Precios
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenPrecio(!isOpenPrecio) }>
                    {
                        isOpenPrecio ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenPrecio}>
                <div className='w-[90%]'>
                <RangeSlider />
                <div className="flex pt-4 pb-2 priceRange text-[13px] font-[500]">
                  <span>
                    Desde: <strong className='text-dark'>${100}</strong>
                  </span>
                  <span className='ml-auto'>
                    Hasta: <strong className='text-dark'>${50000}</strong>
                  </span>
                </div>
                </div>
            </Collapse>
        </div>
        {/* Filtro por rating */}
        <div className="box mb-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                Rating
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenRating(!isOpenRating) }>
                    {
                        isOpenRating ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenRating}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                  <FormGroup>
                    {MockFiltros.rating.map((rate) => (
                      <FormControlLabel
                        key={rate.id}
                        className="w-full"
                        sx={{
                          m: 0,
                          '& .MuiFormControlLabel-label': { 
                            fontSize: 14, 
                            lineHeight: 1.3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          },
                          gap: 0.7,
                        }}
                        label={
                          <div className="flex items-center gap-1">
                            <Rating name="rating" value={rate.value} readOnly />
                          </div>
                        }
                        control={
                          <Checkbox
                            checked={rate.checked}
                            onChange={() => {}}
                            size="small"
                            sx={{
                              p: 0.5,
                              '& .MuiSvgIcon-root': { fontSize: 18 },
                            }}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
              </div>
            </Collapse>
        </div> 
    </aside>
  )
}

export default Sidebar