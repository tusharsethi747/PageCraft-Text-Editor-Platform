import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import docImg from '../assets/newIcon.png'
import  BackendPath  from '../BackendPath'

const Showdocs = () => {
  const [DocsList,SetDocsList]=useState();
  const {id}=useParams();

  const auth=getAuth();
  const HandleLogout=()=>{
    signOut(auth).then(() => {
      // console.log('signed out worked')
      // SetUser('');
      // navigate(`/`);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }

  useEffect(()=>{
    const fetchData= async()=>{
      try{
        const response=await axios.get(`${BackendPath}/userdocs/${id}`);

        console.log(response.data)
        SetDocsList(response.data);
        // console.log(DocsList);
      }
      catch(error){
        console.log(id);
        console.log('error found ..sorry',error);
      }
    }
    fetchData();
  },[id])

  useEffect(() => {
    console.log('this is my docs list',DocsList);
  }, [DocsList]);



  return (
    <>
      {/* <button onClick={HandleLogout}>Logout</button>
      <Link to={`/Editor/docs/${uuidv4()}`}>New Document !! </Link> */}

      <div className='ButtonContainer'>
        <Button 
          variant='contained' 
          href={`/Editor/docs/${uuidv4()}`} 
          sx={{margin:"20px", ":hover":{backgroundColor:"rgba(205,255,155,0.5)"},borderRadius:"10px",display:"inline-block"}}
          
        >
          Click here for a New Document !!
        </Button>

        <Button
          variant='contained' 
          sx={{margin:"20px", ":hover":{backgroundColor:"rgba(205,255,155,0.5)"},borderRadius:"10px"}}
        >
          Your Saved Documents 
        </Button>
      </div>


      {/* <Box classname="DocsContainer"> */}
      <div className='DocsContainer'>
        {DocsList && DocsList.map((doc_id,index)=>{
          return (
            // <div key={index}>
            //   <Link to= {`/Editor/docs/${doc_id}`}>click here for {`${doc_id}`}</Link>
            // </div>
          <Link to= {`/Editor/docs/${doc_id}`} style={{textDecoration:"none"}}>
            <Card sx={{ maxWidth: 280}} key={index} >
            <CardActionArea>
              <CardMedia
                component="img"
                height="120"
                image={docImg}
                alt="green iguana"
                sx={{objectFit:"contain"}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${doc_id}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link to= {`/Editor/docs/${doc_id}`} style={{textDecoration:"none"}}>Click here to open this Document !!</Link>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
            
          )
        })}
      </div>
    </>
  )
}

export default Showdocs