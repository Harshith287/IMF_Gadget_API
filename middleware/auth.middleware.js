import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env.js";
import  User  from "../models/user.model.js";

export const authorize =async (req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token=req.headers.authorization.split(' ')[1];
        }
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:'Unauthorized access'
            })
        }
        const decoded= jwt.verify(token,JWT_SECRET);
        const user=await User.findOne({where:{id:decoded.id}});
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:'Unauthorized access'
            })
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log('Error in authorize',err);
        res.status(500).send('Internal server error');
    }
}