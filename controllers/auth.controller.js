import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../env.js";

export const signUp=async(req,res)=>{
    try{
        const {id,name,email,password}=req.body;
        const existingUser=await User.findOne({where:{email}});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User with this email already exists'
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const user=await User.create({id,name,email,password:hashedPassword});
        const token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'1d'});

        res.status(200).json({
            success:true,
            message:'User registered successfully',
            data:{
                token,
                user
            }
        })
    }
    catch(error){
        console.log('Error in register',error);
        res.status(500).send('Internal server error');
    }
}

export const signIn = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({where:{email}});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({
                success:false,
                message:'Invalid password'
            })
        }
        const token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'1d'});
        
        res.status(200).json({
            success:true,
            message:'User logged in successfully',
            data:{
                token,
                user
            }
        })
    }
    catch(error){
        console.log('Error in signIn',error);
        res.status(500).send('Internal server error');
    }
}