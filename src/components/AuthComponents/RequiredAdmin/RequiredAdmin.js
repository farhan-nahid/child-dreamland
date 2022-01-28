import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAdminUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';

const RequiredAdmin = ({ children, ...rest }) => {
  const { loggedInUser, isLoading } = useAuth();
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(checkAdminUsersAsync(loggedInUser.email));
  }, [dispatch, loggedInUser.email]);

  const admin = useSelector((state) => state.users);

  if (admin.status.isAdmin === 'Pending') {
    return <PreLoader />;
  }

  if (isLoading) {
    return <PreLoader />;
  }

  if (loggedInUser && admin.isAdmin) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredAdmin;
