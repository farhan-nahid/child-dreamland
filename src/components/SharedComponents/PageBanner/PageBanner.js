import React from 'react';
import './PageBanner.scss';

const PageBanner = ({ text }) => {
  return (
    <div className='place__order__header'>
      {/* <Navigation /> */}
      <h1 className='container'>{text}</h1>
    </div>
  );
};

export default PageBanner;
