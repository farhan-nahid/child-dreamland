import React from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './CourseContent.scss';

const CourseContent = () => {
  const { name } = useParams();
  const { loggedInUser } = useAuth();

  return (
    <section id='course__content'>
      <h2>
        Welcome back <span>{loggedInUser.displayName}</span>,
      </h2>
      <h2>ready for your lesson?</h2>
      <h3>Course Content of {name}</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </p>
    </section>
  );
};

export default CourseContent;
