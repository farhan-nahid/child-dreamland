import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './AddAdmin.scss';

const AddAdmin = () => {
  const [data, setData] = useState({});

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  return (
    <section id='add__admin'>
      <h2>Add Admin</h2>
      <Form className='add__admin__container'>
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
                onBlur={handelBlur}
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
