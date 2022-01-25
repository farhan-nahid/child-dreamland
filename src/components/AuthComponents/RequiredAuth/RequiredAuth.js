import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequiredAuth = ({ children, ...rest }) => {
  const { loggedInUser, isLoading } = useAuth();
  let location = useLocation();

  if (isLoading) {
    return <Spinner animation='border' />;
  }

  if (loggedInUser) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredAuth;
