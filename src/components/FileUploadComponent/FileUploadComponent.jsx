import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../axiosInstance';
import { FileUp } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const FileUploadComponent = ({ currentFolderId, onUploadFile }) => {
  
  const onDrop = useCallback((acceptedFiles) => {
    uploadFiles(acceptedFiles);
  }, [currentFolderId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const uploadFiles = async (acceptedFiles) => {
    const formData = new FormData();
    
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });
    const toastId = toast.loading("File uploading");

    try {
      const parentId = currentFolderId || ''; 
      
      
      const response = await axiosInstance.post(`/upload/${parentId}`, formData);      
      if (typeof onUploadFile === 'function') {
        onUploadFile(response.data.data);
        toast.update(toastId, { 
          render: "File uploaded successfully!", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        }); 
      } else {
        console.error('onUploadSuccess is not a function');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.update(toastId, { 
        render: "Error uploading files", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <React.Fragment>
      <div className='flex mt-10 '>
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
