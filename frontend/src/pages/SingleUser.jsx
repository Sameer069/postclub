
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsIcon from '@mui/icons-material/Apps';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserDateContext } from '../context/userContext';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';


const SingleUserAccount=()=>{
      const {user}=useContext(UserDateContext)
      const params=useParams()
      const[cookie,setCookies,removeCookies]=useCookies(["token"])
      const token=cookie["token"]
      const[userData,setUserData]=useState()
      const[isFollowing,setFollowing]=useState(false)
      const[isDisable,setDisable]=useState(false)
      const navigate=useNavigate()
  
   useEffect(()=>{
      const fetchUser=async()=>{
               try{
                const response=await API.get(`/single-user/${params.id}`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
                })
      
              if(response.status===200){
               setUserData(response.data.user)
               setFollowing(true)
               
              }
              else{

               setUserData(response.data.user)
         
              }
               
            }
        catch(error)
            {
              console.log(error)
             }
         }
       fetchUser()
       const CheckFollwers=async()=>{
                    try{
                     const response=await API.get(`/follow-checkers/${params.id}`,{
                        headers:{
                           Authorization:`Bearer ${token}`
                        }
                     })

                     if(response.status===200){
                         setFollowing(true)
                         setDisable(false)
                     }
                     else{
                        setFollowing(false)


                     }
                    }
                    catch(error){

                    }
       }
       CheckFollwers()
      
   },[params.id])


   const handleFollowClick=async(id)=>{
              const formData=new FormData()
              formData.append("userid",id)
            try{
              const response=await API.post("/follow-request",formData,{
               headers:
               {
                  Authorization:`Bearer ${token}`
               }
              })
              
            
            }
            catch(error){
             console.log(error)
            }
         
      }

      const handleSmsclick=(id)=>{
            navigate(`/chats/text/${id}`)
      }

    return(
        <div className="">
          
        {
         userData? (
            <>
            <div className="flex z-10 bg-white   px-2 sticky top-1 justify-between h-[60px] items-center   border-b-2 border-stone-100  " >
            <div>
              <Link to="/index">  <ArrowBackIcon/></Link>
             <span className='ps-3'>{userData.user_name}</span>
            </div>
            <div>
               <MoreVertIcon/>
            </div>
           
       </div>
         
       <div className="mt-4  px-2     flex gap-5 ">
        <div className="w-[80px] h-[80px] relative">
        <img  src={userData.profile} className='rounded-[50%] absolute  top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 ' width="100%"/>
     
        </div>
       
        <div className="">
           <div className="mb-3"><span>{userData.fullname}</span></div>
           <div className="flex max-[767px]:text-[14px] gap-6">
           <div className="">
           <div>{userData.posts.length}</div>
           <div>Posts</div>
        </div>
        <div>
           <div>{userData.followers.length}</div>
           <div>followers</div>
        </div>
        <div>
           <div>{userData.following.length}</div>
           <div>following</div>
        </div>
           
           </div>
        </div>
        
       </div>
             <div className="w-[150px] px-2 mt-2 max-h-[100px] min-h-[25px] overflow-hidden text-[13px] ">
               <p>
                  {
                     userData.Bio
                  }
               </p>
           </div>

           <div className="flex  px-2 gap-4 mt-3 ">
               <div className={isFollowing===true?"":"w-full"}><Button onClick={()=>handleFollowClick(userData._id)}  disabled={isDisable} sx={{color:isFollowing?"black":"white",backgroundColor:isFollowing?"":"blue",borderColor:"rgb(48, 35, 35)",border:isFollowing?"1px solid black":""}}  className={`${isFollowing?"w-[100px] ":"w-full bg-blue-700 text-white"}  outline-none text-center cursor-pointer   rounded-[10px]`}>{isFollowing ?"following":"follow"}</Button></div>
               <div className={isFollowing===true?"block":"hidden"}><Button  onClick={()=>handleSmsclick(userData._id)} sx={{color:"black",borderColor:"rgb(48, 35, 35)",border:"1px solid black"}}  className="border-2 outline-none cursor-pointer text-center w-[100px] rounded-[10px]" >Message</Button></div>
               <div className={isFollowing===true?"block":"hidden"}><Button sx={{color:"black",borderColor:"rgb(48, 35, 35)",border:"1px solid black"}} className="border-2 outline-none cursor-pointer text-center w-[100px] rounded-[10px]" >Email</Button></div>
         
           
           
           </div>

           <div className="flex justify-around min-[769px]:mt-10 px-2 mt-4">
             <div className="text-center w-[100px]"><AppsIcon /></div>
             <div className="w-[100px] text-center"><SlideshowIcon/></div>
             <div className="w-[100px] text-center"><PermContactCalendarOutlinedIcon/></div>
           </div>
           
            
             <div>
               
                 {
                    userData.isPrivate===true&&isFollowing===false?<div className='h-[300px] flex justify-center items-center'>
                  
                       <div className='flex flex-col items-center ' >
                       
                           <div className='w-[70px] h-[70px] border-2 rounded-full flex justify-center items-center'><LockIcon/></div>
                           <div>Private Account</div>
                       </div>
                     
                  
               </div>:
                  <div className="mt-4 flex flex-wrap px-2  gap-1">
                {
               userData.posts.length>0?
               userData.posts.map(post=>{
               return  <div  key={post._id} className="max-[767px]:w-[120px] w-[200px] h-[200px] max-[767px]:h-[120px]">
               <img src={post.post_url} className="w-full h-full" />
             </div>
             })
           :<div className="h-[300px] w-full flex justify-center items-center  ">
          <div className="text-center">
          <div className="h-[100px] w-[100px] border-2 rounded-full flex items-center justify-center"><CameraAltOutlinedIcon sx={{fontSize:50}}/></div>
          <div className="text-[20px]">No post yet</div>
          </div>
         </div>
          }
      
                
                  
               
           </div>
                 }
             </div> 
           
            </>
         ):<div>Loading...</div>
        }

          
    
         
      </div>
    )
}

export default SingleUserAccount;