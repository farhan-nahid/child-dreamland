import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const StripePayment = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { phNumber, fullName, email, position, name, price } = data;
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axios
      .post('http://localhost:5000/create-payment-intent', data)
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => toast.error(err.message));
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setProcessing(false);
      toast.error(error.message);
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

    intentError && toast.error(intentError);

    if (paymentIntent.status === 'succeeded') {
      axios
        .post('http://localhost:5000/add-order', paymentMethod)
        .then((res) => {
          if (res.data.insertedId) {
            event.target.reset();
            setProcessing(false);
            toast.success('Payment Successful');
            navigate('/dashboard/my-courses');
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} className='mt-4 mb-5 pb-5'>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12} className='text-center'>
          {!processing ? (
            <button className='main__button' disabled={!stripe}>
              <span>Place Order</span>
            </button>
          ) : (
            <Spinner animation='border' />
          )}
        </Col>
      </Row>
    </form>
  );
};

export default StripePayment;
