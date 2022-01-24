import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/AuthComponents/Login/Login';
import SignUp from './components/AuthComponents/SignUp/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
