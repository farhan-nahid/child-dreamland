import axios from 'axios';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import './AddAdmin.scss';

const AddAdmin = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const admin = e.target.adminEmail.value;
    const loading = toast.loading('Adding as Admin... Please wait!!!');
    if (!/\S+@\S+\.\S+/.test(admin)) {
      toast.error('Please Enter a valid Email Address..');
    } else {
      const user = { email: admin };
      axios
        .put('https://e--pathshala.herokuapp.com/user/admin', user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ePATHSHALA_token')}`,
          },
        })
        .then((res) => {
          if (res.data.matchedCount) {
            swal({
              title: 'Good job!',
              text: `You Added ${user.email} as an Admin!`,
              icon: 'success',
              button: 'OK!',
            });
            e.target.reset();
          } else {
            toast.error('This User is not in out Database');
          }
        })
        .catch((err) => toast.error(err.message))
        .finally(() => toast.dismiss(loading));
    }
  };

  return (
    <section id='add__admin'>
      <h2>Add Admin</h2>
      <Form className='add__admin__container' onSubmit={handelSubmit}>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-5' controlId='adminEmail'>
              <Form.Label>Admin Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Admin Email'
                autoComplete='off'
                spellCheck='false'
                name='adminEmail'
                required
              />
            </Form.Group>
          </Col>

          <Col lg={12} md={12} sm={12} xs={12} className='text-center'>
            <button type='submit' className='main__button'>
              <span>Add Admin</span>
            </button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default AddAdmin;
