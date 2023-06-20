import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import express from "express";
const router=express.Router();

export const getPost=async(req,res)=>{
    const {id}=req.params;
    try{
        const post=await PostMessage.findById(id);
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getPosts = async(req,res)=>{
    const {page}=req.query;
    try{
        const total=await PostMessage.countDocuments({});
        const LIMIT=6;
        const startIndex=(Number(page)-1)*LIMIT;//get the starting index of every page

        const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        // console.log(postMessages);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}
export const getPostsBySearch = async(req,res)=>{
    const {searchQuery,tags}=req.query;
    // console.log({searchQuery,tags});
    try{
        const title= new RegExp(searchQuery,"i");
        const posts= await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]})//find all the post according to the title and tags
        res.status(200).json({data:posts});
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

export const createPost= async (req,res)=>{
    // res.send("Post Ban gaya");
    const post= req.body;
    const newPost = new PostMessage({...post,creator: req.userId,created: new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({message:error});
    }
}
export const updatePost=async(req,res)=>{
    // const {id:_id} =req.params;
    // const post=req.body;
    // if(mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    // const updatedPost= PostMessage.findByIdAndUpdate(_id,post,{new:true});
    // res.json(updatedPost);
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}
export const deletePost= async(req,res) => {
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({message:'Post deleted Sucessfully'});
}
export const likePost= async(req,res)=>{
    const {id}=req.params;
    if(!req.userId) return res.json({message:'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post=await PostMessage.findById(id);
    const index=post.likes.findIndex((id)=>id=== String(req.userId));
    if(index===-1){
        post.likes.push(req.userId)
    }else{
        post.likes= post.likes.filter((id)=>id!== String(req.userId));
    }
    try{
        const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
    }catch(error){
        return res.status(409).json({message:error});
    }
    // res.status(200).json(updatedPost);
}
export const commentPost=async(req,res)=>{
    const {id}=req.params;
    const {value}=req.body;
    const post=await PostMessage.findById(id);

    post.comments.push(value);
    const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost);
}
export default router;