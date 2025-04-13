   const mongoose=require("mongoose")


   const commentSchema=new mongoose.Schema({
        SenderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        ReciverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        },
        comments:{
            type:String
        },
        timestamps:{
            type:Date,
            default:Date.now
        }

        
   })
  const commentModel=mongoose.model("comment",commentSchema)
  module.exports=commentModel