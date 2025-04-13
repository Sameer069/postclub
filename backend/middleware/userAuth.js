const jwt=require("jsonwebtoken")

const UserAuth=(req,res,next)=>{
    
    const token=req.cookies.token || req.headers.authorization.split(" ")[1]

    if(token){
       jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
         if(err) return res.status(400).json({errors:"Invalid token"})
         req.user=decode
         next()
       })
       
    }
    else{
        res.status(401).json({errors:"Unauthorized Access"})
    }

   

}

module.exports=UserAuth
