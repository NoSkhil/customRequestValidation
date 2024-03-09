import client from '../db';
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDTO } from "../interfaces/userDTO";

const getAllData = async(email:string) => {
    try {
        return await client.query("SELECT * FROM Users");
    }
    catch(err) {
        console.log(err);
        return {err: "Request failed!"};
    }
};

const insertUserData = async(userData:CreateUserDTO) =>{
try {
    const {firstName,lastName,birthdate,phone,email} = userData;
    const queryString = "INSERT INTO Users(firstName,lastName,birthdate,phone,email, id) VALUES($1,$2,$3,$4,$5, $6) RETURNING *";
    const values = [firstName,lastName,birthdate,phone,email, uuidv4()];
    return await client.query(queryString,values);
}catch(err) {
    console.log(err);
    return {err: "Request failed!"};
}
};

const insertTables = async() =>{
    try {
        return await client.query("CREATE TABLE Users (id varchar(255), firstName varchar(255), lastName varchar(255), phone bigint, email varchar(255), birthdate date)")
    }catch(err) {
        console.log(err);
        return {err: "Request failed!"};
    }
    };

const deleteUser = async(email:string) => {
    try{
        return await client.query("DELETE FROM Users WHERE email=$1",[email]);
    }catch(err) {
        console.log(err);
        return {err: "Request failed!"};
    }
}

export default {
    getAllData, 
    insertUserData, 
    insertTables,
    deleteUser
};