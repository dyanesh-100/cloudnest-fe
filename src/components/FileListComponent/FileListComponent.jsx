import React from 'react';
import { EllipsisVertical } from 'lucide-react';
import { getFileIcon } from '../../utils/utils'; // Assuming you have a utility function to get file icons

const FileListComponent = ({ files, searchQuery, onDeleteFile, onDownloadFile }) => {
  const [showOptions, setShowOptions] = React.useState(null);

  const handleToggleOptions = (fileId) => {
    setShowOptions(prev => (prev === fileId ? null : fileId));
  };

  const filteredFiles = files.filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="file-list flex flex-wrap gap-9 pb-10 w-full">
      {filteredFiles.length > 0 ? (
        filteredFiles.map((file) => (
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

            {/* Dropdown Options */}
            {showOptions === file._id && ( 
              <div className="absolute z-50 bg-white rounded-md shadow-lg border"
                   style={{ top: '40px', right: '10px' }}>
                <button
                  onClick={() => onDownloadFile(file._id)}  // Download button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Download
                </button>
                <button
                  onClick={() => onDeleteFile(file._id)}  // Delete button
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileListComponent;
