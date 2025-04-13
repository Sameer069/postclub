const conversationModel=require("../models/conversation")
const userModel=require("../models/user")
const {setSocket,getIO,getsocketId}=require("../socket/socket")
const messageModel=require("../models/messages")
const mongoose=require("mongoose")
 

const sendMessage=async(req,res)=>{
  if(!mongoose.isValidObjectId(req.body.ReciverId)){
    return res.status(400).json({error:"Invalid Id"})
   }
      const SenderId=req.user.id;
      const ReciverId=req.body.ReciverId
        let conversation=await conversationModel.findOne({praticipate:{
        $all:[SenderId,ReciverId]
      }})
      
      if(!conversation||conversation===null){
           conversation= await  conversationModel.create({
            praticipate:[SenderId,ReciverId]
        })
      }

    
  
      const message=await messageModel.create({
        SenderId:SenderId,
        ReciverId:ReciverId,
        message:req.body.message
      })
      if(message){
       conversation.messages.push(message._id)
      }
       
      const io=getIO()
       const ReciverSocketid=getsocketId(ReciverId)
       const SenderSocketId=getsocketId(SenderId)
       if(ReciverSocketid){
        io.to(ReciverSocketid).emit("recive-message",message)
       }
       if(SenderSocketId){
        io.to(SenderSocketId).emit("recive-message",message)
       }

      await conversation.save()
      
      res.status(200).json({message:message})

}

const getAllMessageUser=async(req,res)=>{
  
    const user=await userModel.findOne({_id:req.user.id}).populate("followers")
     if(user){
      return res.status(200).json({msg:"succes",userChat:user.followers})

     }
    return res.status(400).json({error:"User not found"})

}

const chatUser=async(req,res)=>{
       if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({error:"Invalid Id"})
       }
      const user=await userModel.findOne({_id:req.params.id})
      if(user){
        return res.status(200).json(user)
      }
      return  res.status(400).json({error:"User not found"})
}
const getConversation=async(req,res)=>{
  if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).json({error:"Invalid Id"})
   }
      const ReciverId=req.params.id
      const SenderId=req.user.id

      const conversation=await conversationModel.findOne({praticipate:{
        $all:[SenderId,ReciverId]
      }}).populate("messages")
       if(!conversation) return res.status(201).json([])
     
       return res.status(200).json(conversation)
      

     
    
}

module.exports={
    getConversation,
    getAllMessageUser,
    chatUser,
    sendMessage

}