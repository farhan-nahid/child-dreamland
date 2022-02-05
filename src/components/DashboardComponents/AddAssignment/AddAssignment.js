import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
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
    setIsDisable(true);
    if (data.assignmentName.length > 70) {
      data.assignmentName = `${data.assignmentName.slice(0, 70)} ...`;
    }
    if (!data.assignmentMark) {
      data.assignmentMark = 5;
    }
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
    <Container id='add__assignment'>
      <h2>Add Assignment</h2>
      {!loggedInUser?.emailVerified ? (
        <div className='unknown__teacher'>
          Please Check your Email Account. When you create your account we send an verification email to your account. Please confirm it to add
          assignments for students. <br /> <br />
          N:B: After Verify Your email please refresh the page
        </div>
      ) : (
        <Form className='add__assignment__container' onSubmit={handelSubmit}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Group className='mb-3' controlId='assignmentName'>
                <Form.Label>Assignment Topic</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter assignment Topic in 70 letters'
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
                <Form.Select size='sm' name='assignmentMark' required onBlur={handelBlur}>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </Form.Select>
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
    </Container>
  );
};

export default AddAssignment;
