import { createContext, useState } from "react";


export const UserDateContext=createContext()

 const UserContext=({children})=>{
    const[user,setUser]=useState({})
    const [toggle,setToggle]=useState("home")

   return(
      <div>
          <UserDateContext.Provider value={{user,setUser,toggle,setToggle}}>
           {children}
          </UserDateContext.Provider>
      </div>
   )
}
 
export default UserContext