import { useEffect, useRef, useState } from 'react';
import CreateFolderForm from '../CreateFolderForm/CreateFolderForm';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent'
import { FolderPlus, Plus, Upload, X } from 'lucide-react';

const NewButtonComponent = ({ onCreateFolder,onUploadFile,parentId }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCreateFolderForm, setShowCreateFolderForm] = useState(false);
  const [showFileUploadForm, setShowFileUploadForm] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible !== false) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);
  const handleCreateFolderClick = () => {
    setShowCreateFolderForm(true);
    setShowFileUploadForm(false);
    setDropdownVisible(false);
  };

  const handleFileUploadClick = () => {
    setShowFileUploadForm(true);
    setShowCreateFolderForm(false);
    setDropdownVisible(false);
  };
  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId);
  };

  const handleCancelCreateFolder = () => {
    setShowCreateFolderForm(false);
  };
  const handleCancelUploadFile = () => {
    setShowFileUploadForm(false);
  };
  const handleFileUpload = (fileId) => {
    onUploadFile(fileId); 
  };

 return (
    <div className="relative">
      <button
        className='bg-lightBlue text-white px-3 py-2.5 rounded-3xl hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2'
        onClick={toggleDropdown}
      >
        <Plus size={20} />
        <span className="text-sm font-medium">New</span>
      </button>
      {dropdownVisible && (
        <div 
          className="absolute bg-white shadow-xl rounded-lg mt-2 w-56 border border-gray-200 z-10 left-1/2 -translate-x-1/2 overflow-hidden animate-dropdown-fade"
          style={{ top: '100%' }}
          ref={dropdownRef}
        >
          <ul className="py-1">
            <li
              className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-800 transition-colors duration-150"
              onClick={handleCreateFolderClick}
            >
              <FolderPlus size={18} className="text-blue-600 flex-shrink-0" />
              <span className="font-medium">Create Folder</span>
            </li>
            <li
              className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-800 transition-colors duration-150"
              onClick={handleFileUploadClick}
            >
              <Upload size={18} className="text-blue-600 flex-shrink-0" />
              <span className="font-medium">Upload File</span>
            </li>
          </ul>
        </div>
      )}
      {showCreateFolderForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-gray-800 opacity-50'
            onClick={handleCancelCreateFolder}
          ></div>

          <div className='bg-white px-5 py-7 rounded-lg shadow-lg relative z-10'>
          <p className='text-xl mb-5'>New Folder</p>
            <CreateFolderForm
              parentId={parentId ?? null}
              onCreateFolder={handleFolderCreation}
              onCancel={handleCancelCreateFolder}
            />
          </div>
        </div>
      )}
      {showFileUploadForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm'
            onClick={handleCancelUploadFile}
          ></div>

          <div className='bg-white p-6 rounded-lg shadow-xl relative z-10 w-full max-w-2xl'>
            <div className="flex justify-between items-center mb-4">
              <h3 className='text-lg font-semibold'>Upload Files</h3>
              <button
                onClick={handleCancelUploadFile}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <FileUploadComponent
              currentFolderId={parentId ?? null}
              onUploadFile={(files) => {
                handleFileUpload(files);
                setShowFileUploadForm(false); 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewButtonComponent;
