import userService from "../services/userService";
import {Request, Response, NextFunction} from "express";


const getAllUserData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {email} = req.body;
        const userData = await userService.getAllData(email);
        res.status(200).send({data:userData});
    } catch (err) {
        return {err};
    }
}

export default {getAllUserData};