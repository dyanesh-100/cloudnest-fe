import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAccountVerification = () => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const verifyGoogleAccount = async () => {
            try {
                const response = await axiosInstance.get('/verify');
                
                if (response.status === 200) {
                    setIsUserLoggedIn(true);
                    document.cookie = `userProfile=${JSON.stringify(response.data.data)}; path=/;`;
                    navigate('/cloudnest/home');
                    toast.success('Logged in successfully');
                }
            } 

            catch (error) {
                console.error("Error during Google account verification:", error);
                
                toast.error('Failed to verify Google account');
            }
        };

        verifyGoogleAccount();
    }, [navigate]);

    return (
        <div>
            
        </div>
    );
};

export default GoogleAccountVerification;
