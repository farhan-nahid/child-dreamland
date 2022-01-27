import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSingleCoursesAsync } from '../../../feathers/coursesSlice';
import { loadSingleUsersAsync } from '../../../feathers/usersSlice';
import useAuth from '../../../hooks/useAuth';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import StripePayment from '../StripePayment/StripePayment';
import './PlaceOrderFrom.scss';

const stripePromise = loadStripe(
  'pk_test_51Ie11ZIo3XVCKagbJJnefC4ruHwRuiiS8mPOiugOUPZ3F9isu6mCQJjhdMQ9SHugvc8Y6pjEGk2xYIMhOW2CpJQN00ArldL7I3'
);

const PlaceOrderFrom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadSingleUsersAsync(loggedInUser?.email));
      dispatch(loadSingleCoursesAsync(id));
    }
  }, [dispatch, loggedInUser, id]);

  const user = useSelector((state) => state?.users?.normalUsersState);
  const course = useSelector((state) => state.courses.singleCourseState);
  const { phNumber, fullName, email, position } = user;
  const { name, price } = course;

  const data = { phNumber, fullName, email, position, name, price };

  return (
    <>
      <section id='place__order'>
        <div className='place__order__header'>
          <Navigation />
          <h1 className='container'>Place Order</h1>
        </div>
        {price ? (
          <Container className='place__order__form'>
            <div className='place__stripe'>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='usName'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type='text' value={fullName && fullName} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='pdName'>
                    <Form.Label>Your Course Name</Form.Label>
                    <Form.Control type='text' value={name && name} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='pdName'>
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type='email' value={email && email} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='position'>
                    <Form.Label>Your Position</Form.Label>
                    <Form.Control type='text' value={position && position} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='phNum'>
                    <Form.Label>Your Phone Number</Form.Label>
                    <Form.Control type='text' value={phNumber && phNumber} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className='mb-3' controlId='pdPrice'>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type='text' value={price && price} required readOnly />
                  </Form.Group>
                </Col>

                <Col lg={12} md={12} sm={12} xs={12} className='mb-5'>
                  <Elements stripe={stripePromise}>
                    <StripePayment data={data} />
                  </Elements>
                </Col>
              </Row>
            </div>
          </Container>
        ) : (
          <PreLoader />
        )}
        <Footer />
      </section>
    </>
  );
};

export default PlaceOrderFrom;
