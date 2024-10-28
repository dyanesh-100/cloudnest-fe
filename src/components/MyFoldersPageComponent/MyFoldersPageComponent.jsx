import React, { useEffect, useState } from 'react';
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';
import { toast } from 'react-toastify';
import noFolders from '../../assets/images/folder-empty.webp'; // Ensure the image path is correct

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
    <div className='bg-white h-screen flex'>
      <div className='px-8 py-16 w-full'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {folders.length === 0 ? (
          
          <div className='flex flex-col items-center justify-center mt-15'>
            <img src={noFolders} alt='No folders created' className='w-96' />
            <p className='text-xl font-semibold text-gray-600'>No folders created yet!</p>
            <p className='text-gray-500 mt-2'>Start creating folders to better organize your files.</p>
            <div className='relative mt-10'>
              <NewButtonComponent onCreateFolder={handleFolderCreation} onUploadFile={handleFileUpload} />
            </div>
          </div>
        ) : (
          
          <div>
            <p className='mt-20 mb-10 text-2xl font-semibold'>My folders</p>
            <FolderList 
              folders={rootFolders}
              searchQuery={searchQuery} 
              onDeleteFolder={handleFolderDeletion} 
              onCreateFolder={handleFolderCreation} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFolderPageComponent;
