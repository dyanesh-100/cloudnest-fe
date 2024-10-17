import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { getFileIcon } from '../../utils/utils';
import { downloadFileToLocal } from '../../utils/utils';

const FileList = ({ files, searchQuery }) => {
  const [showOptions, setShowOptions] = useState(null);
  const dropdownRef = useRef(null); // Ref for the options menu

  const handleToggleOptions = (fileId) => {
    setShowOptions(prev => prev === fileId ? null : fileId);
  };

  const handleDownloadFile = async (fileId) => {
    try {
      const downloadUrl = await downloadFileToLocal(fileId); // Assumes the utility function returns the signed URL

      // Dynamically create an anchor element for downloading
      const link = document.createElement('a'); // Create an <a> element dynamically
      link.href = downloadUrl; // Set the URL to download
      link.target = '_blank'; // Open in a new tab
      link.rel = 'noopener noreferrer'; // Prevent the new tab from accessing the current window object
      link.click(); // Trigger the download by programmatically clicking the link
    } catch (error) {
      console.error('Error downloading the file:', error);
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

  return (
    <div className='flex flex-wrap gap-9 pb-10 w-full'>
      {files.filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
        files
          .filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(file => (
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
              <p className='text-xs'>{new Date(file.lastOpenedAt).toLocaleString()}</p>
              
              
              {showOptions === file._id && (
                <div
                  ref={dropdownRef} 
                  className="absolute z-50 bg-white rounded-md shadow-lg border"
                  style={{
                    top: '40px', 
                    right: '10px',
                  }}
                >
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
        <p>No files found</p>
      )}
    </div>
  );
};

export default FileList;