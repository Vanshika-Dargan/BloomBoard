import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    const{page}=req.query
    try {
        const LIMIT=4;
        const startIndex=LIMIT*(Number(page)-1);
        const totalPosts=await PostMessage.countDocuments({});
        const posts= await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
                
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(totalPosts/LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//getBySearch

export const getPostsBySearch = async (req, res) => { 
    const {searchQuery,tags}=req.query
    try {
        const title=new RegExp(searchQuery, 'i')
        const post = await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
                
        res.json({data:post});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//create
export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({...post,creator:req.userId})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//update
export const updatePost =async(req,res)=>{
const {id:_id}=req.params;
const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
    res.json(updatedPost)

}
//delete
export const deletePost=async(req,res)=>{
const {id}=req.params;
if(!mongoose.Types.ObjectId.isValid(id))
return res.status(404).send("No post with that id");
await PostMessage.findByIdAndRemove(id)
res.json({message:"Post deleted successfully"})
}

//like
export const likePost =async(req,res)=>{
    
    const {id}=req.params;
    if(!req.userId) 
    return res.json({message:'Unautheticated'})
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
    const post=await PostMessage.findById(id);
    const index=post.likes.findIndex((id)=>id===String(req.userId));
    if(index==-1)
    {
    post.likes.push(req.userId);
    }
    else
    {
    post.likes=post.likes.filter((id)=>id !== String(req.userId));
    }
    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost);
}



export default router;