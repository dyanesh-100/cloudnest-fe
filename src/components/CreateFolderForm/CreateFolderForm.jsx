import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast from 'react-hot-toast';

const CreateFolderForm = ({ parentId, onCreateFolder, onCancel }) => {
  const [folderName, setFolderName] = useState('Untitled Folder');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = React.useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleInputChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const toastId = toast.loading('Creating folder...', {
      position: 'top-right',
    });

    try {
      const response = await axiosInstance.post(`/create-folder/${parentId || ''}`, { 
        folderName: folderName.trim() 
      });
      
      if (typeof onCreateFolder === 'function') {
        onCreateFolder(response.data.data);
        toast.success(`Folder "${folderName}" created successfully!`, { 
          id: toastId,
          duration: 3000,
        });
        onCancel();
      } else {
        console.error('onCreateFolder is not a function');
        toast.error('Configuration error', { id: toastId });
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create folder';
      toast.error(errorMessage, { 
        id: toastId,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-fit">
      <input
        ref={inputRef}
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          } else if (e.key === 'Escape') {
            onCancel();
          }
        }}
        required
        autoFocus
        className="border border-gray-400 focus:border-2 hover:border-gray-800 focus:border-lightBlue outline-none px-6 py-2 rounded w-full"
        disabled={isSubmitting}
      />
      <div className='flex justify-end gap-3 mt-4 pr-1'>
        <button 
          type="button"
          onClick={onCancel}
          className="text-sm text-lightBlue hover:text-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="text-sm text-lightBlue hover:text-blue-700 disabled:opacity-50"
          disabled={!folderName.trim() || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CreateFolderForm;