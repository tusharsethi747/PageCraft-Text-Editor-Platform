import { Server } from "socket.io";
import { createServer } from "http";
import Connection from "../database/db.js";
import { getDocument,updateDocument } from "../database/dbFunctions.js";
import { AddDocToUser } from "../database/dbFunctions.js";
import  FrontendPath  from "../FrontendPath.js";
import express from 'express';

Connection();
// i have changed the index.js from root dir to api folder !! 
const app = express();

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

const httpServer=createServer();
const io = new Server(httpServer, {
    cors:{
        origin:`${FrontendPath}`,
        credentials:true,
    }
});

io.on("connection",(socket)=>{

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
httpServer.listen(5500);

// this is the change in code of index.js 
export default (req, res) => {
    httpServer.listen(0, () => {
        console.log("Server is running");
    });
    res.status(200).send('Server is running');
};