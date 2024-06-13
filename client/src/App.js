import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Editor from './Components/Editor';
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './Components/Login';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Showdocs from './Components/Showdocs';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';

function App() {
  const auth = getAuth();
  const [user,Setuser]=useState(null);
  const navigate=useNavigate();
  const [CurrentId,SetCurrentId]=useState('');
  useEffect(()=>{
    const check=()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          Setuser(user);
          console.log('i have my user ')
          console.log(user.uid);
          SetCurrentId(user.uid);

        } else {
          Setuser(null);
          navigate(`/`)
          console.log('no user right now');
        }
      });
    }
    check();
  },[auth])

  return (
    <>
    <Navbar/>
    <Routes>
      {/* <Route path="/" element={user ? <Navigate replace to={`/Editor/docs/${uuidv4()}`} /> : <Login />} />
      <Route path="/Editor/docs/:id" element={ <Editor/>} /> */}


      <Route path="/" element={user ? <Navigate replace to={`/userdocs/${CurrentId}`} /> : <Login />} />
      <Route path="/Editor/docs/:id" element={ <Editor/>} />
      <Route path='/userdocs/:id' element={<Showdocs/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      
    </Routes>
  </>
  );
}

export default App;




    {/* <Routes>
      <Route path='/' element={<Navigate replace to={`/docs/${uuidv4()}`} /> } />
      <Route path='/docs/:id' element={<Editor/>}></Route>
    </Routes> */}
