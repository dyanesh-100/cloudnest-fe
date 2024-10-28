import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import {  toast } from 'react-toastify'; 
const CreateFolderForm = ({ parentId, onCreateFolder,onCancel }) => {
  const [folderName, setFolderName] = useState('Untitled Folder');
  const handleInputChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/create-folder/${parentId || ''}`, { folderName });
      
       
      if (typeof onCreateFolder === 'function') {
        onCreateFolder(response.data.data);
        setFolderName('');
        toast.success("Folder created successfully") 
      } else {
        console.error('onCreateFolder is not a function');
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-fit">
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        required
        className="border border-gray-400 focus:border-2 hover:border-gray-800 focus:border-lightBlue outline-none px-6 py-2 rounded"
      />
      <br />
      <div className='flex justify-end gap-3 mt-8 pr-1'>
        <button onClick={onCancel} className="text-sm text-lightBlue ">Cancle</button>
        <button type="submit" className="text-sm text-lightBlue ">Create</button>
      </div>
      
    </form>
  );
};

export default CreateFolderForm;
