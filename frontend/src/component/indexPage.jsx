
import MessageIcon from '@mui/icons-material/Message';
import { UserDateContext } from '../context/userContext';
import { useContext } from 'react';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';


const IndexAsideComponent=()=>{
   const {user}=useContext(UserDateContext)
   const value=useSelector(state=>state.user.toggle)

    return(
        <div className='md:ps-5 w-full md:border-r-2 md:border-stone-400 md:h-[100vh] sticky top-0'>
            <div className={`max-[767px]:flex max-[767px]:px-[15px]  items-center max-[767px]:${value==="profile"?"hidden":"block"} justify-between`}>
                <div>
                    <div><h1 className="text-[35px] max-[767px]:text-[35px] font-[Grand_Hotel]">Postclub</h1></div>
                </div>
                <div className='md:hidden block relative'>
                <span className='bg-red-500 rounded-full w-[20px] text-center h-[20px] absolute  text-white text-[13px] inline-block  left-7 top-[-7px]'>{user.followRequest.length}</span>
                      <Link to="/index/notification" className='cursor-pointer '><FavoriteBorderIcon className='mx-3' />  </Link>
                       <Link to="/chats"><MessageIcon/></Link>
                </div>
            </div>
           <Footer/>
      
        
        </div>
    )
}

export default IndexAsideComponent