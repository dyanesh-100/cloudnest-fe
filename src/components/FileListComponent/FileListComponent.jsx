import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { getFileIcon, downloadFileToLocal } from '../../utils/utils';
import axiosInstance from '../../axiosInstance';

const FileList = ({ files, filterFn, sortFn,onDeleteFile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggleOptions = (fileId) => {
    setShowOptions(prev => (prev === fileId ? null : fileId));
  };

  const handleDownloadFile = async (fileId) => {
    try {
      await downloadFileToLocal(fileId);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await axiosInstance.delete(`/files/${fileId}`);
      alert('File deleted successfully');
      onDeleteFile(fileId);
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const filteredFiles = files.filter(file => 
    file && file.fileName && file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );  const sortedFiles = filteredFiles.sort(sortFn);

  return (
    <div className='flex flex-wrap gap-9 pb-10 w-full'>
      {sortedFiles.length > 0 ? (
        sortedFiles.map(file => (
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
            <p className='text-xs'>
              {new Date(file.createdAt).toLocaleString(undefined, {
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
        <p>No files found</p>
      )}
    </div>
  );
};

export default FileList;
