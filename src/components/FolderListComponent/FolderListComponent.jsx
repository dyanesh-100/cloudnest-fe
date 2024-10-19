import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { EllipsisVertical } from 'lucide-react';

const FolderList = ({ folders, searchQuery }) => {
  return (
    <div className='flex flex-wrap gap-9'>
      {folders.filter(folder => folder.folderName.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
        folders
          .filter(folder => folder.folderName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(folder => (
            <div className='flex items-center bg-paleBlue w-72 py-3 px-5 rounded-xl' key={folder._id}> 
              <FontAwesomeIcon icon={faFolder} className='text-black size-6' />
              <div className='flex justify-between items-center leading-none text-black pl-5 w-full'>
                <div>
                  <p className='text-sm truncate max-w-[150px]'>{folder.folderName}</p>
                  <p className='text-xs'>{new Date(folder.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <EllipsisVertical className='' />
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>No folder found.</p>
      )}
    </div>
  );
};

export default FolderList;
