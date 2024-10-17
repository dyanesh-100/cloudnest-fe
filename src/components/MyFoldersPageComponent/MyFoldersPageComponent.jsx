import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance'; 
import FolderList from '../FolderListComponent/FolderListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import { useParams, useNavigate } from 'react-router-dom';

const MyFoldersComponent = () => {
  const { parentId } = useParams(); // Get parentId from the URL
  // const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false); 

  
  const fetchFolders = async () => {
    try {
      const response = await axiosInstance.get(`/folders/${parentId || ''}`);
      setFolders(response.data.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
      alert('Failed to load folders. Please try again.');
    }
  };


  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/create-folder/${parentId || ''}`, { folderName });
      setFolderName('');
      fetchFolders(); 
      setIsCreatingFolder(false); 
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder. Please try again.');
    }
  };

  
  // const handleFolderClick = (folderId) => {
  //   navigate(`/folders/${folderId}`); 
  // };

  
  useEffect(() => {
    fetchFolders();
  }, [parentId]);

  return (
    <div className='bg-white h-screen py-16 px-8'>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
      <h1 className='text-2xl font-semibold mt-20 mb-10'>My Folders</h1>
      
      <button 
        onClick={() => setIsCreatingFolder(prev => !prev)} 
        className='bg-blue-500 text-white rounded px-4 py-2 mb-10'
      >
        {isCreatingFolder ? 'Cancel' : 'Create Folder'}
      </button>

      {isCreatingFolder && (
        <form onSubmit={handleCreateFolder} className='mb-4'>
          <input
            type='text'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder='New Folder Name'
            required
            className='border rounded p-2 mr-2'
          />
          <button type='submit' className='bg-green-500 text-white rounded px-4 py-2'>Create</button>
        </form>
      )}

      

      <FolderList folders={folders} searchQuery={searchQuery}  />
    </div>
  );
};

export default MyFoldersComponent;
