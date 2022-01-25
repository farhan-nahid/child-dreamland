import React from 'react';
import useAuth from '../../../hooks/useAuth';
import './Profile.scss';

const Profile = () => {
  const { loggedInUser, logOut } = useAuth();

  return (
    <section id='my__profile'>
      <h2>My Profile</h2>
      <div className='profile__container'>
        <img src={loggedInUser?.photoURL} alt={loggedInUser?.displayName} />
        <h5 className={loggedInUser?.emailVerified ? 'verified' : 'unVerified'}>
          {loggedInUser?.emailVerified ? 'Verified' : 'Not Verified'}
        </h5>
        <h4>{loggedInUser?.displayName}</h4>
        <p>{loggedInUser?.email}</p>
        <button className='main__button' onClick={logOut}>
          <span>log Out</span>
        </button>
      </div>
    </section>
  );
};

export default Profile;
