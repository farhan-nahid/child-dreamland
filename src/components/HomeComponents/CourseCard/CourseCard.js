import React from 'react';

const CourseCard = ({ course: { image, name, price, mentor } }) => {
  return (
    <div className='course__card'>
      <img src={image} alt={name} />
      <h6>${price}</h6>
      <h4>{name}</h4>
      <h5>{mentor}</h5>
    </div>
  );
};

export default CourseCard;
