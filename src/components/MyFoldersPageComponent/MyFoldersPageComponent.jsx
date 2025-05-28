import React, { useEffect, useState } from 'react';
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';
import { toast } from 'react-toastify';
import noFolders from '../../assets/images/folder-empty.webp'; // Ensure the image path is correct
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const MyFolderPageComponent = ({ fileAndFolderData = { files: [], folders: [] }, onDeleteFolder, onCreateFolder, onUploadFile }) => {
  const { folders = [] } = fileAndFolderData;
  const [searchQuery, setSearchQuery] = useState('');

  const rootFolders = folders.filter(folder => folder.parentId === null);

  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId);
  };
  
  const handleFolderDeletion = (folderId) => {
    onDeleteFolder(folderId);
  };

  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };
  return (
    <div className='bg-white min-h-screen flex flex-col px-6 sm:px-8 pt-12 pb-8'>
      <div className='flex items-center w-full justify-between'>
        <div className='flex items-center w-full justify-between'>
          <div className='w-full sm:w-auto sm:flex-1'>
            <SearchBar className="w-full" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className='hidden sm:block'>
            <ProfilebarComponent onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
          </div>
        </div>
      </div>
      {folders.length === 0 ? (
        <div className='flex flex-col items-center mt-20 text-center'>
          <img src={noFolders} alt='No folders created' className='w-64 sm:w-80 mb-6 opacity-90' />
          <p className='text-2xl sm:text-3xl font-semibold text-gray-700 mb-2'>No folders created yet!</p>
          <p className='text-gray-500 text-base sm:text-lg'>Start creating folders to better organize your files.</p>
          <div className='px-6 py-3 text-lg'>
            <NewButtonComponent onCreateFolder={handleFolderCreation} onUploadFile={handleFileUpload} />
          </div>
        </div>
      ) : (
        
        <div className='w-full max-w-7xl mt-10'>
          <p className='mt-8 sm:mt-12 mb-6 text-xl sm:text-2xl font-semibold text-gray-800'>My folders</p>
          <FolderList 
            folders={rootFolders}
            searchQuery={searchQuery} 
            onDeleteFolder={handleFolderDeletion} 
            onCreateFolder={handleFolderCreation} 
          />
        </div>
      )}
    </div>
  );
};

export default MyFolderPageComponent;
