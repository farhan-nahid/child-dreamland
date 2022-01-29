import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailSignIn, disableLoading } = useAuth();
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    emailSignIn(data.email, data.password, navigate, location);
  };

  return (
    <>
      <section id='login__page'>
        <Navigation />
        <Container className='login__container'>
          <Form id='login__form' onSubmit={handelSubmit}>
            <h3>Login</h3>
            <Form.Group className='mb-3' controlId='loginEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                autoComplete='off'
                spellCheck='false'
                name='email'
                onBlur={handelBlur}
                required
              />
              <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className='mb-5' controlId='loginPass'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your Password'
                name='password'
                onBlur={handelBlur}
                autoComplete='off'
                required
              />
            </Form.Group>
            <div className='text-center'>
              <button type='submit' className='main__button' disabled={disableLoading}>
                <span>Login</span>
              </button>
            </div>
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
