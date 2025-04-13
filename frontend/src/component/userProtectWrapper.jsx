
import { useContext, useEffect, useState } from "react"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"
import API from "./axiosConfig"
import { UserDateContext } from "../context/userContext"

const UserProtectWrapper=({children})=>{
    const[cookies,setCookies,RemoveCookies]=useCookies(["token"])
    const[isloading,setloading]=useState(true)
    const navigate=useNavigate()
    const token=cookies["token"]
    const{user,setUser}=useContext(UserDateContext)
   
   
    useEffect(()=>{
        if(!token){
            navigate("/")
         } 
         const fetchUser=async()=>{
            try{
                const response=await  API.get("/user/prfile",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                 })
              if(response.status===200){
                setUser(response.data)
                setloading(false)
              }
            }
            catch(error){
                RemoveCookies("token")
                navigate("/")
                if(error.response.status===400){
                    RemoveCookies("token")
                    navigate("/")
                  }
            }
          
         }

         fetchUser()     
    },[navigate,token])
   
    if(isloading){
        return <div>Loading...</div>
    }

    return (
        <div>
           {children}
        </div>
    )

    
    

}

export default UserProtectWrapper;