import React, { useState, useEffect } from 'react';
import FileList from '../FileListComponent/FileListComponent'; 
import SearchBar from '../SearchBarComponent/SearchBarComponent'; 
import { getFileIcon, downloadFileToLocal } from '../../utils/utils'; 
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';
import { EllipsisVertical } from 'lucide-react';
import axiosInstance from '../../axiosInstance';

const MyFilesComponent = () => {
  const [fileData, setFileData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(null); 

  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get('/files');
      setFileData(response.data.data); 
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Failed to load files. Please try again.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []); 

  const handleUploadSuccess = () => {
    fetchFiles(); 
  };

  const handleDownloadFile = async (fileId) => {
    try {
      await downloadFileToLocal(fileId);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleToggleOptions = (fileId) => {
    setShowOptions(prev => (prev === fileId ? null : fileId)); 
  };

  const sortedFiles = [...fileData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentFiles = sortedFiles.slice(0, 4);

  return (
    <div className='bg-white h-screen flex '>
      <div className='px-8 py-16 w-full'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
        <p className='mt-20 mb-10 text-2xl font-semibold'>Recently Added Files</p>
        <div className='flex flex-wrap gap-9 '>
          {recentFiles.length > 0 ? (
            recentFiles.map((file) => (
              <div className='bg-paleBlue w-64 py-3 px-5 rounded-xl relative' key={file._id}>
                <div className='flex items-center leading-none text-black'>
                  <img src={getFileIcon(file.fileFormat)} alt="" className='w-6' />
                  <div className='flex justify-between w-full'>
                    <p className='text-sm pl-3 truncate max-w-[150px]'>{file.fileName}</p>
                    <EllipsisVertical 
                      className='cursor-pointer'
                      onClick={() => handleToggleOptions(file._id)} 
                    />
                  </div>
                </div>
                <div className='bg-white flex justify-center px-10 py-16 rounded-l my-5'>
                  <img className='w-14' src={getFileIcon(file.fileFormat)} alt="" />
                </div>
                <p className='text-xs'>{new Date(file.createdAt).toLocaleString()}</p>

                {showOptions === file._id && ( 
                  <div className="absolute z-50 bg-white rounded-md shadow-lg border"
                       style={{ top: '40px', right: '10px' }}>
                    <button
                      onClick={() => handleDownloadFile(file._id)} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No recently added files found.</p>
          )}
        </div>

        <FileUploadComponent currentFolderId={null} onUploadSuccess={handleUploadSuccess} />
        
        <p className='mt-20 mb-10 text-2xl font-semibold'>My files</p>
        <FileList files={fileData} searchQuery={searchQuery} /> 
      </div>
    </div>
  );
};

export default MyFilesComponent;
