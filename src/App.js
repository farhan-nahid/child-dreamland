import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/AuthComponents/Login/Login';
import RequiredAdmin from './components/AuthComponents/RequiredAdmin/RequiredAdmin';
import RequiredAuth from './components/AuthComponents/RequiredAuth/RequiredAuth';
import RequiredStudent from './components/AuthComponents/RequiredStudent/RequiredStudent';
import RequiredTeacher from './components/AuthComponents/RequiredTeacher/RequiredTeacher';
import SignUp from './components/AuthComponents/SignUp/SignUp';
import AddAdmin from './components/DashboardComponents/AddAdmin/AddAdmin';
import AddAssignment from './components/DashboardComponents/AddAssignment/AddAssignment';
import AddCourse from './components/DashboardComponents/AddCourse/AddCourse';
import CourseContent from './components/DashboardComponents/CourseContent/CourseContent';
import EditProfile from './components/DashboardComponents/EditProfile/EditProfile';
import MyAssignment from './components/DashboardComponents/MyAssignment/MyAssignment';
import MyCourses from './components/DashboardComponents/MyCourses/MyCourses';
import Profile from './components/DashboardComponents/Profile/Profile';
import ScrollToTop from './components/SharedComponents/ScrollToTop/ScrollToTop';
import AdMisson from './pages/AdMisson';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PlaceOrder from './pages/PlaceOrder';

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
        <Route path='/admission' element={<AdMisson />} />
        <Route
          path='/place-order/:id'
          element={
            <RequiredAuth>
              <PlaceOrder />
            </RequiredAuth>
          }
        />

        <Route
          path='/dashboard'
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          <Route
            path='/dashboard/profile'
            element={
              <RequiredAuth>
                <Profile />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/edit-profile/:email'
            element={
              <RequiredAuth>
                <EditProfile />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/my-courses'
            element={
              <RequiredAuth>
                <MyCourses />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/course-content/:name'
            element={
              <RequiredAuth>
                <CourseContent />
              </RequiredAuth>
            }
          />
          <Route
            path='/dashboard/add-assignment'
            element={
              <RequiredTeacher>
                <AddAssignment />
              </RequiredTeacher>
            }
          />
          <Route
            path='/dashboard/course-assignments'
            element={
              <RequiredStudent>
                <MyAssignment />
              </RequiredStudent>
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
