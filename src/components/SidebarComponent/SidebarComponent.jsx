import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo3.png'
import { LinearProgress } from '@mui/material'; 
import { Clock, Cloud, Files, FolderClosed, House, Star, Menu} from 'lucide-react';
import {  toast } from 'react-toastify'; 
import HomePageComponent from '../HomePageComponent/HomePageComponent';
import MyFilesPageComponent from '../MyFilesPageComponent/MyFilesPageComponent';
import FolderContentComponent from '../FolderContentComponent/FolderContentComponent'
import MyFoldersPageComponent from '../MyFoldersPageComponent/MyFoldersPageComponent';
import RecentPageComponent from '../RecentPageComponent/RecentPageComponent';
import FavouritesPageComponent from '../FavouritesPageComponent/FavouritesPageComponent';

import './SidebarComponent.css'
import {bytesToGB} from '../../utils/utils';
import axiosInstance from '../../axiosInstance';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

const SidebarComponent = () => {
    const [totalUsedStorage, setTotalUsedStorage] = useState(0);
    const [fileData, setFileData] = useState([]); 
    const [folderData, setFolderData] = useState([]); 
    const [usagePercentage, setUsagePercentage] = useState(0)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [categorizedSizes ,setCategorizedSize ] = useState({
        documentSize : 0,
        videoSize : 0,
        audioSize : 0,
        imageSize : 0
    })
    
    const navigate = useNavigate();
    const maxStorage = 3;
    
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    useEffect(() => {
        const fetchFilesAndFolders = async () => {
            try {
                const responseFiles = await axiosInstance.post('/files');
                if (responseFiles.data.data) {
                    setFileData(responseFiles.data.data); 
                }
                
                
                if (responseFiles.data.totalStorageUsed !== undefined && responseFiles.data.totalStorageUsed !== null) {
                    setTotalUsedStorage(responseFiles.data.totalStorageUsed)
                    // const { documentSize, videoSize, audioSize, imageSize } = responseFiles.data.categorizedSizes;
                    // setCategorizedSize({
                    //     documentSize,
                    //     videoSize,
                    //     audioSize,
                    //     imageSize
                    // });
                } else {
                    setTotalUsedStorage(0);
                }
                const responseFolders = await axiosInstance.get('/folders');
                if (responseFolders.data.data) {
                    setFolderData(responseFolders.data.data); 
                }

                
                
            } catch (error) {
                console.error('Error fetching files and folders:', error);
                alert(`Status: ${error.response?.status || 500} - ${error.response?.data.message || "Server Error"}`);
                if(error.response?.status === 401){
                    navigate('/login');
                }
            }
        };
        fetchFilesAndFolders();
    }, [navigate]);

    const fileAndFolderData = { folders: folderData, files: fileData };

    useEffect(() => {
        if (totalUsedStorage !== 0) {
            const calculatedUsagePercentage = (totalUsedStorage / maxStorage) * 100;
            setUsagePercentage(calculatedUsagePercentage);
        }

    }, [totalUsedStorage, maxStorage, usagePercentage]);


    const handleFileUploadSuccess = (newFile) => {
        setFileData((prevFiles) => [...prevFiles, newFile]);
        setTotalUsedStorage((prevTotal) => prevTotal + newFile.size); 
    };

    const handleDeleteFile = (fileId) => {
        setFileData((prevFiles) => {
            const fileToDelete = prevFiles.find(file => file._id === fileId);
            if (fileToDelete) {
                setTotalUsedStorage((prevTotal) => prevTotal - fileToDelete.size); 
            }
            return prevFiles.filter(file => file._id !== fileId);
        });
    };

    const handleDeleteFolder = (folderId) => {
        setFolderData((prevFolders) => prevFolders.filter(folder => folder._id !== folderId)); 
    };


    const handleFolderCreationSuccess = (newFolder) => {
        setFolderData((prevFolders) => [...prevFolders, newFolder]);
      };
return (
    <div className="flex h-screen relative">
        {screenWidth < 768 && (
            <div className='fixed flex w-full justify-between px-5 py-5 items-center'>
                <button
                    className="hamburger-button  top-4 left-4 z-50"
                    onClick={handleSidebarToggle}
                >
                    <Menu/>
                    <span className={`hamburger-icon ${isSidebarOpen ? 'open' : ''}`}></span>
                </button>
                <Link to='/' className='flex gap-3 items-center sm:hidden'>
                        <img src={logo} alt="" className='rounded-full size-10 sm:w-14 md:w-16 lg:w-18 xl:w-20 ' />
                        <div className=''>
                            <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl'>CloudNest</p>
                        </div>
                    </Link>
                <div>
                    <ProfilebarComponent onUploadFile={handleFileUploadSuccess} onCreateFolder={handleFolderCreationSuccess} />
                </div>
            </div>
            
        )}
        {(isSidebarOpen || screenWidth >= 768) && (
            <div
                className={`sidebar-container font-inter bg-white lg:w-1/5 rounded-l-3xl h-screen flex flex-col justify-between flex-shrink-0 ${
                    screenWidth < 768 ? 'fixed top-0 left-0 w-2/3' : 'relative'
                }`}
                style={screenWidth < 768 ? { zIndex: 50 } : {}}
            >
                <div className=''>
                    <Link to='/' className='flex gap-3 items-center py-10 px-8'>
                        <img src={logo} alt="" className='rounded-full w-10 sm:w-14 md:w-16 lg:w-18 xl:w-20 ' />
                        <div className=''>
                            <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl'>CloudNest</p>
                            <p className='text-grey'>Trusted Cloud</p>
                        </div>
                    </Link>
                    <hr className='border-lightGrey ' />
                    <p className='text-grey mt-8 text-sm py-0 px-8'>General Menu</p>
                    <div className='text-lg px-8'>
                        <Link to='/cloudnest/home' onClick={handleSidebarToggle} className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                            <House />
                            <p>Home</p>
                        </Link>
                        <Link to='/cloudnest/myfiles' onClick={handleSidebarToggle} className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                            <Files />
                            <p>My Files</p>
                        </Link>
                        <Link to='/cloudnest/folders' onClick={handleSidebarToggle} className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                            <FolderClosed />
                            <p>My Folders</p>
                        </Link>
                        <Link to='/cloudnest/recent' onClick={handleSidebarToggle} className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                            <Clock />
                            <p>Recent</p>
                        </Link>
                        <Link to='/cloudnest/favourites' onClick={handleSidebarToggle} className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                            <Star />
                            <p>Favourites</p>
                        </Link>
                    </div>
                </div>
    
                <div className=''>
                    <hr className='border-lightGrey' />
                    <div className='px-8 pb-10'>
                        <div className='flex text-black gap-2 items-center mt-6 font-semibold'>
                            <Cloud />
                            <p>Storage</p>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={usagePercentage}
                            className="!h-2 w-full rounded-md mt-4"
                        />
                        <div className="text-sm text-gray-600 mt-2">
                            {bytesToGB(totalUsedStorage)} GB of {maxStorage} GB used
                        </div>
                    </div>
                </div>
                        
            </div>
        )}
        <div className="border-l border-lightGrey h-screen"></div>
        <div className="dynamic-container flex-grow overflow-y-auto scrollbar-thin font-inter">
            <Routes>
                <Route exact path='/home' element={<HomePageComponent fileAndFolderData={fileAndFolderData} onDeleteFile={handleDeleteFile} onDeleteFolder={handleDeleteFolder} setFileData={setFileData} onCreateFolder={handleFolderCreationSuccess} onUploadFile={handleFileUploadSuccess}/>} />
                <Route exact path='/myfiles' element={<MyFilesPageComponent fileAndFolderData={fileAndFolderData} onDeleteFile={handleDeleteFile} onUploadFile={handleFileUploadSuccess} setFileData={setFileData}/>} />
                <Route exact path='/folders' element={<MyFoldersPageComponent fileAndFolderData={fileAndFolderData} onDeleteFolder={handleDeleteFolder} onCreateFolder={handleFolderCreationSuccess} onUploadFile={handleFileUploadSuccess} setFileData={setFileData}/>} />
                <Route exact path='/folders/:folderId' element={<FolderContentComponent fileAndFolderData={fileAndFolderData} onDeleteFile={handleDeleteFile} onDeleteFolder={handleDeleteFolder} onUploadFile={handleFileUploadSuccess} onCreateFolder={handleFolderCreationSuccess} setFileData={setFileData}/>}/>
                <Route exact path='/recent' element={<RecentPageComponent fileAndFolderData={fileAndFolderData} onDeleteFile={handleDeleteFile} onUploadFile={handleFileUploadSuccess} onCreateFolder={handleFolderCreationSuccess} setFileData={setFileData}/>} />
                <Route exact path='/favourites' element={<FavouritesPageComponent fileAndFolderData={fileAndFolderData} onDeleteFile={handleDeleteFile} onUploadFile={handleFileUploadSuccess} onCreateFolder={handleFolderCreationSuccess} setFileData={setFileData}/>} />
            </Routes>
        </div>
        {isSidebarOpen && screenWidth < 768 && (
            <div className="overlay" onClick={handleSidebarToggle}></div>
        )}
    </div>
    
    );
};

export default SidebarComponent;
