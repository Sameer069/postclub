const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    user_name:{
        type:String,

    },
    fullname:{
        type:String
    },
    password:{
        type:String,
        select:false
    },
    profile:{
        type:String,
        default:"https://res.cloudinary.com/dzmrkbev5/image/upload/v1741630343/%5Bobject%20Object%5D/93039741e042c42035ea22e2.jpg"
    },
    Bio:{
       type:String,
       
    },
    email:{
        type:String,
        select:false
    },
    isPrivate:{
        type:Boolean,
        default:false
    },
     followRequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    history:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel