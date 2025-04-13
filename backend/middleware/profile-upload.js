const multer=require("multer")
const{CloudinaryStorage}=require("multer-storage-cloudinary")
const cloudinary=require("cloudinary").v2
const crypto=require("crypto")

 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
 })

 const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"profile",
            format:file.mimetype.split("/")[1],
            public_id:crypto.randomBytes(12).toString("hex")
        }
    }
 })
 const profile=multer({storage})
 module.exports=profile