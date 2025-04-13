import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect, useState } from 'react'
import useSocket from "../socket/socket"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserDateContext } from '../context/userContext';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';

const ChatPannel=()=>{
      const [messages,setMessages]=useState("")
      const {user} =useContext(UserDateContext)
         const [cookie,setCookies,removeCookies]=useCookies(["token"])
         const token=cookie["token"]
         const[FollowUser,setFollowuser]=useState([])
         const navigate=useNavigate()

      useEffect(()=>{
           const fetchChatsUser=async()=>{
            try{
                  const response=await API.get("/chats/allUser-chat",{
                    headers:{
                      Authorization:`Bearer ${token}`
                    }
                  })

              if(response.status===200){
                setFollowuser(response.data.userChat)
              }
            }
            catch(error){
              console.log(error)
            }
           }
           fetchChatsUser()
      },[])
         const handleChatsClick=(id)=>{
              navigate(`text/${id}`)
         }
           return(
            <div className='min-[768px]:grid-cols-[4fr_8fr]  h-[100vh] overflow-hidden pt-2 grid-cols-1 grid'>

                <div className='min-[768px]:w-[400px]  h-[100vh]    px-2 w-full'>
                <div className='flex'>
                <div className='cursor-pointer'><Link to="/index"><ArrowBackIcon/></Link></div>
                <div>sameer</div>
             </div>

             <div>
              
               <div className='flex  my-5 relative '><SearchIcon sx={{color:"gray"}} className='absolute top-2 left-3'/><input value={messages} name='sms' style={{border:"1px solid gray "}} onChange={(e)=>setMessages(e.target.value)} className='outline-none ps-[39px] h-[35px] rounded-[10px] w-full' type='search'placeholder='search' /></div>
             
                   
             </div>

             <div>
               <div className='flex justify-between'>
               <div>Messages</div>
               <div>Requests</div>
               </div>


             
             </div>

              <div className='mt-3  h-[480px] overflow-auto'>
              {
                FollowUser.length>0?
                 FollowUser.map((follower,i)=>{
                  return  <div key={i} className='flex my-3 cursor-pointer justify-between items-center'>
                  <div onClick={()=>handleChatsClick(follower._id)}  className='flex  gap-2 '>
                  <div className='h-[50px] overflow-hidden rounded-full relative w-[50px]'><img src={follower.profile} width="50" height="50" className='rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' /></div>
                  <div>
                  <div>{follower.fullname}</div>
                  <div className='text-[13px]'>sent you a message</div>
                  </div>

              </div>
              <div><CameraAltOutlinedIcon/></div>
                  
                  </div>
                 })
               
                :<div>No chats</div>
              }
                
              </div>

                
                </div>


                  <Outlet/>
                



            </div>
           )
}

export default ChatPannel

