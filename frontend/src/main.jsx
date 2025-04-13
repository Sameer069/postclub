
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'
import UserContext from './context/userContext.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"

createRoot(document.getElementById('root')).render(
     <Provider store={store}>
      <UserContext>
      <CookiesProvider>
         <App/>
      </CookiesProvider>
      </UserContext>
      </Provider>
      
)
