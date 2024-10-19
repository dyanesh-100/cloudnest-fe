import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import FileList from '../FileListComponent/FileListComponent';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';

const MyFilesComponent = () => {
  const [fileData, setFileData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosInstance.get('/files');
        setFileData(response.data.data); 
      } catch (error) {
        console.error('Error fetching files:', error);
        alert('Failed to load files. Please try again.');
      }
    };

    fetchFiles();
  }, []);

  const handleUploadSuccess = (newFile) => {
    setFileData((prevFiles) => [...prevFiles, newFile]);
  };
  const handleDeleteFile = (fileId) => {
    setFileData((prevFiles) => prevFiles.filter(file => file._id !== fileId));
  };

  // Filter function for recently added files
  const recentFilesFilter = (file) => {
    const today = new Date();
    const fileDate = new Date(file.createdAt);
    const daysDiff = Math.floor((today - fileDate) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7; // Show files added in the last week
  };

  // Filter function for all user files based on the search query
  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Sort function to sort files by creation date
  const sortFn = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

  return (
    <div className='bg-white h-screen flex'>
      <div className='px-8 py-16 w-full'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <p className='mt-20 mb-10 text-2xl font-semibold'>Recently Added Files</p>
        <FileList
          files={fileData}
          filterFn={recentFilesFilter}
          sortFn={sortFn}
          onDeleteFile={handleDeleteFile}
        />

        <FileUploadComponent currentFolderId={null} onUploadSuccess={handleUploadSuccess} />

        <p className='mt-20 mb-10 text-2xl font-semibold'>My Files</p>
        <FileList
          files={fileData}
          filterFn={myFilesFilter}
          sortFn={sortFn}
          onDeleteFile={handleDeleteFile}
        />
      </div>
    </div>
  );
};

export default MyFilesComponent;
