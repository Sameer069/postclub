import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MessageIcon from '@mui/icons-material/Message';
import { UserDateContext } from '../context/userContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer=()=>{
    const {user,toggle} =useContext(UserDateContext)
    const navigate=useNavigate()
    
     const handleHomeClick=()=>{
       
       
         navigate("/index")
     }
     const handleProfileClick=()=>{
        
       navigate("you")
        
     }
     const handleCreateClick=()=>{
      
        navigate("create")
     }
  return(
    <div>
       
  <div className='md:h-[90vh] flex flex-col z-50 justify-between border-stone-100 max-[767px]:border-t-2 max-[767px]:fixed w-full bottom-0 left-0 '>
  <div className='flex md:flex-col max-[767px]:h-[40px] bg-white z-20 pt-1.5 max-[767px]:px-[10px] max-[767px]:w-full md:h-[400px] justify-around'>
      <div   className='md:flex items-center gap-3'>
         <div className='cursor-pointer'><HomeIcon  onClick={handleHomeClick} sx={{fontSize:20}}/></div>
         <div className='max-[767px]:hidden'>Home</div>
      </div>
      <div className='md:flex items-center gap-3'>
          <div > <Link to="search"><SearchIcon className='cursor-pointer' sx={{fontSize:20}}/></Link></div>
          <div className='max-[767px]:hidden'>Search</div>
      </div>

      <div className='md:block hidden '>
          <div className='md:flex items-center gap-3' >
          <div><ExploreIcon className='cursor-pointer' sx={{fontSize:20}}/></div>
          <div>Explore</div>
          </div>
      </div>
      <div className='md:block hidden'>
          <div className='md:flex items-center gap-3'>
          <div><Link to="/chats"><MessageIcon className='cursor-pointer' sx={{fontSize:20}}/></Link></div>
          <div className='max-[767px]:hidden'>Messages</div>
          </div>
      </div>
      <div className='md:flex items-center gap-3'>
          <div onClick={handleCreateClick}><AddIcon className='cursor-pointer' sx={{fontSize:20}}></AddIcon></div>
          <div className='max-[767px]:hidden'>Create</div>
      </div>
      <div className='md:flex items-center gap-3'>
          <div className='cursor-pointer'><SlideshowIcon sx={{fontSize:20}}/></div>
          <div className='max-[767px]:hidden' >Reels</div>
         
      </div>
      <div className='md:flex items-center gap-3'>
           <div className='w-[30px] h-[30px]'>
           <div onClick={handleProfileClick}  className='w-full relative h-full cursor-pointer rounded-full overflow-hidden'><img src={user.profile} className='rounded-[50%] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' width="100%" height="30" /></div>
          
           </div>
           <div className='max-[767px]:hidden'>Profile</div>
      </div>
  </div>

  <div  className='md:block hidden'>
     <div className='md:flex items-center gap-3'>
     <div >
        <Link to="you/settings"> <DehazeIcon></DehazeIcon></Link>
      </div>
      <div>More</div>
     </div>
  </div>
  </div>
  </div>
  )
    
}
export default Footer