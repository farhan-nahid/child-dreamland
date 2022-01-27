import React from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course: { _id, image, name, price, mentor } }) => {
  const navigate = useNavigate();

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
      <div className='card__overlay'>
        <button className='main__button' onClick={() => navigate(`/place-order/${_id}`)}>
          <span>
            <BiPaperPlane /> Enroll Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
