import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import c1 from '../../../images/box-1.jpg';
import c2 from '../../../images/box-2.png';
import c3 from '../../../images/box-3.jpg';
import './Category.scss';

const Category = () => {
  const allCategories = [
    {
      id: 1,
      name: 'Playground',
      description: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: c1,
    },
    {
      id: 2,
      name: 'Learning',
      description: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: c2,
    },
    {
      id: 3,
      name: 'Entertainment',
      description: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: c3,
    },
  ];

  return (
    <Container id='categories'>
      <Row>
        {allCategories.map((category) => {
          const { name, description, image, id } = category;
          return (
            <Col lg={4} md={4} sm={12} xs={12} key={id}>
              <div className='category__card'>
                <img src={image} alt={name} />
                <h2 className='main__title'>{name}</h2>
                <p>{description}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Category;
