const mongoose=require("mongoose")
const conversationSchema=new mongoose.Schema({
    praticipate:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    messages:[ 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"message"
        }
    ]
})

const conversationModel=mongoose.model("conversation",conversationSchema)

module.exports=conversationModel