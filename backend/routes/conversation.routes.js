const express=require("express")
const UserAuth = require("../middleware/userAuth")
const routes=express.Router()
const chatsRoutes=require("../controller/chats.controller")


routes.get("/user-conversation/:id",UserAuth,chatsRoutes.getConversation)
routes.get("/allUser-chat",UserAuth,chatsRoutes.getAllMessageUser)
routes.get("/getchatuser/:id",UserAuth,chatsRoutes.chatUser)
routes.post("/sendMessage",UserAuth,chatsRoutes.sendMessage)


module.exports=routes