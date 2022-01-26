import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineUserAdd } from 'react-icons/ai';
import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Dashboard.scss';

const Dashboard = () => {
  const { isAdmin, logOut } = useAuth();

  return (
    <>
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
                    <AiOutlineUserAdd /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/all-students' className={(navInfo) => (navInfo.isActive ? 'active' : '')}>
                    <AiOutlineUserAdd /> All Students
                  </NavLink>
                </li>
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
    </>
  );
};

export default Dashboard;
