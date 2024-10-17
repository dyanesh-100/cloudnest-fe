import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../axiosInstance';
import { FileUp } from 'lucide-react';

const FileUploadComponent = ({ currentFolderId, onUploadSuccess }) => {
  // Handle file drop and trigger the upload
  const onDrop = useCallback((acceptedFiles) => {
    uploadFiles(acceptedFiles);
  }, [currentFolderId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const uploadFiles = async (acceptedFiles) => {
    const formData = new FormData();
    
    
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    console.log('Uploading files:', acceptedFiles);

    try {
      const parentId = currentFolderId || ''; 
      
      
      const response = await axiosInstance.post(`/upload/${parentId}`, formData);

      console.log('File uploaded successfully:', response.data);

      
      if (typeof onUploadSuccess === 'function') {
        onUploadSuccess(); 
      } else {
        console.error('onUploadSuccess is not a function');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    
    <React.Fragment>
        <p className='mt-10 text-2xl font-semibold'>Upload Files</p>
            <div className='flex mt-10 text-2xl font-semibold'>
            
            <div
        {...getRootProps()} 
        className={`border-2 border-dashed border-lightBlue p-6 py-16 rounded-lg cursor-pointer w-full flex justify-center flex-col items-center ${
            isDragActive ? 'bg-gray-200' : 'bg-gray-100'
        }`}
        >
            <div className='bg-lightBlue rounded-full p-2 text-black mb-5'>
                <FileUp />
            </div>
            
        <input {...getInputProps()} /> 
        {isDragActive ? (
            <p>Drop the files here...</p>
        ) : (
            <p>Drag and drop files here, or Browse</p>
        )}
        </div>
        </div>
    </React.Fragment>
    
    
  );
};

export default FileUploadComponent;
