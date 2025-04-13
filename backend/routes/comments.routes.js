const express=require("express")
const UserAuth = require("../middleware/userAuth")
const routes=express.Router()
const commentController=require("../controller/comments.controller")

routes.post("/send-comments",UserAuth,commentController.sendComment)
routes.post("/getAllcomments",UserAuth,commentController.getComments)

module.exports=routes