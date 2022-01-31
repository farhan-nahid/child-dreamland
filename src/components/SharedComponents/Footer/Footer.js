import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BiPaperPlane } from 'react-icons/bi';
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <section id='footer__top'>
        <Container>
          <Row className='g-5'>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className='footer__card'>
                <h5>ADMISSIONS ARE OPEN</h5>
                <p>
                  It is a long established fact that a reader will be distracted by the content of a page when looking
                  at its layout.
                </p>
                <button className='main__button' onClick={() => navigate('/admission')}>
                  <span>
                    <BiPaperPlane /> Apply now
                  </span>
                </button>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className='footer__card'>
                <h5>HAVE ANY QUERIES?</h5>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type='email'
                    placeholder='e.g. pathshala@gmail.com'
                    autoComplete='off'
                    autoCapitalize='off'
                    spellCheck='false'
                  />
                  <button type='submit'>
                    {' '}
                    <BiPaperPlane />{' '}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <footer>
        <Container>
          <h4>
            <GiGraduateCap />
          </h4>
          <h5>ePATHSHALA</h5>
          <h6>BETTER WAY TO LEARN & GROW</h6>
          <Row className='footer__container'>
            <Col lg={3} sm={6} xs={12} className='footer__item'>
              <h6>CONTACT US</h6>
              <ul>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    3768 Seabury Ct, Burlington, NC, 27215
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    +1 8910000891
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    email@pathshala.com
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} sm={6} xs={12} className='footer__item'>
              <h6>QUICK LINKS</h6>
              <ul>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Academics
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Admission
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Events
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Campus Life
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} sm={6} xs={12} className='footer__item'>
              <h6>SCHOOL TIMINGS</h6>
              <ul>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    MON - FRI 9:00 AM - 3:00 PM
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    SAT 9:00 AM - 1:00 PM
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} sm={6} xs={12} className='footer__item'>
              <h6>Teachers</h6>
              <ul>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Olivia Thomas
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Max Turner
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Jane Smith
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    John Stevens
                  </a>
                </li>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    Martha Stevens
                  </a>
                </li>
              </ul>
            </Col>
          </Row>

          <div className='social__media'>
            <ul>
              <li>
                <a href='https://www.facebook.com/dev.farhanNahid' target='_blank' rel='noopener noreferrer'>
                  <FiFacebook />
                </a>
              </li>
              <li>
                <a href='https://twitter.com/farhan__nahid' target='_blank' rel='noopener noreferrer'>
                  <FiTwitter />
                </a>
              </li>
              <li>
                <a href='https://github.com/farhan-nahid' target='_blank' rel='noopener noreferrer'>
                  <FiGithub />
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/farhan__nahid/' target='_blank' rel='noopener noreferrer'>
                  <FiInstagram />
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
