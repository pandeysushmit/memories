import  Express from "express";
import {getPost,createPost,updatePost} from "../controllers/posts.js";
const router= Express.Router();
router.get('/',getPost);
router.post('/',createPost);
router.patch('/:id',updatePost);
export default router;