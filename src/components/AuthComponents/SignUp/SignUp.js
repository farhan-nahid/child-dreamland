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
  const { emailSignup } = useAuth();
  const [data, setData] = useState({});
  const [image, setImage] = useState('');

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

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
    e.preventDefault();
    if (data.pass1 !== data.pass2) {
      return toast.error('Password not Matched..');
    } else if (data.pass1.length < 8) {
      toast.error('Your Password must have 8 characters...');
    } else if (!/(?=.*?[A-Z])/.test(data.pass1)) {
      toast.error('Password should be at least 1 Uppercase');
    } else if (!/(?=.*?[0-9])/.test(data.pass1)) {
      toast.error('Password should be at least 1 Number');
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(data.pass1)) {
      toast.error('Password should be at least 1 Spacial character');
    } else if (data.phNumber.length <= 10) {
      return toast.error('Your Phone Number must have 11 digit..');
    } else {
      data.fullName = `${data.fName} ${data.lName}`;
      data.userImage = image;
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
                    onBlur={handelBlur}
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
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email address'
                    autoComplete='off'
                    spellCheck='false'
                    name='email'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerNumber'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Phone Number'
                    autoComplete='off'
                    spellCheck='false'
                    name='phNumber'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' name='pass1' required onBlur={handelBlur} />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    name='pass2'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='type' className='mb-3'>
                  <Form.Label>Your Position</Form.Label>
                  <Form.Select size='sm' name='position' required onBlur={handelBlur}>
                    <option>Student</option>
                    <option>Teacher</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='image' className='mb-3'>
                  <Form.Label>Your Image</Form.Label>
                  <Form.Control type='file' onChange={handleImageUpload} />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12} className='mb-3'>
                <Form.Group className='mb-3' controlId='about'>
                  <Form.Label>Something About Yourself</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    spellCheck='false'
                    required
                    onBlur={handelBlur}
                    placeholder='Describe some word about Yourself (1-150)'
                  />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12} className='text-center'>
                <button type='submit' className='main__button'>
                  <span>Register</span>
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
