import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import './Login.scss';

const Login = () => {
  return (
    <>
      <section id='login__page'>
        <Navigation />
        <Container className='login__container'>
          <Form id='login__form'>
            <h3>Login</h3>
            <Form.Group className='mb-3' controlId='loginEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email address' autoComplete='off' spellCheck='false' />
              <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='loginPass'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='Your password' placeholder='Password' />
            </Form.Group>
            <button type='submit' className='main__button'>
              <span>Login</span>
            </button>
            <p>
              Don’t have an account? <Link to='/register'>Register</Link>
            </p>
          </Form>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Login;
