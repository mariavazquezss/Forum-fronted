
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './components/Login'
import { Registrar } from './components/Registrar'
import { Home } from './components/Home'
import {Post}  from "./components/Post";


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Registrar/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/post" element={<Post/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
