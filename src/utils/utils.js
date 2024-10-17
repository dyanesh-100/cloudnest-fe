import pdf from '../assets/images/pdf-cover.webp';
import word from '../assets/images/word-cover.webp';
import ppt from '../assets/images/ppt-cover.webp';
import imageLogo from '../assets/images/image-cover.jpg';
import videoLogo from '../assets/images/video-cover.webp';
import defaultLogo from '../assets/images/document.png';
import axiosInstance from '../axiosInstance';

export const bytesToGB = (bytes) =>{
    const GB = 1024 * 1024 * 1024
    return(bytes/GB).toFixed(2)
}

const fileFormatIcons = {
    'application/pdf': pdf,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': word,
    'application/msword': word,
    'application/vnd.ms-powerpoint': ppt,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ppt,
    'image/jpeg': imageLogo,
    'image/png': imageLogo,
    'image/gif': imageLogo,
    'video/mp4': videoLogo,
    'video/x-matroska': videoLogo,
    'video/x-msvideo': videoLogo,
    'video/quicktime': videoLogo,
    'default': defaultLogo,
  };
  
  export const getFileIcon = (fileFormat) => {
    return fileFormatIcons[fileFormat] || fileFormatIcons['default'];
  };


  

  export const downloadFileToLocal = async (fileId) => {
    try {
      const response = await axiosInstance.get(`/download/${fileId}`);
      const downloadUrl = response.data.downloadUrl;
  
      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', ''); 
        link.setAttribute('target', '_blank'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('No download URL provided');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again later.');
    }
  };
  
