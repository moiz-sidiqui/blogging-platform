import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const GlobalStateContext = createContext();

// Create the context provider
export const GlobalStateProvider = ({ children }) => {
    const [currentUsername, setCurrentUsername] = useState(
        localStorage.getItem('currentUsername') || ''
    );
    const [currentProfileImage, setCurrentProfileImage] = useState(
        localStorage.getItem('currentProfileImage')
    );
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('currentUsername');
        const storedProfileImage = localStorage.getItem('currentProfileImage');

        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
            setCurrentUsername(storedUsername);
            setCurrentProfileImage(storedProfileImage);
            // You may also load other user data from localStorage here
        }
    }, []);

    const updateAuthStatus = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem('isLoggedIn', status);
    };

    const updateProfileImage = (imageURL) => {
        setCurrentProfileImage(imageURL);
        localStorage.setItem('currentProfileImage', imageURL);
    };

    const updateUsername = (username) => {
        setCurrentUsername(username);
        localStorage.setItem('currentUsername', username);
    };

    return (
        <GlobalStateContext.Provider value={{
            currentUsername,
            setCurrentUsername: updateUsername,
            currentProfileImage,
            setCurrentProfileImage: updateProfileImage,
            isLoggedIn,
            updateAuthStatus
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
