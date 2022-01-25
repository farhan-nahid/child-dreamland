import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/AuthComponents/Login/Login';
import RequiredAdmin from './components/AuthComponents/RequiredAdmin/RequiredAdmin';
import RequiredAuth from './components/AuthComponents/RequiredAuth/RequiredAuth';
import SignUp from './components/AuthComponents/SignUp/SignUp';
import AddAdmin from './components/DashboardComponents/AddAdmin/AddAdmin';
import AddCourse from './components/DashboardComponents/AddCourse/AddCourse';
import Profile from './components/DashboardComponents/Profile/Profile';
import ScrollToTop from './components/SharedComponents/ScrollToTop/ScrollToTop';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route
          path='/dashboard'
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          <Route
            path='/dashboard'
            element={
              <RequiredAuth>
                <Profile />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/profile'
            element={
              <RequiredAuth>
                <Profile />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/add-course'
            element={
              <RequiredAdmin>
                <AddCourse />
              </RequiredAdmin>
            }
          />
          <Route
            path='/dashboard/add-admin'
            element={
              <RequiredAdmin>
                <AddAdmin />
              </RequiredAdmin>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
