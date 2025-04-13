
import { useContext, useEffect, useMemo } from "react"
import { io } from "socket.io-client"
import { UserDateContext } from "../context/userContext"
import { useCookies } from "react-cookie"
 const useScoket=()=>{
      const [cookie,setCookies,RemoveCookies]=useCookies("token")
     
     const {user} =useContext(UserDateContext)
    const socket= useMemo(()=>{
        if(!user._id){ 
           return RemoveCookies("token")
        }
       return io("https://postclub-b28q.onrender.com",{
            autoConnect:false,
            withCredentials:true,
            query:{userId:user._id}
        
        })
    },[])

     useEffect(()=>{
                if(!socket.connected){ socket.connect()}
                  socket.on("connect",()=>{
                  
                  })
                  
                  return()=>{
                     
                     socket.off("connect");
                     socket.off("receive-message");
                     socket.disconnect();
                  
                  }
      
          },[socket])
    return socket
 }

export default useScoket
