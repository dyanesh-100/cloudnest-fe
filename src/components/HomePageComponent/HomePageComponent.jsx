
import React, { useEffect, useState } from 'react';
import FileList from '../FileListComponent/FileListComponent';
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 

const HomePageComponent = ({ fileAndFolderData = { folders: [], files: [] } }) => {
  const { folders, files } = fileAndFolderData;
  
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <React.Fragment>
      <div className='bg-white h-screen flex'>
        <div className='px-8 w-full'>
          <p className='py-16 flex justify-center text-2xl font-medium'>WELCOME TO CLOUDNEST</p>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 

          <p className='mt-16 mb-10 text-2xl font-semibold'>Suggested folders</p>
          <FolderList folders={folders} searchQuery={searchQuery} /> 

          <p className='mt-10 mb-10 text-2xl font-semibold'>Suggested files</p>
          <FileList files={files} searchQuery={searchQuery} /> 
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageComponent;
