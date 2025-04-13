import IndexAsideComponent from "../component/indexPage";
import IndexPost from "../component/indexPost";
import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useScoket from "../socket/socket";

const IndexPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const lastPath = path[path.length - 1];
  const socket=useScoket()
   useEffect(()=>{
            if(!socket.connected){ socket.connect()}
              socket.on("connect",()=>{
               
              })
              
              return()=>{
                 
                 socket.off("connect");
                 socket.off("receive-message");
                 socket.disconnect();
              
              }
  
      },[socket])
  const component = useMemo(() => ({
    index: <IndexPost />,
    you: <Outlet />,
    create: <Outlet />,
    edit:<Outlet/>,
    search:<Outlet/>,
    settings:<Outlet/>,
    notification:<Outlet/>

    
  }),[lastPath]);

  return (
    <div className="grid   grid-cols-1 md:grid-cols-[2.7fr_5fr_4.3fr]">
      <div className="w-[300px] max-[767px]:w-full sticky top-0 z-10 bg-white">
        <IndexAsideComponent />
      </div>

      <div>
        {component[lastPath] || <IndexPost />}
      </div>

      <div className="md:block w-full hidden"></div>
    </div>
  );
};

export default IndexPage;
