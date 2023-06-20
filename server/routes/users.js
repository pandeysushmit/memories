import Express from 'express';

import {signin,signup} from '../controllers/user.js';
const router=Express.Router();
router.post('/signin',signin);//post because we are sending data
router.post('/signup',signup);//post because we are sending data
export default router;