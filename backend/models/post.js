const mongoose=require("mongoose")

const postschema=mongoose.Schema({
    post_author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    isPrivate:{
        type:Boolean,
        default:false
    },
   
    like:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        }
    ],
  
    views:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        }
    ],
    post_url:{
        type:String,

    },
    caption:{
        type:String
    },
    comments:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"user"
        }
    ],
    timestamp:{
        type:Date,
        default:Date.now
     }


})

const postModel=mongoose.model("post",postschema)
module.exports=postModel