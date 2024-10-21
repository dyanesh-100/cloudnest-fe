import React, { useEffect, useState } from 'react';
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 
import CreateFolderForm from '../CreateFolderForm/CreateFolderForm';

const MyFolderPageComponent = ({ fileAndFolderData = { folders: [] },onDeleteFolder,onCreateFolder }) => {
  const { folders } = fileAndFolderData;
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedFolders, setUpdatedFolders] = useState(folders); 
  
  useEffect(() => {
    const rootFolders = folders.filter(folder => folder.parentId === null);
    setUpdatedFolders(rootFolders);
  }, [folders]);
  
  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId); 
  };
  const handleFolderDeletion = (folderId) => {
    onDeleteFolder(folderId); 
  };

  return (
    <React.Fragment>
      <div className='bg-white h-screen flex'>
        <div className='px-8 py-16 w-full'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className='mt-20'>
            <CreateFolderForm parentId={null} onCreateFolder={handleFolderCreation} /> 
          </div>
          
          <p className='mt-10 mb-10'>My folders</p>
          <FolderList folders={updatedFolders} searchQuery={searchQuery} onDeleteFolder={handleFolderDeletion} onCreateFolder={handleFolderCreation}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyFolderPageComponent;
