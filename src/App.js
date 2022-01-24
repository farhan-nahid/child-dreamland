import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/AuthComponents/Login/Login';
import SignUp from './components/AuthComponents/SignUp/SignUp';
import AddAdmin from './components/DashboardComponents/AddAdmin/AddAdmin';
import AddCourse from './components/DashboardComponents/AddCourse/AddCourse';
import Profile from './components/DashboardComponents/Profile/Profile';
import ScrollToTop from './components/SharedComponents/ScrollToTop/ScrollToTop';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard' element={<Profile />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/add-course' element={<AddCourse />} />
          <Route path='/dashboard/add-admin' element={<AddAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
