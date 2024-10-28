import { useState } from 'react';
import CreateFolderForm from '../CreateFolderForm/CreateFolderForm';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent'
import { Plus } from 'lucide-react';

const NewButtonComponent = ({ onCreateFolder,onUploadFile,parentId }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCreateFolderForm, setShowCreateFolderForm] = useState(false);
  const [showFileUploadForm, setShowFileUploadForm] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
    <div>
      <button
        className='bg-lightBlue text-white px-3 py-2 rounded-3xl hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-l hover:shadow-xl active:shadow-none transition duration-200 ease-in-out'
        onClick={toggleDropdown}
      >
        <div className='flex items-center gap-2 text-xl'>
            <Plus/>
            New
        </div>
        
      </button>

      
      {dropdownVisible && (
        <div className='absolute bg-white shadow-md rounded mt-2 w-48'>
          <ul>
            <li
              className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
              onClick={handleCreateFolderClick}
            >
              Create Folder
            </li>
            <li
              className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
              onClick={handleFileUploadClick}
            >
              Upload File
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
              onCreateFolder={onCreateFolder}
              onCancel={handleCancelCreateFolder}
            />
          </div>
        </div>
      )}

      
    {showFileUploadForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
         
          <div
            className='fixed inset-0 bg-gray-800 opacity-50'
            onClick={handleCancelUploadFile}
          ></div>

          <div className='bg-white p-5 rounded-lg shadow-lg relative z-10'>
          
            <FileUploadComponent
              currentFolderId={parentId ?? null}
              onUploadFile={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewButtonComponent;
