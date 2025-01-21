import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { getFileIcon, downloadFileToLocal } from '../../utils/utils';
import EmptyFavFiles from '../../assets/images/EmptyFavFiles.webp'
import { ToastContainer, toast } from 'react-toastify'; 
// import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure toastify CSS is included
import axiosInstance from '../../axiosInstance';

const FileList = ({ files, filterFn, sortFn, onDeleteFile,setFileData,showLastOpenedDate,onDownloadUpdate }) => {
 
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(null); 
  const dropdownRef = useRef(null);

  
  const handleToggleOptions = (fileId) => {
    setShowOptions(prev => (prev === fileId ? null : fileId));
  };

 
  const handleDownloadFile = async (fileId) => {
    try {
      await downloadFileToLocal(fileId);
      toast.success('File downloaded successfully', { autoClose: 3000 });
      onDownloadUpdate(fileId);
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error('Failed to download file');
    }
  };
  const handleFavouriteToggle = async (fileId) => {
    try {
      const response = await axiosInstance.patch(`/favourite/${fileId}`);
      toast.success(response.data.message, { autoClose: 3000 });
  
      
      setFileData(prevFiles =>
        prevFiles.map(file =>
          file._id === fileId ? { ...file, isFavourite: !file.isFavourite } : file
        )
      );
    } catch (error) {
      console.error('Error toggling favourite status:', error);
      toast.error('Failed to toggle favourite status. Please try again.');
    }
  };
  


  const handleDeleteFile = async (fileId) => {
    try {
      await axiosInstance.delete(`/files/${fileId}`);
      toast.success('File deleted successfully', { autoClose: 3000 });
      onDeleteFile(fileId); 
      
      if (showOptions === fileId) {
        setShowOptions(null);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file. Please try again.');
    }
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(null);
      }
    };

    if (showOptions !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

 
  const filteredFiles = files.filter(file =>
    file && file.fileName && file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedFiles = filteredFiles.sort(sortFn);

  return (
    <div className='flex flex-wrap gap-4 w-full lg:gap-6 xl:gap-7'>
      {sortedFiles.length > 0 ? (
        sortedFiles.map(file => (
          <div className='bg-paleBlue w-full py-3 px-5 rounded-xl relative sm:w-64 xl:w-56 2xl:w-64' key={file._id}>
            <div className='flex items-center leading-none text-black'>
              <img src={getFileIcon(file.fileFormat)} alt="" className='size-6' />
              <div className='flex justify-between w-full'>
                <div>
                  <p className='text-sm pl-3 truncate max-w-[180px]'>{file.fileName}</p>
                  <p className='text-xs pl-3'>
                    {new Date(showLastOpenedDate ? file.lastOpenedAt : file.createdAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                
                <EllipsisVertical
                  className='cursor-pointer absolute top-4 right-5 xl:right-2'
                  onClick={() => handleToggleOptions(file._id)}
                />
              </div>
            </div>
            <div className='hidden sm:bg-white sm:flex sm:justify-center sm:px-10 sm:py-16 sm:rounded-l sm:my-5'>
              <img className='sm:w-14' src={getFileIcon(file.fileFormat)} alt="" />
            </div>
            <p className='hidden sm:text-xs'>
              {new Date(showLastOpenedDate ? file.lastOpenedAt : file.createdAt).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>

           
            {showOptions === file._id && (
              <div
                ref={dropdownRef}
                className="absolute z-50 bg-white rounded-md shadow-lg border"
                style={{ top: '40px', right: '10px' }}
              >
                <button
                  onClick={() => handleDownloadFile(file._id)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Download
                </button>
                <button
                  onClick={() => handleFavouriteToggle(file._id)}
                  className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-100 rounded"
                >
                    {file.isFavourite ? 'Unfavourite' : 'Favourite'}
                </button>
                <button
                  onClick={() => handleDeleteFile(file._id)}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>
          Files yet to be uploaded!!
        </p>
      )}

      
    </div>
  );
};

export default FileList;
