import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequiredAdmin = ({ children, ...rest }) => {
  const { loggedInUser, isLoading, isAdmin } = useAuth();
  let location = useLocation();

  if (isLoading) {
    return <Spinner animation='border' />;
  }

  if (loggedInUser && isAdmin) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredAdmin;
