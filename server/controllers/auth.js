import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
export const signIn=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
try{
   const existingUser=await User.findOne({email});
   if(!existingUser) res.status(404).json({message:"User doesn't exitst"})
   const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
   if(!isPasswordCorrect)res.status(400).json({message:"Incorrect User credentials"})
   const token=jwt.sign({email:existingUser.email,id:existingUser._id},'mysecretkey',{expiresIn:'8h'})
   res.status(200).json({result:existingUser,token})
}
catch(error)
{
console.log(500).json({message:'Unexpected error'})
}
}

export const signUp=async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword}=req.body;
    try{
      const existingUser=await User.findOne({email});
      if(existingUser) return res.status(404).json({message:'User already exists. Please Log In'})
      if(password!=confirmPassword)
      return res.status(400).json({message:'Passwords dont match'})
      const hashedPassword=await bcrypt.hash(password,12)
      const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
      const token=jwt.sign({email:result.email,id:result._id},'mysecretkey',{expiresIn:'8h'})
      res.status(200).json({result,token})
    }
    catch(error)
    {
    res.status(500).json({message:'Something went wrong'})
    }


    }