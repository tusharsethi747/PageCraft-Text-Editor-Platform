import { Server } from "socket.io";
import { createServer } from "http";
// import Connection from "./database/db.js";
import Connection from "./database/db.js";
import { getDocument,updateDocument } from "./database/dbFunctions.js";

Connection();
const httpServer=createServer();
const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
});

io.on("connection",(socket)=>{

    socket.on('get-document',async(id)=>{

        const document=await getDocument(id);

        socket.join(id);

        socket.emit('load-document', document.data);

        socket.on('sendChanges',(delta)=>{
            socket.broadcast.to(id).emit('recieveChanges',delta);
        })

        socket.on('save-document', async data => {
            await updateDocument(id, data);
        })
        
    })
})
httpServer.listen(5500);
