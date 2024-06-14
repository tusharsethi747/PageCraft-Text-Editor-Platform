// import mongoose from "mongoose"

import mongoose from "mongoose";
import { config } from "dotenv";
import express from "express"
import { UserDocs } from "./UserDocs.js";
import cors from 'cors'

const app=express();
app.use(cors());

config();
const connection=()=>{


    app.get('/userdocs/:id',async (req,res)=>{
        try{
            const current_user_id=req.params.id;
            const user_data= await UserDocs.findOne({user_id:current_user_id});
    
            if(user_data){
                const docs_of_my_user=user_data.AllDocs;
                return res.status(200).send(docs_of_my_user);
            }
            else{
                return res.status(200).send([]);
            }
        }
        catch(error){
            return res.status(500).json({message:error.message});
        }
    
    
    })


    const URL=process.env.Mongo_url;
    const PORT=process.env.Port;
    console.log(URL);
    mongoose.connect(URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`app is listening on the port ${PORT}`);
            console.log('connection successfull!!');

        })
    })
    .catch((err)=>{
        console.log('cant connect',err.message);
    })
    
}

export default connection;