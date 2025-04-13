   const mongoose=require("mongoose")


   const commentConSchema=new mongoose.Schema({
        praticipate:[
            {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"user"
            }
        ],
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }]
        
   })
  const commentConveration=mongoose.model("comment",commentConSchema)
  module.exports=commentConveration