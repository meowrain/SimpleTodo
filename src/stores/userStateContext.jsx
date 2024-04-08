import React, { createContext, useState } from 'react'
import { loadLoginState, saveLoginState,saveLogoutState } from '../utils/handleLoginState';

export const UserStateContext = createContext();

export const UserStateProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkLoginStatus = async () => {
        const loggedIn = await loadLoginState();
        console.log('====================================');
        console.log("loaded login state:",loggedIn);
        console.log('====================================');
        // setIsLoggedIn(loggedIn)
    };
    
    const login = async() => {
        await saveLoginState();
        setIsLoggedIn(true);
    };

    // 登出的函数
    const logout = async () => {
        await saveLogoutState();
        setIsLoggedIn(false);
    };
    React.useEffect(() => {
        checkLoginStatus();
    }, []);
    const [needUpdateUserInfo, setNeedUpdateUserInfo] = useState(false);

    return (
        <UserStateContext.Provider value={{ needUpdateUserInfo, setNeedUpdateUserInfo,isLoggedIn,login,logout }}>
            {children}
        </UserStateContext.Provider>
    );
};
