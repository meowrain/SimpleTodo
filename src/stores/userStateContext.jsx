import React, { createContext, useState } from 'react'

export const UserStateContext = createContext();

export const UserStateProvider = ({ children }) => {
    const [needUpdateUserInfo, setNeedUpdateUserInfo] = useState(false);

    return (
        <UserStateContext.Provider value={{ needUpdateUserInfo, setNeedUpdateUserInfo }}>
            {children}
        </UserStateContext.Provider>
    );
};
