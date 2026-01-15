import SearchIcon from '@mui/icons-material/Search';
const Search = () => {
  return (
    <div className='searchBox w-full h-[50px] border-gray-400 border rounded-[5px] relative flex items-center'>
        <input 
            type='text'
            placeholder='Buscar productos...'
            className='w-[90%] h-full bg-transparent outline-none text-[14px]'>
        </input>
        <SearchIcon className='absolute right-4 text-gray-600 cursor-pointer' />
    </div>
  )
}

export default Search