import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadSingleUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import warning from '../../../images/warning.svg';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import './Profile.scss';

const Profile = () => {
  const [show, setShow] = useState(true);
  const { loggedInUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(loadSingleUsersAsync(loggedInUser.email));
  }, [dispatch, loggedInUser]);

  const user = useSelector((state) => state.users);
  const { email, fullName, position, userImage, gender, religion, className, birthDate, description, address, motherName, fatherName, phNumber } =
    user.normalUsersState;

  return (
    <section id='my__profile' className='container'>
      <h2>My Profile</h2>
      {user.status.loadUser === 'Pending' ? (
        <PreLoader />
      ) : (
        <div className='profile__container'>
          <h3> About Me</h3>

          <h5 className={loggedInUser?.emailVerified ? 'verified' : 'unVerified'}>{loggedInUser?.emailVerified ? 'Verified' : 'Not Verified'}</h5>

          <span className='edit__button' onClick={() => navigate(`/dashboard/edit-profile/${email}`)}>
            <AiOutlineEdit />
          </span>

          <div className='profile__head'>
            <span>
              <img src={userImage} alt={fullName} />
            </span>
            <span>
              <h3>{fullName}</h3>
              <p>{description ? description : 'Hare will be Your Short Description...'}</p>
            </span>
          </div>

          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{fullName}</td>
              </tr>
              <tr>
                <td>Email Address:</td>
                <td>{email}</td>
              </tr>

              {fatherName && (
                <tr>
                  <td>Father's Name:</td>
                  <td>{fatherName}</td>
                </tr>
              )}
              {motherName && (
                <tr>
                  <td>Mother's Name:</td>
                  <td>{motherName}</td>
                </tr>
              )}
              {phNumber && (
                <tr>
                  <td>Phone Number:</td>
                  <td>{phNumber}</td>
                </tr>
              )}
              <tr>
                <td>Position:</td>
                <td>{position}</td>
              </tr>
              {className && (
                <tr>
                  <td>Class:</td>
                  <td>{className}</td>
                </tr>
              )}
              <tr>
                <td>Gender:</td>
                <td>{gender}</td>
              </tr>
              {religion && (
                <tr>
                  <td>Religion:</td>
                  <td>{religion}</td>
                </tr>
              )}
              <tr>
                <td>Account Created:</td>
                <td>{loggedInUser.metadata.creationTime.slice(0, 16)}</td>
              </tr>
              {birthDate && (
                <tr>
                  <td>Birth Date:</td>
                  <td>{birthDate}</td>
                </tr>
              )}
              {address && (
                <tr>
                  <td>Address:</td>
                  <td>{address}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {!loggedInUser?.emailVerified && (
        <Toast show={show} onClose={() => setShow(false)} className='profile__toast'>
          <Toast.Header>
            <img src={warning} className='me-2' alt='warning' />
            <strong className='me-auto'>Warning</strong>
          </Toast.Header>
          <Toast.Body>
            <h3>We send an verification mail to your email. Please confirm it..</h3>
          </Toast.Body>
        </Toast>
      )}
    </section>
  );
};

export default Profile;
