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
    <div className='bg-white h-screen flex flex-col items-center px-8 pt-16'>
      <div className='flex items-center w-full justify-between'>
        <div className='mt-10 w-full sm:w-10/12'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className='hidden sm:block'>
          <ProfilebarComponent onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
        </div>
      </div>

      {files.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full mt-20'>
          <img src={noFiles} alt='No files uploaded' className='w-96 mb-6' />
          <p className='text-xl font-semibold text-gray-600'>No files uploaded yet!</p>
          <p className='text-gray-500 mt-2'>Start uploading to organize your cloud storage.</p>
          <div className='mt-8 text-lg font-semibold'>
            <NewButtonComponent onCreateFolder={handleFolderCreation} onUploadFile={handleFileUpload}/>
          </div>
        </div>
      ) : (
        <div className='w-full'>
          {!searchQuery && (
            <div>
              <p className='mt-10 mb-5 sm:mt-20 sm:mb-10 text-2xl font-semibold'>Recently Added Files</p>
              <FileList
                files={files.filter(recentlyAddedFilesFilter)}
                sortFn={sortFn}
                onDeleteFile={handleFileDeletion}
                onUploadFile={handleFileUpload}
                setFileData={setFileData}
              />
              <p className='mt-10 sm:mt-20 text-2xl font-semibold'>Upload Files</p>
              <FileUploadComponent currentFolderId={null} onUploadFile={handleFileUpload} />
            </div>
          )}

          <p className='mt-10 mb-10 sm:mt-20 sm:mb-10 text-2xl font-semibold'>My Files</p>
          <div className='pb-16'>
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
