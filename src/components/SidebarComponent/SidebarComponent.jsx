import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo3.png'
import { LinearProgress } from '@mui/material'; 
import { Clock, Cloud, Files, FolderClosed, House, Star } from 'lucide-react';
import HomePageComponent from '../HomePageComponent/HomePageComponent';
import MyFilesPageComponent from '../MyFilesPageComponent/MyFilesPageComponent';
import MyFoldersPageComponent from '../MyFoldersPageComponent/MyFoldersPageComponent';
import RecentsPageComponent from '../RecentsPageComponent/RecentsPageComponent';
import FavouritesPageComponent from '../FavouritesPageComponent/FavouritesPageComponent';
import ProfilebarComponent from '../ProfilebarComponent/ProfilebarComponent';

import {bytesToGB} from '../../utils/utils';
import axiosInstance from '../../axiosInstance';

const SidebarComponent = () => {
    const [totalUsedStorage, setTotalUsedStorage] = useState(0);
    const [categorizedSizes ,setCategorizedSize ] = useState({
        documentSize : 0,
        videoSize : 0,
        audioSize : 0,
        imageSize : 0
    })
    const [fileData, setFileData] = useState([]); 
    const [folderData, setFolderData] = useState([]); 
    
    const navigate = useNavigate();

    const maxStorage = 3;
    const usagePercentage = (totalUsedStorage / maxStorage) * 100;
    

    
    useEffect(() => {
        const fetchFilesAndFolders = async () => {
            try {
                    const responseFolders = await axiosInstance.get('/folders')
                    setFolderData(responseFolders.data.data)

                    const responseFiles = await axiosInstance.post('/files');
                    setFileData(responseFiles.data.data);
                    setTotalUsedStorage(responseFiles.data.totalStorageUsed)
                    const{documentSize, videoSize, audioSize, imageSize} = responseFiles.data.categorizedSizes
                    
                    setCategorizedSize({
                        documentSize,
                        videoSize,
                        audioSize,
                        imageSize
                    })
                
                
            } catch (error) {
                alert(`Status: ${error.response?.status || 500} - ${error.response?.data.message || "Server Error"}`);
                if(error.response?.status === 401){
                    navigate('/login');
                }
            }
        };
        fetchFilesAndFolders();
    }, [navigate]);

    const fileAndFolderData = { folders: folderData, files: fileData };
    

    return (
        
            <div className="flex h-screen">
                
                <div className='sidebar-container font-inter bg-white lg:w-1/5 xl:w-1/6  rounded-l-3xl h-screen flex flex-col justify-between flex-shrink-0'>
                    <div className=''>
                        <Link to='/' className='flex gap-3 items-center py-10 px-8'>
                            <img src={logo} alt="" className=' sm:w-14 md:w-16 lg:w-18 xl:w-20 rounded-full' />
                            <div className=''>
                                <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl'>CloudNest</p>
                                <p className='text-grey'>Trusted Cloud</p>
                            </div>
                        </Link>
                        <hr className='border-lightGrey ' />
                        <p className='text-grey mt-8 text-sm py-0 px-8'>General Menu</p>
                        <div className='text-lg px-8'>
                            <Link to='/cloudnest/home' className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                                <House />
                                <p>Home</p>
                            </Link>
                            <Link to='/cloudnest/myfiles' className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                                <Files />
                                <p>My Files</p>
                            </Link>
                            <Link to='/cloudnest/myfolders' className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                                <FolderClosed />
                                <p>My Folders</p>
                            </Link>
                            {/* <Link to='/cloudnest/recents' className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                                <Clock />
                                <p>Recents</p>
                            </Link>
                            <Link to='/cloudnest/favourites' className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                                <Star />
                                <p>Favourites</p>
                            </Link> */}
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
                <div className="border-l border-lightGrey h-screen"></div> 

               
                <div className="dynamic-container flex-grow overflow-y-auto scrollbar-thin max-w-[75%] font-inter">
                    
                    <Routes>
                        <Route exact path='/home' element={<HomePageComponent fileAndFolderData={fileAndFolderData}/>} />
                        <Route exact path='/myfiles' element={<MyFilesPageComponent fileAndFolderData={fileAndFolderData}/>} />
                        <Route exact path='/myfolders' element={<MyFoldersPageComponent fileAndFolderData={fileAndFolderData}/>} />
                        {/* <Route exact path='/recents' element={<RecentsPageComponent fileAndFolderData={fileAndFolderData}/>} />
                        <Route exact path='/favourites' element={<FavouritesPageComponent fileAndFolderData={fileAndFolderData}/>} /> */}
                        
                    </Routes>
                </div>
                <div className="profile-container lg: w-1/4 xl:w-1/5  flex flex-col justify-between font-inter flex-shrink-0">
                    <ProfilebarComponent categorizedSizes = {categorizedSizes}/> 
                </div>

            </div>
        
    );
};

export default SidebarComponent;
