import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const Mycomponent = styled(Box)(() => ({
  backgroundColor: `#F5F5F5`,
}));

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const Editor = () => {
  const {id}=useParams();
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  useEffect(() => {
    const quillServer = new Quill("#container", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
    // quillServer.disable();
    // quillServer.setText('Loading the document...')
    setQuill(quillServer);
  }, []);

  useEffect(() => {
    const socketServer = io("http://localhost:5500/");
    setSocket(socketServer);
    return () => {
      socketServer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleChanges = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket && socket.emit("sendChanges", delta);
    };
    quill && quill.on("text-change", handleChanges);
    return () => {
      quill && quill.off("sendChanges", handleChanges);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleChanges = (delta) => {
      quill.updateContents(delta);
    };
    socket && socket.on("recieveChanges", handleChanges);

    return () => {
      socket && socket.off("recieveChanges", handleChanges);
    };
  }, [quill, socket]);

//   useEffect(() => {
//     if (quill === null || socket === null) return;
//     socket && socket.emit('get-document', id);
//     socket && socket.once('load-document', document => {
//         quill.setContents(document);
//         // quill.enable();
//         console.log(document);
//     })

    
//     quill && quill.setContents(document);
// },  [quill, socket, id]);


useEffect(() => {
  if (quill === null || socket === null) return;

  socket && socket.once('load-document', document => {
      console.log('this is my doc',document);
      quill.setContents(document);
  })

  socket && socket.emit('get-document', id);
},  [quill, socket, id]);


  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(async() => {
        socket.emit('save-document', await quill.getContents())
    }, 2000);

    return () => {
        clearInterval(interval);
    }
  }, [socket, quill]);
    return(
  <>
  <Mycomponent className='refClass'>
      <Box className='container' id='container'></Box>
   </Mycomponent>
  </>);
};

export default Editor;
