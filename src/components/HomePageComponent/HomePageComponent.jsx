import React, { useState } from 'react';
import FileList from '../FileListComponent/FileListComponent';
import FolderList from '../FolderListComponent/FolderListComponent';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import noFiles from '../../assets/images/No-Files-Folders.webp';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const HomePageComponent = ({ fileAndFolderData = { folders: [], files: [] }, onDownloadFile, onDeleteFile, onDeleteFolder, setFileData,onUploadFile,onCreateFolder }) => {
  const { folders = [], files = [] } = fileAndFolderData;
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId);
  };
  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };
  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId); 
  };
  const handleFolderDeletion = (folderId) => {
    onDeleteFolder(folderId);
  };

  
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFolders = folders.filter((folder) =>
    folder.folderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showFilesSection = filteredFiles.length > 0 && (searchQuery === '' || filteredFiles.length);
  const showFoldersSection = filteredFolders.length > 0 && (searchQuery === '' || filteredFolders.length);

  return (
    <div className='bg-white h-screen flex'>
      <div className=' w-full px-10'>
      <div className="flex w-full items-center justify-center pt-20 pb-5 sm:py-16 relative">
        <div className="hidden sm:text-center lg:block">
          <p className="font-medium text-2xl">WELCOME TO CLOUDNEST</p>
        </div>
        <div className="hidden md:block sm:absolute sm:right-0">
          <ProfilebarComponent onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
        </div>
      </div>

        <div className='w-full'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {files.length === 0 && folders.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-20'>
            <img src={noFiles} alt='No files or folders' className='w-96 mb-6' />
            <p className='text-2xl font-semibold text-gray-600'>No files or folders yet!</p>
            <p className='text-gray-500 mt-2'>Start uploading files or creating folders to organize your storage.</p>
          </div>
        ) : (
          <div>
            
            {showFoldersSection && (
              <div >
                <p className='mt-10 mb-6 sm:mt-16 sm:mb-10 text-2xl font-semibold'>
                  {searchQuery ? 'My Folders' : 'Suggested folders'}
                </p>
                <FolderList
                  folders={filteredFolders}
                  searchQuery={searchQuery}
                  onDeleteFolder={handleFolderDeletion}
                />
              </div>
            )}            
            {showFilesSection && (
              <div className='pb-16'>
                <p className='mb-6 mt-10 sm:mb-10 text-2xl font-semibold'>
                  {searchQuery ? 'My Files' : 'Suggested files'}
                </p>
                <FileList
                  files={filteredFiles}
                  searchQuery={searchQuery}
                  onDeleteFile={handleFileDeletion}
                  setFileData={setFileData}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
