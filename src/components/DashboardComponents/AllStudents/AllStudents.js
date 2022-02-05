import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersAsync } from '../../../feathers/usersSlice';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import './AllStudents.scss';

const AllStudents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(loadUsersAsync('Student'));
  }, [dispatch]);

  const students = useSelector((state) => state.users);

  return (
    <Container id='all__students'>
      <h2>All Students</h2>
      {students.status.loadAllUser === 'Pending' ? (
        <PreLoader />
      ) : (
        <Table striped bordered hover responsive className='students__table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Attendance</th>
              <th>Average</th>
              <th>Gender</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {students.allUsers.map((student, idx) => {
              const { gender, className, _id, attendance, avgMark, fullName, religion, userImage } = student;

              return (
                <tr key={_id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={userImage} alt={fullName} />
                  </td>
                  <td>{fullName}</td>
                  <td>{className}</td>
                  <td>{attendance}%</td>
                  <td>{avgMark}</td>
                  <td>{gender}</td>
                  <td>{religion}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AllStudents;
