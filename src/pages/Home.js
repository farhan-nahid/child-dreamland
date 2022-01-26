import React from 'react';
import AllCourses from '../components/HomeComponents/AllCourses/AllCourses';
import AllTeacher from '../components/HomeComponents/AllTeachers/AllTeacher';
import HeroSlider from '../components/HomeComponents/HeroSlider/HeroSlider';
import OurPrincipal from '../components/HomeComponents/OurPrincipal/OurPrincipal';
import Footer from '../components/SharedComponents/Footer/Footer';
import Navigation from '../components/SharedComponents/Navigation/Navigation';

const Home = () => {
  return (
    <>
      <Navigation />
      <HeroSlider />
      <OurPrincipal />
      <AllCourses />
      <AllTeacher />
      <Footer />
    </>
  );
};

export default Home;
