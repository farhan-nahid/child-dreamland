import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyOrder, loadOrdersAsync } from '../../../feathers/ordersSlice';
import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import './MyCourses.scss';

const MyCourses = () => {
  const { loggedInUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(loadOrdersAsync(loggedInUser.email));
    dispatch(emptyOrder());
  }, [dispatch, loggedInUser]);

  const orders = useSelector((state) => state.orders);

  return (
    <section id='my__course'>
      <h2>My Course </h2>
      {orders.status === 'Success' && !orders.ordersState.length && (
        <div className='placeholder__text'>
          <span>You don't Buy any Course</span>
        </div>
      )}

      {orders.status === 'Pending' ? (
        <PreLoader />
      ) : (
        <Row className='g-5 course__container'>
          {orders.ordersState.map((order, idx) => {
            const { courseName } = order.billing_details;

            return (
              <Col key={idx} lg={6} md={6} sm={12} xs={12}>
                <div className='order__card'>
                  <div className='order__banner'>
                    <h3>{courseName}</h3>
                  </div>
                  <button className='main__button' onClick={() => navigate(`/dashboard/course-content/${courseName}`)}>
                    <span>See Content</span>
                  </button>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </section>
  );
};

export default MyCourses;
