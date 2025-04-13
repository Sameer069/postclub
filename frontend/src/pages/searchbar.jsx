
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserDateContext } from '../context/userContext';
import CloseIcon from '@mui/icons-material/Close';
import API from '../component/axiosConfig';
import { useCookies } from 'react-cookie';

const SearchBar=()=>{

     const[cookie,setCookies,removeCookies]=useCookies(["token"])  
     const token=cookie["token"]
    const{user}=useContext(UserDateContext)
    const[hide,setHide]=useState(false)
    const[query,setQuery]=useState("")
    const[userSuggestion,setUserSuggestion]=useState([])
    const[debouncing,setDebouncing]=useState("")
    const[suggest,setSuggest]=useState(false)
    const navigate=useNavigate()
    const[userHistory,setUserHistory]=useState(user.history)

       useEffect(()=>{
          const handler=setTimeout(()=>{
            setDebouncing(query)
          },700)

          return ()=>{
            clearTimeout(handler)
          }
       },[query])
        useEffect(()=>{
            const fetchUser=async()=>{
                 const response=await API.post("/search-user",{"user":debouncing},{
                  headers:{
                    Authorization:`Bearer ${token}`
                  }
                 })
               if(response.status===200){
                     setUserSuggestion(response.data)
               }
            }

             if(debouncing){
                 fetchUser()
             }
             else{
                 
             }
        },[debouncing])
    const handleSearchChange=(e)=>{
           if(e.target.value===""){ 
              setHide(false)
              setSuggest(false)
               setQuery("")
           }
           else{
               setSuggest(true)
               setQuery(e.target.value)
               setHide(true)
              
           }
    }
    const handleUserClick=(id)=>{
                  if(user._id===id){
                     navigate("/index/you")
                  }
                   else{
                     navigate(`/user/${id}`)
                   }
              
    }
    const handleHistoryDeleteClick=async(id)=>{ 
               try{
                    const response=await API.delete(`/deleteHistory/${id}`,{
                     headers:{
                        Authorization:`Bearer ${token}`
                     }

                    })

                   if(response.status===200){
                     const UpdateHistory=userHistory.filter(Upuser=>Upuser._id!==id)
                     setUserHistory(UpdateHistory)
                   }

               }
               catch(error){
                  console.log(error)
               }
           
    }
      return(
        <div className='h-[90vh] fixed top-0 z-20 min-[769px]:w-[400px]  bg-white w-full'>
           <div className='flex mt-3 items-center gap-2'>
                <div><Link to="/index"><ArrowBackIcon/></Link></div>
                <div className='flex gap-2 items-center'>
                     <div><input type='search' onChange={handleSearchChange} onKeyUp={()=>{}} value={query} style={{border:"1px solid gray"}} className=' px-3 outline-none w-[320px]  rounded-[10px] h-[35px] ' placeholder='search here' /></div>
                     <div><SearchIcon/></div>
                </div>
           </div>

              <div>
                 {
                  suggest? <div className='mt-7 ps-2'>
                     {
                      userSuggestion.length>0?
                      <div>
                         {
                          userSuggestion.map(user=>{
                            return <div onClick={()=>handleUserClick(user._id)} key={user._id} className='my-4'>
                               <div className='flex gap-3 items-center'>
                                 <div className='w-[50px] relative overflow-hidden rounded-full h-[50px]'><img src={user.profile} width="100%" height="50" className='rounded-full absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 ' /></div>
                                   <div>
                                   <div className=''>{user.user_name}</div>
                                   <div className='text-[12px]'>{user.fullname}</div>
                                   
                                   </div>
                               </div> 
                                
                            </div>
                          })
                         }
                      </div>:<div>User Not Found</div> 
                     }
                  </div>:
                  <div>
           
                
                  {
  
                     userHistory.length>0?
                     userHistory.map(users=>{
                      return <div key={users._id}  className='flex mt-7 justify-between items-center px-2'>
               
                 <div  onClick={()=>handleUserClick(users._id)}  className='flex gap-2'>
                 <div>
                   <img src={users.profile} className='w-[50px] rounded-full h-[50px]' />
                 </div>
                <div>
                    <div>{users.user_name}</div>
                    <div>{users.fullname}</div>
  
                </div>
           </div>
  
                  <div onClick={()=>handleHistoryDeleteClick(users._id)}><CloseIcon className='cursor-pointer'></CloseIcon></div>
          </div>
                   })
  
                   :
                  
                   <div className={`mt-7 ps-2 ${hide?"hidden":"block"} `}>No History</div>
                   
                  
                      
                  }
              </div>
                 }
              </div>
        
        </div>
      )
}
export default SearchBar