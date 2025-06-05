import "./App.css";
import React from 'react'; 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./components/Home.jsx"

import NoteContent from "./pages/NoteContent";
function App() {
  return (

    <BrowserRouter>

    <Routes>

   <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/notes" element={<NoteContent/>}></Route>
    </Routes>
    
    
    </BrowserRouter>
    
  );
}

export default App;
