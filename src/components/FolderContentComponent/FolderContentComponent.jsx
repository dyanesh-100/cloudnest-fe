import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FolderList from '../FolderListComponent/FolderListComponent';
import FileListComponent from '../FileListComponent/FileListComponent';
import CreateFolderForm from '../CreateFolderForm/CreateFolderForm';
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';

const FolderContentComponent = ({fileAndFolderData = { folders: [], files: [] }, onUploadFile,onDeleteFile,onDeleteFolder,onCreateFolder}) => {
  
  const { folderId } = useParams(); // Get folder ID from URL
  const [currentFolder, setCurrentFolder] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [currentFiles, setCurrentFiles] = useState(null)
  const handleFileUpload = (fileId) => {
    onUploadFile(fileId); 
  };
  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId); 
  };
  const handleFolderDeletion = (folderId) => {
    onDeleteFolder(folderId); 
  };
  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId); 
  };

  useEffect(() => {
    if (fileAndFolderData) {
      const folder = fileAndFolderData.folders.find((f) => f._id === folderId);
      setCurrentFolder(folder);

      const foldersInCurrent = fileAndFolderData.folders.filter((f) => f.parentId === folderId);
      const filesInCurrent = fileAndFolderData.files.filter((file) => file.parentId === folderId);

      setSubFolders(foldersInCurrent);
      setCurrentFiles(filesInCurrent);
    }
  }, [fileAndFolderData, folderId]);

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder); 
  };

  const renderPath = () => {
    if (!currentFolder) return 'My Folders';
    let pathArray = [currentFolder.folderName]; 
    let parent = currentFolder.parentId;

    
    while (parent) {
      const parentFolder = fileAndFolderData.folders.find(folder => folder._id === parent);
      if (parentFolder) {
        pathArray.unshift(parentFolder.folderName); 
        parent = parentFolder.parentId; 
      } else {
        break;
      }
    }

    return 'My Folders > ' + pathArray.join(' > '); 
  };

  return (
    <div className='flex flex-col w-full py-16 px-8'>
      {currentFolder ? (
        <div>
          <h2 className='text-xl font-medium '>{renderPath()}</h2>
          <div className='mt-24'>
            <CreateFolderForm parentId={folderId} onCreateFolder={handleFolderCreation} />
          </div>

          <h3 className='text-xl font-medium mt-8 mb-4'>Subfolders</h3>
          <FolderList folders={subFolders} searchQuery="" onFolderClick={handleFolderClick} onDeleteFolder={handleFolderDeletion} onCreateFolder={handleFolderCreation}/> 

          <h3 className='text-xl font-medium mt-8 mb-4'>Files</h3>
          <FileListComponent files={currentFiles} onFolderClick={handleFolderClick} onDeleteFile={handleFileDeletion}/> 

          <FileUploadComponent currentFolderId={folderId} onUploadFile ={handleFileUpload}  />
        </div>
      ) : (
        <p>Loading folder content...</p>
      )}
    </div>
  );
};

export default FolderContentComponent;
