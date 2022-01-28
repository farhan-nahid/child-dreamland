import axios from 'axios';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { postCoursesAsync } from '../../../feathers/coursesSlice';
import './AddCourse.scss';

const AddCourse = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set('key', '1c7b42d86523b93639ae849aae708b2e');
    imageData.append('image', e.target.files[0]);
    const loading = toast.loading('Uploading... Please wait!');
    axios
      .post('https://api.imgbb.com/1/upload', imageData)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Successfully Upload The Image...!!!');
          setImage(res.data.data.display_url);
        }
      })
      .catch((error) => toast.error(error.message))
      .finally(() => toast.dismiss(loading));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    data.image = image;
    if (!image) {
      toast.error('Please Upload a Image');
    } else {
      dispatch(postCoursesAsync(data)).then((res) => {
        if (res.payload.insertedId) {
          swal({
            title: 'Good job!',
            text: `${data.name} is successfully Added!`,
            icon: 'success',
            button: 'OK!',
          });
          e.target.reset();
        }
      });
    }
  };

  return (
    <section id='add__course'>
      <h2>Add Course</h2>
      <Form className='add__course__container' onSubmit={handelSubmit}>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='courseName'>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course Name'
                autoComplete='off'
                spellCheck='false'
                name='name'
                required
                onBlur={handelBlur}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='mentorName'>
              <Form.Label>Mentor Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Mentor Name'
                autoComplete='off'
                spellCheck='false'
                name='mentor'
                required
                onBlur={handelBlur}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className='mb-3' controlId='priceCourse'>
              <Form.Label>Course Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Course Price'
                autoComplete='off'
                spellCheck='false'
                name='price'
                required
                onBlur={handelBlur}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group controlId='image' className='mb-5'>
              <Form.Label>Your Image</Form.Label>
              <Form.Control type='file' onChange={handleImageUpload} />
            </Form.Group>
          </Col>

          <Col lg={12} md={12} sm={12} xs={12} className='text-center'>
            <button type='submit' className='main__button'>
              <span>Add Course</span>
            </button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default AddCourse;
