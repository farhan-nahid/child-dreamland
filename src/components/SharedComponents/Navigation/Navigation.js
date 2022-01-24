import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
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
            <Nav.Link as={NavLink} to='/'>
              Admission
            </Nav.Link>
            <Nav.Link as={NavLink} to='/'>
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to='/'>
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to='/login'>
              login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
