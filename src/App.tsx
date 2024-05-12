import React from 'react';
//import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from "./pages/Posts";
//import Users from './pages/Users';
//import CreateUserForm from './pages/CreateUserForm';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
