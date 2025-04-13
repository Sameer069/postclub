const exprees=require("express")
const routes=exprees.Router()
const userRoutes=require("../controller/userController")
const UserAuth=require("../middleware/userAuth")
const upload=require("../middleware/upload")
const profile=require("../middleware/profile-upload")


routes.get("/",(req,res)=>{
    res.send("Hello Server")
})
routes.get("/user/prfile",UserAuth,userRoutes.getUserProfile)
routes.get("/getAllPost",UserAuth,userRoutes.getAlluserPost)
routes.get("/single-user/:id",UserAuth,userRoutes.getSingleUser)
routes.get("/follow-checkers/:id",UserAuth,userRoutes.getFollowersCheck)

routes.delete("/deleteHistory/:id",UserAuth,userRoutes.DeleteUserHistory)
routes.post("/profile-update",UserAuth,profile.single("profile"),userRoutes.UpdateUserProfile)
routes.post("/search-user",UserAuth,userRoutes.getUsersearch)
routes.post("/user-post",UserAuth,upload.single("post"),userRoutes.createPost)
routes.post("/register-user",userRoutes.UserRegister) 
routes.post("/login-user",userRoutes.UserLogin)
routes.post("/switch-private",UserAuth,upload.none(),userRoutes.isPrivate)
routes.post("/follow-request",UserAuth,upload.none(),userRoutes.followRequest)
routes.post("/request-followlist",UserAuth,userRoutes.PendingFollowers)
routes.post("/postlike",UserAuth,userRoutes.postlike)


module.exports=routes
