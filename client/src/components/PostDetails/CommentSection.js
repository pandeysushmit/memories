import React,{useState,useRef} from 'react'
import { Typography,TextField,Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {commentPost} from '../../actions/posts'
import useStyles from './styles'
const CommentSection = ({post}) => {
    // console.log(post);
    const classes=useStyles();
    const dispatch=useDispatch();
    const user= JSON.parse(localStorage.getItem('profile'));
    const [comments,setComments]=useState(post?.comments);
    const [comment,setComment]=useState('');
    const commentsRef=useRef();
    const handleClick=async()=>{
        const finalComment=`${user.result.name}:${comment}`;
        setComments([...comments,finalComment]);
        const newComments= await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({behavior:'smooth'});
    }
  return (
    <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {
                comments.map((c,i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'>
                        {c}
                    </Typography>
                ))
            }
            <div ref={commentsRef}/>
        </div>
        {user?.result?.name&&(
        <div style={{width:'60%'}}>
            <Typography gutterBottom variant="h6">Write a Comment</Typography>
            <TextField
                fullWidth
                minRows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            />
            <Button style={{marginTop:'10px'}} fullWidth disabled={!comment.trim()} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
        </div>
        )}
    
    </div>
  )
}

export default CommentSection;