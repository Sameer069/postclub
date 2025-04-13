const userModel=require("../models/user")
const jwt=require("jsonwebtoken")
const path=require("path")
const postModel=require("../models/post")

const UserRegister=(async(req,res)=>{
const { fullname,username,email,password} =req.body
const ExistUser=await userModel.findOne({$or:[{email:email},{user_name:username}]})
  if(ExistUser) {
        if(ExistUser.email===email) return res.status(409).json({errors:"Email already exist"})
        if(ExistUser.user_name===username) return res.status(408).json({errors:"user_name already taken"})
    }
  await userModel.create({
    user_name:username,
    password:password,
    email:email,
    fullname:fullname
  })
  res.status(200).json({msg:"Registered"})
  
})
const UserLogin=(async(req,res)=>{
   const {username,password}=req.body
   const user=await userModel.findOne({user_name:username}).select("+password")
   if(user){
     if(user.password===password){
     
      const playload={
      id:user._id
      }
       
      const token=jwt.sign(playload,process.env.JWT_SECRET)
      res.cookie("token", token);
      res.status(200).json({msg:"Loggedin",token})
     }
     else{
      res.status(401).json({errors:"Password is wrong"})
     }
   }
   else{
    res.status(404).json({errors:"User not found"})
   }
})

const getUserProfile=(async(req,res)=>{
  const user=await userModel.findById(req.user.id).select("-email") .populate("posts").populate("history").populate("followRequest")
  if(user) return  res.status(200).json(user)
  res.status(400).json({errors:"user not found"})
})
const getAlluserPost=(async(req,res)=>{
  const userid=req.user.id
   const allPost=await postModel.find({isPrivate:false}).populate("post_author") 
  res.status(200).json(allPost)

})
const postlike=(async(req,res)=>{
     const post_id=req.body.post_id;
     const currentUserId=req.user.id
     let post=await postModel.findById({_id:post_id})
      if(post){
         if(post.like.indexOf(currentUserId)===-1){
          post.like.push(currentUserId)
          await post.save()
          return res.status(200).json({msg:"liked"})
         }
         else{
           post= await postModel.findByIdAndUpdate({_id:post_id},{$pull:{like:currentUserId} })
           return res.status(201).json({msg:"Unliked"})
         }
      }
      
       return res.status(400).json({error:"Post not found"})
     
    

})
const UpdateUserProfile=(async(req,res)=>{
       const userid=req.user
       const user=await userModel.findById(userid.id)
       
        if(!req.file){
           user.profile=user.profile
           user.Bio=req.body.Bio,
           user.fullname=req.body.fullname
           await user.save()
           res.send("Profile update") 
        }
        else{
          user.profile=req.file.path
          user.Bio=req.body.Bio,
          user.fullname=req.body.fullname
          await user.save()
          res.send("Profile update")
        }
      
})
const createPost=(async (req,res)=>{
   const  userid=req.user
  
   const user=await userModel.findById(userid.id)
   const post=await postModel.create({
    post_author:user._id,
    post_url:req.file.path,
    caption:req.body.caption
   })
   user.posts.unshift(post._id)
   await user.save()
   
   res.send("posted")
})

 const getUsersearch=(async(req,res)=>{
      try{
          const query=req.body.user
         
          if(!query) return res.status(401).json([])
    
          const username=await userModel.find({user_name:{$regex:query,$options:"i"}}).limit(10)
           
          res.status(200).json(username)
      }
      catch(error){
          res.status(404).json({error:error})
      }
 })

 const getSingleUser=(async(req,res)=>{
      

          const user=await userModel.findOne({_id:req.params.id}).populate("posts").select("-history -email -createdAt")
          const currentUser=req.user.id
          const currentUserModel=await userModel.findById(currentUser)
          
          if(user){
             if(currentUserModel.history.indexOf(user._id)===-1 && currentUserModel!==currentUser ){
                  currentUserModel.history.unshift(user._id)
                  await currentUserModel.save()
             }
             const followersUser=currentUserModel.followers.find(followUser=>followUser._id===user._id)
             if(user.isPrivate && followersUser){
                   res.status(200).json({user,following:true})
             }
             else{
              res.status(201).json({user})
             }
             
           
          }
          else{
             res.status(401).json({error:"User Not Found"})
          }
         
     
 })



      const DeleteUserHistory=(async(req,res)=>{
           const user=await userModel.findOneAndUpdate({_id:req.user.id},{
            $pull:{history:req.params.id}
           },{new:true})


           res.status(200).json(user)
      })
     const isPrivate=(async(req,res)=>{
        const checkPrivate=req.body.isPrivate==="true"
        const user=await userModel.findByIdAndUpdate(req.user.id,{$set:{isPrivate:checkPrivate}},{new:true})
        const post=await postModel.updateMany({post_author:user._id},{$set:{isPrivate:checkPrivate}})
       
        res.status(200).json({user})
         
     })
      
     const followRequest=(async(req,res)=>{
           
           const currenUser=await userModel.findOne({_id:req.body.userid})
          
            if(currenUser.followRequest.indexOf(req.user.id)===-1&&currenUser.followers.indexOf(req.user.id)==-1){
                
                    currenUser.followRequest.push(req.user.id)
                    await currenUser.save()
                    return  res.status(200).json({msg:"Follow requsted..."})
            }
            else{
              res.status(201).json({msg:"You have alredy requsted"})
            }

          })

          const PendingFollowers=(async(req,res)=>{
               
                  if(req.user.id){
                    const user=await userModel.findById({_id:req.user.id})
                    const requestUser=await userModel.findById({_id:req.body.id})
                    if(user.followers.indexOf(req.body.id)===-1){
                         user.followers.push(req.body.id)
                         user.followRequest=user.followRequest.filter(id=>id.toString()!==req.body.id.toString())
                         await user.save()
                         requestUser.following.push(req.user.id)
                         await requestUser.save()
                        return  res.status(200).json({msg:"Accepted",user})
                    }
                    return res.status(201).json({msg:"Already followers"})
        
                   
                  }
                  else{
                    return res.status(404).json({erorrs:"User not found"})
                  }
          })


          const getFollowersCheck=(async(req,res)=>{

              
                 if(req.user.id){
                    const currentUser=await userModel.findById({_id:req.user.id})
                    const FollowUser= await userModel.findById({_id:req.params.id}).populate("followers")
                 
                    const isFollow=FollowUser.followers.find(user=>user._id.toString()===currentUser._id.toString())
                    if(isFollow){
                      res.status(200).json({msg:"succes",following:true})
                    }
                    else{
                      res.status(201).json({msg:"Not follow",following:false})
                    }
                 
                 }

                 else{
                  return res.status(404).json({erors:"User not found"})
                 }
               
          })

module.exports={
    UserLogin,
    UserRegister,
    getUserProfile,
    createPost,
    getAlluserPost,
    UpdateUserProfile,
    getUsersearch,
    getSingleUser,
    DeleteUserHistory,
    isPrivate,
    followRequest,
    PendingFollowers,
    getFollowersCheck,
    postlike

}