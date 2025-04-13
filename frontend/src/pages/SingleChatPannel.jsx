import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import useScoket from '../socket/socket';
import { UserDateContext } from '../context/userContext';
import { useContext, useEffect, useRef, useState } from 'react';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';
const SingeleChatPannel=()=>{
           const {user} =useContext(UserDateContext)
           const [cookie,setCookies,removeCookies]=useCookies(["token"])
           const token=cookie["token"]
          const socket=useScoket()
          const [message,setMessages]=useState()
          const[result,setResult]=useState([])
          const params=useParams()
          const[messageUser,setMessageUser]=useState()
          const divRef=useRef(null)
         
        

          useEffect(()=>{
            const fetchUser=async()=>{
              try{
                   const response=await API.get(`/chats/getchatuser/${params.id}`,
                     {
                       headers:{
                         Authorization:`Bearer ${token}`
                       }
                     }
                   ) 

                   if(response.status===200){
                     setMessageUser(response.data)

                   }
                 
              }
              catch(error){
                 console.log(error)
                 removeCookies("token")
              }

     }
     fetchUser()

          },[params])
           useEffect(()=>{
            const fetchChatsUser=async()=>{
              try{
        
                 const response=await API.get(`/chats/user-conversation/${params.id}`,{
                   headers:{
                     Authorization:`Bearer ${token}`
                   }
                   
                 
                 })
                if(response.status===200){
                  setResult(response.data.messages)
                }
               
                
              }
               
        
              catch(error){
              removeCookies("token")
               console.log(error)
              }
           }
           fetchChatsUser()
           },[params])
        useEffect(()=>{
                 if(!socket) return null
                   socket.on("recive-message",(data)=>{
                    setResult((pre)=>[...pre,data])
                    if(divRef.current){
                      divRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                  
                })
                
                return()=>{

                   socket.off("recive-message");
                   
                
                }

    
        },[socket])
       const handleTextSubmit=async(e)=>{
           e.preventDefault()
              if(message===""){
                return null
              }
              const userchats={
                message:message,
                ReciverId:params.id
              }
              try{
                const response =await API.post("/chats/sendMessage",userchats,{
                  headers:{
                    Authorization:`Bearer ${token}`
                  }
                })
                setMessages("")
                
              }  
              catch(err){
                console.log(err) 
              }
          
       }
      

      return(
        <div className=' max-[767px]:absolute max-[767px]:h-[100vh]   top-0  w-full bg-white '>
            
          {
            messageUser?
            <div className=''>
          
            <div className='flex bg-white sticky top-0 px-2  h-[60px]  items-center shadow-sm justify-between mt-2'>
  
            <div className='flex items-center gap-3'>
            <div className='min-[769px]:hidden'><Link to="/chats"><ArrowBackIcon></ArrowBackIcon></Link></div>
                 <div className='flex gap-2'>
                 <div className='w-[35px] h-[35px] rounded-full overflow-hidden relative'><img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' src={messageUser.profile}/></div>
                   <div>
                   <div className='text-[14px] w-[100px] overflow-hidden text-nowrap font-bold text-ellipsis '>{messageUser.fullname}</div>
                   <div className='text-[12px] w-[100px] overflow-hidden text-nowrap text-ellipsis '>{messageUser.user_name}</div>
                   </div>
                 </div>
            </div>
  
            <div  className='flex gap-2'  >
               <div><PhoneOutlinedIcon sx={{fontSize:30}}/></div>
               <div><VideocamOutlinedIcon sx={{fontSize:30}}/></div>
            
            </div>
         </div>
  
          <div className='mt-3 min-[769px]:pb-6 h-[550px] overflow-auto  px-2'>
              {   result.length>0?
                  result.map((sms,i)=>{
                       const isSenderid=sms.SenderId===user._id
                      return <div ref={divRef}  key={i} className={`flex mb-3 ${isSenderid?"justify-end":"justify-start"}`}>
                      <div className={`bg-stone-300  py-3  ${isSenderid?"rounded-tr-[10px] rounded-l-[10px] ":"rounded-tl-[10px] rounded-r-[10px]"}   px-3 w-[200px] flex items-center`}><div className='text-justify'>{sms.message}</div></div>
                      </div>
                  })
                  :<div className='text-center text-[15px]'>
                    Start Conversation😊
                  </div>
              }
             
             
            
          </div>
  
  
  
         <div className='w-full sticky bottom-0   min-[769px]:w-full  px-2'>
           <div className='w-full  relative'>
             <form className=''  onSubmit={handleTextSubmit}>
             <CameraAltOutlinedIcon className='absolute top-3.5 left-2' />
             <textarea onKeyDown={(e)=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(); handleTextSubmit(e) }}}  value={message} onChange={(e)=>setMessages(e.target.value)}  className='w-full pt-3 outline-none  bg-stone-200 resize-none text-wrap px-9 rounded-[15px]' type='text'   placeholder='Messages..'/>
              <button  type='submit' className='absolute right-3 top-3.5'> <SendIcon /></button>
             </form>
  
           </div>
         </div>
  
  
  
            </div>
            :<div>Loading</div>
          }

        </div>
      )
}

export default SingeleChatPannel