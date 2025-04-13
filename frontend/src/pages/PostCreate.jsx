
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import upload from "../assets/upload.jpg"
import { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const PostCreate=()=>{
    const[preview,setPreview]=useState(upload)
    const[disable,setDisable]=useState(true)
    const [description,setDescription]=useState()
    const[file,setFile]=useState()
    const[cookies,setCookies,RemoveCookies]=useCookies(["token"])
    const inputRef=useRef(null)
    const navigate=useNavigate()
    const token=cookies["token"]
     const handleUploadClick=()=>{
        inputRef.current.click()
     
     }
     const handleChangeUpload=(e)=>{
         const file=e.target.files[0]
      
         if(!file)  
        {
            setDisable(true)
            return alert("select file")
        }
        if(!file.type.startsWith("image/")){
            return alert("Only image can select ")
        }
         setFile(file)
         setPreview(URL.createObjectURL(file))
         setDisable(false)
        
        
     }
     const handleCaptionChange=(e)=>{
         setDescription(e.target.value)
     }
     const handleShareClick=async()=>{
          if(!description) return alert("plz,Write a caption")
            setDisable(true)
          const formData=new FormData()
          formData.append("post",file)
          formData.append("caption",description)
          formData.append("foldername","post")
          try{
            const response=await API.post("user-post",formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
              })
            
              
            if(response.status===200){
                navigate("/index")
            }
          }
          catch(error){
            if(error.response.status===401){
                console.log(error)
                setDisable(true)
            }
          }
         
         
     }
    return (
        <div className=''>
           <div onClick={handleUploadClick} className="h-[300px]  ">
                <img src={preview} className="h-full w-full" />
                <input ref={inputRef} onChange={handleChangeUpload} type="file"   className="hidden" />
           </div>
          

           <div className='my-2'>
               <div>
                 <Textarea value={description} onChange={handleCaptionChange} placeholder='Write a caption' variant='plianed' size='lg' sx={{height:100,resize:"horizontal"}}/>
               </div>
           </div>
           <div className='mt-5'>
             
                <div className=''>
                   <Button onClick={handleShareClick}  className='w-full' variant='contained' disabled={disable} >Share</Button>
                </div>
           </div>
        
        </div>
    )
}
export default PostCreate