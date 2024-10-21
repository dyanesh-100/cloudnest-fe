import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const CreateFolderForm = ({ parentId, onCreateFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/create-folder/${parentId || ''}`, { folderName });
      onCreateFolder(response.data.data); // Call the function to update the folder list
      setFolderName(''); // Clear the input after submission
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        required
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Folder</button>
    </form>
  );
};

export default CreateFolderForm;
