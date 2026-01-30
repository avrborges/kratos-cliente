import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div
      className="
        searchBox w-full h-[48px] px-4 
        bg-gray-50 border border-gray-300 rounded-xl 
        ring-1 ring-black/5 
        flex items-center gap-3 
        transition-all duration-300 
        focus-within:ring-gray-400 focus-within:border-gray-400
      "
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Buscar productos..."
        className="
          w-full bg-transparent outline-none 
          text-[14px] text-gray-800
          placeholder:text-gray-500
        "
      />

      {/* Icono */}
      <button
        type="button"
        className="
          w-9 h-9 flex items-center justify-center 
          rounded-full bg-white/70 backdrop-blur 
          shadow-sm ring-1 ring-black/5
          hover:bg-gray-100 transition-all
        "
      >
        <SearchIcon className="text-gray-700 text-[20px]" />
      </button>
    </div>
  );
};

export default Search;