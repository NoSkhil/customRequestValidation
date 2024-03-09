import userService from "../services/userService";
import {Request, Response, NextFunction} from "express";
import { User, CreateUserDTO } from "../interfaces/userDTO";


const getAllUserData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {email} = req.body;
        const userData = await userService.getAllData(email);
        res.status(200).send({data:userData});
    } catch (err) {
        return {err};
    }
}

const insertUserData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const userData : CreateUserDTO = req.body;
        const user = await userService.insertUserData(userData);
        res.status(200).send({data:user});
    } catch (err) {
        return {err};
    }
}

const createUserTable = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const userData = await userService.insertTables();
        res.status(200).send({data:userData});
    } catch (err) {
        return {err};
    }
}

export default {getAllUserData, insertUserData, createUserTable};