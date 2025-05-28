import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const FolderList = ({ folders, searchQuery, onDeleteFolder }) => {
  const [showOptions, setShowOptions] = useState(null);
  const dropdownRef = useRef(null);

  
  const handleToggleOptions = (folderId) => {
    setShowOptions((prev) => (prev === folderId ? null : folderId));
  };

  
  const handleDeleteFolder = async (folderId) => {
    const toastId = toast.loading('Deleting folder...', {
      position: 'top-right',
    });

    try {
      await axiosInstance.delete(`/folders/${folderId}`);
      toast.update(toastId, { 
        render: "Folder deleted successfully", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      }); 
      onDeleteFolder(folderId);
    } catch (error) {
      console.error('Error deleting folder:', error);
      
      
      toast.error(error.response?.data?.message || 'Failed to delete folder. Please try again.', {
        id: toastId,
        duration: 4000,
        position: 'top-right',
      });
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
    <div className='flex flex-wrap gap-4 w-full lg:gap-6 xl:gap-7 '>
      {folders
        .filter((folder) => folder.folderName.toLowerCase().includes(searchQuery.toLowerCase()))
        .length > 0 ? (
        folders
          .filter((folder) => folder.folderName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((folder) => (
            <div className='bg-paleBlue w-full sm:w-64 xl:w-56 2xl:w-64 py-3 px-5 xl:px-4 rounded-xl relative' key={folder._id}>
              <Link to={`/myfolders/${folder._id}`} className='flex items-center'>
                <FontAwesomeIcon icon={faFolder} className='text-black size-6' />
                <div className='flex justify-between items-center leading-none text-black pl-5 xl:pl-4 w-full'>
                  <div>
                    <p className='text-sm truncate max-w-[140px]'>{folder.folderName}</p>
                    <p className='text-xs'>
                      {new Date(folder.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',  
                        day: '2-digit',   
                        hour: '2-digit',  
                        minute: '2-digit',
                        hour12: true     
                      })}
                    </p>
                  </div>
                </div>
              </Link>              
              <EllipsisVertical
                className='cursor-pointer absolute top-4 right-5 xl:right-2'
                onClick={() => handleToggleOptions(folder._id)}
              />

              
              {showOptions === folder._id && (
                <div
                  ref={dropdownRef}
                  className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-56 left-3/4 ml-2 top-10 animate-fade-in"
                >
                  <button
                    onClick={() => handleDeleteFolder(folder._id)}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="p-1.5 mr-3 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Delete</p>
                      <p className="text-xs text-gray-400">Permanently remove folder</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ))
      ) : (
        <p>No folder found.</p>
      )}
    </div>
  );
};

export default FolderList;
