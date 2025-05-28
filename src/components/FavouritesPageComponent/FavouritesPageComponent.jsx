import React, { useState, useEffect } from 'react';
import FileList from '../FileListComponent/FileListComponent';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import axiosInstance from '../../axiosInstance';
import EmptyFavFiles from '../../assets/images/EmptyFavFiles.webp'
import { toast } from 'react-toastify';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const FavouritesPageComponent = ({ onDeleteFile, setFileData,onUploadFile,onCreateFolder }) => {
  const [favouriteFiles, setFavouriteFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);     

  useEffect(() => {
    const fetchFavouriteFiles = async () => {
      try {
        const response = await axiosInstance.get('/favourites');
        
        if (response.data.favourites) {
          setFavouriteFiles(response.data.favourites);
          setError(null);  // No error if response is successful
        } else {
          setFavouriteFiles([]);
        }
      } catch (error) {
        console.error('Error fetching favourite files:', error);
        setError('Failed to load favourite files.'); 
        setFavouriteFiles([]);  
      } finally {
        setLoading(false); 
      }
    };

    fetchFavouriteFiles();
  }, []);

  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };

  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId);
  };

  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId);
  };

  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <React.Fragment>
      <div className="'bg-white min-h-screen flex flex-col px-6 sm:px-8 pt-12 pb-8">
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

        {favouriteFiles.length > 0 ? (
          <div className='mt-10 sm:mt-20'>
            <div>
              <p className='text-2xl mb-5 sm:mb-10 font-medium'>Favourites</p>
            </div>
            <FileList
              files={favouriteFiles.filter(myFilesFilter)} 
              searchQuery={searchQuery}
              onDeleteFile={handleFileDeletion}
              setFileData={setFileData}
            />
          </div>
          
        ) : (
          <div className="flex flex-col items-center h-[60vh] text-center mt-20">
            <img 
              src={EmptyFavFiles}  
              alt="No favourites" 
              className="mb-4 w-64"  
            />
            <p className="text-xl font-semibold text-gray-600">
              No favourite files yet!
            </p>
            <p className="text-gray-500">
              Start marking files as your favourites to find them here easily.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FavouritesPageComponent;
