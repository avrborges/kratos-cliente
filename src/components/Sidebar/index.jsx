import React from 'react'
// Mock Data
import { MockCategories } from '../../mocks'
import { MockFiltros } from '../../mocks';
// Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Iconos
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//Librerias
import {Collapse} from 'react-collapse';
import Button from '@mui/material/Button';

const Sidebar = () => {

  const [isOpenCategories, setIsOpenCategories] = React.useState(true);
  const [isOpenStock, setIsOpenStock] = React.useState(true);
  const [isOpenTalle, setIsOpenTalle] = React.useState(true);
  const [isOpenColor, setIsOpenColor] = React.useState(true);
  const [isOpenPrecio, setIsOpenPrecio] = React.useState(true);

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
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenColor(!isOpenColor) }>
                    {
                        isOpenColor ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenColor}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                    
              </div>
            </Collapse>
        </div>
        {/* Filtro por precios */}
        <div className="box mb-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                Rango de Precios
            </h3>

        </div> 
        {/* Filtro por rating */}
        <div className="box mb-2">
            <h3 className="mb-1 text-[16px] font-[600] flex items-center justify-between pr-3">
                Rating
                <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full text-[12px] !text-[#000] font-[500]" onClick={() => setIsOpenColor(!isOpenColor) }>
                    {
                        isOpenColor ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
                    }
                </Button>
            </h3>
            <Collapse isOpened={isOpenColor}>
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden px-3 relative -left-[15px]">
                    
              </div>
            </Collapse>
        </div> 
    </aside>
  )
}

export default Sidebar