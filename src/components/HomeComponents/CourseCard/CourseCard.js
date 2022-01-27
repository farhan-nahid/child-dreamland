import React from 'react';

const CourseCard = ({ course: { image, name, price, mentor } }) => {
  return (
    <div className='course__card'>
      <div className='course__image'>
        <img src={image} alt={name} />
      </div>
      <h6>${price}</h6>
      <div className='course__card__content'>
        <h4>{name}</h4>
        <h5>{mentor}</h5>
      </div>
    </div>
  );
};

export default CourseCard;
