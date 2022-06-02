import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';

function App() {
  
  const logado = localStorage.getItem('@user')
  
  return (
    <BrowserRouter>
      <Routes>
       {!logado && <Route path='/' element={<Login/>}/>}
       {logado && <Route path='/' element={<Home/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;