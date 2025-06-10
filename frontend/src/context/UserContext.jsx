import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()


const UserContext = ({ children }) => {

   const [user, setUser] = useState({
    email:'',
    fullName:{
        firstName:'',
        lastName:''
    }
   })

    return (
        <div>
            <UserDataContext.Provider value={[user, setUser]}>
                {children}
            </UserDataContext.Provider>Add commentMore actions
        </div>
    )
}

export default UserContext