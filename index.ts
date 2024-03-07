import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.status(200).send({data:"notFiverr server."}));
app.use('/api/user', userRoutes);

app.listen(8000, ()=>{console.log("notFiverr server active on port 8000")});

