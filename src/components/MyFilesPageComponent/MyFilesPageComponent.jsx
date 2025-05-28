import React, { useState } from 'react';
import FileList from '../FileListComponent/FileListComponent';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';
import { toast } from 'react-toastify';
import noFiles from '../../assets/images/No-Files-Folders.webp';
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const MyFilesComponent = ({
  fileAndFolderData = { folders: [], files: [] },
  onUploadFile,
  onDeleteFile,
  setFileData,
  onCreateFolder
}) => {
  const { files = [] } = fileAndFolderData;
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };

  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId);
  };
  
  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId); 
  };

  const recentlyAddedFilesFilter = (file) => {
    const today = new Date();
    const fileDate = new Date(file.createdAt);
    const daysDiff = Math.floor((today - fileDate) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  };

  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const sortFn = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

  return (
    <div className='bg-white min-h-screen flex flex-col px-6 sm:px-8 pt-12 pb-8'>
      <div className='flex items-center w-full justify-between'>
        <div className='w-full sm:w-auto sm:flex-1'>
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            className="w-full"
          />
        </div>
        <div className='hidden sm:block'>
          <ProfilebarComponent 
            onUploadFile={handleFileUpload} 
            onCreateFolder={handleFolderCreation} 
          />
        </div>
      </div>
      {files.length === 0 ? (
        <div className='flex flex-col items-center mt-20 text-center'>
          <img 
            src={noFiles} 
            alt='No files uploaded' 
            className='w-64 sm:w-80 mb-6 opacity-90' 
          />
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-700 mb-2'>
            No files uploaded yet!
          </h2>
          <p className='text-gray-500 text-base sm:text-lg'>
            Start uploading to organize your cloud storage.
          </p>
          <div className='mt-8'>
            <NewButtonComponent 
              onCreateFolder={handleFolderCreation} 
              onUploadFile={handleFileUpload}
              className="px-6 py-3 text-lg"
            />
          </div>
        </div>
      ) : (
        <div className='w-full max-w-7xl mt-10'>
          {!searchQuery && (
            <div className='mb-12'>
              <h2 className='mt-8 sm:mt-12 mb-6 text-xl sm:text-2xl font-semibold text-gray-800'>
                Recently Added Files
              </h2>
              <FileList
                files={files.filter(recentlyAddedFilesFilter)}
                sortFn={sortFn}
                onDeleteFile={handleFileDeletion}
                onUploadFile={handleFileUpload}
                setFileData={setFileData}
              />
              
              <div className='mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200'>
                <h3 className='text-lg font-medium text-gray-700 mb-4'>
                  Quick Upload
                </h3>
                <FileUploadComponent 
                  currentFolderId={null} 
                  onUploadFile={handleFileUpload} 
                />
              </div>
            </div>
          )}
          <div className='mb-8'>
            <h2 className='mt-8 sm:mt-12 mb-6 text-xl sm:text-2xl font-semibold text-gray-800'>
              My Files
            </h2>
            <FileList
              files={files.filter(myFilesFilter)}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              setFileData={setFileData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFilesComponent;
