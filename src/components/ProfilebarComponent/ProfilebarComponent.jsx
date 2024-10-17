import React, { useEffect, useState } from 'react';
import DP from '../../assets/images/default-dp.jpg'; 
import doc from '../../assets/images/default-cover.png';
import image from '../../assets/images/image-logo.webp';
import video from '../../assets/images/video-logo.png';
import audio from '../../assets/images/audio-logo.jpg';
import { bytesToGB } from '../../utils/utils';
import { Ellipsis } from 'lucide-react';
import axiosInstance from '../../axiosInstance';

const ProfilebarComponent = ({ categorizedSizes = {} }) => {
    const { documentSize, imageSize, videoSize, audioSize } = categorizedSizes;

    const [user, setUser] = useState(null); 

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

    return (
        <React.Fragment>
            <div className='bg-white h-full flex'>
                <div className="border-l border-lightGrey h-screen"></div>
                <div className='py-16 px-8 w-full'>
                    <div>
                        
                        {user ? (
                            <div className='flex items-center'>
                                <img src={DP} alt="Profile" className='rounded-full w-12' />
                                <div className='pl-2 w-full flex justify-between'>
                                    <p className=' xl:text-xl font-medium'>{`${user.firstName} ${user.lastName}`}</p>
                                    <Ellipsis />
                                </div>
                            </div>
                        ) : (
                            <p className='text-center'>No user found.</p> 
                        )}
                    </div>

                    <div className='mt-10'>
                        <p className='text-xl font-medium mb-5'>File type</p>
                        <div className="flex flex-wrap justify-center w-full max-w-md mx-auto">
                            <div className="flex flex-col items-center justify-center w-1/2 p-6 border-b border-r border-gray-200">
                                <img src={doc} alt="Document" className="w-12 h-12" />
                                <p className="text-gray-700 text-base mt-2">Document</p>
                                <p className="text-gray-500 text-sm">{bytesToGB(documentSize)} GB</p>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/2 p-6 border-b border-gray-200">
                                <img src={video} alt="Video" className="w-12 h-12" />
                                <p className="text-gray-700 text-base mt-2">Video</p>
                                <p className="text-gray-500 text-sm">{bytesToGB(videoSize)} GB</p>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/2 p-6 border-r border-gray-200">
                                <img src={audio} alt="Audio" className="w-12 h-12" />
                                <p className="text-gray-700 text-base mt-2">Audio</p>
                                <p className="text-gray-500 text-sm">{bytesToGB(audioSize)} GB</p>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/2 p-6">
                                <img src={image} alt="Image" className="w-12 h-12" />
                                <p className="text-gray-700 text-base mt-2">Image</p>
                                <p className="text-gray-500 text-sm">{bytesToGB(imageSize)} GB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProfilebarComponent;
