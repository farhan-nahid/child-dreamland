import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

/* 

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


*/
