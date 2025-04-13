import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext, useRef, useState } from 'react';
import { UserDateContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const EditProfile=()=>{
    const[cookie,setCookies,removeCookies]=useCookies(["token"])
    const token=cookie["token"]
    const navigate=useNavigate()
    const {user}=useContext(UserDateContext)
    const inputRef=useRef(null)
    const[inputValue,setInputvalue]=useState(user.fullname)
    const[inputValueBio,setInputvalueBio]=useState(user.Bio)
    const[isDisable,setDisable]=useState(true)
    const[profile,setProfile]=useState()
    const[preview,setPreview]=useState()
  
    const profileUpdateInputClick=()=>{
        inputRef.current.click()
      }
    const handleProfileUpdate=(e)=>{
          const file=e.target.files[0]
          if(!file) return setDisable(true)
            if(!file.type.startsWith("image/")) return alert("Only image file can upload")
            setPreview(URL.createObjectURL(file))
            setProfile(file)
            setDisable(false)
            

          
    }
     const handleEditUpdateClick=async()=>{
           
          const formData=new FormData()
          formData.append("fullname",inputValue)
          formData.append("Bio",inputValueBio)
          formData.append("profile",profile)
          
           
          try{
             const response=await API.post("/profile-update",formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
             })
             if(response.status===200){
                navigate("/index/you")
             }
          }
          catch(error){

          }
     }
     const handleFullnameChange=(e)=>{
        if(e.target.value===""){
          setDisable(true)
        }
        else{
            setDisable(false)
        }
        setInputvalue(e.target.value)
        
       
       
     }
     const handleBioChange=(e)=>{
        setInputvalueBio(e.target.value)
         if(inputValue===""){
            setDisable(true)
         }
         else{
            setDisable(false)
         }
     }
    return(
        <div className="h-[100vh] bg-white z-40 max-[767px]:w-full  w-[500px]  fixed top-0 "> 
           <div className='mt-2 px-2 flex justify-between'>
           <div> <Link to="/index/you" > <ArrowBackIcon /></Link></div>
           <div className={isDisable?"hidden":"block cursor-pointer"} onClick={handleEditUpdateClick}><CheckIcon/></div>
          
           </div>
           <div className='w-full max-[767px]:px-2'>
              <div className='flex justify-center flex-col h-[200px] items-center'>
                 <div className='w-[80px] h-[80px] relative overflow-hidden rounded-full'>
                 <img src={preview||user.profile} className='rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' width="100%" height="80" />
                 <input ref={inputRef}  type="file" className="hidden"  onChange={handleProfileUpdate} />
                 </div>
                 <div onClick={profileUpdateInputClick}><span className='text-blue-600'>change photo</span></div>
              </div>
              <div>
             <div><TextField className='w-full' label="username"  value={user.user_name} name='editUsername'/></div>
                  <div className='my-3'><TextField className='w-full' label="fullname" onChange={handleFullnameChange} value={inputValue} name='editFullname' /></div>
                  <div className='my-3'><TextField className='w-full' label="Bio" onChange={handleBioChange} value={inputValueBio} name='editBio' /></div>
                
              </div>
           </div>
        
        </div>
    )
}

export default EditProfile