import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import './Profile.scss';

const Profile = () => {
  const { loggedInUser, logOut } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleUsersAsync(loggedInUser.email));
  }, [dispatch, loggedInUser]);

  const user = useSelector((state) => state.users);

  const { email, fullName, password, phNumber, position, userImage } = user.normalUsersState;

  return (
    <section id='my__profile'>
      <h2>My Profile</h2>
      {user.status === 'Pending' ? (
        <PreLoader />
      ) : (
        <div className='profile__container'>
          <div className='profile__image'>
            <img src={userImage} alt={fullName} />
          </div>
          <h5 className={loggedInUser?.emailVerified ? 'verified' : 'unVerified'}>
            {loggedInUser?.emailVerified ? 'Verified' : 'Not Verified'}
          </h5>
          <h4>{fullName}</h4>
          <p>Phone Number: {phNumber}</p>
          <p>Position: {position}</p>
          <p>Password: {password}</p>
          <p>Email Address: {email}</p>
          <button className='main__button' onClick={logOut}>
            <span>log Out</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Profile;
