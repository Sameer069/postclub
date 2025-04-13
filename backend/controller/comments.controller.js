const commentModel=require("../models/comments")
const userModel = require("../models/user")
const {getIO,getsocketId}=require("../socket/socket")

const sendComment=async(req,res)=>{
       const post_id=req.body.post_id
       const commentorId=req.user.id
       const comment=req.body.comment
       const ReciverId=req.body.ReciverId
       const currentUser=await userModel.findOne({_id:commentorId})
    const commentsDb=await commentModel.create({
        SenderId:commentorId,
        post_id:post_id,
        comments:comment
    })
    
     
    const io=getIO()
    const ReciversocketId=getsocketId(ReciverId)
    const SenderSocketId=getsocketId(commentorId)
    
     if(ReciversocketId){
        io.emit("comments-recive",{commentUser:commentsDb,Sender:currentUser})
    }
   
    if(commentsDb){
      
        return res.status(200).json(commentsDb)
    }

    res.status(404).json({error:"Comment not sent"})


      
}

const getComments=async(req,res)=>{
      
      const getComments=await commentModel.find({post_id:req.body.post_id}).populate("SenderId")
      if(!getComments || getComments.length===0) return res.status(201).json([])
    
      res.status(200).json(getComments)
}

module.exports={
    sendComment,
    getComments
}