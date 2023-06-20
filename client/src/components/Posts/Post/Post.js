import React from "react";
import { Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";
const Post= ({post,setCurrentId}) =>{
    const dispatch= useDispatch();
    const classes = useStyles();
    const history=useHistory();
    const user=JSON.parse(localStorage.getItem('profile'));
    const Likes=()=>{
        if(post?.likes?.length>0)
            return post.likes.find((like)=>like===(user?.result?.googleId|| user?.result?._id))?
            (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length>2? `You and ${post.likes.length-1} others`:`${post.likes.length} like${post.likes.length>1?'s':''} `}</>
            ):(
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length===1?'Like':'Likes'}</>
            );
            return<><ThumbUpAltIcon fontSize="small"/>&nbsp;Like</>;
    };
    const openPost=()=>{
        history.push(`/posts/${post._id}`);
    };
    return(
       <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile ||'https://picsum.photos/200/300/?blur'} title={post.title}/> 
        <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator) && (
        <div className={classes.overlay2} name="edit">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          }}
          style={{ color: 'white' }}
          size="small"
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
        )}
        <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post?.tags.map((tags)=>`#${tags} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5">{post.title}</Typography>
        <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>{post.message.slice(0,100)}...</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions>
            <Button size="small" color="primary" 
            disabled={!user?.result}
            onClick={()=>dispatch(likePost(post._id))}>
            <Likes/> &nbsp;
            {/* {post.likes.length} */}
            </Button>
            {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) && (
                <Button size="small" color="secondary" onClick={()=>dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small"/>
            Delete
            </Button>
            )}
        </CardActions>
        </Card>
    )
}
export default Post;