import React from 'react';
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <h4>
          <GiGraduateCap />
        </h4>
        <h5>ePATHSHALA</h5>
        <h6>BETTER WAY TO LEARN & GROW</h6>
        <div className='footer__container'>
          <div className='footer__item'>
            <h6>CONTACT US</h6>
            <ul>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  3768 Seabury Ct, Burlington, NC, 27215
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  +1 8910000891
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  email@pathshala.com
                </a>
              </li>
            </ul>
          </div>

          <div className='footer__item'>
            <h6>QUICK LINKS</h6>
            <ul>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  Academics
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  Admission
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  Events
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  Campus Life
                </a>
              </li>
            </ul>
          </div>

          <div className='footer__item'>
            <h6>SCHOOL TIMINGS</h6>
            <ul>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  MON - FRI 9:00 AM - 3:00 PM
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  SAT 9:00 AM - 1:00 PM
                </a>
              </li>
            </ul>
          </div>

          <div className='footer__item'>
            <h6>CONTACT US</h6>
            <ul>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  3768 Seabury Ct, Burlington, NC, 27215
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  +1 8910000891
                </a>
              </li>
              <li>
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  email@pathshala.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='social__media'>
          <ul>
            <li>
              <a href='https://www.facebook.com/dev.farhanNahid' target='_blank' rel='noopener noreferrer'>
                <FiFacebook />
              </a>
            </li>
            <li>
              <a href='https://twitter.com/farhan__nahid' target='_blank' rel='noopener noreferrer'>
                <FiTwitter />
              </a>
            </li>
            <li>
              <a href='https://github.com/farhan-nahid' target='_blank' rel='noopener noreferrer'>
                <FiGithub />
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/farhan__nahid/' target='_blank' rel='noopener noreferrer'>
                <FiInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
