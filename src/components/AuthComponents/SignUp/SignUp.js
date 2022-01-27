import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import './signUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const { emailSignup, disableLoading } = useAuth();

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set('key', '1c7b42d86523b93639ae849aae708b2e');
    imageData.append('image', e.target.files[0]);
    const loading = toast.loading('Uploading... Please wait!');
    axios
      .post('https://api.imgbb.com/1/upload', imageData)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Successfully Upload The Image...!!!');
          setImage(res.data.data.display_url);
        }
      })
      .catch((error) => toast.error(error.message))
      .finally(() => toast.dismiss(loading));
  };

  const handelSubmit = (e) => {
    const pass1 = e.target.pass1.value;
    const pass2 = e.target.pass2.value;
    const phNumber = e.target.phNumber.value;

    e.preventDefault();
    if (pass1 !== pass2) {
      return toast.error('Password not Matched..');
    } else if (pass1.length < 8) {
      toast.error('Your Password must have 8 characters...');
    } else if (!/(?=.*?[A-Z])/.test(pass1)) {
      toast.error('Password should be at least 1 Uppercase');
    } else if (!/(?=.*?[0-9])/.test(pass1)) {
      toast.error('Password should be at least 1 Number');
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(pass1)) {
      toast.error('Password should be at least 1 Spacial character');
    } else if (phNumber.length !== 11) {
      return toast.error('Your Phone Number must have 11 digit..');
    } else if (!image) {
      return toast.error('Please Upload Your Image..');
    } else {
      const data = {};
      data.fullName = `${e.target.fName.value.trim()} ${e.target.lName.value.trim()}`;
      data.email = e.target.email.value;
      data.password = pass1;
      data.phNumber = phNumber;
      data.position = e.target.position.value;
      data.userImage = image;
      data.approvedTeacher = false;
      emailSignup(data, navigate);
    }
  };

  return (
    <>
      <section id='register__page'>
        <Navigation />
        <Container className='register__container'>
          <Form id='register__form' onSubmit={handelSubmit}>
            <h3>Register</h3>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerFirstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Your First Name'
                    autoComplete='name-fs'
                    spellCheck='false'
                    name='fName'
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerLastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Your Last Name'
                    autoComplete='name-ls'
                    name='lName'
                    spellCheck='false'
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email Address (EX:pathshala@gmail.com)'
                    autoComplete='off'
                    spellCheck='false'
                    name='email'
                    required
                  />
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
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' name='pass1' required />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' name='pass2' required />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='type' className='mb-3'>
                  <Form.Label>Your Position</Form.Label>
                  <Form.Select size='sm' name='position' required>
                    <option value='Student'>Student</option>
                    <option value='Teacher'>Teacher</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='image' className='mb-5'>
                  <Form.Label>Your Image</Form.Label>
                  <Form.Control type='file' onChange={handleImageUpload} />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12} className='text-center'>
                <button type='submit' className='main__button' disabled={disableLoading}>
                  <span>{disableLoading ? 'loading...' : 'Register'}</span>
                </button>
              </Col>
            </Row>
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </Form>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
