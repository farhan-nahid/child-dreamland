import React, { useEffect } from 'react';
import Footer from '../components/SharedComponents/Footer/Footer';
import Navigation from '../components/SharedComponents/Navigation/Navigation';
import PageBanner from '../components/SharedComponents/PageBanner/PageBanner';

const AdMisson = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Navigation />
      <PageBanner text='ADMISSION' />
      <Footer />
    </>
  );
};

export default AdMisson;
