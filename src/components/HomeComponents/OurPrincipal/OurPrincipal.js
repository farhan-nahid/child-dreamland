import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { BiPaperPlane } from 'react-icons/bi';
import principalImg from '../../../images/principal.jpg';
import './OurPrincipal.scss';

const OurPrincipal = () => {
  return (
    <section id='principal'>
      <Container className='principal__container'>
        <Row className='g-5 align-items-center'>
          <Col lg={5} md={5} sm={12} xs={12} className='principal__image'>
            <img src={principalImg} alt='principalImg' />
          </Col>
          <Col lg={7} md={7} sm={12} xs={12} className='principal__content'>
            <h6 className='sub__title'>
              <AiOutlineStar /> MEET OUR STAR <AiOutlineStar />
            </h6>
            <h4 className='main__title'>MEET OUR PRINCIPAL</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <p className='my-4'>
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout.
            </p>
            <h6 className='sub__title'>Mr JOHN DOE, M.D, P.C</h6>
            <button className='main__button'>
              <span>
                <BiPaperPlane /> Know More
              </span>
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurPrincipal;
