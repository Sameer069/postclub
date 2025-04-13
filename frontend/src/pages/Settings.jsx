import { useContext, useState } from "react"
import { UserDateContext } from "../context/userContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import Switch from '@mui/material/Switch';
import API from "../component/axiosConfig";

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Settings=()=>{
 const{user}=useContext(UserDateContext)
      const [toggle,setToggle]=useState(false)
      const[cookie,setCookies,removeCookies]=useCookies(["token"])
      const token=cookie["token"]
      const[checked,setCheked]=useState(user.isPrivate)
    const handleLogoutClick=()=>{
        removeCookies("token")

          
      }
const handleChekedChange=async(e)=>{
         setCheked(e.target.checked)

         const formData=new FormData()
         formData.append("isPrivate",e.target.checked)

         try{
            const response=await API.post("/switch-private",formData,{
               headers:{
                  Authorization:`Bearer ${token}`
               }
            })
            if(response.status===200){
             
            }
         }
         catch(error){

         }
          
        
       }

    return(
        <div className={`bg-white px-3 min-[769px]:w-[500px]  fixed  top-0 z-10 max-[768px]:w-full h-[100vh] `}>
        <div className="flex   mt-3 gap-5 items-center">
         <div className=""><Link to="/index/you"><ArrowBackIcon /></Link></div>
          <div>Settings & Privacy</div>
        </div>

            <div className="h-[80vh]">
            <div className="mt-3  h-[120px]">
            <div className="">how you use postclub</div>
            <div>

             <div className="flex items-center  justify-between">
             <div className="my-3">
               <BookmarkBorderIcon/>
               <span>saved</span>
             </div>
             <div>
                <KeyboardArrowRightIcon/>
             </div>
             </div>

             <div className="flex justify-between">
             <div>
               <FavoriteBorderIcon/>
               <span>Liked</span>
             </div>
             <div>
                <KeyboardArrowRightIcon/>
             </div>
             </div>

            </div>
        </div>
         <div>
            <div>Privacy&Security</div>
            <div className="mt-3 flex justify-between">
              <div>Account Private</div>
              <div><Switch {...label} checked={checked} onChange={handleChekedChange} /></div>
            </div>
         
         </div>
            
            </div>

        <div>
           <Button sx={{backgroundColor:"red",color:"white"}} onClick={handleLogoutClick} >Logout</Button>
           <div className="mt-2">Version-3.0.2</div>
        </div>


     </div>


   
    )
}

export default Settings