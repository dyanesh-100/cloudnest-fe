import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import FileList from '../FileListComponent/FileListComponent';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';

const MyFilesComponent = ({fileAndFolderData = { folders: [], files: [] }, onUploadFile,onDeleteFile}) => {
  const { folders, files = [] } = fileAndFolderData; 
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFileUpload = (fileId) => {
    onUploadFile(fileId); 
  };
  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId); 
  };

  
  const recentFilesFilter = (file) => {
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
    <div className='bg-white h-screen flex'>
      <div className='px-8 py-16 w-full'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <p className='mt-20 mb-10 text-2xl font-semibold'>Recently Added Files</p>
        <FileList
          files={files.filter(myFilesFilter)}
          filterFn={recentFilesFilter}
          sortFn={sortFn}
          onDeleteFile={handleFileDeletion}
          onUploadFile ={handleFileUpload}
        />

        <FileUploadComponent currentFolderId={null} onUploadFile ={handleFileUpload} />

        <p className='mt-20 mb-10 text-2xl font-semibold'>My Files</p>
        <FileList
          files={files.filter(myFilesFilter)}
          filterFn={myFilesFilter}
          sortFn={sortFn}
          onDeleteFile={handleFileDeletion}
          onUploadFile ={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default MyFilesComponent;
