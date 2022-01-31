import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Navigation.scss';

const Navigation = () => {
  const { loggedInUser, logOut } = useAuth();

  return (
    <Navbar expand='lg' id='navigation'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          ePATHSHALA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/'>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to='/admission'>
              Admission
            </Nav.Link>
            <Nav.Link as={NavLink} to='/'>
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to='/dashboard/profile'>
              Dashboard
            </Nav.Link>
            {!loggedInUser ? (
              <Nav.Link as={NavLink} to='/login'>
                login
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Button variant='danger' onClick={logOut}>
                  Logout
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
