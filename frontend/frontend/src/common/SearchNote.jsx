import React from 'react';
import { Search } from 'lucide-react';

const SearchNote = ({ handleKeyDown,searchTitle, setSearchTitle }) => {
  return (
    <div style={{backgroundColor:"#f6f6f6"}} className="flex items-center bg-gray-200 rounded px-3 py-3 w-full mb-1">
      <Search className="w-4 h-4 sm:w-5 sm:h-5  mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTitle}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="flex-1 text-xl outline-none"
      />
    </div>
  );
};

export default SearchNote;
