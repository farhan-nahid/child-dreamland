import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import t1 from '../../../images/t1.jpg';
import t2 from '../../../images/t2.jpg';
import t3 from '../../../images/t3.jpg';
import t4 from '../../../images/t4.jpg';
import t5 from '../../../images/t5.jpg';
import t6 from '../../../images/t6.jpg';
import t7 from '../../../images/t7.jpg';
import t8 from '../../../images/t8.jpg';
import TeacherCard from '../TeacherCard/TeacherCard';
import './AllTeacher.scss';

const teachers = [
  {
    id: 1,
    name: 'Betty Hairston',
    skill: 'Computer Programming',
    location: 'Dhaka, Bangladesh',
    image: t1,
  },
  {
    id: 2,
    name: 'Aaron Pietrzak',
    skill: 'UNIX,Calculus,Trigonometry',
    location: 'Paris, Paris',
    image: t2,
  },
  {
    id: 3,
    name: 'Brian Martinez',
    skill: 'ASP.NET,Computer Gaming',
    location: 'Barcelona, Spain',
    image: t3,
  },
  {
    id: 4,
    name: 'Misty Lundy',
    skill: 'Digital, Marketer',
    location: 'Kleinsolk, Austria',
    image: t4,
  },
  {
    id: 5,
    name: 'Jose Anderson',
    skill: 'English Speaking',
    location: 'Minolos, Philippines',
    image: t5,
  },
  {
    id: 6,
    name: 'Christopher Carroll',
    skill: 'SEO Expert',
    location: 'Manavadar, India',
    image: t6,
  },
  {
    id: 7,
    name: 'Jessica Fogarty',
    skill: 'Python Programming',
    location: 'Sobolivka, Ukraine',
    image: t7,
  },
  {
    id: 8,
    name: 'Evelyn Stafford',
    skill: 'Graphics Design',
    location: 'Pegongan, Indonesia',
    image: t8,
  },
];

const AllTeacher = () => {
  useEffect(() => {
    axios.get('http://localhost:5000/orders/test@student6.com').then((res) => console.log(res.data));
  }, []);
  return (
    <section id='all__teachers'>
      <Container>
        <h6 className='sub__title text-center'>
          <AiOutlineStar /> HARE OUR MENTORS <AiOutlineStar />
        </h6>
        <h4 className='main__title text-center'>OUR POPULAR MENTORS</h4>
        <div className='all__teachers__container'>
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllTeacher;
