import React from 'react';
import { Spinner } from 'react-bootstrap';
import './PreLoader.scss';

const PreLoader = () => {
  return (
    <section id='pre__loader'>
      <Spinner animation='border' />
    </section>
  );
};

export default PreLoader;
