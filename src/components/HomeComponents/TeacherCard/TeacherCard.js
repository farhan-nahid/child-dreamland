import React from 'react';
import { Col } from 'react-bootstrap';
import { GoLocation } from 'react-icons/go';

const TeacherCard = ({ teacher: { image, name, skill, location } }) => {
  return (
    <Col lg={3} md={4} sm={12} xs={12} className='p-0'>
      <div className='teacher__card'>
        <div className='teacher__image'>
          <img src={image} alt={name} />
        </div>
        <div className='teacher__card__content'>
          <h5>{name}</h5>
          <h6>{skill}</h6>
          <p>
            <GoLocation /> {location}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default TeacherCard;
