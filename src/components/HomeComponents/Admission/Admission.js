import React from 'react';
import './Admission.scss';

const Admission = () => {
  return (
    <section id='home__admission'>
      <h2>Kindergarten Admission call to action</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' placeholder='Your Name' autoComplete='false' />
        <input type='email' placeholder='Your Email' autoComplete='false' />
        <button className='main__button'>
          <span>Submit</span>
        </button>
      </form>
    </section>
  );
};

export default Admission;
