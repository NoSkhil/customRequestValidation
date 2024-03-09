import express,{Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import client from './db';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req:Request,res:Response)=> res.status(200).send({data:"notFiverr server."}));
app.use('/api/user', userRoutes);

app.listen(8000, async ()=>{
    console.log("notFiverr server active on port 8000");
    client.connect((err:any)=>{
        if(err) console.log(err);
        else console.log("Connected to supabase postgres db");
    });
});

