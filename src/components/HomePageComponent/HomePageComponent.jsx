import React, { useState } from 'react';
import FileList from '../FileListComponent/FileListComponent';
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 

const HomePageComponent = ({ fileAndFolderData = { folders: [], files: [] }, onDownloadFile, onDeleteFile }) => {
  const { folders, files = [] } = fileAndFolderData; // Ensure files is an array
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId); // Call the passed down delete function
  };

  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  };
  

  console.log('File and Folder Data:', fileAndFolderData); // Debug log for data

  if (files.length === 0) {
    return <p>No files available</p>; // Handling when there are no files
  }

  return (
    <React.Fragment>
      <div className='bg-white h-screen flex'>
        <div className='px-8 w-full'>
          <p className='py-16 flex justify-center text-2xl font-medium'>WELCOME TO CLOUDNEST</p>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 

          <p className='mt-16 mb-10 text-2xl font-semibold'>Suggested folders</p>
          <FolderList folders={folders} searchQuery={searchQuery} /> 

          <p className='mt-10 mb-10 text-2xl font-semibold'>Suggested files</p>
          <FileList 
            files={files.filter(myFilesFilter)} // Apply filtering here
            searchQuery={searchQuery} 
            onDownloadFile={onDownloadFile} 
            onDeleteFile={handleFileDeletion} 
          /> 
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageComponent;
