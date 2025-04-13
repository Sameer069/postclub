import { useContext, useState } from "react"
import { UserDateContext } from "../context/userContext"
import DehazeIcon from '@mui/icons-material/Dehaze';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppsIcon from '@mui/icons-material/Apps';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { Link, useNavigate } from "react-router-dom";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AddIcon from '@mui/icons-material/Add';



const Userprofile=()=>{
      const{user}=useContext(UserDateContext)
       const navigate=useNavigate()

       const handleSettingClick=()=>{
            navigate("settings")
       }
       const handleEditClick=()=>{
         navigate("edit")
       }
 
      
    return (
        <div className="max-[767px]:px-2 bg-white pt-3 px-3 min-[769px]:w-[500px]   absolute  top-0 z-10 max-[768px]:w-full h-[fit]">
          
          <div className="flex min-[768px]:hidden sticky h-[40px] top-0 bg-white z-10 justify-between  ">

           <div className="text-[15px] flex items-center"><span className="w-[70px] inline-block text-nowrap text-ellipsis overflow-hidden">{user.user_name}</span><KeyboardArrowDownIcon/></div>
           <div className=" ">
             <div className="cursor-pointer" onClick={handleSettingClick}> <DehazeIcon   /></div>
     
           </div>

          </div>
          <div className="mt-4  flex gap-5 ">
           <div className="w-[80px] h-[80px] relative">
           <img  src={user.profile} className='rounded-[50%] absolute  top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 ' width="100%"/>
           <span className="absolute right-0 bottom-0 bg-black text-white rounded-full"><AddIcon/></span>
           </div>
          
           <div className="">
              <div className="mb-3"><span>{user.fullname}</span></div>
              <div className="flex max-[767px]:text-[14px] gap-6">
              <div className="">
              <div>{user.posts.length}</div>
              <div>Posts</div>
           </div>
           <div>
              <div>{user.followers.length}</div>
              <div>followers</div>
           </div>
           <div>
              <div>{user.following.length}</div>
              <div>following</div>
           </div>
              
              </div>
           </div>
           
          </div>
                <div className="w-[150px] mt-2 max-h-[100px] min-h-[25px] overflow-hidden text-[13px] ">
                  <p>
                     {
                        user.Bio
                     }
                  </p>
              </div>

              <div className="flex gap-4 mt-3 ">
                  <div onClick={handleEditClick} ><button  style={{borderColor:"rgb(48, 35, 35)",border:"1px solid black"}} className="outline-none text-center cursor-pointer w-[150px] rounded-[10px]">Edit profile</button></div>
                  <div><button style={{borderColor:"rgb(48, 35, 35)",border:"1px solid black"}} className="border-2 outline-none cursor-pointer text-center w-[150px] rounded-[10px]" >Share profile</button></div>
              
              
              </div>

              <div className="flex justify-around mt-4">
                <div className="text-center w-[100px]"><AppsIcon /></div>
                <div className="w-[100px] text-center"><SlideshowIcon/></div>
                <div className="w-[100px] text-center"><PermContactCalendarOutlinedIcon/></div>
              </div>

              <div className="mt-4 flex overflow-auto h-fit pb-10  flex-wrap gap-1">
                  {
                     user.posts.length>0?
                     user.posts.map((post,i)=>{
                        return <div  key={i} className="max-[767px]:w-[110px] w-[200px] h-[200px] max-[767px]:h-[120px]">
                          <img src={post.post_url} className="w-full h-full" />
                        </div>
                     })
                     :<div className="h-[300px] overflow-auto w-full flex justify-center items-center  ">
                         <div className="text-center">
                         <div className="h-[100px] w-[100px] border-2 rounded-full flex items-center justify-center"><CameraAltOutlinedIcon sx={{fontSize:50}}/></div>
                         <div className="text-[20px]"></div>
                         </div>
                     </div>
                  }
              </div>

            

           
        </div>
    )
}
export default Userprofile