require ("dotenv").config()
const exprees=require("express")
const app=exprees()
const cors=require("cors")
const userRoutes=require("./routes/userRoutes")
const chatsRoutes=require("./routes/conversation.routes")
const commentsRoutes=require("./routes/comments.routes")
const MongoDBConnection=require("./config/db")
const cookieParser=require("cookie-parser")
const PORT=process.env.PORT||4004
const http=require("http")
const {setSocket}=require("./socket/socket")


const server=http.createServer(app)
MongoDBConnection.DatabaseConnection()

app.use(exprees.urlencoded({extended:true}))
app.use(exprees.json())
app.use(exprees.text())
app.use(cookieParser())
app.use(cors(
   {
      origin:"https://postclub-1.onrender.com",
      credentials:true  
   }
))
 setSocket(server)


app.use("/",userRoutes) 
app.use("/chats",chatsRoutes)
app.use("/comments",commentsRoutes)
server.listen(PORT,()=>console.log("Server Started"))

 
