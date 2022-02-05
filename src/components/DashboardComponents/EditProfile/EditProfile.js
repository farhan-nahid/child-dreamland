import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadSingleUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import './EditProfile.scss';

const EditProfile = () => {
  const [disableLoading, setDisableLoading] = useState();
  const { loggedInUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSingleUsersAsync(loggedInUser.email));
  }, [dispatch, loggedInUser]);

  const user = useSelector((state) => state.users.normalUsersState);
  const { birthDate, description, address, motherName, fatherName, phNumber, fullName } = user;

  const handelSubmit = (e) => {
    e.preventDefault();
    setDisableLoading(true);
    const data = {};
    data.address = e.target.address.value;
    data.fullName = e.target.address.fullName;
    data.fullName = e.target.fullName.value;
    data.phNumber = e.target.phNumber.value;
    data.birthDate = e.target.birthDate.value;
    data.motherName = e.target.motherName.value;
    data.fatherName = e.target.fatherName.value;
    data.description = e.target.description.value;

    if (data.description && data.description.length >= 150) {
      data.description = `${data.description.trim().slice(0, 150)}...`;
    }

    axios
      .put(`https://child-dreamland.herokuapp.com/edit-profile?email=${loggedInUser.email}`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Updating Successfully');
          setDisableLoading(false);
          navigate('/dashboard/profile');
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section id='edit__profile' className='container'>
      <h2>Edit Profile</h2>
      <Form id='update__form' onSubmit={handelSubmit}>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='fullName'>
              <Form.Label>Your Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Father Occupation'
                autoComplete='off'
                name='fullName'
                spellCheck='false'
                defaultValue={fullName ? fullName : ''}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='birthDate'>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type='date' name='birthDate' defaultValue={birthDate ? birthDate : ''} />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='registerNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='BD Num (EX:01700000000)'
                autoComplete='off'
                spellCheck='false'
                name='phNumber'
                defaultValue={phNumber ? phNumber : ''}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='registerFatherName'>
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Father Name'
                autoComplete='off'
                name='fatherName'
                spellCheck='false'
                defaultValue={fatherName ? fatherName : ''}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='registerMotherName'>
              <Form.Label>Mother Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Mother Name'
                autoComplete='off'
                name='motherName'
                spellCheck='false'
                defaultValue={motherName ? motherName : ''}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Your Address:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Address'
                autoComplete='off'
                name='address'
                spellCheck='false'
                defaultValue={address ? address : ''}
              />
            </Form.Group>
          </Col>

          <Col lg={12} md={12} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Description:</Form.Label>
              <textarea
                name='description'
                spellCheck='false'
                className='form-control w-100'
                rows='5'
                defaultValue={description ? description : ''}
                placeholder='Say a short summery about yourself in 150 characters...'
              ></textarea>
            </Form.Group>
          </Col>

          <Col lg={12} md={12} sm={12} xs={12} className='text-center mt-3'>
            <button type='submit' className='main__button' disabled={disableLoading}>
              <span>{disableLoading ? 'Updating ...' : 'Update Profile'}</span>
            </button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default EditProfile;
