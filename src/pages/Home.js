import React, { useEffect } from 'react';
import Admission from '../components/HomeComponents/Admission/Admission';
import AllCourses from '../components/HomeComponents/AllCourses/AllCourses';
import AllTeacher from '../components/HomeComponents/AllTeachers/AllTeacher';
import Category from '../components/HomeComponents/Category/Category';
import HeroSlider from '../components/HomeComponents/HeroSlider/HeroSlider';
import LearningSystem from '../components/HomeComponents/LearningSystem/LearningSystem';
import OurPrincipal from '../components/HomeComponents/OurPrincipal/OurPrincipal';
import Services from '../components/HomeComponents/Services/Services';
import Footer from '../components/SharedComponents/Footer/Footer';
import Navigation from '../components/SharedComponents/Navigation/Navigation';

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Navigation />
      <HeroSlider />
      <Category />
      <OurPrincipal />
      <Services />
      <AllCourses />
      <LearningSystem />
      <AllTeacher />
      <Admission />
      <Footer />
    </>
  );
};

export default Home;
