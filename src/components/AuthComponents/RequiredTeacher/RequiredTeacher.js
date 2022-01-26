import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequiredTeacher = ({ children, ...rest }) => {
  const { loggedInUser, isLoading } = useAuth();
  let location = useLocation();

  if (isLoading) {
    return <Spinner animation='border' />;
  }

  if (loggedInUser.position === 'Teacher') {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredTeacher;
