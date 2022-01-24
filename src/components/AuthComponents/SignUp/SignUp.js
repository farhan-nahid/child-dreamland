import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import './signUp.scss';

const SignUp = () => {
  return (
    <>
      <section id='register__page'>
        <Navigation />
        <Container className='register__container'>
          <Form id='register__form'>
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
                    spellCheck='false'
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email address' autoComplete='off' spellCheck='false' />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerNumber'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type='email' placeholder='Enter Phone Number' autoComplete='off' spellCheck='false' />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='type' className='mb-3'>
                  <Form.Label>Your Position</Form.Label>
                  <Form.Select size='sm'>
                    <option>Student</option>
                    <option>Teacher</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='image' className='mb-3'>
                  <Form.Label>Your Image</Form.Label>
                  <Form.Control type='file' />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12} className='mb-3'>
                <Form.Group className='mb-3' controlId='about'>
                  <Form.Label>Something About Yourself</Form.Label>
                  <Form.Control as='textarea' rows={5} />
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
