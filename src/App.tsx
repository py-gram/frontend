import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
//import Users from './pages/Users';
//import CreateUserForm from './pages/CreateUserForm';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
