import React, { useEffect, useState } from 'react'
import { Search,EllipsisVertical } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import pdf from '../../assets/images/pdf-cover.webp'


const HomePageComponent = ({fileAndFolderData = []}) => {
  return (
    <React.Fragment>
      <div className='bg-white h-screen flex'>
        
        <div className='px-8 w-full'>
          <p className='py-16 flex justify-center text-3xl'>WELCOME TO CLOUDNEST</p>
          <div className='flex justify-center'>
            <div className='flex bg-paleBlue rounded p-2 pl-3 rounded-3xl w-1/2'>
              <Search className=''/>
              <input className='outline-none bg-paleBlue w-full pl-3' type="text" placeholder='Search files and folders'/>
            </div>
          </div>

          <p className='mt-16 mb-10'>Suggested folders</p>
          <div className='flex flex-wrap gap-6'>
            {fileAndFolderData.filter(item => item.type === 'folder').map(folder => (
                <div className='flex items-center bg-paleBlue w-1/5 py-3 px-5 rounded-xl'>
                  <FontAwesomeIcon icon={faFolder} className='text-black size-6'/>
                  <div className='flex justify-between items-center leading-none text-black pl-5 w-full'>
                    <div className=''>
                      <p className='text-sm'>{folder.name}</p>
                      <p className='text-xs'>{new Date(folder.lastModifiedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <EllipsisVertical className=''/>
                    </div>
                  </div>
              </div>
            ))}
          </div>
          
          

          <p className='mt-10 mb-10'>Suggested files</p>
          <div className='flex flex-wrap gap-6 pb-10'>
            {fileAndFolderData.filter(item => item.type === 'file').map(file => (
                <div className=' bg-paleBlue w-3/12 py-3 px-5 rounded-xl'>
                  <div className='flex items-center leading-none text-black'>
                    <img src={pdf} alt="" className='w-6' />
                    <div className='flex justify-between w-full'>
                      <p className='text-sm pl-3'>{file.name}</p>
                      <EllipsisVertical className=''/>
                    </div>
                  </div>
                  <div className='bg-white flex justify-center px-10 py-16 rounded-l my-5'>
                    <img className='w-14' src={pdf} alt="" />
                  </div>
                  <p className='text-xs'>{new Date(file.lastModifiedAt).toLocaleString()}</p>
              </div>

            ))}
          </div>
          
          
        </div>
      </div>
    </React.Fragment>
    
  )
}

export default HomePageComponent