import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Toast } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import warning from '../../../images/warning.svg';
import Footer from '../../SharedComponents/Footer/Footer';
import Navigation from '../../SharedComponents/Navigation/Navigation';
import './signUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [data, setData] = useState({});
  const [isStudent, setIsStudent] = useState('Guardian');
  const [gender, setGender] = useState('Male');
  const [religion, setReligion] = useState('Islam');
  const [className, setClassName] = useState(0);
  const [show, setShow] = useState(true);
  const { emailSignup, disableLoading } = useAuth();

  const handelBlur = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value.trim();
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

    if (!image) {
      return toast.error('Please Upload a Image..');
    }

    if (data.password !== data.confirmPassword) {
      return toast.error('Password not Matched..');
    } else if (data.password.length < 8) {
      toast.error('Your Password must have 8 characters...');
    } else if (!/(?=.*?[A-Z])/.test(data.password)) {
      toast.error('Password should be at least 1 Uppercase');
    } else if (!/(?=.*?[a-z])/.test(data.password)) {
      toast.error('Password should be at least 1 Lowercase');
    } else if (!/(?=.*?[0-9])/.test(data.password)) {
      toast.error('Password should be at least 1 Number');
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(data.password)) {
      toast.error('Password should be at least 1 Spacial character');
    } else if (!image) {
      return toast.error('Please Upload Your Image..');
    } else {
      data.fullName = `${data.fName.trim()} ${data.lName.trim()}`;
      data.userImage = image;
      data.position = isStudent;
      data.gender = gender;
      delete data.fName;
      delete data.lName;
      delete data.confirmPassword;
      if (isStudent === 'Student') {
        if (!className) {
          return toast.error('Please Select a Class...');
        }
        data.className = className;
        data.religion = religion;
        emailSignup(data, navigate);
      } else {
        emailSignup(data, navigate);
      }
    }
  };

  return (
    <>
      <section id='register__page'>
        <Navigation />
        <Container className='register__container'>
          <Form id='register__form' onSubmit={handelSubmit}>
            <h3>Register</h3>
            <Toast show={show} onClose={() => setShow(false)} className='register__toast'>
              <Toast.Header>
                <img src={warning} className='me-2' alt='warning' />
                <strong className='me-auto'>Warning</strong>
              </Toast.Header>
              <Toast.Body>
                <ul>
                  <li>Password Must have 8/8+ Digits</li>
                  <li>Password Must have 1 Uppercase</li>
                  <li>Password Must have 1 Lowercase</li>
                  <li>Password Must have 1 Spacial character</li>
                  <li>Password Must have 1 Number</li>
                  <li>Phone Number Must have 11 Numbers</li>
                </ul>
              </Toast.Body>
            </Toast>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerFirstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Your First Name'
                    autoComplete='name-fs'
                    spellCheck='false'
                    name='fName'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerLastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Your Last Name'
                    autoComplete='name-ls'
                    name='lName'
                    spellCheck='false'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='type' className='mb-3'>
                  <Form.Label>Your Position</Form.Label>
                  <Form.Select size='sm' name='position' required onChange={(e) => setIsStudent(e.target.value)}>
                    <option value='Guardian'>Guardian</option>
                    <option value='Student'>Student</option>
                    <option value='Teacher'>Teacher</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='image' className='mb-3'>
                  <Form.Label>Your Image</Form.Label>
                  <Form.Control type='file' onChange={handleImageUpload} />
                </Form.Group>
              </Col>
              {isStudent === 'Student' && (
                <>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Group controlId='class' className='mb-3'>
                      <Form.Label>Class Name</Form.Label>
                      <Form.Select size='sm' name='class' required onChange={(e) => setClassName(e.target.value)}>
                        <option value='0'>Choose Your Class</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Group controlId='type' className='mb-3'>
                      <Form.Label>Your Religion</Form.Label>
                      <Form.Select size='sm' name='religion' required onChange={(e) => setReligion(e.target.value)}>
                        <option value='Islam'>Islam</option>
                        <option value='Hindu'>Hindu</option>
                        <option value='Christianity'>Christianity</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </>
              )}

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group controlId='gender' className='mb-3'>
                  <Form.Label>Your Gender</Form.Label>
                  <Form.Select size='sm' name='gender' required onChange={(e) => setGender(e.target.value)}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='others'>Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email Address (EX:pathshala@gmail.com)'
                    autoComplete='off'
                    spellCheck='false'
                    name='email'
                    required
                    onBlur={handelBlur}
                  />
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' name='password' required onBlur={handelBlur} />
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Group className='mb-3' controlId='registerPass2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' required onBlur={handelBlur} />
                </Form.Group>
              </Col>

              <Col lg={12} md={12} sm={12} xs={12} className='text-center mt-5'>
                <button type='submit' className='main__button' disabled={disableLoading}>
                  <span>{disableLoading ? 'Registering ...' : 'Register'}</span>
                </button>
              </Col>
            </Row>
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </Form>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
