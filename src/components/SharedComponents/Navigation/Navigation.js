import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';

const Navigation = () => {
  return (
    <Navbar expand='lg' id='navigation'>
      <Container>
        <Navbar.Brand href='#home'>ePATHSHALA</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='#link'>About</Nav.Link>
            <Nav.Link href='#home'>Admission</Nav.Link>
            <Nav.Link href='#home'>Events</Nav.Link>
            <Nav.Link href='#home'>Contact</Nav.Link>
            <Nav.Link href='#home'>login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
