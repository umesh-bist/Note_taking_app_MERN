import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();

router.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;

     const existingUser = await User.findOne({ email });
    if (existingUser) {
        
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword=await bcrypt.hash(password,10);

    try{
        
const user=new User({name,email,password:hashedPassword});
        user.save();
        res.status(201).json({message:"user registered"})
        }
        
    
    catch(err){
        err.status(400).json({error:"email already exists"})
    }
});


router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.status(400).json({error:"user not found"})
    }
    const usermatched=await bcrypt.compare(password,user?.password);
    if(!usermatched){
         res.status(400).json({error:"wrong password"})
    }
    const token=jwt.sign({id:user?._id},process.env.JWT_SECRET,{
    expiresIn: "1h",
  });
  res.json({token})

})


export default router;