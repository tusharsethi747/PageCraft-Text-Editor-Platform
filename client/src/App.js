import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Editor from './Components/Editor';
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from 'react-router-dom';

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element={<Navigate replace to={`/docs/${uuidv4()}`} /> } />
      <Route path='/docs/:id' element={<Editor/>}></Route>
    </Routes>
   </>
  );
}

export default App;
