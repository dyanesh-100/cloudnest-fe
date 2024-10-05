import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import logo from '../../assets/images/logo3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile,faHouse,faFolder,faClock, faStar} from '@fortawesome/free-solid-svg-icons'; // Import the file icon
import { LinearProgress } from '@mui/material'; 
import { Clock, Cloud, Files, FolderClosed, House, Star } from 'lucide-react';

const SidebarComponent = () => {
    const [usedStorage, seUsedStorage] = useState(8.42);
    const maxStorage = 50;

    const usagePercentage = (usedStorage / maxStorage) * 100;
  return (
    <BrowserRouter>
        <div className='sidebar-container font-inter bg-white lg:w-1/5 xl:w-1/6 rounded-l-3xl h-screen flex flex-col justify-between'>
            <div className=''>
                <div className='flex gap-3 items-center py-10 px-8'>
                    <img src={logo} alt=""  className='w-16 sm:w-14 md:w-16 lg:w-18 xl:w-20 rounded-full'/>
                    <div className=''>
                        <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>CloudNest</p>
                        <p className='text-grey'>Trusted Cloud</p>
                    </div>
                </div>
                <hr className='border-lightGrey '/>
                <p className='text-grey mt-8 text-sm py-0 px-8'>General Menu</p>
                <div className='text-lg px-8'>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                        <House/>
                        <p>Home</p>
                    </div>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                        <Files/>
                        <p>My Files</p>
                    </div>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                        <FolderClosed/>
                        <p>My Folders</p>
                    </div>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                        <Clock/>
                        <p>Recents</p>
                    </div>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold hover:bg-lightGrey active:bg-grey focus:outline-none focus:ring focus:grey rounded-xl p-1.5'>
                        <Star/>
                        <p>Favourites</p>
                    </div>
                </div> 
            </div>
           
            <div className=''>
            <hr className='border-lightGrey'/>
                <div className='px-8 pb-10'>
                    <div className='flex text-black gap-2 items-center mt-6 font-semibold'>
                        <Cloud/>
                        <p>Storage</p>
                    </div>
                    <LinearProgress
                        variant="determinate"
                        value={usagePercentage}
                        className="!h-2 w-full rounded-md mt-4"
                    />
                    <div className="text-sm text-gray-600 mt-2">
                        {usedStorage} GB of {maxStorage} GB used
                    </div>
                </div>
                
            </div>
        </div>
    </BrowserRouter>
  )
}

export default SidebarComponent