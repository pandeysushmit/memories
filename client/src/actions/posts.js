import * as api from "../api/index.js";
// import posts from "../reducers/posts.js";
//Action Creators
//using thunk as redux is taken
export const getPosts =()=>async(dispatch)=>{
    try{
        const {data}= await api.fetchPost();
        dispatch({ type: 'FETCH_ALL',payload:data});
    }catch(error){
        console.log(error.message);
    }
}


export const createPost=(posts)=> async(dispatch)=>{
    try{
        const {data} =await api.createPost(posts);
        dispatch({type: 'CREATE', payload:data});
    }catch(error){
        console.log(error);
    }
}
export const updatePost=(id,posts)=> async(dispatch)=>{
    try{
        const {data} =await api.updatePost(id,posts);
        dispatch({type: 'UPDATE', payload:data});
    }catch(error){
        console.log(error);
    }
}