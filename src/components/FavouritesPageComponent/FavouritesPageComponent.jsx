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
      <div className="px-8 py-16">
        <div className='flex items-center w-full justify-between'>
          <div className='w-10/12'>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <ProfilebarComponent onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
          </div>
        </div>

        {loading ? (
          <p>Loading favourite files...</p>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <p className="text-gray-500">Please try reloading the page or check back later.</p>
          </div>
        ) : favouriteFiles.length > 0 ? (

          <div className='mt-20'>
            <div>
              <p className='text-2xl mb-10 font-medium'>Favourites</p>
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
