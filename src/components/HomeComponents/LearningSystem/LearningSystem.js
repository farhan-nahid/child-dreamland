import React from 'react';
import { Container } from 'react-bootstrap';
import './LearningSystem.scss';

const LearningSystem = () => {
  return (
    <section id='learning__system'>
      <Container>
        <div className='learn__system__card'>
          <h4 className='main__title'>Learning System</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <button className='main__button'>
            <span>Know More</span>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default LearningSystem;
