import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
// import Connection from "../database/db.js";
import { getDocument,updateDocument } from "../database/dbFunctions.js";
import { AddDocToUser } from "../database/dbFunctions.js";
import  FrontendPath  from "../FrontendPath.js";
import express from 'express';
import { UserDocs } from "../database/UserDocs.js";
import cors from 'cors'
import { config } from "dotenv";


// Connection();


// i have changed the index.js from root dir to api folder !! 


// const app = express();

// app.get('/', (req, res) => {
//     res.send('Backend server is running');
// });


const app=express();
app.use(cors());

config();


app.get('/',(req,res)=>{
    try{
        console.log('i am in / ');
        return res.status(200).send('i am in /')
    }
    catch(error){
        console.log('error found in / ', error.message);
        return res.status(500).send(error.message);
    }
})
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
let httpServer;
console.log(URL);
mongoose.connect(URL)
.then(()=>{
    httpServer = createServer(app);
    httpServer.listen(PORT,()=>{
        console.log(`app is listening on the port ${PORT}`);
        console.log('connection successfull!!');

    })


    // console.log(httpServer);
    const io = new Server(httpServer, {
        cors:{
            origin:"*",
            credentials:true,
        }
    });

    io.on("connection",(socket)=>{
        // console.log('i am inside socket connection')

        socket.on('get-document',async(id,UserID)=>{
            
            const document=await getDocument(id);

            socket.join(id);

            socket.emit('load-document', document.data);

            socket.on('sendChanges',(delta)=>{
                socket.broadcast.to(id).emit('recieveChanges',delta);
            })

            socket.on('save-document', async data => {
                await updateDocument(id, data);
                await AddDocToUser(id,UserID);
            })
            
        });
    })


})
.catch((err)=>{
    console.log('cant connect',err.message);
})


// const httpServer=createServer();
// console.log(httpServer);
// const io = new Server(httpServer, {
//     cors:{
//         origin:`${FrontendPath}`,
//         credentials:true,
//     }
// });

// io.on("connection",(socket)=>{
//     console.log('i am inside socket connection')

//     socket.on('get-document',async(id,UserID)=>{
        
//         const document=await getDocument(id);

//         socket.join(id);

//         socket.emit('load-document', document.data);

//         socket.on('sendChanges',(delta)=>{
//             socket.broadcast.to(id).emit('recieveChanges',delta);
//         })

//         socket.on('save-document', async data => {
//             await updateDocument(id, data);
//             await AddDocToUser(id,UserID);
//         })
        
//     });
// })
// httpServer.listen(5500);





// const PORT = process.env.PORT || 5500;
// httpServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// this is the change in code of index.js 
// export default (req, res) => {
//     httpServer.listen(0, () => {
//         console.log("Server is running");
//     });
//     res.status(200).send('Server is running');
// };