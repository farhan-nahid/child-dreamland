import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { loadSingleUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';

const RequiredStudent = ({ children, ...rest }) => {
  const { loggedInUser, isLoading } = useAuth();
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadSingleUsersAsync(loggedInUser?.email));
    }
  }, [dispatch, loggedInUser]);

  const user = useSelector((state) => state?.users?.normalUsersState);

  if (isLoading) {
    return <PreLoader />;
  }

  if (user.position === 'Student') {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredStudent;
