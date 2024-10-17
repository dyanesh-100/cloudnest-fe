

import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='flex justify-center'>
      <div className='flex bg-paleBlue rounded p-2 pl-3 rounded-3xl w-1/2'>
        <Search className='' />
        <input
          className='outline-none bg-paleBlue w-full pl-3'
          type="text"
          placeholder='Search files and folders'
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
