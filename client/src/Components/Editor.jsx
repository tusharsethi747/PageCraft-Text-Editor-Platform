import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import { auth } from '../FirebaseConfig'
import SocketPath from '../SocketPath.js'

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
  const navigate=useNavigate();
  const [CurrentUser,SetUser]=useState(null);
  const [UserID,SetUserID]=useState('');

  useEffect(()=>{
    const check=()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SetUser(user);
          SetUserID(user.uid)
          console.log(UserID)
        } else {
          console.log('user state changed from editor jsx');
          // navigate('/')
          
        }
      });
    }
    check();
  },[auth])

  // CurrentUser && console.log('my user right now is ',CurrentUser.email)

  const HandleLogout=()=>{
    signOut(auth).then(() => {
      // console.log('signed out worked')
      SetUser('');
      // navigate(`/`);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }

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
    const socketServer = io(`${SocketPath}`);
    setSocket(socketServer);
    console.log(setSocket)
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
  if (CurrentUser===null || quill === null || socket === null) return;

  socket && socket.once('load-document', document => {
      // console.log('this is my doc',document);
      quill.setContents(document);
  })

  socket && socket.emit('get-document', id,UserID);
},  [quill, socket, id,UserID]);


  useEffect(() => {
    
      if (socket === null || quill === null) return;
      const interval = setInterval(async() => {
        const len= await quill.getLength()
        if(len>1){
          socket.emit('save-document', await quill.getContents())
        }
      }, 2000);

      return () => {
          clearInterval(interval);
      }
  }, [socket, quill]);

  return(
  <>
  <Mycomponent className='refClass'>
      {/* <p>{CurrentUser? CurrentUser.email: ""}</p>
      <button onClick={HandleLogout}>Logout</button> */}
      <Box className='container' id='container'>
      </Box>
   </Mycomponent>
  </>);
};

export default Editor;
