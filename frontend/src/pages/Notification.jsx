import { useContext, useEffect, useState } from "react";
import { UserDateContext } from "../context/userContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import API from "../component/axiosConfig";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


const Notification=()=>{

          const {user}=useContext(UserDateContext)
          const[cookie,setCookies,removeCookies]=useCookies(["token"])
          const token=cookie["token"]
          const[followerslist,setFollowerslist]=useState(user.followRequest)
          const navigate=useNavigate()


          const handleAcceptClick=async(id)=>{
                try{
                     const response=await API.post("/request-followlist",{id:id},{
                      headers:{
                        Authorization:`Bearer ${token}`
                      }
                     })
                  if(response.status==200){
              
                        const updateFollowers=followerslist.filter(user=>user._id.toString()!==id.toString())
                        setFollowerslist(updateFollowers)
                  }
               
                }
                catch(error){
                       console.log(error)


                }


          }
          const handleDeclineClick=()=>{

          }
           const handleProfileClick=(id)=>{
                  navigate(`/user/${id}`)
 
           }
      
         return(
            <div className="absolute min-[769px]:w-[500px] px-2 w-full top-0 bg-white z-20">
              <div className="flex items-center h-[50px]">
                  <div><Link to="/index"><ArrowBackIcon/></Link></div>
                   <div className="ms-3">Notification</div>
              </div>

              <div className="mt-4 ">
                  {
                     followerslist.length>0?
                      followerslist.map(user=>{
                        return  <div  key={user._id} className="flex justify-between items-center gap-1.5">
                        <div onClick={()=>handleProfileClick(user._id)} className="flex items-center gap-3">
                        <div className="w-[50px] overflow-hidden relative rounded-full h-[50px]"><img width="100%" height="50px" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " src={user.profile}/  ></div>
                        <div className="w-[150px]">
                            <span className="me-2">{user.user_name}</span>
                            <span>requested to follow you</span>
                        </div>
                        
                        </div>
                        <div className="flex gap-3 items-center">
                           <div onClick={()=>handleDeclineClick(user._id)} className="cursor-pointer"><ClearIcon sx={{color:"red"}} /></div>
                           <div onClick={()=>handleAcceptClick(user._id)} className="cursor-pointer"><CheckIcon sx={{color:"green"}} /></div>
                        </div>
                     </div>
                      })
                    :
                  <div>
                      No user requested
                  </div>
                  }
              
              </div>

            
            
            </div>
         )
}

export default Notification