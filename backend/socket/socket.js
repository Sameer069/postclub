const {Server} =require("socket.io")
  let io;
  let socketId={}
  const setSocket=(serevr)=>{
     io=new Server(serevr,{
        cors:{
           origin:"http://localhost:4000",
           credentials:true
           
          }
     })
     
     io.on("connection",(socket)=>{ 
       
        const userid=socket.handshake.query.userId  
        socketId[userid]=socket.id
         socket.on("disconnect",()=>{
            delete socketId[userid]
          
        })
     })

    
  }

  function getIO(){
    if(!io) throw new Error("Socket not initialized")
        return io;
  }
  function getsocketId(socketid){
     return socketId[socketid]
  }
module.exports={setSocket,getIO,getsocketId}
