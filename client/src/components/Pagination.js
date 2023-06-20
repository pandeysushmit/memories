import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getPosts} from "../actions/posts";
import {Pagination,PaginationItem} from '@material-ui/lab'
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate=({page})=>{
    const dispatch=useDispatch();
    const classs=useStyles();
    const {numberOfPages}=useSelector((state)=>state.posts);
    useEffect (()=>{
        if(page) dispatch(getPosts(page));
        //eslint-disable-next-line
    },[page]);
    return(
        <Pagination 
        classes={{ul:classs.ul}}
        count={numberOfPages}
        page={Number(page)||1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
        />
    )
}
export default Paginate;