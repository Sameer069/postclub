const mongoose=require("mongoose")

const DatabaseConnection=()=>{
    mongoose.connect(process.env.MONGO_URL).then(succes=>{
        console.log("Mongodb Connected")
    })
    .catch(err=>{
        console.log("Mongodb failed to connect",err)
    })
}

module.exports={DatabaseConnection}