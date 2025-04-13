
import './App.css'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignup'
import IndexPage from './pages'
import UserProtectWrapper from './component/userProtectWrapper'
import ContextWrapper from './context/userContext'
import Userprofile from './pages/UserProfile'
import PostCreate from './pages/PostCreate'
import EditProfile from './pages/Edit-profile'
import SearchBar from './pages/searchbar'
import SingleUserAccount from './pages/SingleUser'
import Settings from './pages/Settings'
import Notification from './pages/Notification'
import ChatPannel from './pages/ChatsPannel'
import SingeleChatPannel from './pages/SingleChatPannel'

function App() {

    
  return (
    <div className='font-[Poppins]'>
    
    <BrowserRouter>
    
          <Routes>
             <Route path='*' element={<div>Not Found</div>}/>
             <Route path='/' element={<UserLogin/>} ></Route>
             <Route path='/signup' element={<UserSignUp/>}></Route>
             <Route path='/user/:id' element={
              <UserProtectWrapper><SingleUserAccount/></UserProtectWrapper>
            } />
             <Route path='/index' element={
              <UserProtectWrapper>
              <IndexPage/>
              </UserProtectWrapper>
              
             }>
             <Route path='you'element={
              <UserProtectWrapper>
                <Userprofile/>
              </UserProtectWrapper>
             } />

              <Route path='you/settings' element={
                <UserProtectWrapper><Settings/></UserProtectWrapper>
              }/>
              <Route path='notification' element={

                <UserProtectWrapper><Notification/></UserProtectWrapper>
              }/>
            
             <Route path='search'element={
              <UserProtectWrapper>
                <SearchBar/>
              </UserProtectWrapper>
             } />
             <Route path='create'element={
              <UserProtectWrapper>
                <PostCreate/>
              </UserProtectWrapper>
             } />
              <Route path='you/edit' element={
                <UserProtectWrapper>
                
                <EditProfile/>
                </UserProtectWrapper>
              
              } />
             
          
             
             </Route>
             <Route path='/chats' element={
              <UserProtectWrapper>
              <ChatPannel/>
              </UserProtectWrapper>

            } >

               <Route path='text/:id' element={
                <UserProtectWrapper><SingeleChatPannel/></UserProtectWrapper>
               }/>
            </Route>
             
          </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App
