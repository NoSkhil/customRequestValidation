import {Router} from 'express';
import userController from '../controllers/userController';

const userRoutes = Router();

export default userRoutes;

userRoutes.get('/details', userController.getAllUserData );

userRoutes.post('/insert', userController.insertUserData);

userRoutes.post('/create', userController.createUserTable);