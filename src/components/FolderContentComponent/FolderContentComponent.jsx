import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FolderList from '../FolderListComponent/FolderListComponent';
import FileListComponent from '../FileListComponent/FileListComponent';
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';
import emptyFolderFileImage from '../../assets/images/No-Files-Folders.webp';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const FolderContentComponent = ({
  fileAndFolderData = { folders: [], files: [] },
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
    if (!currentFolder) {
      return (
        <span className="text-gray-800 font-medium">My Folders</span>
      );
    }

    let pathArray = [{ id: currentFolder._id, name: currentFolder.folderName }];
    let parent = currentFolder.parentId;
    while (parent) {
      const parentFolder = fileAndFolderData.folders.find((folder) => folder._id === parent);
      if (parentFolder) {
        pathArray.unshift({ id: parentFolder._id, name: parentFolder.folderName });
        parent = parentFolder.parentId;
      } else {
        break;
      }
    }
    pathArray.unshift({ id: null, name: "My Folders" });

    return (
      <div className="flex flex-wrap items-center text-lg sm:text-xl">
        {pathArray.map((item, index) => (
          <React.Fragment key={item.id || 'root'}>
            {index > 0 && (
              <span className="mx-3 text-gray-500">/</span>
            )}
            {index === pathArray.length - 1 ? (
              <span className="text-gray-800 font-semibold">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.id ? `/myfolders/${item.id}` : '/myfolders'}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:underline hover:underline-offset-4"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className='bg-white min-h-screen flex flex-col px-6 sm:px-8 pt-12 pb-8'>
      <div className='flex items-center w-full justify-between'>
        <div className='flex items-center w-full justify-between'>
          <div className='w-full sm:w-auto sm:flex-1'>
            <SearchBar className="w-full" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className='hidden sm:block'>
            <ProfilebarComponent onUploadFile={handleFileUpload} onCreateFolder={handleFolderCreation} />
          </div>
        </div>
      </div>
      
      {currentFolder ? (
        <div className='w-full max-w-7xl mt-10'>
          <div className='mt-8 sm:mt-12 mb-6'>
            {renderPath()}
          </div>
          
          {subFolders.length === 0 && currentFiles.length === 0 ? (
            <div className='flex flex-col items-center mt-20 text-center'>
              <img src={emptyFolderFileImage} alt='Empty folder' className='w-64 sm:w-80 mb-6 opacity-90' />
              <p className='text-2xl sm:text-3xl font-semibold text-gray-700 mb-2'>No folders created yet!</p>
              <p className='text-gray-500 text-base sm:text-lg'>Start creating folders to better organize your files.</p>
              <div className='px-6 py-3 text-lg'>
                <NewButtonComponent
                  parentId={folderId}
                  onCreateFolder={handleFolderCreation}
                  onUploadFile={handleFileUpload}
                  setFileData={setFileData}
                />              
                </div>
            </div>
          ) : (
            <>
              {subFolders.length > 0 && (
                <div className="mb-8">
                  <FolderList
                    folders={subFolders}
                    searchQuery={searchQuery} 
                    onDeleteFolder={handleFolderDeletion}
                    onCreateFolder={handleFolderCreation}
                  />
                </div>
              )}
              
              {currentFiles.length > 0 && (
                <div>
                  <p className='text-xl sm:text-2xl font-semibold text-gray-800 mb-6'>Files</p>
                  <FileListComponent
                    files={currentFiles.filter(myFilesFilter)}
                    onDeleteFile={handleFileDeletion}
                    setFileData={setFileData}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center w-full max-w-2xl mt-12 sm:mt-24 text-center'>
          <p className='text-2xl sm:text-3xl font-semibold text-gray-700 mb-2'>Loading folder...</p>
        </div>
      )}
    </div>
  );
};

export default FolderContentComponent;