import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineFileAdd, AiOutlinePlus } from 'react-icons/ai';
import { BiHomeAlt, BiLogOut, BiUserCheck } from 'react-icons/bi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { loadSingleUsersAsync } from '../feathers/usersSlice';
import useAuth from '../hooks/useAuth';
import './Dashboard.scss';

const Dashboard = () => {
  const { isAdmin, logOut, loggedInUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadSingleUsersAsync(loggedInUser?.email));
    }
  }, [dispatch, loggedInUser]);

  const user = useSelector((state) => state?.users?.normalUsersState);

  return (
    <section id='dashboard'>
      <Row className='dashboard__container g-5'>
        <Col lg={3} md={12} sm={12} xs={12}>
          <aside>
            <NavLink className='dashboard__logo' to='/'>
              ePATHSHALA
            </NavLink>
            <ul>
              <li>
                <NavLink to='/dashboard/profile' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                  <BiUserCheck /> My Profile
                </NavLink>
              </li>
              {user.position === 'Student' && (
                <>
                  <li>
                    <NavLink to='/dashboard/my-courses' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <AiOutlineFileAdd /> My Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/my-assignments' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <BiUserCheck /> My Assignments
                    </NavLink>
                  </li>
                </>
              )}

              {user.position === 'Teacher' && (
                <>
                  <li>
                    <NavLink to='/dashboard/add-assignment' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <AiOutlinePlus /> Add Assignment
                    </NavLink>
                  </li>
                </>
              )}

              {isAdmin && (
                <>
                  <li>
                    <NavLink to='/dashboard/add-course' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <AiOutlinePlus /> Add Course
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/add-course' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <MdOutlineManageAccounts /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/add-admin' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                      <AiOutlinePlus /> Add Admin
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to='/'>
                  <BiHomeAlt /> Go Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/' onClick={logOut}>
                  <BiLogOut /> Log Out
                </NavLink>
              </li>
            </ul>
          </aside>
        </Col>
        <Col lg={9} md={12} sm={12} xs={12} className='side__bg'>
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;
