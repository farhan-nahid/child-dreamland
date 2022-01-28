import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { postAssignmentAsync } from '../../../feathers/assignmentsSlice';
import useAuth from '../../../hooks/useAuth';
import './AddAssignment.scss';

const AddAssignment = () => {
  const [data, setData] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser } = useAuth();

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsDisable(true);
    data.teacherName = loggedInUser.displayName;
    data.teacherImage = loggedInUser.photoURL;
    dispatch(postAssignmentAsync(data)).then((res) => {
      if (res.payload.insertedId) {
        swal({
          title: 'Good job!',
          text: `You can see the the Assignments after Signup as a student.`,
          icon: 'success',
          button: 'OK!',
        });
        e.target.reset();
        setIsDisable(false);
      }
    });
  };

  return (
    <section id='add__assignment'>
      <h2>Add Assignment</h2>
      {!loggedInUser?.emailVerified ? (
        <div className='unknown__teacher'>
          Please Check your Email Account. When you create your account we send an verification email to your account.
          Please confirm it to add assignments for students. <br /> <br />
          N:B: After Verify Your email please refresh the page
        </div>
      ) : (
        <Form className='add__assignment__container' onSubmit={handelSubmit}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Group className='mb-3' controlId='assignmentName'>
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter assignment Name'
                  autoComplete='off'
                  spellCheck='false'
                  name='assignmentName'
                  required
                  onBlur={handelBlur}
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Group className='mb-3' controlId='assignmentMark'>
                <Form.Label>Assignment Mark</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter assignment mark'
                  autoComplete='off'
                  spellCheck='false'
                  name='assignmentMark'
                  required
                  onBlur={handelBlur}
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className='text-center mt-5'>
              <button type='submit' className='main__button' disabled={isDisable}>
                <span>{isDisable ? 'Adding...' : 'Add Assignment'}</span>
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </section>
  );
};

export default AddAssignment;
