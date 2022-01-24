import React, { Component } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BiPaperPlane, BiRocket } from 'react-icons/bi';
import { BsTrophy } from 'react-icons/bs';
import { GrLineChart } from 'react-icons/gr';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './HeroSlider.scss';

export default class HeroSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 800,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
    };

    return (
      <section id='hero__slider'>
        <Slider {...settings}>
          <div className='hero__slide one'>
            <h2>
              <AiOutlineStar size='2rem' /> <span>WE ARE BEST</span> <AiOutlineStar size='2rem' />
            </h2>
            <h1>
              LET YOUR CHILD <GrLineChart /> <strong>Grow</strong>
            </h1>
            <p>
              We here at <strong>PATHSHALA</strong> provides best education to your little one
            </p>
            <button className='main__button'>
              <span>
                <BiPaperPlane /> Know More
              </span>
            </button>
          </div>
          <div className='hero__slide two'>
            <h2>
              <AiOutlineStar size='2rem' /> <span>WE ARE BEST</span> <AiOutlineStar size='2rem' />
            </h2>
            <h1>
              GIVE <BiRocket /> <strong>BOOST</strong> TO YOUR CHILD
            </h1>
            <p>
              We here at <strong>PATHSHALA</strong> provides best education to your little one
            </p>
            <button className='main__button'>
              <span>
                <BiPaperPlane /> Know More
              </span>
            </button>
          </div>
          <div className='hero__slide three'>
            <h2>
              <AiOutlineStar size='2rem' /> <span>WE ARE BEST</span> <AiOutlineStar size='2rem' />
            </h2>
            <h1>
              CHOOSE <BsTrophy /> <strong>BEST</strong> FOR YOUR CHILD
            </h1>
            <p>
              We here at <strong>PATHSHALA</strong> provides best education to your little one
            </p>
            <button className='main__button'>
              <span>
                <BiPaperPlane /> Know More
              </span>
            </button>
          </div>
        </Slider>
      </section>
    );
  }
}
