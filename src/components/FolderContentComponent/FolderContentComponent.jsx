import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FolderList from '../FolderListComponent/FolderListComponent';
import FileListComponent from '../FileListComponent/FileListComponent';
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';
import emptyFolderFileImage from '../../assets/images/No-Files-Folders.webp'; // Import your image
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const FolderContentComponent = ({
  fileAndFolderData = { folders: [], files: [] ,},
  onUploadFile,
  onDeleteFile,
  onDeleteFolder,
  onCreateFolder,
  setFileData,
}) => {
  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [subFolders, setSubFolders] = useState([]);
  const [currentFiles, setCurrentFiles] = useState([]);

  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };

  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId);
  };

  const handleFolderCreation = (folderId) => {
    onCreateFolder(folderId);
  };
  const handleFolderDeletion = (folderId) => {
    onDeleteFolder(folderId);
  };

  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
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

  const renderPath = () => {
    if (!currentFolder) return 'My Folders';
    let pathArray = [currentFolder.folderName];
    let parent = currentFolder.parentId;

    while (parent) {
      const parentFolder = fileAndFolderData.folders.find((folder) => folder._id === parent);
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
      <div className='flex items-center w-full justify-between'>
          <div className='w-10/12'>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <ProfilebarComponent parentId={folderId} onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
          </div>
        </div>
      {currentFolder ? (
        <div>
          <h2 className='text-xl font-medium mt-20'>{renderPath()}</h2>

          {subFolders.length === 0 && currentFiles.length === 0 && (
            <div className='flex flex-col items-center mt-20 text-center'>
              <img src={emptyFolderFileImage} alt='Empty Folder' className='mb-4 w-96' />
              <p className='text-xl font-semibold text-gray-600'>This folder is empty!</p>
              <p className='text-gray-500'>Add new folders or upload files to get started.</p>
              <NewButtonComponent
                parentId={folderId}
                onCreateFolder={handleFolderCreation}
                onUploadFile={handleFileUpload}
                setFileData={setFileData}
              />
            </div>
          )}

          
          {subFolders.length > 0 && (
            <div>
              <h3 className='text-xl font-medium mt-8 mb-4'>Subfolders</h3>
              <FolderList
                folders={subFolders}
                searchQuery={searchQuery} 
                onFolderClick={() => setCurrentFolder(folderId)}
                onDeleteFolder={handleFolderDeletion}
                onCreateFolder={handleFolderCreation}
              />
            </div>
          )}

          
          {currentFiles.length > 0 && (
            <>
              <h3 className='text-xl font-medium mt-8 mb-4'>Files</h3>
              <FileListComponent
                files={currentFiles.filter(myFilesFilter)}
                onFolderClick={() => setCurrentFolder(folderId)}
                onDeleteFile={handleFileDeletion}
                setFileData={setFileData}
              />
            </>
          )}
        </div>
      ) : (
        <p>Loading folder content...</p>
      )}
    </div>
  );
};

export default FolderContentComponent;
