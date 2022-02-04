import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import s1 from '../../../images/icons/icon-1.png';
import s2 from '../../../images/icons/icon-2.png';
import s3 from '../../../images/icons/icon-3.png';
import s4 from '../../../images/icons/icon-4.png';
import s5 from '../../../images/icons/icon-5.png';
import s6 from '../../../images/icons/icon-6.png';
import './Services.scss';

const Services = () => {
  const allServices = [
    {
      id: 1,
      name: 'Play Time',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s1,
    },
    {
      id: 2,
      name: 'Daycare',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s2,
    },
    {
      id: 3,
      name: 'Learning',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s3,
    },
    {
      id: 4,
      name: 'Outdoors',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s4,
    },
    {
      id: 5,
      name: 'Healthy Meals',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s5,
    },
    {
      id: 6,
      name: 'Events',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image: s6,
    },
  ];

  return (
    <section id='all__services'>
      <Container>
        <h6 className='sub__title text-center'>
          <AiOutlineStar /> HARE OUR SERVICES <AiOutlineStar />
        </h6>
        <h4 className='main__title text-center'>SERVICES WE PROVIDE</h4>
        <Row className='g-5'>
          {allServices.map((service) => {
            const { name, id, description, image } = service;

            return (
              <Col lg={4} md={6} sm={12} xs={12} key={id}>
                <div className='service__card'>
                  <div>
                    <img src={image} alt={name} />
                  </div>
                  <div className='service__description'>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
