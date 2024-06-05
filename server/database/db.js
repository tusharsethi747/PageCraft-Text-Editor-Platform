// import mongoose from "mongoose"

import mongoose from "mongoose";
import { config } from "dotenv";

config();
const connection=()=>{
    const URL=process.env.Mongo_url;
    console.log(URL);
    mongoose.connect(URL)
    .then(()=>{
        console.log('connection successfull!!');
    })
    .catch((err)=>{
        console.log('cant connect',err.message);
    })
    
}

export default connection;