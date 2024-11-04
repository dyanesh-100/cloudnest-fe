import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import NewButtonComponent from '../NewButtonComponent/NewButtonComponent';

const ProfilebarComponent = ({ onUploadFile, onCreateFolder,parentId,setFileData }) => {
    const [user, setUser] = useState(null); 
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const dropdownRef = useRef(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/userdata'); 
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error.response ? error.response.data : error.message);
            }
        };
        fetchUser();
    }, []);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
                enableScrolling(); 
            }
        };
        
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            disableScrolling();
        } else {
            enableScrolling();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            enableScrolling();
        };
    }, [dropdownOpen]);

    const disableScrolling = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScrolling = () => {
        document.body.style.overflow = '';
    };

    const signout = async () => {
        try {
            await axiosInstance.post('/signout'); 
            navigate('/'); 
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    const handleFileUpload = (fileId) => {
        onUploadFile(fileId);
    };

    const handleFolderCreation = (folderId) => {
        onCreateFolder(folderId); 
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='flex gap-5 items-center relative'>
            <div className='hidden sm:block sm:text-base sm:font-semibold'>
                <NewButtonComponent
                    parentId={parentId ?? ''}
                    onCreateFolder={handleFolderCreation}
                    onUploadFile={handleFileUpload}
                    setFileData={setFileData}
                />
            </div>

            
            <div onClick={toggleDropdown} className='flex text-xl items-center justify-center size-12  hover:border-lightGrey hover:border-lightGrey bg-blue-500 text-white rounded-full cursor-pointer border-4 border-paleBlue'>
                {user ? user.firstName[0].toUpperCase() : 'U'}
            </div>

            
            {dropdownOpen && (
                <div ref={dropdownRef} className=' absolute z-10 top-12 mt-5 right-0 bg-paleBlue shadow-lg rounded-3xl px-20 py-6'>
                    <p className='text-lg'>{user.email}</p>
                    <div className='flex justify-center my-5'>
                        <div className='flex items-center justify-center size-20 text-3xl bg-blue-500 text-white rounded-full '>
                            {user ? user.firstName[0].toUpperCase() : 'U'}
                        </div>
                    </div>
                    <p className='text-xl text-center mb-5'>Hii, {user.firstName} !!</p>
                    <div className='bg-lightBlue p-3 rounded-3xl text-center'>
                        <button onClick={signout} className='text-white hover:text-red-950'>Sign Out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilebarComponent;
