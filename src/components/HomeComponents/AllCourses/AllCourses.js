import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { loadCoursesAsync } from '../../../feathers/coursesSlice';
import CourseCard from '../CourseCard/CourseCard';
import './AllCourses.scss';

const AllCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCoursesAsync());
  }, [dispatch]);

  const courses = useSelector((state) => state.courses.coursesState);

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id='all__courses'>
      <Container>
        <h6 className='sub__title text-center'>
          <AiOutlineStar /> HARE OUR COURSES <AiOutlineStar />
        </h6>
        <h4 className='main__title text-center'>OUR ALL TIME BEST COURSES</h4>
        <div className='all__courses__container'>
          <Slider {...settings}>
            {courses?.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default AllCourses;
