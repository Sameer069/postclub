const mongoose=require("mongoose")

const MessangerSchema=new mongoose.Schema({
     SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
     ReciverId:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
     message:{
        type:String
     },
     timestamp:{
        type:Date,
        default:Date.now
     }
})

const messageModel=mongoose.model("message",MessangerSchema)
module.exports=messageModel

