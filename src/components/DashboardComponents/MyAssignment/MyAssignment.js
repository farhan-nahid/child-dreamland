import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadAssignmentAsync } from '../../../feathers/assignmentsSlice';
import { loadOrdersAsync } from '../../../feathers/ordersSlice';
import useAuth from '../../../hooks/useAuth';
import './MyAssignment.scss';

const MyAssignment = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(loadOrdersAsync(loggedInUser.email));
    dispatch(loadAssignmentAsync());
  }, [dispatch, loggedInUser.email]);

  const assignments = useSelector((state) => state.assignments);

  return (
    <Container id='my__assignments'>
      <h2>Class Assignments</h2>
      <>
        {loggedInUser?.emailVerified ? (
          <div className='unknown__student'>
            Please Check your Email Account. When you create your account we send an verification email to your account. Please confirm it to see your
            assignments. <br /> <br />
            N:B: After Verify Your email please refresh the page
          </div>
        ) : (
          <Table striped bordered hover responsive className='assignment__table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Teacher Name</th>
                <th>Assignment Topic</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {assignments.assignmentsState.map((assignment, idx) => {
                const { teacherName, teacherImage, _id, assignmentName, assignmentMark } = assignment;

                return (
                  <tr key={_id}>
                    <td>{idx + 1}</td>
                    <td>
                      <img src={teacherImage} alt={teacherName} />
                    </td>
                    <td>{teacherName}</td>
                    <td>{assignmentName}</td>
                    <td>{assignmentMark}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </>
    </Container>
  );
};

export default MyAssignment;
