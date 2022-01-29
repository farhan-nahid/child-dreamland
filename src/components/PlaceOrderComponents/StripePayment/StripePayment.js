import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPaymentIntent, emptyPrev, postOrdersAsync } from '../../../feathers/ordersSlice';

const StripePayment = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phNumber, fullName, email, position, name, price } = data;
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    dispatch(createPaymentIntent(data));
    dispatch(emptyPrev());
  }, [dispatch, data]);

  const clientSecret = useSelector((state) => state.orders.clientSecret);

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '15px',
        color: '#424770',
        '::placeholder': {
          fontSize: '15px',
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#DC3545',
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardNumberElement);

    if (!clientSecret || !stripe || !elements || card === null) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setProcessing(false);
      return toast.error(error.message);
    } else {
      paymentMethod.billing_details.email = email;
      paymentMethod.billing_details.name = fullName;
      paymentMethod.billing_details.phone = phNumber;
      paymentMethod.billing_details.position = position;
      paymentMethod.billing_details.courseName = name;
      paymentMethod.billing_details.coursePrice = price;
    }

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (intentError) {
      return toast.error(intentError);
    }

    if (paymentIntent.status.toLowerCase() === 'succeeded') {
      dispatch(postOrdersAsync(paymentMethod))
        .then((res) => {
          if (res.payload.insertedId) {
            event.target.reset();
            setProcessing(false);
            toast.success('Payment Successful');
            navigate('/dashboard/my-courses');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Your Address</Form.Label>
            <Form.Control type='text' required autoComplete='off' spellCheck='false' placeholder='Enter Your Address' />
          </Form.Group>
        </Col>

        <Col lg={6} md={6} sm={12} xs={12}>
          <Form.Group className='mb-3' controlId='cardNumber'>
            <Form.Label>Card Number</Form.Label>
            <CardNumberElement className='form-control' options={ELEMENT_OPTIONS} />
          </Form.Group>
        </Col>

        <Col lg={6} md={6} sm={12} xs={12}>
          <Form.Group className='mb-3' controlId='cardCvc'>
            <Form.Label>Card CVC</Form.Label>
            <CardCvcElement className='form-control' options={ELEMENT_OPTIONS} />
          </Form.Group>
        </Col>

        <Col lg={6} md={6} sm={12} xs={12}>
          <Form.Group className='mb-3' controlId='cardExpiry'>
            <Form.Label>Card Expiry</Form.Label>
            <CardExpiryElement className='form-control' options={ELEMENT_OPTIONS} />
          </Form.Group>
        </Col>

        {clientSecret ? (
          <Col lg={12} md={12} sm={12} xs={12} className='text-center mt-5 pt-5'>
            {!processing ? (
              <button className='main__button' disabled={!stripe}>
                <span>Place Order</span>
              </button>
            ) : (
              <Spinner animation='border' />
            )}
          </Col>
        ) : (
          <div className='text-center'>
            <Spinner animation='border' />
          </div>
        )}
      </Row>
    </Form>
  );
};

export default StripePayment;
