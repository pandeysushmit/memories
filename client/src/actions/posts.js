import * as api from "../api/index.js";
// import posts from "../reducers/posts.js";
//Action Creators
//using thunk as redux is taken
import { FETCH_POST,FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH,START_LOADING,END_LOADING,COMMENT } from "../constants/actionTypes.js";
export const getPost=(id)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const {data}= await api.fetchPost(id);
        dispatch({ type: FETCH_POST,payload:data});
        dispatch({type:END_LOADING});
    }catch(error){
        console.log(error.message);
    }
}

export const getPosts =(page)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const {data}= await api.fetchPosts(page);
        // console.log(data);
        dispatch({ type: FETCH_ALL,payload:data});
        dispatch({type:END_LOADING});
    }catch(error){
        console.log(error.message);
    }
}
export const getPostsbySearch=(searchQuery)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const {data:{data}}= await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH,payload:{data}});
        dispatch({type:END_LOADING})
        // console.log(data);
    }catch(error){
        console.log(error.message);
    }
}
export const createPost=(post,history)=> async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data} =await api.createPost(post);
        dispatch({type: CREATE, payload:data});
        history.push(`/posts/${data._id}`);
    }catch(error){
        console.log(error);
    }
}
export const updatePost=(id,posts)=> async(dispatch)=>{
    try{
        const {data} =await api.updatePost(id,posts);
        dispatch({type: UPDATE, payload:data});
    }catch(error){
        console.log(error.message);
        // console.log(posts)
    }
}
export const likePost=(id)=>async(dispatch)=>{
    const user=JSON.parse(localStorage.getItem('profile'));
    try{
        // const {data}=await api.likePost(id,user?.token);
        const {data}=await api.likePost(id,user?.token);
        dispatch({type:LIKE,payload:data});
    }
    catch(error){
        console.log(error.message);
    }
}
export const deletePost=(id)=> async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    }
    catch(error){
        console.log(error.message);
    }
}
export const commentPost=(value,id)=>async(dispatch)=>{
    try{
        const {data}=await api.comment(value,id);
        console.log(data);
        dispatch({type:COMMENT,payload:data});
        return data.comments;
    }
    catch(error){
        console.log(error);
    }
}