import React from 'react';
import HeroSlider from '../components/HomeComponents/HeroSlider/HeroSlider';
import OurPrincipal from '../components/HomeComponents/OurPrincipal/OurPrincipal';
import Navigation from '../components/SharedComponents/Navigation/Navigation';

const Home = () => {
  return (
    <>
      <Navigation />
      <HeroSlider />
      <OurPrincipal />
    </>
  );
};

export default Home;
